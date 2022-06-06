import {useEffect,useState,useRef} from 'react'
import Select from "react-select";
import {Tabs, Tab} from "react-bootstrap";
import Image from 'next/image'
import {verifyJwt} from '../../utils/verifyJwt'

import {connect} from 'react-redux';
import {wrapper} from '../../redux/store';
import {reauthenticate} from '../../redux/auth/action'

import Layout from '../../components/layout/index'
import Gambaran from '../../components/pages/dashboard/gambaran';
import Status from '../../components/pages/dashboard/status';
import Card from '../../components/presentationals/card/card';
import Link from 'next/link';


function NewPassword() {
  return (
    <Layout>
        <div className="header__leadsManagement d-flex justify-content-between align-items-center">
            <h2 className="m-0">Pengaturan</h2>
        </div>
        <div className='content__wrapper'>
            <nav aria-label="breadcrumb mb-5">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link  href="/setting"><a>Pengaturan</a></Link></li>
                    <li className="breadcrumb-item active" aria-current="page"><Link  href="#"><a>Ubah Password</a></Link></li>
                </ol>
            </nav>
            <Card className='card__akun mb-4'>
                <form>
                    <div className='mb-2'>
                        <label>Password Baru</label>
                        <input type='password'  />
                    </div>
                    <div className='mb-2'>
                        <label>Konfirmasi Password Baru</label>
                        <input type='password'  />
                    </div>
                    <button className='btn btn-primary'>Simpan</button>
                </form>
            </Card>
        </div>

    </Layout>
  )
}

const mapStateToProps = state => ({
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


export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);