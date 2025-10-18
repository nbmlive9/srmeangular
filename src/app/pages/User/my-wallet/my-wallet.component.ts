import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var $: any;
declare var bootstrap: any;

@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.css']
})
export class MyWalletComponent {

  @ViewChild('successModal') successModal!: ElementRef;

  form: FormGroup;
  adata: any;
  cdata: any;
  data1: any;
  pfdata: any;

  charges: number = 0;
  netAmount: number = 0;
  errorMessage1: string = '';
 coinValue: number = 0;
  calculatedCoins: number = 0;
  ypdata: any;
  data2: any;
  constructor(
    private api: UserService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(7.5)]]
    });
  }

  ngOnInit() {
    this.PendingData();
    this.GetProfile();
    this.CompletedData();
    this.YohanPriceData();
    this.GetHomedata();
  }

  GetProfile() {
    this.api.UDashboardData().subscribe({
      next: (res: any) => {
        this.data1 = res.data;
        this.pfdata = res.data.profiledata;
      },
      error: (err) => {
        this.toastr.error('Failed to load profile data', 'Error');
      }
    });
  }

  GetHomedata(){
      this.api.UDashboardData().subscribe((res: any) => {
    console.log('homedata', res);
    this.data2 = res.data;
     });
  }

   YohanPriceData() {
    this.api.YohanPrice().subscribe({
      next: (res: any) => {
        this.ypdata = res.data;
        this.coinValue = parseFloat(this.ypdata.coinvalue);
      },
      error: (err) => {
        console.error('Error fetching Yohan price:', err);
      }
    });
  }

  formatAmount(event: any) {
    let value = event.target.value;
    value = value.replace(/[^0-9.]/g, '');

    if ((value.match(/\./g) || []).length > 1) {
      value = value.substring(0, value.length - 1);
    }

    if (value.includes('.')) {
      const [intPart, decPart] = value.split('.');
      if (decPart.length > 2) {
        value = intPart + '.' + decPart.substring(0, 2);
      }
    }

    event.target.value = value;
    this.form.get('amount')?.setValue(value, { emitEvent: false });

    const amount = parseFloat(value);
    this.calculatedCoins = (!isNaN(amount) && this.coinValue > 0) ? amount / this.coinValue : 0;
  }

  PendingData() {
    this.api.UserWithdrawPending().subscribe({
      next: (res: any) => {
        this.adata = res.data;
      },
      error: (err) => {
        this.toastr.error('Failed to load pending withdrawals', 'Error');
      }
    });
  }

  CompletedData() {
    this.api.UserWithdrawCompleted().subscribe({
      next: (res: any) => {
        this.cdata = res.data;
      },
      error: (err) => {
        this.toastr.error('Failed to load completed withdrawals', 'Error');
      }
    });
  }

  calculateNetAmount() {
    const amount = this.form.value.amount || 0;
    if (amount >= 10) {
      this.charges = amount * 0.10;  // 10% charges
      this.netAmount = amount - this.charges;
    } else {
      this.charges = 0;
      this.netAmount = 0;
    }
  }

  Withdraw() {
    if (this.form.invalid) {
      this.toastr.error('Please enter a valid amount (≥ 10)', 'Validation Error');
      return;
    }

    const amount = this.form.value.amount;
    const recipient = this.pfdata?.wallet1;

    if (!recipient || recipient.trim() === '') {
      this.toastr.error('Wallet address not found in profile', 'Error');
      return;
    }

    const payload = {
      recipient: recipient,
      amount: amount,
     flag: 2
    };

    console.log('Withdraw Payload:', payload);

    this.api.withdrawToBlockchain(payload).subscribe({
      next: (res: any) => {
        console.log('Withdraw Response:', res);

        if (res.success) {
          this.toastr.success(`Withdraw Successful! Tx Hash: ${res.transactionHash}`, 'Success');
          this.form.reset();
          this.CompletedData();

          const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
          modalElement.show();

          setTimeout(() => {
            modalElement.hide();
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/withdraw']);
            });
          }, 1000);
        } else if (res.error && res.error.toLowerCase().includes('approval')) {
          // Example: backend returns error message about admin approval
              setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/withdraw']);
            });
          }, 3000);
          this.toastr.warning('Your withdrawal request is pending admin approval.', 'Pending Approval');
        } else {
              setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/withdraw']);
            });
          }, 3000);
          this.toastr.error(res.error || 'Withdraw failed.', 'Error');
        }
      },
      error: (err) => {
        console.error('Withdraw Error:', err);
        this.errorMessage1 = 'Insufficient Funds or Server Error';
            setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/withdraw']);
            });
          }, 1000);
        this.toastr.error(this.errorMessage1, 'Error');
      }
    });
  }


}
