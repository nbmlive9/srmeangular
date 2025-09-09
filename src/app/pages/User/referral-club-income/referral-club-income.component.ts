import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-referral-club-income',
  templateUrl: './referral-club-income.component.html',
  styleUrls: ['./referral-club-income.component.css']
})
export class ReferralClubIncomeComponent {
data1:any;
data2:any;
limitedSponsors: any;
  constructor(private api:UserService){}

  ngOnInit() {
      //get pending report
       this.api.DirectReferralClubIncome().subscribe((res: any) => {
      // console.log('directclub', res);
      this.data1 = res.data;
    });
   this.dashboarddata();
  }

  dashboarddata(){
     this.api.UDashboardData().subscribe((res: any) => {
      // console.log('dashboard', res);
      this.data2 = res.data;
    });
  }
}
