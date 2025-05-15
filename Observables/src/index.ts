type Observer<T> = {
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

class MyObservable<T> {
  private _subscribeFn: (observer: Observer<T>) => void;

  constructor(subscribeFn: (observer: Observer<T>) => void) {
    this._subscribeFn = subscribeFn;
  }

  subscribe(observer: Observer<T>): void {
    this._subscribeFn(observer);
  }
}

const myObs = new MyObservable<string>((observer) => {
  observer.next('🚀 First value');
  observer.next('📦 Second value');
  observer.error('Hey')
  observer.complete();
});

myObs.subscribe({
  next: (val) => console.log('Received:', val),
  error: (err) => console.error('Error:', err),
  complete: () => console.log('✅ Done!'),
});