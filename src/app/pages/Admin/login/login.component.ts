import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  password = '';

  showPassword: boolean = false;
errorMessage='';
togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}
  form:FormGroup;
    isLoggedIn: boolean = false;

  constructor(private router:Router, private authService:AuthService, private tokenStorage:TokenStorageService) {
        this.form = new FormGroup({
      username: new FormControl('', Validators.required),
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
    this.authService.login(f.username, f.password).subscribe(
      (res) => {
        this.tokenStorage.saveToken(res.token);
        this.tokenStorage.saveUser(res);
        console.log(res);
        this.reloadPage();
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/adashboard']);
          });
        }, 500);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoggedIn = false;
      }
    );
  }
  
  reloadPage(): void {
    this.router.navigateByUrl('/adashboard');
  }
 
   
  
}
