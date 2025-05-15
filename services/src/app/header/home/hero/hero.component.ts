import { Component } from '@angular/core';
import { SubscribeSerive } from '../../../services/subscribeService';
import { DifferentService } from '../../../services/differentService';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  providers: [SubscribeSerive]
})
export class HeroComponent {
  constructor(private logger: SubscribeSerive, private differentS: DifferentService) { }

  sameInstance() {
    this.differentS.fromSubscribe('UserDetails Component')
  }

  onHero() {
    this.logger.componentSubscription('Hero Component')
  }
}
