import {useEffect,useState} from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';

import Sidebar from '../presentationals/sidebar';
import Header from '../presentationals/header';
import NotificationToast from '../presentationals/toast';

import {connect} from 'react-redux';


const Layout = (props) => {
    const [widthDrawer,setWithDrawer] = useState(true)
    const { asPath, pathname } = useRouter();
    const [notif,setNotif] = useState(true)
    const [notifPayload,setNotifPayload] = useState([])


    function closeNotif(id) {
        // setNotif(false)
        setNotifPayload(oldArray => 
            oldArray.filter(function(item,key) {
                return key !== id
            })
        )

    }

    function expandDrawer() {
        setWithDrawer(widthDrawer => !widthDrawer);
    }

    useEffect(() => {
        if (window.localStorage.getItem('isPushNotificationsEnabled')) {
            console.log('isPushNotif', window.localStorage.getItem('isPushNotificationsEnabled'));
          } else {
            console.log('Not isPushNotif', window.localStorage.getItem('isPushNotificationsEnabled'));
          }
    }, [])


  return (
    <>
        <div className='main__layout'>
            <Sidebar widthDrawer={widthDrawer} expandDrawer={expandDrawer}/>
        </div>
        <main className={`${widthDrawer ? 'active' : ''}`}>
            <Header widthDrawer={widthDrawer} expandDrawer={expandDrawer} username={props.username}/>
            {props.children}
        </main>
        <div className='bottom__bar d-lg-none'>
            <div className={`bottom__bar--item ${pathname == '/lead-management' || pathname == '/lead-management/[slug]' ? 'active' : ''}`}><Link href="/lead-management"><a>Leads</a></Link> </div>
            {props.role === 1 ? <div className={`bottom__bar--item ${pathname == '/schedule-reports' ? 'active' : ''}`}><Link href="/schedule-reports"><a>Report</a></Link> </div> : null}
            <div className={`bottom__bar--item ${pathname == '/dashboard' ? 'active' : ''}`}><Link href="/dashboard"><a>Dashboard</a></Link> </div>
        </div>
        <NotificationToast closeNotif={closeNotif} active={notif} data={notifPayload} />
    </>
  )
}

const mapStateToProps = (state) => ({
    role: state.auth.role,
    username: state.auth.username,
})

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)
