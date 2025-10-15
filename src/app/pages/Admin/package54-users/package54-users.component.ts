import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-package54-users',
  templateUrl: './package54-users.component.html',
  styleUrls: ['./package54-users.component.css']
})
export class Package54UsersComponent {
 data1:any;
  constructor(private api:AdminService){}
  ngOnInit(){
    this.api.HomeDeliveryOrders().subscribe((res:any)=>{
      console.log(res);
      this.data1=res.data;
    })
  }
  
}
