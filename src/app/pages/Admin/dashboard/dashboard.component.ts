import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
data1:any;
  constructor(private api:AdminService){}

  ngOnInit(){
  this.api.AdminHome().subscribe((res:any)=>{
    console.log(res);
    this.data1=res.data;
   })
  }

}
