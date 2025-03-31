### Pipes In Angular :

# Angular Built-in Pipes

## Introduction

Angular provides a set of built-in pipes that allow developers to transform data in templates easily. A pipe is essentially a function that takes input data, processes it, and outputs the transformed data. Pipes are useful for formatting dates, numbers, strings, and even collections of data.

## Date Pipe

The **Date Pipe** is used to format date values into different formats. By default, when a date is displayed in an Angular template without any formatting, it appears in a non-user-friendly manner. The Date Pipe helps convert the date into a more readable format.

### Example:

#### Without Date Pipe:

```html
<p>{{ startDate }}</p>
```

Output:

```
Sat Jan 01 2000 00:00:00 GMT+0530 (India Standard Time)
```

#### With Date Pipe:

```html
<p>{{ startDate | date }}</p>
```

Output:

```
Jan 1, 2000
```

The default format applied is: `MMM d, y`.

### Custom Formats

You can specify custom formats using parameters:

```html
<p>{{ startDate | date: 'MM/dd/yy' }}</p>
```

Output:

```
01/01/00
```

To display the full year, use:

```html
<p>{{ startDate | date: 'MMMM d, yyyy' }}</p>
```

Output:

```
January 1, 2000
```

## Uppercase, Lowercase, and Titlecase Pipes

These pipes are used for formatting string values.

- **Uppercase Pipe**: Converts all characters to uppercase.
- **Lowercase Pipe**: Converts all characters to lowercase.
- **Titlecase Pipe**: Capitalizes the first letter of each word.

### Example:

```html
<p>{{ title | uppercase }}</p>
<p>{{ title | lowercase }}</p>
<p>{{ title | titlecase }}</p>
```

#### Input:

```
Angular Core Deepdive
```

#### Output:

```
ANGULAR CORE DEEPDIVE
angular core deepdive
Angular Core Deepdive
```

## Number Pipe

The **Number Pipe** is used for formatting numbers with decimal places, digit grouping, and more.

### Example:

```html
<p>{{ price | number }}</p>
<p>{{ price | number: '3.3-5' }}</p>
```

#### Input:

```
price = 999;
```

#### Output:

```
999
999.000
```

Explanation:

- `3` → Minimum number of integer digits.
- `3` → Minimum fraction digits.
- `5` → Maximum fraction digits.

If a number exceeds the maximum fraction digits, it gets rounded off.

## Currency Pipe

The **Currency Pipe** is used to format numbers as currency values.

### Example:

```html
<p>{{ price | currency }}</p>
<p>{{ price | currency:'EUR' }}</p>
<p>{{ price | currency:'INR' }}</p>
```

#### Output:

```
$999.00
€999.00
₹999.00
```

By default, it uses USD. You can specify a different currency by passing an argument.

## Percent Pipe

The **Percent Pipe** is used to format numbers as percentages.

### Example:

```html
<p>{{ rate | percent }}</p>
```

#### Input:

```
rate = 0.67;
```

#### Output:

```
67%
```

## Slice Pipe

The **Slice Pipe** is used to extract a portion of an array, similar to JavaScript's `slice` method.

### Example:

```html
<p *ngFor="let course of courses | slice:0:2">{{ course }}</p>
```

This will display only the first two elements from the `courses` array.

## JSON Pipe

The **JSON Pipe** converts objects into a JSON string, which is useful for debugging.

### Example:

```html
<pre>{{ courses | json }}</pre>
```

Output:

```json
[
  { "id": 1, "title": "Angular Basics" },
  { "id": 2, "title": "Advanced Angular" }
]
```

## KeyValue Pipe

The **KeyValue Pipe** transforms an object into an array of key-value pairs.

### Example:

```html
<div *ngFor="let pair of course | keyvalue">{{ pair.key }}: {{ pair.value }}</div>
```

#### Input:

```json
{
  "title": "Angular Basics",
  "duration": "3 hours"
}
```

#### Output:

```
title: Angular Basics
duration: 3 hours
```

## Conclusion

Angular provides several built-in pipes for formatting and transforming data efficiently. Using pipes makes the templates cleaner and more readable. Pipes like **DatePipe, CurrencyPipe, PercentPipe, UppercasePipe, LowercasePipe, TitleCasePipe, NumberPipe, JSONPipe, SlicePipe, and KeyValuePipe** help in formatting various types of data directly in templates without additional logic in the component.

In the next lesson, we will explore advanced Angular features like local template querying with the **ViewChild** decorator.
