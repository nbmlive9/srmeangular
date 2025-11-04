import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var bootstrap: any;
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
   @ViewChild('successModal') successModal!: ElementRef;
     @ViewChild('dynamicupdate') dynamicUpdateModal!: ElementRef;
  data1: any;
  dydata: any;
form1:FormGroup;
errorMessage='';
totalAvailableAmount: number = 0;



  constructor(private api:AdminService, private fb:FormBuilder, private router:Router){
    
      this.form1 = this.fb.group({
      coinvalue: ['', ],
    });
  }

  ngOnInit(){
    this.getHomedata();
    this.getdynamicdata();
  }

  getHomedata(){
    this.api.AdminDashboard().subscribe((res:any)=>{
        console.log(res);
        this.data1=res.data;
            // ✅ Now calculate after data is available
    if (this.data1) {
      this.calculateTotalAvailable(this.data1);
    }

    })
  }

  calculateTotalAvailable(data1: any) {
  const totalCredit = data1?.totalcredit || 0;
  const totalProductCost = (data1?.totalwithproducts * 2.5) || 0;

  const totalOutputFunds =
    ((data1?.totallevel * 7.5 || 0) +
    (data1?.totallevelinner * 1.02 || 0) +
    (data1?.totalsilver * 10.2 || 0) +
    (data1?.totalgold * 20.4 || 0) +
    (data1?.totalplatinum * 40.8 || 0) +
    (data1?.totaldiamond * 81.6 || 0) +
    (data1?.totalcrown * 163.2 || 0));

  const totalHoldingWallet =
    ((data1?.totalsilvertrash * 12 || 0) +
    (data1?.totalgoldtrash * 24 || 0) +
    (data1?.totalplatinumtrash * 48 || 0) +
    (data1?.totaldiamondtrash * 96 || 0) +
    (data1?.totalcrowntrash * 192 || 0));

  const totalSilverRewards = (data1?.totalsilver * 4) || 0;

  this.totalAvailableAmount =
    totalOutputFunds - totalHoldingWallet - totalProductCost - totalSilverRewards;
}

   getdynamicdata() {
    this.api.GetDynamicData().subscribe({
      next: (res: any) => {
        // console.log('dydata',res);
        this.dydata = res.data;
      }
    });
  }

    UpdateDynamicdata() {
    if (this.form1.invalid) return;

    const payload = { coinvalue: this.form1.value.coinvalue };

    this.api.UpdateDynamicData(payload).subscribe({
      next: (res: any) => {
        // Close the modal
        const modal = bootstrap.Modal.getInstance(this.dynamicUpdateModal.nativeElement);
        if (modal) modal.hide();

        // Refresh data (or page)
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/adashboard']);
          });
        }, 500);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Update failed.';
      }
    });
  }

}
