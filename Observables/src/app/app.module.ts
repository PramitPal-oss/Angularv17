import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TodoInputComponent } from './todo/todo-input/todo-input.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { ObservableExampleComponent } from './observable/observable-example/observable-example.component';
import { IncreaseCounterComponent } from './subject/increase-counter/increase-counter.component';
import { ShowResultComponent } from './subject/show-result/show-result.component';
import { AllSubjectsComponent } from './all-subjects/all-subjects.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    TodoInputComponent,
    ObservableExampleComponent,
    IncreaseCounterComponent,
    ShowResultComponent,
    AllSubjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
