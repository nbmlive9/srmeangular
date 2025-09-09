import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { UserService } from 'src/app/service/user.service';
declare var $: any;
@Component({
  selector: 'app-deposit-request',
  templateUrl: './deposit-request.component.html',
  styleUrls: ['./deposit-request.component.css']
})
export class DepositRequestComponent {
 selectedImageUrl: string = '';
  @ViewChild('imageModal') imageModal!: TemplateRef<any>;

  badgeValue = "0x3d6C45E12E800DcA3ef8712cA005A1Ab8D11990F";
  copyValue() {
    const el = document.createElement('textarea');
    el.value = this.badgeValue;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  showModal: boolean = false;
modalImage: string = '';

openImage(imageUrl: string) {
  this.modalImage = imageUrl;
  this.showModal = true;
}

closeImage() {
  this.showModal = false;
}

  openConfirmModal() {
  if (this.form.valid) {
    $('#confirmModal').modal('show');
  }
}

confirmAction() {
  $('#confirmModal').modal('hide');
  this.add(); // Call the actual transfer logic here
}
  form:FormGroup;
  data1:any;
  loading: boolean = true;
  file?: File;
  constructor(private api:UserService, private fb:FormBuilder, private router: Router, private activeroute:ActivatedRoute, private modalService:NgbModal) { 
    this.form = this.fb.group({
      amount: ['', Validators.required], 
      note: ['', Validators.required],
      addtype: ['typedep',],
      image: [null, Validators.required],  
    });
  }

  openImageModal(imgUrl: string) {
    this.selectedImageUrl = imgUrl;
    this.modalService.open(this.imageModal, { centered: true });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false; // Set loading to false after data is loaded
    }, 500); // Adjust this delay based on your data fetching process
  
    this.getdepositedata();
  }

  getdepositedata(){
    this.api.DepositeUserData().subscribe((res:any)=>{
      // console.log(res);
      this.data1 = res.data;
    })
  }

  fileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const maxSizeInBytes = 300 * 1024; // 500 KB
  
      if (file.size > maxSizeInBytes) {
        // File size exceeds the limit, display an error message or take appropriate action.
        console.error('File size exceeds the limit (300 KB)');
        // You can also reset the file input to clear the selected file.
        event.target.value = null;
      } else {
        this.file = file;
      }
    }
  }
  

  add(){
    // console.log(this.form.value);
  if (this.form.valid) {
    const formData = new FormData();
    formData.append('amount', this.form.value.amount);
    formData.append('note', this.form.value.note);

    if (this.file) {
      formData.append('image', this.file);
    }
    
      this.api.UserDeposite(formData).subscribe(
        (a:any) => {
          if (a) {
            // console.log(a);
               this.form.reset(); 
               setTimeout(() => {
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/despositesreq']);
                });
              }, 500);
          } else {
          }
        },
        (err: any) => {
        },
      );
    }
}

}
