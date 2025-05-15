Of course! I'll create a detailed and properly formatted `.md` (Markdown) file based on this transcript. I’ll keep **everything** you shared, clean it up a bit for better readability, and **add minor helpful clarifications** where needed, without missing anything.

Here’s the detailed `.md` file content for **`ngOnChanges`**:

---

# Angular Lifecycle Hooks: `ngOnChanges`

---

## Introduction

In this lecture, we learn about the **first Angular lifecycle hook**, which is **`ngOnChanges`**.

In the last lecture, we discussed that:

- Angular lifecycle hooks are **methods** that Angular **invokes** on a directive or a component when it **creates**, **changes**, and **destroys** them.

Now, among these lifecycle hooks, we will focus on the **`ngOnChanges`** hook.

---

## What is the Change Detection Cycle in Angular?

Before diving into `ngOnChanges`, let's understand **Change Detection** in Angular.

- The **Change Detection Cycle** in Angular is a **mechanism** by which Angular keeps the **view template in sync with the component class**.

### Example:

- In the view (HTML template), suppose we have:

```html
<div>Hello {{ name }}</div>
```

Here:

- `name` is a property of the component class.
- Whenever the value of `name` changes, **the updated value immediately reflects on the webpage**.

---

## How does Angular detect changes?

- Angular **runs a Change Detection Cycle** **on every DOM event** and in some **special scenarios** that might **result in DOM changes**.

### When does Change Detection run?

- When the **input property** of a component changes.
- When a **DOM event** (like click, change, etc.) happens.
- When a **timer event** happens (like `setTimeout`, `setInterval`).
- When we **make an HTTP request**.

Angular also raises lifecycle hooks during critical stages of the Change Detection Cycle.

---

## Angular Lifecycle

- The **lifecycle of a component** begins when the component class is instantiated by **calling the constructor**.
- It **ends** with the **destruction** of the component class.

> **Note:**  
> The **constructor** is **neither a lifecycle hook** nor **specific to Angular**. It is a standard **JavaScript feature**.

At the time the constructor is called:

- **Input properties** are **not updated yet**.
- **Child components** are **not constructed**.
- **Projected contents** (for `<ng-content>`) are **not available yet**.

All of these happen **after** the constructor execution is complete.

---

## What is `ngOnChanges`?

- `ngOnChanges` is the **first lifecycle hook** that **we can use** after the component instantiation.
- It **executes**:
  1. When the component is **created** and **its input-bound properties are updated**.
  2. **Every time** the **input-bound property changes** after creation.

---

## Example: Understanding `ngOnChanges`

**Setup:**

1. In a `DemoComponent`, wrap the `<p>` tag inside a `<div>`.
2. Add a class `.demo` for applying some styles via CSS.

**CSS for `.demo`**:

```css
.demo {
  /* Example styling */
  padding: 10px;
  background-color: #f0f0f0;
}
```

3. In `AppComponent`:
   - Move the button above the `AppDemoComponent`.
   - Add an input of type text.

Resulting UI:

- An input box.
- A submit button.
- A paragraph showing the message.

---

### Changing the setup:

- In `DemoComponent.html`, replace static text with:

```html
<p>{{ message }}</p>
```

- `message` is defined as an **Input** property:

```typescript
@Input() message: string;
```

Initially:

