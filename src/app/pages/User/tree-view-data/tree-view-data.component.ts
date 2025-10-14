import { Component, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { UserService } from 'src/app/service/user.service';
import { TreeNode } from 'primeng/api';
declare var bootstrap: any;

@Component({
  selector: 'app-tree-view-data',
  templateUrl: './tree-view-data.component.html',
  styleUrls: ['./tree-view-data.component.css']
})
export class TreeViewDataComponent {

   @ViewChild('nodeModal') nodeModal!: ElementRef;
  @ViewChild('tableToPrint') tableToPrint!: ElementRef;
modalInstance: any;
  id: any;
  udata = { reg_id: '' };
  udata1:any;
  data2:any;
  data: TreeNode[] = [];
  selectedNodes: TreeNode[] = [];
  data1:any;
  errorMessage='';
  tdata:any;
  visible: boolean = false;
  repd: any;
  pdata:any;
  loading: boolean = true;
  ldata:any;
  rdata: any;
  allData: any;
  isMobile = false;
isModalVisible = false; 
  showNodeModal(nodeData: any) {
  this.repd = nodeData;
  this.isModalVisible = true; // show modal
  this.getTreeViewData(nodeData.id); // or nodeData.title depending on backend
}

hideNodeModal() {
  this.isModalVisible = false;
  this.repd = null;
  this.tdata = null;
}
  constructor(private uapi:UserService, private activeroute:ActivatedRoute, private router:Router, private location: Location) { 
    this.id = '';
  }

  ngOnInit(): void {
    
      this.isMobile = window.innerWidth < 768;
    this.activeroute.params.subscribe((params) => {
      this.id = params['regid'];
      // console.log(this.id);
      if (this.id) {
        this.uapi.GetusersDataByRegID(this.id).subscribe((res: any) => {
          // console.log('Response data:', res.data);
          this.udata=res.data[0];
        });
        // jsauuasd
      }
      // this.loadUserTreeData();
    });
    this.profileData();

  //  this.uapi.LeftTeamData().subscribe((res:any) => {
  //   this.ldata = res.data || [];
  //   this.combineData();
  // });

  // this.uapi.RightTeamData().subscribe((res:any) => {
  //   this.rdata = res.data || [];
  //   this.combineData();
  // });

  }
  
//   combineData() {
//   this.allData = [...this.ldata, ...this.rdata];
// }

  profileData(){
        this.uapi.UDashboardData().subscribe((res: any) => {
      // console.log('profile',res)
        this.data1 = res.data.profiledata; // Set data1 to the first item in the array
    });
  }


mytree1(regid: string) {
  this.router.navigateByUrl(`/treeview/${regid}`);
}



 loadUserTreeData(regid: string) {
    this.uapi.UserTreeView(regid).subscribe(
      (res: any) => {
        console.log('tree',res)
        this.data2 = res.data;
        if (this.data2) {
          this.buildTree();
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No data available for organization chart.';
        }
      },
      (error) => {
        this.errorMessage = error?.error?.message || 'No Data Found';
      }
    );
  }



  buildTree() {
  if (this.data2) {
    const mainId = this.data2.main?.reg_id || 'No User';

    this.data = [
      {
        expanded: true,
        type: 'person',
        data: {
          image: this.getImageByBoardStatus(this.data2.main.bstatus),
          name: this.data2.main.name,
          title: mainId,
        },
        children: [
          {
            expanded: true,
            type: 'person',
            data: {
              image: this.getImageByBoardStatus(this.data2.a.bstatus),
              name: this.data2.a.name || 'No User',
              title: this.data2.a.reg_id || 'No User',
              position: 'left',
              parentid: mainId
            },
            children: [
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.aleft.bstatus),
                  name: this.data2.aleft.name || 'No User',
                  title: this.data2.aleft.reg_id || 'No User',
                  position: 'left',
                  parentid: this.data2.a.reg_id || 'No User'
                },
              },
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.aright.bstatus),
                  name: this.data2.aright.name || 'No User',
                  title: this.data2.aright.reg_id || 'No User',
                  position: 'right',
                  parentid: this.data2.a.reg_id || 'No User'
                },
              },
            ]
          },
          {
            expanded: true,
            type: 'person',
            data: {
              image: this.getImageByBoardStatus(this.data2.b.bstatus),
              name: this.data2.b.name || 'No User',
              title: this.data2.b.reg_id || 'No User',
              position: 'right',
              parentid: mainId
            },
            children: [
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.bleft.bstatus),
                  name: this.data2.bleft.name || 'No User',
                  title: this.data2.bleft.reg_id || 'No User',
                  position: 'left',
                  parentid: this.data2.b.reg_id || 'No User'
                },
              },
              {
                expanded: true,
                type: 'person',
                data: {
                  image: this.getImageByBoardStatus(this.data2.bright.bstatus),
                  name: this.data2.bright.name || 'No User',
                  title: this.data2.bright.reg_id || 'No User',
                  position: 'right',
                  parentid: this.data2.b.reg_id || 'No User'
                },
              },
            ]
          }
        ]
      }
    ];
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


