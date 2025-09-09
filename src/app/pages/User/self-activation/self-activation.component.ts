import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-self-activation',
  templateUrl: './self-activation.component.html',
  styleUrls: ['./self-activation.component.css']
})
export class SelfActivationComponent {
  selfactivate: boolean = false;
  useractivate: boolean = true;
  showSection(section: string) {
    this.selfactivate = section === 'selfactivate';
    this.useractivate = section === 'useractivate';
  }

openConfirmModal() {
  $('#confirmModal').modal('show');
}

confirmAction() {
  $('#confirmModal').modal('hide');
  // Your actual confirmation logic here
  console.log('Action confirmed!');
}

}
