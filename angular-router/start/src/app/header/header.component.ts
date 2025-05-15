import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGaurdService } from '../Services/AuthGaurd.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  Router: ActivatedRoute = inject(ActivatedRoute)
  authService: AuthGaurdService = inject(AuthGaurdService)
  router: Router = inject(Router)

  ngOnInit(): void {
    this.Router.fragment.subscribe(el => {
      if (el) document.getElementById(el).scrollIntoView({ behavior: 'smooth' })
    })
  }

  onLogOut() {
    this.authService.loggedOut();
    this.router.navigateByUrl('/login')
  }

}
