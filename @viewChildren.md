### @ViewChildren Decorator in Angular :

### **ViewChildren Decorator & QueryList in Angular**

In Angular, the `@ViewChildren` decorator and the `QueryList` class are powerful tools that allow us to query and interact with multiple child components or elements inside a component's template.

---

## **1. Understanding `@ViewChildren`**

The `@ViewChildren` decorator is used to get references to multiple child components or DOM elements that match a given selector. It returns a `QueryList` that contains all the queried elements or components.

### **How `@ViewChildren` Works**

- It queries elements **inside the component’s view (template)**.
- It is **resolved after the view initializes**, meaning we can access the queried elements **in `ngAfterViewInit()` lifecycle hook**.
- It **returns a `QueryList`**, which is a dynamic list that updates when the view changes.

---

## **2. Understanding `QueryList`**

A `QueryList` is a special class that acts like an array but is dynamically updated when the Angular view changes. It provides methods to interact with the queried elements, such as:

- `.length`: Get the number of items.
- `.toArray()`: Convert the `QueryList` into a standard array.
- `.map()`, `.forEach()`: Iterate over the elements.
- `.changes`: Observable that emits when the list of items changes.

---

## **3. Example of `@ViewChildren` and `QueryList`**

### **Scenario:** Let's say we have multiple `<p>` elements in a component, and we want to manipulate them.

### **Step 1: Create the Component**

```typescript
import { Component, ViewChildren, QueryList, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <p #paragraph>First Paragraph</p>
    <p #paragraph>Second Paragraph</p>
    <p #paragraph>Third Paragraph</p>
    <button (click)="changeText()">Change Text</button>
  `,
})
export class ExampleComponent implements AfterViewInit {
  @ViewChildren('paragraph') paragraphs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    console.log('Number of paragraphs:', this.paragraphs.length);
    this.paragraphs.forEach((p, index) => {
      console.log(`Paragraph ${index + 1} text:`, p.nativeElement.innerText);
    });
  }

  changeText() {
    this.paragraphs.forEach((p, index) => {
      p.nativeElement.innerText = `Updated Paragraph ${index + 1}`;
    });
  }
}
```

### **Explanation:**

1. `@ViewChildren('paragraph')` queries all `<p>` elements with the `#paragraph` reference.
2. The `paragraphs` variable is a `QueryList` of `ElementRef` objects, where each `ElementRef` represents a paragraph element.
3. In `ngAfterViewInit()`, we:
   - Log the total number of paragraphs.
   - Iterate over the `QueryList` and print the text of each paragraph.
4. The `changeText()` method updates the text content of each paragraph.

---

## **4. Using `@ViewChildren` with Child Components**

Now, let's see how we can use `@ViewChildren` to interact with multiple child components.

### **Step 1: Create a Child Component**

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>{{ message }}</p>`,
})
export class ChildComponent {
  @Input() message: string = 'Default message';
  changeMessage(newMessage: string) {
    this.message = newMessage;
  }
}
```

### **Step 2: Use `@ViewChildren` in Parent Component**

```typescript
import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <app-child *ngFor="let msg of messages" [message]="msg"></app-child>
    <button (click)="updateChildren()">Update Messages</button>
  `,
})
export class ParentComponent implements AfterViewInit {
  messages = ['Hello', 'Angular', 'ViewChildren'];

  @ViewChildren(ChildComponent) children!: QueryList<ChildComponent>;

  ngAfterViewInit() {
    console.log('Number of child components:', this.children.length);
  }

