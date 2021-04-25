import React, { useContext } from "react";

import FormPage from "./steps/form/form.page";
import Controls from "./components/controls/controls.comp";

import { BiLoaderAlt } from 'react-icons/bi';

import "./App.scss";
import { FormContext } from "./context/form.context";

const Loader = () => <div className="overlay faded"><BiLoaderAlt className="loader-icon" /></div>

const App = () => {
  const { loading } = useContext(FormContext);
  return (
    <form className="appform">
      <h3>Registrační formulář</h3>
      {
        loading ? <Loader /> : null
      }
      <FormPage />
      <Controls />
    </form>
  );
};

export default App;