import { Component } from '@angular/core';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
  constructor(public userService: UsersService) {
  }
  onSetToActive(id: number) {
    this.userService.setToActive(id);
  }
}
