### @viewchild decorator in Angular

### **What is `@ViewChild` in Angular?**

The `@ViewChild` decorator in Angular is used to get a reference to a child component, directive, or DOM element inside a parent component. This allows us to access and manipulate the child element/component programmatically.

#### **Why do we use `@ViewChild`?**

1. **Access Child Component Methods and Properties** – Useful when we need to call a method or update a property of a child component from the parent.
2. **Access Native DOM Elements** – Useful when we need to manipulate native HTML elements directly (not recommended unless necessary).
3. **Access Directives** – Useful when we want to interact with a directive applied to an element.
4. **Performance Optimization** – Reduces reliance on Angular's event binding, which can sometimes be costly.

---

## **How does `@ViewChild` Work?**

- `@ViewChild` gets a reference to a single instance of a component, directive, or element.
- It retrieves the first matching element inside the component’s template.
- By default, `@ViewChild` is **only available after the `ngAfterViewInit()` lifecycle hook** because the child component or element is not available during `ngOnInit()`.

---

## **Basic Syntax**

```typescript
@ViewChild(selector: Type | string, options?: {static?: boolean, read?: any})
```

### **Explanation of Parameters:**

1. **selector:** The name of the component, directive, or template reference variable.
2. **options (optional):**
   - **static (boolean)**: Defines when the reference is set.
     - `true` → Available in `ngOnInit()`
     - `false` → Available only in `ngAfterViewInit()`
   - **read (Type)**: Specifies what to read (component instance, directive, or ElementRef).

---

## **Example 1: Accessing Child Component Methods Using `@ViewChild`**

### **Child Component (`child.component.ts`)**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<h2>Child Component</h2>`,
})
export class ChildComponent {
  sayHello() {
    return 'Hello from Child Component!';
  }
}
```

---

### **Parent Component (`parent.component.ts`)**

```typescript
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <app-child></app-child>
    <button (click)="callChildMethod()">Call Child Method</button>
  `,
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) child!: ChildComponent;

  ngAfterViewInit() {
    console.log(this.child.sayHello()); // "Hello from Child Component!"
  }

  callChildMethod() {
    alert(this.child.sayHello());
  }
}
```

### **How It Works:**

- `@ViewChild(ChildComponent)` gets the reference of `ChildComponent` inside the parent.
- `ngAfterViewInit()` is used because `ViewChild` is not available in `ngOnInit()`.
- Clicking the button calls the child component’s `sayHello()` method.

---

## **Example 2: Accessing a DOM Element Using `@ViewChild`**

```typescript
import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <h2 #heading>Change My Color</h2>
    <button (click)="changeColor()">Change Color</button>
  `,
})
export class ExampleComponent implements AfterViewInit {
  @ViewChild('heading') heading!: ElementRef;

  ngAfterViewInit() {
    console.log(this.heading.nativeElement.innerText); // "Change My Color"
  }

  changeColor() {
    this.heading.nativeElement.style.color = 'red';
  }
}
```

### **Explanation:**

- `@ViewChild('heading')` selects the `h2` element using the template reference variable (`#heading`).
- `ElementRef` provides direct access to the native DOM element.
- The `changeColor()` method modifies the element’s style dynamically.

---

## **Static vs Dynamic ViewChild (`static: true` vs `static: false`)**

The `static` property determines **when the ViewChild reference is resolved**.

| `static: true`                                                  | `static: false` (default)                                  |
| --------------------------------------------------------------- | ---------------------------------------------------------- |
| Resolved in `ngOnInit()`                                        | Resolved in `ngAfterViewInit()`                            |
| Used when accessing elements that **do not change dynamically** | Used when accessing elements that might change dynamically |
| Slower performance (creates reference early)                    | More optimized (creates reference when needed)             |

### **Example**

```typescript
@ViewChild('myDiv', { static: true }) myDiv!: ElementRef;
```

- `static: true` → Accessible in `ngOnInit()`
- `static: false` → Accessible only in `ngAfterViewInit()`

---

## **`@ViewChildren` – Query Multiple Elements**

If we want to select **multiple instances** of a component, directive, or element, we use `@ViewChildren`.

### **Example: Accessing Multiple Child Components**

```typescript
import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <app-child></app-child>
    <app-child></app-child>
    <app-child></app-child>
    <button (click)="showMessages()">Show Messages</button>
  `,
})
export class ParentComponent implements AfterViewInit {
  @ViewChildren(ChildComponent) children!: QueryList<ChildComponent>;

