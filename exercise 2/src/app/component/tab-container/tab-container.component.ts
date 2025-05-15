import { Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponentComponent } from '../tab-component/tab-component.component';

@Component({
  selector: 'app-tab-container',
  templateUrl: './tab-container.component.html',
  styleUrl: './tab-container.component.css'
})
export class TabContainerComponent {

  @ContentChildren(TabComponentComponent) Element!: QueryList<TabComponentComponent>

  onTabClick() {
    // console.log(title, id)
    console.log(this.Element.map(el => el.onTabClick()))
  }
}
