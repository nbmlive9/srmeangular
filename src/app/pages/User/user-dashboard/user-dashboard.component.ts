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


  constructor(private api:UserService){}

  ngOnInit(){
    this.api.UProfile().subscribe((res:any)=>{
        console.log('profile',res);
        this.pdata=res.data[0];
    })
  }


//     @ViewChild('qrSection', { static: false }) qrSection!: ElementRef;
//     @ViewChild('confirmModal') confirmModal!: TemplateRef<any>;
//       @ViewChild('activationModal') activationModal!: TemplateRef<any>;
//   tooltipText = 'ICON EXECUTIVE BAG + ICON PEN + ICON BROCHURES + ICON BADGE + ICON ROYALTY ACHIEVER CERTIFICATE';
//   silver = 'Ipad Mini ($540) + $540 Cash or Gold + Dubai Trip';
//   silver1='Direct 10 Rerferrals + Indirect 100 referrals to qualify Gold Rank Upgrade';
//   gold = 'Iphone ($1000) + $1000 Cash or Gold + Abroad Trip for Couple';
//   gold1='Direct 10 Rerferrals + Indirect 100 referrals to qualify Diamond Rank Upgrad';
//   diamond='Luxury Car + $10,000 Gold + Luxury Villa + Grop Couple Trip';
//   diamond1='Direct 10 Rerferrals + Indirect 100 referrals';

// data2:any;
// data3:any;
//  qrImageUrl: string = '';

//  regid: string = ''; // Holds selected regid or from data2
// selectedPackage: { name: string, code: string } = { name: '', code: '' };
// udata:any;
// form:FormGroup;
// acdata:any;
//   constructor(private api:UserService, private clipboard: Clipboard, private modalService: NgbModal, private router:Router, private toastr:ToastrService, private fb:FormBuilder){
//         this.form = this.fb.group({
//               regid: ['',], 
//               package: ['', ], 
//             });
//   }

//   ngOnInit(){
//     this.getdashboardHome();
//     this.api.AchivedData().subscribe((res:any)=>{
//         // console.log('achiveddata',res);
//         this.acdata=res.data;
//     })
//   }

//     getdashboardHome() {
//     this.api.UDashboardData().subscribe((res: any) => {
//       // console.log('homedata', res);
//       this.data2 = res.data;
//       this.regid = res.data?.profiledata?.[0]?.regid;
//       if (this.regid) {
//         const url = `https://iconistar.net/auth-sponsorsignup/${this.regid}`;
//         this.generateQRCode(url);
//       }
//     });
//   }

//  openConfirmModal(packageCode: string, packageLabel: string) {
//   this.selectedPackage = {
//     name: packageLabel,
//     code: packageCode
//   };

//   this.form.patchValue({
//     regid: this.regid,
//     package: packageCode
//   });

//   this.modalService.open(this.confirmModal, { centered: true });
// }

// lowCreditMessage: string = '';

// confirmAction(modalRef: any) {
//   modalRef.close();
//   const val = this.form.value;

//   this.api.ActivatePackage(val).subscribe(
//     (res: any) => {
//       // If response contains the error message
//       if (res.message === "User Have Low Credits") {
//         this.lowCreditMessage = res.message;// Auto-clear message after 5 seconds
//         return;
//       }

//       // Proceed if package is successfully activated
//       this.udata = res.data;
//       this.form.reset();
//       this.toastr.success('Package activated successfully!');
//       this.modalService.open(this.activationModal, { centered: true });

//       setTimeout(() => {
//         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
//           this.router.navigate(['/mydashboard']);
//         });
//       }, 500);
//     },
//     (err: any) => {
//       this.toastr.error('Activation failed!');
//     }
//   );
// }


//   generateQRCode(data: string) {
//     QRCode.toDataURL(data)
//       .then((url:any) => {
//         this.qrImageUrl = url;
//       })
//       .catch((err:any) => {
//         console.error('QR Code generation error:', err);
//       });
//   }

//   downloadQR(): void {
//     if (!this.qrSection) return;

//     html2canvas(this.qrSection.nativeElement).then(canvas => {
//       const link = document.createElement('a');
//       link.download = 'sponsor_qrcode.png';
//       link.href = canvas.toDataURL('image/png');
//       link.click();
//     });
//   }

//   shareWhatsApp(regid: any) {
//   const text = `Welcome to ICONISTAR Family! Please click the link below to join our team for registration: https://iconistar.net/auth-sponsorsignup/${regid}`;
//   const encodedText = encodeURIComponent(text);
//   const url = `https://api.whatsapp.com/send?text=${encodedText}`;
//   window.open(url, '_blank');
// }

// shareTelegram(regid: any) {
//   const text = `Welcome to ICONISTAR Family! Please click the link below to join our team for registration: https://iconistar.net/auth-sponsorsignup/${regid}`;
//   const encodedText = encodeURIComponent(text);
//   const url = `https://t.me/share/url?url=https://iconistar.net/auth-sponsorsignup/${regid}&text=${encodedText}`;
//   window.open(url, '_blank');
// }

// shareFacebook(regid: any) {
//   const shareUrl = `https://iconistar.net/auth-sponsorsignup/${regid}`;
//   const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
//   window.open(url, '_blank');
// }


//   copyValue(value: string): void {
//     this.clipboard.copy(value);
//   }

  // activatePackage() {
  // const val = {
  //   regid: this.regid,
  //   package: this.packageName,
  // };

  // this.api.ActivatePackage(val).subscribe(
  //   (res: any) => {
  //     if (res && res.data) {
  //       this.udata = res.data;
  //       this.toastr.success('Package Activated!');
  //       this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //         this.router.navigate(['/mydashboard']);
  //       });
  //     }
  //   },
  //   (err: any) => {
  //     this.toastr.error('Activation failed.');
  //   }
  // );
  // }

  
}
