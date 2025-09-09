import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-gold-coin-users',
  templateUrl: './gold-coin-users.component.html',
  styleUrls: ['./gold-coin-users.component.css']
})
export class GoldCoinUsersComponent {
      data1:any;
            constructor(private api:AdminService){}
            ngOnInit(){
              this.api.GetGoldIncome().subscribe((res:any)=>{
                console.log(res);
                this.data1=res.data;
              })
            }

}
