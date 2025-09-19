import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var $: any;
@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent {

  searchTerm: string = '';       // For binding with input field
  searchResult: any[] = [];
  form:any;
     selectedUserName = [] = '';
  idselectmsg: string = '';
  regname: any[] = [];
  errorMessage: string = '';
  data2:any;
  selectedUserId: any = null;
  udata:any;
   searchData: any = null;
    loading: boolean = false; 
  constructor(private api:AdminService, private router: Router, private fb:FormBuilder, private activeroute:ActivatedRoute) { 
   
  }

  ngOnInit(): void {
    this.searchTerm = this.activeroute.snapshot.params['regid'];
     this.form = this.fb.group({
      name: ['', ], 
      phone: ['', ], 
      email: ['', ],
      password: ['', ],
      transpassword: ['', ],
      wallet1: ['', ],
    });
  }

  searchUser(): void {
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      this.errorMessage = 'Please enter a valid search term.';
      this.searchData = null;
      return;
    }

    this.loading = true;  // Show loader
    this.errorMessage = '';
    this.searchData = null;

    this.api.GetSearchUserDataByRegid(this.searchTerm.trim()).subscribe(
      (res: any) => {
        console.log('API Response:', res);
        this.loading = false;  // Hide loader

        if (res && res.data) {
          this.searchData = res.data;
        } else {
          this.errorMessage = 'No data found for this user.';
        }
      },
      (err: any) => {
        this.loading = false; // Hide loader
        this.errorMessage = err.error?.message || 'Error fetching data.';
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


}
