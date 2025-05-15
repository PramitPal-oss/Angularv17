import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SetBackgroundDirective } from './directives/set-background.directive';
import { ProperBackgroundDirective } from './directives/proper-background.directive';
import { HostlistdirDirective } from './directives/hostlistdir.directive';
import { HostbindingtdirDirective } from './directives/hostbindingtdir.directive';
import { SetBackDynamicDirective } from './directives/set-back-dynamic.directive';


@NgModule({
  declarations: [
    AppComponent,
    SetBackgroundDirective,
    ProperBackgroundDirective,
    HostlistdirDirective,
    HostbindingtdirDirective,
    SetBackDynamicDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
