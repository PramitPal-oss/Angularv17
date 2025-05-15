import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class SubscribeSerive {

  universealCount: number = 0;
  componentSpecific: number = 0;

  fromSubscribe(name: string) {
    this.universealCount++
    alert(`Hey I am subscribing from ${name} ${this.universealCount}`)
  }

  componentSubscription(name: string) {
    this.componentSpecific++
    console.log(`Hey I am subscribing from ${name} ${this.componentSpecific}`)
  }

}