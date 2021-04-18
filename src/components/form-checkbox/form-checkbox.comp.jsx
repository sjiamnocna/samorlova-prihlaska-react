import React from "react";

const Checkbox = ({ label, checked, handleChange, price, centered, ...otherProps }) => {
  return (
    <div className={`checkbox-container${centered ? ' centered' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={checked}
          {...otherProps}
        />
        <p className="label">
          {label}
        </p>
        {
          price ? <p className="price">{price},-</p> : null
        }
      </label>
    </div>
  );
};

export default Checkbox;
