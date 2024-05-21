import React, { useContext } from "react";

import { FormContext } from "../../context/form.context";
import DayOptions from "../day-options/day-options";

const RegistrationItems = () => {
  const { formPrices } = useContext(FormContext);

  if (!formPrices || formPrices.length === 0) {
    return null;
  }

  return (
    <div className="form-group double details">
      {formPrices.map((item, i) => (<DayOptions key={i} i={i} item={item} />))}
    </div>
  );
};

export default RegistrationItems;