  ngAfterViewInit() {
    console.log(this.children.length); // Output: 3 (since we have 3 child components)
  }

  showMessages() {
    this.children.forEach((child) => {
      console.log(child.sayHello());
    });
  }
}
```

### **Explanation:**

- `@ViewChildren(ChildComponent)` returns a `QueryList` containing multiple child component instances.
- `QueryList` is an iterable list that allows us to loop over the child components.
- `forEach()` is used to iterate through each child component and call `sayHello()`.

---

## **`read` Property in View Queries**

The `read` property allows us to read a **specific type** from an element.

### **Example: Read `ElementRef` Instead of Component Instance**

```typescript
@ViewChild(ChildComponent, { read: ElementRef }) childElement!: ElementRef;
```

- Instead of getting a reference to `ChildComponent`, we get a reference to the `ElementRef` of the child component’s root element.

---

## **Summary**

- `@ViewChild` is used to access a **single** child component, directive, or DOM element.
- `@ViewChildren` is used to access **multiple** instances of a component or directive.
- `static: true` makes the reference available in `ngOnInit()`, while `static: false` (default) makes it available in `ngAfterViewInit()`.
- `ElementRef` allows us to directly manipulate native DOM elements.
- The `read` property lets us extract a specific type instead of the default reference.

---

Would you like a practical use case or further examples? 🚀

### Read property and Scope :

## **`read` Property in View Queries (Detailed Explanation)**

The `read` property in `@ViewChild` or `@ViewChildren` allows us to specify **what type of reference** we want to retrieve from a queried element. By default, `@ViewChild` will return a reference to a component, directive, or template. However, sometimes we need access to other properties like the **native DOM element** (`ElementRef`), a **directive instance**, or the **ViewContainerRef**. The `read` property helps in such scenarios.

---

### **1️⃣ `read: ElementRef` (Accessing Native DOM Element Instead of Component)**

By default, if we query a component, Angular gives us a reference to the component instance. But if we only need access to its native DOM element (without its logic), we use `read: ElementRef`.

### **Example: Getting the Native DOM Element Instead of Component**

#### **Child Component**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>Child Component</p>`,
})
export class ChildComponent {}
```

#### **Parent Component**

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <app-child></app-child>
    <button (click)="changeColor()">Change Child Color</button>
  `,
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent, { read: ElementRef }) childElement!: ElementRef;

  ngAfterViewInit() {
    console.log(this.childElement.nativeElement); // Logs the <app-child> HTML element
  }

  changeColor() {
    this.childElement.nativeElement.style.backgroundColor = 'lightblue';
  }
}
```

### **Explanation:**

- Without `read: ElementRef`, `@ViewChild(ChildComponent)` would return the instance of `ChildComponent`.
- With `read: ElementRef`, it instead returns a reference to the **native DOM element** (`<app-child>`) so that we can manipulate its styles directly.

---

### **2️⃣ `read: ViewContainerRef` (Dynamic Component Manipulation)**

If we want to dynamically create components inside an element, we use `ViewContainerRef`. By default, `@ViewChild` gives us a component or directive reference, but if we need to load a component dynamically inside an element, we use `read: ViewContainerRef`.

### **Example: Loading a Component Dynamically**

```typescript
import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `<ng-container #container></ng-container> <button (click)="loadChild()">Load Child</button>`,
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('container', { read: ViewContainerRef }) container!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngAfterViewInit() {}

  loadChild() {
    const factory = this.resolver.resolveComponentFactory(ChildComponent);
    this.container.createComponent(factory);
  }
}
```

### **Explanation:**

- `ViewContainerRef` gives us the ability to dynamically **create** components inside the queried element (`<ng-container>` in this case).
- Without `read: ViewContainerRef`, `@ViewChild('container')` would return a `TemplateRef`, which wouldn't allow component insertion.

---

### **3️⃣ `read: TemplateRef` (Accessing `ng-template`)**

If we query an `ng-template`, Angular usually gives us a `TemplateRef`, which allows us to render it manually.

### **Example: Rendering an `ng-template` Manually**

```typescript
import { Component, ViewChild, TemplateRef, ViewContainerRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <ng-template #myTemplate>
      <p>This is a dynamically loaded template!</p>
    </ng-template>
    <button (click)="showTemplate()">Show Template</button>
  `,
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('myTemplate', { read: TemplateRef }) template!: TemplateRef<any>;
  @ViewChild('myTemplate', { read: ViewContainerRef }) viewContainer!: ViewContainerRef;

  ngAfterViewInit() {}

  showTemplate() {
    this.viewContainer.createEmbeddedView(this.template);
  }
}
```

### **Explanation:**

- `TemplateRef` allows us to reference an `ng-template`.
- `ViewContainerRef` allows us to insert it dynamically into the DOM.

---

## **Scope of `@ViewChild` Decorator**

The scope of `@ViewChild` determines **where and when it can be accessed**.

### **1️⃣ Available Only Within the Same Component**

`@ViewChild` **only works within the component where it is declared**. It **cannot be accessed** from another component.

```typescript
@ViewChild('someElement') someElement!: ElementRef;
```

- The `someElement` reference is **only available inside this component class**.

---

### **2️⃣ Available Only After the View is Initialized**

- `@ViewChild` is **not available** in the `ngOnInit()` lifecycle hook **unless** `static: true` is set.
- It is available in `ngAfterViewInit()` when `static: false` (default).

### **Example: Incorrect Usage in `ngOnInit()`**

```typescript
export class ParentComponent implements OnInit {
  @ViewChild('heading') heading!: ElementRef;

  ngOnInit() {
    console.log(this.heading.nativeElement.innerText); // ❌ ERROR: Cannot read properties of undefined
  }
}
```

### **Example: Correct Usage in `ngAfterViewInit()`**

```typescript
export class ParentComponent implements AfterViewInit {
  @ViewChild('heading') heading!: ElementRef;

  ngAfterViewInit() {
    console.log(this.heading.nativeElement.innerText); // ✅ Works fine
  }
}
```

---

### **3️⃣ `@ViewChild` Cannot Access Elements Inside `ngIf` Until They Exist**

If an element inside an `*ngIf` block is not present initially, `@ViewChild` **will not find it**.

### **Example: Incorrect Usage**

```typescript
@Component({
  selector: 'app-example',
  template: `
    <button (click)="toggle()">Toggle Heading</button>
    <h2 #heading *ngIf="isVisible">Hello World</h2>
  `,
})
export class ExampleComponent {
  @ViewChild('heading') heading!: ElementRef;
  isVisible = false;

  toggle() {
    this.isVisible = !this.isVisible;
    console.log(this.heading.nativeElement.innerText); // ❌ ERROR when isVisible = false
  }
}
```

### **Solution: Use `setTimeout()` or `ChangeDetectorRef`**

To fix this, delay the `@ViewChild` access using `setTimeout()`.

```typescript
toggle() {
  this.isVisible = !this.isVisible;
  setTimeout(() => {
    console.log(this.heading?.nativeElement?.innerText);
  });
}
```

---

## **Summary of Key Points**

✅ `read: ElementRef` → Gets the native DOM element instead of a component.  
✅ `read: ViewContainerRef` → Allows dynamic component creation.  
✅ `read: TemplateRef` → Allows accessing an `ng-template`.  
✅ `@ViewChild` only works inside the same component.  
✅ `@ViewChild` is available only after the view is initialized (`ngAfterViewInit()`).  
✅ `@ViewChild` does not work on elements inside `*ngIf` unless handled properly.

---

Would you like a real-world use case example for a better understanding? 🚀

### How deep We can query using view child? Explain about AfterviewInit Life cycle hook.

## **How Deep Can We Query Using `@ViewChild`?**

In Angular, `@ViewChild` can only query **direct child elements or components** present in the **same view (template)**. It does **not** work for deeply nested components beyond the first level.

### **1️⃣ Can Query Direct Child Components**

✅ **Works**

```typescript
@Component({
  selector: 'app-parent',
  template: `<app-child></app-child>`,
})
export class ParentComponent {
  @ViewChild(ChildComponent) child!: ChildComponent;
}
```

Here, `@ViewChild(ChildComponent)` will correctly reference the `<app-child>` component.

---

### **2️⃣ Cannot Query Grandchild Components**

❌ **Does Not Work**

```typescript
@Component({
  selector: 'app-parent',
  template: `<app-child></app-child>`,
})
export class ParentComponent {
  @ViewChild(GrandChildComponent) grandChild!: GrandChildComponent; // ❌ Won't work!
}
```

Since `GrandChildComponent` is inside `ChildComponent`, `@ViewChild(GrandChildComponent)` in `ParentComponent` **will not work**.

✅ **Solution**: Query in `ChildComponent` and pass it to `ParentComponent`.

```typescript
@Component({
  selector: 'app-child',
  template: `<app-grand-child></app-grand-child>`,
})
export class ChildComponent {
  @ViewChild(GrandChildComponent) grandChild!: GrandChildComponent;
}
```

Now, `grandChild` can be accessed inside `ChildComponent`, but not directly in `ParentComponent`.

---

### **3️⃣ Querying Elements Inside `ng-template`**

Elements inside `ng-template` are **not part of the DOM** by default. To query them, use `@ViewChild` with `TemplateRef` and `ViewContainerRef`.

✅ **Works with `ng-template`**

```typescript
@Component({
  selector: 'app-parent',
  template: `
    <ng-template #myTemplate>
      <p>Hello, I am inside an ng-template!</p>
    </ng-template>
  `,
})
export class ParentComponent {
  @ViewChild('myTemplate', { read: TemplateRef }) template!: TemplateRef<any>;
}
```

- This lets us retrieve the `ng-template`, but we still need `ViewContainerRef` to render it dynamically.

---

### **Summary**

- `@ViewChild` works for **direct child elements or components** ✅
- It **does not work for grandchild components** ❌
- `@ViewChild` **does not work inside `ngIf` until the element is rendered** ❌
- `@ViewChild` can be used with `ng-template` ✅

---

## **What is `AfterViewInit` Lifecycle Hook?**

`ngAfterViewInit()` is an Angular lifecycle hook that is **called after the component’s view (HTML template) has been fully initialized**.

### **Why Do We Need `ngAfterViewInit()`?**

- `@ViewChild` and `@ViewChildren` **are not available in `ngOnInit()`**.
- `ngAfterViewInit()` is the **earliest** lifecycle hook where we can safely interact with queried elements.

### **Lifecycle Order**

1. `ngOnInit()` → Before view rendering.
2. **`ngAfterViewInit()` → After the view is rendered (DOM is available).**
3. `ngAfterViewChecked()` → After every view change.

---

## **Example: Using `@ViewChild` in `ngAfterViewInit()`**

### **❌ Incorrect Usage in `ngOnInit()`**

```typescript
export class ParentComponent implements OnInit {
  @ViewChild('myHeading') heading!: ElementRef;

  ngOnInit() {
    console.log(this.heading.nativeElement.innerText); // ❌ ERROR: Undefined
  }
}
```

**Issue:**

- The `h2` element is **not yet available** in `ngOnInit()`.

---

### **✅ Correct Usage in `ngAfterViewInit()`**

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `<h2 #myHeading>Hello World</h2>`,
})
export class ExampleComponent implements AfterViewInit {
  @ViewChild('myHeading') heading!: ElementRef;

