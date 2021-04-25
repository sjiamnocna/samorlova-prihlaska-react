import React, { useState, useMemo, useEffect, createContext } from 'react'

import checkDetails from './form.check';

import prices from '../sam_prices.json';

export const FormContext = createContext({
    loading: 0,
    setLoading: () => { },
    dataCorrect: false,
    setDataCorrect: () => { },
    formPrices: {},
    credentials: {},
    setCredentials: () => { },
    program: {},
    setProgram: () => { },
    strava: {},
    setStrava: () => { },
    sumStrava: 0,
    sumProgram: 0,
    total: 0
});

const FormContextProvider = ({ children }) => {
    // use initial key to get session key secure POST request to backend
    const [sessionKey, changeSessionKey] = useState('prihlaska-sam');

    // want to use AJAX later
    const [formPrices, setFormPrices] = useState(prices);

    const [dataCorrect, setDataCorrect] = useState(false);

    const [loading, setLoading] = useState(0);

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

        if (fieldDetails.regex && value.length > 1) {
            error = !fieldDetails.regex.test(value);
        }

        setCredentialsHook({ ...credentials, [tag]: [value, error] });
    };
    const [strava, setStrava] = useState({});

    const [program, setProgramHook] = useState({});

    const setProgram = (tag, value) => {


        let newValues = strava;
        formPrices[tag].options.map((item, i) => {
            newValues[[tag + '.' + i]] = value;
        });
        setStrava(newValues);

        setProgramHook({ ...program, [tag]: value });
    };

    useEffect(() => {
        // get session key with API key
        fetch('http://localhost:8000/prihlaska.php', {
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
        }).then(data => data.json())
            .then(data => changeSessionKey(data.key));
    }, [sessionKey]);

    const sumStrava = useMemo(() => {
        let res = 0;
        for (let day in prices) {
            prices[day].options.map((item, i) => {
                if (strava[day + '.' + i]) {
                    res += prices[day].options[i].price;
                }
            });
        }
        return res;
    }, [strava, program]);

    const sumProgram = useMemo(() => {
        let res = 0;
        for (let day in prices) {
            if (program[day]) {
                res += prices[day].price;
            }
        }
        return res;
    }, [program]);

    const total = useMemo(() => sumStrava + sumProgram, [sumStrava, sumProgram]);

    return (
        <FormContext.Provider value={{
            loading,
            setLoading,
            dataCorrect,
            setDataCorrect,
            formPrices,
            credentials,
            setCredentials,
            program,
            setProgram,
            strava,
            setStrava,
            sumProgram,
            sumStrava,
            total
        }}>
            {children}
        </FormContext.Provider>
    );
}

export default FormContextProvider;