# @HostListener in Angular | Creating & Using Custom Directive

## Introduction

In this lecture, we are going to learn about an important decorator in Angular called `@HostListener`. The `@HostListener` decorator listens to a DOM event on the host element and reacts to that event by executing an event handler method.

We will understand `@HostListener` with a practical example by creating a custom directive that highlights an element when hovered over and restores it when the mouse moves away.

---

## Creating a Custom Directive

### Step 1: Generate a New Directive

We will create a new custom directive named `HighlightDirective` using the Angular CLI.

1. Open a terminal.
2. Navigate to the `custom-directives` folder using:

   ```sh
   cd src/app/custom-directives
   ```

3. Generate the directive using the following command:

   ```sh
   ng generate directive highlight
   ```

   or the shorthand version:

   ```sh
   ng g d highlight
   ```

4. The Angular CLI will create two files inside the `custom-directives` folder:

   - `highlight.directive.spec.ts` (for unit testing, which we can delete)
   - `highlight.directive.ts` (the main directive file)

5. Angular automatically registers the directive inside `app.module.ts` under the `declarations` array.

---

## Understanding the Directive Structure

Let's open `highlight.directive.ts`. Here’s what it contains:

```ts
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}
}
```

### Explanation:

- `@Directive({ selector: '[appHighlight]' })` → Defines a directive with the selector `appHighlight`.
- `ElementRef` → Provides a direct reference to the host element.
- `Renderer2` → Used to safely modify the DOM (recommended instead of directly modifying `ElementRef`).

---

## Using the Directive

We will apply the `appHighlight` directive to a `div` inside the `product.component.html` file:

```html
<div class="product" appHighlight>
  <!-- Product details -->
</div>
```

Here, `appHighlight` is applied to a `div`, making it the **host element**.

---

## Accessing the Host Element in the Directive

To manipulate the host element, we inject `ElementRef` in the constructor:

```ts
constructor(private element: ElementRef, private renderer: Renderer2) {}
```

- `ElementRef` gives us direct access to the host DOM element.
- `Renderer2` ensures safe and efficient DOM manipulations.

Using `private` in the constructor automatically assigns the arguments to class properties.

---

## Listening to Host Events Using `@HostListener`

We want to zoom in the product when hovered and zoom out when the mouse moves away.

### Step 1: Define Event Handler Methods

```ts
onMouseEnter() {
  this.renderer.addClass(this.element.nativeElement, 'highlight-product');
}

onMouseOut() {
  this.renderer.removeClass(this.element.nativeElement, 'highlight-product');
}
```

### Step 2: Attach `@HostListener` Decorators

```ts
@HostListener('mouseenter') onMouseEnter() {
  this.renderer.addClass(this.element.nativeElement, 'highlight-product');
}

@HostListener('mouseleave') onMouseOut() {
  this.renderer.removeClass(this.element.nativeElement, 'highlight-product');
}
```

#### Explanation:

- `@HostListener('mouseenter')` → Triggers `onMouseEnter` when the mouse enters the element.
- `@HostListener('mouseleave')` → Triggers `onMouseOut` when the mouse leaves the element.

---

## Applying Styles

### Step 1: Define CSS for Zoom Effect

In `product.component.css`, add the following styles:

```css
.highlight-product {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
}
```

### Step 2: Ensure CSS is in the Correct Component

Initially, if the CSS is placed inside `app.component.css`, it won’t apply correctly due to Angular's **view encapsulation**. It must be moved to `product.component.css`.

---

## Final Code for `highlight.directive.ts`

```ts
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.element.nativeElement, 'highlight-product');
  }

  @HostListener('mouseleave') onMouseOut() {
    this.renderer.removeClass(this.element.nativeElement, 'highlight-product');
  }
}
```

---

## Summary

- `@HostListener` listens for DOM events on the host element.
- The directive is applied using `[appHighlight]`.
- We use `ElementRef` and `Renderer2` to interact with the DOM safely.
- `mouseenter` event triggers zoom-in, and `mouseleave` triggers zoom-out.
- The CSS must be placed inside `product.component.css` for correct styling.

Using `@HostListener`, we efficiently listen to DOM events and manipulate elements in Angular.

---

## Conclusion

This directive demonstrates how to create a simple **hover effect** using `@HostListener`. It is a powerful feature in Angular that allows handling events in a structured and reusable way within directives.

---

## Additional Notes

- `Renderer2` is preferred over direct DOM manipulation for better performance and security.
- `@HostListener` can listen to any valid DOM event (e.g., `click`, `scroll`, `keyup`).
- You can pass event data to `@HostListener` methods using `$event`.

Example:

```ts
@HostListener('document:keydown', ['$event']) handleKeydown(event: KeyboardEvent) {
  console.log(`Key pressed: ${event.key}`);
}
```

This directive approach makes UI behaviors reusable across multiple components in Angular applications.

Here's the detailed `.md` file based on the transcript, covering every detail with additional explanations where necessary.

---

It looks like you've got an error due to using `this.renderer.addClass` before initializing the directive properly. Try checking whether `this.element` and `this.renderer` are correctly initialized before calling them.

Here’s a structured way to debug and fix it:

1. **Ensure Directive is Declared in the Module**

   - Check if your `HighlightDirective` is correctly declared inside `app.module.ts` or any feature module.

2. **Verify That ElementRef and Renderer2 are Injected Properly**

   ```ts
   constructor(private element: ElementRef, private renderer: Renderer2) {
     console.log("ElementRef:", this.element);
     console.log("Renderer2:", this.renderer);
   }
   ```

   - Add these logs to see if `ElementRef` and `Renderer2` are correctly injected.

3. **Check if ElementRef is Available Before Using Renderer**

   ```ts
   @HostListener('mouseenter') onMouseEnter() {
     if (this.element && this.renderer) {
       this.renderer.addClass(this.element.nativeElement, 'highlight-product');
     } else {
       console.error("ElementRef or Renderer2 is not initialized properly.");
     }
   }
   ```

   - This prevents calling methods on undefined objects.

4. **Verify the Directive is Being Applied**
   - Ensure that your directive is used in a valid element within a template:
   ```html
   <div appHighlight>Hover over me</div>
   ```
   - If you applied it incorrectly (e.g., `*appHighlight`), it won’t work.

Try these steps and let me know if you're still facing issues! 🚀
