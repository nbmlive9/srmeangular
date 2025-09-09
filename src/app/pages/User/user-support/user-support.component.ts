import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-support',
  templateUrl: './user-support.component.html',
  styleUrls: ['./user-support.component.css']
})
export class UserSupportComponent {
data1:any;
 errorMessage: string = '';
    successMessage: string = '';
    form1:FormGroup;
    loading:boolean=true;
  constructor(private api:UserService, private fb:FormBuilder, private router:Router){
       this.form1 = this.fb.group({
                    query: ['', Validators.required], 
                    subject: ['', Validators.required], 
                  });
  }

  ngOnInit(){
        //get pending report
       this.api.GetSupportTickets().subscribe((res: any) => {
      // console.log('tickets', res);
      this.data1 = res.data;
      this.loading=false;
    });
  }


 add() {
    // console.log(this.form1.value);
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form1.valid) {
      const val = {
        query: this.form1.value.query,
        subject: this.form1.value.subject,
      };

      this.api.AddSupport(val).subscribe(
        (a: any) => {
          if (a && a.status === true) {
            // console.log(a);
            this.form1.reset();
            // this.successMessage = a.msg.message || 'Ticket submitted successfully!';
           setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/support']);
              });
            }, 500);
          } else {
            // console.log(a);
             setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/support']);
              });
            }, 500);
          }
        },
        (err: any) => {
          // this.errorMessage = err?.error?.message || 'An unexpected error occurred.';
         setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['/support']);
              });
            }, 500);
        }
      );
    }
  }




}
