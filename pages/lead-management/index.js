import {useEffect,useState,useRef} from 'react'
import Link from 'next/link'
import Select from "react-select";
import { useRouter } from 'next/router'
import Router from 'next/router'
import {verifyJwt} from '../../utils/verifyJwt'
import {list_filter} from '../../utils/data'
import {API_URL, API_URL_LOCAL} from '../../utils/config'
import {getCurrentDate} from '../../utils/date'


import {connect} from 'react-redux';
import {wrapper} from '../../redux/store';
import * as action from '../../redux/filter/action'
import {reauthenticate} from '../../redux/auth/action'

import Layout from '../../components/layout/index'
import Card1 from '../../components/presentationals/card/card_1'
import { Close } from '../../components/presentationals/close';
import { Button1 } from '../../components/presentationals/button/button_1';
import Modal from '../../components/presentationals/modal';
import { CheckBox } from '../../components/presentationals/checkbox';


const sort_list = [
  { value: "1", label: "Update Terakhir Naik" },
  { value: "2", label: "Update Terakhir Turun" },
];


function Leads({getFilterList,removeFilterList,badge,token,role,data}) {
  const [selectValue, setSelectValue] = useState("1");
  const [listFilterPipeline, setListFilterPipeline] = useState([]);
  const [listFilterStatus, setListFilterStatus] = useState([]);
  const [leads, setLeads] = useState([]);
  const [leadsup, setLeadsup] = useState([]);
  const [offset, setOffset] = useState(10)
  const [isLeadsLoading, setIsLeadsLoading] = useState(false);
  const [isLeadsLoading2, setIsLeadsLoading2] = useState(false);
  const [cl, setSwitchCl] = useState(true);


  const selectRef = useRef();
  const router = useRouter()

  const [modal,setModal] = useState({
    isActive: false,
    subIsActive: false,
    id: 0,
    idSub: 0
  });

  const _sortLeads = (selectValue) => {
    setSelectValue(selectValue);
    console.log(selectValue);
    if (selectValue.value == 1) {
       let sortDescending = leads.sort(function(x, y){
        return new Date(y.leadCreatedAt) - new Date(x.leadCreatedAt);
      })
      setLeads(sortDescending);

    } else {
      console.log('asc');
      let sortAscending = leads.sort(function(x, y){
        return new Date(x.leadCreatedAt) - new Date(y.leadCreatedAt);
      })
      setLeads(sortAscending);

    }
  };

  const _showSort = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };


  const _showModal = (id) => {
    setModal((modal)=>{
      return {
        isActive : !modal.isActive,
        id : id
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

  const _closeSubModalHandler = () => {
    setModal((modal)=>{
      return {
        isActive : modal.isActive,
        subIsActive : false,
        id : modal.id,
        idSub : 0,
      }
    })
  }

  const _updateAccepted =  async (leadId) => {
    if (role === 0) {
      const getData = await fetch(`${API_URL}/leads/accept/${leadId}`,{
        method:"PUT",
        headers:{
          'Authorization': 'Bearer ' + token,
        }
      })
      const data = await getData.json()
      if (data.status === 200) {
        router.push({
          pathname: '/lead-management/[id]',
          query: { id: leadId },
        })
      }
    } else {
      router.push({
        pathname: '/lead-management/[id]',
        query: { id: leadId },
      })
    }

  }

  const _setQueryParams = (item) => {
    if (list_filter.filter_2.includes(item)) {
      setListFilterPipeline(oldArray => [...oldArray,item]);
    } else if (list_filter.filter_3.includes(item)){
      setListFilterStatus(oldArray => [...oldArray,item]);
    }
  }

  const _removeQueryParams = (item) => {
    if (list_filter.filter_2.includes(item)) {
      setListFilterPipeline(oldArray => oldArray.filter(i=>{
        return i !== item
      }));
    } else if (list_filter.filter_3.includes(item)){
      setListFilterStatus(oldArray => oldArray.filter(i=>{
        return i !== item
      }));
    }

  }

  const fetchData = async (loading,firtsInit) => {
    console.log(listFilterStatus);
    setIsLeadsLoading(loading)
    const getData = await fetch(`${API_URL}/leads/?status=${listFilterStatus.join(',')}&pipeline=${listFilterPipeline.join(',')}`,{
      method:"GET",
      headers:{
        'Authorization': 'Bearer ' + token,
      }
    })
    const result = await getData.json()

    if (result.status === 200) {
      let sortDescending = result.data.sort(function(x, y){
        return new Date(y.leadCreatedAt) - new Date(x.leadCreatedAt);
      })
      setLeads(sortDescending);
      setIsLeadsLoading(false)
      setSwitchCl(firtsInit)
    }

  };

  const loadMore = async () => {
    // if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
      setIsLeadsLoading2(true)
      const getData = await fetch(`${API_URL}/leads/?status=${listFilterStatus.join(',')}&pipeline=${listFilterPipeline.join(',')}&offset=${offset}`,{
        method:"GET",
        headers:{
          'Authorization': 'Bearer ' + token,
        }
      })
      const result = await getData.json()

      if (result.status === 200) {
        let sortDescending = result.data.sort(function(x, y){
          return new Date(y.leadCreatedAt) - new Date(x.leadCreatedAt);
        })


        const r = [...leads,...sortDescending]

        setLeads(r);
        setIsLeadsLoading2(false)
        setOffset(prevState => (prevState += 10));
      }
    // }
  };

  useEffect(()  => {
    // window.addEventListener('scroll', loadMore);

    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?status=${listFilterStatus.join(',')}&pipeline=${listFilterPipeline.join(',')}`;
    window.history.pushState({path:newurl},'',newurl);

    fetchData(true);
    // setLeads(data.data)
  }, [listFilterPipeline,listFilterStatus])

  return (
    <Layout>
      <div className='header__leadsManagement d-flex justify-content-between align-items-center'>
          <h2 className='m-0'>Leads</h2>
      </div>
      <div className='header__leadsManagement header__leadsManagement-filter d-flex align-items-center'>
        <div className='header__leadsManagement-filter--sort h-100' onClick={_showSort}>
            <div className='d-flex flex-column w-100'>
              <label>Sort Berdasarkan</label>
              <Select
                placeholder="Update Terakhir Naik"
                openMenuOnFocus={true}
                ref={selectRef}
                options={sort_list}
                value={selectValue}
                onChange={_sortLeads}
                className='react-select-container'
                classNamePrefix="react-select"
              />
            </div>
            <img width='30px' src='images/sort.png' alt='Sort icons created by Bamicon - Flaticon'/>
        </div>
        <div className='header__leadsManagement-filter--filter h-100' onClick={()=>{_showModal(2)}}>
          <div>
            <label>Filter Berdasarkan</label>
            <p className='m-0'>Pilih Filter</p>
          </div>
          <div className='filter_w_badge'>
            <img width='30px' src='images/filter.png' alt='Filter icons created by Tempo_doloe - Flaticon'/>
            <div className={`badge ${badge == 0 ? 'd-none' : ''}`}>{badge}</div>
          </div>
        </div>
      </div>
      <div className='content__wrapper'>
        <div className='lead__page'>
          <label className='text-center d-block'>Leads Berjalan ({leads.length})</label>
          { isLeadsLoading ?
            <div className="leads_loading active"></div>
            :
            leads.map((lead, i) =>{
              let statusLead = lead.status;

              if(lead.userAcceptedName){
                if (lead.status !== 'Hot' &&
                lead.status !== 'Warm' &&
                lead.status !== 'Cold' &&
                lead.status !== 'Close'
                ) {
                  statusLead = ' ';
                }
              } else {
                statusLead = lead.status;
              }

              return (
                  <div onClick={()=>_updateAccepted(lead.leadId)}  key={i}>
                      <Card1
                      info={lead.pipeline?.toUpperCase()}
                      status_lead={statusLead}
                      name={lead.leadName}
                      project_name='Bintaro Jaya'
                      assigned_agent={`Sales: ${lead.userNotifiedName ? lead.userNotifiedName : lead.userAcceptedName}`}
                      last_activity={getCurrentDate(lead.leadCreatedAt)}
                      next_activity={``}
                      />
                  </div>
              )
            })
          }
          {leadsup.map((lead, i) =>{
              let statusLead = lead.status;

              if(lead.userAcceptedName){
                if (lead.status !== 'Hot' &&
                lead.status !== 'Warm' &&
                lead.status !== 'Cold' &&
                lead.status !== 'Close'
                ) {
                  statusLead = ' ';
                }
              } else {
                statusLead = lead.status;
              }

              return (
                  <div onClick={()=>_updateAccepted(lead.leadId)}  key={i}>
                      <Card1
                      info={lead.pipeline.toUpperCase()}
                      status_lead={statusLead}
                      name={lead.leadName}
                      project_name='Bintaro Jaya'
                      assigned_agent={`Sales: ${lead.userNotifiedName ? lead.userNotifiedName : lead.userAcceptedName}`}
                      last_activity={getCurrentDate(lead.leadCreatedAt)}
                      next_activity={``}
                      />
                  </div>
              )
          })}
          <div className={isLeadsLoading ? 'd-none':'d-block text-center'}>
            <button onClick={()=>loadMore()} style={{backgroundColor:'#2D344F',boxShadow:'none',border:'none'}} className="ps-4 pe-4 fs-5 btn btn-primary justify-content-center align-items-center">{isLeadsLoading2?'Loading...' : 'Load More'}</button>
          </div>
        </div>
      </div>

      {/* MODAL WRAPPER */}
      <div className={`modal__wrapper ${modal.isActive ? 'active' : ''}`}>
        {/* MODAL SORT */}
        <div className={`modal__wrapper--sort modal__cs ${modal.isActive && modal.id == 1 ? 'active' : ''}`}>
          <Close action={_closeModalHandler}/>
        </div>
        {/* END MODAL SORT */}

        {/* MODAL FILTER */}
        <div className={`modal__wrapper--filter modal__cs ${modal.isActive && modal.id == 2 ? 'active' : ''}`}>
          <div className='modal__cs--header d-flex justify-content-between align-items-center'>
              <h2>Filter Berdasarkan</h2>
              <Close action={_closeModalHandler}/>
          </div>
          <div className='modal__cs--body'>
            <div className='button-filter-list'>
              <div className='mb-4'>
                <h4 className='mb-3'>Tahapan lead pipeline</h4>
                {list_filter.filter_2.map((value,key)=>{
                return <Button1 key={key} setQueryParams={_setQueryParams} removeQueryParams={_removeQueryParams} getFilterList={getFilterList} removeFilterList={removeFilterList} text={value}/>
                })}
              </div>
              <div className='mb-4'>
                <h4 className='mb-3'>Status Lead</h4>
                {list_filter.filter_3.map((value,key)=>{
                return <Button1 key={key} setQueryParams={_setQueryParams} removeQueryParams={_removeQueryParams} getFilterList={getFilterList} removeFilterList={removeFilterList} text={value}/>
                })}
              </div>
            </div>
          </div>
        </div>
        {/* END MODAL FILTER */}

        {/* MODAL SUB FILTER */}
        <Modal currentModal={modal.idSub} modalTarget={3} isActive={modal.isSubActive} >
          <div className='modal__cs--header d-flex justify-content-between align-items-center '>
            <h2>Filter Berdasarkan</h2>
            <Close action={_closeSubModalHandler}/>
          </div>
          <div className='modal__cs--body'>
            <div className='input__check'>
              <CheckBox text="Pilih / Hapus Semua Pilihan" defaultChecked={true} />
              <CheckBox text="Bintaro Jaya" defaultChecked={false} />
            </div>
          </div>
        </Modal>

        <Modal currentModal={modal.idSub} modalTarget={4} isActive={modal.isSubActive} >
          <div className='modal__cs--header d-flex justify-content-between align-items-center mb-5'>
            <h2>Pilih Sales Yang Bersangkutan</h2>
            <Close action={_closeSubModalHandler}/>
          </div>
          <div className='modal__cs--body'>
            <div className='input__check'>
              <CheckBox text="Pilih / Hapus Semua Pilihan" defaultChecked={true} />
              <CheckBox text="Bintaro Jaya" defaultChecked={true} />
            </div>
          </div>
        </Modal>

        <Modal currentModal={modal.idSub} modalTarget={5} isActive={modal.isSubActive} >
          <div className='modal__cs--header d-flex justify-content-between align-items-center mb-5'>
            <h2>Pilih Sumber Data</h2>
            <Close action={_closeSubModalHandler}/>
          </div>
          <div className='modal__cs--body'>
            <div className='input__check'>
              <CheckBox text="Pilih / Hapus Semua Pilihan" defaultChecked={true} />
              <CheckBox text="Bintaro Jaya" defaultChecked={true} />
            </div>
          </div>
        </Modal>
        {/* END SUB MODAL FILTER */}
      </div>
      {/* END MODAL WRAPPER */}
    </Layout>
  )
}

const mapStateToProps = state => ({
  filter: state.filter.listFilter,
  badge: state.filter.badge,
  token: state.auth.token,
  role: state.auth.role
});

const mapDispatchToProps = dispatch => {
  return {
    getFilterList: (data) => dispatch(action.getFilterList(data)),
    removeFilterList: (data) => dispatch(action.removeFilterList(data)),
  }
}

export const getServerSideProps =  wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {

  const isTokenAvailable  = req.cookies.token;

  if(verifyJwt(isTokenAvailable) && verifyJwt(req.cookies.usr_token) ) {
    const isJwtVerified     = isTokenAvailable ? verifyJwt(isTokenAvailable)  : null;
    const username          = verifyJwt(req.cookies.usr_token).username;

    const getData = await fetch(`${API_URL}/leads/?status=&pipeline=`,{
      method:"GET",
      headers:{
        'Authorization': 'Bearer ' + req.cookies.token,
      }
    })
    const leads = await getData.json()

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

    return {
      props:{
          data:[]
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

export default connect(mapStateToProps, mapDispatchToProps)(Leads);
