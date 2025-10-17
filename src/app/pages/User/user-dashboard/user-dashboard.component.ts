import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Clipboard } from '@angular/cdk/clipboard';
import * as QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  pdata: any;
  data2: any;


  constructor(private api:UserService){}

  ngOnInit(){
    this.api.UProfile().subscribe((res:any)=>{
        console.log('profile',res);
        this.pdata=res.data[0];
    });
    this.getdashboardHome();
  }

getdashboardHome() {
  this.api.UDashboardData().subscribe((res: any) => {
    console.log('homedata', res);
    this.data2 = res.data;

    const perUnitAmount = 3; // example: $3 per unit

    const thresholds: { [key: string]: number[] } = {
  levelpay: [3, 6, 9],
  silverpay: [2, 4, 6, 8],
  goldpay: [2, 4, 6],
  platinumpay: [2, 4, 6],
  diamondpay: [2, 4, 6],
  crownpay: [2, 4, 6]
};

    // Calculate holding amounts based on thresholds
  Object.keys(thresholds).forEach((key: string) => {
  const count = Number(this.data2[key]);
  if (thresholds[key].includes(count)) {
    this.data2[key + 'Holding'] = count * 3;
  } else {
    this.data2[key + 'Holding'] = null;
  }
});
  });
}

  
}
