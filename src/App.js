import React from "react";

import FormPage from "./steps/form/form.page";
import Controls from "./components/controls/controls.comp";

import "./App.scss";

const App = () => {
  return (
    <form className="appform">
      <h3>Registrační formulář</h3>
      <FormPage />
      <Controls />
    </form>
  );
};

export default App;
