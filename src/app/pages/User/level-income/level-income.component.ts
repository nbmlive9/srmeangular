import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-level-income',
  templateUrl: './level-income.component.html',
  styleUrls: ['./level-income.component.css']
})
export class LevelIncomeComponent {
  data1: any;
  levels: any[] = [];
 constructor(private api:UserService){}
  ngOnInit() {
    this.api.LevelIncome().subscribe((res: any) => {
      // console.log(res);
      this.data1 = res.data;
      this.prepareLevels();
    });
  }

  prepareLevels() {
    const levelConfigs = [
      { level: 1, label: 'Level 1', amount: 27 },
      { level: 2, label: 'Level 2', amount: 8 },
      { level: 3, label: 'Level 3', amount: 5 },
      { level: 4, label: 'Level 4', amount: 0.5, referral: '1 Direct' },
      { level: 5, label: 'Level 5', amount: 0.5, referral: '1 Direct' },
      { level: 6, label: 'Level 6', amount: 1, referral: '1 Direct' },
      { level: 7, label: 'Level 7', amount: 1, referral: '1 Direct' },
      { level: 8, label: 'Level 8', amount: 2, referral: '2 Direct' },
      { level: 9, label: 'Level 9', amount: 2, referral: '2 Direct' },
    ];

    this.levels = levelConfigs.map((conf, index) => {
      const count = this.data1[`level${conf.level}tot`] || 0;
      return {
        sno: index + 1,
        levelName: conf.label,
        amount: conf.amount,
        count: count,
        total: count * conf.amount,
        referral: conf.referral || '',
      };
    });
  }

  getTotalEarnings() {
    return this.levels.reduce((acc, lvl) => acc + lvl.total, 0);
  }

}
