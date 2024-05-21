import React, { useContext } from "react";

import { FormContext } from "../../context/form.context";

import Checkbox from "../form-checkbox/form-checkbox.comp";

/**
 * Day options component to better control items, accept index as props
 * 
 * @returns 
 */
const DayOptions = ({i, item}) => {
  const { strava, setStrava, program, setProgram } = useContext(FormContext);

  const setAll = (value) => {
    const np = {};
    const ns = {};

    // if key starts with i. then revrite value, else keep the original value for both strava and program
    for (let key in strava){
      ns[key] = key.startsWith(`${i}.`) ? value : strava[key];
    }
    for (let key in program){
      np[key] = key.startsWith(`${i}.`) ? value : program[key];
    }

    // set the new values
    setStrava(strava);
    setProgram(program);
  }

  return (
    <div className="option-container">
      <div className="option-header">
        <label>
          <Checkbox
          onChange={(e) => {
            const checked = e.target.checked;
            setAll(checked);
          }}/>
          <span className="label">
            {item.title}
          </span>
        </label>
      </div>
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
  );
};

export default DayOptions;
