import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-level-income',
  templateUrl: './level-income.component.html',
  styleUrls: ['./level-income.component.css']
})
export class LevelIncomeComponent {
  data1: any;
 constructor(private api:UserService){}
  ngOnInit() {
    this.api.WalletMatchingReport().subscribe((res: any) => {
      console.log('mathcing',res);
      this.data1 = res.data;
    });
  }

  

}
