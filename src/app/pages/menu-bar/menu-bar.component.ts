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
        { label: 'Dashboard', icon: 'fa fa-home', routerLink: ['/dashboard'] },
        { label: 'Wallet Payments', icon: 'fab fa-bitcoin', routerLink: ['/activationwallet'] },
        { label: 'Users', icon: 'fa fa-users', routerLink: ['/users'] },
        { label: 'Settings', icon: 'fa fa-cog', routerLink: ['/settings'] }
      ];
    } else if (this.token.isUser && this.token.isUser()) {
      this.model = [
        { label: 'Dashboard', icon: 'fa fa-home', routerLink: ['/mydashboard'] },
        { label: 'Profile', icon: 'fa fa-user-edit', routerLink: ['/myprofile'] },
        { label: 'Activation', icon: 'fa fa-check-circle', routerLink: ['/activation'] },
        { label: 'Support', icon: 'fas fa-comment', routerLink: ['/support'] }
      ];
      this.uapi.UProfile().subscribe((res:any)=>{
          console.log('profile',res);
          this.pfdata=res.data[0];
      })
    }

    // Example: load profile data if API available (commented)
    // this.api.getProfile().subscribe(res => this.pdata = res.data);
  }

  @HostListener('window:resize', [])
  checkMobile() {
    this.isMobile = window.innerWidth < 900;
  }

  logout() {
    this.token1.signOut();
    // optionally route to login
  }

  openSidebar() {
    const sidebarModal = document.getElementById(this.sidebarId);
    if (sidebarModal) {
      const offcanvas = new bootstrap.Offcanvas(sidebarModal);
      offcanvas.show();
    }
  }

  closeSidebar() {
    const sidebarModal = document.getElementById(this.sidebarId);
    if (sidebarModal) {
      const offcanvas = bootstrap.Offcanvas.getInstance(sidebarModal);
      if (offcanvas) offcanvas.hide();
    }
  }
}
