import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-silver-income',
  templateUrl: './silver-income.component.html',
  styleUrls: ['./silver-income.component.css']
})
export class SilverIncomeComponent {
data1:any;
  constructor(private api:UserService){}

  ngOnInit() {
      //get pending report
       this.api.SilverIncome().subscribe((res: any) => {
      // console.log('sincome', res);
      this.data1 = res.data;
    });
  }
}
