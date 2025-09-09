import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
declare var $: any;
@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.css']
})
export class MyWalletComponent {
@ViewChild('withdrawModal') withdrawModal!: TemplateRef<any>;
  openConfirmModal() {
      if (this.form.valid) {
    $('#confirmModal').modal('show');
    }
  }
  
  confirmAction() {
    $('#confirmModal').modal('hide');
    // Your actual confirmation logic here
    console.log('Action confirmed!');
    this.add();
  }

  pending: boolean = true;
  report: boolean = false;
  showSection(section: string) {
    this.pending = section === 'pending';
    this.report = section === 'report';
  }

  onImageError(event: any) {
  event.target.src = 'assets/logo.png';
}

  data2:any;
  form:FormGroup;
  pdata:any;
  udata:any;
errorMessage: string = '';
  constructor(private api:UserService, private fb:FormBuilder, private router:Router, private modalService: NgbModal){
     this.form = this.fb.group({
                  amount: ['', Validators.required], 
                  note: ['', Validators.required], 
                  transactionpassword: ['', Validators.required], 
                });
  }

  ngOnInit() {
    //get profile
       this.api.UProfile().subscribe((res: any) => {
      // console.log('profile', res);
      this.data2 = res.data;
    });
     //get pending report
       this.api.UserWithdrawPending().subscribe((res: any) => {
      // console.log('pending', res);
      this.pdata = res.data;
    });
  }
  
 add() {
  this.errorMessage = ''; // Clear previous error
  console.log(this.form.value);

  if (this.form.valid) {
    const val = {
      amount: this.form.value.amount,
      note: this.form.value.note,
      transactionpassword: this.form.value.transactionpassword,
    };

    this.api.UserWithdraw(val).subscribe(
      (a: any) => {
        if (a && a.status === 1) {
          this.udata = a.addata;
          this.form.reset();
          this.modalService.open(this.withdrawModal, { centered: true });

          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/walletwithdraw']);
            });
          }, 500);
        } else {
          // Handle failed withdrawal (even if API call succeeds)
          this.errorMessage = a?.msg?.message || 'Withdrawal failed. Please try again.';
        }
      },
      (err: any) => {
        // Handle server/network error
        this.errorMessage = err?.error?.message || 'An error occurred during withdrawal.';
      }
    );
  }
}


}
