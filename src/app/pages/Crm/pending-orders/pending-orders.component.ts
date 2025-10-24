import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var bootstrap: any;

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent {
  data1: any[] = [];
  selectedIds: string[] = [];
  filterPincode: string = ''; // Pincode filter
  private confirmModal: any;
 filterDeliveryType: string = 'all';
     sortDirection: 'asc' | 'desc' = 'asc';
  constructor(private api: AdminService, private toastr: ToastrService, private router: Router) {}

  ngOnInit() {
    this.loadPendingOrders();
  }

  loadPendingOrders() {
    this.api.PendingOrders().subscribe((res: any) => {
      this.data1 = res.data;
      this.selectedIds = [];
    });
  }

    get filteredData(): any[] {
    return this.data1.filter(item => {
      const matchesPincode = !this.filterPincode || item.pincode?.includes(this.filterPincode);
      const matchesType = this.filterDeliveryType === 'all' || item.deliverytype === this.filterDeliveryType;
      return matchesPincode && matchesType;
    });
  }

   sortByPincode() {
  // Toggle sort direction
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

  // Sort filtered data array
  this.data1.sort((a, b) => {
    const pinA = Number(a.pincode) || 0;
    const pinB = Number(b.pincode) || 0;

    if (this.sortDirection === 'asc') {
      return pinA - pinB;
    } else {
      return pinB - pinA;
    }
  });
}


  /** Filtered data based on Pincode */
  // get filteredData(): any[] {
  //   if (!this.filterPincode) return this.data1;
  //   return this.data1.filter(item => item.pincode?.includes(this.filterPincode));
  // }

  /** Toggle individual selection */
  toggleSelection(id: string, event: any) {
    if (event.target.checked) this.selectedIds.push(id);
    else this.selectedIds = this.selectedIds.filter(x => x !== id);
  }

  /** Toggle select all (only filtered rows) */
  toggleSelectAll(event: any) {
    const ids = this.filteredData.map(item => item.id);
    this.selectedIds = event.target.checked ? ids : [];
  }

  isAllSelected(): boolean {
    const filteredIds = this.filteredData.map(item => item.id);
    return filteredIds.length > 0 && filteredIds.every(id => this.selectedIds.includes(id));
  }

  /** Open delivery confirmation modal */
  openConfirmModal() {
    const modalEl = document.getElementById('confirmDeliverModal');
    if (modalEl) {
      this.confirmModal = new bootstrap.Modal(modalEl, { backdrop: false, keyboard: true });
      this.confirmModal.show();
    }
  }

  /** Confirm delivery */
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
            this.router.navigate(['/edashboard']);
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

  /** Export Excel */
  exportToExcel(type: 'all' | 'selected') {
    let exportData = type === 'all' ? this.filteredData : this.data1.filter(item => this.selectedIds.includes(item.id));
    if (!exportData.length) { this.toastr.warning('No data to export'); return; }

    const worksheet = XLSX.utils.json_to_sheet(exportData.map((item, i) => ({
      'S.No': i + 1,
      'Date': new Date(item.cdate).toLocaleDateString(),
      'User ID': item.regid,
      'Name': item.name,
      'Product': item.product,
      'Delivery Type': item.deliverytype,
      'Pincode': item.pincode,
      'Address': item.shiippingaddress,
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, `LeaderDelivery_${type}_${new Date().toISOString().slice(0,10)}.xlsx`);
  }

  /** Export PDF */
  exportToPDF(type: 'all' | 'selected') {
    let exportData = type === 'all' ? this.filteredData : this.data1.filter(item => this.selectedIds.includes(item.id));
    if (!exportData.length) { this.toastr.warning('No data to export'); return; }

    const doc = new jsPDF({ orientation: 'landscape' });
    doc.text(`Leader Delivery Orders (${type.toUpperCase()})`, 14, 10);

    const tableData = exportData.map((item, i) => [
      i + 1,
      new Date(item.cdate).toLocaleDateString(),
      item.regid,
      item.name,
      item.product,
      item.deliverytype,
      item.pincode,
      item.shiippingaddress,
    ]);

    autoTable(doc, {
      head: [['S.No', 'Date', 'User ID', 'Name', 'Product', 'Delivery', 'Pincode', 'Address']],
      body: tableData,
      startY: 20
    });

    doc.save(`LeaderDelivery_${type}_${new Date().toISOString().slice(0,10)}.pdf`);
  }
}
