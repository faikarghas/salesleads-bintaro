import React,{useEffect,useState,useContext} from 'react'
import Link from 'next/link'
import {connect} from 'react-redux';
// import * as action from '../../../redux/actionIndex'

export const Button1 = ({text,getFilterList,removeFilterList,unique = false,value='',set=()=>{},setQueryParams,removeQueryParams}) => {
    const [isActive,setActive] = useState(false)

    const _setActiveHandler = (item) => {
        if (history.pushState) {
            // var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?f1=${filter.join(',')}`;
            // window.history.pushState({path:newurl},'',newurl);
            setActive(isActive => !isActive)
            if (!isActive && getFilterList) {
              getFilterList(text)
              setQueryParams(item)
            }
            if (isActive && removeFilterList) {
              removeFilterList(text)
              removeQueryParams(item)
            }
        }
    }

    useEffect(() => {
    }, [])

    if (unique)  return ( <div className={`button__model_1 ${value == text.toLowerCase() ? 'active' : ''}`} onClick={set}>{text}</div>)

    if (!unique)  return ( <div className={`button__model_1 not ${isActive ? 'active' : ''}`} onClick={()=>_setActiveHandler(text)}>{text}</div>)

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button1);