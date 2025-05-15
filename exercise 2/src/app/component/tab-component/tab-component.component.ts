import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tab-component',
  templateUrl: './tab-component.component.html',
  styleUrl: './tab-component.component.css'
})
export class TabComponentComponent {
  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  body!: string;

  @Output()
  handler = new EventEmitter()

  onTabClick() {
    this.handler.emit(this.title)
  }
}
