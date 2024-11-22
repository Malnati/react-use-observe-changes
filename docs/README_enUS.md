# useObserveChanges Hook

The `useObserveChanges` is a custom hook that observes changes in specific fields and updates the observed state. This hook is useful for tracking and managing the state of multiple fields in a *React* component.

## Installation

To use `useObserveChanges`, simply import the hook into your component:

## Usage

*Basic Example*

```typescript
import React from 'react';
import useObserveChanges from './hooks/useObserveChanges';

const MyComponent = () => {
    const { observedFields, observeIt } = useObserveChanges();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        observeIt(e.target.name, e.target.value);
    };

    return (
        <div>
            <input name="firstName" onChange={handleChange} />
            <input name="lastName" onChange={handleChange} />
            <pre>{JSON.stringify(observedFields, null, 2)}</pre>
        </div>
    );
};

export default MyComponent;
```

## API

`useObserveChanges`

`Hook` that observes changes in specific fields and updates the observed state.

*Returns*

- `observedFields`: An object containing the state of the observed fields.
- `observeIt`: A function to observe changes in a field.

*Example*

```typescript
const { observedFields, observeIt } = useObserveChanges();

// Observe changes in a field
observeIt('fieldName', 'on');

// Observe changes in a field with a specific value
observeIt('fieldName', newValue);

// Access the state of observed fields
console.log(observedFields);
```

## Observations

- The state is stored in memory and will persist as long as the component using this `hook` is mounted.
- There is no explicit limit to the number of fields that can be observed, but excessive use may impact performance.
- When the component unmounts, the state will be cleared.

*Example*

`observedFields`

```typescript
// Initial state
const [observedFields, setObservedFields] = useState<{ [key: string]: any }>({});

// After observing changes in a field
observeIt('fieldName', 'newValue');
console.log(observedFields); // { fieldName: 'newValue' }
```

`observeIt`

Function to observe changes in a field.

*Parameters*

- `key`: The name of the field to be observed.
- `value`: The value to be observed. If it is 'on', the value will be toggled.

*Example*

```typescript
// Observe changes in a field with a specific value from an event
observeIt('lastName', e.target.value);
```

*Code Explanation*

```typescript
const observeIt = (key: string, value: any) => {
    if (value === 'on') {
        value = !observedFields[key];
    }
    const newObject = {
        // Spread operator to include all existing observed fields
        ...observedFields,
        // Add or update the field with the new value
        [key]: value
    };
    setObservedFields(newObject);
};
```

1. *Spread Operator* (`...observedFields`):
- *What happens*: The spread operator (...) is used to copy all properties from the `observedFields` object to the new `newObject`.
- *For items not found*: If the key (`key`) is not present in `observedFields`, it will be added to the new `newObject` with the provided value (`value`).
- *For items already there*: If the key (`key`) is already present in `observedFields`, the existing value will be overwritten by the new provided value (`value`).
1. *Add or Update the Field* (`[key]: value`):
- *What happens*: The key (`key`) is added or updated in the new `newObject` with the provided value (`value`).
- *For items not found*: The key (`key`) will be added to the new `newObject` with the provided value (`value`).
- *For items already there*: The key (`key`) in the new `newObject` will have its value updated to the new provided value (`value`).

*Conclusion*

The `useObserveChanges` hook is a useful tool for observing and managing changes in specific fields within a *React* component. It provides a simple way to track the state of multiple fields and react to changes efficiently.