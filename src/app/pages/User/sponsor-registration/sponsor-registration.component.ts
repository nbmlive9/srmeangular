import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sponsor-registration',
  templateUrl: './sponsor-registration.component.html',
  styleUrls: ['./sponsor-registration.component.css']
})
export class SponsorRegistrationComponent {
@ViewChild('registrationModal') registrationModal!: TemplateRef<any>;
 form:FormGroup;
     errorMessage = '';
   idselectmsg: string = '';
   regname:any;
   udata:any;
   id:any;
   data1:any;
     constructor(private api:UserService, private router:Router, private fb:FormBuilder, private toastr: ToastrService, private modalService: NgbModal, private activeroute:ActivatedRoute) { 
       this.form = this.fb.group({
         sponcerid: [''], 
         email: ['', [Validators.required, Validators.email]],
         name: ['', Validators.required], 
         phone: ['', Validators.required], 
         password: ['', Validators.required], 
         cpassword: ['', Validators.required], 
       });
     }

    ngOnInit(){
        this.id = this.activeroute.snapshot.params['regid'];
            this.api.GetusersDataByRegID(this.id).subscribe((res:any)=>{
      // console.log(res);
      this.data1 = res.data[0];
    });
    }

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
