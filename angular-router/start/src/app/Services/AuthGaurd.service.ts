import { inject, Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { User } from "../Models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  userService: UserService = inject(UserService)

  IS_AUTHENTICATE: boolean = false;

  loggedIn(userName: string, password: string): User | void {
    const user = this.userService.users.find((u) => u.username === userName && u.password === password);
    if (!user) this.IS_AUTHENTICATE = false;
    else {
      this.IS_AUTHENTICATE = true;
      return user;
    }
  }

  loggedOut() {
    this.IS_AUTHENTICATE = false
  }

}