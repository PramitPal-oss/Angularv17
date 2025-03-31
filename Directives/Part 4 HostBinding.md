# @HostBinding in Angular | Creating & Using Custom Directive

## Introduction

In this lecture, we learned about the `@HostListener` and `@HostBinding` decorators in Angular. These decorators allow interaction with a host element by listening to events and binding properties dynamically.

### `@HostListener`

- The `@HostListener` decorator listens to events on a host element and executes an event handler function accordingly.
- Example: Listening to a `mouseover` event and changing styles dynamically.

### `@HostBinding`

- The `@HostBinding` decorator binds a host element’s property to a property of the directive or component class.
- Example: Binding the `style.backgroundColor` property to change the background color dynamically.

---

## Creating a Custom Directive

We will now create a custom directive called `appHover` that will change the background color and border of an element when hovered over.

### Step 1: Generate the Directive

```sh
ng generate directive custom-directives/app-hover
```

This creates a directive file `app-hover.directive.ts` inside the `custom-directives` folder.

### Step 2: Update the Directive Code

```ts
import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class AppHoverDirective {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'white';
  @HostBinding('style.border') border: string = 'none';
  @HostBinding('style.color') textColor: string = '#28282B';

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = 'white';
    this.textColor = '#28282B';
    this.border = '3px solid #28282B';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = '#28282B';
    this.textColor = 'white';
    this.border = 'none';
  }
}
```

### Explanation:

1. **`@HostBinding` Usage:**

   - `@HostBinding('style.backgroundColor')` binds the `backgroundColor` property to the host element’s `style.backgroundColor`.
   - `@HostBinding('style.border')` binds the `border` property to `style.border`.
   - `@HostBinding('style.color')` binds the `textColor` property to `style.color`.

2. **`@HostListener` Usage:**
   - `@HostListener('mouseenter')`: Changes the background color, text color, and adds a border when hovered over.
   - `@HostListener('mouseleave')`: Resets the styles when the mouse leaves.

---

## Using the Directive in an Angular Component

### Step 1: Apply the Directive in HTML

Locate the `product-detail.component.html` file and apply the `appHover` directive to the button:

```html
<button appHover>Add to Cart</button>
```

### Step 2: Verify the Changes

1. Initially, the button has a **black background** and **white text**.
2. On hover:
   - Background color changes to **white**.
   - Text color changes to **black**.
   - A **black border** appears.
3. When the mouse leaves, it reverts to its original state.

---

## Summary

### `@HostBinding`

- Binds a directive or component class property to a DOM element’s property.
- Example: `@HostBinding('style.backgroundColor') backgroundColor: string = 'white';`

### `@HostListener`

- Listens to events on a host element.
- Example: `@HostListener('mouseenter') onMouseEnter() {}`

### Key Takeaways

- `@HostBinding` helps dynamically set the styles or properties of a host element.
- `@HostListener` allows event-based interactions on the host element.
- These decorators are useful for creating dynamic behavior in Angular directives.

This concludes the lecture on `@HostBinding` and `@HostListener`. If you have any questions, feel free to ask. Thank you!
