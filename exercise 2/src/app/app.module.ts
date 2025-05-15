import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TabComponentComponent } from './component/tab-component/tab-component.component';
import { TabContainerComponent } from './component/tab-container/tab-container.component';

@NgModule({
  declarations: [
    AppComponent,
    TabComponentComponent,
    TabContainerComponent
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
