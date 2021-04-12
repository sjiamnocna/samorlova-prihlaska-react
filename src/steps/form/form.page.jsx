import React, { useContext, useEffect } from 'react';

import { FormContext } from '../../context/form.context';

import FormInput from '../../components/form-input/form-input.comp';


const FormPage = () => {
    const { credentials, setCredentials } = useContext(FormContext);
    useEffect(() => {

    });
    return (
        <div class="form-content">
            <div class="form-item double">
                <FormInput value={credentials.name} onChange={e => setCredentials('name', e.target.value)} label='Jméno' />
                <FormInput value={credentials.sname} onChange={e => setCredentials('sname', e.target.value)} label='Příjmení' />
            </div>
            <div class="form-item double">
                <FormInput value={credentials.mail} onChange={e => setCredentials('mail', e.target.value)} label='E-mailová adresa' />
                <FormInput value={credentials.byear} onChange={e => setCredentials('byear', e.target.value)} label='Rok narození' />
            </div>
            <h4>Adresa bydliště</h4>
            <div class="form-item double">
                <FormInput value={credentials.street} onChange={e => setCredentials('street', e.target.value)} label='Ulice' />
                <FormInput value={credentials.streetNo} onChange={e => setCredentials('streetNo', e.target.value)} label='Č.P.' />
            </div>
            <div class="form-item double">
                <FormInput value={credentials.postcode} onChange={e => setCredentials('postcode', e.target.value)} label='PSČ' />
                <FormInput value={credentials.town} onChange={e => setCredentials('town', e.target.value)} label='Město' />
            </div>
        </div>
    );
};

export default FormPage;