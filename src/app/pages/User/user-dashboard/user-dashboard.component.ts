import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Clipboard } from '@angular/cdk/clipboard';
import * as QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  pdata: any;
  data2: any;
  securePinForm!: FormGroup;

    @ViewChild('securePinModal') securePinModal!: TemplateRef<any>;
  modalRef!: NgbModalRef;


  constructor(private api:UserService, private fb:FormBuilder, private toastr:ToastrService,   private modalService: NgbModal){}

  ngOnInit(){
    this.api.UProfile().subscribe((res:any)=>{
        console.log('profile',res);
        this.pdata=res.data[0];
    });
    this.getdashboardHome();
      this.loadProfile();
    this.securePinForm = this.fb.group({
      securepin: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
    });
  }

  ngAfterViewInit() {
  // Wait a short time to ensure view is rendered
  setTimeout(() => {
    if (this.pdata && (!this.pdata.securepin || this.pdata.securepin.trim() === '')) {
      if (this.securePinModal) {
        this.modalRef = this.modalService.open(this.securePinModal, {
          backdrop: 'static',
          keyboard: false,
          centered: true,
          size: 'md'
        });
      }
    }
  }, 100);
}


  loadProfile() {
    this.api.UProfile().subscribe((res: any) => {
      // console.log('profile', res);
      this.pdata = res.data[0];

      // Check secure pin
      if (!this.pdata.securepin || this.pdata.securepin.trim() === '') {
        setTimeout(() => {
          this.modalRef = this.modalService.open(this.securePinModal, {
            backdrop: 'static',
            keyboard: false,
            centered: true
          });
        }, 300);
      }
    });
  }

  

  updateSecurePin() {
  if (this.securePinForm.invalid) {
    this.toastr.error('Please enter a valid Secure PIN (4 digits).');
    return;
  }

  const formValue = this.securePinForm.value;
  this.api.SecurePinUpdate(formValue).subscribe(
    (res: any) => {
      this.toastr.success('Secure PIN updated successfully!');
      this.modalRef.close();

      // Update local pdata so modal won't show again
      this.pdata.securepin = formValue.securepin;
    },
    (error) => {
      console.error(error);
      this.toastr.error('Failed to update Secure PIN.');
    }
  );
}


  onPinInput(event: any) {
  const input = event.target as HTMLInputElement;
  // Remove all non-digit characters and trim to 4 digits
  const cleanValue = input.value.replace(/[^0-9]/g, '').slice(0, 4);
  this.securePinForm.get('securepin')?.setValue(cleanValue, { emitEvent: false });
}


getdashboardHome() {
  this.api.UDashboardData().subscribe((res: any) => {
    console.log('homedata', res);
    this.data2 = res.data;

    const perUnitAmounts: { [key: string]: number } = {
      levelpay: 9,
      silverpay: 12,
      goldpay: 24,
      platinumpay: 48,
      diamondpay: 96,
      crownpay: 192
    };

    // Calculate holdings
    Object.keys(perUnitAmounts).forEach((key: string) => {
      const count = Number(this.data2[key]) || 0;
      const perUnit = perUnitAmounts[key];
      let holding = 0;

      switch (key) {
        case 'levelpay':
          if (count >= 3 && count < 6) holding = 1 * perUnit;
          else if (count >= 6 && count < 9) holding = 2 * perUnit;
          break;

        case 'silverpay':
          if (count >= 2 && count < 4) holding = 1 * perUnit;
          else if (count >= 4 && count < 6) holding = 2 * perUnit;
          else if (count >= 6 && count < 8) holding = 3 * perUnit;
          break;

        case 'goldpay':
        case 'platinumpay':
        case 'diamondpay':
        case 'crownpay':
          if (count >= 2 && count < 4) holding = 1 * perUnit;
          else if (count >= 4 && count < 6) holding = 2 * perUnit;
          break;
      }

      // Assign final holding (0 if not eligible)
      this.data2[key + 'Holding'] = holding;
    });

    // Check if any holding > 0
    this.data2.hasAnyHolding = Object.keys(perUnitAmounts).some(
      key => this.data2[key + 'Holding'] > 0
    );
  });
}




  
}
