import {Component, OnInit} from '@angular/core';
import {AccountService} from "./account.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountService],
})
export class AppComponent implements OnInit {
  accounts: {name: string, status: string}[] = [];

  constructor(private dataService: AccountService) {
  }

  ngOnInit() {
    this.accounts = this.dataService.accounts;
  }
}
