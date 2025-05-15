import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, Resolve, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthGaurdService } from "./AuthGaurd.service";
import { Course } from "../Models/course";
import { CourseService } from "./course.service";

export interface IDeaActivate {
  canExit(): boolean;
}

@Injectable({ providedIn: 'root' })
export class ActivateGaurd implements CanActivate, CanActivateChild, CanDeactivate<IDeaActivate>, Resolve<Course[]> {
  courserService: CourseService = inject(CourseService)

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Course[] | Observable<Course[]> | Promise<Course[]> {
    return this.courserService.getAllcourses()
  }


  authService: AuthGaurdService = inject(AuthGaurdService)
  router: Router = inject(Router);
  lastState: string | null = null;

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.IS_AUTHENTICATE) return this.authService.IS_AUTHENTICATE;
    else {
      this.router.navigate(['/login'])
      this.lastState = state.url
      return this.authService.IS_AUTHENTICATE
    }
  }

  canDeactivate(component: IDeaActivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.canExit();
  }

}