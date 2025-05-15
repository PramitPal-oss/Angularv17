import { Component } from '@angular/core';
import { SubscribeSerive } from '../../services/subscribeService';
import { DifferentService } from '../../services/differentService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [SubscribeSerive]
})
export class HomeComponent {
  constructor(private logger: SubscribeSerive, private differentS: DifferentService) { }

  sameInstance() {
    this.differentS.fromSubscribe('UserDetails Component')
  }
  onHome() {
    this.logger.componentSubscription('Home Component')
  }
}
