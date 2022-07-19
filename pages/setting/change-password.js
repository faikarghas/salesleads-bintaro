import {useEffect,useState,useRef} from 'react'
import Router from 'next/router'
import {verifyJwt} from '../../utils/verifyJwt'
import {API_URL,API_URL_LOCAL} from '../../utils/config'

import {connect} from 'react-redux';
import {wrapper} from '../../redux/store';
import * as action from '../../redux/auth/action'
import {reauthenticate} from '../../redux/auth/action'

import Layout from '../../components/layout/index'
import Gambaran from '../../components/pages/dashboard/gambaran';
import Status from '../../components/pages/dashboard/status';
import Card from '../../components/presentationals/card/card';
import Link from 'next/link';

import {useFormik } from 'formik'
import * as Yup from 'yup';

function NewPassword({deauthenticate,token}) {
  const [submitText,setSubmitText] = useState('Submit')
  const [infoText, setInfoText] = useState('')

  const _changePassword = async (oldPassword,newPassword) => {
    setSubmitText('Loading...')
    const getData = await fetch(`${API_URL}/auth/password/change`,{
      method:"POST",
      headers:{
        'Authorization': 'Bearer ' + token,
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        oldPassword,
        newPassword
      })
    })
    const result = await getData.json()

    if (result.status !== 400) {
      setSubmitText('Submit')
      setInfoText('Anda akan dialihkan ke halaman login. Silahkan login kembali.')
      setTimeout(() => {
        deauthenticate(token)
      }, 2000);
    } else {
      setSubmitText('Gagal ganti password')
      setTimeout(() => {
        setSubmitText('Submit')
      }, 1500);
    }
  }

  const formik = useFormik({
    initialValues: {
      oldPassword:'',
      newPassword:'',
    },
    validationSchema: Yup.object({
        oldPassword: Yup.string()
            .required('Cannot be left blank'),
        newPassword: Yup.string()
            .required('Cannot be left blank')
    }),
    onSubmit: (values,{setFieldError,resetForm}) => {
      _changePassword(values.oldPassword,values.newPassword)
    },
  });

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
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <input type="password" name="oldPassword" className="form-control" onChange={formik.handleChange}
                value={formik.values.oldPassword} placeholder="Password Lama"/>
                {formik.touched.oldPassword && formik.errors.oldPassword ? <div className='error-input'>{formik.errors.oldPassword}</div> : null}
              </div>
              <div className="mb-3">
                <input type="password" name="newPassword" className="form-control" onChange={formik.handleChange}
                value={formik.values.newPassword} placeholder="Password Baru"/>
              </div>
              <button type="submit" className="btn btn-primary w-100">{submitText}</button>
              <p style={{fontSize:"1.4rem",marginTop:"0.5rem"}}>{infoText}</p>
            </form>
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

  if(verifyJwt(isTokenAvailable) && verifyJwt(req.cookies.usr_token) ) {
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
  } else {
      res.setHeader(
      "Set-Cookie", [
        `token=deleted; Max-Age=0`,
        `usr_token=deleted; Max-Age=0`]
      );

      return {
        redirect: {
          permanent: false,
          destination: "/login"
        }
      }
  }

})


export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);