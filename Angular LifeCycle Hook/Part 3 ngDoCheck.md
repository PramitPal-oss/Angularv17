Of course! Here's a complete `.md` (Markdown) file based on your transcript, turned into a detailed, well-organized note without missing anything — and I've enhanced it slightly where it makes sense for clarity.

---

# Angular Lifecycle Hook: `ngDoCheck` - Detailed Notes

## Introduction

In this lecture, we learn about the `ngDoCheck` lifecycle hook in Angular.

- `ngDoCheck` is **the third** lifecycle hook after `ngOnChanges` and `ngOnInit`.
- It is relatively easy to understand but very powerful when used correctly.

---

## When is `ngDoCheck` Called?

- Angular **invokes `ngDoCheck` during every change detection cycle**.
- This hook is called **even if there are no changes in input-bound properties**.
- **Example**:
  - If you click a button that doesn’t do anything meaningful, Angular will still run a change detection cycle because an event (click) has happened.
  - When the change detection cycle runs, `ngDoCheck` gets called.

### Summary:

| Event                                                          | Is `ngDoCheck` called?              |
| :------------------------------------------------------------- | :---------------------------------- |
| Input property changed                                         | Yes                                 |
| Input property not changed but event like click/focus happened | Yes                                 |
| Nothing changed and no event                                   | No (no change detection cycle runs) |

---

## Order of Invocation

- **Order of lifecycle hook calls:**
  1. Constructor
  2. `ngOnChanges`
  3. `ngOnInit`
  4. `ngDoCheck`

---

## Why Use `ngDoCheck`?

- **Custom Change Detection:**

  - If Angular **fails to detect a change** in input-bound properties, you can **implement your own logic** inside `ngDoCheck`.
  - You can **compare previous and current values manually**.

- **Execute logic on every change detection cycle:**
  - If you have some code that you want to run **every time a change detection cycle occurs**, `ngDoCheck` is the right place.

---

## Example Walkthrough

### Step 1: Setup

We start from an earlier example.

- Initially, the `message` property was a `string[]`.
- We change it back to a simple `string`:

```ts
// app.component.ts
message: string = '';
```

- In `app.component.html`, we update to bind `inputVal` properly:

```html
<input [(ngModel)]="inputVal" /> <button (click)="submit()">Submit</button>
```

- In `demo.component.ts`, make sure `@Input() message: string` is correct.

- Also, in `demo.component.html`, remove `*ngFor` and simply display:

```html
{{ message }}
```

---

### Step 2: Adding `ngDoCheck`

In `demo.component.ts`:

```ts
import { DoCheck } from '@angular/core';

export class DemoComponent implements DoCheck {
  @Input() message: string;

  ngOnInit() {
    // Initialization logic
  }

  ngDoCheck() {
    console.log('ngDoCheck called');
  }
}
```

---

### Step 3: Observations

When opening the developer console:

1. **Constructor called**
2. **`ngOnChanges` called**
3. **`ngOnInit` called**
4. **`ngDoCheck` called**

When typing in the input field and clicking submit:

- Value changes:
  - `ngOnChanges` called (because input property changed).
  - `ngDoCheck` called (because change detection cycle ran).

If clicking submit again without changing input value:

- `ngOnChanges` **NOT called** (no change in input-bound property).
- `ngDoCheck` **called** (because the event triggered a change detection cycle).

---

### Step 4: Another Example - Focus Event

Modify `app.component.html` to include `focus` event on input:

```html
<input (focus)="0" [(ngModel)]="inputVal" />
```

- Here, `(focus)="0"` means on focus event, **do nothing**.
- However, even this will trigger a **change detection cycle**.

#### Behavior:

- When input field gets focused:
  - `ngDoCheck` will be called.
- Every time the focus event happens, a new change detection cycle runs → `ngDoCheck` fires.

---

## Important Concepts

| Concept                    | Explanation                                                                                      |
| :------------------------- | :----------------------------------------------------------------------------------------------- |
| **Change Detection Cycle** | Angular process that checks the component tree for changes.                                      |
| **ngDoCheck runs**         | Every time the change detection cycle runs, regardless of whether input properties have changed. |
| **Custom Logic**           | You can write your own manual change detection inside `ngDoCheck`.                               |

---

## Summary

- `ngDoCheck` is called **after** `ngOnChanges` and `ngOnInit`.
- It gets triggered **every time Angular runs a change detection cycle**, even if nothing changes.
- You can use it to implement **manual/custom change detection**.
- You can also use it if you want **certain logic to run** on every detection cycle.
- Events like **click**, **focus**, etc., trigger change detection → thus also call `ngDoCheck`.

---

## Additional Tip

While `ngDoCheck` is powerful, **overusing it can harm performance**.  
Since it runs during every change detection cycle, **keep the logic inside it lightweight** to avoid performance bottlenecks.

If your logic is heavy or frequent, prefer using:

- `OnPush` Change Detection strategy
- Other optimized Angular patterns.

---

> Thank you for reading! If you have any questions about `ngDoCheck`, feel free to ask!  
> **Happy Coding!**

---

#### What if I take a array insted of string in the input. Then every changes I just pushed inside array . What you think that time ngDoCheck will run ??

Good thinking! Let's break it down carefully:

Suppose instead of a simple `string`, your input is an **array of strings**.

Example:

```ts
@Input() message: string[] = [];
```

Now, whenever a new input comes, instead of replacing the entire array, you do:

```ts
this.message.push(newValue);
```

Meaning, **you mutate the array** by pushing a new value inside it.

---

Now the real question:  
👉 **Will `ngDoCheck` run when we `push` a new value into the array?**

✅ **YES, `ngDoCheck` will still run** — **because** when you push into the array (even without changing the reference), Angular **still runs a change detection cycle** _because an event (like button click)_ happened.

However...

👉 **Will `ngOnChanges` run?**

❌ **NO, `ngOnChanges` will NOT run** — because you are not replacing the `message` array with a _new object_ — you are just mutating the existing array.

Angular’s default change detection **checks object references** for `@Input()` properties, not the internal contents.

Since the reference of `message` array remains **same**, `ngOnChanges` will **NOT** trigger.

---

### Important:

| Action                         | `ngDoCheck` | `ngOnChanges` |
| :----------------------------- | :---------- | :------------ |
| Push into existing array       | ✅ (yes)    | ❌ (no)       |
| Replace array with a new array | ✅ (yes)    | ✅ (yes)      |

---

### Example to Make It More Clear

#### Mutating (Push)

```ts
this.message.push('new item');
```

- `ngDoCheck` ✅ called
- `ngOnChanges` ❌ not called

#### Replacing (New Array)

```ts
this.message = [...this.message, 'new item'];
```

- `ngDoCheck` ✅ called
- `ngOnChanges` ✅ called (because new reference)

---

### So in your case:

If you use **push inside the array**, **only `ngDoCheck` will run**.  
**`ngOnChanges` will not run.**

Because even though content inside the array changed, Angular didn’t see the `@Input` property reference as changed.

---

Would you like me to show this with a quick **live code example** (pseudo or real)? 🚀  
It will make it even more crystal clear if you want! ✨
