import React, { useState } from 'react';

const FormInput = ({ textarea, handleChange, label, ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="input-container">
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