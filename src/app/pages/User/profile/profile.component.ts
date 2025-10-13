import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
data2:any;
form:FormGroup;
udata:any;
successMessage: string = '';
errorMessage: string = '';
  constructor(private api:UserService, private fb:FormBuilder, private router:Router, private toastr: ToastrService){
      this.form = this.fb.group({
        name: [''], 
        email: [''], 
      password: [''], 
      wallet1: [''],
    });
  }

  ngOnInit(){
    this.getdashboardHome();
    setTimeout(() => {
  this.successMessage = '';
  this.errorMessage = '';
}, 1500);
  }

    getdashboardHome() {
    this.api.UProfile().subscribe((res: any) => {
      // console.log('profile', res);
      this.data2 = res.data;
    });
  }

   edit() {
    if (this.form.valid) {
      const val =  {
            name: this.form.value.name,
                email: this.form.value.email,
        password: this.form.value.password,
        wallet1: this.form.value.wallet1,
      }    
      this.api.UpdateUserProfile(val).subscribe(
        (response: any) => {
          if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
            // console.log(response);
            this.udata = response.data[0];
                this.successMessage = 'Profile updated successfully!';
          this.errorMessage = '';
            this.toastr.success('Profile updated successfully!', 'Success');
          } else {
            setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/myprofile']);
                  this.successMessage = 'Profile updated. Redirecting...';
              this.errorMessage = '';
                 this.toastr.success('Profile updated. Redirecting...', 'Success');
              });
            }, 500);
          }
        },
        (error) => {
          console.error(error);
             this.errorMessage = 'Failed to update profile.';
        this.successMessage = '';
           this.toastr.error('Failed to update profile.', 'Error');
        }
      );
    } else {
      this.errorMessage = 'Please fill all required fields correctly.';
    this.successMessage = '';
    this.toastr.warning('Please fill all required fields correctly.', 'Warning');
  }
  }

}
