import React, { useState, useMemo, useEffect, createContext } from 'react'

import checkDetails from './form.check';

export const FormContext = createContext({
    formState: '',
    setFormState: () => {},
    formPrices: {},
    credentials: {},
    setCredentials: () => {},
    program: {},
    setProgram: () => {},
    strava: {},
    setStrava: () => {},
    sumStrava: 0,
    sumProgram: 0
});

const FormContextProvider = ({ children }) => {
    // use key to secure POST to backend
    const [sessionKey, changeSessionKey] = useState('ahoj');

    const [formPrices, setFormPrices] = useState({});

    const [formState, setFormState] = useState('initial');

    const [credentials, setCredentialsHook] = useState({
        name: [],
        sname: [],
        mail: [],
        byear: [],
        street: [],
        streetNo: [],
        postcode: [],
        town: [],
        note: [],
        accomodation: [true],
        vegetarian: [false]
    });
    const setCredentials = (tag, value) => {
        let fieldDetails = checkDetails[tag],
        error = 0;

        if (fieldDetails === undefined) {
            // not allowed field
            return;
        }

        if (fieldDetails.regex && value.length > 1){
            error = !fieldDetails.regex.test( value );
        }

        setCredentialsHook({ ...credentials, [tag]: [value, error] });
    };
    const [strava, setStrava] = useState({});

    const [program, setProgram] = useState({});

    useEffect(() => {
        // get session key with API key
        fetch('/prihlaska.php', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                action: 'getSessionKey',
                key: sessionKey
            })
        }).then(data => data.text())
        .then(data => changeSessionKey(data));
    }, [sessionKey]);

    const sumStrava = useMemo(() => {

    }, [strava]),
    sumProgram = useMemo(() => {

    }, [program]);

    const total = useMemo(() => sumStrava + sumProgram, [sumStrava, sumProgram]);

    return (
        <FormContext.Provider value={{
            formState,
            setFormState,
            formPrices,
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