import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';
declare var $: any;
declare var bootstrap: any;
@Component({
  selector: 'app-deposit-request',
  templateUrl: './deposit-request.component.html',
  styleUrls: ['./deposit-request.component.css']
})
export class DepositRequestComponent {
  @ViewChild('successModal') successModal!: ElementRef;

  form: FormGroup;
  submitting = false;
  qrDataUrl: SafeUrl = '';
  qrCodeDataUrl: SafeUrl = '';
  paymentInfo: any = null;
  paymentAddress: string = '';
  checkingStatus = false;

  payments: any[] = [];
  ddata: any[] = [];
  ypdata: any;
  idData: any;

  alertMessage: string = '';
  alertType: string = '';
  errorMessage: string = '';

  coinValue: number = 0;
  calculatedCoins: number = 0;

  constructor(
    private api: UserService,
    private http: HttpClient,
    private token: TokenStorageService,
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.form = this.fb.group({
      amount: ['', [Validators.required, Validators.min(10)]],
      transno: [''],
      note: ['Yohan Coins']
    });
  }

  ngOnInit() {
    (window as any).depositFundComponent = this; // expose to global
    this.DepositeData();
    this.YohanPriceData();
  }

  DepositeData() {
    this.api.DepositeUserData().subscribe({
      next: (res: any) => {
        this.ddata = res.data || [];
      },
      error: (err) => {
        console.error('Error fetching deposit data:', err);
        this.ddata = [];
      }
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

  onSubmit() {
    if (!this.form.valid) return;

    const payload = {
      amount: this.form.value.amount,
      transno: this.form.value.transno,
      note: this.form.value.note
    };

    console.log('🛠 Payload:', payload);

    this.api.DepositWallet(payload).subscribe({
      next: (res: any) => {
         this.form.reset();
        this.idData = null;

        const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
        modalElement.show();

        setTimeout(() => {
          modalElement.hide();
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/deposit']);
          });
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Deposit failed.';
      }
    });
  }

  updateTxHashFromOutside(hash: string) {
    this.form.get('transno')?.setValue(hash);
    console.log('Transaction Hash updated in form:', hash);
  }

}