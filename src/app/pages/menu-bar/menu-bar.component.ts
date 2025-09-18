import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

declare var bootstrap: any;

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  token1 = this.token;
  model: any[] = [];
  id: any;
  data: any;

  constructor(
    private token: TokenStorageService,
    private api: AdminService,
    private activeroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.token.isAdmin()) {
      this.model = [
        { label: 'Dashboard', icon: 'fa fa-home', routerLink: ['/dashboard'] },
        // { label: 'Packages', icon: 'fa fa-database', routerLink: ['/packages'] },
        // { label: 'Transfer Wallet', icon: 'fab fa-bitcoin', routerLink: ['/activationwallet'] },
        // { label: 'Deposites', icon: 'fa fa-home', routerLink: ['/deposites'] },
        { label: 'Users', icon: 'fa fa-users', routerLink: ['/users'] },
        // { label: 'Wallet', icon: 'fas fa-wallet', routerLink: ['/wallet'] },
        // { label: 'Icon Club Users', icon: 'fa fa-users', routerLink: ['/silverusers'] },
        // { label: 'Royalty Users', icon: 'fa fa-users', routerLink: ['/royaltyusers'] },
        // { label: 'Award Users', icon: 'fa fa-trophy', routerLink: ['/awardusers'] },
        // { label: 'Profile', icon: 'fa fa-user', routerLink: ['/updateprofile'] },
        // { label: 'Add News', icon: 'fa fa-home', routerLink: ['/addnews'] },
        // { label: 'Support', icon: 'fas fa-comment', routerLink: ['/adminsupport'] }
      ];
    }

    if (this.token.isUser()) {
      this.model = [
        { label: 'Dashboard', icon: 'fa fa-home', routerLink: ['/mydashboard'] },
        { label: 'Profile', icon: 'fa fa-user-edit', routerLink: ['/myprofile'] },
        { label: 'Deposite', icon: 'fas fa-landmark', routerLink: ['/despositesreq'] },
        { label: 'Activation', icon: 'fa fa-check-circle', routerLink: ['/activation'] },
        { label: 'Transfer Wallet', icon: 'fa fa-cube', routerLink: ['/transferwallet'] },
        { label: 'My Team', icon: 'fa fa-users', routerLink: ['/referrals'] },
        { label: 'Withdraw', icon: 'fab fa-bitcoin', routerLink: ['/walletwithdraw'] },
        { label: 'My Earnings', icon: 'fa fa-wallet', routerLink: ['/myincomes'] },
        { label: 'Support', icon: 'fas fa-comment', routerLink: ['/support'] }
      ];
    }
  }

  logout() {
    this.token1.signOut();
  }

  openSidebar() {
    const sidebarModal = document.getElementById('sidebarModal');
    if (sidebarModal) {
      const modal = new bootstrap.Offcanvas(sidebarModal);
      modal.show();
    }
  }

 closeSidebar() {
  const sidebarModal = document.getElementById('sidebarModal');
  if (sidebarModal) {
    const modal = bootstrap.Offcanvas.getInstance(sidebarModal);
    if (modal) {
      modal.hide();
    }
  }

  // Optional: Re-enable scroll on body
  document.body.classList.remove('offcanvas-backdrop', 'modal-open');
  document.body.style.overflow = 'auto';
}


}
