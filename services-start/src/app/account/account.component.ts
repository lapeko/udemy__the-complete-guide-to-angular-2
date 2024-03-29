import { Component, Input } from '@angular/core';
import { AccountService } from "../account.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(
    private dataService: AccountService
  ) {
  }

  onSetTo(status: string) {
    this.dataService.changeStatus(this.id, status);
    this.dataService.statusChangeEmitter.emit(status);
  }
}