- Do **not** assign anything to `message` (because it's **meant to be set by parent**).

In `AppComponent.html`:

- Bind the `message`:

```html
<app-demo [message]="inputVal"></app-demo>
```

Where `inputVal` is a property in the parent component:

```typescript
inputVal: string = '';
```

---

### Handling Input and Button:

- In the input element:

```html
<input type="text" #inputEl />
```

- On clicking the submit button:

```html
<button (click)="onBtnClick(inputEl)">Submit</button>
```

- Handle the click event in `AppComponent.ts`:

```typescript
onBtnClick(inputEl: HTMLInputElement) {
  this.inputVal = inputEl.value;
}
```

---

## What Happens When?

- At page load:

  - Constructor of `AppComponent` is called.
  - Constructor of `DemoComponent` is called.
  - In the constructor, the `message` property will **log `undefined`** (because `@Input` values are not set during constructor execution).

- After the constructor:
  - Angular **sets the input property**.
  - **`ngOnChanges` is called** because the input property (`message`) gets **initialized**.

---

## Implementing `ngOnChanges`

- In `DemoComponent`:

```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export class DemoComponent implements OnChanges {
  @Input() message: string;

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges hook called');
    console.log(changes);
  }
}
```

> **Good Practice:**  
> Implement the interface (`OnChanges`) even though Angular doesn't strictly require it.

---

## `SimpleChanges` Object

- `SimpleChanges` is an object containing all changed input properties.

Each property inside `SimpleChanges`:

- **currentValue**: The new value.
- **previousValue**: The old value.
- **firstChange**: Boolean indicating if it's the first time the property is set.

---

## Behavior Observed:

1. **First render**:

   - `ngOnChanges` is called.
   - Previous Value: `undefined`
   - Current Value: `''` (empty string)

2. **After typing and submitting**:

   - Value changes (e.g., "ABC").
   - `ngOnChanges` is called.
   - Logs the previous and current value.

3. **Typing again and submitting**:

   - New value (e.g., "XYZ").
   - `ngOnChanges` is called again.

4. **No Change, Just Submit**:
   - If you submit without changing the value:
     - **No `ngOnChanges` is called**.

Because:

- If the **previous value** and **current value** are **the same**, Angular **does not** call `ngOnChanges`.

---

## Important Points to Remember

- `ngOnChanges` executes:

  - When the component is **created and input properties are set**.
  - **Every time input properties change**.

- It **does not execute** if:

  - The **input property value** hasn't changed between successive change detection cycles.

- You can use `SimpleChanges` to:
  - Check **current** and **previous** values.
  - Detect whether it is the **first change**.

---

# Conclusion

- `ngOnChanges` is extremely useful when you want to **react immediately** to **input property changes** in Angular.
- Always remember the constructor is too early for input properties.
- If you want to respond to input value changes, **use `ngOnChanges` properly**.

---

# Quick Code Summary

```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnChanges {
  @Input() message: string;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges hook called');
    console.log(changes);
  }
}
```

---

# Thank you!

If you have any questions, feel free to ask.  
**Happy Learning! 🎯**

---

#### What if I take a array insted of string in the input. Then every changes I just pushed inside array . What you think that time ngonchages will run ??

Good question!  
Let's think about it carefully.

In Angular, `ngOnChanges` is triggered **only when the _reference_ of the input property changes**, not when you mutate (modify) the _contents_ of the object or array itself.

---

👉 **In your case:**

- If you take an array (e.g., `@Input() items: string[]`) and **just push** new values inside the array (like `this.items.push('new item')`),
- Then the **reference** of the array is **not changing**, only its **internal contents** are changing.

**As a result, `ngOnChanges()` will NOT be triggered!**  
Because Angular does not detect internal mutations — it detects only reference changes.

---

👉 **If you want `ngOnChanges` to run**, you would need to actually **change the reference**.  
For example:

```typescript
this.items = [...this.items, 'new item'];
```

Here, you're creating a **new array object**.  
Now, Angular will notice that "Hey! The reference has changed!" — and it **will trigger** `ngOnChanges`.

---

### Quick Summary:

| Scenario                         | Will ngOnChanges run? |
| :------------------------------- | :-------------------- |
| Pushing into existing array      | ❌ No                 |
| Replacing array with a new array | ✅ Yes                |

---

### Why this behavior?

- Angular's change detection relies on **reference checking** for objects and arrays.
- It does not do **deep checking** (because deep checking would be **very expensive and slow** for performance).

---

### Real example:

```typescript
@Input() items: string[] = [];

ngOnChanges(changes: SimpleChanges) {
  console.log('ngOnChanges triggered:', changes);
}

// In parent component
this.inputItems.push('new value'); // ❌ ngOnChanges not triggered
this.inputItems = [...this.inputItems, 'new value']; // ✅ ngOnChanges triggered
```

---

Would you also like me to show a **small live code demo** for this behavior? 🚀  
It can make things even more crystal clear!
