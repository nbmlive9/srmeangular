import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-platinum-team',
  templateUrl: './platinum-team.component.html',
  styleUrls: ['./platinum-team.component.css']
})
export class PlatinumTeamComponent {


    data1: any[] = []; // Left team
      data2: any[] = []; // Right team
      activeTab: string = 'left'; // Default tab
    
      constructor(private api: UserService) {}
    
      ngOnInit() {
        this.loadTeams();
      }
    
      loadTeams() {
        // Load Left Team
        this.api.PlatinumLeftTeam().subscribe((res: any) => {
          console.log('p Left:', res);
          this.data1 = res.data || [];
        });
    
        // Load Right Team
        this.api.PlatinumRightTeam().subscribe((res: any) => {
          console.log('p Right:', res);
          this.data2 = res.data || [];
        });
      }
    
      // Tab change handler
      setTab(tab: string) {
        this.activeTab = tab;
      }

}
