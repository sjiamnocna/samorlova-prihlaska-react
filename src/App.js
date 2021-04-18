import React, { useContext } from "react";

import { FormContext } from "./context/form.context";

import "./App.scss";
import FormPage from "./steps/form/form.page";

const App = () => {
  const { formState, sumStrava, sumProgram, total } = useContext(FormContext);

  const formStates = {
    initial: 0,
    progress: 1,
    result: 2,
  };

  console.log(sumStrava, sumProgram, total);

  return (
    <form className="appform">
      <h3>Registrační formulář</h3>
      <FormPage />
      <div className="control-bar">
        <button>Odeslat přihlášku</button>
        {total > 0 ? (
          <p className="sum">
            `{sumStrava} + {sumProgram} = {total}`
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default App;
