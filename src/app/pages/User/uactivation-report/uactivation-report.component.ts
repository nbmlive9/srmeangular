import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-uactivation-report',
  templateUrl: './uactivation-report.component.html',
  styleUrls: ['./uactivation-report.component.css']
})
export class UactivationReportComponent {
data1:any;
loading:boolean=true;
  constructor(private api:UserService){}

  ngOnInit() {
   this.getActivationReport();
  }

  getActivationReport(){
        this.api.ActivationData().subscribe((res:any)=>{
      console.log('act data',res);
      this.data1=res.data;
      this.loading = false;
    },
    error => {
      console.error('Error loading data:', error);
      this.loading = false; // Set loading to false even on error
    })
  }
  
 

}
