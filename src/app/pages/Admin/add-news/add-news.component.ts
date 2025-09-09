import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent {

  data:any;
  form:FormGroup;
  errorMessage='';
  msg="";
    constructor(private api:AdminService, private fb:FormBuilder, private router:Router) { 
        this.form = this.fb.group({
        news_title: ['', Validators.required],
        news: ['', Validators.required],
      });
    } 
  
    ngOnInit() {
      this.getnews();
    }
  
    getnews() {
      this.api.GetNews().subscribe((res: any) => {
        console.log(res);
        this.data = res.data;
      });
    }
  
    add() {
      console.log(this.form.value);
      if (this.form.valid) {  
        const val: any = {
          news_title: this.form.value.news_title,
          news: this.form.value.news,
        };
    
        this.api.addNews(val).subscribe(
          (response: any) => {
            console.log('Response:', response);
            this.form.reset();
            setTimeout(() => {
              this.router.navigate(['/addnews']);
            }, 500);
          },
          (error: any) => {
            console.error('Error:', error);
            setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/addnews']);
            });
            }, 500);
          }
        );
      }
      return false;
    }

    Delete(id:any) {
    this.api.DeleteNews(id).subscribe(
      (a: any) => {
        if (a) {
          console.log(a);
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/addnews']);
            });
            }, 500);
        } else {
          console.log(a);
          this.errorMessage = a.msg.message;
          this.msg = 'News Successfully Updated !!!'; 
          setTimeout(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/addnews']);
            });
            }, 500);
        }
      },
      (err: any) => {
      },
    );
  return false;
}


}
