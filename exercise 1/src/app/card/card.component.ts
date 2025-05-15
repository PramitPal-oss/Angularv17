import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardInterface } from '../Interface/primeInterface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input({
    required: true
  })
  cards!: CardInterface;


  @Output()
  onCardClickHandler = new EventEmitter<CardInterface>()

  onClickCard() {
    this.onCardClickHandler.emit(this.cards)
  }

  getSubHeading() {
    return `${this.cards?.subheading} by ${this.cards?.instructor}`
  }
}
