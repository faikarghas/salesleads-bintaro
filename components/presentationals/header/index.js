import React,{useEffect,useState,useContext} from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header = ({widthDrawer,expandDrawer,username}) => {

    const getFirstLetter = (username) =>{
        const result = username.split('')[0]
        return result
    }

    return (
        <React.Fragment>
            <div className={`header ${widthDrawer ? 'active' : ''} d-flex justify-content-between`}>
                <svg onClick={expandDrawer} viewBox="0 0 14 14" className={`hamburgerMenu d-none d-lg-block ${!widthDrawer ? 'active' : ''}`} style={{cursor:'pointer',width: '16px', height: '16px', display: 'block', fill: 'rgba(55, 53, 47, 0.85)', flexShrink: 0, backfaceVisibility: 'hidden'}}><path d="M0,1.25 L14,1.25 L14,2.75 L0,2.75 L0,1.25 Z M0,6.25 L14,6.25 L14,7.75 L0,7.75 L0,6.25 Z M0,11.25 L14,11.25 L14,12.75 L0,12.75 L0,11.25 Z"></path></svg>
                <div>
                <Link href="/">
                    <a>
                        <Image alt="logo" src="/images/binatrojaya.png" width={150} height={40}/>
                    </a>
                </Link>
                </div>
                <Link href="/setting">
                    <a>
                        <Image alt="setting" src="/images/settings.png" width={25} height={25}/>
                    </a>
                </Link>

                <div className='d-flex align-items-center justify-content-between d-none d-lg-flex'>
                    <div className='avatar'>{getFirstLetter(username).toUpperCase()}</div>
                    <p className='mb-0 ms-3 fs-4 text'>{username}</p>
                </div>
            </div>
        </React.Fragment>
    )
}

export default  Header
