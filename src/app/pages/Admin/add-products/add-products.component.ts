import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
declare var bootstrap: any;
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {

  data:any;
  form:FormGroup;
  form1:FormGroup;
   pending: boolean = true;
    user54: boolean = false;
    user306: boolean = false;
    user45: boolean = false;
    showSection(section: string) {
         this.pending = section === 'pending';
      this.user54 = section === 'user54';
      this.user306 = section === 'user306';
      this.user45 = section === 'user45';
    }
    pdata:any;
     editId: any = null;
    constructor(private api:AdminService, private fb:FormBuilder, private router:Router) { 
        this.form = this.fb.group({
        name: ['', Validators.required],
        price: ['', Validators.required],
        // gst: ['', Validators.required],
        info: ['', Validators.required],
        dfee: ['', ],
      });
         this.form1 = this.fb.group({
        product_title: ['', ],
        price: ['', ],
        // gst: ['', ],
        info: ['', ],
        dfee: ['', ],
         status: ['', ],
      });
    } 
  
    ngOnInit() {
      this.getproducts();
    }
  
    getproducts() {
      this.api.GetProducts().subscribe((res: any) => {
        console.log(res);
        this.data = res.data;
      });
    }

      getproductsByid(id:any) {
      this.api.GetProductByid(id).subscribe((res: any) => {
        console.log(res);
        this.pdata = res.data;
      });
    }
  
    add() {
      console.log(this.form.value);
      if (this.form.valid) {  
        const val: any = {
          name: this.form.value.name,
          price: this.form.value.price,
          //  gst: this.form.value.gst,
            info: this.form.value.info,
            dfee:this.form.value.dfee,
        };
    
        this.api.AddProducts(val).subscribe(
          (response: any) => {
            console.log('Response:', response);
            this.form.reset();
               setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/addproduct']);
          });
        }, 500);
          },
          (error: any) => {
            console.error('Error:', error);
          }
        );
      }
      return false;
    }

   openEditModal(row: any) {
    this.editId = row.id;
    this.form1.patchValue({
      product_title: row.product_title,
      price: row.price,
      // gst: row.gst,
      info: row.info,
      dfee:row.dfee,
      status: row.status || 'Active',
    });
  }

  updateProduct() {
    if (this.form1.valid && this.editId) {
      const val = this.form1.value;
      this.api.UpdateUserProduct(this.editId, val).subscribe((res: any) => {
        this.getproducts();

        // Close modal programmatically (in case not auto-closed)
        const modalEl = document.getElementById('editModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          modal?.hide();
        }
      });
    }
  }

}
