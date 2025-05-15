import { AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CardInterface } from './Interface/primeInterface';
import { CardData } from './Interface/Data';
import { CardComponent } from './card/card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    console.log(this.childCard.getSubHeading())
    console.log(this.allChildren)
  }

  courseCards: CardInterface[] = CardData

  @ViewChild(CardComponent)
  public childCard!: CardComponent

  @ViewChild(CardComponent, { read: ElementRef })
  public ChildCardElement !: ElementRef

  @ViewChildren(CardComponent)
  public allChildren !: QueryList<CardComponent>

  onCardClick(event: CardInterface) {
    console.log(event)
    console.log(this.ChildCardElement)
  }
}
