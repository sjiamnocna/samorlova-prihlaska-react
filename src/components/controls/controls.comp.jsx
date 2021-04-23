import React, { useContext } from 'react';

import { FormContext } from "../../context/form.context";

import { MdSend } from 'react-icons/md';

const Controls = () => {
    const { loading, sumStrava, sumProgram, total } = useContext(FormContext);
    return (
        <div className="control-bar">
            <button className="submit">
                <span>Odeslat přihlášku</span>
                <MdSend />
            </button>
            {
                total > 0 ? (
                    <p className="sum">
                        {sumStrava} + {sumProgram} = {total},- Kč
                    </p>
                ) : null
            }
        </div>
    );
};

export default Controls;