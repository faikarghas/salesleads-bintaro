import {useEffect,useState,useRef} from 'react';
import Image from 'next/image';
import {Tabs, Tab} from "react-bootstrap";
import Select from "react-select";
import Router from 'next/router'

import {verifyJwt} from '../utils/verifyJwt';
import {API_URL, API_URL_LOCAL} from '../utils/config';

import {connect} from 'react-redux';
import {wrapper} from '../redux/store';
import {reauthenticate} from '../redux/auth/action';

import Layout from '../components/layout/index';
import { Close } from '../components/presentationals/close';
import Modal from '../components/presentationals/modal';
import Gambaran from '../components/pages/dashboard/gambaran';
import Whatsapp from '../components/pages/dashboard/whatsapp';


function Dashboard({data,token,role}) {
  const [dataStats, setDataStats] = useState()
  const [dataWA, setDataWA] = useState()
  const selectRef = useRef();
  const [selectValue, setSelectValue] = useState("1");
  const [sales, setSales] = useState()


  const setFilterDashboard = async (selectValue) => {
    setSelectValue(selectValue);
    let url;
    if (selectValue.value == null) {
      url = `${API_URL}/stats/dashboard`
    } else {
      url = `${API_URL}/stats/dashboard?userid=${selectValue.value}`
    }
    const getData = await fetch(url,{
      method:"GET",
      headers:{
        'Authorization': 'Bearer ' + token,
      }
    })
    const result = await getData.json()
    setDataStats(result.data)
  }

  const getSales = async () => {
    const getData = await fetch(`${API_URL}/auth/sales`,{
      method:"GET",
      headers:{
        'Authorization': 'Bearer ' + token,
      }
    })
    const result = await getData.json()
    let res = [
      {value:null,label:'Manager'}
    ];
    result.data.forEach(el => {
      res.push({value:el.id,label:el.username})
    });
    setSales(res)
  }

  useEffect(() => {
    setDataStats(data)
    getSales()
  }, [])


  const [modal,setModal] = useState({
    isActive: false,
    id: 0,
  });


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
        <div className="header__leadsManagement d-flex justify-content-between align-items-center">
            <h2 className="m-0">Dashboard</h2>
        </div>
        <div className='content__wrapper p-0'>
          {role == 1 ?
            <div className='d-inline-flex flex-column sortBySales'>
            <label>Sort Berdasarkan Sales</label>
            <Select
              placeholder="Manager"
              openMenuOnFocus={true}
              ref={selectRef}
              options={sales}
              value={selectValue}
              onChange={setFilterDashboard}
              className='react-select-container'
              classNamePrefix="react-select"
            />
        </div>
        :''
        }

          <Tabs defaultActiveKey="gambaran" id="controlled-tab-example">
              <Tab eventKey="gambaran" title="Gambaran">
                  <Gambaran stats={dataStats}/>
              </Tab>
              <Tab eventKey="whatsapp" title="Whatsapp">
                  <Whatsapp />
              </Tab>
          </Tabs>
        </div>

      <div className={`modal__wrapper ${modal.isActive ? 'active' : ''}`}>
        <Modal currentModal={modal.id} modalTarget={1} isActive={modal.isActive} >
          <div className='modal__cs--header d-flex justify-content-between align-items-center '>
            <h2>Filter Berdasarkan</h2>
            <Close action={_closeModalHandler}/>
          </div>
          <div className='modal__cs--body'>
            <div className='input__check'>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
  token: state.auth.token,
  userId: state.auth.idusers,
  role: state.auth.role,
});

const mapDispatchToProps = {

};

export const getServerSideProps = wrapper.getStaticProps(store => async ({req, res, ...etc}) => {

  const isTokenAvailable  = req.cookies.token;

  if(verifyJwt(isTokenAvailable) && verifyJwt(req.cookies.usr_token) ) {

    const isJwtVerified     = isTokenAvailable ? verifyJwt(isTokenAvailable)  : null;
    const username          = verifyJwt(req.cookies.usr_token).username;

    const getDataStats = await fetch(`${API_URL}/stats/dashboard`,{
      method:"GET",
      headers:{
        'Authorization': 'Bearer ' + isTokenAvailable,
      }
    })
    const dataStats = await getDataStats.json()

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

    return { props: { data : dataStats.data } }
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);