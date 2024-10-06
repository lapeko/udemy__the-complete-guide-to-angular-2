import {Injectable, signal} from '@angular/core';

export type Role = "user" | "admin" | null;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #role = signal<Role>(null);

  get role() {
    return this.#role.asReadonly();
  }

  login(role: Role) {
    this.#role.set(role);
  }
}
