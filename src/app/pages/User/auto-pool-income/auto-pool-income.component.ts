import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
declare var bootstrap: any;

@Component({
  selector: 'app-auto-pool-income',
  templateUrl: './auto-pool-income.component.html',
  styleUrls: ['./auto-pool-income.component.css']
})
export class AutoPoolIncomeComponent {
data1:any;

sdata:any;
form: FormGroup;
currentLevel: string = '';
showModal: boolean = false;

constructor(private fb: FormBuilder, private api: UserService, private router: Router) {
  this.form = this.fb.group({
    awardtype: ['', Validators.required]
  });
}

openModal(level: string) {
  this.currentLevel = level;
  this.showModal = true;
  this.form.reset();
}

closeModal() {
  this.showModal = false;
}

  ngOnInit() {
      //get pending report
       this.api.AutopoolIncome().subscribe((res: any) => {
      // console.log('autoincome', res);
      this.data1 = res.data;
    });
      this.api.salaryData().subscribe((res: any) => {
      // console.log('salary', res);
      this.sdata = res.data.achivedata;
    });
  }

submitAward() {
  if (this.form.valid) {
    const val = { awardtype: this.form.value.awardtype };

    let apiCall: Observable<any> | undefined;

    switch (this.currentLevel) {
      case 'level2':
        apiCall = this.api.UpdateAutoLevel2(val);
        break;
      case 'level3':
        apiCall = this.api.UpdateAutoLevel3(val);
        break;
      case 'level4':
        apiCall = this.api.UpdateAutoLevel4(val);
        break;
      case 'level5':
        apiCall = this.api.UpdateAutoLevel5(val);
        break;
    }

    if (apiCall) {
      apiCall.subscribe(() => {
        this.closeModal();
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/myincomes']);
          });
        }, 500);
      });
    }
  }
}






}
