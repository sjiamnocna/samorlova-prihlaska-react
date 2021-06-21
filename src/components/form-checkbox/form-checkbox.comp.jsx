import React from "react";

const Checkbox = ({ label, checked, handleChange, price, centered, className, ...otherProps }) => {
  return (
    <div className={`checkbox-container${centered ? ' centered' : ''} ${className}`}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          {...otherProps}
        />
        <span className="label">
          {label}
        </span>
        {
          price ? <p className="price">{price},-</p> : null
        }
      </label>
    </div>
  );
};

export default Checkbox;
