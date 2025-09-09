import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

declare var $: any;

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {
  paidwallet: boolean = false;
  pendingwallet: boolean = true;
  showSection(section: string) {
    this.paidwallet = section === 'paidwallet';
    this.pendingwallet = section === 'pendingwallet';
  }

openConfirmModal() {
  $('#confirmModal').modal('show');
}

confirmAction() {
  $('#confirmModal').modal('hide');
  // Your actual confirmation logic here
  console.log('Action confirmed!');
}
data:any;
  payid:any;
  rejid:any;
constructor(private api: AdminService, private router:Router){}

ngOnInit(){
     this.api.GetWalletWithdrawRequest().subscribe((res: any) => {
      console.log(res);
    this.data = res.data;
  });
}

 copiedIndex: number | null = null;

copyToClipboard(text: string, index: number): void {
  navigator.clipboard.writeText(text).then(() => {
    this.copiedIndex = index;
    setTimeout(() => {
      this.copiedIndex = null;
    }, 1000); // "Copied!" message disappears after 2 seconds
  }).catch(err => {
    console.error('Clipboard copy failed:', err);
  });
}

pay(id:any){
    this.api.WalletWithdrawPay(id).subscribe((res:any)=>{
        console.log(res);
        this.payid=res.data;
              setTimeout(() => {
               this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                 this.router.navigate(['/wallet']);
               });
             }, 500);
    })
  }

  reject(id:any){
    this.api.WalletWithdrawReject(id).subscribe((res:any)=>{
        // console.log(res);
        this.rejid=res.data;
        setTimeout(() => {
         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
           this.router.navigate(['/wallet']);
         });
       }, 500);
    })
  }




}
