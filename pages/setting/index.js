import {useEffect,useState,useRef} from 'react'
import Select from "react-select";
import {Tabs, Tab} from "react-bootstrap";
import Image from 'next/image'
import {verifyJwt} from '../../utils/verifyJwt'

import {connect} from 'react-redux';
import {wrapper} from '../../redux/store';
import * as action from '../../redux/auth/action'
import {reauthenticate} from '../../redux/auth/action'

import Layout from '../../components/layout/index'
import Gambaran from '../../components/pages/dashboard/gambaran';
import Status from '../../components/pages/dashboard/status';
import Card from '../../components/presentationals/card/card';
import Link from 'next/link';


function Setting({deauthenticate,token}) {
  return (
    <Layout>
        <div className="header__leadsManagement d-flex justify-content-between align-items-center">
            <h2 className="m-0">Pengaturan</h2>
        </div>
        <div className='content__wrapper'>
            <Card className='card__akun mb-4'>
              <ul>
                <li><Link href="/setting/new-password"><a>Ubah Password</a></Link><Image src={'/images/next.png'} width={20} height={20} alt="Arrow icons created by Handicon - Flaticon"/></li>
                {/* <li><Link href=""><a>Tanda Tangan Email</a></Link><Image src={'/images/next.png'} width={20} height={20} alt="Arrow icons created by Handicon - Flaticon"/></li> */}
                <li onClick={()=>deauthenticate(token)}> <span>Keluar</span> <Image src={'/images/next.png'} width={20} height={20} alt="Arrow icons created by Handicon - Flaticon"/></li>
              </ul>
            </Card>
        </div>

    </Layout>
  )
}

const mapStateToProps = state => ({
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => {
  return {
    deauthenticate: (token) => dispatch(action.deauthenticate(token)),
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Setting);