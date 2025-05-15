import { Component } from '@angular/core';
import { SubscribeSerive } from '../../../services/subscribeService';
import { DifferentService } from '../../../services/differentService';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css',
  providers: [SubscribeSerive]
})
export class UserdetailsComponent {
  constructor(private logger: SubscribeSerive, private differentS: DifferentService) { }

  sameInstance() {
    this.differentS.fromSubscribe('UserDetails Component')
  }

  onuserDetails() {
    this.logger.componentSubscription('UserDetails Component')
  }
}
