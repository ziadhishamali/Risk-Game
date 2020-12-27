import React, { useState } from 'react'

import './Dialog.css'

const Dialog = ({ isOpen, message, onClose, extraArmies }) => {
    const [number, setNumber] = useState(0)

    const changeInput = (e) => {
        if (e.target.value > extraArmies) {
            setNumber(extraArmies)
        } else if (e.target.value < 0) {
            setNumber(0)
        } else {
            setNumber(e.target.value)
        }
    }

    return (
        <div className={'alert-message-wrapper ' + (isOpen ? 'opened' : '')}>
            <div className='alert-message-container'>
                <div className='alert-message-info'>
                    <h1>{message}</h1>
                    {extraArmies && <h2>{`You have ${extraArmies} armies to use`}</h2>}
                </div>

                {extraArmies && (
                    <div className='alert-message-info'>
                        <input type="number" value={number} onChange={changeInput} />
                    </div>
                )}

                <button className='alert-message-close' onClick={() => onClose(number)}>Done</button>
            </div>
        </div>
    )
}

export default Dialog
