import React, { useContext } from 'react';

import { FormContext } from "../../context/form.context";

import { FaCheckCircle, FaPaintBrush, FaPlay, FaPlusSquare} from 'react-icons/fa';

const BeforeSubmit = ({formReady, submit, sumStrava, sumProgram, total}) => (
    <>
    <button className={`button right` + (!formReady ? ' disabled' : '')} onClick={submit} disabled={!formReady}>
        <span>Odeslat přihlášku</span>
        <FaPlay />
    </button>
    {
        total > 0 ? (
            <p className="sum">
                {sumStrava} + {sumProgram} = {total},- Kč
            </p>
        ) : null
    }
    </>
);

const Navigation = ({responseCode, reset }) => (
    <>
    <button className='button left' onClick={e =>  reset()}>
        <span>{responseCode === 0 ? 'Další přihláška' : 'Upravit údaje'}</span>
        {responseCode === 0 ? <FaPlusSquare /> : <FaPaintBrush />}
    </button>
    <button className='button right' onClick={e => reset(true)}>
        <span>Díky, nashledanou</span>
        <FaCheckCircle />
    </button>
    </>
)

const Controls = () => {
    const { loading, sumStrava, sumProgram, total, dataCorrect, submit, reset, responseData } = useContext(FormContext);
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