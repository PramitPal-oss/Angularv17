# Property Binding vs @HostBinding | Creating & Using Custom Directive

## Introduction

In the last couple of lectures, we learned about `@HostBinding` and `@HostListener`, including when and how to use them in a directive. Before proceeding further, it's important to understand the difference between property binding in components and `@HostBinding` in directives. Similarly, we also need to differentiate between event binding in components and `@HostListener` in directives.

This document explains these differences with an example, covering all the minute details necessary for a deep understanding.

---

## Setting Up the Example

To demonstrate these concepts, we created a brand new Angular project. Inside this project, we added the following components and directives:

### Components and Directives

1. **Demo Component** (`demo.component.ts` & `demo.component.html`)
2. **App Component** (`app.component.ts` & `app.component.html`)
3. **Sample Directive** (`sample.directive.ts`)

### Structure Overview

- The **Demo Component** contains an input field and a button.
- The **App Component** renders the Demo Component.
- The **Sample Directive** is a custom directive created inside the `custom-directives` folder.

Now, let's go into the details.

---

## Property Binding in Components vs. @HostBinding in Directives

### Property Binding in Components

#### Step 1: Define a Property in the Component

In `demo.component.ts`, we define a property named `textValue`:

```typescript
export class DemoComponent {
  textValue: string = 'Hello World';
}
```

#### Step 2: Bind the Property to the Input Element

In `demo.component.html`, bind the `textValue` property to the `value` property of the input element:

```html
<input type="text" [value]="textValue" />
```

#### Step 3: Check the Output

On running the application, the input field displays `Hello World`, proving that property binding in a component works by binding component properties directly to DOM properties.

### @HostBinding in Directives

#### Step 1: Define a Property in the Directive

In `sample.directive.ts`, define a property named `inputValue`:

```typescript
export class SampleDirective {
  inputValue: string = 'Hi There';
}
```

#### Step 2: Use the Directive in the Input Element

Modify `demo.component.html` to use the directive:

```html
<input type="text" appSample />
```

#### Step 3: Apply `@HostBinding`

We cannot directly bind `inputValue` to the `value` property of the input field. Instead, we use `@HostBinding` to bind the directive's property to the host element’s `value` property.

Modify `sample.directive.ts`:

```typescript
import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appSample]',
})
export class SampleDirective {
  @HostBinding('value') inputValue: string = 'Hi There';
}
```

Now, when the app runs, the input field displays `Hi There` instead of `Hello World`. This proves that `@HostBinding` allows a directive to bind its property to the host element’s property.

---

## Event Binding in Components vs. @HostListener in Directives

### Event Binding in Components

#### Step 1: Bind the Event in `demo.component.html`

```html
<input type="text" [value]="textValue" (focus)="logValue()" />
```

#### Step 2: Define the Method in `demo.component.ts`

```typescript
export class DemoComponent {
  textValue: string = 'Hello World';

  logValue() {
    console.log('Input has been focused');
  }
}
```

#### Step 3: Check the Output

Whenever the input field gains focus, `logValue()` executes and logs `Input has been focused` to the console.

### @HostListener in Directives

#### Step 1: Remove the Event Binding from `demo.component.html`

We will now handle the focus event in the directive instead of the component. Remove the event binding from `demo.component.html`:

```html
<input type="text" appSample />
```

#### Step 2: Use `@HostListener` in `sample.directive.ts`

```typescript
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSample]',
})
export class SampleDirective {
  @HostListener('focus') logMessage() {
    console.log('Input has been focused from Sample Directive');
  }
}
```

#### Step 3: Check the Output

When the input field gains focus, it logs `Input has been focused from Sample Directive`. This shows that `@HostListener` enables directives to listen to events on the host element.

---

## Summary of Differences

| Feature              | Component                                             | Directive                                   |
| -------------------- | ----------------------------------------------------- | ------------------------------------------- |
| **Property Binding** | `input [value]="textValue"`                           | `@HostBinding('value') inputValue: string;` |
| **Event Binding**    | `input (focus)="logValue()"`                          | `@HostListener('focus') logMessage()`       |
| **Usage**            | Direct binding in the template                        | Binding inside the directive class          |
| **Scope**            | Works with the component’s own properties and methods | Works with the directive’s host element     |

---

## Conclusion

Understanding `@HostBinding` and `@HostListener` is crucial when working with Angular directives. Here are the key takeaways:

1. **Property Binding in Components**: Uses square brackets (`[property]="value"`) to bind component properties to DOM properties.
2. **@HostBinding in Directives**: Allows a directive to bind its own properties to the host element’s properties.
3. **Event Binding in Components**: Uses parentheses (`(event)="handler()"`) to handle events inside the component.
4. **@HostListener in Directives**: Allows a directive to listen for events happening on the host element and execute its logic accordingly.

This knowledge is essential for working with custom directives and understanding how they interact with their host elements. By mastering these concepts, you can create more flexible and reusable Angular components.

---

## Additional Notes

- Beginners often get confused about when to use property binding and `@HostBinding`, as well as event binding and `@HostListener`. This guide clarifies these concepts with practical examples.
- **Best Practice**: Use `@HostBinding` and `@HostListener` in directives when you need to manipulate the host element’s properties or listen to its events.
- **Further Learning**: Explore Angular’s official documentation to see more advanced use cases.

If you have any questions, feel free to ask!

**Thank you for reading, and happy coding!** 🚀
