import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-income-report',
  templateUrl: './my-income-report.component.html',
  styleUrls: ['./my-income-report.component.css']
})
export class MyIncomeReportComponent {


     sponsor: boolean = false;
    matching: boolean = true;
    pfdata: any;
    showSection(section: string) {
      this.sponsor = section === 'sponsor';
      this.matching = section === 'matching';
    }
  
  constructor(private api: UserService, private router: Router) {}
  
  ngOnInit() {
    this.api.UProfile().subscribe((res:any)=>{
      console.log('profile',res);
      this.pfdata=res.data[0];
    })
  }

}
