import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/service/admin.service';

declare var $: any;

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrls: ['./support-tickets.component.css']
})
export class SupportTicketsComponent {

  form:FormGroup;
id:any
data1:any;
data2:any;
loading: boolean = true;
 selectedRowId: any = null;
modalRef!: NgbModalRef;
  constructor(private api:AdminService, private fb:FormBuilder, private router: Router, private activeroute:ActivatedRoute,  private modalService: NgbModal) { 
    this.form = this.fb.group({
      reply: ['', Validators.required],
    });
  }

 

openReplyModal(content: any, rowId: any) {
    this.selectedRowId = rowId;
    this.form.reset();
    this.modalRef = this.modalService.open(content, { backdrop: 'static' });
  }

  ngOnInit(): void {
    this.id = this.activeroute.snapshot.params['id'];
    this.getTickets();
    this.getCompletedTickets();
  }

  getTickets(){
    this.api.PendingQuerys().subscribe((res:any) => {
      console.log(res);
      this.data1 = res.data;
      this.loading = false;
    },
    error => {
      console.error('Error loading data:', error);
      this.loading = false; // Set loading to false even on error
    }
    );
  }

  getCompletedTickets(){
    this.api.CompleteQuerys().subscribe((res:any) => {
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
    if (this.form.valid) {
      const val = {
        reply: this.form.value.reply
      };
      this.api.QueryUpdate(this.selectedRowId, val).subscribe((res: any) => {
        if (res) {
          this.form.reset();
          this.modalRef.close();
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/adminsupport']);
            });
          }, 1000);
        }
      });
    }
  }

}
