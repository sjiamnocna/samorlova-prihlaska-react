import React, { useContext } from "react";

import { FormContext } from "../../context/form.context";

import Checkbox from "../form-checkbox/form-checkbox.comp";
import FormItem from "../form-item/form-item.comp";

const RegistrationItems = () => {
  const { formPrices, strava, setStrava, program, setProgram } = useContext(FormContext);

  if (!formPrices || formPrices.length === 0) {
    return null;
  }

  return (
    <div className="form-group double details">
      {formPrices[0] !== undefined
        ? formPrices.map((item, i) => (
          <FormItem key={i}>
            <h4>{item.title}</h4>
            <div className="option-container">
              <div className="program">
                {item.program.map((subitem, j) => (
                  <Checkbox
                    key={i + "." + j}
                    checked={program[[i + "." + j]] ?? 0}
                    onChange={(e) =>
                      setProgram({
                        ...program,
                        [i + "." + j]: e.target.checked,
                      })
                    }
                    label={subitem.title}
                    price={subitem.price}
                  />
                ))}
              </div>
              <div className="strava">
                {item.food.map((subitem, j) => (
                  <Checkbox
                    key={i + "." + j}
                    checked={strava[[i + "." + j]] ?? 0}
                    onChange={(e) =>
                      setStrava({
                        ...strava,
                        [i + "." + j]: e.target.checked,
                      })
                    }
                    label={subitem.title}
                    price={subitem.price}
                  />
                ))}
              </div>
            </div>
          </FormItem>
        ))
        : null}
    </div>
  );
};

export default RegistrationItems;
