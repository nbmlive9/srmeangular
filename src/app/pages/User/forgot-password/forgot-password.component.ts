import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  @ViewChild('successModal') successModal!: ElementRef;
 form:FormGroup;
  errorMessage: any;
  constructor(private api:UserService, private fb:FormBuilder, private toastr:ToastrService, private router:Router){
       this.form = this.fb.group({
                    regid: ['', [Validators.required]],
                     email: ['', [Validators.required]],
                  });
  }

  ngOnInit(){}

  forgot() {
      const payload = {
        regid: this.form.value.regid,
         email: this.form.value.email,
      };
    
      this.api.forgotPassword(payload).subscribe({
        next: (res: any) => {
          this.toastr.success('Transfer Successful!', 'Success');
    
          // Reset the form
          this.form.reset();
    
          // Show success modal
          const modalElement = new bootstrap.Modal(this.successModal.nativeElement);
          modalElement.show();
    
          // Automatically close modal and refresh page after 3 seconds
          setTimeout(() => {
            modalElement.hide(); // Close modal
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/forgot']); // Refresh the page
            });
          }, 3000); // 3000ms = 3 seconds
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Activation failed.';
          this.toastr.error(this.errorMessage, 'Error');
        }
      });
    }

}
