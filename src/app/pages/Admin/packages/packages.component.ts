import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent {
data:any;
form:FormGroup;
  user54: boolean = true;
  user306: boolean = false;
  user45: boolean = false;
  showSection(section: string) {
    this.user54 = section === 'user54';
    this.user306 = section === 'user306';
    this.user45 = section === 'user45';
  }
  constructor(private api:AdminService, private fb:FormBuilder, private router:Router) { 
      this.form = this.fb.group({
      pname: ['', Validators.required],
      amount: ['', Validators.required],
    });
  } 

  ngOnInit() {
    this.getpackages();
  }

  getpackages() {
    this.api.GetPckages().subscribe((res: any) => {
      console.log(res);
      this.data = res.data;
    });
  }

  add() {
    console.log(this.form.value);
    if (this.form.valid) {  
      const val: any = {
        pname: this.form.value.pname,
        amount: this.form.value.amount,
      };
  
      this.api.AddPackage(val).subscribe(
        (response: any) => {
          console.log('Response:', response);
          this.form.reset();
          setTimeout(() => {
            this.router.navigate(['/packages']);
          }, 500);
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    }
    return false;
  }

}
