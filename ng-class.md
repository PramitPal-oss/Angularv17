### ✅ In-depth Guide to `ngClass` in Angular

`ngClass` is a powerful directive in Angular used to dynamically add or remove CSS classes on an HTML element. It's a better alternative to plain `[class.class-name]` bindings when you need more flexibility and dynamic styling.

---

## 📌 What is `ngClass`?

`ngClass` allows you to:

- Toggle one or more CSS classes conditionally.
- Apply multiple classes based on object, array, or string values.
- Bind classes in a clean, declarative way.

### ✅ Syntax:

```html
<div [ngClass]="expression"></div>
```

---

## 🔍 Supported Input Types

### 1. **String**

You can pass a single string or space-separated class names.

```html
<div [ngClass]="'class1 class2'">Hello</div>
```

✔ This will apply both `class1` and `class2` to the `div`.

---

### 2. **Array**

An array of class names (strings).

```ts
myClasses = ['class1', 'class2'];
```

```html
<div [ngClass]="myClasses">Hello</div>
```

✔ Adds all the classes listed in the array.

---

### 3. **Object (Map)**

An object where keys are class names and values are booleans (condition).

```ts
isActive = true;
hasError = false;
```

```html
<div [ngClass]="{ 'active': isActive, 'error': hasError }">Hello</div>
```

✔ Applies `active` only if `isActive === true`. Same for `error`.

---

### 4. **Combine with static class**

```html
<div class="base-class" [ngClass]="{ 'active': isActive }">Hello</div>
```

✔ `base-class` is always applied; `active` is conditionally applied.

---

## ⚡ Use Cases and Examples

---

### ✅ 1. **Single Conditional Class**

```html
<button [ngClass]="isDisabled ? 'disabled' : ''">Submit</button>
```

---

### ✅ 2. **Multiple Conditional Classes**

```ts
status = 'success'; // could be 'error', 'info'
```

```html
<div
  [ngClass]="{
  'success-class': status === 'success',
  'error-class': status === 'error',
  'info-class': status === 'info'
}"
>
  Status Message
</div>
```

---

### ✅ 3. **Using Array for Dynamic Classes**

```ts
classesToApply = ['text-bold', 'text-large'];
```

```html
<p [ngClass]="classesToApply">Styled Text</p>
```

---

### ✅ 4. **Add/Remove Class on Event**

```ts
isDarkMode = false;

toggleTheme() {
  this.isDarkMode = !this.isDarkMode;
}
```

```html
<div [ngClass]="{ 'dark-theme': isDarkMode }">Theme Container</div>
<button (click)="toggleTheme()">Toggle Theme</button>
```

---

### ✅ 5. **Use with `ngFor` (dynamic row styling)**

```ts
users = [
  { name: 'John', isAdmin: true },
  { name: 'Jane', isAdmin: false },
];
```

```html
<ul>
  <li *ngFor="let user of users" [ngClass]="{ 'admin-row': user.isAdmin, 'user-row': !user.isAdmin }">
    {{ user.name }}
  </li>
</ul>
```

---

### ✅ 6. **Combining Class Binding and ngClass**

```html
<!-- Static class and conditional classes together -->
<div class="static-class" [ngClass]="{ 'highlight': isHighlighted, 'dim': !isHighlighted }"></div>
```

---

## 💡 Best Practices

| ✅ Do                                                        | ❌ Avoid                                                    |
| ------------------------------------------------------------ | ----------------------------------------------------------- |
| Use objects for multiple conditional classes                 | Hardcoding large class strings                              |
| Keep logic in the component                                  | Putting complex expressions in the template                 |
| Combine with `class=""` when some classes are always applied | Applying both `[class]` and `[ngClass]` on the same element |

---

## ⚠️ Difference: `[class.className]` vs `[ngClass]`

| Feature             | `[class.className]` | `[ngClass]`        |
| ------------------- | ------------------- | ------------------ |
| Single class        | ✅                  | ✅                 |
| Multiple classes    | ❌                  | ✅                 |
| Dynamic class names | ❌                  | ✅                 |
| Conditional logic   | ✅ (but limited)    | ✅ (very flexible) |

---

## 🔗 Real-World Example (Toggle Button Styles)

```ts
buttonState = 'primary'; // can be 'primary', 'secondary', 'danger'
```

```html
<button
  [ngClass]="{
  'btn-primary': buttonState === 'primary',
  'btn-secondary': buttonState === 'secondary',
  'btn-danger': buttonState === 'danger'
}"
>
  Click Me
</button>
```

---

## 🧪 Testing Tip

If testing dynamic classes in unit tests, you can use Angular’s `nativeElement.classList.contains('className')` to check if the expected class is applied.

---

## ✅ Summary

| Input Type                   | Description                                            |
| ---------------------------- | ------------------------------------------------------ |
| String                       | Static or dynamic string with one/multiple class names |
| Array                        | List of class names to apply                           |
| Object                       | Conditional application of classes                     |
| Combine with class attribute | Apply static and dynamic classes together              |

---

Would you like me to give you a live StackBlitz or GitHub demo code too?
