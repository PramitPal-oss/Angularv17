import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthGaurdService } from "./AuthGaurd.service";
import { IDeaActivate } from "./activateGaurd.service";

@Injectable({
  providedIn: 'root'
})
export class ModernActive {

  authService: AuthGaurdService = inject(AuthGaurdService)
  router: Router = inject(Router);
  lastState: string | null = null;

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.IS_AUTHENTICATE) return this.authService.IS_AUTHENTICATE;
    else {
      this.router.navigate(['/login'])
      this.lastState = state.url
      return this.authService.IS_AUTHENTICATE
    }
  }

  canDeactivate(component: IDeaActivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): boolean {
    return component.canExit();
  }
}