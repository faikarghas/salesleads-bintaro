import React from 'react'
import Image from 'next/image'

import Button1 from '../../../presentationals/button/button_1'
import Card from '../../../presentationals/card/card'

import {rupiah} from '../../../../utils/numberFormat'
import {getCurrentDate} from '../../../../utils/date.js'

const Detail = ({data}) => {

    let d = new Date(data.data.leadPeriod)

  return (
    <div className='tab__content'>
        <div className='tab__content_body'>
            <Card className="card__profile">
                <div className=''>
                    <label>Name</label>
                    <p>{data.data.leadName}</p>
                </div>
                <div className=''>
                    <label>Email</label>
                    <p>{data.data.leadEmail}</p>
                </div>
                <div className=''>
                    <label>Mobile</label>
                    <p>{data.data.leadPhone}</p>
                </div>
                <div className=''>
                    <label>Cluster</label>
                    <p>{data.data.leadCluster}</p>
                </div>
                <div className=''>
                    <label>Promo</label>
                    <p>{data.data.leadPromo}</p>
                </div>
                <div className=''>
                    <label>Period</label>
                    <p>{data.data.leadPeriod}</p>
                </div>
                <div className=''>
                    <label>Source</label>
                    <p>{data.data.leadSource}</p>
                </div>
                <div className=''>
                    <label>Price</label>
                    <p>{data.data.leadPrice}</p>
                </div>
                <div className=''>
                    <label>City</label>
                    <p>{data.data.leadCity}</p>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default Detail