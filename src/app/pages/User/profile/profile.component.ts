import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
data1: any;
  pfdata: any;
  loading: boolean = true;

  form: FormGroup;   // Profile update form
  form1: FormGroup;  // OTP form

  currentTab: 'profile' | 'password' = 'profile';
  isEdit: boolean = false;
  showOtpForm: boolean = false;
showPassword = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

maskPassword(pwd: string): string {
  return pwd ? '*'.repeat(pwd.length) : '';
}
  constructor(
    private api: UserService,
    private fb: FormBuilder,
    private toast: ToastrService, private router:Router
  ) {
    // Profile form
    this.form = this.fb.group({
      name: ['', ],
      email: ['', [Validators.email]],
      aadhar: ['',],
      password: ['']
    });

    // OTP form
    this.form1 = this.fb.group({
      otp: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.GetProfile();
  }

  /** Fetch user profile data */
  GetProfile() {
    this.loading = true;
    this.api.UDashboardData().subscribe({
      next: (res: any) => {
        this.data1 = res.data;
        this.pfdata = res.data.profiledata;
        this.loading = false;
      },
      error: (err) => {
        this.toast.error('Failed to fetch profile data', 'Error');
        this.loading = false;
      }
    });
  }

  /** Switch between Profile and Password tabs */
  switchTab(tab: 'profile' | 'password') {
    this.currentTab = tab;
  }

  /** Open edit mode and pre-fill form */
  edit() {
    this.isEdit = true;
    this.showOtpForm = false; // Reset OTP section
    this.form.patchValue({
      name: this.pfdata?.name,
      email: this.pfdata?.email,
      aadhar: this.pfdata?.aadhar,
      password: this.pfdata?.password,
    });
  }

  /** Step 1: Generate OTP before updating */
 save() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.api.GenerateOtp().subscribe({
    next: (res: any) => {
      if (res.status === 1) {
        this.toast.success(res?.message || 'OTP sent ✅', 'Success');
        this.showOtpForm = true;

        // ✅ Reset OTP form when showing
        this.form1.reset();
      } else {
        this.toast.error(res?.message || 'OTP generation failed ❌', 'Error');
      }
    },
    error: () => {
      this.toast.error('OTP generation failed ❌', 'Error');
    }
  });
}


  /** Step 2: Verify OTP and call save API */
  verifyOtpAndSave() {
    if (this.form1.invalid) {
      this.form1.markAllAsTouched();
      return;
    }

    const payload = { otp: this.form1.value.otp };

    this.api.VerifyOtp(payload).subscribe({
      next: (res: any) => {
        if (res.status === 1) {
          this.toast.success(res?.message || 'OTP Verified ✅', 'Success');
          this.callSaveApi(); // Proceed to update profile
        } else {
          this.toast.error(res?.message || 'Invalid OTP ❌', 'Error');
        }
      },
      error: () => {
        this.toast.error('OTP verification failed ❌', 'Error');
      }
    });
  }

  /** Final Step: Update profile */
  /** Final Step: Update profile */
callSaveApi() {
  const payload = this.form.value;

  this.api.UpdateUserProfile(payload).subscribe({
    next: (res: any) => {
      if (res.status === 1) {
        this.toast.success(res?.message || 'Profile updated ✅', 'Success');
        this.isEdit = false;
        this.showOtpForm = false;
        this.form1.reset();

        // ✅ Close modal
        const modal = document.getElementById('editModal');
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) modalInstance.hide();
        }

        // ✅ Reload profile data
        this.GetProfile();

        // ✅ Force reload component (optional)
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/profile']);
        });
      } else {
        this.toast.error(res?.message || 'Update failed ❌', 'Error');
      }
    },
    error: () => {
      this.toast.error('Something went wrong ❌', 'Error');
    }
  });
}

}
