import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AuthGaurdService } from '../Services/AuthGaurd.service';
import { Router } from '@angular/router';
import { ActivateGaurd } from '../Services/activateGaurd.service';
import { ModernActive } from '../Services/ModernActive.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @ViewChild('userName')
  userName: ElementRef

  @ViewChild('password')
  password: ElementRef;

  authService: AuthGaurdService = inject(AuthGaurdService)
  router: Router = inject(Router)
  activateGaurd: ModernActive = inject(ModernActive)

  onSubmit() {
    const uName = this.userName.nativeElement.value
    const passw = this.password.nativeElement.value
    const logged = this.authService.loggedIn(uName, passw)


    if (this.authService.IS_AUTHENTICATE && logged) {
      alert(`Welcome ${logged.name}!! Brother`)
      if (this.activateGaurd.lastState) this.router.navigateByUrl(this.activateGaurd.lastState)
      else this.router.navigateByUrl('/courses/checkout')
    }
    else
      alert(`Get the Fuck Out of Here!!!`)

  }
}
