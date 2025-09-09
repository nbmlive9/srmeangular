import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-today-users',
  templateUrl: './today-users.component.html',
  styleUrls: ['./today-users.component.css']
})
export class TodayUsersComponent {
  data: any[] = [];
  paginatedData: any[] = [];
  rowsPerPage = 10;
  rowsOptions = [10, 20, 50, 100];
  currentPage = 1;
  totalPages = 0;
 totalRecords: number = 0;
  TotalUsers: boolean = true;
  TodayUsers: boolean = false;
  Activeusers: boolean = false;
  Inactiveusers: boolean = false;
  tusers:any;
  tjdata:any;
  constructor(private api:AdminService){}
  ngOnInit() {
  this.loadUsers({ first: 0, rows: this.rowsPerPage });
    this.api.GetTodayJoinUsers().subscribe((res: any) => {
    console.log('tjoin',res);
    this.tjdata = res.data;
  });
}

loadUsers(event: any) {
  const first = event.first || 0;
  const rows = event.rows || this.rowsPerPage;
  const page = Math.floor(first / rows) + 1;

  this.api.GetTodayActiveUsers().subscribe((res: any) => {
    console.log('active',res);
    this.data = res.data.data;
    this.totalRecords = res.data.count;
    this.totalPages = Math.ceil(this.totalRecords / rows);
  });
}

goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    const first = (this.currentPage - 1) * this.rowsPerPage;
    this.loadUsers({ first, rows: this.rowsPerPage });
  }
}

onChangeRowsPerPage(value: string): void {
  this.rowsPerPage = +value; // Convert to number
  this.currentPage = 1;
  this.loadUsers({ first: 0, rows: this.rowsPerPage });
}



updatePagination() {
  const start = (this.currentPage - 1) * this.rowsPerPage;
  const end = start + this.rowsPerPage;
  this.paginatedData = this.data.slice(start, end);
}

}