  ngAfterViewInit() {
    console.log(this.heading.nativeElement.innerText); // ✅ Works fine
  }
}
```

- `ngAfterViewInit()` ensures the view is fully loaded before accessing the element.

---

## **Example: Modifying DOM Elements in `ngAfterViewInit()`**

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <h2 #title>Change My Color</h2>
    <button (click)="changeColor()">Change Color</button>
  `,
})
export class ExampleComponent implements AfterViewInit {
  @ViewChild('title') title!: ElementRef;

  ngAfterViewInit() {
    this.title.nativeElement.style.color = 'blue';
  }

  changeColor() {
    this.title.nativeElement.style.color = 'red';
  }
}
```

**Explanation:**

- `ngAfterViewInit()` changes the text color **after rendering**.
- The button allows further modification.

---

## **Caution with `ngAfterViewInit()`**

- It only runs **once** after the first view initialization.
- If elements **change dynamically**, `ngAfterViewInit()` **will not be called again**. Use `ngAfterViewChecked()` if the view updates frequently.

---

## **Conclusion**

| Feature                         | Behavior                                          |
| ------------------------------- | ------------------------------------------------- |
| `@ViewChild` Scope              | Direct children only, not grandchildren.          |
| `@ViewChild` with `ng-template` | Needs `TemplateRef` and `ViewContainerRef`.       |
| `@ViewChild` Availability       | Only in `ngAfterViewInit()`, not in `ngOnInit()`. |
| `ngAfterViewInit()` Timing      | Runs once after the view is initialized.          |
| `ngAfterViewChecked()`          | Runs after every view update.                     |

---

Would you like an advanced real-world example of `ngAfterViewInit()`? 🚀
