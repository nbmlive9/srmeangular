import { Component } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';

declare var bootstrap: any;
@Component({
  selector: 'app-pending-orders-data',
  templateUrl: './pending-orders-data.component.html',
  styleUrls: ['./pending-orders-data.component.css']
})
export class PendingOrdersDataComponent {

   data1: any[] = [];
     selectedIds: string[] = [];
     private confirmModal: any;
   
     constructor(private api: AdminService, private toastr: ToastrService, private router:Router) {}
   
     ngOnInit() {
       this.loadPendingOrders();
     }
   
     loadPendingOrders() {
       this.api.PendingOrders().subscribe((res: any) => {
         this.data1 = res.data;
         this.selectedIds = [];
       });
     }
   
     toggleSelection(id: string, event: any) {
       if (event.target.checked) this.selectedIds.push(id);
       else this.selectedIds = this.selectedIds.filter(x => x !== id);
     }
   
     toggleSelectAll(event: any) {
       this.selectedIds = event.target.checked ? this.data1.map(item => item.id) : [];
     }
   
     isAllSelected(): boolean {
       return this.data1.length > 0 && this.selectedIds.length === this.data1.length;
     }
   
     /** ✅ Open Confirmation Modal */
    openConfirmModal() {
      const modalEl = document.getElementById('confirmDeliverModal');
      if (modalEl) {
        this.confirmModal = new bootstrap.Modal(modalEl, {
          backdrop: false, // normal backdrop
          keyboard: true  // allow ESC to close
        });
        this.confirmModal.show();
      }
    }
  
    /** ✅ Confirm Delivery */
    confirmDeliver() {
      this.confirmModal?.hide();
  
      if (this.selectedIds.length === 0) {
        this.toastr.warning('Please select at least one order');
        return;
      }
  
      const idsArray = this.selectedIds.map(id => Number(id));
  
      this.api.ProductDeliveryById({ ids: idsArray }).subscribe({
        next: () => {
          this.toastr.success('Delivery updated successfully!');
            setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/addproduct']);
                });
              }, 500);
          this.loadPendingOrders();
        },
        error: (err) => {
          console.error('Error:', err);
          this.toastr.error('Failed to update delivery');
        }
      });
    }
   
     /** ✅ Export Excel (All or Selected) */
     exportToExcel(type: 'all' | 'selected') {
       let exportData = type === 'all'
         ? this.data1
         : this.data1.filter(item => this.selectedIds.includes(item.id));
   
       if (exportData.length === 0) {
         this.toastr.warning('No data to export');
         return;
       }
   
       const worksheet = XLSX.utils.json_to_sheet(
         exportData.map((item, index) => ({
           'S.No': index + 1,
           'Date': new Date(item.cdate).toLocaleDateString(),
           'User ID': item.regid,
           'Name': item.name,
           'Address': item.shiippingaddress,
           'Pincode': item.pincode,
           'Product': item.product,
           'Delivery Type': item.deliverytype
         }))
       );
   
       const workbook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
       const fileName = `LeaderDelivery_${type}_${new Date().toISOString().slice(0, 10)}.xlsx`;
       XLSX.writeFile(workbook, fileName);
     }
   
     /** ✅ Export PDF (All or Selected) */
     exportToPDF(type: 'all' | 'selected') {
       let exportData = type === 'all'
         ? this.data1
         : this.data1.filter(item => this.selectedIds.includes(item.id));
   
       if (exportData.length === 0) {
         this.toastr.warning('No data to export');
         return;
       }
   
       const doc = new jsPDF({ orientation: 'landscape' });
       doc.text(`Leader Delivery Orders (${type.toUpperCase()})`, 14, 10);
   
       const tableData = exportData.map((item, index) => [
         index + 1,
         new Date(item.cdate).toLocaleDateString(),
         item.regid,
         item.name,
         item.shiippingaddress,
         item.pincode,
         item.product,
         item.deliverytype
       ]);
   
       autoTable(doc, {
         head: [['S.No', 'Date', 'User ID', 'Name', 'Address', 'Pincode', 'Product', 'Delivery']],
         body: tableData,
         startY: 20
       });
   
       const fileName = `LeaderDelivery_${type}_${new Date().toISOString().slice(0, 10)}.pdf`;
       doc.save(fileName);
     }

}
