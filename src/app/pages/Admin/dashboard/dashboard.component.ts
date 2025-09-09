import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
      amount: [''],
      remark: [''],
      transactionpassword: ['']
    });
  }

  ngOnInit(): void {
    this.getpayoutdata();
  }

  getpayoutdata() {
    this.loading = true;
    this.api.AdminHome().subscribe({
      next: (res: any) => {
        this.data1 = res.data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // Selection methods
  toggleSelection(row: any) {
    const index = this.selectedRows.findIndex(r => r._id === row._id || r.id === row.id);
    if (index > -1) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(row);
    }
  }

  isSelected(row: any) {
    return this.selectedRows.some(r => r._id === row._id || r.id === row.id);
  }

  isAllSelected() {
    return this.data1.length > 0 && this.selectedRows.length === this.data1.length;
  }

  toggleSelectAll(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) this.selectedRows = [...this.data1];
    else this.selectedRows = [];
  }

  // Open modal
  openConfirmModal(content: any, row?: any) {
    if (row) this.selectedRowForModal = [row];
    else if (this.selectedRows.length > 0) this.selectedRowForModal = [...this.selectedRows];
    else {
      alert('Select at least one row.');
      return;
    }

    const firstRow = this.selectedRowForModal[0];
    this.confirmForm.patchValue({
      regid: firstRow.userid,
      amount: firstRow.amount
    });

    this.modalService.open(content, { centered: true, backdrop: 'static', keyboard: false });
  }

  // Confirm payment
  confirmPayment(modal: any) {
    modal.close();

    this.selectedRowForModal.forEach((row) => {
      const val = {
        regid: String(row.userid),
        amount: Number(row.amount),
        remark: this.confirmForm.value.remark,
        transactionpassword: this.confirmForm.value.transactionpassword
      };

      this.api.TodayWalletpay(val).subscribe({
        next: (res) => console.log('Payment confirmed for', val.regid, res),
        error: (err) => console.error('Payment failed for', val.regid, err)
      });
    });

    setTimeout(() => {
      this.getpayoutdata();
      this.selectedRows = [];
      this.selectedRowForModal = [];
    }, 2000);
  }

  // Excel export
  exportToExcel(all: boolean = false) {
    const exportData = (all ? this.data1 : this.selectedRows).map((row, index) => ({
      'Transaction Type':'IMPS',
      'Beneficiary Code':'',
      'Value Date':'',
      'Debit A/C Number':'258885011099',
      'Transaction Amount':row.wallet_amount * 0.80,
      'Beneficiary Name':row.name,
      'Beneficiary A/c No.':row.account_no,
      'IFSC Code':row.ifsc,
      'User ID':row.reg_id,
      'Bene Mobile No':row.contact,
      'Customer Ref No':index + 1,
      'Payment Narration':''
    }));

    if (exportData.length === 0) { alert('No data available!'); return; }

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Payout Data');
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${all ? 'payout-all-' : 'payout-selected-'}${new Date().toISOString().slice(0, 10)}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
