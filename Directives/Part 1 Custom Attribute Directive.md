# Custom Attribute Directive in Angular

## Introduction

In the previous sections, we explored Angular's **life cycle hooks** and various built-in directives such as:

- `ngStyle`
- `ngClass`
- `ngIf`
- `ngFor`
- `ngModel`

These are **built-in directives** provided by Angular, but we have not yet created our **own custom directive**. In this lecture, we will learn how to create a **custom attribute directive** and later extend our knowledge to **structural directives**.

---

## Recap of Angular Directives

Angular directives are categorized into three main types:

### 1. Component Directive

A **component directive** is essentially an Angular component. It is a directive that comes with a **template**.

### 2. Attribute Directive

An **attribute directive** is used to change the **appearance** or **behavior** of a DOM element. Examples include:

- `ngStyle`
- `ngClass`

These directives help dynamically change the **CSS styles** or **class bindings** of elements.

### 3. Structural Directive

A **structural directive** is used to **add** or **remove** elements from the DOM. Examples include:

- `ngIf`
- `ngFor`

These directives modify the DOM dynamically based on the given condition or list.

---

## Creating a Custom Attribute Directive

### Step 1: Project Setup

We will create a **custom attribute directive** that dynamically sets the **background color** and **text color** of an element.

#### Locate the Product Detail Component

- Open the **eCard project** in **VS Code**.
- Navigate to:
  ```
  src -> app -> container -> product-detail
  ```
- Open `product-detail.component.html`

Currently, the `gender`, `brand`, and `category` values are hardcoded. We will modify them to use **dynamic data** from the `product` object:

```html
<span>{{ product.gender }}</span>
<span>{{ product.brand }}</span>
<span>{{ product.category }}</span>
```

#### Remove Hardcoded CSS Styles

- Open `product-detail.component.css`.
- Comment out or remove the **background color** and **text color** styles.
- Now, when we load the page, the text appears **black**, and no background color is applied.

### Step 2: Creating the Directive

#### 1. Generate a New Directive File

Inside the **app folder**, create a new folder named `custom-directives` and inside that, create a new TypeScript file:

```
custom-directives/set-background.directive.ts
```

#### 2. Define the Directive Class

Inside `set-background.directive.ts`, create a **TypeScript class** and export it:

```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[setBackground]',
})
export class SetBackgroundDirective {}
```

#### 3. Register the Directive

To use this directive, we must register it in `app.module.ts`:

```typescript
import { SetBackgroundDirective } from './custom-directives/set-background.directive';

@NgModule({
  declarations: [SetBackgroundDirective],
})
export class AppModule {}
```

### Step 3: Using Dependency Injection

To dynamically manipulate the DOM element, we need **ElementRef**:

```typescript
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[setBackground]',
})
export class SetBackgroundDirective implements OnInit {
  constructor(private element: ElementRef) {}

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = 'gray';
    this.element.nativeElement.style.color = 'white';
  }
}
```

### Step 4: Using the Directive

Apply the directive to the `<span>` elements inside `product-detail.component.html`:

```html
<span setBackground>{{ product.gender }}</span>
<span setBackground>{{ product.brand }}</span>
<span setBackground>{{ product.category }}</span>
```

### Step 5: Verifying the Output

- Open the web page.
- Select a product.
- Observe that the text now has a **gray background** and **white text**.

---

## Understanding Dependency Injection in Directives

### What Happens Internally?

1. When Angular detects the `setBackground` attribute on an element, it **creates an instance** of `SetBackgroundDirective`.
2. The constructor is invoked, and Angular **injects** the reference to the element (`ElementRef`).
3. The `ngOnInit()` method is executed, applying the background and text color.

### What is `ElementRef`?

- It provides access to the native **DOM element**.
- `element.nativeElement` refers to the **actual HTML element** where the directive is applied.

---

## Optimizing the Directive Code

Instead of:

```typescript
private element: ElementRef;
constructor(element: ElementRef) {
  this.element = element;
}
```

We can use **TypeScript shorthand syntax**:

```typescript
constructor(private element: ElementRef) {}
```

This automatically:

- Declares `element` as a **private property**.
- Assigns the injected value to `this.element`.

---

## Summary

1. We learned about **different types of directives** in Angular:
   - Component Directive
   - Attribute Directive
   - Structural Directive
2. We created a **custom attribute directive** `setBackground`.
3. We used **dependency injection** to get a reference to the DOM element.
4. We applied **dynamic styles** using `ElementRef`.
5. We optimized the code using **TypeScript shorthand**.

In the next lecture, we will enhance this directive to allow **dynamic color customization**.

**Thank you for reading! Have a great day.** 🎯
