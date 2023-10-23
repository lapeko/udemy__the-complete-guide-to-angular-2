import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {RouterModule} from "@angular/router";
import {NgIf} from "@angular/common";

import {DataStorageService} from "../services/data-storage.service";
import {AuthService} from "../services/auth.service";
import {DropdownDirective} from "../shared/dropdown.directive";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule, NgIf, DropdownDirective],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private _destroy$ = new Subject<void>();

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authService.user$
      .pipe(takeUntil(this._destroy$))
      .subscribe(user => this.isAuthenticated = !!user);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  saveRecipes() {
    this.dataStorageService.storeRecipes();
  }

  fetchRecipes() {
    this.dataStorageService.fetchRecipes();
  }

  logout() {
    this.authService.logout();
  }
}

