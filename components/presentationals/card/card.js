import React,{useEffect,useState,useContext} from 'react'

const Card = ({children,className,onClick = ()=>{}}) => {
    return (
        <div className={`card_lead ${className}`} onClick={onClick}>{children}</div>
    )
}

export default  Card
