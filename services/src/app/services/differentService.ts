import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'any'
})
export class DifferentService {

  universealCount: number = 0;

  fromSubscribe(name: string) {
    this.universealCount++
    alert(`Hey I am subscribing from ${name} ${this.universealCount}`)
  }

}