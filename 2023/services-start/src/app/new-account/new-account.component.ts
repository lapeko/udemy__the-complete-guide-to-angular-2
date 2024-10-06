import { Component } from '@angular/core';
import { AccountService } from "../account.service";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
})
export class NewAccountComponent {
  constructor(
    private dataService: AccountService,
  ) {
    dataService.statusChangeEmitter
      .subscribe(status => console.log("====> new status from Account component: ", status));
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.dataService.addAccount(accountName, accountStatus);
  }
}
