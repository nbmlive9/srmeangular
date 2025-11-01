import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var $: any;
@Component({
  selector: 'app-transfer-wallet',
  templateUrl: './transfer-wallet.component.html',
  styleUrls: ['./transfer-wallet.component.css']
})
export class TransferWalletComponent {
  pfdata: any;
  udata: any;
  name: any;
  openConfirmModal() {
    if (this.form.valid) {
    $('#confirmModal').modal('show');
  }
  }
  
  confirmAction() {
    $('#confirmModal').modal('hide');
    this.add();
    console.log('Action confirmed!');
  }

 selftransfer: boolean = false;
  usertransfer: boolean = true;
  showSection(section: string) {
    this.selftransfer = section === 'selftransfer';
    this.usertransfer = section === 'usertransfer';
  }

    transfer: boolean = true;
  received: boolean = false;
  showSection1(section: string) {
    this.transfer = section === 'transfer';
    this.received = section === 'received';
  }

  form:FormGroup;
  data2:any;
  idselectmsg: string = '';
  regname:any;
  errorMessage: string = '';
  tdata:any;
  form1:FormGroup;
    showOtpForm: boolean = false;
    message: { type: 'success' | 'danger', text: string } | null = null;
    
  constructor(private api:UserService, private fb:FormBuilder, private router:Router,     private toast: ToastrService ){
      this.form = this.fb.group({
              regid: ['', Validators.required], 
              amount: ['', [Validators.required, Validators.min(1)]], 
              wallettyoe: ['', Validators.required], 
              remark: ['Transfer Wallet'], 
              securepin: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
            });

                this.form1 = this.fb.group({
      otp: ['', Validators.required],
    });
  }

  ngOnInit() {
    //get profile
       this.api.UProfile().subscribe((res: any) => {
      // console.log('profile', res);
      this.pfdata = res.data[0];
    });
    //transferreport
       this.api.TransferWalletData().subscribe((res: any) => {
      console.log('transferreport', res);
      this.tdata = res.data;
    });
  }

   onRegisterIdSelect(event: any) {
  const id = event.target.value.trim();

  // If empty, reset messages and stop here (no API call)
  if (!id) {
    this.regname = null;
    this.idselectmsg = '';
    this.errorMessage = '';
    return;
  }

  this.api.GetusersDataByRegID(id).subscribe(
    (res4: any) => {
      if (res4 && res4.data && res4.data.length > 0) {
        this.regname = res4.data[0];
        this.idselectmsg = `User Name: ${this.regname.name}`;
        this.errorMessage = '';
      } else {
        this.regname = null;
        this.errorMessage = 'User Not Available';
        this.idselectmsg = '';
      }
    },
    (err: any) => {
      this.regname = null;
      this.idselectmsg = '';
      this.errorMessage = 'Enter valid Userid';
    }
  );
}

   onPinInput(event: any) {
  const input = event.target as HTMLInputElement;
  // Remove all non-digit characters and trim to 4 digits
  const cleanValue = input.value.replace(/[^0-9]/g, '').slice(0, 4);
  this.form.get('securepin')?.setValue(cleanValue, { emitEvent: false });
}


save() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.api.GenerateOtp().subscribe({
    next: (res: any) => {
      if (res.status === 1) {
        this.message = { type: 'success', text: res?.message || 'OTP sent ✅' };
        this.showOtpForm = true;
        this.form1.reset();
      } else {
        this.message = { type: 'danger', text: res?.message || 'OTP generation failed ❌' };
      }

      // Hide message after 3 seconds
      setTimeout(() => this.message = null, 3000);
    },
    error: () => {
      this.message = { type: 'danger', text: 'OTP generation failed ❌' };
      setTimeout(() => this.message = null, 3000);
    }
  });
}


verifyOtpAndSave() {
  if (this.form1.invalid) {
    this.form1.markAllAsTouched();
    return;
  }

  const payload = { otp: this.form1.value.otp };

  this.api.VerifyOtp(payload).subscribe({
    next: (res: any) => {
      if (res.status === 1) {
        this.message = { type: 'success', text: res?.message || 'OTP Verified ✅' };
        setTimeout(() => this.add(), 500); // small delay to show OTP verified message
      } else {
        this.message = { type: 'danger', text: res?.message || 'Invalid OTP ❌' };
      }
      setTimeout(() => this.message = null, 3000);
    },
    error: () => {
      this.message = { type: 'danger', text: 'OTP verification failed ❌' };
      setTimeout(() => this.message = null, 3000);
    }
  });
}



  add() {
    
  if (this.form.valid) {
    const val = {
      regid: this.form.value.regid,
      amount: this.form.value.amount,
      wallettyoe: this.form.value.wallettyoe,
      remark: this.form.value.remark,
      securepin:this.form.value.securepin,
    };
    this.api.UserTransferUserWallet(val).subscribe(
      (a: any) => {
        if (a.status === 1) { // assuming API returns status
          this.message = { type: 'success', text: a.message || 'Transfer successful ✅' };
          this.form.reset();
          this.showOtpForm = false;

          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/transferwallet']);
            });
          }, 500);
        } else {
          this.message = { type: 'danger', text: a.message || 'Transfer failed ❌' };
        }
        setTimeout(() => this.message = null, 3000);
      },
      (err: any) => {
        this.message = { type: 'danger', text: err.error?.message || 'Something went wrong ❌' };
        setTimeout(() => this.message = null, 3000);
      }
    );
  }
}

  
  

}
