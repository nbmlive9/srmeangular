import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {
data1:any;
  constructor(private api:UserService){}
  ngOnInit(){
    this.getPackagesData();
  }

   getPackagesData(){
      this.api.UserOrders().subscribe((res: any) => {
      console.log('orders', res);
      this.data1 = res.data;
    });
  }

}
