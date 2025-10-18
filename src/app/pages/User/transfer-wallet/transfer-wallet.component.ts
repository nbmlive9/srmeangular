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
