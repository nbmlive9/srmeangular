import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-level-income',
  templateUrl: './level-income.component.html',
  styleUrls: ['./level-income.component.css']
})
export class LevelIncomeComponent {
  data1: any[] = [];
  filteredData: any[] = [];
  selectedType: string = 'all';

  constructor(private api: UserService) {}

  ngOnInit() {
    this.api.WalletMatchingReport().subscribe((res: any) => {
      console.log('matching', res);
      this.data1 = res.data || [];
      this.filteredData = this.data1; // show all by default
    });
  }

  // 🔍 Filter function
  filterByType() {
    if (this.selectedType === 'all') {
      this.filteredData = this.data1;
    } else {
      this.filteredData = this.data1.filter(item => item.ttype === this.selectedType);
    }
  }

  // Helper to map readable names
  getTypeLabel(ttype: string): string {
    switch (ttype) {
      case 'level': return 'Level Binary';
      case 'level2': return 'Silver Binary';
      case 'level3': return 'Gold Binary';
      case 'level4': return 'Platinum Binary';
      case 'level5': return 'Diamond Binary';
      case 'level6': return 'Crown Binary';
      default: return ttype;
    }
  }
}
