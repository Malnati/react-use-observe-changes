// src/hooks/useObserveChanges.ts

import { useState } from 'react';

/**
 * Hook that observes changes in fields and instances, and updates the observed state.
 * @author Ricardo Malnati
 * 
 * This hook provides functions to observe changes in specific fields and instances,
 * and maintains a state with the observed values.
 * 
 * @returns An object containing:
 * - `fields`: The state of the observed fields.
 * - `observeField`: Function to observe changes in a field.
 * - `instance`: The state of the observed instance fields.
 * - `observeInstance`: Function to observe changes in an instance field.
 * 
 * @example
 * const { fields, observeField, instance, observeInstance } = useObserveChanges();
 * 
 * // Observe changes in a field
 * observeField('fieldName', 'on');
 * 
 * // Observe changes in a field with a specific value
 * observeField('fieldName', newValue);
 * 
 * // Access the state of the observed fields
 * console.log(fields);
 * 
 * // Observe changes in an instance field
 * observeInstance('instanceFieldName', 'on');
 * 
 * // Observe changes in an instance field with a specific value
 * observeInstance('instanceFieldName', newValue);
 * 
 * // Access the state of the observed instance fields
 * console.log(instance);
 */
const useObserveChanges = () => {

    /**
     * State to hold the observed fields and their values.
     * @author Ricardo Malnati
     * 
     * @example
     * // Initial state
     * const [fields, setFields] = useState<{ [key: string]: any }>({});
     * 
     * // After observing changes in a field
     * observeField('fieldName', 'newValue');
     * console.log(fields); // { fieldName: 'newValue' }
     */
    const [fields, setFields] = useState<{ [key: string]: any }>({});

    /**
     * State to hold the instance of the observed fields.
     * @author Ricardo Malnati
     * 
     * @example
     * // Initial state
     * const [instance, setInstance] = useState<{ [key: string]: {} }>({});
     * 
     * // After setting an instance
     * setInstance({ fieldName: {} });
     * console.log(instance); // { fieldName: {} }
     */
    const [instance, setInstance] = useState<{ [key: string]: {} }>({});

    /**
     * Function to observe changes in a field.
     * @author Ricardo Malnati
     * 
     * @param _key - The name of the field to be observed.
     * @param _value - The value to be observed. If it is 'on', the value will be toggled.
     * 
     * @example
     * // Observe changes in a field with a specific value from an event
     * observeField('lastName', e.target.value);
     */
    const observeField = (_key: string, _value: any) => {
        const newObject = {
            // Spread operator to include all existing observed fields
            ...fields,
            // Add or update the field with the new value
            [_key]: _value
        };
        setFields(newObject);
    };

   /**
     * Function to observe changes in an instance.
     * @author Ricardo Malnati
     * 
     * @param _key - The name of the instance field to be observed.
     * @param _value - The value to be observed. If it is 'on', the value will be toggled.
     * 
     * @example
     * // Observe changes in an instance field with a specific value from an event
     * observeInstance('lastName', e.target.value);
     */
    const observeInstance = (_key: string, _instance: {}) => {
        const newInstance = {
            // Spread operator to include all existing observed instances
            ...instance,
            // Add or update the instance object with the new value
            [_key]: _instance
        };
        setInstance(newInstance);
    };

    /**
     * Hook that observes changes in fields and instances, and updates the observed state.
     * @author Ricardo Malnati 
     * 
     * This hook provides functions to observe changes in specific fields and instances,
     * and maintains a state with the observed values.
     * 
     * @returns An object containing:
     * - `fields`: The state of the observed fields.
     * - `observeField`: Function to observe changes in a field.
     * - `instance`: The state of the observed instance fields.
     * - `observeInstance`: Function to observe changes in an instance field.
     * 
     * @example
     * const { fields, observeField, instance, observeInstance } = useObserveChanges();
     * 
     * // Observe changes in a field
     * observeField('fieldName', 'on');
     * 
     * // Observe changes in a field with a specific value
     * observeField('fieldName', newValue);
     * 
     * // Access the state of the observed fields
     * console.log(fields);
     * 
     * // Observe changes in an instance field
     * observeInstance('instanceFieldName', 'on');
     * 
     * // Observe changes in an instance field with a specific value
     * observeInstance('instanceFieldName', newValue);
     * 
     * // Access the state of the observed instance fields
     * console.log(instance);
     */
    return {
        fields,
        observeField,
        instance,
        observeInstance
    };
};

export default useObserveChanges;