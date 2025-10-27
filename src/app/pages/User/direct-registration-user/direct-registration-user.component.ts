import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';

declare var $: any;
@Component({
  selector: 'app-direct-registration-user',
  templateUrl: './direct-registration-user.component.html',
  styleUrls: ['./direct-registration-user.component.css']
})
export class DirectRegistrationUserComponent {

   @ViewChild('loadingModal') loadingModal!: TemplateRef<any>;
    @ViewChild('activationModal') activationModal!: TemplateRef<any>;

    @ViewChild('depositModal') depositModal!: TemplateRef<any>;
@ViewChild('withdrawModal') withdrawModal!: TemplateRef<any>;
@ViewChild('transferModal') transferModal!: TemplateRef<any>;

openModal(type: string) {
  if (type === 'deposit') {
    this.modalService.open(this.depositModal, { centered: true, size: 'lg', backdrop: 'static' });
  } if (type === 'withdraw') {
    this.modalService.open(this.withdrawModal, { centered: true, size: 'lg', backdrop: 'static' });
  } if (type === 'transfer') {
    this.modalService.open(this.transferModal, { centered: true, size: 'lg', backdrop: 'static' });
  }
}


    regname1: any;
    idselectmsg1='';
    errorMessage1='';
  
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
    selectedProduct: any = null; // store selected product details
  deliveryFee: string = '';
    constructor(private api:UserService, private fb:FormBuilder, private router:Router,  private modalService: NgbModal){
        this.form = this.fb.group({
          regid: ['', Validators.required],
               name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]], 
          sponcerid: ['', Validators.required],
          position: ['',Validators.required], 
          placementid: [''],
          regtype: ['', Validators.required],
          product: [''], 
          address: [''], 
          pincode: [''], 
          deliverytype:[''],
          }, { validators: this.passwordMatchValidator });
    }
  
    passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
  
    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }
  
    ngOnInit(){
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
        console.log('packages', res);
        // this.pack = res.data;
         this.pack = res.data.filter((p: any) => p.home == 1 || p.leader == 1);
      });
    }
  
    onProductSelect(event: any) {
    const selectedId = event.target.value;
    this.selectedProduct = this.pack.find((p: any) => p.id === selectedId);
  }
  
  onDeliveryChange(event: any) {
    const deliveryType = event.target.value;
    this.form.get('deliverytype')?.setValue(deliveryType);
  
    if (deliveryType === 'home' && this.selectedProduct) {
      this.deliveryFee = this.selectedProduct.dfee; // optional
    } else {
      this.deliveryFee = '';
    }
  }
  
  get totalCost(): number {
    if (!this.selectedProduct) return 0;
  
    let cost = Number(this.selectedProduct.price);
    
    // Add delivery fee only if "home" is selected
    if (this.form.value.deliverytype === 'home') {
      cost += Number(this.selectedProduct.dfee || 0);
    }
  
    return cost;
  }
  
  get isFundSufficient(): boolean {
    return this.data2?.actwallet >= this.totalCost;
  }
  
  
    onRegisterIdSelect(event: any) {
      const id = event.target.value;
      this.api.GetusersDataByRegID(id).subscribe(
        (res4: any) => {
          if (res4) {
            // console.log(res4);
            this.regname = res4.data[0];
            this.idselectmsg = `Name: ${this.regname.name} `;
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
  
    onRegisterIdSelect1(event: any) {
    const id = event.target.value.trim();
  
    // If empty, reset messages and stop here (no API call)
    if (!id) {
      this.regname1 = null;
      this.idselectmsg1 = '';
      this.errorMessage1 = '';
      return;
    }
  
    this.api.GetusersDataByRegID(id).subscribe(
      (res4: any) => {
          console.log(res4);
        if (res4 && res4.data && res4.data.length > 0) {
          this.regname1 = res4.data[0];
          this.idselectmsg1 = `Name: ${this.regname1.name} , fund: ${this.regname1.actwallet} `;
          this.errorMessage1 = '';
        } else {
          this.regname1 = null;
          this.errorMessage1 = 'User Not Available';
          this.idselectmsg1 = '';
        }
      },
      (err: any) => {
        this.regname1 = null;
        this.idselectmsg1 = '';
        this.errorMessage1 = 'Enter valid Userid';
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
       regid: this.form.value.regid,
      sponcerid: this.form.value.sponcerid,
      name: this.form.value.name,
      phone: this.form.value.phone,
      email: this.form.value.email,
      password: this.form.value.password,
      position: this.form.value.position,
      placementid: this.form.value.sponcerid,
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
    this.api.UserRegistrationDirect(val).subscribe(
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
              this.router.navigate(['/directreg']);
            });
          }, 3000);
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
