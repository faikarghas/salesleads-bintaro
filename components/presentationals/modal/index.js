import React,{useEffect,useState,useContext} from 'react'

const Modal = ({modalTarget,isActive,currentModal,children,className=''}) => {
    return (
        <div className={`modal__cs modal__check ${currentModal === modalTarget ? 'active' : ''} ${className}`}>
            {children}
        </div>
    )
}

export default Modal
