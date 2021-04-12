import React, { useState } from 'react';

const FormInput = ({ handleChange, label, ...otherProps }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div class="input-container">
      <label className={focused || otherProps.value.length ? 'shrink' : null}>
        <span className="label-text">
          {label}
        </span>
        <input onChange={handleChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} {...otherProps} />
      </label>
    </div>
  );
};

export default FormInput;