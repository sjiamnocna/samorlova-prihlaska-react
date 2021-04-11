import React, { useState, useMemo, useEffect, createContext } from 'react'

import checkDetails from './form.check';

export const FormContext = createContext({
    formState: '',
    setFormState: () => {},
    credentials: {},
    setCredentials: (tag, value) => {},
    program: {},
    setProgram: () => {},
    strava: {},
    setStrava: () => {},
    sumStrava: 0,
    sumProgram: 0
});

const FormContextProvider = ({ children }) => {
    const [formState, setFormState] = useState('initial');

    const [credentials, setCredentialsHook] = useState({
        name: '',
        sname: '',
        mail: '',
        byear: '',
        street: '',
        streetNo: '',
        postcode: '',
        town: '',
        accomodation: true,
        vegetarian: false
    });
    const setCredentials = (tag, value) => {
        let fieldDetails = checkDetails[tag];

        if (fieldDetails === undefined) {
            // not allowed field
            return;
        }

        setCredentialsHook({ ...credentials, [tag]: value });

    };
    const [strava, setStrava] = useState({});

    const [program, setProgram] = useState({});

    const sumStrava = useMemo(() => {

    }, [strava]),
    sumProgram = useMemo(() => {

    }, [program]);

    const total = useMemo(() => sumStrava + sumProgram, [sumStrava, sumProgram]);

    return (
        <FormContext.Provider value={{
            formState,
            setFormState,
            credentials,
            setCredentials,
            program,
            setProgram,
            strava,
            setStrava
        }}>
            {children}
        </FormContext.Provider>
    );
}

export default FormContextProvider;