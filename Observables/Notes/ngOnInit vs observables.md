### Explain the code block

```js
ngOnInit(): void {
    //! NOT RECOMENDED LIKE THIS. USE ONLY SUBJECT FOR THIS KIND OF CASE.
    this.todoService.addTodo.subscribe((todo: string) => {
      this.data.push(todo)
    })
    this.todoService.description.subscribe((desc: string) => {
      this.desc.push(desc)
    })
  }

```

That's a really good question, and it's a classic point of confusion when working with **RxJS** and **Angular lifecycle hooks** like `ngOnInit`.

Let's unpack this step by step. 🔍

---

## 🧠 The Misconception:

You’re thinking:

> **"If `ngOnInit` runs only once, how come the code inside the subscriptions continues to run later?"**

You’re **right** that `ngOnInit()` itself runs **only once**, but the code **inside** it can register things like **event listeners**, **subscriptions**, **intervals**, etc., which live **beyond** the `ngOnInit` lifecycle.

---

## ⚙️ What Actually Happens

Let's dissect your code:

```ts
ngOnInit(): void {
  this.todoService.addTodo.subscribe((todo: string) => {
    this.data.push(todo)
  });

  this.todoService.description.subscribe((desc: string) => {
    this.desc.push(desc)
  });
}
```

### 🔹 What happens inside `ngOnInit`?

- At the time Angular calls `ngOnInit` (after the component has been initialized), you are **subscribing** to two **Observables**:

  - `this.todoService.addTodo`
  - `this.todoService.description`

- **Subscribing** means: “Hey RxJS, when **a new value is emitted** from this observable, please run this callback function.”

> So the actual `subscribe(...)` runs only **once** inside `ngOnInit`, but the **callback function** you pass gets executed **every time** a value is emitted from the observable.

---

## 🔄 Observables and the Event Loop

You can think of **RxJS Observables** like event listeners — they’re waiting in the background for an event (value emission) to occur.

Let’s relate it to something simpler:

```ts
document.addEventListener('click', () => {
  console.log('Clicked!');
});
```

- This `addEventListener` runs once.
- But the callback runs **every time** a user clicks.

Same with RxJS:

```ts
someObservable.subscribe((val) => {
  console.log(val);
});
```

- `.subscribe(...)` registers the **callback**.
- But the callback runs **whenever** `.next()` is called on the underlying Subject/Observable.

---

## 🔁 What triggers `.next()`?

You mentioned:

> "I don't see `console.log` in `ngOnInit`, so how are values still getting added?"

That’s because **values are not being emitted from inside `ngOnInit`**, but probably from elsewhere like:

```ts
this.addTodo.next('New Task'); // somewhere in the service or component
```

This line emits a value which your `subscribe()` callback reacts to — even long after `ngOnInit` has completed.

---

## ✅ Internal Mechanism Step-by-Step

1. Component is created.
2. Angular calls `ngOnInit()`.
3. You call `.subscribe(...)` on an observable inside `ngOnInit`.
4. That sets up a **subscription** (i.e., stores a callback function).
5. Time passes... somewhere, someone does:
   ```ts
   this.addTodo.next('Do homework');
   ```
6. That triggers all **subscribers** of `addTodo`, and each callback runs.
7. Even though `ngOnInit` is long finished, the callbacks are still alive and responding.

---

## 🔄 What's a Better Way?

You're already hinting at a better approach: **using a Subject only** and subscribing in a cleaner, more managed way, e.g., via `async` pipes or inside services.

You can use `Subject` or `BehaviorSubject` inside your service like this:

```ts
// todo.service.ts
todoSubject = new Subject<string>();

addTodo(todo: string) {
  this.todoSubject.next(todo);
}
```

Then in your component:

```ts
ngOnInit(): void {
  this.todoService.todoSubject.subscribe(todo => {
    this.data.push(todo);
  });
}
```

Or even better with `async` pipe if you’re working with the template only.

---

## 🧼 Cleanup Note

Don’t forget to **unsubscribe** (manually or using `takeUntil`, `async` pipe, or `untilDestroyed`) to avoid memory leaks.

---

## TL;DR Summary

- ✅ `ngOnInit` runs once and registers a **subscription**.
- 🔁 The subscription lives on and runs every time the observable emits a value.
- 🔗 This is like adding an event listener that reacts to future events.
- 🧠 Understanding RxJS (Observables/Subjects/Subscriptions) is key here.

---

Let me know if you'd like a **visual diagram** of this or a sample app to play with!
