import React from 'react'
import Card from '../../../presentationals/card/card'
import {getCurrentDate} from '../../../../utils/date'

const Lifecycle = ({histories}) => {

  return (
    <div className='tab__content'>
        <div className='tab__content_body'>
            {histories.map((history,i)=>{
                return (
                    <div className='position-relative lf-wr mb-5' key={i}>
                        {/* <h4>Hari 14 (Hari ini)</h4> */}
                        <Card className="card__lifecycle">
                            <div className='activity'>{history.userContactedVia.toUpperCase()} Dicoba</div>
                            <div className='date'>{getCurrentDate(history.createdAt)}</div>
                        </Card>
                        <div className='sm-circle'><span></span></div>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Lifecycle