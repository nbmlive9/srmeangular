import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.css']
})
export class ReferralsComponent {
data1: any[] = [];
loading = true;
errorMessage = '';
 data: any[] = [];
  paginatedData: any[] = [];
  rowsPerPage = 20;
  rowsOptions = [10, 20, 50, 100];
  currentPage = 1;
  totalPages = 0;
 totalRecords: number = 0;

 direct: boolean = true;
  indirect: boolean = false;
  tdata: any;
  showSection(section: string) {
    this.direct = section === 'direct';
    this.indirect = section === 'indirect';
  }

  constructor(private api:UserService){}

  ngOnInit() {
 this.loadUsers({ first: 0, rows: this.rowsPerPage });
 this.api.DirectReferrals().subscribe((res:any)=>{
console.log('team',res);
this.tdata=res.data;
 })
  }
  
 loadUsers(event: any) {
  const first = event.first || 0;
  const rows = event.rows || this.rowsPerPage;
  const page = Math.floor(first / rows) + 1;

  this.api.DirectTeam(page, rows).subscribe((res: any) => {
    // console.log(res);
    this.data1 = res.data.data;
    this.totalRecords = res.data.total;
    this.totalPages = Math.ceil(this.totalRecords / rows);
  });
}



onPageChange(page: number) {
  if (page >= 1 && page <= this.totalPages) {
    const first = (page - 1) * this.rowsPerPage;
    this.loadUsers({ first, rows: this.rowsPerPage });
  }
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


}
