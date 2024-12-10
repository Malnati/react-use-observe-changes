# useObserveChanges

[![npm version](https://badge.fury.io/js/react-use-observe-changes.svg)](https://www.npmjs.com/package/react-use-observe-changes)

The `useObserveChanges` is a custom React hook that observes changes in specific fields and updates the associated state. It is particularly useful for tracking and managing the state of multiple fields efficiently within a React component.

---

## Installation

Install the package via npm:
```bash
npm install react-use-observe-changes
```

## Usage

To use `useObserveChanges`, import the hook into your component:

## Basic Example

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

## API

`useObserveChanges(logLevelDesc?: string)`

A hook that observes changes in specific fields and updates the associated state.

*Returns:*
- *getInstance(_instance: string)*: object | undefined
Retrieves the state of a registered instance.
- *observeFieldOf(_instance: string, _field: string, _value: any)*: void
Observes changes in a specific field of an instance.
- *unobserveFieldOf(_instance: string, _field: string)*: void
Stops observing a specific field of an instance.
- *reset()*: void
Resets the state of all observed instances.

## Examples

### Observing changes in a field

```typescript
const { observeFieldOf, getInstance } = useObserveChanges();

// Observe changes in a specific field
observeFieldOf('user', 'name', 'John');

// Retrieve the state of the instance
console.log(getInstance('user')); // { name: 'John' }
```

### Removing an observed field

```typescript
const { observeFieldOf, unobserveFieldOf, getInstance } = useObserveChanges();

observeFieldOf('user', 'name', 'John');
unobserveFieldOf('user', 'name');

console.log(getInstance('user')); // {}
```

### Resetting the state

```typescript
const { observeFieldOf, reset, getInstance } = useObserveChanges();

observeFieldOf('user', 'name', 'John');
reset();

console.log(getInstance('user')); // undefined
```

## Notes
- The state is stored in memory and persists as long as the component using the hook is mounted.
- The hook supports multiple instances and multiple fields per instance.
- There is no explicit limit to the number of instances or fields, but excessive use may impact performance.

## Conclusion

The `useObserveChanges` hook provides a simple and efficient way to track changes in multiple fields within a React component. It is especially useful for dynamic forms and components requiring granular state tracking.
