import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-right-team',
  templateUrl: './right-team.component.html',
  styleUrls: ['./right-team.component.css']
})
export class RightTeamComponent {
allData: any[] = [];      // All fetched data
  pro: any[] = [];           // Data to display (after filters)
  loading: boolean = false;
  allLoaded: boolean = false;

  page: number = 1;
  perPage: number = 20;

  // Optional filters (example: date range, can be extended)
  startDate: string = '';
  endDate: string = '';

  constructor(private api: UserService) {}

  ngOnInit() {
    this.loadMore(); // Load first page
  }

  /** Scroll event */
  onScroll(event: any): void {
    const target = event.target;
    const threshold = 20; // trigger when 20px from bottom
    const position = target.scrollHeight - target.scrollTop - target.clientHeight;

    if (position <= threshold && !this.loading && !this.allLoaded) {
      this.loadMore();
    }
  }

  /** Load next page */
  loadMore(): void {
    if (this.loading || this.allLoaded) return;

    this.loading = true;

    this.api.RightTeamData(this.page, this.perPage).subscribe({
      next: (res: any) => {
        const newData = res.data?.data || [];

        if (newData.length > 0) {
          this.allData = [...this.allData, ...newData];
          this.applyDateFilter();
          this.page++;
        } else {
          this.allLoaded = true;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users', err);
        if (err.status === 404) this.allLoaded = true;
        this.loading = false;
      }
    });
  }

  /** Filter by date (optional) */
  applyDateFilter(): void {
    if (!this.startDate && !this.endDate) {
      this.pro = [...this.allData];
      return;
    }

    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;

    this.pro = this.allData.filter((wd: any) => {
      const cdate = new Date(wd.crdate);
      if (start && end) return cdate >= start && cdate <= end;
      if (start) return cdate >= start;
      if (end) return cdate <= end;
      return true;
    });
  }

}
