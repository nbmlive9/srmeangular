import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var $: any;
@Component({
  selector: 'app-royalty-users-data',
  templateUrl: './royalty-users-data.component.html',
  styleUrls: ['./royalty-users-data.component.css']
})
export class RoyaltyUsersDataComponent {
  data1:any;
   tooltipText = 'ICON EXECUTIVE BAG + ICON PEN + ICON BROCHURES + ICON BADGE + ICON ROYALTY ACHIEVER CERTIFICATE';
   selectedId: any = null;
     
  constructor(private api:AdminService, private router:Router){}
   ngOnInit() {
     this.api.TotalRoyaltyUsers().subscribe((res: any) => {
    console.log('royal', res);
    // Sort data: rewardstatus '1' first, then others
    this.data1 = res.data.sort((a: any, b: any) => {
      if (a.rewardstatus === '1' && b.rewardstatus !== '1') return -1;
      if (a.rewardstatus !== '1' && b.rewardstatus === '1') return 1;
      return 0;
    });
  });
  }

  // Open modal and store ID
  openConfirmModal(id: any) {
    this.selectedId = id;
    $('#confirmModal').modal('show');
  }

  // Called when user confirms in the modal
  confirmAction() {
    $('#confirmModal').modal('hide');
    if (this.selectedId) {
      this.confirm(this.selectedId);
    }
  }

  closeModal() {
  $('#confirmModal').modal('hide');
}

  // Actual API call to confirm/deliver award
  confirm(id: any) {
    this.api.AwardDelivered(id).subscribe(
      (res: any) => {
        console.log('Confirmed:', res);
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/royaltyusers']);
          });
        }, 500);
      },
      (error: any) => {
        console.error('Error in confirming:', error);
      }
    );
  }

}
