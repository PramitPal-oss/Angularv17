import { Component, OnInit } from '@angular/core';
import { CounterServiceService } from '../../service/counter-service.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-increase-counter',
  templateUrl: './increase-counter.component.html',
  styleUrl: './increase-counter.component.css'
})
export class IncreaseCounterComponent implements OnInit {
  counter: number = 0;
  display: boolean = false
  subjectcount: { count1: number[], count2: number[], count3: number[], behaviour1: number[], behavioure2: number[], behaviour3: number[] } = { count1: [], count2: [], count3: [], behaviour1: [], behaviour3: [], behavioure2: [] }

  constructor(private countService: CounterServiceService) { }

  ngOnInit(): void {
    const testSubs = new Subject<number>()
    const subbehaviour = new BehaviorSubject<number>(0)

    testSubs.subscribe(el => {
      console.log('Subs 1', el)
      this.subjectcount.count1.push(el) // 1 2 3
    })
    testSubs.subscribe(el => {
      console.log('Subs 2', el)
      this.subjectcount.count2.push(el) // 1 2 3
    })

    testSubs.next(1)
    testSubs.next(2)

    testSubs.subscribe(el => {
      console.log('Subs 3', el)
      this.subjectcount.count3.push(el) // 3
    })

    testSubs.next(3)

    //Taking Last emitted value
    subbehaviour.subscribe((el) => this.subjectcount.behaviour1.push(el)) // 0 1 2 3 4 5 6
    subbehaviour.next(1)
    subbehaviour.next(2)

    //Taking Last emitted value
    subbehaviour.subscribe((el) => this.subjectcount.behavioure2.push(el)) // 2 3 4
    subbehaviour.next(3)
    subbehaviour.next(4)

    //Taking Last emitted value
    subbehaviour.subscribe((el) => this.subjectcount.behaviour3.push(el)) // 4 5 6
    subbehaviour.next(5)
    subbehaviour.next(6)
  }

  onHanleClick() {
    this.counter++
    this.countService.getSubCount(this.counter)
    this.countService.getBehaviourCount(this.counter)
  }

  getDisplay() {
    this.display = !this.display
  }

}
