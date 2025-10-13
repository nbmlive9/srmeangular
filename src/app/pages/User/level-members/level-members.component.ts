import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-level-members',
  templateUrl: './level-members.component.html',
  styleUrls: ['./level-members.component.css']
})
export class LevelMembersComponent {

   left: boolean = true;
  right: boolean = false;
  tree: boolean = false;
  pfdata: any;
  showSection(section: string) {
    this.left = section === 'left';
    this.right = section === 'right';
     this.tree = section === 'tree';
  }

constructor(private api: UserService, private router: Router) {}

ngOnInit() {
  this.api.UProfile().subscribe((res:any)=>{
    console.log('profile',res);
    this.pfdata=res.data[0];
  })
}


  mytree(regid: string) {
    // Navigate to treeview route with regid
    this.router.navigate(['/treeview', regid]);
  }



}
