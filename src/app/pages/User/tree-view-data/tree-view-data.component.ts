import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-tree-view-data',
  templateUrl: './tree-view-data.component.html',
  styleUrls: ['./tree-view-data.component.css']
})
export class TreeViewDataComponent implements OnInit {
  id: string = '';
  data2: any;
  data: TreeNode[] = [];
  repd: any;
  tdata: any;
  loading: boolean = false;
  isModalVisible: boolean = false;
  errorMessage: string = '';
udata:any;

showNodeModal(nodeData: any) {
  this.repd = nodeData;
  this.isModalVisible = true;
  this.getTreeViewData(nodeData.title || nodeData.id);
}

hideNodeModal() {
  this.isModalVisible = false;
  this.repd = null;
  this.tdata = null;
}

  constructor(
    private uapi: UserService,
    private activeroute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    // Get ID from URL
    this.activeroute.params.subscribe(params => {
      this.id = params['regid'];
      if (this.id) {
        this.loadUserTreeData(this.id);
      }
    });
    this.uapi.UProfile().subscribe((res:any)=>{
        console.log('profile',res);
        this.udata=res.data[0];
    })
  }

  /** Load tree data from backend */
  loadUserTreeData(regid: string) {
    this.loading = true;
    this.uapi.UserTreeView(regid).subscribe(
      (res: any) => {
        console.log('tree',res)
        this.loading = false;
        this.data2 = res.data;
        if (this.data2) {
          this.buildTree();
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No data available for organization chart.';
          this.data = [];
        }
      },
      err => {
        this.loading = false;
        this.errorMessage = err?.error?.message || 'Failed to fetch tree data';
        this.data = [];
      }
    );
  }

  /** Build tree data for PrimeNG */
  buildTree() {
    if (!this.data2?.main) return;

    const mainId = this.data2.main.reg_id || 'No User';
    this.data = [
      {
        expanded: true,
        type: 'person',
        data: {
          image: this.getImageByBoardStatus(this.data2.main?.bstatus),
          name: this.data2.main?.name || 'No User',
          title: mainId
        },
        children: [
          {
            expanded: true,
            type: 'person',
            data: {
              image: this.getImageByBoardStatus(this.data2.a?.bstatus),
              name: this.data2.a?.name || 'No User',
              title: this.data2.a?.reg_id || 'No User',
              position: 'left',
              parentid: mainId
            },
            children: [
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.aleft?.bstatus),
                  name: this.data2.aleft?.name || 'No User',
                  title: this.data2.aleft?.reg_id || 'No User',
                  position: 'left',
                  parentid: this.data2.a?.reg_id || 'No User'
                }
              },
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.aright?.bstatus),
                  name: this.data2.aright?.name || 'No User',
                  title: this.data2.aright?.reg_id || 'No User',
                  position: 'right',
                  parentid: this.data2.a?.reg_id || 'No User'
                }
              }
            ]
          },
          {
            expanded: true,
            type: 'person',
            data: {
              image: this.getImageByBoardStatus(this.data2.b?.bstatus),
              name: this.data2.b?.name || 'No User',
              title: this.data2.b?.reg_id || 'No User',
              position: 'right',
              parentid: mainId
            },
            children: [
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.bleft?.bstatus),
                  name: this.data2.bleft?.name || 'No User',
                  title: this.data2.bleft?.reg_id || 'No User',
                  position: 'left',
                  parentid: this.data2.b?.reg_id || 'No User'
                }
              },
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.bright?.bstatus),
                  name: this.data2.bright?.name || 'No User',
                  title: this.data2.bright?.reg_id || 'No User',
                  position: 'right',
                  parentid: this.data2.b?.reg_id || 'No User'
                }
              }
            ]
          }
        ]
      }
    ];
  }

  

  /** Get modal tree data */
  getTreeViewData(id: string) {
    this.loading = true;
    this.uapi.UserTreeViewDataById(id).subscribe(
      (res: any) => {
        this.tdata = res.data;
        this.loading = false;
      },
      (err) => {
        console.error('Error fetching tree data', err);
        this.loading = false;
      }
    );
  }

  /** Map status to image */
getImageByBoardStatus(boardstatus: string): string {
  switch (boardstatus) {
    case '0':
      return 'assets/logo.png'; // Path to image for Free Package
    case '1':
      return 'assets/smart.png'; // Path to image for subcried Package
        case '2':
      return 'assets/silver.png'; 
           case '3':
      return 'assets/gold.png'; 
           case '4':
      return 'assets/platinum.png'; 
           case '5':
      return 'assets/diamond.png'; 
           case '6':
      return 'assets/crown.png'; 
    default:
      return 'assets/logo.png'; // Default image path
  }
}


  handleNodeClick(data: any) {
  if (data.name === 'No User') {
    // Only allow registration if parentid exists and is NOT "No User"
    if (data.parentid && data.parentid !== 'No User' && data.position) {
      this.router.navigate(['/treeregister', data.parentid, data.position]);
    } else {
      console.warn('Registration not allowed — parent is missing or is No User.');
    }
  } else {
    // Existing user — go to their tree view
    if (data.title && data.title !== 'No User') {
      this.router.navigateByUrl(`/treeview/${data.title}`);
    } else {
      console.warn('Invalid regid/title for existing user.');
    }
  }
}

  mytree1(regid: string) {
  this.router.navigateByUrl(`/treeview/${regid}`);
}

  goBack() {
    this.location.back();
  }
}
