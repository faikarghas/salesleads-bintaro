import {useEffect,useState} from 'react'
import Router from 'next/router'
import Layout from '../components/layout/index'

import {connect} from 'react-redux';
import {reauthenticate,deauthenticate} from '../redux/auth/action'
import {wrapper} from '../redux/store';

import {verifyJwt} from '../utils/verifyJwt'

function Home({username}) {

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

export const getServerSideProps = wrapper.getServerSideProps(store => ({req, res, ...etc}) => {

  const isTokenAvailable  = req.cookies.token;

  if(verifyJwt(isTokenAvailable) && verifyJwt(req.cookies.usr_token) ) {
    const isJwtVerified     = isTokenAvailable ? verifyJwt(isTokenAvailable)  : null;
    const username          = verifyJwt(req.cookies.usr_token).username;

    if (isJwtVerified && typeof window === 'undefined') {
        const idUsers           = isJwtVerified.id;
        const role              = isJwtVerified.role ;

        store.dispatch(reauthenticate(idUsers,isTokenAvailable,role,username));

      } else if (!isTokenAvailable) {
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

  } else {

      res.setHeader(
        "Set-Cookie", [
          `token=deleted; Max-Age=0`,
          `usr_token=deleted; Max-Age=0`]
      );

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


