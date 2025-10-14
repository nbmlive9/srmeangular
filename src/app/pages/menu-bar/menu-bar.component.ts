import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

declare const bootstrap: any;

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  token1 = this.token;
  model: any[] = [];
  isMobile = false;
  sidebarId = 'sidebarModal';
  pdata: any = { name: 'Admin', reg_id: 'ADMIN001' }; // sample static profile data
  pfdata: any;
  isSidebarOpen = false;
  constructor(
    private token: TokenStorageService,
    private api: AdminService, private uapi:UserService,
    private activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkMobile();
    // Build menu model depending on role
    if (this.token.isAdmin && this.token.isAdmin()) {
      this.model = [
        { label: 'Dashboard', icon: 'fa fa-users', routerLink: ['/adashboard'] },
        { label: 'Add Product', icon: 'fa fa-users', routerLink: ['/addproduct'] },
         { label: 'Despoist', icon: 'fa fa-users', routerLink: ['/deposites'] },
          { label: 'Withdraw', icon: 'fa fa-users', routerLink: ['/wallet'] },
        { label: 'Wallet A/C', icon: 'fa fa-home', routerLink: ['/dashboard'] },
        { label: 'Wallet Payments', icon: 'fab fa-bitcoin', routerLink: ['/activationwallet'] },
        { label: 'Users', icon: 'fa fa-users', routerLink: ['/users'] },
        { label: 'Settings', icon: 'fa fa-cog', routerLink: ['/settings'] }
      ];
    } else if (this.token.isUser && this.token.isUser()) {
      this.model = [
        { label: 'Dashboard', icon: 'fa fa-home', routerLink: ['/mydashboard'] },
        { label: 'Profile', icon: 'fa fa-user-edit', routerLink: ['/myprofile'] },
        { label: 'Deposit', icon: 'fa fa-cube', routerLink: ['/despositesreq'] },
        { label: 'Activation', icon: 'fa fa-check-circle', routerLink: ['/activation'] },
        { label: 'Transfer', icon: 'fa fa-retweet', routerLink: ['/transferwallet'] },
        { label: 'Referrals', icon: 'fa fa-user', routerLink: ['/referrals'] },
        { label: 'My Team', icon: 'fa fa-users', routerLink: ['/team'] },
        { label: 'Withdraw', icon: 'fa fa-wallet', routerLink: ['/walletwithdraw'] },
        { label: 'My Earning', icon: 'fa fa-wallet', routerLink: ['/income'] },
        { label: 'Support', icon: 'fas fa-comment', routerLink: ['/support'] }
      ];
      this.uapi.UProfile().subscribe((res:any)=>{
          console.log('profile',res);
          this.pfdata=res.data[0];
      })
    }
// jkk
    // Example: load profile data if API available (commented)
    // this.api.getProfile().subscribe(res => this.pdata = res.data);

        const sidebarModal = document.getElementById(this.sidebarId);
    if (sidebarModal) {
      sidebarModal.addEventListener('hidden.bs.offcanvas', () => {
        this.isSidebarOpen = false;
      });
    }

  }

  @HostListener('window:resize', [])
  checkMobile() {
    this.isMobile = window.innerWidth < 900;
  }

  logout() {
    this.token1.signOut();
    // optionally route to login
  }

   logout1() {
    this.token1.signOut1();
    // optionally route to login
  }

  toggleSidebar() {
    const sidebarModal = document.getElementById(this.sidebarId);
    if (!sidebarModal) return;

    let offcanvas = bootstrap.Offcanvas.getInstance(sidebarModal);
    if (!offcanvas) offcanvas = new bootstrap.Offcanvas(sidebarModal);

    if (this.isSidebarOpen) {
      offcanvas.hide();
    } else {
      offcanvas.show();
    }

    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    const sidebarModal = document.getElementById(this.sidebarId);
    if (!sidebarModal) return;

    const offcanvas = bootstrap.Offcanvas.getInstance(sidebarModal);
    if (offcanvas) offcanvas.hide();
    this.isSidebarOpen = false;
  }


}
