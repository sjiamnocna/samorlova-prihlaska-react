import React, { useState } from 'react';

const FormInput = ({ textarea, handleChange, label, error, ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  // array of values is empty
  otherProps.value = otherProps.value ?? '';
  return (
    <div className={`input-container${error ? " error": ""}`}>
      <label className={focused || otherProps.value.length ? 'shrink' : null}>
        <span className="label-text">
          {label}
        </span>
        {
          textarea ?
            <textarea onChange={handleChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...otherProps} />
            :
            <input onChange={handleChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...otherProps} />
        }
      </label>
    </div>
  );
};

export default FormInput;