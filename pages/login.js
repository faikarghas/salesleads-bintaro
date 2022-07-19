import Image from 'next/image'
import React,{useEffect,useState} from 'react'
import Link from 'next/link';
import {verifyJwt} from '../utils/verifyJwt'

import {useFormik } from 'formik'
import * as Yup from 'yup';

import {connect} from 'react-redux';
import * as action from '../redux/auth/action'
import {wrapper} from '../redux/store';



const Login = ({authenticate,idusers}) => {
  const [notifId,setNotifId] = useState('Loading...')
  const [isLoadingNotification,setIsLoadingNotification] = useState(false)
  const [loginText,setLoginText] = useState('Login')

  const formik = useFormik({
    initialValues: {
      email:'',
      password:'',
    },
    validationSchema: Yup.object({
        email: Yup.string()
            .email('Sorry, that is not a valid email address')
            .required('Cannot be left blank'),
        password: Yup.string()
            .required('Cannot be left blank')
    }),
    onSubmit: (values,{setFieldError,resetForm}) => {
        setLoginText('Loading...')
        authenticate(values.email,values.password,notifId)
        .then((res)=>{
          console.log(res,'RES');
          if (res.status === 200) {
            setLoginText('Login')
          } else {
            setLoginText('Email/Password salah')
            setTimeout(() => {
              setLoginText('Login')
            }, 1500);
          }
        })
    },
  });

  const getNotificationId = async () => {
    OneSignal = window.OneSignal || [];
      try {
        const pushOne = await OneSignal.push(function() {
          /* These examples are all valid */
          OneSignal.getUserId(function(userId) {
            console.log("OneSignal User ID:", userId);
            setNotifId(userId)
          });
        });

        if (pushOne === undefined) throw "Not available (You can't get notification)";
        console.log(pushOne,'push try');
    } catch (error) {
      console.log(error);
      setNotifId(error);
    }
  }

  useEffect(() => {
    getNotificationId()

  }, [])


  return (
    <div id="login_wrapper" className='login_page'>
      <p className="version">V 1.0.2</p>
      <div className='notification-id'>
        <h4 >Notification ID: {notifId}</h4>
      </div>
      <div className='login_container text-center'>
        <Image alt="logo" src='/images/bintaro-jaya-logo-color.svg' width={150} height={50}/>

        <br/>
        <br/>
        <br/>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input type="text" name="email" className="form-control" onChange={formik.handleChange}
            value={formik.values.email} placeholder='Email'/>
            {formik.touched.email && formik.errors.email ? <div className='error-input'>{formik.errors.email}</div> : null}
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" onChange={formik.handleChange}
            value={formik.values.password} placeholder='Password'/>
          </div>
          <div className="d-flex justify-content-end mb-4 text-primary" style={{fontSize:'1.2rem'}}>
            <Link  href="#"><a>Forget Password</a></Link>
          </div>
          <button type="submit" className="btn btn-primary w-100">{loginText}</button>
        </form>
        </div>
    </div>
  )
}

const mapStateToProps = state => ({
  idusers: state.auth.idusers,
});

const mapDispatchToProps = dispatch => {
  return {
    authenticate: (email,password,notifId) => dispatch(action.authenticate(email,password,notifId)),
  }
}


export const getServerSideProps = wrapper.getStaticProps(store => ({req, res, ...etc}) => {
  const isTokenAvailable  = req.cookies.token;

  if (verifyJwt(isTokenAvailable) && verifyJwt(req.cookies.usr_token) ) {
    return {
        redirect: {
          permanent: false,
          destination: "/"
        }
    }
  } else {
    res.setHeader(
      "Set-Cookie", [
        `token=deleted; Max-Age=0`,
        `usr_token=deleted; Max-Age=0`]
    );
  }

})


export default connect(mapStateToProps, mapDispatchToProps)(Login);




