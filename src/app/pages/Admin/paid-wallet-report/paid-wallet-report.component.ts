import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
declare var $: any;
@Component({
  selector: 'app-paid-wallet-report',
  templateUrl: './paid-wallet-report.component.html',
  styleUrls: ['./paid-wallet-report.component.css']
})
export class PaidWalletReportComponent {
  data: any[] = [];
  totalPages = 0;
  constructor(private api:AdminService){}
  ngOnInit() {
    this.api.GetWalletPaidWithdraw().subscribe((res: any) => {
    this.data = res.data;
  });
  }
  
 

}
