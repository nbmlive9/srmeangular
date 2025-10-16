import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
declare var $: any;
@Component({
  selector: 'app-transfer-wallet',
  templateUrl: './transfer-wallet.component.html',
  styleUrls: ['./transfer-wallet.component.css']
})
export class TransferWalletComponent {
  pfdata: any;
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
  constructor(private api:UserService, private fb:FormBuilder, private router:Router ){
      this.form = this.fb.group({
              regid: ['', Validators.required], 
              amount: ['', Validators.required], 
              wallettyoe: ['', Validators.required], 
              remark: ['', Validators.required], 
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
  const regid = event.target.value.trim();

  // If empty, reset messages and stop here
  if (!regid) {
    this.idselectmsg = '';
    this.errorMessage = 'Enter Userid';
    return;
  }

  this.api.GetusersDataByRegID(regid).subscribe(
    (res: any) => {
      if (res && res.success) {
        // success response
        this.idselectmsg = 'Valid User ID';
        this.errorMessage = '';
      } else {
        // backend says user not found
        this.idselectmsg = '';
        this.errorMessage = 'Enter valid Userid';
      }
    },
    (err: any) => {
      // backend route error or invalid userid
      if (err.error && err.error.message?.includes("Can't find a route")) {
        this.idselectmsg = '';
        this.errorMessage = 'Enter valid Userid';
      } else {
        this.idselectmsg = '';
        this.errorMessage = 'Enter valid Userid';
      }
    }
  );
}


  add(){
    console.log(this.form.value);
    if (this.form.valid) {
      const val = {
        regid: this.form.value.regid,
        amount:this.form.value.amount,
        wallettyoe: this.form.value.wallettyoe,
        remark:this.form.value.remark,
      };
      this.api.UserTransferUserWallet(val).subscribe(
        (a:any) => {
          if (a) {
            // console.log(a);
               this.form.reset();
              //  this.reloadPage();
               setTimeout(() => {
                 this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate(['/transferwallet']);
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
