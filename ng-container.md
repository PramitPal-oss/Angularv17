# Angular Core Directive: ng-container

## Introduction

In this lesson, we are going to cover the Angular core directive `ng-container`. So far, we have been using several Angular structural directives, such as `*ngIf`, `*ngSwitch`, and `*ngSwitchCase`. These directives typically require a clear parent element onto which they are applied. However, there are scenarios where we do not have a single parent element available, and this is where `ng-container` becomes useful.

## The Problem: Lack of a Parent Element

In some cases, our component might not have a top-level element to apply a structural directive. Consider the following situations:

1. **Component Without a Single Parent Element:**

   - If our component does not have a single parent element, it becomes difficult to apply structural directives like `*ngIf`.
   - Example:

     ```html
     <div class="header">Header Content</div>
     <div class="body">Body Content</div>
     ```

     If we want to conditionally display this component, we might need to wrap it inside a `<div>`, which can be unnecessary.

2. **Multiple Elements Inside an `ngSwitchCase`:**

   - Sometimes, we may want to place multiple elements inside an `ngSwitchCase`, but there is no single parent wrapping them.
   - Example:

     ```html
     <div [ngSwitch]="category">
       <div *ngSwitchCase="'beginner'">Beginner Level</div>
       <div *ngSwitchCase="'intermediate'">Intermediate Level</div>
       <div *ngSwitchCase="'advanced'">Advanced Level</div>
     </div>
     ```

     In this case, we are forced to wrap these elements inside an unnecessary `div`, just for applying `*ngSwitchCase`.

## Solution: `ng-container`

Instead of introducing an extra element just to apply a structural directive, we can use `ng-container`. The `ng-container` directive is available via Angular core and acts as a wrapping container element that does not create additional DOM elements.

### Features of `ng-container`

1. **Invisible in the DOM:** Unlike `div` or other HTML elements, `ng-container` does not render in the DOM.
2. **Useful for Structural Directives:** It is primarily used as a placeholder for structural directives.
3. **Prevents Unnecessary Wrapper Elements:** Helps in keeping the DOM clean and lightweight.

### Usage Examples

#### Example 1: Using `ng-container` for `*ngIf`

Without `ng-container`:

```html
<div *ngIf="isVisible">
  <div class="header">Header Content</div>
  <div class="body">Body Content</div>
</div>
```

With `ng-container`:

```html
<ng-container *ngIf="isVisible">
  <div class="header">Header Content</div>
  <div class="body">Body Content</div>
</ng-container>
```

Here, `ng-container` allows us to apply `*ngIf` without adding an extra `<div>`.

#### Example 2: Using `ng-container` with `ngSwitch`

Without `ng-container`:

```html
<div [ngSwitch]="category">
  <div *ngSwitchCase="'beginner'">
    <p>Beginner Level</p>
    <button>Start</button>
  </div>
  <div *ngSwitchCase="'intermediate'">
    <p>Intermediate Level</p>
    <button>Proceed</button>
  </div>
</div>
```

With `ng-container`:

```html
<div [ngSwitch]="category">
  <ng-container *ngSwitchCase="'beginner'">
    <p>Beginner Level</p>
    <button>Start</button>
  </ng-container>
  <ng-container *ngSwitchCase="'intermediate'">
    <p>Intermediate Level</p>
    <button>Proceed</button>
  </ng-container>
</div>
```

This removes unnecessary wrapper `<div>` elements while keeping the structure intact.

### Why Use `ng-container`?

- **Better Performance:** Reduces unnecessary DOM elements.
- **Clean Code:** Avoids redundant wrapper elements.
- **Improved Readability:** Makes templates more readable and maintainable.

## Conclusion

`ng-container` is an essential directive in Angular that helps in structuring templates more efficiently without introducing extra elements into the DOM. If you ever find yourself needing a place to apply a structural directive but don't want to add an unnecessary element, `ng-container` is the way to go.

With this, we have covered the Angular core directive `ng-container`. Next, we will introduce a new Angular feature: Angular Pipes.
