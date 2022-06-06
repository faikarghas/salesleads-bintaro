import React, {useState} from 'react'

export const Bookmark = () => {
    const [isActive, setIsActive] = useState(false);

    const _setActive = () => {
        setIsActive(prevstate => !prevstate)
    }


    return (
        <svg onClick={(e)=>{e.stopPropagation(); _setActive()}}  width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs></defs><g id="ic-actions-bookmark"><path style={{fill:'none',stroke:'#000',strokeLinecap:'round',strokelinejoin:'round',strokeWidth:'1.5px',fillRule:'evenodd'}} className={`cls-1 ${isActive ? 'active' : ''}`} d="M18.93481,20.978l-6.60154-4.77231a.2.2,0,0,0-.19846,0L5.53327,20.978A.2.2,0,0,1,5.234,20.8043V5.14894a2,2,0,0,1,2-2h10a2,2,0,0,1,2,2V20.8043A.2.2,0,0,1,18.93481,20.978Z"/></g></svg>
    )
}
