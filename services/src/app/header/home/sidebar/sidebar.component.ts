import { Component } from '@angular/core';
import { SubscribeSerive } from '../../../services/subscribeService';
import { DifferentService } from '../../../services/differentService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  providers: [SubscribeSerive]
})
export class SidebarComponent {
  constructor(private logger: SubscribeSerive, private differentS: DifferentService) { }

  sameInstance() {
    this.differentS.fromSubscribe('UserDetails Component')
  }

  onSidebar() {
    this.logger.componentSubscription('Sidebar Component')
  }
}
