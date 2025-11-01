import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-crown-team',
  templateUrl: './crown-team.component.html',
  styleUrls: ['./crown-team.component.css']
})
export class CrownTeamComponent {


      data1: any[] = []; // Left team
        data2: any[] = []; // Right team
        activeTab: string = 'left'; // Default tab
      
        constructor(private api: UserService) {}
      
        ngOnInit() {
          this.loadTeams();
        }
      
        loadTeams() {
          // Load Left Team
          this.api.CrownLeftTeam().subscribe((res: any) => {
            console.log('p Left:', res);
            this.data1 = res.data || [];
          });
      
          // Load Right Team
          this.api.CrownRightTeam().subscribe((res: any) => {
            console.log('p Right:', res);
            this.data2 = res.data || [];
          });
        }
      
        // Tab change handler
        setTab(tab: string) {
          this.activeTab = tab;
        }
  

}
