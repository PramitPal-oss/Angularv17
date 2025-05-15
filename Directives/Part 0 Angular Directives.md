Angular has **three main types of directives**, and it supports **four types of data binding**. I’ll break everything down **in-depth** with **code examples** and **internal working**.

---

## 🔶 Types of Directives in Angular

Angular directives are instructions in the DOM. They tell Angular how to change the DOM or behavior of a component.

### 1. **Component Directives**

- These are the **most common**.
- Every Angular component is technically a directive with a **template**.

**Example:**

```ts
@Component({
  selector: 'app-user',
  template: `<h1>Hello, {{ name }}</h1>`,
})
export class UserComponent {
  name = 'Angular';
}
```

**Under the hood:**

- Angular replaces `<app-user>` with the component's template.
- It uses the selector to match the tag in HTML.
- It instantiates the class, binds data, and inserts the DOM tree.

---

### 2. **Structural Directives**

- They **change the structure of the DOM** by adding/removing elements.
- Start with a `*`, like `*ngIf`, `*ngFor`.

**Example:**

```html
<div *ngIf="isLoggedIn">Welcome back!</div>
<ul>
  <li *ngFor="let item of items">{{ item }}</li>
</ul>
```

**How it works:**

- Angular **desugars** `*directive` into `<ng-template>` behind the scenes.

```html
<ng-template [ngIf]="isLoggedIn">
  <div>Welcome back!</div>
</ng-template>
```

- It evaluates the expression. If `true`, it creates a view from the template; if `false`, it removes it from the DOM.

---

### 3. **Attribute Directives**

- Change the **appearance or behavior** of elements.
- Don't change the structure of the DOM.

**Built-in Examples:** `ngClass`, `ngStyle`, `ngModel`.

**Custom Attribute Directive Example:**

```ts
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

**Usage:**

```html
<p appHighlight>This will be highlighted</p>
```

**How it works:**

- Angular finds the attribute selector (`[appHighlight]`).
- It creates an instance of the directive.
- The directive modifies the element using `ElementRef` or `Renderer2`.

---

## 🔷 Angular Data Binding – All 4 Types In-Depth

Data binding in Angular synchronizes the data between the component and the view.

---

### 1. **Interpolation ({{ }})**

Used to **display component properties** in HTML.

**Example:**

```html
<h1>Hello, {{ username }}</h1>
```

**How it works:**

- Angular evaluates `username` and updates the DOM.
- It uses **property binding internally** (`textContent` or `innerText`).

---

### 2. **Property Binding** `[property]`

Used to **bind DOM element properties** to component variables.

**Example:**

```html
<img [src]="imageUrl" />
```

**How it works:**

- Angular sets the DOM property, not the attribute.
- More secure and efficient.
- Uses the `Renderer2` API internally for security and platform abstraction.

---

### 3. **Event Binding** `(event)`

Used to **listen to events** from the DOM and call methods in the component.

**Example:**

```html
<button (click)="onSubmit()">Submit</button>
```

**How it works:**

- Angular attaches the event listener to the DOM element.
- When event is triggered, the component method is executed in the context of the component.

---

### 4. **Two-Way Binding** `[(ngModel)]`

Combination of **property + event binding**.

**Example:**

```html
<input [(ngModel)]="name" />
<p>Hello, {{ name }}</p>
```

**How it works:**

- Desugared to:
  ```html
  <input [ngModel]="name" (ngModelChange)="name = $event" />
  ```
- Any change in the input updates the variable and vice versa.

**Note:** You must import `FormsModule` to use `ngModel`.

```ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule],
})
export class AppModule {}
```

---

## 🔍 Summary Table

| Binding Type     | Syntax                | Direction        | Example                      |
| ---------------- | --------------------- | ---------------- | ---------------------------- |
| Interpolation    | `{{ expression }}`    | Component → View | `<p>{{ name }}</p>`          |
| Property Binding | `[property]="value"`  | Component → View | `<img [src]="imgUrl">`       |
| Event Binding    | `(event)="handler()"` | View → Component | `<button (click)="save()">`  |
| Two-Way Binding  | `[(ngModel)]="prop"`  | Two-Way          | `<input [(ngModel)]="name">` |

---

## ⚙️ How Angular Handles It Internally (Change Detection)

- Angular uses **Zone.js** to detect changes in async events (like user input, HTTP calls).
- When change is detected:
  - Angular runs the **Change Detection Cycle**.
  - It checks each component’s bindings.
  - Updates the DOM if any change is found.

Angular uses **unidirectional data flow**, even in two-way binding (it’s just property + event).

---

If you want, I can make a **mini Angular app** showing all these examples together! Let me know if that would help you visualize it better.
