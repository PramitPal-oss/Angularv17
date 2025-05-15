import { Component, OnInit } from '@angular/core';
import { InputServiceService } from '../service/input-service.service';
import { ComponentType } from '../interface/TodoInterfae';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  EventType: number = ComponentType.EVENTEMITTER;
  SubjecrType: number = ComponentType.SUBJECT

  data: string[] = []

  desc: string[] = []

  constructor(private todoService: InputServiceService) { }

  ngOnInit(): void {
    //! NOT RECOMENDED LIKE THIS. USE ONLY SUBJECT FOR THIS KIND OF CASE.
    this.todoService.addTodo.subscribe((todo: string) => {
      this.data.push(todo)
    })
    this.todoService.description$.subscribe((desc: string) => {
      this.desc.push(desc)
    })
  }
}
