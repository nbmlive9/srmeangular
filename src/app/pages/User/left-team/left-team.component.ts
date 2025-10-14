import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-left-team',
  templateUrl: './left-team.component.html',
  styleUrls: ['./left-team.component.css']
})
export class LeftTeamComponent {
   data1: any[] = [];
  loading = true;

  rowsPerPage = 10;
  currentPage = 1;
  totalRecords = 0;
  totalPages = 0;

  // For dynamic page range
  pageRangeStart = 1;
  pageRangeEnd = 5; // Show 5 page buttons at a time
 Math = Math;
  constructor(private api: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    const page = this.currentPage;

    this.api.LeftTeamData(page, this.rowsPerPage).subscribe((res: any) => {
      this.data1 = res.data.data;
      this.totalRecords = res.data.count;
      this.totalPages = Math.ceil(this.totalRecords / this.rowsPerPage);
      this.loading = false;
    }, () => this.loading = false);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadUsers();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadUsers();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    let start = Math.floor((this.currentPage - 1) / this.rowsPerPage) * this.rowsPerPage + 1;
    let end = Math.min(start + this.rowsPerPage - 1, this.totalPages);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  getStartIndex() {
    return (this.currentPage - 1) * this.rowsPerPage + 1;
  }

  getEndIndex() {
    return Math.min(this.currentPage * this.rowsPerPage, this.totalRecords);
  }


}
