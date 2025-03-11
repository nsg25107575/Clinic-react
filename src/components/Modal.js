import ReactDOM from 'react-dom';
import React from 'react';
import DoctorList from "./DoctorsList";

export default function Modal({isOpen, close, children}){
    if(!isOpen) return false;
    return ReactDOM.createPortal(
        <div className='modal'>
            <DoctorList/>
            {children}
            <button onClick={close}>Завершити роботу</button>
        </div>,
        document.getElementById('modal-root')
    )
}