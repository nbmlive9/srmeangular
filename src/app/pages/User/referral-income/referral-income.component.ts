import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-referral-income',
  templateUrl: './referral-income.component.html',
  styleUrls: ['./referral-income.component.css']
})
export class ReferralIncomeComponent {

 data1:any;
  constructor(private api:UserService){}

  ngOnInit() {
      //get pending report
       this.api.DirectReferralClubIncome().subscribe((res: any) => {
      // console.log('income', res);
      this.data1 = res.data.directdata;
    });
  }
  
  

}
