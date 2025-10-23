import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { jsPDF } from 'jspdf';
@Component({
  selector: 'app-dowanload-tree-data',
  templateUrl: './dowanload-tree-data.component.html',
  styleUrls: ['./dowanload-tree-data.component.css']
})
export class DowanloadTreeDataComponent {
  data1: any;
  data2: any;
  ldata: any;
  rdata: any;

  constructor(private api: UserService){}

  ngOnInit(){
    this.LeftData();
    this.RightData();
  }

  LeftData(){
    this.api.LeftTeamAll().subscribe((res:any)=>{
        console.log('left',res);
        this.data1=res.data;
      
    })
  }

    RightData(){
    this.api.RightTeamAll().subscribe((res:any)=>{
        this.data2=res.data;
    })
  }

  downloadPDF() {
  Promise.all([
    this.api.LeftTeamAll().toPromise(),
    this.api.RightTeamAll().toPromise()
  ]).then((results: any[]) => {
    this.ldata = results[0]?.data || [];
    this.rdata = results[1]?.data || [];

    const doc = new jsPDF({ orientation: 'p', unit: 'pt', format: 'a4' });

    let y = 40;

    y = this.buildPdfTable(doc, this.ldata, y, 'Left Team');

    y = this.buildPdfTable(doc, this.rdata, y + 30, 'Right Team');

    doc.save('team-report.pdf');
  });
}

buildPdfTable(doc: jsPDF, data: any[], startY: number, sectionTitle: string): number {
  const headers = ['S.No', 'Date', 'User Id', 'position', 'Level', 'Status'];
  const colWidths = [50, 100, 100, 150, 100, 100];
  let x = 40;
  let y = startY;
  const lineHeight = 20;
  const pageHeight = doc.internal.pageSize.height;

  doc.setFontSize(14);
  doc.text(sectionTitle, 40, y);
  y += lineHeight;

  if (!data.length) {
    doc.text('No records found', 40, y);
    return y + lineHeight;
  }

  doc.setFontSize(11);
  x = 40;
  headers.forEach((h, i) => {
    doc.text(h, x, y);
    x += colWidths[i];
  });
  y += lineHeight;

  data.forEach((row, i) => {

    if (y + lineHeight > pageHeight - 40) {
      doc.addPage();
      y = 40;

      doc.setFontSize(14);
      doc.text(sectionTitle + ' (contd.)', 40, y);
      y += lineHeight;

      doc.setFontSize(11);
      x = 40;
      headers.forEach((h, j) => {
        doc.text(h, x, y);
        x += colWidths[j];
      });
      y += lineHeight;
    }

    x = 40;
    const rowData = [
      (i + 1).toString(),
      row.crdate,
      row.ref_id,
      row.position,
      row.level,
      row.status == '1' ? 'Active' : 'Inactive'
    ];
    rowData.forEach((val, j) => {
      doc.text(val ? String(val) : '', x, y);
      x += colWidths[j];
    });
    y += lineHeight;
  });

  return y;
}

  mapBoard(board: string): string {
    switch (board) {
      case '1': return 'Not Subscribe';
      case '1': return 'Subscribed';
      default: return '';
    }
  }

}
