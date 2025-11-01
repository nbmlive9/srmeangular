import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-gold-team',
  templateUrl: './gold-team.component.html',
  styleUrls: ['./gold-team.component.css']
})
export class GoldTeamComponent {

  data1: any[] = []; // Left team
    data2: any[] = []; // Right team
    activeTab: string = 'left'; // Default tab
  
    constructor(private api: UserService) {}
  
    ngOnInit() {
      this.loadTeams();
    }
  
    loadTeams() {
      // Load Left Team
      this.api.GoldLeftTeam().subscribe((res: any) => {
        console.log('g Left:', res);
        this.data1 = res.data || [];
      });
  
      // Load Right Team
      this.api.GoldRightTeam().subscribe((res: any) => {
        console.log('g Right:', res);
        this.data2 = res.data || [];
      });
    }
  
    // Tab change handler
    setTab(tab: string) {
      this.activeTab = tab;
    }

}
