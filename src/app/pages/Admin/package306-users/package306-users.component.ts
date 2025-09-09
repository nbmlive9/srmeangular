import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-package306-users',
  templateUrl: './package306-users.component.html',
  styleUrls: ['./package306-users.component.css']
})
export class Package306UsersComponent {
   data1:any;
    constructor(private api:AdminService){}
    ngOnInit(){
      this.api.Get306PackageUsers().subscribe((res:any)=>{
        console.log(res);
        this.data1=res.data;
      })
    }

}
