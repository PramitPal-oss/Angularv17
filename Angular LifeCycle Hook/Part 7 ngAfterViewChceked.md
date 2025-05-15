Of course! Here’s the `.md` version of the **`ngAfterViewChecked` Angular Lifecycle Hook** lecture you shared, converted into a **detailed note** format:

---

# Angular Lifecycle Hook: `ngAfterViewChecked`

---

## Overview

In this lecture, we are going to deeply understand the `ngAfterViewChecked` lifecycle hook in Angular.  
This hook plays a crucial role in Angular's change detection cycle related to the component's view and its child views.

---

## When is `ngAfterViewChecked` Called?

- **Order:**  
  It gets called **after** `ngAfterViewInit`.
- **Frequency:**
  - Called **once** during the **first** change detection cycle (after `ngAfterViewInit` has been executed).
  - **Subsequently**, it is called **during every change detection cycle**, even if the view hasn't changed.
- **Context:**
  - Angular **updates** the component's **view** and **child views** before calling `ngAfterViewChecked`.
  - It is **very similar** to `ngAfterViewInit` but differs in terms of repeated calls.
- **Decorators:**
  - Angular **updates** the properties decorated with `@ViewChild` and `@ViewChildren` **before** calling `ngAfterViewChecked`.
- **Scope:**
  - **Component-only hook.**
  - **Not available** for **directives**.

---

## Implementing `ngAfterViewChecked`

### Basic Steps:

1. **Import** the `AfterViewChecked` interface from `@angular/core`.
2. **Implement** the `AfterViewChecked` interface in your component.
3. **Define** the `ngAfterViewChecked()` method inside your component.

```typescript
import { AfterViewChecked } from '@angular/core';

export class DemoComponent implements AfterViewChecked {
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked hook called');
  }
}
```

---

## Behavior Walkthrough

- **Initial Render:**  
  When the component is initialized for the first time:

  - `ngAfterViewInit()` is called.
  - **Then**, `ngAfterViewChecked()` is called.

- **Subsequent Updates:**  
  Whenever:
  - The **view or child views change**,
  - OR **any change detection cycle** is triggered (even if **no view changes**),  
    → `ngAfterViewChecked()` is called again.

---

## Example: View Change Trigger

In the component's template:

```html
<p>{{ message }}</p>
<input (focus)="onFocus()" />
<button (click)="submit()">Submit</button>
```

When:

- The `message` property changes on submit,
- OR the input gains focus (even without view change),

`ngAfterViewChecked()` will be triggered because Angular runs a **change detection cycle**.

---

### Important Observations

- Changing the input focus (i.e., triggering focus event) also triggers a **change detection cycle**, even if the view has **not** changed.
- Each change detection cycle calls `ngAfterViewChecked()`.

---

## Accessing Updated `@ViewChild` References

Inside `ngAfterViewChecked`, you can safely access **updated values** from properties decorated with `@ViewChild`.

Example:

```typescript
@ViewChild('tempPara') tempPara!: ElementRef;

ngAfterViewChecked(): void {
  console.log(this.tempPara.nativeElement.textContent);
}
```

- The `textContent` will log the **current** inner text of the paragraph.
- Useful for operations that require access to the **updated** DOM.

---

## Lifecycle Hook Call Order

When components have child components:

- Angular calls all the **lifecycle hooks** of the **child components first**, before calling the parent's lifecycle hooks.

Example of the sequence:

```plaintext
Constructor of AppComponent
Constructor of DemoComponent (Child)
ngOnChanges (Child)
ngOnInit (Child)
ngDoCheck (Child)
ngAfterContentInit (Child)
ngAfterContentChecked (Child)
ngAfterViewInit (Child)
ngAfterViewChecked (Child)
ngAfterViewInit (Parent)
ngAfterViewChecked (Parent)
```

- **Conclusion:**
  - **Child component's** lifecycle hooks are **executed first**.
  - **Then** the **parent component's** hooks like `ngAfterViewInit` and `ngAfterViewChecked` are called.

---

## Difference Between `ngDoCheck`, `ngAfterContentChecked`, and `ngAfterViewChecked`

All three hooks **run during every change detection cycle**, but they serve different purposes:

| Lifecycle Hook          | Purpose                                                                                                                                                                            |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ngDoCheck`             | - Called **during every change detection cycle**.<br>- Detects **any** changes on **any** element or content.<br>- Runs **even before** views are initialized.                     |
| `ngAfterContentChecked` | - Called **after projected content** has been **initialized**.<br>- Only after **content projection** (ng-content) is done.<br>- Cannot access projected content before this hook. |
| `ngAfterViewChecked`    | - Called **after the component’s view and its child views** are **initialized and checked**.<br>- Useful for comparing **current view vs previous view**.                          |

### Important Points:

- **ngDoCheck:**
  - Happens very early.
  - By this time, **view templates and projected contents** are **not fully initialized**.
- **ngAfterContentChecked:**
  - Only useful for **projected content**.
- **ngAfterViewChecked:**
  - Only useful for **view templates** (component’s own view + child views).

---

## Additional Notes

- If you need to **compare previous and current states**:

  - Use `ngAfterContentChecked` for projected content.
  - Use `ngAfterViewChecked` for component and child views.

- If you try to access updated views/content inside `ngDoCheck`, it **will not work correctly** because initialization isn't guaranteed yet.

---

## Conclusion

- `ngAfterViewChecked` is crucial for actions dependent on **rendered views** and **child views**.
- It ensures:
  - Access to updated `@ViewChild` and `@ViewChildren` properties.
  - Safe DOM interactions after every change detection.
- Be cautious: since it's called **every change detection cycle**, avoid **heavy operations** inside this hook to prevent **performance issues**.

---

# Summary

| Feature       | Details                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------- |
| When Called   | After component's and child components' views are initialized/updated.                       |
| How Often     | Every change detection cycle after `ngAfterViewInit`.                                        |
| Use Case      | Access updated DOM elements, compare view states.                                            |
| Applicable To | Components only (not directives).                                                            |
| Special Notes | Updated `@ViewChild` and `@ViewChildren` references are available before this hook is fired. |

---

> If you still have any doubts or want a visual diagram of the Angular lifecycle sequence, feel free to ask!

---

Would you also like me to create a **diagram** summarizing the Angular lifecycle hooks with special focus on `ngAfterViewChecked`? 🌟  
(Visuals can help a lot in remembering the sequence easily!) 🚀
