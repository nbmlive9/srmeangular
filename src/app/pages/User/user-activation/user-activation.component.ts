import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { Modal } from 'bootstrap';
declare var $: any;
declare var bootstrap: any;
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

@ViewChild('activationReportModal') activationReportModal!: TemplateRef<any>;

openActivationReport() {
  this.modalService.open(this.activationReportModal, {
    centered: true,
    size: 'lg',
    backdrop: 'static',
  });
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
         regtype: ['', Validators.required],
  product: [''], // new
  address: [''], // new
  pincode: [''], // new
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

  add() {
  if (this.form.valid) {
    const val: any = {
      sponcerid: this.form.value.sponcerid,
      name: this.form.value.name,
      phone: this.form.value.phone,
      email: this.form.value.email,
      password: this.form.value.password,
      position: this.form.value.position,
      placementid: this.form.value.placementid,
      regtype: this.form.value.regtype,
    };

    // Include product details if selected
    if (this.form.value.regtype === 'withproduct') {
      val.product = this.form.value.product;
      val.address = this.form.value.address;
      val.pincode = this.form.value.pincode;
    }

    // Clear old error message before API call
    this.errorMessage3 = '';

    this.api.UserRegistration(val).subscribe(
      (res: any) => {
        console.log('Response:', res);

        // ✅ If backend returns insufficient funds
        if (res.status === 0) {
          this.errorMessage3 = res.message || 'You Have Low Credits';
          return; // stop further actions
        }

        // ✅ Successful activation
        if (res.status === 1 || res.data) {
          this.udata = res.data;
          this.form.reset();
          this.modalService.open(this.activationModal, { centered: true });

          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/activation']);
            });
          }, 500);
        } else {
          // Handle unexpected structure
          this.errorMessage3 = 'Something went wrong, please try again.';
        }
      },
      (err: any) => {
        console.error('Registration error:', err);
        this.errorMessage3 = err?.error?.message || 'Server error occurred';
      }
    );
  }
}





}
