# **Understanding the @Input Decorator in Angular**

## **Introduction**

In this lesson, we will explore how to pass data between components in Angular using the `@Input` decorator. We will create an example application to demonstrate this concept practically.

## **Scenario: Building a Product Card Component**

Imagine we are building an e-commerce application where we display different products using a `ProductCardComponent`. Each product has a **name, price, image, and description**. Our goal is to pass these details dynamically from the parent component (`AppComponent`) to the child component (`ProductCardComponent`).

## **Setting Up the Parent Component**

Our `AppComponent` will contain a list of products that we will pass to multiple instances of `ProductCardComponent`.

### **Define Product Data in AppComponent**

First, we define a **TypeScript interface** for our product data.

```typescript
// models/product.ts
export interface Product {
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}
```

Now, let's create the product list in our `AppComponent`:

```typescript
import { Component } from '@angular/core';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  products: Product[] = [
    {
      name: 'Smartphone',
      price: 699,
      imageUrl: 'assets/smartphone.jpg',
      description: 'A high-end smartphone with excellent camera features.',
    },
    {
      name: 'Laptop',
      price: 1299,
      imageUrl: 'assets/laptop.jpg',
      description: 'A powerful laptop for professionals and gamers.',
    },
    {
      name: 'Headphones',
      price: 199,
      imageUrl: 'assets/headphones.jpg',
      description: 'Noise-canceling wireless headphones with deep bass.',
    },
  ];
}
```

## **Creating the ProductCardComponent**

Our goal is to pass individual product details from `AppComponent` to `ProductCardComponent` dynamically using the `@Input` decorator.

### **Define Input Property in ProductCardComponent**

```typescript
import { Component, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
}
```

### **Update the Template to Use Input Data**

```html
<!-- product-card.component.html -->
<div class="product-card">
  <img [src]="product.imageUrl" alt="{{ product.name }}" />
  <h2>{{ product.name }}</h2>
  <p>{{ product.description }}</p>
  <h3>Price: ${{ product.price }}</h3>
</div>
```

## **Passing Data from AppComponent to ProductCardComponent**

In `app.component.html`, we loop through the `products` array and pass each product to a `ProductCardComponent` instance.

```html
<!-- app.component.html -->
<div class="product-list">
  <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
</div>
```

### **Understanding the Data Flow**

- `AppComponent` contains the **list of products**.
- The `*ngFor` directive creates multiple `ProductCardComponent` instances, each receiving a **unique product object** as input.
- Inside `ProductCardComponent`, the `@Input` decorator binds the received product object to the template.
- The product details (name, price, description, image) are displayed dynamically.

## **Aliasing @Input Properties**

Sometimes, we may want to use a different property name in the child component than the one used in the parent. Angular allows us to **alias** input properties using the following syntax:

```typescript
@Input('item') product!: Product;
```

Now, instead of passing `[product]` in the parent component, we must pass `[item]`:

```html
<!-- Using aliasing in app.component.html -->
<app-product-card *ngFor="let product of products" [item]="product"></app-product-card>
```

### **Why Use Aliasing?**

- Avoid conflicts with existing property names in the child component.
- Improve readability when dealing with large or complex data structures.
- Maintain consistency with API responses or backend naming conventions.

## **Making Inputs Required**

Using `{ required: true }`, we ensure that Angular throws an **error at compile-time** if the input is missing.

```typescript
@Input({ required: true }) product!: Product;
```

This prevents potential runtime errors and ensures data integrity.

## **Conclusion**

The `@Input` decorator in Angular is a powerful mechanism for passing data from a **parent component** to a **child component**. Here’s what we covered:

- Defined an **interface** for structured data.
- Created a **ProductCardComponent** that receives input using `@Input`.
- Used property binding (`[]`) to pass data dynamically.
- Utilized `*ngFor` to generate multiple component instances dynamically.
- Made the input **required** to enforce proper data passing.
- **Used aliasing** to rename input properties for better readability and maintainability.

This pattern is commonly used in Angular applications to create **reusable, dynamic components**.

In the next lesson, we will explore **component outputs** and how to emit events from a child component to a parent component.
