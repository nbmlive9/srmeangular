import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-right-team',
  templateUrl: './right-team.component.html',
  styleUrls: ['./right-team.component.css']
})
export class RightTeamComponent {

   rdata: any;
  
    constructor(private api:UserService){}
  
    ngOnInit(){
      this.api.RightTeamData().subscribe((res:any)=>{
  console.log('left',res);
  this.rdata=res.data;
   })
    }

}
