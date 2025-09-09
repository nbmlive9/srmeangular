import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-award-users-data',
  templateUrl: './award-users-data.component.html',
  styleUrls: ['./award-users-data.component.css']
})
export class AwardUsersDataComponent {
   data1:any;
   data2:any;
   data3:any;
   filteredData: any[] = [];
    filteredData1: any[] = [];
    filteredData2: any[] = [];
        constructor(private api:AdminService, private router:Router){}
        ngOnInit(){
          this.getSilverData();
          this.getGoldData();
          this.getDiamondData();
        }

       getSilverData() {
         this.api.GetSilverIncome().subscribe((res:any)=>{
          console.log(res);
          this.data1=res.data;
           this.filteredData = this.data1.filter((item: any) => item.awardstatus === '1');
          });
        }

        getGoldData() {
         this.api.GetGoldIncome().subscribe((res:any)=>{
          console.log(res);
          this.data2=res.data;
           this.filteredData1 = this.data2.filter((item: any) => item.awardstatus === '1');
          });
        }

        getDiamondData() {
         this.api.GetDiamondIncome().subscribe((res:any)=>{
          console.log(res);
          this.data3=res.data;
           this.filteredData2 = this.data3.filter((item: any) => item.awardstatus === '1');
          });
        }

        //Silver Function
        showConfirmModal: boolean = false;
        pendingAwardId: any = null;

                silver(id: any) {
          this.pendingAwardId = id;
          this.showConfirmModal = true;
        }

        confirmSilver() {
          if (!this.pendingAwardId) return;

          this.api.silveraward(this.pendingAwardId).subscribe(
            (res: any) => {
              console.log(res);
              this.closeConfirmModal();
              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/awardusers']);
                });
              }, 500);
            },
            (error: any) => {
              console.error(error);
              this.closeConfirmModal();
            }
          );
        }

        closeConfirmModal() {
          this.showConfirmModal = false;
          this.pendingAwardId = null;
        }

      //Gold Function
        showConfirmModal1: boolean = false;
        pendingAwardId1: any = null;

                gold(id: any) {
          this.pendingAwardId1 = id;
          this.showConfirmModal1 = true;
        }

        confirmGold() {
          if (!this.pendingAwardId1) return;

          this.api.goldaward(this.pendingAwardId1).subscribe(
            (res: any) => {
              console.log(res);
              this.closeConfirmModal1();
              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/awardusers']);
                });
              }, 500);
            },
            (error: any) => {
              console.error(error);
              this.closeConfirmModal1();
            }
          );
        }

        closeConfirmModal1() {
          this.showConfirmModal1 = false;
          this.pendingAwardId1 = null;
        }

        //Diamond Function
        showConfirmModal2: boolean = false;
        pendingAwardId2: any = null;

                diamond(id: any) {
          this.pendingAwardId2 = id;
          this.showConfirmModal2 = true;
        }

        confirmDiamond() {
          if (!this.pendingAwardId2) return;

          this.api.diamondaward(this.pendingAwardId2).subscribe(
            (res: any) => {
              console.log(res);
              this.closeConfirmModal2();
              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/awardusers']);
                });
              }, 500);
            },
            (error: any) => {
              console.error(error);
              this.closeConfirmModal2();
            }
          );
        }

        closeConfirmModal2() {
          this.showConfirmModal2 = false;
          this.pendingAwardId2 = null;
        }


}
