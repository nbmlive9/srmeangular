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
    })
  }

   getdynamicdata() {
    this.api.GetDynamicData().subscribe({
      next: (res: any) => {
        console.log('dydata',res);
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
