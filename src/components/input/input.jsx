import React from 'react';

const Input = ( props ) => {
    const { label, placeholder } = props;
    return (
        <div className="item" id="jmeno">
            <label>
                {placeholder ?? label}
                <input {...props} />
            </label>
        </div>
    )
}

export default Input;