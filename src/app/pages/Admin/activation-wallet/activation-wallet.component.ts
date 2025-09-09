import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var $: any;
@Component({
  selector: 'app-activation-wallet',
  templateUrl: './activation-wallet.component.html',
  styleUrls: ['./activation-wallet.component.css']
})
export class ActivationWalletComponent {
  openConfirmModal() {
  if (this.form.valid) {
    $('#confirmModal').modal('show');
  }
}

confirmAction() {
  $('#confirmModal').modal('hide');
  this.add(); // Call the actual transfer logic here
}


form:FormGroup;
selectedUserName = [] = '';
  idselectmsg: string = '';
  regname:any;
  errorMessage: string = '';
  loading: boolean = true;
  tws:any;
  constructor(private api:AdminService, private router:Router, private fb:FormBuilder) { 
    this.form = this.fb.group({
      regid: ['', Validators.required], 
      amount: ['', Validators.required], 
      remark: ['', Validators.required], 
      transactionpassword: ['SK@692#19'], 
    });
  }

  ngOnInit(): void {
    this.TransferwalletReport();
  }

  TransferwalletReport(){
    this.api.TransferwalletReport().subscribe((res:any)=>{
      console.log('tws',res);
      this.tws=res.data;
      this.loading = false;
    },
    error => {
      console.error('Error loading data:', error);
      this.loading = false; // Set loading to false even on error
    })
  }

  onRegisterIdSelect(event: any) {
    const id = event.target.value;
    this.api.GetUserDataByid(id).subscribe(
      (res4: any) => {
        if (res4) {
          console.log(res4);
          this.regname = res4.data[0];
          this.idselectmsg = `User Name: ${this.regname.name} (${this.regname.phone})`;
          this.errorMessage = ''; // Reset the error message when data is correct
        } else {
          console.log(res4);
          this.regname = null; // Reset the regname object when data is incorrect
          this.errorMessage = 'Error fetching user data';
          this.idselectmsg = 'User Not Available';
        }
      },
      (err: any) => {
        this.errorMessage = err.error.message;
        this.regname = null; // Reset the regname object when there's an error
        this.idselectmsg = '';
      }
    );
  }

  add(){
    console.log(this.form.value);
    if (this.form.valid) {
      const val = {
        regid: this.form.value.regid,
        amount:this.form.value.amount,
        remark:this.form.value.remark,
        transactionpassword:this.form.value.transactionpassword,
      };
      this.api.TransferWalletUser(val).subscribe(
        (a:any) => {
          if (a) {
            console.log(a);
               this.form.reset();
              //  this.reloadPage();
               setTimeout(() => {
                 this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                   this.router.navigate(['/activationwallet']);
                 });
                 }, 500);
          } else {
            console.log(a);
            // this.errorMessage = a.msg.message;
         
          }
        },
        (err: any) => {
          // this.errorMessage = err.error.message;
        },
      );
    }
  }
  
}
