import {useEffect,useState} from 'react'
import {io} from 'socket.io-client'
import Router from 'next/router'
import {firebaseInit,getFCMToken} from '../firebase'

import Layout from '../components/layout/index'

import {connect} from 'react-redux';
import {reauthenticate} from '../redux/auth/action'
import {wrapper} from '../redux/store';

import {verifyJwt} from '../utils/verifyJwt'
import {getCookie} from '../utils/cookie'


function Home({username}) {
  useEffect(() => {
    socketInitializer()
  }, [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    let socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })
  }

  const [modal,setModal] = useState({
    isActive: false,
    id: 0,
  });

  const _showModal = (id) => {
    setModal((modal)=>{
      return {
        isActive: true,
        id : 1,
      }
    })
  }

  const _closeModalHandler = () => {
    setModal((modal)=>{
      return {
        isActive : false,
        id : 0
      }
    })
  }

  return (
    <Layout>
        <div className='content__wrapper p-0'>
          <img src={'/images/background-min.jpg'} width="100%" height="100%" className='d-none d-md-block' />
          <img src={'/images/mobile.jpg'} width="100%" height="100%" className='d-block d-md-none' />
          <div className='welcome_text'>
              <h1>Welcome {username}</h1>
              <h3>Leads Management <br/>of Bintaro Jaya.</h3>
          </div>
        </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
  username: state.auth.username,
});

const mapDispatchToProps = {

};

export const getServerSideProps = wrapper.getStaticProps(store => ({req, res, ...etc}) => {

  const isTokenAvailable  = req.cookies.token;
  const isJwtVerified     = isTokenAvailable ? verifyJwt(isTokenAvailable)  : null;
  const username          = verifyJwt(req.cookies.usr_token).username;


  if (isJwtVerified && typeof window === 'undefined') {
      const idUsers           = isJwtVerified.id;
      const role              = isJwtVerified.role ;

      store.dispatch(reauthenticate(idUsers,isTokenAvailable,role,username));

    } else if(!isTokenAvailable) {

    if (typeof window !== 'undefined') {
      Router.push('/login')
    } else {
      return {
        redirect: {
          permanent: false,
          destination: "/login"
        }
      }
    }
  }


})


export default connect(mapStateToProps, mapDispatchToProps)(Home);


