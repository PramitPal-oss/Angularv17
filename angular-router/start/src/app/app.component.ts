import { Component, inject, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Angular Routing';
  router: Router = inject(Router)

  showLoader: boolean = false

  ngOnInit(): void {
    this.router.events.subscribe(route => {
      if (route instanceof NavigationStart) this.showLoader = true;
      else if (route instanceof NavigationCancel || route instanceof NavigationEnd || route instanceof NavigationError) this.showLoader = false
    })
  }

}
