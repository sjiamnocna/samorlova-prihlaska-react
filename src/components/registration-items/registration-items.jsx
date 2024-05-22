import React, { useContext } from "react";

import { FormContext } from "../../context/form.context";
import DayOptions from "../day-options/day-options";

const RegistrationItems = () => {
  const { formPrices } = useContext(FormContext);

  if (!formPrices || formPrices.length === 0) {
    return null;
  }

  const pricesList = [];

  for (index in formPrices) {
    const item = formPrices[index];
    pricesList.push(
      <DayOptions key={index} i={index} item={item} />
    );
  }

  return (
    <div className="form-group double details">
      {pricesList}
    </div>
  );
};

export default RegistrationItems;
