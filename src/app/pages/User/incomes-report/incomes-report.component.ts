import { Component } from '@angular/core';

@Component({
  selector: 'app-incomes-report',
  templateUrl: './incomes-report.component.html',
  styleUrls: ['./incomes-report.component.css']
})
export class IncomesReportComponent {
  referral: boolean = true;
  rfclub: boolean = false;
  level: boolean = false;
  silver: boolean = false;
  gold: boolean = false;
  diamond: boolean = false;
  autopool: boolean = false;
  royalty: boolean = false;
  showSection(section: string) {
    this.referral = section === 'referral';
    this.rfclub = section === 'rfclub';
    this.level = section === 'level';
    this.silver = section === 'silver';
    this.gold = section === 'gold';
    this.diamond = section === 'diamond';
    this.autopool = section === 'autopool';
    this.royalty = section === 'royalty';
  }

}
