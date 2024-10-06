import {EventEmitter, Injectable} from "@angular/core";
import {LoggingService} from "./logging.service";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];
  statusChangeEmitter = new EventEmitter<string>();

  constructor(private logService: LoggingService) {
  }

  addAccount(name: string, status: string) {
    this.accounts.push({name, status});
    this.logService.logStatusChange(status);
  }

  changeStatus(id: number, status: string) {
    this.accounts[id].status = status;
    this.logService.logStatusChange(status);
  }
}
