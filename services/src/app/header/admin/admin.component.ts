import { Component } from '@angular/core';
import { SubscribeSerive } from '../../services/subscribeService';
import { DifferentService } from '../../services/differentService';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  providers: [SubscribeSerive]
})
export class AdminComponent {
  constructor(private logger: SubscribeSerive, private differentS: DifferentService) { }

  sameInstance() {
    this.differentS.fromSubscribe('UserDetails Component')
  }
  onAdmin() {
    this.logger.componentSubscription('Admin Component')
  }
}
