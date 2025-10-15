import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-package45-users',
  templateUrl: './package45-users.component.html',
  styleUrls: ['./package45-users.component.css']
})
export class Package45UsersComponent {
      data1:any;
    constructor(private api:AdminService){}
    ngOnInit(){
      this.api.CompletedOrders().subscribe((res:any)=>{
        console.log(res);
        this.data1=res.data;
      })
    }

}
