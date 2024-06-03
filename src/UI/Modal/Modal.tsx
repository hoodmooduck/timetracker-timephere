import "./Modal.scss";
import React from "react";
import {ReactSVG} from "react-svg";
import close from "/assets/svg/close.svg"

interface ModalProps {
    children: React.ReactNode
    active: boolean,
    setActive: (value: boolean) => void
}

function Modal({children, active, setActive}: ModalProps) {


    return (
        <div className={active ? 'modal modal--active' : 'modal'}>
            <div className='modal__view'>
                <div onClick={() => setActive(false)} className="modal__close-btn">
                    <ReactSVG src={close}></ReactSVG>
                </div>
                {children}
            </div>
        </div>
    )
}

export default Modal;
