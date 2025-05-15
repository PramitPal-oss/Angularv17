# Basic

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.14.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Assignment

Sure! Here's an Angular assignment that covers:

- `@ViewChild` and `@ViewChildren` for accessing child components/elements
- `@ContentChild` and `@ContentChildren` for content projection
- `ng-content` for projecting content inside a component

---

### **Assignment: Build a Tab Component with ViewChild, ViewChildren, and Content Projection**

#### **Requirements:**

1. Create a **TabContainerComponent** that can hold multiple **TabComponent** instances.
2. Use `@ViewChildren` to access and manage all tab components inside the container.
3. Use `ng-content` to project tab content inside the **TabComponent**.
4. Use `@ContentChild` inside the **TabComponent** to detect projected content.
5. Implement tab switching logic using `@ViewChild`.

---

### **Steps to Follow:**

#### **Step 1: Create Tab Component (`tab.component.ts`)**

- This component will receive projected content (tab title and body).
- Use `@ContentChild` to access the projected content.

#### **Step 2: Create Tab Container (`tab-container.component.ts`)**

- Use `@ViewChildren` to manage all tabs.
- Use `@ViewChild` to activate a specific tab.

#### **Step 3: Use the Tab Component in `app.component.html`**

### **Expected Behavior:**

- The first tab is active by default.
- Clicking a tab button switches its content.
- `@ContentChild` detects projected content inside each tab.
- `@ViewChildren` helps manage all tabs inside the container.
- `ng-content` allows dynamic content inside tabs.

---

### **Bonus Challenge:**

- Add a close button to remove tabs dynamically.
- Add a feature to disable specific tabs.

Let me know if you need any clarifications!
