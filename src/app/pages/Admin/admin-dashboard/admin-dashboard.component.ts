import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  data1: any;

  constructor(private api:AdminService){}

  ngOnInit(){
    this.getHomedata();
  }

  getHomedata(){
    this.api.AdminDashboard().subscribe((res:any)=>{
        console.log(res);
        this.data1=res.data;
    })
  }

}
