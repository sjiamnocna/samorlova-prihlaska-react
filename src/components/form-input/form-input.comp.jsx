import React, { useState } from 'react';

const FormInput = ({ textarea, handleChange, label, error, ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  // array of values is empty
  otherProps.value = otherProps.value ?? '';

  const inputProps = {
    onChange: handleChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    ...otherProps
  };

  return (
    <div className={`input-container${error ? " error": ""}`}>
      <label className={focused || otherProps.value ? 'shrink' : null}>
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