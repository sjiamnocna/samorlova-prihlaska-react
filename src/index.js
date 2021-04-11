import React from 'react';
import ReactDOM from 'react-dom';
import FormContextProvider from './context/form.context';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <FormContextProvider>
      <App />
    </FormContextProvider>
  </React.StrictMode>,
  document.getElementById('prihlaska').getElementsByClassName('appform')[0]
);