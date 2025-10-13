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
    });
  }

  
}
