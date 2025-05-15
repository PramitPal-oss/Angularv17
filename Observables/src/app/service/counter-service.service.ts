import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {
  private count: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  count$: Observable<number> = this.count.asObservable();

  private count2: Subject<number> = new Subject<number>()
  count2$: Observable<number> = this.count2.asObservable();

  constructor() { }

  getSubCount(no: number) {
    this.count2.next(no)
  }

  getBehaviourCount(no: number) {
    this.count.next(no)
  }

}
