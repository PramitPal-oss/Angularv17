import { NgModule } from "@angular/core";
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { CoursesComponent } from "./courses/courses.component";
import { CourseDetailComponent } from "./courses/course-detail/course-detail.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { LoginComponent } from "./login/login.component";
import { ContactComponent } from "./contact/contact.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ActivateGaurd } from "./Services/activateGaurd.service";
import { PopularComponent } from "./home/popular/popular.component";
import { ModernActive } from "./Services/ModernActive.service";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'courses', component: CoursesComponent, resolve: { courses: ActivateGaurd } },
  // { path: 'courses/course/:id', component: CourseDetailComponent },
  {
    path: 'courses', canActivateChild: [ModernActive], children: [
      { path: 'popular', component: PopularComponent },
      { path: 'course/:id', component: CourseDetailComponent },

      //? For Single child
      // { path: 'checkout', component: CheckoutComponent, canActivate: [ActivateGaurd] }
      { path: 'checkout', component: CheckoutComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent, canDeactivate: [ModernActive] },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true }),
  ],
  exports: [
    RouterModule
  ]
})
export class Routing { }