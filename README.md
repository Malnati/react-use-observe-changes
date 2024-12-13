# useObserveChanges

[![npm version](https://badge.fury.io/js/react-use-observe-changes.svg)](https://www.npmjs.com/package/react-use-observe-changes)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/Malnati/react-use-observe-changes/ci.yml)](https://github.com/Malnati/react-use-observe-changes/actions)
[![Downloads](https://img.shields.io/npm/dt/react-use-observe-changes)](https://www.npmjs.com/package/react-use-observe-changes)

The `useObserveChanges` is a custom React hook that observes changes in specific fields and updates the associated state. It is particularly useful for tracking and managing the state of multiple fields efficiently within a React component.

---

## Features

- **Dynamic State Tracking**: Tracks specific fields dynamically across multiple instances.
- **Lightweight**: Efficiently handles state with minimal overhead.
- **Flexible API**: Supports observing, unobserving, and resetting fields dynamically.

---

## Installation

Install the package via npm:
```bash
npm install react-use-observe-changes
```

---

## Usage

To use `useObserveChanges`, import the hook into your component:

### Basic Example

```typescript
import React from 'react';
import useObserveChanges from 'react-use-observe-changes';

const MyComponent = () => {
    const { observeFieldOf, getInstance } = useObserveChanges();

    const handleFirstnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        observeFieldOf('person', 'firstName', e.target.value);
    };

    const handleLastnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        observeFieldOf('person', 'lastName', e.target.value);
    };

    return (
        <div>
            <input name="firstName" onChange={handleFirstnameChange} placeholder="First Name" />
            <input name="lastName" onChange={handleLastnameChange} placeholder="Last Name" />
            <pre>{JSON.stringify(getInstance('person'), null, 2)}</pre>
        </div>
    );
};

export default MyComponent;
```

---

## API

### `useObserveChanges(logLevelDesc?: string)`

A hook that observes changes in specific fields and updates the associated state.

#### Methods:
- **`getInstance(instance: string): object | undefined`**
  Retrieves the state of a registered instance.

- **`observeFieldOf(instance: string, field: string, value: any): void`**
  Observes changes in a specific field of an instance.

- **`unobserveFieldOf(instance: string, field: string): void`**
  Stops observing a specific field of an instance.

- **`reset(): void`**
  Resets the state of all observed instances.

---

## Examples

### Observing Changes in a Field

```typescript
const { observeFieldOf, getInstance } = useObserveChanges();

// Observe changes in a specific field
observeFieldOf('user', 'name', 'John');

// Retrieve the state of the instance
console.log(getInstance('user')); // { name: 'John' }
```

### Removing an Observed Field

```typescript
const { observeFieldOf, unobserveFieldOf, getInstance } = useObserveChanges();

observeFieldOf('user', 'name', 'John');
unobserveFieldOf('user', 'name');

console.log(getInstance('user')); // {}
```

### Resetting the State

```typescript
const { observeFieldOf, reset, getInstance } = useObserveChanges();

observeFieldOf('user', 'name', 'John');
reset();

console.log(getInstance('user')); // undefined
```

---

## Visual Overview

### What is useObserveChanges?

![What is useObserveChanges](https://raw.githubusercontent.com/Malnati/react-use-observe-changes/main/docs/3-useObserveChanges-What-is.png)

### Core Features

![Core Features](https://raw.githubusercontent.com/Malnati/react-use-observe-changes/main/docs/4-useObserveChanges-Core-Features.png)

### How to Use

![How to Use](https://raw.githubusercontent.com/Malnati/react-use-observe-changes/main/docs/2-useObserveChanges-Usage.png)

---

## Notes

- The state is stored in memory and persists as long as the component using the hook is mounted.
- The hook supports multiple instances and multiple fields per instance.
- There is no explicit limit to the number of instances or fields, but excessive use may impact performance.

---

## Contribution

Contributions are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Add new feature"`).
4. Push the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Learn More

Visit the [GitHub Pages](https://malnati.github.io/react-use-observe-changes) for a detailed overview and documentation.
