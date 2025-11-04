import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-total-users-all',
  templateUrl: './total-users-all.component.html',
  styleUrls: ['./total-users-all.component.css']
})
export class TotalUsersAllComponent {
    data1: any; // Full API response
  selectedLevel: string = 'silver'; // Default selected level
  filteredUsers: any[] = []; // Users shown in the table

  constructor(private api: AdminService) {}

  ngOnInit() {
    this.usersdata();
  }

  usersdata() {
    this.api.GetTotalUsersAll().subscribe((res: any) => {
      console.log('alldata', res);
      this.data1 = res.data; // Contains silver, gold, platinum, diamond, crown
      this.onLevelChange(); // Initialize default level (silver)
    });
  }

  // Change table data based on selected level
  onLevelChange() {
    if (!this.data1) return;

    const levelData = this.data1[this.selectedLevel];
    if (Array.isArray(levelData)) {
      this.filteredUsers = levelData;
    } else {
      this.filteredUsers = []; // For "No users Found"
    }
  }

   // ✅ Export only selected level data
  downloadExcel() {
    if (!this.filteredUsers || this.filteredUsers.length === 0) {
      alert(`No data found for ${this.selectedLevel.toUpperCase()} users.`);
      return;
    }

    const exportData = this.filteredUsers.map((u, i) => ({
      'S.No': i + 1,
      'Reg ID': u.reg_id,
      'Name': u.name,
      'Contact': u.contact,
      'Email': u.email,
      'Act Wallet': u.actwallet,
      'Wallet': u.wallet_amount,
      'Aadhar': u.aadhar,
      'Sponsor': u.sponsor,
      'Ref ID': u.ref_id,
      'Position': u.sposition,
      'Pin': u.rpin
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, this.selectedLevel.toUpperCase());

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${this.selectedLevel}_users.xlsx`);
  }

}
