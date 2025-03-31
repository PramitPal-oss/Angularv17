The `@Output` decorator in **Angular 17** is used to emit events from a child component to its parent component. It allows communication between components and is primarily used when a child component needs to send data to its parent.

---

## 🔹 Understanding `@Output` in Angular 17

### ✅ What is `@Output`?

- It is a **decorator** used to **declare an event** in a child component.
- Works with **EventEmitter** to emit custom events from the child component.
- Helps in **component communication** from **child to parent**.

---

## 🔹 Key Features of `@Output`

1. **Works with `EventEmitter<T>`**

   - The `EventEmitter<T>` is used to **emit data** of type `T` from the child component.

2. **Can Pass Data to the Parent Component**

   - The emitted data is captured in the **parent component's template**.

3. **Can Emit Different Types of Data**

   - Can emit **primitive types (string, number, boolean)**.
   - Can emit **objects and arrays**.

4. **Can Be Used with Event Binding in Parent Component**
   - Parent listens to the emitted event using **event binding (`(eventName)="method($event)"`)**.

---

## 🔹 Basic Example of `@Output`

### 🏗 Step 1: Child Component (`child.component.ts`)

```typescript
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: ` <button (click)="sendData()">Send Data</button> `,
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>(); // Declare EventEmitter

  sendData() {
    this.messageEvent.emit('Hello from Child!'); // Emit event
  }
}
```

### 🏗 Step 2: Parent Component (`parent.component.ts`)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child (messageEvent)="receiveMessage($event)"></app-child>
    <p>Received Message: {{ message }}</p>
  `,
})
export class ParentComponent {
  message: string = '';

  receiveMessage(data: string) {
    this.message = data; // Set received data
  }
}
```

### ✅ Output:

- Clicking the **Send Data** button will update the parent’s `<p>` tag with `"Hello from Child!"`.

---

## 🔹 Emitting Objects using `@Output`

### 🏗 Step 1: Child Component (`child.component.ts`)

```typescript
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  template: ` <button (click)="sendUser()">Send User Data</button> `,
})
export class ChildComponent {
  @Output() userEvent = new EventEmitter<{ name: string; age: number }>();

  sendUser() {
    const userData = { name: 'Alice', age: 25 };
    this.userEvent.emit(userData); // Emit object
  }
}
```

### 🏗 Step 2: Parent Component (`parent.component.ts`)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child (userEvent)="handleUser($event)"></app-child>
    <p>User: {{ user?.name }}, Age: {{ user?.age }}</p>
  `,
})
export class ParentComponent {
  user: { name: string; age: number } | null = null;

  handleUser(data: { name: string; age: number }) {
    this.user = data;
  }
}
```

### ✅ Output:

- Clicking **Send User Data** updates `<p>` to `User: Alice, Age: 25`.

---

## 🔹 Using `@Output` with Custom Event Names

By default, the event name is the property name, but we can specify a **custom event name** using `alias`.

### 🏗 Example:

```typescript
export class ChildComponent {
  @Output('customEvent') myEvent = new EventEmitter<string>();

  sendData() {
    this.myEvent.emit('Hello with Custom Event Name!');
  }
}
```

### Parent Template:

```html
<app-child (customEvent)="handleCustomEvent($event)"></app-child>
```

### ✅ Effect:

- The parent listens to **`customEvent`** instead of `myEvent`.

---

## 🔹 Using `@Output` with Multiple Events

### 🏗 Child Component:

```typescript
export class ChildComponent {
  @Output() success = new EventEmitter<string>();
  @Output() error = new EventEmitter<string>();

  sendSuccess() {
    this.success.emit('Success Message!');
  }

  sendError() {
    this.error.emit('Error Message!');
  }
}
```

### 🏗 Parent Component:

```html
<app-child (success)="handleSuccess($event)" (error)="handleError($event)"></app-child>
<p>{{ message }}</p>
```

```typescript
handleSuccess(data: string) {
  this.message = data;
}

handleError(data: string) {
  this.message = `Error: ${data}`;
}
```

### ✅ Output:

- Emits **success** or **error** messages separately.

---

## 🔹 Unsubscribing from EventEmitter

EventEmitter does **not need to be unsubscribed** in most cases because Angular handles cleanup when the component is destroyed.

However, if emitting events inside an **Observable or Subscription**, manually unsubscribe.

### 🏗 Example:

```typescript
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-child',
  template: `<button (click)="startEmitting()">Start</button>`,
})
export class ChildComponent implements OnDestroy {
  @Output() numberEvent = new EventEmitter<number>();
  private subscription!: Subscription;

  startEmitting() {
    this.subscription = interval(1000).subscribe((num) => {
      this.numberEvent.emit(num);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe(); // Prevent memory leaks
  }
}
```

---

## 🔹 Key Takeaways

✔ `@Output` is used to **send data** from a **child** to a **parent** component.  
✔ `EventEmitter<T>` emits events that the parent listens to with **event binding**.  
✔ Supports **primitive values, objects, and arrays** as emitted data.  
✔ Can **rename events** with aliases.  
✔ Can **emit multiple events** from a child component.  
✔ **Memory leaks** can occur if an EventEmitter is inside an **Observable**, so **unsubscribe** properly.

---

## 🚀 Final Thoughts

- `@Output` is essential for **component communication** in Angular applications.
- It ensures a **clean** and **modular** approach to passing data **up the hierarchy**.
- It is **easy to implement** and **scales well** in component-based architectures.

Would you like an advanced example with `RxJS` or state management? 😊
