import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchCounterService {
  toActiveMoves = 0;
  toInactiveMoves = 0;

  incActiveMoves() {
    this.toActiveMoves++;
  }

  incInactiveMoves() {
    this.toInactiveMoves++;
  }
}
