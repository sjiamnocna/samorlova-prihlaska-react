import React from "react";

const Checkbox = ({ label, checked, handleChange, ...otherProps }) => {
  return (
    <div className="checkbox-container">
      <label>
        <input
          type="checkbox"
          checked={checked}
          {...otherProps}
        />
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
