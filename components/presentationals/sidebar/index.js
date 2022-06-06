import React,{useEffect,useState,useContext} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router';
import {connect} from 'react-redux';

const Sidebar = ({widthDrawer,expandDrawer,role}) => {
    const { asPath, pathname } = useRouter();

    return (
        <React.Fragment>
            <aside className={`sidebar d-none d-lg-block ${widthDrawer ? 'active' : ''}`} >
                <div className='logo__header d-flex align-items-center justify-content-between'>
                    <Link href={'/'}>
                        <a>
                            <Image alt="logo" width={130} height={80} className='logo' src='/images/binatrojaya.png'></Image>
                        </a>
                    </Link>
                    <svg onClick={expandDrawer} viewBox="0 0 14 14" className="doubleChevronRight expand" style={{width: '14px' ,height: '14px', display: 'block', fill: 'white'}}><path d="M7 12.025L8.225 13.25L14 7.125L8.225 1L7 2.225L11.55 7.125L7 12.025ZM0 12.025L1.225 13.25L7 7.125L1.225 1L8.56743e-07 2.225L4.55 7.125L0 12.025Z"></path></svg>
                </div>
                <nav>
                    <ul>
                        <li>{role}</li>
                        <li className={`${pathname == '/' ? 'active' : ''}`}><Link href={'/'}><a>Welcome Team</a></Link></li>
                        <li className={`${pathname == '/lead-management' || pathname == '/lead-management/[slug]' ? 'active' : ''}`}><Link href={'/lead-management'}><a>Leads</a></Link></li>
                        <li className={`${pathname == '/dashboard' ? 'active' : ''}`}><Link href={'/dashboard'}><a>Dashboard</a></Link></li>
                        {/* {role === 1 ? <li className={`${pathname == '/dashboard' ? 'active' : ''}`}><Link href={'/dashboard'}><a>Dashboard</a></Link></li> : null} */}
                        {role === 1 ? <li className={`${pathname == '/schedule-reports' ? 'active' : ''}`}><Link href={'/schedule-reports'}><a>Report</a></Link></li> : null}
                        <li className={`${pathname == '/setting' || pathname == '/setting/new-password' ? 'active' : ''}`}><Link href={'/setting'}><a>Setting</a></Link></li>
                    </ul>
                </nav>
            </aside>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    role: state.auth.role,
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)

