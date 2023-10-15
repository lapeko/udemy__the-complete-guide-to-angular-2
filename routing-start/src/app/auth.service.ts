import {Injectable} from "@angular/core";
import {timer} from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  loggedIn = false;

  isAuthenticated() {
    return new Promise(resolve => {
      setTimeout(() => resolve(this.loggedIn), 800);
    })
  }

  logIn() {
    this.loggedIn = true;
  }

  logOut() {
    this.loggedIn = false;
  }
}
