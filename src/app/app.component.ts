import { Component } from '@angular/core';
import { AutoLogoutService } from './service/auto-logout.service';
import { NavigationEnd, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iconistar';
   constructor(private router: Router, private viewportScroller: ViewportScroller) {
  this.router.events.subscribe((e) => {
    if (e instanceof NavigationEnd) {
      this.viewportScroller.scrollToPosition([0, 0]); // Scroll to top
    }
  });
}
  
}
