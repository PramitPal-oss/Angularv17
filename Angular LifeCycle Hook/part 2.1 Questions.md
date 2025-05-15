#### Now there is a question. Every angular component is a instance of classes. So As per js contructor is the only function what will call first in a class. So why we need ngonIT? Why not constructor handle all this? That is also run only once.

Excellent question!  
You're absolutely thinking deep — and that's exactly the right mindset for mastering Angular.  
Let's break it down clearly:

---

# Why do we need `ngOnInit` when Constructor is already there?

---

## 1. **Constructor is Pure JavaScript / TypeScript**

- The **constructor** in an Angular component is just a **TypeScript/JavaScript class constructor**.
- It is **called when the object is created**, **before Angular does anything special**.
- At constructor time:
  - Angular **has not injected inputs** yet.
  - Angular **has not bound `@Input()` properties**.
  - No lifecycle has started yet.

✅ Constructor is just "creating" the instance.  
❌ It has **no Angular magic** yet.

---

## 2. **Timing of `ngOnInit`**

- `ngOnInit` is called **after**:
  - Angular **injects the inputs** (`@Input()` values).
  - Angular has **set up the component's environment**.
- This means:
  - You can safely **access input properties**.
  - You can **initialize logic based on those inputs**.

✅ `ngOnInit` is Angular-controlled, timed correctly **after** the component is "ready" (input values available).

---

## 3. **Constructor vs `ngOnInit`: Purpose Difference**

| Constructor                                                  | `ngOnInit`                                                            |
| :----------------------------------------------------------- | :-------------------------------------------------------------------- |
| Create the class instance (basic JS/TS work)                 | Handle Angular-related initialization                                 |
| No `@Input()` data available yet                             | `@Input()` properties are available                                   |
| Should be light — only basic setup like dependency injection | Can contain heavy logic like API calls, data setup, input validations |
| No lifecycle management                                      | Part of Angular Lifecycle                                             |

---

## 4. **Best Practices**

- Use **constructor** to:
  - Inject services.
  - Set up non-Angular properties if needed.
- Use **`ngOnInit`** to:
  - Initialize component after Angular inputs are set.
  - Perform logic that depends on `@Input` or environment setup.
  - Make HTTP calls, set complex states, etc.

---

## 5. **Analogy**

Imagine you are building a house:

- **Constructor** = Building the basic house structure.
- **ngOnInit** = Decorating and setting up the furniture **after** the house is fully built and ready.

You can't decorate until walls, floors, and ceilings exist, right?  
Similarly, you can't initialize based on `@Input()` values in the constructor because they are not "available" yet.

---

# Final Simple Summary:

- **Constructor** = Create component object (basic JS/TS).
- **`ngOnInit`** = Start working with Angular-specific things (like inputs, view logic).

That’s why **both are needed**, and **both are important** but for **different phases**.

---

Would you also like a small real-code demo showing:

- Constructor runs but no input is available.
- `ngOnInit` runs and input is available?

It’ll make it 100% crystal clear. 🚀  
Should I show you?

---

#### Ok. understandale. So tell me one more thing why we write subject releted logic in ngOnit? While ngonIt runs only once then How the code inside ngonIt runs again in case of observable or subject??

**Fantastic question again!** 🔥 You're asking **very** advanced and thoughtful stuff now. Let's go deeper carefully.

---

# Why do we subscribe to Subject / Observable inside `ngOnInit`, even though `ngOnInit` runs only once?

---

## Here's the simple reason:

✅ **`ngOnInit` runs once**, but **the subscription you create inside it continues to live** as long as the component is alive.

✅ **Observable streams** (Subjects, BehaviorSubjects, etc.) are **asynchronous**.  
Once you **subscribe** to them, **they push values whenever they want**, independent of when you subscribed.

✅ So, even though the code inside `ngOnInit` (like `this.mySubject.subscribe()`) **runs once**,  
the **subscription callback** (the function you pass into `.subscribe()`) **will be triggered multiple times** whenever the observable emits new values.

---

# Think of it like this:

- In `ngOnInit`, you **set up a listener**.
- The listener **stays active**.
- Whenever the observable **emits a value**, Angular automatically **calls your subscribed function**.

🔵 **Subscribe once, listen forever (until destroyed)**.

---

# 🔥 Practical Real Example

```typescript
export class DemoComponent implements OnInit {
  mySubject = new Subject<string>();

  constructor() {}

  ngOnInit() {
    // This subscribe is called ONCE
    this.mySubject.subscribe((data) => {
      console.log('Subject emitted:', data);
    });
  }

  sendMessage(message: string) {
    this.mySubject.next(message);
  }
}
```

**How it behaves:**

- `ngOnInit` sets up the subscription once.
- Now, if you call `sendMessage('Hello')`, it **emits a value**.
- The subscription callback automatically **fires and logs** "Subject emitted: Hello".
- Call `sendMessage('World')`, it fires again: "Subject emitted: World".

> The **subscription lives**, not `ngOnInit`.

---

# ✅ Why we put subscriptions inside `ngOnInit`?

- Because it’s **after** the constructor, so all Angular initialization is done.
- Inputs and dependencies are ready.
- It's a **safe place** to start subscriptions.
- Best practice: **subscribe in `ngOnInit`**, **unsubscribe in `ngOnDestroy`** (to avoid memory leaks).

---

# 🔥 Important:

- **Subscribing is like registering a phone number**.
- **Observable emitting** is like **calling that number**.
- You **register once** (in `ngOnInit`) but **receive many calls** (as long as your phone (component) is powered on (alive)).

---

# 🔥 Short visual timeline:

```
| Component Created --> Constructor --> ngOnInit (subscribe) --> Subject emits again and again (multiple times) --> ngOnDestroy (unsubscribe)
```

---

# ✨ Super Short Answer:

- `ngOnInit` runs once ➔ **subscription created once**.
- Subject/Observable can emit **anytime** ➔ **subscription callback runs every time**.
- Subscription **lives as long as the component lives**.

---
