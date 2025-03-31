# Content Projection in Angular using ng-content

## Introduction

Content projection is a powerful feature in Angular that allows components to be more configurable by enabling developers to pass content from a parent component to a child component. This is particularly useful for creating reusable components where parts of the UI can be dynamically injected based on specific requirements.

In this guide, we will explore content projection in depth using Angular's `<ng-content>` directive. We will cover single-slot projection, multi-slot projection, selective content projection using CSS selectors, and more.

## Using `ng-content`

### Basic Example of Content Projection

By default, when a component has a fixed template, we cannot inject external content into it. Let's say we have a `CourseCardComponent`:

```html
<div class="course-card">
  <h3>{{ course.title }}</h3>
  <img [src]="course.icon" alt="Course Image" />
  <p>{{ course.description }}</p>
</div>
```

This template is rigid and does not allow customization. If we want the ability to inject external content, we use `<ng-content>`:

```html
<div class="course-card">
  <h3>{{ course.title }}</h3>
  <ng-content></ng-content>
  <p>{{ course.description }}</p>
</div>
```

Now, we can use this component as follows:

```html
<app-course-card>
  <img src="custom-image.png" alt="Custom Course Image" />
</app-course-card>
```

The image inside `<app-course-card>` will now be projected into the `<ng-content>` placeholder.

---

## Multi-Slot Content Projection

In many cases, a single `<ng-content>` is not enough. Suppose we want to allow content projection for both an image and a description. We can define multiple `<ng-content>` elements with `select` properties:

### Example

```html
<div class="course-card">
  <ng-content select="img"></ng-content>
  <h3>{{ course.title }}</h3>
  <ng-content select="p"></ng-content>
</div>
```

Now, in our parent component, we can structure our projection:

```html
<app-course-card>
  <img src="course.png" alt="Course Image" />
  <p>This is an advanced course.</p>
</app-course-card>
```

This ensures that:

- The `img` element is projected into the first `<ng-content>`.
- The `p` element is projected into the second `<ng-content>`.

---

## Using `ng-content` with Multiple Tags

We can allow multiple types of HTML tags to be projected using a comma-separated list of selectors. Additionally, we can also use CSS classes to selectively project elements. For example, if we want to allow `<h1>`, `<h2>`, `<p>`, `<img>`, and `<div>`, or elements with a `.highlight` class, we can do the following:

### Example

```html
<div class="course-card">
  <ng-content select="h1, h2, p, img, div"></ng-content>
</div>
```

Now, in our parent component, we can provide any of the allowed tags:

```html
<app-course-card>
  <h1>Course Title</h1>
  <h2>Subheading</h2>
  <p>Course description goes here.</p>
  <img src="course.png" alt="Course Image" />
  <div>Additional Information</div>
</app-course-card>
```

This ensures that all specified tags are projected inside the `course-card` component while ignoring other elements.

---

## Default Content Projection (Wildcard)

If we want to project content that does not match any specific selector, we can use a default `<ng-content>` slot without the `select` attribute:

```html
<ng-content></ng-content>
```

This will capture all remaining elements that do not match any other slots.

Example:

```html
<div class="course-card">
  <ng-content select=".course-image"></ng-content>
  <h3>{{ course.title }}</h3>
  <ng-content select=".course-description"></ng-content>
  <ng-content></ng-content>
  <!-- Catches any additional content -->
</div>
```

Any content not explicitly targeted by other `<ng-content>` selectors will fall into this default slot.

---

## Accessing Projected Content in TypeScript

Sometimes, we need to programmatically interact with projected content. Angular provides the `@ContentChild` and `@ContentChildren` decorators for this purpose.

### Using `@ContentChild`

If we have a projected element with a specific class, we can get a reference to it using `@ContentChild`:

```typescript
import { Component, ContentChild, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-course-card',
  template: `
    <div class="course-card">
      <ng-content select=".course-image"></ng-content>
      <h3>{{ course.title }}</h3>
      <ng-content select=".course-description"></ng-content>
    </div>
  `,
})
export class CourseCardComponent implements AfterContentInit {
  @ContentChild('courseImage', { static: false }) imageElement!: ElementRef;

  ngAfterContentInit() {
    console.log(this.imageElement.nativeElement); // Logs the projected image element
  }
}
```

Here, we are selecting an element with the template reference `#courseImage` inside the projected content.

---

## Summary

- **Content projection** allows the insertion of content from a parent component into a child component using `<ng-content>`.
- **Single-slot projection** uses a single `<ng-content>` tag.
- **Multi-slot projection** allows projecting different types of content into separate placeholders using the `select` attribute.
- **Selecting specific tags** can be done using `select="tagname"`.
- **Allowing multiple HTML tags** can be achieved using a comma-separated list in `select`.
- **Default projection** catches any content that does not match specified selectors.
- **Accessing projected content** is possible using `@ContentChild` and `@ContentChildren` in the TypeScript class.

By leveraging content projection, we can create highly reusable and flexible components in Angular, making our applications more modular and maintainable.

---

## Next Steps

In the next lesson, we will learn about dynamically manipulating projected content using `@ContentChild` and `@ContentChildren` in greater detail.

