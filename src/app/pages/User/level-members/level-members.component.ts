import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-level-members',
  templateUrl: './level-members.component.html',
  styleUrls: ['./level-members.component.css']
})
export class LevelMembersComponent {
data1: any = {};

constructor(private api: UserService) {}

ngOnInit() {
  this.api.LevelMembersData().subscribe((res: any) => {
    // console.log(res);
    this.data1 = res.data;
  });
}

isArray(value: any): boolean {
  return Array.isArray(value);
}

// This method returns all available level keys (e.g., level1, level2...)
getLevels(): string[] {
  return Object.keys(this.data1).filter(key => key.startsWith('level'));
}


}
