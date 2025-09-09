import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-received-report',
  templateUrl: './received-report.component.html',
  styleUrls: ['./received-report.component.css']
})
export class ReceivedReportComponent {
tdata:any;
  constructor(private api:UserService){}
  ngOnInit(){
         this.api.ReceivedWalletData().subscribe((res: any) => {
      // console.log('received', res);
      this.tdata = res.data;
    });
  }

}