### Overview Explanation :

## **Angular Content Projection (`ng-content`) - In-Depth Explanation**

### **What is Content Projection?**

Content Projection in Angular allows you to pass content from a parent component into a child component, which then displays that content in a specific place inside the child component. This is done using the `<ng-content>` directive.

### **Why Use Content Projection?**

1. **Encapsulation with Flexibility**: Helps create reusable and flexible components while maintaining encapsulation.
2. **Customizable Components**: Allows users of a component to pass any content they want without modifying the component itself.
3. **Better Code Reusability**: Avoids code duplication by enabling dynamic content in components.
4. **Improved Readability & Maintainability**: Keeps components clean by separating structure and content.

---

## **How Does `ng-content` Work?**

A child component declares a placeholder using `<ng-content>`, and whatever content is provided inside the child component’s tag (in the parent component) will be projected into that placeholder.

### **Basic Example**

#### **1️⃣ Creating a Reusable Card Component**

Let's create a simple **Card** component where we use `ng-content` to allow dynamic content injection.

#### **Child Component (`card.component.ts`)**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .card {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class CardComponent {}
```

#### **Parent Component (`app.component.html`)**

```html
<app-card>
  <h2>Title Goes Here</h2>
  <p>This is some content inside the card!</p>
</app-card>
```

#### **Rendered Output**

```html
<div class="card">
  <h2>Title Goes Here</h2>
  <p>This is some content inside the card!</p>
</div>
```

✅ The `<ng-content>` in `CardComponent` is replaced by the actual content from `app.component.html`.

---

## **Types of Content Projection**

There are three main types of content projection:

1. **Single Slot Projection**
2. **Multi-slot Projection**
3. **Conditional Projection (Using Selectors)**

---

### **1️⃣ Single Slot Projection (Default)**

This is the simplest form of content projection where `<ng-content>` is used once.

#### **Example**

```html
<ng-content></ng-content>
```

✅ All content inside the component tag gets projected into the `<ng-content>`.

---

### **2️⃣ Multi-Slot Projection**

Multi-slot projection allows different parts of a component to receive different projected contents using the `select` attribute.

#### **Example: Creating an Advanced Card Component**

#### **Child Component (`card.component.html`)**

```html
<div class="card">
  <header>
    <ng-content select="[card-header]"></ng-content>
  </header>
  <section>
    <ng-content></ng-content>
  </section>
  <footer>
    <ng-content select="[card-footer]"></ng-content>
  </footer>
</div>
```

#### **Parent Component (`app.component.html`)**

```html
<app-card>
  <h2 card-header>Card Header</h2>
  <p>Main card content goes here.</p>
  <small card-footer>Card Footer</small>
</app-card>
```

#### **Rendered Output**

```html
<div class="card">
  <header>
    <h2>Card Header</h2>
  </header>
  <section>
    <p>Main card content goes here.</p>
  </section>
  <footer>
    <small>Card Footer</small>
  </footer>
</div>
```

✅ The `select` attribute filters elements inside the component.

---

### **3️⃣ Conditional Projection with `ng-content`**

Sometimes, you may want to conditionally display projected content.

#### **Example**

```html
<ng-container *ngIf="showHeader">
  <ng-content select="[card-header]"></ng-content>
</ng-container>
<ng-content></ng-content>
<ng-content select="[card-footer]"></ng-content>
```

✅ Using `*ngIf`, we can conditionally show or hide specific projected content.

---

## **Accessing Projected Content in Component Class**

If you need to interact with projected content in your component’s TypeScript file, you can use `@ContentChild` or `@ContentChildren`.

#### **Example Using `@ContentChild`**

```typescript
import { Component, ContentChild, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <div class="card">
      <h2><ng-content select="[card-header]"></ng-content></h2>
      <p><ng-content></ng-content></p>
    </div>
  `,
})
export class CardComponent implements AfterContentInit {
  @ContentChild('card-header', { static: false }) header!: ElementRef;

  ngAfterContentInit() {
    console.log('Projected Header Content:', this.header.nativeElement.innerHTML);
  }
}
```

✅ The `@ContentChild('card-header')` gives access to the projected header element.

---

## **Differences Between `ng-content`, `@Input`, and `ngTemplateOutlet`**

| Feature     | `ng-content`                     | `@Input()`                               | `ngTemplateOutlet`       |
| ----------- | -------------------------------- | ---------------------------------------- | ------------------------ |
| Purpose     | Pass HTML content from parent    | Pass static or dynamic data              | Pass and reuse templates |
| Flexibility | High                             | Moderate                                 | Very High                |
| Reusability | Moderate                         | Low                                      | High                     |
| Use Case    | Wrapping components, reusable UI | Passing data (strings, numbers, objects) | Dynamic templates        |

---

## **Key Takeaways**

✅ `ng-content` allows parent components to pass HTML content into child components.  
✅ Single-slot, multi-slot, and conditional projections enable flexible UI designs.  
✅ `select` inside `<ng-content>` allows filtering specific elements.  
✅ `@ContentChild` and `@ContentChildren` give access to projected content.  
✅ It's useful for creating highly reusable and customizable components.

Would you like to see more advanced real-world examples? 🚀
