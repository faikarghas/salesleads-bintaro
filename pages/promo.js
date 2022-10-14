import Image from 'next/image'
import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

import {getCookie,setCookie} from '../utils/cookie'
// import { getMessaging, onMessage } from "firebase/messaging";
import {firebaseInit,getFCMToken} from '../firebase'

import {useFormik } from 'formik'
import * as Yup from 'yup';

import {connect} from 'react-redux';
import * as action from '../redux/auth/action'
import {wrapper} from '../redux/store';

import {API_URL,API_URL_LOCAL} from '../utils/config'


const Promo = ({authenticate,idusers}) => {
  const router = useRouter()
  const { source,promo } = router.query
  const [submitText,setSubmitText] = useState('Submit')

  const formik = useFormik({
    initialValues: {
      lead:'',
      phone:'',
      email: '',
      source: source,
      promo: promo,
      rangePrice: '',
      cluster: '',
      type: '',
      periodePromo: '',
      city: '',
      region: '',
    },
    validationSchema: Yup.object({
        lead: Yup.string()
            .required('Cannot be left blank'),
        phone: Yup.string()
            .required('Cannot be left blank'),
        email: Yup.string()
            .required('Cannot be left blank'),
        rangePrice: Yup.string()
            .required('Cannot be left blank'),
        cluster: Yup.string()
            .required('Cannot be left blank'),
        type: Yup.string()
            .required('Cannot be left blank'),
        periodePromo: Yup.string()
            .required('Cannot be left blank'),
        city: Yup.string()
            .required('Cannot be left blank'),
        region: Yup.string()
            .required('Cannot be left blank'),
    }),
    onSubmit: (values,{setFieldError,resetForm}) => {
      setSubmitText('Loading...')

      fetch(`${API_URL}/leads`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          lead : values.lead,
          phone : values.phone,
          email : values.email,
          rangePrice : values.rangePrice,
          cluster : values.cluster,
          periodePromo : values.periodePromo,
          city : values.city,
          region : values.region,
          source: source,
          promo: promo,
        })
      })
      .then(response => {
        return response.json()
      })
      .then(response => {
        if (response.status == 400) {
            console.log('gagal');
        } else if (response.status == 200) {
            console.log('sukses');
            setSubmitText('Submit')
        }

      })
    },
  });

  useEffect(() => {
  }, [])


  return (
    <div className='login_page'>
        <div className='login_container text-center' style={{width:700}}>
        <Link href='/login'><a>Login</a></Link>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <input type="text" name="lead" className="form-control" onChange={formik.handleChange}
            value={formik.values.lead} placeholder='Lead'/>
            {formik.touched.lead && formik.errors.lead ? <div className='error-input'>{formik.errors.lead}</div> : null} 
          </div>
          <div className="mb-3">
            <input type="text" name="phone" className="form-control" onChange={formik.handleChange}
            value={formik.values.phone} placeholder='Phone'/>
            {formik.touched.phone && formik.errors.phone ? <div className='error-input'>{formik.errors.phone}</div> : null} 
          </div>
          <div className="mb-3">
            <input type="text" name="email" className="form-control" onChange={formik.handleChange}
            value={formik.values.email} placeholder='email'/>
            {formik.touched.email && formik.errors.email ? <div className='error-input'>{formik.errors.email}</div> : null} 
          </div>
          <div className="mb-3">
            <input type="text" name="rangePrice" className="form-control" onChange={formik.handleChange}
            value={formik.values.rangePrice} placeholder='rangePrice'/>
            {formik.touched.rangePrice && formik.errors.rangePrice ? <div className='error-input'>{formik.errors.rangePrice}</div> : null} 
          </div>
          <div className="mb-3">
            <input type="text" name="cluster" className="form-control" onChange={formik.handleChange}
            value={formik.values.cluster} placeholder='cluster'/>
            {formik.touched.cluster && formik.errors.cluster ? <div className='error-input'>{formik.errors.cluster}</div> : null} 
          </div>
          <div className="mb-3">
            <input type="text" name="type" className="form-control" onChange={formik.handleChange}
            value={formik.values.type} placeholder='type'/>
            {formik.touched.type && formik.errors.type ? <div className='error-input'>{formik.errors.type}</div> : null} 
          </div>
          <div className="mb-3">
            <input type="text" name="periodePromo" className="form-control" onChange={formik.handleChange}
            value={formik.values.periodePromo} placeholder='periodePromo'/>
            {formik.touched.periodePromo && formik.errors.periodePromo ? <div className='error-input'>{formik.errors.periodePromo}</div> : null} 
          </div>
          <div className="mb-3">
            <input type="text" name="city" className="form-control" onChange={formik.handleChange}
            value={formik.values.city} placeholder='city'/>
            {formik.touched.city && formik.errors.city ? <div className='error-input'>{formik.errors.city}</div> : null} 
          </div>
          <div className="mb-3">
            <input type="text" name="region" className="form-control" onChange={formik.handleChange}
            value={formik.values.region} placeholder='region'/>
            {formik.touched.region && formik.errors.region ? <div className='error-input'>{formik.errors.region}</div> : null} 
          </div>
          <button type="submit" className="btn btn-primary w-100">{submitText}</button>
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
    authenticate: (email,password) => dispatch(action.authenticate(email,password)),
  }
}


export const getServerSideProps = wrapper.getStaticProps(store => ({req, res, ...etc}) => {
  // if (req.cookies.idusers && req.cookies.token) {
  //     store.dispatch(reauthenticate(req.cookies.idusers,req.cookies.token))
  // }
})


export default connect(mapStateToProps, mapDispatchToProps)(Promo);




