import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

declare var $: any;

@Component({
  selector: 'app-total-users',
  templateUrl: './total-users.component.html',
  styleUrls: ['./total-users.component.css']
})
export class TotalUsersComponent implements OnInit {
  data: any[] = [];
  gdata: any[] = [];
  rowsOptions = [10, 20, 50, 100];
  totalRecords: number = 0;
currentPage: number = 1;
rowsPerPage: number = 10;
totalPages: number = 50; // Example: set dynamically after API call
  // section flags
  TotalUsers: boolean = true;
  TodayUsers: boolean = false;
  Activeusers: boolean = false;
  Inactiveusers: boolean = false;

  selectedUserId: any = null;
  form!: FormGroup;
  isEditModalOpen = false;
isLoading: boolean = false; 
  constructor(
    private api: AdminService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [''],
      phone: [''],
      email: [''],
      password: [''],
      aadhar: [''],
    });

    this.loadUsers(this.currentPage, this.rowsPerPage);
  }

  // ✅ API call for paginated users
loadUsers(page: number, rows: number) {
  this.isLoading = true;

  this.api.TotalUsers(page, rows).subscribe(
    (res: any) => {
      console.log('API Response:', res);

      // Adjust depending on your backend
      const udata = res.udata || res.data; 
      this.data = udata?.data || udata || [];
      this.totalRecords = udata?.count || res.count || this.data.length;
      this.totalPages = Math.ceil(this.totalRecords / rows);

      this.gdata = res.gdata || [];
      this.isLoading = false;
    },
    (error: any) => {
      console.error('Error loading data:', error);
      this.isLoading = false;
    }
  );
}



getGdataByRegId(regId: string) {
  return this.gdata.find(item => item.userdata?.reg_id === regId) || {};
}

 getPaginationGroup(): number[] {
  const groupSize = 10; // show 10 numbers
  const groupStart = Math.floor((this.currentPage - 1) / groupSize) * groupSize + 1;
  let groupEnd = groupStart + groupSize - 1;

  if (groupEnd > this.totalPages) {
    groupEnd = this.totalPages;
  }

  const pages: number[] = [];
  for (let i = groupStart; i <= groupEnd; i++) {
    pages.push(i);
  }
  return pages;
}

goToPage(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.loadUsers(this.currentPage, this.rowsPerPage); // ✅ pass args
  }
}

goToNextGroup() {
  const groupSize = 10;
  const nextGroupPage = Math.floor((this.currentPage - 1) / groupSize) * groupSize + groupSize + 1;
  if (nextGroupPage <= this.totalPages) {
    this.currentPage = nextGroupPage;
    this.loadUsers(this.currentPage, this.rowsPerPage); // ✅
  }
}

goToPrevGroup() {
  const groupSize = 10;
  const prevGroupPage = Math.floor((this.currentPage - 1) / groupSize) * groupSize;
  if (prevGroupPage > 0) {
    this.currentPage = prevGroupPage;
    this.loadUsers(this.currentPage, this.rowsPerPage); // ✅
  }
}


  onChangeRowsPerPage(value: string): void {
    this.rowsPerPage = +value;
    this.currentPage = 1;
    this.loadUsers(this.currentPage, this.rowsPerPage);
  }

  showSection(section: string) {
    this.TotalUsers = section === 'total';
    this.TodayUsers = section === 'today';
    this.Activeusers = section === 'active';
    this.Inactiveusers = section === 'inactive';
  }

  // ✅ block user
  block(id: any) {
    this.api.userblock(id).subscribe(
      (res: any) => {
        console.log(res);
        this.loadUsers(this.currentPage, this.rowsPerPage); // refresh list
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // ✅ unblock user
  unblock(id: any) {
    this.api.userunblock(id).subscribe(
      (res: any) => {
        console.log(res);
        this.loadUsers(this.currentPage, this.rowsPerPage); // refresh list
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  // ✅ open edit modal
  openEditModal(id: any) {
    this.selectedUserId = id;
    this.api.GetUserDataByid(id).subscribe((res: any) => {
      const user = res?.data[0];
      if (user) {
        this.form.patchValue({
          name: user.name || '',
          phone: user.phone || '',
          email: user.email || '',
          password: user.password || '',
          aadhar: user.aadhar || '',
        });
        this.isEditModalOpen = true;
      }
    });
  }

  closeModal() {
    this.isEditModalOpen = false;
  }

  submitUpdate() {
    if (!this.form.valid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    if (this.selectedUserId) {
      const updatedData = this.form.value;
      this.api.UpdateUserProfile(this.selectedUserId, updatedData).subscribe(
        (res: any) => {
          alert('User profile updated successfully.');
          this.closeModal();
          this.loadUsers(this.currentPage, this.rowsPerPage); // refresh list
        },
        (err) => {
          console.error('Update error:', err);
          alert('Failed to update user profile.');
        }
      );
    }
  }
}
