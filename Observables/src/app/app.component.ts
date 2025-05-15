import { Component, OnInit, } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ajax } from 'rxjs/ajax'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    // Different values
    this.observableExample.subscribe(el => console.log(el));
    this.observableExample.subscribe(el => console.log(el))

    // Getting Same value
    this.subjectExample.subscribe(el => console.log(el))
    this.subjectExample.subscribe(el => console.log(el))

    this.subjectExample.next(Math.floor(Math.random() * 10))

    //API calls only 3 times 
    this.ObservableAPItest.subscribe(el => {
      console.log(el.response, 'Observable Example 1')
    })
    this.ObservableAPItest.subscribe(el => {
      console.log(el.response, 'Observable Example 2')
    })
    this.ObservableAPItest.subscribe(el => {
      console.log(el.response, 'Observable Example 3')
    })

    //API calls only once 
    this.subjectAPItest.subscribe(el => {
      console.log(el, 'Subject Example 1')
    })
    this.subjectAPItest.subscribe(el => {
      console.log(el, 'Subject Example 2')
    })
    this.subjectAPItest.subscribe(el => {
      console.log(el, 'Subject Example 3')
    })

    this.ObservableAPItest.subscribe(this.subjectAPItest)
  }

  observableExample = new Observable((obs) => obs.next(Math.floor(Math.random() * 10)))
  subjectExample = new Subject()
  ObservableAPItest = ajax('https://jsonplaceholder.typicode.com/posts?userId=1')
  subjectAPItest = new Subject()

}


