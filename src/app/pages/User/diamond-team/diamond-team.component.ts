import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-diamond-team',
  templateUrl: './diamond-team.component.html',
  styleUrls: ['./diamond-team.component.css']
})
export class DiamondTeamComponent {


      data1: any[] = []; // Left team
        data2: any[] = []; // Right team
        activeTab: string = 'left'; // Default tab
      
        constructor(private api: UserService) {}
      
        ngOnInit() {
          this.loadTeams();
        }
      
        loadTeams() {
          // Load Left Team
          this.api.DiamondLeftTeam().subscribe((res: any) => {
            console.log('d Left:', res);
            this.data1 = res.data || [];
          });
      
          // Load Right Team
          this.api.DiamondRightTeam().subscribe((res: any) => {
            console.log('d Right:', res);
            this.data2 = res.data || [];
          });
        }
      
        // Tab change handler
        setTab(tab: string) {
          this.activeTab = tab;
        }
  

}
