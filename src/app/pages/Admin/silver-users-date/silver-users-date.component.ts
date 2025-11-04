import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-silver-users-date',
  templateUrl: './silver-users-date.component.html',
  styleUrls: ['./silver-users-date.component.css']
})
export class SilverUsersDateComponent {
  form: FormGroup;
  data1: any[] = [];
  loading = false;

  constructor(private api: AdminService, private fb: FormBuilder) {
    this.form = this.fb.group({
      startdate: ['', Validators.required],
      enddate: ['', Validators.required]
    });
  }

  ngOnInit() {}

  // 🔹 Fetch Data from API
  getData() {
    if (this.form.invalid) return;
    this.loading = true;

    const value = this.form.value;

    this.api.SilverUsersDate(value).subscribe({
      next: (res: any) => {
        this.loading = false;
        try {
          const parsed = typeof res === 'string' ? JSON.parse(res) : res;
          // Format data for easy table usage
          this.data1 = (parsed.data || []).map((item: any) => ({
            regid: item.userdata?.reg_id,
            name: item.userdata?.name,
            phone: item.userdata?.contact,
            left: item.left,
            right: item.right,
            pairs: item.pairs,
            date: item.userdata?.crdate
          }));
        } catch (e) {
          console.error('Invalid JSON:', e);
          this.data1 = [];
        }
      },
      error: (err) => {
        console.error('Error fetching data:', err);
        this.loading = false;
      }
    });
  }

  // 🔹 Download Excel
  downloadExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data1);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Silver Users');
    XLSX.writeFile(wb, `SilverUsers_${this.form.value.startdate}_${this.form.value.enddate}.xlsx`);
  }
}
