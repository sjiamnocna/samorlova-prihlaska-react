import React, { useContext } from 'react'

import { FormContext } from './context/form.context';

import FormInput from './components/form-input/form-input.comp';

import './App.scss';

function App() {
  const { formState, setFormState, credentials, setCredentials, program, setProgram, strava, setStrava } = useContext(FormContext);
  return (
    <form className="App">
      <h3 style={{
        marginBottom: '10px'
      }}>Registrační formulář</h3>
      <FormInput value={credentials.name} onChange={e => setCredentials('name', e.target.value)} />
    </form >
  );
}

export default App;