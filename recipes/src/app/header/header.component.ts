import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
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
}

