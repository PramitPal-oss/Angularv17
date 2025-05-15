import { Component, ContentChildren, QueryList } from '@angular/core';
import { TabContainerComponent } from './component/tab-container/tab-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'basic';

  tabDetails: { title: string, description: string, id: number }[] = [
    { title: 'Tab 1', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est totam distinctio laborum! At commodi assumenda molestias quod modi ipsum nemo?', id: 1 },
    { title: 'Tab 2', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est totam distinctio laborum! At commodi assumenda molestias quod modi ipsum nemo?', id: 2 },
    { title: 'Tab 3', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est totam distinctio laborum! At commodi assumenda molestias quod modi ipsum nemo?', id: 3 },
    { title: 'Tab 4', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est totam distinctio laborum! At commodi assumenda molestias quod modi ipsum nemo?', id: 4 },
    { title: 'Tab 5', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est totam distinctio laborum! At commodi assumenda molestias quod modi ipsum nemo?', id: 5 }
  ]

}
