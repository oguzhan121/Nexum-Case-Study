import React, {useRef} from 'react';


export default function Modal({isOpen, toggleModal, children}) {
    const modalRef = useRef(null);
    return (
        <div className="modal" style={isOpen ? {display: 'none'} : null}>
            <div className="modal__wrapper" ref={modalRef}>
                {children}
            </div>
        </div>
    )
}