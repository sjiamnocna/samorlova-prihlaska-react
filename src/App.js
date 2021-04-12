import React, { useContext } from 'react'

import { FormContext } from './context/form.context';

import './App.scss';
import FormPage from './steps/form/form.page';

const App = () => {
  const { formState } = useContext(FormContext);

  return (
    <form className="prihlaska">
      <h3>Registrační formulář</h3>
      {
        formState === 'initial' ?
          <FormPage /> :
          null
      }
    </form >
  );
}

export default App;