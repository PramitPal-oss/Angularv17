import { Component, Inject, InjectionToken } from '@angular/core';
import { SubscribeSerive } from '../services/subscribeService';
import { CurrentService } from '../services/currentService';
import { ApiService, PostInterface } from '../services/apiService';
import { HttpClient } from '@angular/common/http';

export const CURRENT_SERVICE = new InjectionToken<CurrentService>('CURRENT_SERVICE');
export const POST_SERVICE = new InjectionToken<ApiService>('POST_SERVICE')

export const factoryFunction = (http: HttpClient): ApiService => {
  return new ApiService(http)
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [SubscribeSerive, {
    provide: CURRENT_SERVICE,
    useClass: CurrentService,
  },

    {
      provide: POST_SERVICE,
      useFactory: factoryFunction,
      deps: [HttpClient]
    }

  ]
})
export class HeaderComponent {
  constructor(private logger: SubscribeSerive, @Inject(CURRENT_SERVICE) private currS: CurrentService, @Inject(POST_SERVICE) private apiData: ApiService) { }

  onHeader() {
    this.logger.componentSubscription('Header Component')
    this.currS.currentSerTree()
    this.apiData.getAllRecords().subscribe((el) => {
      console.log(el)
    })
  }
}
