import { AlertifyService } from "./../services/alertify.service";
import { AuthService } from "./../services/auth.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertify: AlertifyService
  ) {}
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data["roles"] as Array<string>;
    if (roles) {
      const match = this.auth.roleMatch(roles);
      if (match) {
        return true;
      } else {
        this.router.navigate(["members"]);
        this.alertify.error("You are not authorized to access this page!");
      }
    }
    if (this.auth.loggedIn()) {
      return true;
    }
    this.alertify.error("Login to access this route!");
    this.router.navigate(["/home"]);
    return false;
  }
}
