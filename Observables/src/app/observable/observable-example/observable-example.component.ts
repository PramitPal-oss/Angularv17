
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { filter, from, fromEvent, map, Observable, of, Subscriber } from 'rxjs';


@Component({
  selector: 'app-observable-example',
  templateUrl: './observable-example.component.html',
  styleUrl: './observable-example.component.css'
})
export class ObservableExampleComponent implements AfterViewInit {


  ngAfterViewInit(): void {
    this.onbtnHandler()
  }
  title = 'basic';

  index: number = 0;

  limit: number = 0;

  index1: number = 0;

  limit1: number = 0;

  counter: number = 0;

  @ViewChild('clickedEvent')
  clickBtnEl!: ElementRef

  data: { dynamic: number[], static: number[], of: any[], form: any[], fromEvent: number[], mapFilterEvent: number[] } = { dynamic: [], static: [], of: [], form: [], fromEvent: [], mapFilterEvent: [] }

  classes: { dynamic: string, static: string, of: string, form: string, fromEvent: string, mapFilterEvent: string } = { dynamic: '', static: '', of: '', form: '', fromEvent: '', mapFilterEvent: '' }

  message: { dynamic: string, static: string, of: string, form: string, formEvent: string, mapFilterEvent: string } = { dynamic: '', static: '', of: '', form: '', formEvent: '', mapFilterEvent: '' }

  isLoading: { dynamic: boolean, static: boolean, of: boolean, form: boolean, formEvent: boolean, mapFilterEvent: boolean } = { dynamic: false, static: false, of: false, form: false, formEvent: false, mapFilterEvent: false }

  myobservable = new Observable<number>((observer) => {
    setTimeout(() => { observer.next(1) }, 1000);
    setTimeout(() => { observer.next(2) }, 2000);
    setTimeout(() => { observer.next(3) }, 3000);
    setTimeout(() => { observer.next(4) }, 4000);
    setTimeout(() => { observer.next(5) }, 5000);
    setTimeout(() => { observer.complete() }, 5000)
  })

  setCallbackBasedonLuck(observer: Subscriber<number>, i: number, end: number) {
    const luck = Math.floor(Math.random() * 10);
    if (luck < 8)
      observer.next(i);
    else {
      observer.error();
      return;
    }
    if (i === end - 1) {
      observer.complete();
    }
  }

  setCallback(observer: Subscriber<number>, i: number, end: number) {
    observer.next(i);
    if (i === end - 1) {
      observer.complete();
    }
  }


  createObservable(start: number, end: number, assigned: number): Observable<number> {
    return new Observable((observer) => {
      for (let i = start; i < end; i++) {
        const luck = Math.floor(Math.random() * 10);
        setTimeout(() => {
          if (assigned === 1) this.setCallbackBasedonLuck(observer, i, end);
          else this.setCallback(observer, i, end)
        }, (i - start) * 1000);
      }
    });
  }

  onHandlerSuccess(): void {
    this.isLoading.static = true;
    this.classes.static = 'text-indigo-700';

    this.message.static = 'Starting...'

    this.myobservable.subscribe({
      next: (value) => {
        this.data.static.push(value as number)
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('It is Completed');
        this.isLoading.static = false
        this.classes.static = 'text-green-600'
        this.message.static = 'Completed Successfullly !!!'
      }
    })
  }

  onHanleClick(): void {
    this.isLoading.dynamic = true;

    const start = this.limit;
    this.limit += 5;

    this.message.dynamic = 'Starting...'

    this.classes.dynamic = 'text-indigo-700'

    const obs = this.createObservable(start, this.limit, 1);

    obs.subscribe({
      next: (value) => {
        this.data.dynamic.push(value as number)
      },
      error: (err) => {
        console.log(err);
        this.classes.dynamic = 'text-red-500'
        this.message.dynamic = 'Something Went Wrong !!! Try Again!!'
        this.isLoading.dynamic = false
      },
      complete: () => {
        console.log('It is Completed');
        this.isLoading.dynamic = false
        this.classes.dynamic = 'text-green-600'
        this.message.dynamic = 'Completed Successfullly !!!'
      }
    })
  }

  onOfHandler() {
    const myObs = of([1, 2, 3, 4, 5, 6, 7], 20, 40, 50, { a: 1, b: 2 }, 'A', 'Test')

    this.isLoading.of = true;
    this.classes.of = 'text-indigo-700';

    this.message.of = 'Starting...'

    myObs.subscribe({
      next: (value) => {
        this.data.of.push(value)
        console.log(this.data);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('It is Completed');
        this.isLoading.of = false
        this.classes.of = 'text-green-600'
        this.message.of = 'Completed Successfullly !!!'
      }
    })
  }

  onFormHandler() {
    const myObs = from([1, 2, 3, 4, 5, 6, 7])

    this.isLoading.form = true;
    this.classes.form = 'text-indigo-700';

    this.message.form = 'Starting...'

    myObs.subscribe({
      next: (value) => {
        this.data.form.push(value)
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('It is Completed');
        this.isLoading.form = false
        this.classes.form = 'text-green-600'
        this.message.form = 'Completed Successfullly !!!'
      }
    })
  }

  onbtnHandler() {
    fromEvent(this.clickBtnEl.nativeElement, 'click').subscribe({
      next: (data) => {
        this.counter++
        this.data.fromEvent.push(this.counter)
      }
    })
  }

  onnewObservableHandler() {
    this.isLoading.mapFilterEvent = true;

    const start = this.limit1;
    this.limit1 += 5;


    this.message.mapFilterEvent = 'Starting...'

    this.classes.mapFilterEvent = 'text-indigo-700'

    const newAddition = this.createObservable(start, this.limit1, 2)

    let luckNumber = 0;

    newAddition
      .pipe((map(el => {
        luckNumber = el * 1.2
        return el * 2
      })))
      .pipe((filter(el => {
        const luck = Math.floor(Math.random() * luckNumber);
        return el > luck
      })))
      .subscribe({
        next: (value) => {
          this.data.mapFilterEvent.push(value)
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('It is Completed');
          this.isLoading.mapFilterEvent = false
          this.classes.mapFilterEvent = 'text-green-600'
          this.message.mapFilterEvent = 'Completed Successfullly !!!'
        }
      })
  }
}
