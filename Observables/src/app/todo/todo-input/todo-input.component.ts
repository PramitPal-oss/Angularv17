import { Component, Input } from '@angular/core';
import { ComponentType } from '../../interface/TodoInterfae';
import { InputServiceService } from '../../service/input-service.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css'
})
export class TodoInputComponent {
  @Input({
    required: true
  })
  TYPE!: ComponentType

  value!: string

  constructor(private todoService: InputServiceService) { }

  getTodoText() {
    if (this.value.length === 0) return;
    if (this.TYPE === 1) {
      this.todoService.captureTodo(this.value)
    } else {
      this.todoService.captureSubTodo(this.value)
    }
    this.value = ''
  }

}