getImageByBoardStatus(boardstatus: string): string {
  switch (boardstatus) {
    case '0':
      return 'assets/logo.png'; // Path to image for Free Package
    case '1':
      return 'assets/logo.png'; // Path to image for subcried Package
        case '2':
      return 'assets/logo.png'; // Path to image for subcried Package
    default:
      return 'assets/logo.png'; // Default image path
  }
}

 getTreeViewData(id: string) {
    this.loading = true;
    this.uapi.UserTreeViewDataById(id).subscribe(
      (res: any) => {
        console.log('modal data', res);
        this.tdata = res.data;
        this.loading = false;
      },
      (err) => {
        console.error('Error fetching tree data', err);
        this.loading = false;
      }
    );
  }

  
mytree(regid: string) {
  this.router.navigateByUrl(`/treeview/${regid}`);
}

goBack() {
  this.location.back();
}



//  printTable() {
//     Promise.all([
//       this.uapi.LeftTeamData().toPromise(),
//       this.uapi.RightTeamData().toPromise()
//     ]).then((results: any[]) => {
//       this.ldata = results[0]?.data || [];
//       this.rdata = results[1]?.data || [];

//       const printContents = this.generatePrintHtml();
//       const popupWin = window.open('', '_blank', 'width=900');
//       popupWin!.document.open();
//       popupWin!.document.write(printContents);
//       popupWin!.document.close();
//     });
//   }
// downloadPDF() {
//   Promise.all([
//     this.uapi.LeftTeamData().toPromise(),
//     this.uapi.RightTeamData().toPromise()
//   ]).then((results: any[]) => {
//     this.ldata = results[0]?.data || [];
//     this.rdata = results[1]?.data || [];

//     const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });

//     let y = 40;

//     y = this.buildPdfTable(doc, this.ldata, y, 'Left Team');

//     y = this.buildPdfTable(doc, this.rdata, y + 30, 'Right Team');

//     doc.save('team-report.pdf');
//   });
// }

// buildPdfTable(doc: jsPDF, data: any[], startY: number, sectionTitle: string): number {
//   const headers = ['S.No', 'Date', 'User Id', 'Name', 'Subscription', 'Status'];
//   const colWidths = [50, 100, 100, 150, 100, 100];
//   let x = 40;
//   let y = startY;
//   const lineHeight = 20;
//   const pageHeight = doc.internal.pageSize.height;

//   doc.setFontSize(14);
//   doc.text(sectionTitle, 40, y);
//   y += lineHeight;

//   if (!data.length) {
//     doc.text('No records found', 40, y);
//     return y + lineHeight;
//   }

//   doc.setFontSize(11);
//   x = 40;
//   headers.forEach((h, i) => {
//     doc.text(h, x, y);
//     x += colWidths[i];
//   });
//   y += lineHeight;

//   data.forEach((row, i) => {

//     if (y + lineHeight > pageHeight - 40) {
//       doc.addPage();
//       y = 40;

//       doc.setFontSize(14);
//       doc.text(sectionTitle + ' (contd.)', 40, y);
//       y += lineHeight;

//       doc.setFontSize(11);
//       x = 40;
//       headers.forEach((h, j) => {
//         doc.text(h, x, y);
//         x += colWidths[j];
//       });
//       y += lineHeight;
//     }

//     x = 40;
//     const rowData = [
//       (i + 1).toString(),
//       row.cdate,
//       row.forid,
//       row.fname,
//       this.mapBoard(row.board),
//       row.status == '1' ? 'Active' : 'Inactive'
//     ];
//     rowData.forEach((val, j) => {
//       doc.text(val ? String(val) : '', x, y);
//       x += colWidths[j];
//     });
//     y += lineHeight;
//   });

//   return y;
// }



  mapBoard(board: string): string {
    switch (board) {
      case '1': return 'Not Subscribe';
      case '1': return 'Subscribed';
      default: return '';
    }
  }

  generatePrintHtml(): string {
    return `
      <html>
        <head>
          <title>Team Report</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            th, td {
              border: 1px solid #333;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f8f9fa;
            }
            h3 {
              margin: 20px 0 10px;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <h3>Left Team</h3>
          ${this.buildTable(this.ldata)}

          <h3>Right Team</h3>
          ${this.buildTable(this.rdata)}
        </body>
      </html>
    `;
  }

  buildTable(data: any[]): string {
    if (!data.length) {
      return `<p>No records found</p>`;
    }
    return `
      <table>
        <tr>
          <th>S.No</th>
          <th>Date</th>
          <th>User Id</th>
          <th>Name</th>
          <th>Subscription</th>
          <th>Status</th>
        </tr>
        ${data.map((row, i) => `
          <tr>
            <td>${i + 1}</td>
            <td>${row.cdate}</td>
            <td>${row.forid}</td>
             <td>${row.fname}</td>
            <td>
              ${row.board == '0' ? 'Not Active' :
                row.board == '2' ? 'Active' :''}
            </td>
            <td>
              ${row.status == '1' ? 'Active' : 'Inactive'}
            </td>
          </tr>
        `).join('')}
      </table>
    `;
  }

}
