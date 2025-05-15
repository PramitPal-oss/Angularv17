import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputServiceService {

  addTodo: EventEmitter<string> = new EventEmitter<string>();
  private description: Subject<string> = new Subject()
  description$ = this.description.asObservable()


  constructor() { }

  captureTodo(value: string) {
    this.addTodo.emit(value)
  }

  captureSubTodo(desc: string) {
    this.description.next(desc)
  }

}
