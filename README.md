# Emergency Hotline - Bangladesh Emergency Services Directory

A responsive web application that provides quick access to various emergency contact numbers in Bangladesh. Built with HTML, CSS, and JavaScript.

## Features

- Emergency Service Directory with 9 different emergency services
- Interactive features: heart/like, copy to clipboard, call simulation with coin system, call history
- Responsive design for mobile and desktop
- Local storage for data persistence

## Emergency Services Included

1. National Emergency Number - 999
2. Police Helpline - 999
3. Fire Service - 999
4. Ambulance Service - 1994-999999
5. Women & Child Helpline - 109
6. Anti-corruption Helpline - 106
7. Electricity Helpline - 16216
8. BRAC Helpline - 16445
9. Railway Helpline - 163

## Technologies Used

- HTML5, CSS3, JavaScript (ES6+)
- Font Awesome icons
- Local Storage API

## How to Use

- Browse emergency services
- Like services with heart button
- Copy numbers to clipboard
- Simulate calls (costs coins)
- View and clear call history

## JavaScript Questions and Answers

### 1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll

- `getElementById(id)`: Returns a single element with the specified ID.
- `getElementsByClassName(className)`: Returns a live HTMLCollection of elements with the specified class.
- `querySelector(selector)`: Returns the first element matching the CSS selector.
- `querySelectorAll(selector)`: Returns a static NodeList of all elements matching the CSS selector.

### 2. How to create and insert a new element into the DOM

- Use `document.createElement(tagName)` to create an element.
- Set attributes or content.
- Insert into DOM using methods like `appendChild()` or `insertBefore()`.

Example:
```js
const newDiv = document.createElement('div');
newDiv.textContent = 'Hello World';
document.body.appendChild(newDiv);
```

### 3. What is Event Bubbling and how does it work?

- Event bubbling is when an event propagates from the target element up through its ancestors.
- Allows parent elements to listen for events on child elements.

### 4. What is Event Delegation in JavaScript? Why is it useful?

- Event delegation uses a single event listener on a parent to handle events on its children.
- Useful for dynamic content and improves performance by reducing event listeners.

### 5. Difference between preventDefault() and stopPropagation()

- `preventDefault()`: Prevents the default browser action (e.g., link navigation).
- `stopPropagation()`: Stops the event from bubbling or capturing further.

---

This README was written based on knowledge and understanding of JavaScript and web development best practices.
