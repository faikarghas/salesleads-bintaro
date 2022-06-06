import React,{useEffect,useState,useContext} from 'react'
import Link from 'next/link'

export const CheckBox = ({text,defaultChecked,onChange=()=>{}}) => {
    return (
        <div className="form-check" >
            <input onChange={onChange} className="form-check-input" type="checkbox" value=""  defaultChecked={defaultChecked}/>
            <label className="form-check-label" >{text}</label>
        </div>
    )
}
