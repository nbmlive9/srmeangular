import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-diamond-income',
  templateUrl: './diamond-income.component.html',
  styleUrls: ['./diamond-income.component.css']
})
export class DiamondIncomeComponent {
data1:any;
  constructor(private api:UserService){}

  ngOnInit() {
      //get pending report
       this.api.DiamondIncome().subscribe((res: any) => {
      // console.log('dincome', res);
      this.data1 = res.data;
    });
  }
}
