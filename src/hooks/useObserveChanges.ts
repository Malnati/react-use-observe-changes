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
 * - `unobserveField`: Function to stop observing a field.
 * - `instance`: The state of the observed instance fields.
 * - `getInstance`: Function to retrieve an instance.
 * - `observeInstance`: Function to observe changes in an instance field.
 * - `observeFieldOf`: Function to observe changes in a field of an instance.
 * - `unobserveFieldOf`: Function to stop observing a field of an instance.
 * - `resetFields`: Function to reset the observed fields state.
 * - `resetInstance`: Function to reset the observed instance state.
 * - `resetAll`: Function to reset both fields and instance states.
 * 
 * @example
 * const { fields, observeField, instance, observeInstance, resetFields, resetInstance, resetAll } = useObserveChanges();
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
 * // Stop observing a field
 * unobserveField('fieldName');
 * 
 * // Reset the observed fields state
 * resetFields();
 * 
 * // Observe changes in an instance field
 * observeInstance('instanceFieldName', 'on');
 * 
 * // Observe changes in an instance field with a specific value
 * observeInstance('instanceFieldName', newValue);
 * 
 * // Access the state of the observed instance fields
 * console.log(instance);
 * 
 * // Stop observing a field of an instance
 * unobserveFieldOf('instanceName', 'fieldName');
 * 
 * // Reset the observed instance state
 * resetInstance();
 * 
 * // Reset both fields and instance states
 * resetAll();
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
     * @param _value - The value to be observed.
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
     * Function to stop observing a field.
     * @author Ricardo Malnati
     * 
     * @param _key - The name of the field to stop observing.
     * 
     * @example
     * // Stop observing a field
     * unobserveField('lastName');
     */
    const unobserveField = (_key: string) => {
        const { [_key]: _, ...newObject } = fields;
        setFields(newObject);
    };

   /**
     * Function to observe changes in an instance.
     * @author Ricardo Malnati
     * 
     * @param _key - The name of the instance field to be observed.
     * @param _value - The value to be observed.
     * 
     * @example
     * // Observe changes in an instance field with a specific value from an event
     * observeInstance('lastName', e.target.value);
     */
    const observeInstance = (_key: string, _instance: { [key: string]: {} }) => {
        const newInstance = {
            // Spread operator to include all existing observed instances
            ...instance,
            // Add or update the instance object with the new value
            [_key]: _instance
        };
        setInstance(newInstance);
    };

    /**
      * Function to observe changes in a field of an instance.
      * @author Ricardo Malnati
      * 
      * @param _instance - The name of the instance field to be observed.
      * @param _field - The name of the field of an instance to be observed.
      * @param _value - The value to be observed.
      * 
      * @example
      * // Observe changes in an instance field with a specific value from an event
      * observeFieldOf('myThing', 'myField', e.target.value);
      */
     const observeFieldOf = (_instance: string, _field:string, _value: any) => {
         const oldInstance: { [key: string]: { [key: string]: {} } } = instance[_instance];
         if (!oldInstance) throw new Error(`Instance ${_instance} not found, please create it first using observeInstance('nameOfYourInstance', {})`);
         const newInstance = {
            // Spread operator to include all existing observed fields
            ...instance,
            // Add or update the field with the new value
            [_field]: _value
        };
        setInstance(newInstance);
     };

    /**
      * Function to Retrieve an instance.
      * @author Ricardo Malnati
      * 
      * @param _instance - The name of the instance field to be obtained.
      * 
      * @example
      * // Retrieve an instance.
      * getInstance('myThing');
      */
     const getInstance = (_instance: string) => {
        const current: { [key: string]: { [key: string]: {} } } = instance[_instance];
        if (!current) console.warn(`Instance ${_instance} not found, please create it first using observeInstance('nameOfYourInstance', {})`);
        return current;
     };

     /**
      * Function to stop observing a field of an instance.
      * @author Ricardo Malnati
      * 
      * @param _instance - The name of the instance.
      * @param _field - The name of the field to stop observing.
      * 
      * @example
      * // Stop observing a field of an instance
      * unobserveFieldOf('user', 'lastName');
      */
     const unobserveFieldOf = (_instance: string, _field: string) => {
        const oldInstance: { [key: string]: { [key: string]: {} } } = instance[_instance];
        if (!oldInstance) throw new Error(`Instance ${_instance} not found, please create it first using observeInstance('nameOfYourInstance', {})`);
        const oldField = oldInstance[_field];
        if (!oldField) throw new Error(`Field ${_field} not found in ${_instance}, please create it first using observeFieldOf('myThing', 'myField', e.target.value)`);
        const newObject = {
            // Spread operator to include all existing observed fields
            ...oldInstance,
        }
        // remove the field from the instance
        delete newObject[_field];
        setInstance(newObject);
     };

    /**
     * Function to reset the observed fields state.
     * @author Ricardo Malnati
     * 
     * @example
     * // Reset the observed fields state
     * resetFields();
     */
    const resetFields = () => {
        setFields({});
    };

    /**
     * Function to reset the observed instance state.
     * @author Ricardo Malnati
     * 
     * @example
     * // Reset the observed instance state
     * resetInstance();
     */
    const resetInstance = () => {
        setInstance({});
    };

    /**
     * Function to reset both fields and instance states.
     * @author Ricardo Malnati
     * 
     * @example
     * // Reset both fields and instance states
     * resetAll();
     */
    const resetAll = () => {
        resetFields();
        resetInstance();
    };
    
    return {
        fields,
        observeField,
        unobserveField,
        getInstance,
        observeInstance,
        observeFieldOf,
        unobserveFieldOf,
        resetFields,
        resetInstance,
        resetAll
    };
};

export default useObserveChanges;