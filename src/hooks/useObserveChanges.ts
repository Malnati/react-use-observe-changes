// src/hooks/useObserveChanges.ts

import { useState } from 'react';

/**
 * Hook that observes changes in fields and updates the observed state.
 * 
 * This hook provides a function to observe changes in specific fields and 
 * maintains a state with the observed values.
 * 
 * @returns An object containing the state of the observed fields and the function to observe changes.
 * 
 * @example
 * const { observedFields, observeIt } = useObserveChanges();
 * 
 * // Observe changes in a field
 * observeIt('fieldName', 'on');
 * 
 * // Observe changes in a field with a specific value
 * observeIt('fieldName', newValue);
 * 
 * // Access the state of the observed fields
 * console.log(observedFields);
 */
const useObserveChanges = () => {

    /**
     * State that maintains the values of the observed fields.
     * 
     * The state is initialized as an empty object and will store key-value pairs
     * where the key is the name of the field being observed and the value is the
     * observed value of that field.
     * 
     * @remarks
     * - The state is stored in memory and will persist as long as the component
     *   using this hook is mounted.
     * - There is no explicit limit to the number of fields that can be observed,
     *   but excessive use may impact performance.
     * - When the component unmounts, the state will be cleared.
     * 
     * @example
     * // Initial state
     * const [observedFields, setObservedFields] = useState<{ [key: string]: any }>({});
     * 
     * // After observing changes in a field
     * observeIt('fieldName', 'newValue');
     * console.log(observedFields); // { fieldName: 'newValue' }
     */
    const [observedFields, setObservedFields] = useState<{ [key: string]: any }>({});

    /**
     * Function to observe changes in a field.
     * 
     * @param key - The name of the field to be observed.
     * @param value - The value to be observed. If it is 'on', the value will be toggled.
     * 
     * @example
     * // Observe changes in a field with a specific value from an event
     * observeIt('lastName', e.target.value);
     */
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

    return {
        observedFields,
        observeIt
    };
};

export default useObserveChanges;