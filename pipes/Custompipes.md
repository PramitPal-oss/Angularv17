Creating **Custom Pipes** in Angular is a powerful way to transform data directly in your templates, especially when you want reusable logic that modifies the way values are displayed.

---

## 🔹 What is a Pipe in Angular?

A **pipe** is a class decorated with `@Pipe`, which is used to **transform input values into a desired output format**. Angular comes with many built-in pipes like `date`, `uppercase`, `lowercase`, `currency`, etc.

---

## 🔹 Why and When to Create a Custom Pipe?

You create a **custom pipe** when:

- The transformation logic you need is **not covered** by Angular's built-in pipes.
- You need **reusability** of that logic across different components/templates.
- You want **cleaner templates** instead of calling methods or writing inline logic.

---

## 🔹 Steps to Create a Custom Pipe

1. **Create the pipe class and decorate it with `@Pipe`**
2. **Implement the `PipeTransform` interface**
3. **Register the pipe in your module**
4. **Use the pipe in the template**

---

## 🔹 Example: Capitalize First Letter of Each Word

Let’s create a custom pipe called `capitalize` that capitalizes the **first letter of each word** in a sentence.

---

### ✅ Step 1: Create the Pipe

You can generate a pipe using Angular CLI:

```bash
ng generate pipe capitalize
```

This creates:

```
src/app/capitalize.pipe.ts
```

---

### ✅ Step 2: Implement the Pipe

```ts
// capitalize.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    return value
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
```

---

### ✅ Explanation:

- `@Pipe({ name: 'capitalize' })` – Declares the pipe and gives it a name to be used in templates.
- `PipeTransform` – Interface that enforces the `transform()` method.
- `transform(value: string): string` – Main method where the logic to transform the input is written.

  **What the logic does:**

  - Splits the input string by space into words.
  - For each word, capitalizes the first letter and lowercases the rest.
  - Joins them back into a single string.

---

### ✅ Step 3: Register the Pipe in a Module

If not automatically registered, add it to `declarations` of your module:

```ts
@NgModule({
  declarations: [
    CapitalizePipe,
    // ... other components/pipes
  ],
})
export class AppModule {}
```

---

### ✅ Step 4: Use in Template

Suppose you have this in a component:

```ts
title = 'hello world from angular';
```

You can use the pipe in the HTML template:

```html
<p>{{ title | capitalize }}</p>
```

**Output:**

```
Hello World From Angular
```

---

## 🔹 Bonus: Add Arguments to Custom Pipe

You can make your custom pipe **accept parameters**.

### Example: Truncate Pipe

```ts
// truncate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, suffix: string = '...'): string {
    return value.length > limit ? value.slice(0, limit) + suffix : value;
  }
}
```

**Usage:**

```html
<p>{{ longText | truncate:25:'--Read More--' }}</p>
```

---

## 🔹 Summary Notes

| Aspect            | Description                                                     |                                 |
| ----------------- | --------------------------------------------------------------- | ------------------------------- |
| Pipe Decorator    | `@Pipe({ name: 'pipeName' })`                                   |                                 |
| Implements        | `PipeTransform` interface with `transform()` method             |                                 |
| Use in Template   | \`{{ value                                                      | customPipeName }}\`             |
| Arguments in Pipe | \`{{ value                                                      | customPipeName\:arg1\:arg2 }}\` |
| Best For          | Display transformations (not logic-heavy tasks or side effects) |                                 |
| Register In       | `declarations` array of an Angular module                       |                                 |

---

Would you like an example where the pipe works with arrays or objects (like filtering or sorting), or are you good with string transformations for now?
