# Renderer2 in Angular | Creating & Using Custom Directive

## Introduction

In the last lecture, we learned how to create a custom attribute directive in Angular. We created a directive called `SetBackground`, which applies styles to an element. This directive changes the background color to **gray** and the text color to **white**.

However, in this lecture, we will learn a better way to manipulate the DOM using **Renderer2** instead of accessing the native DOM elements directly.

---

## Creating a Custom Attribute Directive

### Steps for Creating `SetBackground` Directive

1. **Define the directive**: We created a directive named `SetBackground`.
2. **Specify the selector**: The selector for this directive is `[setBackground]`, which makes it an **attribute directive**.
3. **Get a reference to the host element**:
   - We use `ElementRef` to get a reference to the HTML element on which we apply the directive.
   - Using `ElementRef.nativeElement`, we access the DOM directly to manipulate styles.

#### Example Code (Direct DOM Manipulation - Not Recommended)

```typescript
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[setBackground]',
})
export class SetBackgroundDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.style.backgroundColor = 'gray';
    this.element.nativeElement.style.color = 'white';
  }
}
```

---

## Why Direct DOM Manipulation is Not Recommended

Accessing the DOM directly using `ElementRef.nativeElement` is **not recommended** for several reasons:

1. **Bypasses Angular’s Change Detection Mechanism**

   - Angular manages UI updates using **templates, data binding, and change detection**.
   - Direct DOM access **skips these mechanisms**, potentially causing inconsistencies.

2. **Limited Cross-Platform Compatibility**

   - Direct DOM manipulation works **only in browsers**.
   - It will not work in **Web Workers**, **Server-Side Rendering (SSR)**, or **Mobile/Desktop applications** where there's no actual browser DOM.

3. **Security Vulnerabilities (XSS Attacks)**
   - The DOM APIs **do not sanitize input data**, making them vulnerable to **Cross-Site Scripting (XSS) attacks**.
   - Directly injecting unsanitized user input could lead to security exploits.

---

## Introducing Renderer2

To overcome the drawbacks of direct DOM access, Angular provides **Renderer2**, which provides an abstraction layer for DOM manipulation. This approach ensures better security, cross-platform support, and proper change detection.

### How to Use Renderer2 in a Custom Directive

#### Step 1: Inject Renderer2 in Constructor

```typescript
import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[setBackground]',
})
export class SetBackgroundDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', 'gray');
    this.renderer.setStyle(this.element.nativeElement, 'color', 'white');
  }
}
```

### Explanation

1. **Injected Renderer2 in the constructor**:
   - `private renderer: Renderer2` allows us to use Angular’s DOM manipulation methods.
2. **Used `setStyle()` method**:
   - `this.renderer.setStyle(element, property, value)` applies styles safely.

---

## Benefits of Renderer2

1. **Ensures Cross-Platform Compatibility**

   - Works on **browsers, web workers, mobile, desktop, and server-side rendering (SSR)**.

2. **Maintains Security**

   - Prevents direct DOM access, reducing the risk of **XSS (Cross-Site Scripting) attacks**.

3. **Keeps Angular’s Change Detection Intact**

   - Angular still tracks changes, ensuring smooth UI updates.

4. **Encapsulation of DOM Operations**
   - Provides various helper methods like `setStyle`, `removeStyle`, `addClass`, `removeClass`, `setAttribute`, etc.

---

## Additional Renderer2 Methods

### 1. `setAttribute()`

Used to dynamically set an HTML attribute.

```typescript
this.renderer.setAttribute(this.element.nativeElement, 'title', 'This is an example title');
```

✅ Adds a tooltip to the element when hovered over.

### 2. `addClass()` and `removeClass()`

Used to **add** or **remove** CSS classes dynamically.

```typescript
this.renderer.addClass(this.element.nativeElement, 'highlight');
this.renderer.removeClass(this.element.nativeElement, 'highlight');
```

✅ Useful for toggling styles dynamically based on conditions.

### 3. `appendChild()`

Used to dynamically add an element as a child.

```typescript
const newElement = this.renderer.createElement('span');
const text = this.renderer.createText('Hello World');
this.renderer.appendChild(newElement, text);
this.renderer.appendChild(this.element.nativeElement, newElement);
```

✅ Creates a new `<span>` element with text **Hello World** and appends it to the host element.

### 4. `createElement()` and `createText()`

Used to dynamically create elements and text nodes.

```typescript
const div = this.renderer.createElement('div');
const text = this.renderer.createText('This is dynamic content');
this.renderer.appendChild(div, text);
this.renderer.appendChild(this.element.nativeElement, div);
```

✅ Dynamically creates a `<div>` element and appends text inside it.

### 5. `removeChild()`

Used to remove an element from the DOM.

```typescript
this.renderer.removeChild(this.element.nativeElement, div);
```

✅ Removes a child element from the parent.

---

## Summary

| Feature                  | Direct DOM Access (`ElementRef`) | Renderer2         |
| ------------------------ | -------------------------------- | ----------------- |
| Cross-platform support   | ❌ No                            | ✅ Yes            |
| Security (XSS attacks)   | ❌ Vulnerable                    | ✅ Secure         |
| Angular Change Detection | ❌ Bypassed                      | ✅ Works normally |
| Recommended Practice     | ❌ No                            | ✅ Yes            |

---

## Conclusion

- Direct DOM access (`ElementRef.nativeElement`) **should be avoided**.
- **Renderer2** provides an **abstraction layer** for safer and more efficient DOM manipulations.
- It allows for **better security, cross-platform support, and integration with Angular’s change detection**.
- Use methods like **`setStyle()`, `addClass()`, `setAttribute()`, and `createElement()`** instead of modifying the DOM directly.

Renderer2 is a **powerful tool** for manipulating the DOM while ensuring best practices in Angular development.

---

### Further Reading

- [Angular Official Documentation - Renderer2](https://angular.io/api/core/Renderer2)
- [Angular Directives](https://angular.io/guide/attribute-directives)

If you have any questions, feel free to ask!

---

Thank you for reading, and happy coding! 🚀
