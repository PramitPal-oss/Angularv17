### ng-container with content child:

### **`@ContentChild` Decorator in Angular**

The `@ContentChild` decorator in Angular is used to query a single child element that is projected into a component via `<ng-content>`. It allows a component to get a reference to a projected child component, directive, or DOM element.

#### **Basic Syntax**

```ts
@ContentChild(childType: Type<any> | string, { static?: boolean, read?: any } )
```

#### **Parameters**

1. **`childType`**: The type or selector of the projected child component, directive, or element.
2. **Options Object** (optional):
   - **`static`**: A boolean that determines whether the query should be resolved before the view initialization (`true`) or after (`false`, default).
   - **`read`**: Specifies what to read from the queried element (e.g., the element itself, a directive, or a specific property).

---

## **1️⃣ Basic Example: Querying a Projected Component**

### **Scenario**: Query a child component inside `<ng-content>`.

#### **Child Component**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>Child component content</p>`,
})
export class ChildComponent {
  logMessage() {
    console.log('Method in ChildComponent called!');
  }
}
```

#### **Parent Component**

```ts
import { Component, ContentChild, AfterContentInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <ng-content></ng-content>
    <button (click)="callChildMethod()">Call Child Method</button>
  `,
})
export class ParentComponent implements AfterContentInit {
  @ContentChild(ChildComponent) child!: ChildComponent;

  ngAfterContentInit() {
    console.log('ContentChild Initialized:', this.child);
  }

  callChildMethod() {
    this.child?.logMessage();
  }
}
```

#### **Usage in Another Component**

```html
<app-parent>
  <app-child></app-child>
</app-parent>
```

### **Explanation**

1. The `<app-child>` component is projected inside `<app-parent>` via `<ng-content>`.
2. `@ContentChild(ChildComponent)` allows the `ParentComponent` to get a reference to `ChildComponent`.
3. The `ngAfterContentInit` lifecycle hook logs the child component once it's available.
4. Clicking the button in `ParentComponent` calls a method from `ChildComponent`.

---

## **2️⃣ Querying a Projected DOM Element**

Instead of querying a component, we can query a native DOM element.

#### **Example**

```ts
import { Component, ContentChild, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <ng-content></ng-content>
    <button (click)="changeText()">Change Text</button>
  `,
})
export class ParentComponent implements AfterContentInit {
  @ContentChild('myParagraph', { read: ElementRef }) paragraph!: ElementRef;

  ngAfterContentInit() {
    console.log('Paragraph Element:', this.paragraph);
  }

  changeText() {
    this.paragraph.nativeElement.textContent = 'Text changed by ParentComponent!';
  }
}
```

#### **Usage**

```html
<app-parent>
  <p #myParagraph>This is a projected paragraph.</p>
</app-parent>
```

### **Explanation**

- `@ContentChild('myParagraph', { read: ElementRef })` selects the `<p>` element.
- `ngAfterContentInit` ensures that the element is available.
- The `changeText` method updates the paragraph's text when the button is clicked.

---

## **3️⃣ Using `@ContentChild` with Directives**

Instead of querying a component, we can query a directive.

#### **Custom Directive**

```ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[highlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

#### **Parent Component**

```ts
import { Component, ContentChild, AfterContentInit } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

@Component({
  selector: 'app-parent',
  template: `
    <ng-content></ng-content>
    <button (click)="applyHighlight()">Apply Highlight</button>
  `,
})
export class ParentComponent implements AfterContentInit {
  @ContentChild(HighlightDirective) highlightDirective!: HighlightDirective;

  ngAfterContentInit() {
    console.log('Directive:', this.highlightDirective);
  }

  applyHighlight() {
    this.highlightDirective?.highlight('yellow');
  }
}
```

#### **Usage**

```html
<app-parent>
  <p highlight>This paragraph will be highlighted.</p>
</app-parent>
```

### **Explanation**

- The `@ContentChild(HighlightDirective)` queries the directive inside `<ng-content>`.
- The `applyHighlight` method calls the directive's `highlight` method.

---

## **4️⃣ Multiple Query Configuration (`@ContentChildren`)**

If multiple child elements need to be queried, `@ContentChildren` is used.

#### **Example**

```ts
import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `
    <ng-content></ng-content>
    <button (click)="logAllChildren()">Log All Children</button>
  `,
})
export class ParentComponent implements AfterContentInit {
  @ContentChildren(ChildComponent) children!: QueryList<ChildComponent>;

  ngAfterContentInit() {
    console.log('All Child Components:', this.children);
  }

  logAllChildren() {
    this.children.forEach((child) => child.logMessage());
  }
}
```

#### **Usage**

```html
<app-parent>
  <app-child></app-child>
  <app-child></app-child>
</app-parent>
```

### **Explanation**

- `@ContentChildren(ChildComponent)` queries all projected `ChildComponent` instances.
- The `logAllChildren` method iterates over them and calls `logMessage()` on each.

---

## **5️⃣ `ngAfterContentInit` Lifecycle Hook**

The `ngAfterContentInit` lifecycle hook runs **once** after the projected content is initialized. It is useful when:

- You need to interact with content projected inside `<ng-content>`.
- You want to initialize child components, directives, or elements.

#### **Key Points**

1. Runs **only once** after content projection is initialized.
2. Executes **before** `ngAfterViewInit`, since projected content is initialized before the view.
3. If projected content changes dynamically, **it does not trigger again**.

#### **Example**

```ts
import { Component, ContentChild, AfterContentInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `<ng-content></ng-content>`,
})
export class ParentComponent implements AfterContentInit {
  @ContentChild(ChildComponent) child!: ChildComponent;

  ngAfterContentInit() {
    console.log('Content initialized:', this.child);
  }
}
```

### **Key Behavior**

- If `ChildComponent` is projected, `ngAfterContentInit` logs the child component.
- If `ChildComponent` is dynamically added later (e.g., via `*ngIf`), `ngAfterContentInit` **won’t run again**.

---

## **Conclusion**

- `@ContentChild` is used for querying a **single** projected component, directive, or element.
- `@ContentChildren` is used for **multiple** projected components.
- The `ngAfterContentInit` hook runs once when projected content is initialized.
- `read: ElementRef` allows querying native elements instead of components.
- `static: true` makes queries available in `ngOnInit`, but usually, `false` is recommended for `ngAfterContentInit`.
