import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/service/admin.service';
import * as XLSX from 'xlsx';
declare var $: any;
@Component({
  selector: 'app-activation-wallet',
  templateUrl: './activation-wallet.component.html',
  styleUrls: ['./activation-wallet.component.css']
})
export class ActivationWalletComponent {
  data1: any[] = [];
   loading = false;
   selectedRows: any[] = [];
   confirmForm: FormGroup;
   selectedRowForModal: any[] = [];
   errorMessage = '';
 
   constructor(
     private api: AdminService,
     private fb: FormBuilder,
     private router: Router,
     private modalService: NgbModal
   ) {
     this.confirmForm = this.fb.group({
       regid: [''],
       amount: ['']
     });
   }
 
   ngOnInit(): void {
     this.getpayoutdata();
   }
 
   // Fetch data
   getpayoutdata() {
     this.loading = true;
     this.api.WalletPayments().subscribe({
       next: (res: any) => {
         console.log('Payout Data:', res);
         this.data1 = res.data ?? [];
         this.loading = false;
       },
       error: (err) => {
         console.error('Error fetching payout data:', err);
         this.loading = false;
       }
     });
   }
 
   // Selection methods
   toggleSelection(row: any) {
     const index = this.selectedRows.findIndex(r => r.reg_id === row.reg_id);
     if (index > -1) {
       this.selectedRows.splice(index, 1); // Remove if already selected
     } else {
       this.selectedRows.push(row); // Add if not selected
     }
   }
 
   isSelected(row: any): boolean {
     return this.selectedRows.some(r => r.reg_id === row.reg_id);
   }
 
   isAllSelected(): boolean {
     return this.data1.length > 0 && this.selectedRows.length === this.data1.length;
   }
 
   toggleSelectAll(event: Event) {
     const input = event.target as HTMLInputElement;
     this.selectedRows = input.checked ? [...this.data1] : [];
   }
 
   // Open modal
   openConfirmModal(content: any, row?: any) {
     if (row) {
       this.selectedRowForModal = [row];
     } else if (this.selectedRows.length > 0) {
       this.selectedRowForModal = [...this.selectedRows];
     } else {
       alert('Select at least one row.');
       return;
     }
 
     const firstRow = this.selectedRowForModal[0];
     this.confirmForm.patchValue({
       regid: firstRow.reg_id,
       amount: firstRow.wallet_amount
     });
 
     this.modalService.open(content, { centered: true, backdrop: 'static', keyboard: false });
   }
 
   // Confirm payment
   confirmPayment(modal: any) {
     modal.close();
 
     this.selectedRowForModal.forEach((row) => {
       const val = {
         regid: String(row.reg_id),
         amount: Number(row.wallet_amount)
       };
 
       this.api.TodayWalletpay(val).subscribe({
         next: (res) => {
           console.log('Payment confirmed for', val.regid, 'Response:', res);
         },
         error: (err) => {
           console.error('Payment failed for', val.regid, err);
           this.errorMessage = 'Payment failed for ' + val.regid;
         }
       });
     });
 
      // Navigate to same route to trigger refresh
   setTimeout(() => {
     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
       this.router.navigate(['/activationwallet']);
     });
   }, 2000);
   }
 
   // Excel export
   exportToExcel(all: boolean = false) {
     const exportData = (all ? this.data1 : this.selectedRows).map((row, index) => ({
       'Transaction Type': 'IMPS',
       'Beneficiary Code': '',
       'Value Date': '',
       'Debit A/C Number': '258885011099',
       'Transaction Amount': row.wallet_amount * 0.80,
       'Beneficiary Name': row.name,
       'USDT BEP20 Wallet': row.aadhar,
       'Beneficiary A/c No.': row.account_no,
       'IFSC Code': row.ifsc,
       'User ID': row.reg_id,
       'Bene Mobile No': row.contact,
       'Customer Ref No': index + 1,
       'Payment Narration': ''
     }));
 
     if (exportData.length === 0) {
       alert('No data available!');
       return;
     }
 
     const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
     const workbook: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, worksheet, 'Payout Data');
     const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
     const blob = new Blob([wbout], { type: 'application/octet-stream' });
     const url = window.URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = `${all ? 'USDT Payouts-' : 'payout-selected-'}${new Date().toISOString().slice(0, 10)}.xlsx`;
     a.click();
     window.URL.revokeObjectURL(url);
   }
  
}
