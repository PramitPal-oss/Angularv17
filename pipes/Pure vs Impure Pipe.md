In Angular, **pipes can be either pure or impure** depending on how often and under what conditions Angular calls their `transform()` method.

This concept is critical when dealing with **performance** and **change detection**, especially when working with **mutable data** like arrays, objects, or custom logic.

---

## 🔹 What is a Pure Pipe?

A **pure pipe** is called **only when Angular detects a pure change** to the input value. A **pure change** means:

- A **new reference** is passed (for objects/arrays)
- A **new primitive value** is passed (like a new string, number, etc.)

### ✅ Characteristics:

- **Default behavior** for custom pipes
- Angular **caches the result** and **doesn’t call `transform()` again** unless the reference changes
- **Efficient** for working with immutable data or pure transformations

### 🔧 How to define:

```ts
@Pipe({
  name: 'examplePipe',
  pure: true // default; can be omitted
})
```

---

### ✅ Pure Pipe Example: Uppercase Words

```ts
@Pipe({
  name: 'capitalize',
  pure: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.substring(1).toLowerCase())
      .join(' ');
  }
}
```

This will **only re-run** if the string value passed to it changes.

---

## 🔹 What is an Impure Pipe?

An **impure pipe** is called **on every change detection cycle**, even if the input hasn't changed **by reference**.

### ✅ Characteristics:

- Called **very frequently** (on every keystroke, mousemove, timer, etc.)
- Useful for working with **mutable data** (e.g., arrays or objects that are modified in place)
- Can **impact performance**, so use **sparingly**

### 🔧 How to define:

```ts
@Pipe({
  name: 'impureExample',
  pure: false
})
```

---

### ✅ Impure Pipe Example: Filter Items

Let’s say you want to filter an array of items based on a search term, and the array **might be mutated** directly without changing reference.

```ts
@Pipe({
  name: 'filterItems',
  pure: false,
})
export class FilterItemsPipe implements PipeTransform {
  transform(items: string[], searchText: string): string[] {
    if (!items || !searchText) return items;
    return items.filter((item) => item.toLowerCase().includes(searchText.toLowerCase()));
  }
}
```

### 🧠 Why this needs to be impure:

If you **push** or **splice** the array without reassigning it, a pure pipe will not detect that change:

```ts
this.items.push('new item'); // Same array reference
```

An **impure pipe** ensures it still re-runs.

---

## 🔍 Comparison Table: Pure vs Impure Pipes

| Feature          | Pure Pipe                     | Impure Pipe                      |
| ---------------- | ----------------------------- | -------------------------------- |
| Default Behavior | ✅ Yes                        | ❌ No                            |
| Called When      | Input reference changes       | Every change detection cycle     |
| Suitable For     | Immutable data                | Mutable data                     |
| Performance      | 🚀 Fast                       | 🐢 Can be slow (expensive)       |
| Use Case         | String formatting, math, etc. | Filtering mutable arrays/objects |
| Configuration    | `pure: true` (default)        | `pure: false`                    |

---

## 🧪 Demo Scenario

```html
<!-- Pure Pipe -->
<p>{{ message | capitalize }}</p>

<!-- Impure Pipe with search -->
<ul>
  <li *ngFor="let item of items | filterItems:searchText">{{ item }}</li>
</ul>
<input [(ngModel)]="searchText" placeholder="Search..." />
```

---

## 🛑 Warning about Impure Pipes

- Since Angular calls impure pipes on **every change detection**, even small apps can become **laggy** if not handled carefully.
- Avoid heavy computations inside impure pipes.
- Prefer **pure pipes with immutable data practices** (e.g., using `slice()`, `map()` to return new arrays).

---

## ✅ Best Practices

- **Default to pure pipes**
- Use **impure pipes only** when necessary (e.g., when working with **mutable lists** that don't change reference)
- Keep logic **lightweight**
- For complex filtering/sorting, consider using **component methods** or **services** instead of impure pipes

---
