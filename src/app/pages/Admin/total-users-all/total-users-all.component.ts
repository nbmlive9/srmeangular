import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';

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

}
