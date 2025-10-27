import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
declare var $: any;
@Component({
  selector: 'app-direct-user-wallet-transfer',
  templateUrl: './direct-user-wallet-transfer.component.html',
  styleUrls: ['./direct-user-wallet-transfer.component.css']
})
export class DirectUserWalletTransferComponent {

  form:FormGroup;
    data2:any;
    idselectmsg: string = '';
    regname:any;
    errorMessage: string = '';
    tdata:any;
  pfdata: any;
      idselectmsg1: string = '';
    regname1:any;
    errorMessage1: string = '';
    constructor(private api:UserService, private fb:FormBuilder, private router:Router ){
        this.form = this.fb.group({
            regid: ['', Validators.required], 
                fromid: ['', Validators.required], 
                amount: ['', [Validators.required, Validators.min(1)]], 
                wallettyoe: ['', Validators.required], 
                remark: ['Transfer Wallet'], 
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
        // console.log('transferreport', res);
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
          this.idselectmsg = `Name: ${this.regname.name}, Act: ${this.regname.actwallet}, Wallet: ${this.regname.wallet_amount}`;
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
  
  onRegisterIdSelect1(event: any) {
    const id = event.target.value.trim();
  
    // If empty, reset messages and stop here (no API call)
    if (!id) {
      this.regname1 = null;
      this.idselectmsg1 = '';
      this.errorMessage1= '';
      return;
    }
  
    this.api.GetusersDataByRegID(id).subscribe(
      (res4: any) => {
        if (res4 && res4.data && res4.data.length > 0) {
          this.regname1 = res4.data[0];
          this.idselectmsg1 = `Name: ${this.regname1.name}, Act: ${this.regname1.actwallet}, Wallet: ${this.regname1.wallet_amount}`;
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
  
  
    add(){
      console.log(this.form.value);
      if (this.form.valid) {
        const val = {
          fromid: this.form.value.fromid,
          regid: this.form.value.regid,
          amount:this.form.value.amount,
          wallettyoe: this.form.value.wallettyoe,
          remark:this.form.value.remark,
        };
        this.api.DirectUserTransferUserWallet(val).subscribe(
          (a:any) => {
            if (a) {
              // console.log(a);
                 this.form.reset();
                //  this.reloadPage();
                 setTimeout(() => {
                   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                     this.router.navigate(['/directreg']);
                   });
                   }, 500);
            } else {
              // console.log(a);
              // this.errorMessage = a.msg.message;
           
            }
          },
          (err: any) => {
            console.error(err);
            // this.errorMessage = err.error.message;
          },
        );
      }
    }
    

}
