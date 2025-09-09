import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
declare var $: any;
@Component({
  selector: 'app-self-transfer',
  templateUrl: './self-transfer.component.html',
  styleUrls: ['./self-transfer.component.css']
})
export class SelfTransferComponent {
 openConfirmModal1() {
    if (this.form1.valid) {
    $('#confirmModal1').modal('show');
  }
  }
  
  confirmAction1() {
    $('#confirmModal1').modal('hide');
    this.add();
    console.log('Action confirmed!');
  }
  
    form1:FormGroup;
    data2:any;
    idselectmsg: string = '';
    regname:any;
    errorMessage: string = '';
    successMessage: string = '';
    tdata:any;
    
    constructor(private api:UserService, private fb:FormBuilder, private router:Router ){
        this.form1 = this.fb.group({
                amount: ['', Validators.required], 
                remark: ['', Validators.required], 
              });
    }
  
    ngOnInit() {
      //get profile
       this.api.UProfile().subscribe((res: any) => {
      // console.log('profile', res);
      this.data2 = res.data;
    });
    }
  
    
  
   add() {
  // console.log(this.form1.value);
  this.errorMessage = '';
  this.successMessage = '';

  if (this.form1.valid) {
    const val = {
      amount: this.form1.value.amount,
      remark: this.form1.value.remark,
    };

    this.api.UserSelfTransferWallet(val).subscribe(
      (a: any) => {
        if (a && a.status === true) {
          // console.log(a);
          this.form1.reset();
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/transferwallet']);
            });
          }, 500);
          this.successMessage = a.msg.message || 'Transfer successful!';

        } else {
          // console.log(a);
            setTimeout(() => {
            this.successMessage = '';
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/transferwallet']);
            });
          }, 500);
          this.errorMessage = a.msg.message || 'Transfer failed.';
        }
      },
      (err: any) => {
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/transferwallet']);
            });
          }, 500);
        this.errorMessage = err?.error?.message || 'An unexpected error occurred.';
        //  setTimeout(() => {
        //     this.errorMessage = '';
        //     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //       this.router.navigate(['/transferwallet']);
        //     });
        //   }, 1000);
      }
    );
  }
}

}
