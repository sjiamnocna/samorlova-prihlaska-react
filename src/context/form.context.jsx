import React, { useState, useMemo, useEffect, createContext } from 'react'

import checkDetails from './form.check';

import fetchData from '../ajax/ajax.func';

const defaultCredentials = {
    name: ['', null],
    sname: ['', null],
    mail: ['', null],
    byear: ['', null],
    street: ['', null],
    streetNo: ['', null],
    postcode: ['', null],
    town: ['', null],
    // define default because of data check
    note: [''],
    accomodation: [true],
    vegetarian: [false]
};

export const FormContext = createContext({
    loading: 0,
    setLoading: () => { },
    submitted: 0,
    submit: () => {},
    reset: () => {},
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
    total: 0,
    responseData: {}
});

const INIT_KEY = 'sampan';

const FormContextProvider = ({ children }) => {
    // use initial key to get session key secure POST request to backend
    const [sessionKey, changeSessionKey] = useState(INIT_KEY);
    const [loading, setLoading] = useState(0);
    const [responseData, setResponseData] = useState({});
    // submit form, submitted status
    const [submitted, setSubmitted] = useState(0);
    const submit = e => {
        e.preventDefault();
        setSubmitted(1);
    };
    const [messages, setMessages] = useState([]);

    // want to use AJAX later
    const [formPrices, setFormPrices] = useState({});

    const [credentials, setCredentialsHook] = useState(defaultCredentials);

    const [donation, setDonation] = useState(null);

    const reset = (hard) => {
        // if hard reset, remove all values
        setCredentialsHook(hard ? defaultCredentials : {
            ...credentials,
            name: ['', 0],
            sname: ['', 0]
        })
        setLoading(0);
        setResponseData({});
    };

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
            throw Error('Unknown field in form!!!');
        }

        // check minimal length
        error = value.length < minimalLength;
        // if error, check nothing | if regex check is set, do it
        error = error || (regex && !regex.test(value));
        
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
        for (let day in formPrices) {
            for (let jidlo in formPrices[day].options){
                if (strava[day + '.' + jidlo]){
                    res += formPrices[day].options[jidlo].price;
                }
            }
        }
        return res;
    }, [strava, program, formPrices]);

    /**
     * Calculating program price using memo
     */
    const sumProgram = useMemo(() => {
        let res = 0;
        for (let day in formPrices) {
            if (program[day]) {
                res += formPrices[day].price;
            }
        }
        return res;
    }, [program, formPrices]);

    /**
     * Walk through data and check everything is OK
     */
    const dataCorrect = useMemo(() => {
        for (let i in credentials){
            // if any error occurs
            let item = credentials[i],
                checkParam = checkDetails[i] ?? false,
                optionalCheck = checkParam.optional ?? false,
                error = item[1] !== false;
            if (optionalCheck){
                // nothing to check
                continue;
            }
            if (error){
                return false;
            }
        }
        // evrythings fine
        return true;
    }, [credentials]);

    /**
     * Sum of all prices
     */
    const total = useMemo(() => sumStrava + sumProgram + donation, [sumStrava, sumProgram, donation]);

    useEffect(() => {
        setLoading(true);
        // get session key with access key
        fetchData({
            'action': 'fetch_session',
            'access-key': sessionKey
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.code){
                setResponseData(res);
            }
            changeSessionKey(res.key);
            setLoading(0);
        });
    }, [sessionKey]);

    useEffect(() => {
        setLoading(true);
        // get prices when session key obtained
        if (sessionKey !== INIT_KEY && !formPrices.length){
            fetchData({
                'action': 'fetch_prices',
                'session-key': sessionKey
            })
            .then((res) => res.json())
            .then((res) => {
                setFormPrices(res);
                setLoading(0);
            })
            .catch(e => console.log(e));
        }
    }, [sessionKey]);

    useEffect(() => {
        if (submitted){
            setLoading(true);
            fetchData({
                'action': 'submit_form',
                'session-key': sessionKey,
                'user-data': credentials,
                'donation': donation,
                'strava': strava,
                'program': program
            })
            .then(res => res.json())
            .then(res => {
                setResponseData(res);
                setLoading(0);
                setSubmitted(0);
            })
            .catch(e => setResponseData({
                type: 'error',
                data: e
            }));
        }
    }, [submitted]);

    return (
        <FormContext.Provider value={{
            loading,
            setLoading,
            submitted,
            submit,
            reset,
            messages,
            dataCorrect,
            formPrices,
            credentials,
            setCredentials,
            program,
            setProgram,
            strava,
            setStrava,
            donation,
            setDonation,
            sumProgram,
            sumStrava,
            total,
            responseData
        }}>
            {children}
        </FormContext.Provider>
    );
}

export default FormContextProvider;