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
          price ? <span className="price">{price},-</span> : null
        }
      </label>
    </div>
  );
};

export default Checkbox;
