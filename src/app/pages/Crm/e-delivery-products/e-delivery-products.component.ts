import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-e-delivery-products',
  templateUrl: './e-delivery-products.component.html',
  styleUrls: ['./e-delivery-products.component.css']
})
export class EDeliveryProductsComponent {

   data1:any;
  data2: any;
  activeTab: string = 'home'; // default tab
    constructor(private api:AdminService){}
    ngOnInit(){
  this.HomeDeliveryProducts();
  this.LeaderDeliveryData();

    }

    HomeDeliveryProducts(){
       this.api.HomeDeliveryOrders().subscribe((res:any)=>{
      console.log(res);
      this.data1=res.data;
    })
    }

    LeaderDeliveryData(){
          this.api.LeaderDeliveryOrders().subscribe((res:any)=>{
        console.log(res);
        this.data2=res.data;
      });
    }


}
