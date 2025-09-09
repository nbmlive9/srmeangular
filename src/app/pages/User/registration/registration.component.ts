import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

@ViewChild('registrationModal') registrationModal!: TemplateRef<any>;


  form:FormGroup;
    errorMessage = '';
  idselectmsg: string = '';
  regname:any;
  udata:any;
    constructor(private api:UserService, private router:Router, private fb:FormBuilder, private toastr: ToastrService, private modalService: NgbModal) { 
      this.form = this.fb.group({
        sponcerid: ['', Validators.required], 
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required], 
        phone: ['', Validators.required], 
        password: ['', Validators.required], 
        cpassword: ['', Validators.required], 
      });
    }

    ngOnInit(){}

     onRegisterIdSelect(event: any) {
    const id = event.target.value;
    this.api.GetusersDataByRegID(id).subscribe(
      (res4: any) => {
        if (res4) {
          // console.log(res4);
          this.regname = res4.data[0];
          this.idselectmsg = `User Name: ${this.regname.name}`;
          this.errorMessage = ''; // Reset the error message when data is correct
        } else {
          this.regname = null; // Reset the regname object when data is incorrect
          this.errorMessage = 'Error fetching user data';
          this.idselectmsg = 'User Not Available';
        }
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.regname = null; // Reset the regname object when there's an error
        this.idselectmsg = '';
      }
    );
  }


  Register() {
    if (this.form.valid) {
      const val = {
        sponcerid: this.form.value.sponcerid,
        email: this.form.value.email,
        name: this.form.value.name,
        phone: this.form.value.phone,
        password: this.form.value.password,
      };
      this.api.UserRegistration(val).subscribe(
        (res: any) => {
          if (res) {
            // console.log('data',res);
            this.udata = res.adddata;
            // console.log(this.udata);
            this.form.reset();
            this.toastr.success('Register successful!');
            // Show modal
            this.modalService.open(this.registrationModal, { centered: true });
          } else {
            console.error('Invalid response:', res.data);
          }
        },
        (err: any) => {
          this.errorMessage = err.error.message || 'Register failed. Please try again.';
          this.toastr.error(this.errorMessage, 'Error');
        }
      );
    }
  }



}
