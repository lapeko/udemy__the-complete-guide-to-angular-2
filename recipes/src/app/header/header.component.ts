import {Component} from '@angular/core';
import {map} from "rxjs";
import {RouterModule} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {Store} from "@ngrx/store";

import {DataStorageService} from "../services/data-storage.service";
import {DropdownDirective} from "../shared/dropdown.directive";
import {isAuthenticated} from "../../store/auth/auth.selectors";
import {signOut} from "../../store/auth/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule, NgIf, DropdownDirective, AsyncPipe],
})
export class HeaderComponent {
  isAuthenticated$ = this.store.select(isAuthenticated);
  isNotAuthenticated$ = this.isAuthenticated$.pipe(map(isAuthenticated => !isAuthenticated));

  constructor(
    private dataStorageService: DataStorageService,
    private store: Store,
  ) {
  }

  saveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes();
  }

  logout() {
    this.store.dispatch(signOut());
  }
}

