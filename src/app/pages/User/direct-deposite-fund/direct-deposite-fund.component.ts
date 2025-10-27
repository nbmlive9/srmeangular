import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-direct-deposite-fund',
  templateUrl: './direct-deposite-fund.component.html',
  styleUrls: ['./direct-deposite-fund.component.css']
})
export class DirectDepositeFundComponent {


  form:FormGroup;
    data2:any;
    idselectmsg: string = '';
    regname:any;
    errorMessage: string = '';
    tdata:any;
  pfdata: any;
  successMessage: string = '';
    constructor(private api:UserService, private fb:FormBuilder, private router:Router,   public activeModal: NgbActiveModal ){
        this.form = this.fb.group({
                regid: ['', Validators.required], 
                amount: ['', [Validators.required, Validators.min(1)]], 
                transno: ['', ], 
                note: [''], 
              });
    }

  ngOnInit() {
    //get profile
       this.api.UProfile().subscribe((res: any) => {
      // console.log('profile', res);
      this.pfdata = res.data[0];
    });
   
  }

   onRegisterIdSelect(event: any) {
  const id = event.target.value.trim();

  // If empty, reset messages and stop here (no API call)
  if (!id) {
    this.regname = null;
    this.idselectmsg = '';
    this.errorMessage = '';
    return;
  }

  this.api.GetusersDataByRegID(id).subscribe(
    (res4: any) => {
      if (res4 && res4.data && res4.data.length > 0) {
        this.regname = res4.data[0];
        this.idselectmsg = `User Name: ${this.regname.name}`;
        this.errorMessage = '';
      } else {
        this.regname = null;
        this.errorMessage = 'User Not Available';
        this.idselectmsg = '';
      }
    },
    (err: any) => {
      this.regname = null;
      this.idselectmsg = '';
      this.errorMessage = 'Enter valid Userid';
    }
  );
}

  add(){
    console.log(this.form.value);
    if (this.form.valid) {
      const val = {
        regid: this.form.value.regid,
        amount:this.form.value.amount,
        transno: this.form.value.transno,
        note:this.form.value.note,
      };
      this.api.DirectDepositeFundUser(val).subscribe(
        (a:any) => {
          if (a) {
            // console.log(a);
               this.form.reset();
               this.activeModal.close();
              //  this.reloadPage();
               setTimeout(() => {
                 this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate(['/directreg']);
                 });
                 }, 500);
          } else {
            // console.log(a);
            this.errorMessage = a.msg.message;
          
          }
        },
        (err: any) => {
          console.error(err);
          // this.errorMessage = err.error.message;
           
        },
      );
    }
  }

}
