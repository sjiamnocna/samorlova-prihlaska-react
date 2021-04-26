import React, { useState, useMemo, useEffect, createContext } from 'react'

import checkDetails from './form.check';

import prices from '../sam_prices.json';

export const FormContext = createContext({
    loading: 0,
    setLoading: () => { },
    messages: [],
    dataCorrect: false,
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
    const [loading, setLoading] = useState(0);
    const [messages, setMessages] = useState([]);

    // want to use AJAX later
    const [formPrices, setFormPrices] = useState(prices);

    const [credentials, setCredentialsHook] = useState({
        name: ['Aaaa'],
        sname: ['Bbbbb'],
        mail: ['Cccc'],
        byear: [1234],
        street: ['Lalalal'],
        streetNo: ['1234'],
        postcode: ['12355'],
        town: ['Dsdfasd'],
        // define default because of data check
        note: [''],
        accomodation: [true],
        vegetarian: [false]
    });

    const [strava, setStrava] = useState({});

    const [program, setProgramHook] = useState({});
    
    const addMessage = (text) => {
        let key = messages.length;

        setMessages([
            ...messages,
            text
        ]);

        // return removing function
        return () => {
            setMessages( messages.filter((item, i) => i !== key ) );
        };
    };

    /**
     * Set credentials AND check values are correct
     * @param string    tag     Name of the attribute to set
     * @param mixed     value   Value to set. Will be autochecked by tag rules
     */
    const setCredentials = (tag, value) => {
        let fieldDetails = checkDetails[tag],
            error = 0,
            removeErrorMessage = credentials[tag][2] ?? false,
            regex = fieldDetails.regex ?? false,
            minimalLength = fieldDetails.minimalLength ?? 0;

        if (fieldDetails === undefined) {
            // not allowed field
            throw new 'Unknown field in form!!!';
        }

        // check minimal length
        error = value.length < minimalLength;
        // if error, check nothing | if regex check is set, do it
        error = error || regex && !regex.test(value);
        
        if(error){
            if(!removeErrorMessage){
                removeErrorMessage = addMessage(fieldDetails.errorMessage);
            }
        } else {
            if(removeErrorMessage){
                removeErrorMessage = removeErrorMessage();
            }
        }

        setCredentialsHook({ ...credentials, [tag]: [value, error, removeErrorMessage] });
    };

    /**
     * Add day to "cart" and also un/set food for that day
     * @param int       Index of that day
     * @param boolean   If item is active or not 
     */
    const setProgram = (tag, value) => {
        let checkStravaColumn = strava;
        for(let i in formPrices[tag].options){
            checkStravaColumn[[tag + '.' + i]] = value;
        }
        // set all checkbox value in column
        setStrava(checkStravaColumn);
        // set program data
        setProgramHook({ ...program, [tag]: value });
    };

    /**
     * Calculate food price using memo to save some effort on difficult operation
     * Program must stay as dependency
     */
    const sumStrava = useMemo(() => {
        let res = 0;
        for (let day in prices) {
            for (let jidlo in prices[day].options){
                if (strava[day + '.' + jidlo]){
                    res += prices[day].options[jidlo].price;
                }
            }
        }
        return res;
    }, [strava, program]);

    /**
     * Calculating program price using memo
     */
    const sumProgram = useMemo(() => {
        let res = 0;
        for (let day in prices) {
            if (program[day]) {
                res += prices[day].price;
            }
        }
        return res;
    }, [program]);

    /**
     * Walk through data and check everything is OK
     */
    const dataCorrect = useMemo(() => {
        for (let i in credentials){
            // if any error occurs
            let item = credentials[i] ?? false,
                error = credentials[i][1] ?? false;
            if (!item || item.length === 0 || error){
                return false;
            }
        }
        // evrythings fine
        return true;
    }, [credentials]);

    /**
     * Sum of all prices
     */
    const total = useMemo(() => sumStrava + sumProgram, [sumStrava, sumProgram]);

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

    return (
        <FormContext.Provider value={{
            loading,
            setLoading,
            messages,
            dataCorrect,
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