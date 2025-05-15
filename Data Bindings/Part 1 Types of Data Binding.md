Angular provides **four main types of data binding**, each with a specific use case to create a dynamic interaction between the component class (TypeScript) and the template (HTML). Understanding each one in-depth will help you become more proficient in Angular development, especially when working with dynamic UIs.

# Angular Data Binding - Detailed Notes

## Introduction

So far, we have learned about **components** in Angular and understood their importance. Another core concept in Angular closely related to components is **Data Binding**.

Data Binding in Angular is a powerful feature that enables **communication between a component class and its view template**. This communication is essential for building dynamic and interactive user interfaces.

---

## What is Data Binding?

**Data Binding** refers to the mechanism that binds the component class and its associated view template. It allows data to flow:

- From the **component class** to the **view template**
- From the **view template** to the **component class**

This communication is essential for rendering data in the UI and reacting to user interactions.

---

## Key Elements of a Component

A component in Angular consists of two main parts:

1. **Component Class**: Contains UI logic and data.
2. **View Template**: Contains HTML to be rendered in the browser.

---

## Data Flow Example

Let's consider an example to illustrate how data binding works.

### Component Class:

```ts
export class MyComponent {
  title = 'Idiomi';
  message = 'Welcome to Angular';
  display = true;

  onClick() {
    console.log('Button clicked');
  }
}
```

### View Template:

```html
<h1>{{ title }}</h1>
<p>{{ message }}</p>
<div [hidden]="display">This is a hidden message</div>
<button (click)="onClick()">Click Me</button>
```

### Explanation:

- **{{ title }}** and **{{ message }}** use **String Interpolation** to bind values from the component to the view.
- **[hidden]="display"** uses **Property Binding** to dynamically bind the `display` property.
- **(click)="onClick()"** uses **Event Binding** to trigger a method in the component when a button is clicked.

---

## Types of Data Binding in Angular

### 1. One-Way Data Binding

Data flows in **one direction only**.

#### a) From Component to View Template

- Achieved using:
  - **String Interpolation**: `{{ propertyName }}`
  - **Property Binding**: `[property]="propertyName"`

#### b) From View Template to Component

- Achieved using:
  - **Event Binding**: `(event)="handlerFunction()"`

### 2. Two-Way Data Binding

Data flows **in both directions**:

- From Component to View Template
- From View Template to Component

This means that any change in the component class reflects in the view and vice versa.

- Achieved using the **ngModel directive**:
  ```html
  <input [(ngModel)]="propertyName" />
  ```
  - This is a **combination** of property and event binding.
  - Requires importing **FormsModule** from `@angular/forms`.

---

## Summary

| Direction            | Binding Type         | Syntax                      |
| -------------------- | -------------------- | --------------------------- |
| Component → Template | String Interpolation | `{{ propertyName }}`        |
| Component → Template | Property Binding     | `[property]="propertyName"` |
| Template → Component | Event Binding        | `(event)="handler()"`       |
| Both                 | Two-Way Binding      | `[(ngModel)]="property"`    |

---

## Conclusion

Data Binding is a fundamental concept in Angular that facilitates interaction between the logic (component) and the view (template). Understanding and mastering the different types of data binding — **string interpolation**, **property binding**, **event binding**, and **two-way binding** — is essential for building robust Angular applications.

In the next lecture, we will dive deep into **String Interpolation** to see how we can use it effectively to achieve one-way data binding from the component to the view template.

---

**Thank you for reading. Have a great day!**

---

## 🔗 Types of Data Binding in Angular

### 1. **Interpolation** (`{{ }}`)

**One-way data binding (component to view)**

- Interpolation binds data from the component to the HTML template.
- It evaluates the expression and renders the result as a string in the DOM.

**Syntax:**

```html
<p>{{ title }}</p>
```

**Component:**

```ts
export class AppComponent {
  title = 'Welcome to Angular!';
}
```

**Use Cases:**

- Displaying dynamic text, numbers, or expressions.
- Concatenation, arithmetic, and method calls.

**Advanced Usage:**

```html
<p>{{ 'Hello ' + getUserName() }}</p>
```

> Be cautious with method calls inside interpolation—they can cause performance issues as they execute with every change detection cycle.

---

### 2. **Property Binding** (`[property]="expression"`)

**One-way data binding (component to view)**

- Binds the value of a component property to a DOM property (not an HTML attribute).
- This is especially useful for setting image sources, disabling buttons, setting form input values, etc.

**Syntax:**

```html
<img [src]="imageUrl" /> <button [disabled]="isDisabled">Submit</button>
```

**Component:**

```ts
export class AppComponent {
  imageUrl = 'assets/logo.png';
  isDisabled = true;
}
```

**Difference from Interpolation:**

- Use property binding when binding to **non-string values** (booleans, objects, arrays, etc.).

---

### 3. **Event Binding** (`(event)="handler()"`)

**One-way data binding (view to component)**

- Sends data from the view (user action) to the component class.
- Useful for handling user interactions like clicks, key presses, form submissions, etc.

**Syntax:**

```html
<button (click)="onClick()">Click Me</button>
```

**Component:**

```ts
export class AppComponent {
  onClick() {
    console.log('Button clicked');
  }
}
```

**Pass values:**

```html
<input (input)="onInput($event)" />
```

```ts
onInput(event: Event) {
  const inputValue = (event.target as HTMLInputElement).value;
  console.log(inputValue);
}
```

---

### 4. **Two-way Data Binding** (`[(ngModel)]`)

**Two-way data binding (view ↔ component)**

- Combines property binding and event binding.
- Any change in the component is reflected in the view and vice versa.

**Syntax:**

```html
<input [(ngModel)]="username" />
<p>Hello {{ username }}</p>
```

**Component:**

```ts
export class AppComponent {
  username = '';
}
```

**Important Note:**

- `FormsModule` must be imported in the corresponding Angular module:

```ts
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ FormsModule ],
})
```

---

## 🎯 Summary Table

| Binding Type     | Direction        | Syntax                | Use Case                               |
| ---------------- | ---------------- | --------------------- | -------------------------------------- |
| Interpolation    | Component → View | `{{ expression }}`    | Display text, values, computed strings |
| Property Binding | Component → View | `[property]="value"`  | Set DOM properties dynamically         |
| Event Binding    | View → Component | `(event)="handler"`   | React to user actions (click, input)   |
| Two-way Binding  | View ↔ Component | `[(ngModel)]="value"` | Sync form inputs with component fields |

---

## 🧠 Advanced Note: Binding Shorthand

Angular internally converts:

- `[(ngModel)]="value"` to `[ngModel]="value" (ngModelChange)="value = $event"`

You can also manually write it like this:

```html
<input [ngModel]="value" (ngModelChange)="value = $event" />
```

---

Would you like me to create a live demo or StackBlitz link to see all bindings in one app?
