import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-silver-coin-users',
  templateUrl: './silver-coin-users.component.html',
  styleUrls: ['./silver-coin-users.component.css']
})
export class SilverCoinUsersComponent {
   data1:any;
     silver: boolean = true;
  gold: boolean = false;
  diamond: boolean = false;
   showSection(section: string) {
    this.silver = section === 'silver';
    this.gold = section === 'gold';
    this.diamond = section === 'diamond';
  }
        constructor(private api:AdminService){}
        ngOnInit(){
          this.api.GetSilverIncome().subscribe((res:any)=>{
            console.log(res);
            this.data1=res.data;
          })
        }

}
