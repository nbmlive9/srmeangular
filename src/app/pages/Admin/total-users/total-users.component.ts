import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var $: any;
@Component({
  selector: 'app-total-users',
  templateUrl: './total-users.component.html',
  styleUrls: ['./total-users.component.css']
})
export class TotalUsersComponent {
  data: any[] = [];
  paginatedData: any[] = [];
  rowsPerPage = 20;
  rowsOptions = [10, 20, 50, 100];
  currentPage = 1;
  totalPages = 0;
 totalRecords: number = 0;
  TotalUsers: boolean = true;
  TodayUsers: boolean = false;
  Activeusers: boolean = false;
  Inactiveusers: boolean = false;
  tusers:any;
  ttusers:any;
   selectedUserId: any = null;
  udata:any;
  form:any;
  constructor(private api:AdminService, private router: Router, private fb:FormBuilder){
   
  }
  
  showSection(section: string) {
    this.TotalUsers = section === 'total';
    this.TodayUsers = section === 'today';
    this.Activeusers = section === 'active';
    this.Inactiveusers = section === 'inactive';
  }

openConfirmModal() {
  $('#confirmModal').modal('show');
}

confirmAction() {
  $('#confirmModal').modal('hide');
  // Your actual confirmation logic here
  console.log('Action confirmed!');
}

ngOnInit() {
     this.form = this.fb.group({
      name: ['', ], 
      phone: ['', ], 
      email: ['', ],
      password: ['', ],
      transpassword: ['', ],
      wallet1: ['', ],
    });

  this.loadUsers({ first: 0, rows: this.rowsPerPage });
  this.api.TotalMembers().subscribe((res:any)=>{
    console.log(res);
    this.ttusers=res.data;
  })
}

loadUsers(event: any) {
  const first = event.first || 0;
  const rows = event.rows || this.rowsPerPage;
  const page = Math.floor(first / rows) + 1;

  this.api.TotalUsers(page, rows).subscribe((res: any) => {
        console.log('total',res);
    this.data = res.data.data;
    this.totalRecords = res.data.count;
    this.totalPages = Math.ceil(this.totalRecords / rows);
  });
}

goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    const first = (this.currentPage - 1) * this.rowsPerPage;
    this.loadUsers({ first, rows: this.rowsPerPage });
  }
}

onChangeRowsPerPage(value: string): void {
  this.rowsPerPage = +value; // Convert to number
  this.currentPage = 1;
  this.loadUsers({ first: 0, rows: this.rowsPerPage });
}



updatePagination() {
  const start = (this.currentPage - 1) * this.rowsPerPage;
  const end = start + this.rowsPerPage;
  this.paginatedData = this.data.slice(start, end);
}

block(id: any) {
    // Block the user if id is provided
    this.api.userblock(id).subscribe(
      (res: any) => {
        console.log(res);
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users']);
          });
        }, 1000);
      },
      (error: any) => {
        console.error(error);
      }
    );
  
}

unblock(id:any){
  this.api.userunblock(id).subscribe(
    (res: any) => {
      console.log(res);
      setTimeout(() => {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/users']);
        });
      }, 1000);
    },
    (error: any) => {
      console.error(error);
      // Handle error if the unblocking operation fails
    }
  );
}

isEditModalOpen = false;

openEditModal(id: any) {
  this.selectedUserId = id;
  this.api.GetUserDataByid(id).subscribe((res: any) => {
    const user = res?.data[0]; // use [0] if API returns array
    if (user) {
      this.form.patchValue({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        password: user.password || '',
        transpassword: user.transpassword || '',
        wallet1: user.wallet1 || '',
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
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/users']);
          });
        }, 500);
      },
      (err) => {
        console.error('Update error:', err);
        alert('Failed to update user profile.');
      }
    );
  }
}




}
