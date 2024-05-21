import React, { useContext } from 'react';

import { FormContext } from "../../context/form.context";

import { FaCheckCircle, FaPaintBrush, FaPlay, FaPlusSquare } from 'react-icons/fa';

const BeforeSubmit = ({ formReady, submit, sumStrava, sumProgram, donation, total }) => (
    <>
        {
            total > 0 ? (
                <p className="sum">
                    {sumStrava} + {sumProgram}{donation > 0 ? ' + ' + donation : null} = {total},- Kč
                </p>
            ) : null
        }
        <button className={`button right` + (!formReady ? ' disabled' : '')} onClick={submit} disabled={!formReady}>
            <span>Odeslat přihlášku</span>
            <FaPlay />
        </button>
    </>
);

const Navigation = ({ responseCode, reset }) => (
    <>
        <button className='button' onClick={e => reset()}>
            <span>{responseCode === 0 ? 'Další přihláška' : 'Upravit údaje'}</span>
            {responseCode === 0 ? <FaPlusSquare /> : <FaPaintBrush />}
        </button>
        <button className='button' onClick={e => reset(true)}>
            <span>Díky, nashledanou</span>
            <FaCheckCircle />
        </button>
    </>
)

const Controls = () => {
    const { loading, sumStrava, sumProgram, donation, total, dataCorrect, submit, reset, responseData } = useContext(FormContext);
    const formReady = !loading && total > 0 && dataCorrect;

    return (
        <div className="control-bar">
            {
                responseData.code === undefined ?
                    <BeforeSubmit
                        formReady={formReady}
                        submit={submit}
                        sumStrava={sumStrava}
                        sumProgram={sumProgram}
                        total={total}
                        donation={donation}
                    />
                    :
                    (
                        <Navigation
                            responseCode={responseData.code}
                            reset={reset}
                        />
                    )
            }
        </div>
    );
};

export default Controls;
