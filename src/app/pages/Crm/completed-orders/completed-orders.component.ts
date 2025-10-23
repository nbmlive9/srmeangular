import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-completed-orders',
  templateUrl: './completed-orders.component.html',
  styleUrls: ['./completed-orders.component.css']
})
export class CompletedOrdersComponent {

        data1:any;
    constructor(private api:AdminService){}
    ngOnInit(){
      this.api.CompletedOrders().subscribe((res:any)=>{
        console.log(res);
        this.data1=res.data;
      })
    }

}
