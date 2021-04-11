import React from 'react';

import './form-input.scss';

const FormInput = ({handleChange, label, ...otherProps}) => (
  <div class="form-input">
    <label className={`${otherProps.value.length ? 'shrink':''} form-input-label`}>
      <span className="label-text">
        {label}
      </span>
      <input onChange={handleChange} {...otherProps} />
    </label>
  </div>
);

export default FormInput;