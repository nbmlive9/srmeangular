import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-referral-income',
  templateUrl: './referral-income.component.html',
  styleUrls: ['./referral-income.component.css']
})
export class ReferralIncomeComponent {

 data1:any;
   filteredData: any[] = [];
  constructor(private api:UserService){}

  ngOnInit() {
    this.reportsData();
  }
  
 reportsData() {
    this.api.WalletMatchingReport().subscribe((res: any) => {
      console.log('inner matching', res);
      this.data1 = res.data;
      // Filter here
      this.filteredData = this.data1.filter((d: any) => d.ttype === 'innermatch');
    });
  }

  

}
