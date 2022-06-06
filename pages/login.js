import Image from 'next/image'
import React,{useEffect,useState} from 'react'
import Link from 'next/link';

import {getCookie,setCookie} from '../utils/cookie'
import { getMessaging, onMessage } from "firebase/messaging";
import {firebaseInit,getFCMToken} from '../firebase'

import {useFormik } from 'formik'
import * as Yup from 'yup';

import {connect} from 'react-redux';
import * as action from '../redux/auth/action'
import {wrapper} from '../redux/store';



const Login = ({authenticate,idusers}) => {
  const [notifId,setNotifId] = useState('test-123')
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

  useEffect(() => {
    OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      /* These examples are all valid */
      OneSignal.getUserId(function(userId) {
        console.log("OneSignal User ID:", userId);
        setNotifId(userId)
        // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
      });
    });

  }, [])


  return (
    <div className='login_page'>
        <div className='login_container text-center'>
        <Image alt="logo" src='/images/bintaro-jaya-logo-color.svg' width={150} height={50}/>
        <p>{notifId}</p>

        <br/>
        <br/>
        <br/>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input type="text" name="email" className="form-control" onChange={formik.handleChange}
            value={formik.values.email} placeholder='Username'/>
            {formik.touched.email && formik.errors.email ? <div className='error-input'>{formik.errors.email}</div> : null}
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" onChange={formik.handleChange}
            value={formik.values.password} placeholder='Password'/>
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

  if (isTokenAvailable) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }

})


export default connect(mapStateToProps, mapDispatchToProps)(Login);




