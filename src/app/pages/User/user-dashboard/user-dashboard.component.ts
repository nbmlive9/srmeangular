import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  pdata: any;
  data2: any;

  securePinForm!: FormGroup;

  @ViewChild('securePinModal', { static: true })
  securePinModal!: TemplateRef<any>;

  modalRef: NgbModalRef | null = null;

  constructor(
    private api: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.securePinForm = this.fb.group({
      securepin: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]]
    });

    this.loadProfile();
    this.getdashboardHome();
  }

  /* ================= LOAD PROFILE & OPEN MODAL ================= */
  loadProfile(): void {
    this.api.UProfile().subscribe((res: any) => {
      this.pdata = res.data[0];

      if (
        (!this.pdata?.securepin || this.pdata.securepin.trim() === '') &&
        !this.modalRef
      ) {
        this.openSecurePinModal();
      }
    });
  }

  openSecurePinModal(): void {
    this.modalRef = this.modalService.open(this.securePinModal, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      size: 'md'
    });
  }

  /* ================= UPDATE SECURE PIN ================= */
  updateSecurePin(): void {
    if (this.securePinForm.invalid) {
      this.toastr.error('Please enter a valid Secure PIN (4 digits).');
      return;
    }

    this.api.SecurePinUpdate(this.securePinForm.value).subscribe(
      () => {
        this.toastr.success('Secure PIN updated successfully!');

        if (this.modalRef) {
          this.modalRef.close();
          this.modalRef = null;
        }

        // reload dashboard cleanly
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/mydashboard']);
        });
      },
      () => {
        this.toastr.error('Failed to update Secure PIN.');
      }
    );
  }

  /* ================= PIN INPUT VALIDATION ================= */
  onPinInput(event: any): void {
    const input = event.target as HTMLInputElement;
    const cleanValue = input.value.replace(/[^0-9]/g, '').slice(0, 4);
    this.securePinForm.get('securepin')?.setValue(cleanValue, {
      emitEvent: false
    });
  }

  /* ================= DASHBOARD DATA ================= */
  getdashboardHome(): void {
    this.api.UDashboardData().subscribe((res: any) => {
      this.data2 = res.data;

      const perUnitAmounts: { [key: string]: number } = {
        levelpay: 9,
        silverpay: 12,
        goldpay: 24,
        platinumpay: 48,
        diamondpay: 96,
        crownpay: 192
      };

      Object.keys(perUnitAmounts).forEach((key) => {
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

          default:
            if (count >= 2 && count < 4) holding = 1 * perUnit;
            else if (count >= 4 && count < 6) holding = 2 * perUnit;
            break;
        }

        this.data2[key + 'Holding'] = holding;
      });

      this.data2.hasAnyHolding = Object.keys(perUnitAmounts).some(
        key => this.data2[key + 'Holding'] > 0
      );
    });
  }
}
