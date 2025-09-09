import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-gold-income',
  templateUrl: './gold-income.component.html',
  styleUrls: ['./gold-income.component.css']
})
export class GoldIncomeComponent {
data1:any;
  constructor(private api:UserService){}

  ngOnInit() {
      //get pending report
       this.api.GoldIncome().subscribe((res: any) => {
      // console.log('gincome', res);
      this.data1 = res.data;
    });
  }
}
