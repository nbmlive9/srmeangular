import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-ulogin',
  templateUrl: './ulogin.component.html',
  styleUrls: ['./ulogin.component.css']
})
export class UloginComponent {

  password = '';

   form:FormGroup;
  isLoggedIn: boolean = false;
  
  prodata: any;
  responsiveOptions: any[] | undefined;

 showPassword: boolean = false;
errorMessage='';
togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}

    constructor(private router: Router, private fb:FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private uapi:UserService,  private toastr: ToastrService) { 
      this.form = new FormGroup({
        regid: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.maxLength(50),
        ]),
      });
      
    }
  
    ngOnInit(): void {
        
    }

   
    onSubmit(): void {
      const f = this.form.value;
      this.authService.ulogin(f.regid, f.password).subscribe((res:any) => {
          this.tokenStorage.saveToken(res.token);
          this.tokenStorage.saveUser(res);
           this.toastr.success('Login successful!');
          // console.log(res);
          this.reloadPage();
          // this.router.navigate(['/dashboard']);
          // this.router.navigateByUrl('/dashboard');
        },
        (err) => {
          this.errorMessage = err.error.message || 'Login failed. Please try again.';
          this.isLoggedIn = false;
          this.toastr.error(this.errorMessage, 'Error');
        }
      );
    }

    reloadPage(): void {
      this.router.navigateByUrl('/mydashboard');
    }

    

}
