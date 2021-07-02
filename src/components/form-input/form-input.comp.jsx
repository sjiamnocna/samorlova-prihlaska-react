import React, { useState } from 'react';

const FormInput = ({ textarea, handleChange, label, error, inline, ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  // array of values is empty
  otherProps.value = otherProps.value ?? '';

  const inputProps = {
    onChange: handleChange,
    ...otherProps
  };

  return (
    <div className={`input-container${error ? " error": ""}${inline ? " inline": ""}`}>
      <label>
        <span className="label-text">
          {label}
        </span>
        {
          textarea ?
            <textarea {...inputProps}/>
            :
            <input {...inputProps}/>
        }
      </label>
    </div>
  );
};

export default FormInput;