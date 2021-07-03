import React, { useContext } from "react";

import FormPage from "./steps/form/form.page";
import Controls from "./components/controls/controls.comp";

import { BiLoaderAlt } from 'react-icons/bi';

import { FormContext } from "./context/form.context";
import ShowResponse from "./steps/response/response";

const Loader = () => <div className="overlay faded"><BiLoaderAlt className="loader-icon" /></div>

const App = () => {
  const { loading, responseData } = useContext(FormContext);
  return (
    <form className="appform">
      <h3>Registrační formulář</h3>
      {
        process.env.NODE_ENV !== 'development' && loading ? <Loader /> : null
      }
      {
        responseData.code !== undefined  ?
        <ShowResponse responseData={responseData} />
        :
        <FormPage />
      }
      {
        responseData.controls !== 'none' ?
        <Controls type={responseData.controls} /> : null
      }
    </form>
  );
};

export default App;