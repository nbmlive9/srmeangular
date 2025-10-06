import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
declare var $: any;

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.css']
})
export class UserActivationComponent {
  @ViewChild('activationModal') activationModal!: TemplateRef<any>;

  openConfirmModal() {
  if (this.form.valid) {
    $('#confirmModal').modal('show');
  }
}

confirmAction() {
  $('#confirmModal').modal('hide');
  this.add(); // Call the actual transfer logic here
}

data2:any;
pack:any;
  idselectmsg: string = '';
  regname:any;
  errorMessage: string = '';
  form:FormGroup;
  udata:any;
  password: string = '';
  showPassword = false;
  errorMessage3: string = '';
  constructor(private api:UserService, private fb:FormBuilder, private router:Router,  private modalService: NgbModal){
      this.form = this.fb.group({
             name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]], // ✅ min 6 chars
        sponcerid: [''],
        position: [''], 
        placementid: ['',],
        terms: [false, Validators.requiredTrue]
        });
  }

  ngOnInit(){
    //get profile
       this.api.UProfile().subscribe((res: any) => {
      console.log('profile', res);
      this.data2 = res.data[0];
    });
    //get packages
   this.getPackagesData();
  }

  getPackagesData(){
      this.api.GetPackages().subscribe((res: any) => {
      // console.log('packages', res);
      this.pack = res.data;
    });
  }

  onRegisterIdSelect(event: any) {
    const id = event.target.value;
    this.api.GetusersDataByRegID(id).subscribe(
      (res4: any) => {
        if (res4) {
          // console.log(res4);
          this.regname = res4.data[0];
          this.idselectmsg = `User Name: ${this.regname.name} `;
          this.errorMessage = ''; // Reset the error message when data is correct
        } else {
          // console.log(res4);
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

  add(){
    // console.log(this.form.value);
    if (this.form.valid) {
      const val = {
        sponcerid: this.form.value.sponcerid,
        name:this.form.value.name,
        phone:this.form.value.phone,
        email:this.form.value.email,     
        password:this.form.value.password,
        position:this.form.value.position,
        placementid:this.form.value.placementid,
      };
      this.api.UserRegistration(val).subscribe(
        (a:any) => {
          if (a) {
            console.log('actdata',a)
            this.udata = a.data;
            console.log(a);
               this.form.reset();
              //  this.reloadPage();
                 this.modalService.open(this.activationModal, { centered: true });
               setTimeout(() => {
                 this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate(['/activation']);
                 });
                 }, 500);
          } else {
            console.log(a);
            // this.errorMessage = a.msg.message;
         
          }
        },
        (err: any) => {
          // this.errorMessage = err.error.message;
        },
      );
    }
  }



}
