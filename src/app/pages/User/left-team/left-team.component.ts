import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-left-team',
  templateUrl: './left-team.component.html',
  styleUrls: ['./left-team.component.css']
})
export class LeftTeamComponent {
  ldata: any;

  constructor(private api:UserService){}

  ngOnInit(){
    this.api.LeftTeamData().subscribe((res:any)=>{
console.log('left',res);
this.ldata=res.data;
 })
  }

}
