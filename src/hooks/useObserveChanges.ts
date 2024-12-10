// src/hooks/useObserveChanges.ts

import { useState } from 'react';
import log, { LogLevelDesc } from 'loglevel';

/**
 * Hook that observes changes in fields and instances, and updates the observed state.
 * @author Ricardo Malnati
 * 
 * This hook provides functions to observe changes in specific fields and instances,
 * and maintains a state with the observed values.
 * 
 * @returns An object containing:
 * - `getInstance`: Function to retrieve an instance.
 * - `observeFieldOf`: Function to observe changes in a field of an instance.
 * - `unobserveFieldOf`: Function to stop observing a field of an instance.
 * - `reset`: Function to reset the observed instance state.
 * 
 * @example
 * const { observeFieldOf, unobserveFieldOf, reset } = useObserveChanges();
 * 
 * // to observe changes in an instance field.
 * observeFieldOf('instanceName', 'fieldName', value);
 * 
 * // Stop observing a field of an instance
 * unobserveFieldOf('instanceName', 'fieldName');
 * 
 * // Reset the observed instance state
 * reset();
 */
const useObserveChanges = (logLevelDesc: string | undefined) => {


    // Set the log level from environment variable or default to 'info'
    const logLevel: string | undefined = ( logLevelDesc ) || 'info';
    log.setLevel(logLevel as LogLevelDesc);

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
    const [instance, setInstance] = useState<{ [key: string]: { [key: string]: any } }>({});

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
         const newInstance = {
            // Spread operator to include all existing observed fields
            ...instance,
            // Add or update the field with the new value
            [_field]: _value
        };
        log.debug(`[useObserveChanges] observeFieldOf (${_instance}, ${_field}, ${_value}) setting ${JSON.stringify(newInstance, null, 2)}`);
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
     const getInstance = (_instance: string): { [key: string]: { [key: string]: {} } } => {
        const current: { [key: string]: { [key: string]: {} } } = instance[_instance];
        log.debug(`[useObserveChanges] getInstance (${_instance}) => ${JSON.stringify(current, null, 2)}`);
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
        log.debug(`[useObserveChanges] unobserveFieldOf (${_instance}, ${_field}) setting ${JSON.stringify(newObject, null, 2)}`);
        setInstance(newObject);
     };

    /**
     * Function to reset the observed instance state.
     * @author Ricardo Malnati
     * 
     * @example
     * // Reset the observed instance state
     * reset();
     */
    const reset = () => {
        log.debug(`[useObserveChanges] resetInstance () called`);
        setInstance({});
    };
    
    return {
        getInstance,
        observeFieldOf,
        unobserveFieldOf,
        reset,
    };
};

export default useObserveChanges;