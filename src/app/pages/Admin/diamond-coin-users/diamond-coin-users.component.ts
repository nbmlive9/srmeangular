import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-diamond-coin-users',
  templateUrl: './diamond-coin-users.component.html',
  styleUrls: ['./diamond-coin-users.component.css']
})
export class DiamondCoinUsersComponent {
    data1:any;
          constructor(private api:AdminService){}
          ngOnInit(){
            this.api.GetDiamondIncome().subscribe((res:any)=>{
              console.log(res);
              this.data1=res.data;
            })
          }

}
