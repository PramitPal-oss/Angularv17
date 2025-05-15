Of course! I'll give you a **full example** where I will **use all Angular lifecycle hooks** and **clearly explain each one** along with **real-world use cases**.

---

# 🌟 Angular Lifecycle Hooks Example (with Code + Explanation)

## Component Code:

```typescript
import {
  Component,
  OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  Input,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-lifecycle-demo',
  template: `
    <div>
      <h2>Lifecycle Hooks Demo</h2>
      <p>Input Value: {{ inputValue }}</p>
      <ng-content></ng-content>
      <!-- Content projected here -->
    </div>
  `,
})
export class LifecycleDemoComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
  @Input() inputValue: string = '';

  constructor() {
    console.log('Constructor: Component instance created');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges: Input properties changed', changes);
  }

  ngOnInit(): void {
    console.log('OnInit: Component initialized');
  }

  ngDoCheck(): void {
    console.log('DoCheck: Custom change detection');
  }

  ngAfterContentInit(): void {
    console.log('AfterContentInit: Content projected into the component');
  }

  ngAfterContentChecked(): void {
    console.log('AfterContentChecked: Projected content checked');
  }

  ngAfterViewInit(): void {
    console.log("AfterViewInit: Component's view (and child views) initialized");
  }

  ngAfterViewChecked(): void {
    console.log("AfterViewChecked: Component's view (and child views) checked");
  }

  ngOnDestroy(): void {
    console.log('OnDestroy: Cleanup before component is destroyed');
  }
}
```

---

# 📜 Full Explanation of Each Hook:

| Lifecycle Hook            | When It's Called                                                         | Typical Use Case                                         | Explanation                                                                               |
| :------------------------ | :----------------------------------------------------------------------- | :------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| **constructor**           | When component instance is created                                       | Initialize basic variables                               | No Angular bindings (like `@Input`) are available yet. Only pure TS class initialization. |
| **ngOnChanges**           | When an `@Input()` property changes (even first time)                    | React to input property changes, fetch new data          | Useful when the parent component passes new values to the child.                          |
| **ngOnInit**              | Once, after the first `ngOnChanges`                                      | Fetch data, initialize heavy logic                       | Safe place to fetch remote data, start timers, etc.                                       |
| **ngDoCheck**             | On every change detection cycle                                          | Custom change detection (manual checks)                  | Advanced use: Detect changes Angular might miss (e.g., deep object changes).              |
| **ngAfterContentInit**    | After external content is projected (`<ng-content>`)                     | Initialize based on projected content                    | Used when you need to access projected content for some operation.                        |
| **ngAfterContentChecked** | After every check of the projected content                               | Update something if projected content changes            | Rare. Example: Dynamically injected forms or elements via `<ng-content>`.                 |
| **ngAfterViewInit**       | After the component’s own template (and child components) is initialized | DOM querying, calling child component methods            | Safely interact with `@ViewChild` or `@ViewChildren` references.                          |
| **ngAfterViewChecked**    | After every check of the component's view                                | Update based on view changes                             | Rare. Example: Recalculate layout sizes. (Be careful to avoid infinite loops.)            |
| **ngOnDestroy**           | Just before Angular destroys the component                               | Clean subscriptions, clear timers, detach event handlers | Prevents memory leaks. Essential for long-running apps.                                   |

---

# 🛠 Simple Usage Example (Parent Passing Data)

**Parent Component**:

```html
<app-lifecycle-demo [inputValue]="parentValue">
  <p>Projected content from parent</p>
</app-lifecycle-demo>

<button (click)="changeValue()">Change Input Value</button>
```

**Parent Component TypeScript**:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
})
export class ParentComponent {
  parentValue = 'Initial Value';

  changeValue() {
    this.parentValue = 'Changed Value at ' + new Date().toLocaleTimeString();
  }
}
```

---

# 🔥 Real World Practical Scenarios for Each Hook:

| Hook                    | Real-world example                                                               |
| :---------------------- | :------------------------------------------------------------------------------- |
| `constructor`           | Initialize service instances or default properties.                              |
| `ngOnChanges`           | Fetch API data when filter/sort inputs change.                                   |
| `ngOnInit`              | Make API call to load user profile at startup.                                   |
| `ngDoCheck`             | Detect manual change in a nested object (e.g., deeply nested form fields).       |
| `ngAfterContentInit`    | Initialize a component that projects `<ng-content>` like a custom card or modal. |
| `ngAfterContentChecked` | Adjust styling based on dynamic projected content.                               |
| `ngAfterViewInit`       | Access DOM elements with `@ViewChild` and apply focus or animations.             |
| `ngAfterViewChecked`    | Remeasure layout dimensions after view updates (e.g., virtual scroll).           |
| `ngOnDestroy`           | Unsubscribe from `Observable`, clear timers, disconnect WebSocket, etc.          |

---

# 📌 Important Notes:

- **constructor** is pure TS, no Angular bindings are available yet.
- **ngOnChanges** triggers even before **ngOnInit**.
- **ngDoCheck** should be used carefully (can hurt performance if used badly).
- **ngAfterViewInit** and **ngAfterViewChecked** are great for DOM manipulations.
- **ngOnDestroy** is _very important_ — forgetting it can cause **memory leaks**.

---

Would you also like me to show you a **diagram** (flowchart) 📈 of how Angular calls these hooks in order?  
It'll make it even easier to visualize! 🚀  
(Just say: "Yes, show me the flowchart!") 🌟
