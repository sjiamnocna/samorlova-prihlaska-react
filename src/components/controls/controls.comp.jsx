import React, { useContext } from 'react';

import { FormContext } from "../../context/form.context";

import { MdSend } from 'react-icons/md';

const Controls = () => {
    const { loading, sumStrava, sumProgram, total, dataCorrect, submit } = useContext(FormContext);
    const formReady = !loading && total > 0 && dataCorrect;

    return (
        <div className="control-bar">
            <button className={`submit` + (formReady ? ' ready' : '')} onClick={submit} disabled={!formReady}>
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