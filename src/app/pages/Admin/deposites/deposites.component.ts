import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/service/admin.service';

declare var $: any;

@Component({
  selector: 'app-deposites',
  templateUrl: './deposites.component.html',
  styleUrls: ['./deposites.component.css']
})

export class DepositesComponent {
   selectedImageUrl: string = '';
    @ViewChild('imageModal') imageModal!: TemplateRef<any>;

  data: any[] = [];
  paginatedData: any[] = [];
  rowsPerPage = 10;
  rowsOptions = [10, 20, 50, 100];
  currentPage = 1;
  totalPages = 0;
  form:FormGroup;
  id:any
  data1:any;
  data2:any;
  loading: boolean = true;
  errorMessage='';
 form1:FormGroup;
    constructor(private api:AdminService, private fb:FormBuilder, private router: Router, private activeroute:ActivatedRoute, private toastr:ToastrService, private modalService:NgbModal) { 
      this.form = this.fb.group({
        reply: ['', Validators.required],
      });
        this.form1 = this.fb.group({
            regid: ['', ], 
            amount: ['', ], 
            remark: ['Deposite Amount Transfer', ], 
            transactionpassword: ['SK@692#19'], 
          });
    }

    copiedIndex: number | null = null;

copyToClipboard(text: string, index: number): void {
  navigator.clipboard.writeText(text).then(() => {
    this.copiedIndex = index;
    setTimeout(() => {
      this.copiedIndex = null;
    }, 1000); // "Copied!" message disappears after 2 seconds
  }).catch(err => {
    console.error('Clipboard copy failed:', err);
  });
}

 openImageModal(imgUrl: string) {
    this.selectedImageUrl = imgUrl;
    this.modalService.open(this.imageModal, { centered: true });
  }

openConfirmModal(row: any) {
  this.selectedRowId = row._id || row.id; // Adjust based on your data structure

  this.form1.patchValue({
    regid: row.userid,
    amount: row.amount
  });

  $('#confirmModal').modal('show');
}



confirmAction() {
  $('#confirmModal').modal('hide');
  console.log('Action confirmed!');
  this.Transfer();
}


selectedRowId: any = null;

openReplyModal(row: any) {
  this.selectedRowId = row.id; // Use the correct ID key based on your data
  this.form.reset(); // Reset previous reply
  $('#replyModal').modal('show');
}

ngOnInit() {
  this.getpendingdeposites();
  this.getCompleteddeposites();
  this.updatePagination();
}

getpendingdeposites(){
      this.api.GetPendingDeposites().subscribe((res:any) => {
        console.log('pending',res);
        this.data1 = res.data;
        this.loading = false;
      },
      error => {
        console.error('Error loading data:', error);
        this.loading = false; // Set loading to false even on error
      }
      );
    }
  
    getCompleteddeposites(){
      this.api.GetCompletedDeposites().subscribe((res:any) => {
        console.log(res);
        this.data2 = res.data;
      },
      error => {
        console.error('Error loading data:', error);
        this.loading = false; // Set loading to false even on error
      }
      );
    }
  
    replay() {
  console.log(this.form.value);
  if (this.form.valid && this.selectedRowId) {
    const val = {
      reply: this.form.value.reply,
    };
    this.api.DepositesUpdateById(this.selectedRowId, val).subscribe(
      a => {
        if (a) {
          console.log(a);
          this.form.reset();
          $('#replyModal').modal('hide');
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/deposites']);
            });
          }, 1000);
        } else {
          console.log(a);
        }
      },
      (err: any) => {
        console.error(err);
      },
    );
  }
}

    Transfer() {
  console.log(this.form1.value);

  if (this.form1.valid && this.selectedRowId) {
    const val = {
      regid: this.form1.value.regid,
      amount: this.form1.value.amount,
      remark: this.form1.value.remark,
      transactionpassword: this.form1.value.transactionpassword,
    };

    this.api.TransferWalletUser(val).subscribe(
      (a: any) => {
        if (a) {
          console.log(a);

          // After successful transfer, now update the reply and remark
          const updateData = {
            reply: 'Transfer Done',
          };

          this.api.DepositesUpdateById(this.selectedRowId, updateData).subscribe(
            (res: any) => {
              console.log('Reply updated after transfer', res);
              this.toastr.success('Transfer confirmed and reply updated!');
              this.form.reset();
              setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/deposites']);
                });
              }, 500);
            },
            (err: any) => {
              console.error('Failed to update reply:', err);
              this.toastr.error('Transfer successful, but failed to update reply.', 'Warning');
            }
          );
        } else {
          console.log('Transfer failed response:', a);
        }
      },
      (err: any) => {
        this.errorMessage = err.error.message || 'Transfer failed. Please try again.';
        this.toastr.error(this.errorMessage, 'Error');
      }
    );
  }
}


updatePagination() {
  this.totalPages = Math.ceil(this.data.length / this.rowsPerPage);
  const start = (this.currentPage - 1) * this.rowsPerPage;
  const end = start + this.rowsPerPage;
  this.paginatedData = this.data.slice(start, end);
}

goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    this.updatePagination();
  }
}

onChangeRowsPerPage(): void {
  this.currentPage = 1;
  this.updatePagination();
}




}
