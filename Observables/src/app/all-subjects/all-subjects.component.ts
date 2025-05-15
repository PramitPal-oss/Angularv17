import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-all-subjects',
  templateUrl: './all-subjects.component.html',
  styleUrl: './all-subjects.component.css'
})
export class AllSubjectsComponent implements OnInit {

  subjectCounter: number = 0;
  subjectEL: Subject<number> = new Subject<number>()

  ngOnInit(): void {
    // this.subjectEL.next(++this.subjectCounter)
    // this.subjectEL.next(++this.subjectCounter)
    // this.subjectEL.next(++this.subjectCounter)

    // this.subjectEL.subscribe((el => {
    //   console.log('Subscriber 1 :', el)
    // }))

    // this.subjectEL.next(++this.subjectCounter)
  }

  getSubscriberData() {
    this.subjectEL.next(++this.subjectCounter)
    this.subjectEL.subscribe((el => {
      console.log('Subscriber 1 :', el)
    }))
  }



}