  updateChildren() {
    this.children.forEach((child, index) => {
      child.changeMessage(`Updated Message ${index + 1}`);
    });
  }
}
```

### **Explanation:**

1. We create multiple `app-child` components using `*ngFor`.
2. `@ViewChildren(ChildComponent)` gets references to all `app-child` components.
3. The `updateChildren()` method updates the message inside each child component.

---

## **5. Lifecycle of `@ViewChildren`**

- **`@ViewChildren` is not available in `ngOnInit()`** because the view has not been initialized yet.
- The best place to use it is inside `ngAfterViewInit()`, since the view and its children are fully initialized.

---

## **6. `@ViewChildren` vs `@ContentChildren`**

| Feature                           | `@ViewChildren`                                                  | `@ContentChildren`                                 |
| --------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------- |
| Queries elements/components in... | The component’s own template                                     | Content projected using `<ng-content>`             |
| Available in                      | `ngAfterViewInit()`                                              | `ngAfterContentInit()`                             |
| Use case                          | Accessing child elements or components inside a component’s view | Accessing projected content from another component |

---

## **7. Summary**

- `@ViewChildren` is used to query multiple elements or components inside a component’s template.
- It returns a `QueryList`, which dynamically updates when the view changes.
- Use `ngAfterViewInit()` to safely access the queried elements.
- `QueryList` provides methods like `.length`, `.forEach()`, `.changes`, etc.
- `@ViewChildren` is different from `@ContentChildren`, which is used for projected content.

This decorator is useful when working with multiple child components or elements dynamically. 🚀

### Scope :

### **Scope of `@ViewChildren` Decorator in Angular**

The `@ViewChildren` decorator has a specific scope and behavior that defines where and how it can be used. Let's explore its scope in detail:

---

## **1. Scope of `@ViewChildren`**

The `@ViewChildren` decorator is **limited to querying elements and components within the view (template) of the component where it is declared**. It **cannot access content projected using `<ng-content>`**, and it is only available after the view has been initialized.

### **Scope Breakdown:**

| Scope Aspect          | `@ViewChildren` Behavior                                                                |
| --------------------- | --------------------------------------------------------------------------------------- |
| **View Hierarchy**    | Queries elements/components inside the current component's view.                        |
| **Projected Content** | Cannot access elements projected using `<ng-content>` (use `@ContentChildren` instead). |
| **Availability**      | Available only after the view is initialized (`ngAfterViewInit()`).                     |
| **Dynamic Updates**   | Updates automatically when the queried elements change.                                 |

---

## **2. View Scope of `@ViewChildren`**

`@ViewChildren` is **limited to the component’s own template**. It **cannot access child components' internal templates** or elements added through content projection.

### **Example: `@ViewChildren` Inside a Component's Own Template**

```typescript
import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <p #para>First Paragraph</p>
    <p #para>Second Paragraph</p>
    <p #para>Third Paragraph</p>
  `,
})
export class ExampleComponent implements AfterViewInit {
  @ViewChildren('para') paragraphs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    console.log('Number of paragraphs:', this.paragraphs.length); // Works correctly
  }
}
```

✅ **This works because the `<p>` elements are inside the template of `ExampleComponent`.**

---

## **3. `@ViewChildren` Cannot Access Projected Content**

If an element is projected into a component using `<ng-content>`, `@ViewChildren` **will not detect it**. Instead, you should use `@ContentChildren`.

### **Example: When `@ViewChildren` Does NOT Work**

```typescript
@Component({
  selector: 'app-wrapper',
  template: `<ng-content></ng-content>`, // Projects content
})
export class WrapperComponent {
  @ViewChildren('content') projectedContent!: QueryList<ElementRef>; // ❌ Won't work!
}

@Component({
  selector: 'app-root',
  template: `
    <app-wrapper>
      <p #content>Projected Paragraph</p>
    </app-wrapper>
  `,
})
export class AppComponent {}
```

🚫 `@ViewChildren('content')` inside `WrapperComponent` **will not find `<p>`** because it's projected content.  
✅ Instead, use `@ContentChildren`.

---

## **4. `@ViewChildren` Works Only After View Initialization**

Since `@ViewChildren` queries elements inside the view, it is **not available in `ngOnInit()`**.  
It becomes available in **`ngAfterViewInit()`**, when the view is fully initialized.

### **Example: Correct Lifecycle Hook Usage**

```typescript
ngOnInit() {
  console.log(this.paragraphs.length); // ❌ Will not work (QueryList not populated)
}

ngAfterViewInit() {
  console.log(this.paragraphs.length); // ✅ Works correctly
}
```

---

## **5. Dynamic Scope of `@ViewChildren`**

The `QueryList` returned by `@ViewChildren` is **dynamically updated** when elements are added or removed from the view.

### **Example: Adding Elements Dynamically**

```typescript
@Component({
  selector: 'app-dynamic',
  template: `
    <p #para *ngFor="let item of items">{{ item }}</p>
    <button (click)="addItem()">Add Item</button>
  `,
})
export class DynamicComponent implements AfterViewInit {
  items = ['Item 1', 'Item 2'];

  @ViewChildren('para') paragraphs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.paragraphs.changes.subscribe(() => {
      console.log('Paragraphs updated:', this.paragraphs.length);
    });
  }

  addItem() {
    this.items.push(`Item ${this.items.length + 1}`);
  }
}
```

✅ The `QueryList` updates automatically when the list of `<p>` elements changes.

---

## **6. Summary**

- `@ViewChildren` **queries elements/components inside the component’s own template**.
- It **does not work with projected content** (`<ng-content>`), for which `@ContentChildren` should be used.
- It is **only available after the view initializes (`ngAfterViewInit()`)**.
- The `QueryList` returned by `@ViewChildren` **dynamically updates when the view changes**.

Understanding its scope helps in efficiently querying and manipulating child elements within a component’s template. 🚀
