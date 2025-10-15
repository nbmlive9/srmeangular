import { Component, TemplateRef, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { Modal } from 'bootstrap';
declare var $: any;
declare var bootstrap: any;
@Component({
  selector: 'app-tree-registration',
  templateUrl: './tree-registration.component.html',
  styleUrls: ['./tree-registration.component.css']
})
export class TreeRegistrationComponent {
  @ViewChild('loadingModal') loadingModal!: TemplateRef<any>;
  @ViewChild('activationModal') activationModal!: TemplateRef<any>;
  data3: any;
  
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
        regid:any;
    position:any;
    constructor(private api:UserService, private fb:FormBuilder, private router:Router,  private modalService: NgbModal, private activeroute:ActivatedRoute){
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
          deliverytype:[''],
          terms: [false, Validators.requiredTrue]
          });
    }
  
    ngOnInit(){
                this.regid = this.activeroute.snapshot.paramMap.get('regid') || '';
          // console.log("regid:",this.regid);
          
    this.position = this.activeroute.snapshot.paramMap.get('position') || '';
      //get profile
         this.api.UProfile().subscribe((res: any) => {
        console.log('profile', res);
        this.data2 = res.data[0];
      });
      //get packages
     this.getPackagesData();

      this.form.get('regtype')?.valueChanges.subscribe((value) => {
    this.updateProductValidators(value);
  });

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

    updateProductValidators(regtype: string) {
    const product = this.form.get('product');
    const address = this.form.get('address');
    const pincode = this.form.get('pincode');
    const deliverytype = this.form.get('deliverytype');

    if (regtype === 'withproduct') {
      product?.setValidators([Validators.required]);
      address?.setValidators([Validators.required]);
      pincode?.setValidators([Validators.required]);
      deliverytype?.setValidators([Validators.required]);
    } else {
      product?.clearValidators();
      address?.clearValidators();
      pincode?.clearValidators();
      deliverytype?.clearValidators();
    }

    product?.updateValueAndValidity();
    address?.updateValueAndValidity();
    pincode?.updateValueAndValidity();
    deliverytype?.updateValueAndValidity();
  }

  
  
   add() {
  if (this.form.invalid) return;

  const val: any = {
    sponcerid: this.form.value.sponcerid,
    name: this.form.value.name,
    phone: this.form.value.phone,
    email: this.form.value.email,
    password: this.form.value.password,
    position: this.form.value.position,
    placementid: this.form.value.placementid,
    regtype: this.form.value.regtype,
    deliverytype: this.form.value.deliverytype,
  };

  if (this.form.value.regtype === 'withproduct') {
    val.product = this.form.value.product;
    val.address = this.form.value.address;
    val.pincode = this.form.value.pincode;
    val.deliverytype = this.form.value.deliverytype;
  }

  this.errorMessage3 = '';

  // 1️⃣ Open the loading modal (disable closing)
  const loadingRef = this.modalService.open(this.loadingModal, {
    centered: true,
    backdrop: 'static', // prevent closing
    keyboard: false,    // disable ESC
  });

  // 2️⃣ Call backend
  this.api.UserRegistration(val).subscribe(
    (res: any) => {
      // 3️⃣ Close loading modal when API returns
      loadingRef.close();

      if (res.status === 0) {
        this.errorMessage3 = res.message || 'You Have Low Credits';
        return;
      }

      if (res.status === 1 || res.data) {
        this.udata = res.data;
        this.form.reset();

        // 4️⃣ Open activation modal
        this.modalService.open(this.activationModal, { centered: true });

        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/activation']);
          });
        }, 500);
      } else {
        this.errorMessage3 = 'Something went wrong, please try again.';
      }
    },
    (err: any) => {
      loadingRef.close();
      this.errorMessage3 = err?.error?.message || 'Server error occurred';
    }
  );
}

}
