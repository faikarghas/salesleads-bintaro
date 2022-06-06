import React,{useEffect,useState,useContext} from 'react'
import Link from 'next/link'
import { Favorite } from '../../svg/favorite'

const Card1 = ({info,status_lead,name,project_name,assigned_agent,last_activity,next_activity}) => {

    return (
        <React.Fragment>
            <div className='card_lead card__model_1'>
                <div className='card__model_1--header'>
                    <span className='d-block info__lead'>{status_lead ? '' : 'NEW'}</span>
                </div>
                <div className='card__model_1--body'>
                    <h3 className='client__name'>{name} <span className={`status__lead ${status_lead ? status_lead.toLowerCase() : ''}`}>{status_lead}</span></h3>
                    <p className='m-0 project__name'>{project_name}</p>
                    <div>
                        <p className='m-0 assigned__agent'>{assigned_agent}</p>
                        <span className='d-block last__activity'>{last_activity}</span>
                    </div>
                </div>
                <div className='card__model_1--footer'>
                    {/* <p className='m-0 next__activity'><span><img width={'15px'} src='images/exclamation-mark.png' alt='Warning icons created by amonrat rungreangfangsai - Flaticon'/></span>{next_activity}</p> */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default  Card1
