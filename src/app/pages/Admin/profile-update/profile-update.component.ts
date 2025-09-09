import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent {

   id="";
  data : any;
  form:FormGroup;
mymsg: string = '';
editData: any;
errorMessage: string = '';
msg: string = '';
errorsMessage: string = '';
  constructor(private api:AdminService, private router: Router, private activeroute:ActivatedRoute, private fb: FormBuilder) {
    this.form = this.fb.group({
      password: ['', ], 
      email: ['', ], 
      phone: ['', ], 
    });
   }

  ngOnInit(): void {
    this.id = this.activeroute.snapshot.params['id'];
    this.api.Profile().subscribe((res: any) => {
      console.log(res);
      this.data = res.data;
      this.form.patchValue({
        password: this.data.password
      });
    });
  }


  // edit(id:any) {
  //   console.log(this.form.value);
  //   if (this.form.valid) {
  //     const val = {
  //       password: this.form.value.password,
  //       email: this.form.value.email,
  //       phone: this.form.value.phone,
  //     };
  //     this.api.UpdateProfile(id, val).subscribe(
  //       (a: any) => {
  //         if (a?.data) {
  //           console.log(a);
  //           setTimeout(() => {
  //             this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //               this.router.navigate(['/aprofile']);
  //             });
  //             }, 800);
  //         } else {
  //           console.log(a);
  //           this.msg = 'Profile Successfully Updated !!!';
  //         }
  //       },
  //       (err: any) => {
  //         this.errorsMessage = err.error.message;
  //       },
  //     );
  //   }

  //   return false;
  // }
  

  



}
