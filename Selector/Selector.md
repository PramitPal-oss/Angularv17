# Types of Component Selectors in Angular

In Angular, a **component selector** defines how a component can be used within an HTML template. Most commonly, selectors are used like HTML tags (elements), but Angular also allows us to define selectors that can be used like **attributes**, **CSS classes**, or **IDs**. This flexibility helps in scenarios like using Angular **directives**, which we'll discuss later.

In this note, we'll explore all the different ways to use selectors in Angular with a practical example involving a `TopHeaderComponent`.

---

## 1. Using Selector as an HTML Element (Tag)

This is the default and most commonly used method.

### Example:

```ts
@Component({
  selector: 'top-header',
  templateUrl: './top-header.component.html',
})
export class TopHeaderComponent {}
```

### Usage in HTML:

```html
<top-header></top-header>
```

### Behavior:

- This renders the component's view template wherever the `top-header` tag is used.
- Example of rendered HTML:

```html
<top-header>
  <div>...Top Header Content...</div>
</top-header>
```

---

## 2. Using Selector as an HTML Attribute

To define a selector to be used as an attribute, enclose the name in **square brackets**:

### Example:

```ts
@Component({
  selector: '[top-header]',
  templateUrl: './top-header.component.html',
})
export class TopHeaderComponent {}
```

### Usage in HTML:

```html
<div top-header></div>
```

### Behavior:

- The component is rendered within the element where the attribute is used.
- Example of rendered HTML:

```html
<div top-header>
  <div>...Top Header Content...</div>
</div>
```

- If used incorrectly like a tag (e.g., `<top-header></top-header>`), it will throw an error: **"top-header is not a known element"**.

### Use Case:

- This method is particularly useful for **Angular Directives**, which modify behavior or appearance of existing DOM elements.

---

## 3. Using Selector as a CSS Class

To define a selector as a class, prefix it with a **dot (`.`)**:

### Example:

```ts
@Component({
  selector: '.top-header',
  templateUrl: './top-header.component.html',
})
export class TopHeaderComponent {}
```

### Usage in HTML:

```html
<div class="top-header"></div>
```

### Behavior:

- The component's template is rendered inside the element with the class.
- Example of rendered HTML:

```html
<div class="top-header">
  <div>...Top Header Content...</div>
</div>
```

---

## 4. Using Selector as an ID

To define a selector as an ID, prefix it with a **hash/pound sign (`#`)**:

### Example:

```ts
@Component({
  selector: '#top-header',
  templateUrl: './top-header.component.html',
})
export class TopHeaderComponent {}
```

### Usage in HTML:

```html
<div id="top-header"></div>
```

### Behavior:

- The component’s view template is rendered inside the element that matches the ID.
- Example of rendered HTML:

```html
<div id="top-header">
  <div>...Top Header Content...</div>
</div>
```

---

## Summary

| Selector Type  | Syntax           | Usage in HTML                    | Common Use Case                   |
| -------------- | ---------------- | -------------------------------- | --------------------------------- |
| HTML Element   | `'top-header'`   | `<top-header></top-header>`      | Default way to render a component |
| HTML Attribute | `'[top-header]'` | `<div top-header></div>`         | Structural/Attribute Directives   |
| CSS Class      | `'.top-header'`  | `<div class="top-header"></div>` | Rarely used for components        |
| HTML ID        | `'#top-header'`  | `<div id="top-header"></div>`    | Rarely used for components        |

> **Note**: In real-world Angular applications, **component selectors** are almost always used like HTML tags. The **attribute** selector format is mostly used for **directives**, which we'll cover in later discussions.

---

## Conclusion

This lecture explored the flexibility of Angular component selectors. While most components use element-style selectors, Angular provides the ability to define selectors as attributes, classes, and IDs — giving developers powerful tools to design reusable UI and behavior components. This becomes especially important when we move on to learning **Angular Directives**, which often rely on attribute selectors.

Thanks for reading. If you have any questions, feel free to ask!
