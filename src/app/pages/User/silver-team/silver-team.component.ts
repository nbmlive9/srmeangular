import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-silver-team',
  templateUrl: './silver-team.component.html',
  styleUrls: ['./silver-team.component.css']
})
export class SilverTeamComponent {
  data1: any[] = []; // Left team
  data2: any[] = []; // Right team
  activeTab: string = 'left'; // Default tab

  constructor(private api: UserService) {}

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    // Load Left Team
    this.api.SilverLeftTeam().subscribe((res: any) => {
      console.log('Silver Left:', res);
      this.data1 = res.data || [];
    });

    // Load Right Team
    this.api.SilverRightTeam().subscribe((res: any) => {
      console.log('Silver Right:', res);
      this.data2 = res.data || [];
    });
  }

  // Tab change handler
  setTab(tab: string) {
    this.activeTab = tab;
  }
}
