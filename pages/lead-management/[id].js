import React,{useEffect,useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Router from 'next/router'
import {Tabs, Tab} from "react-bootstrap";

import {connect} from 'react-redux';
import * as action from '../../redux/filter/action'
import {wrapper} from '../../redux/store';
import {reauthenticate} from '../../redux/auth/action'

import { list_filter } from '../../utils/data';
import {getCurrentDate} from '../../utils/date'
import {verifyJwt} from '../../utils/verifyJwt'
import {API_URL,API_URL_LOCAL} from '../../utils/config'
import {getCookie,setCookie} from '../../utils/cookie'

import Layout from '../../components/layout/index'
import Tugas from '../../components/pages/lead-management/tugas';
import Detail from '../../components/pages/lead-management/detail';
import Produktivitas from '../../components/pages/lead-management/produktivitas';
import Lifecycle from '../../components/pages/lead-management/lifecycle';
import { Favorite } from '../../components/svg/favorite';
import Button1 from '../../components/presentationals/button/button_1'


const DetailLead = ({getFilterList,removeFilterList,data,token,idusers}) => {
    const [statusLead,setStatusLead] = useState(data.data.status ? data.data.status.toLowerCase() : '')
    const [pipelineLead,setPipeline] = useState(data.data.pipeline ? data.data.pipeline.toLowerCase() : '')
    const [histories, setHistory] = useState([]);
    const router = useRouter()

    const _setStatusHandler = async (leadId,status) =>{
        const getData = await fetch(`${API_URL}/leads/status/${leadId}`,{
            method:"PUT",
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token,
            },
            body:JSON.stringify({
                status:status
            })
        })
        const res = await getData.json()
        if (res.status === 200) {
            setStatusLead(res.data.status.toLowerCase())
        }
    }

    const _setPipelineHandler = async (leadId,pipeline,_prevPipeline) => {
        const getData = await fetch(`${API_URL}/leads/pipeline/${leadId}`,{
            method:"PUT",
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token,
            },
            body:JSON.stringify({
                prevPipeline: _prevPipeline,
                nextPipeline: pipeline
            })
        })
        const res = await getData.json()
        if (res.status === 200) {
            setPipeline(res.data.pipeline.toLowerCase())
        }
    }

    const _updateContacted = async (leadId,contact,contactValue) => {
        const getData = await  fetch(`${API_URL}/leads/contact/${leadId}`,{
            method:"PUT",
            headers:{
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                contactedVia: contact,
            })
        })
        const data = await getData.json()
        if (data.status === 200) {
            switch (contact) {
                case 'telephone':
                    window.open(
                        `tel:${contactValue}`,
                        '_blank'
                    );
                    router.reload(window.location.pathname)
                    break;
                case 'wa':
                    let formattedWaValue = contactValue.split('')
                    console.log(formattedWaValue,'format1')

                    if (formattedWaValue[0] === "+" && formattedWaValue[1] === "6" && formattedWaValue[2] === "2"){
                        formattedWaValue = formattedWaValue.slice(1,14).join('')
                    }

                    window.open(
                        `https://api.whatsapp.com/send?phone=${formattedWaValue}`,
                        '_blank'
                    );
                    router.reload(window.location.pathname)
                    break;
                case 'mail':
                    window.open(
                        `mailto: ${contactValue}`,
                        '_blank'
                    );
                    router.reload(window.location.pathname)
                    break;
                default:
                    break;
            }
        }
    }

    const fetchData = async () => {
        const getData = await fetch(`${API_URL}/leads/contact/${data.data.leadId}?via=`,{
          method:"GET",
          headers:{
            'Authorization': 'Bearer ' + token,
          }
        })
        const result = await getData.json()

        let sortDescending = result.data.sort(function(x, y){
            return new Date(y.createdAt) - new Date(x.createdAt);
        })
        setHistory(sortDescending);

    };

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Layout>
            <div className='header__leadsManagement d-flex justify-content-between align-items-center'>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                        <li className="breadcrumb-item"><Link  href="/lead-management"><a>Leads</a></Link></li>
                        <li className="breadcrumb-item active" aria-current="page"><Link  href="#"><a>{data.data.leadName}</a></Link></li>
                    </ol>
                </nav>
            </div>
            <div className='content__wrapper p-0'>
                <div className='lead__detail'>
                    <div className='lead__detail_header' style={{backgroundImage:"url('/images/background.jpg')", backgroundSize: 'contain'}}>
                        <div className='text-end d-flex align-items-center justify-content-end'>
                            <Favorite/>
                        </div>
                        <div className='card_lead card__model_2'>
                            <div className='card__model_2--header d-flex justify-content-between align-items-center'>
                                <span className='d-block info__lead'>{!data.data.status ? 'NEW': ''}</span>
                                {data.data.status ? <span className={`d-block status__lead ${statusLead.toLowerCase()}`}>{statusLead}</span> : ''}
                            </div>
                            <div className='card__model_2--body '>
                                <div className='text-center mb-5'>
                                    <h3 className='client__name'>{data.data.leadName}</h3>
                                    <p className='m-0 project__name'>Bintaro Jaya</p>
                                    <div className='client__contact'>
                                        <ul className='d-flex justify-content-center'>
                                            <li><div onClick={()=>_updateContacted(data.data.leadId,'telephone',data.data.leadPhone)} className='w-50-px h-50-px rounded-circle mb-2'><Image alt="telephone" src={'/images/telephone.png'} width={25} height={25}/></div><span>Telephone</span></li>
                                            <li><div onClick={()=>_updateContacted(data.data.leadId,'wa',data.data.leadPhone)} className='w-50-px h-50-px rounded-circle mb-2'><Image alt="wa" src={'/images/whatsapp.png'} width={24} height={24}/></div><span>WhatsApp</span></li>
                                            <li><div onClick={()=>_updateContacted(data.data.leadId,'mail',data.data.leadEmail)} className='w-50-px h-50-px rounded-circle mb-2'><Image alt="mail" src={'/images/email.png'} width={28} height={28}/></div><span>Email</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div>
                                    <p className='m-0 assigned__agent'>Ditugaskan kepada {data.data.userAcceptedName}</p>
                                    {/* <span className='d-block last__activity'>Terakhir diperbaharui 6 Hari lalu oleh System</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lead__detail_body'>
                        <div className='lead__detail_body--action'>
                            <div>
                                <p className='source_text'>Perbaharui Status</p>
                                <ul>
                                    {list_filter.filter_3.map((item,i)=>{
                                        if (item != 'New') return <li key={i}><Button1 unique={true} value={statusLead} set={() => _setStatusHandler(data.data.leadId,item)} text={item}/></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className='lead__detail_body--action'>
                            <div>
                                <p className='source_text'>Pindahkan ke Pipeline</p>
                                <ul>
                                    {list_filter.filter_2.map((item,i)=>{
                                        if (item != 'New') return <li key={i}><Button1 unique={true} value={pipelineLead} set={() => _setPipelineHandler(data.data.leadId,item,data.data.pipeline)} text={item}/></li>
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className='lead__detail_body--nav'>
                            <Tabs defaultActiveKey="tugas"  id="controlled-tab-example">
                                <Tab eventKey="tugas" title="Tugas">
                                    <Tugas histories={histories} idusers={idusers}/>
                                </Tab>
                                <Tab eventKey="detail" title="Detail">
                                    <Detail data={data} />
                                </Tab>
                                <Tab eventKey="lifecycle" title="Lifecycle">
                                    <Lifecycle histories={histories} />
                                </Tab>
                                <Tab eventKey="produktivitas" title="Produktivitas">
                                    <Produktivitas histories={histories}/>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    token: state.auth.token,
    idusers: state.auth.idusers
});

const mapDispatchToProps = dispatch => {
    return {
      getFilterList: (data) => dispatch(action.getFilterList(data)),
      removeFilterList: (data) => dispatch(action.removeFilterList(data)),
    }
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({req, res, ...etc}) => {

    const isTokenAvailable  = req.cookies.token;

    if(verifyJwt(isTokenAvailable) && verifyJwt(req.cookies.usr_token) ) {
        const isJwtVerified     = isTokenAvailable ? verifyJwt(isTokenAvailable)  : null;
        const username          = verifyJwt(req.cookies.usr_token).username;
        const leadId            = etc.params.id;
        let data                = []


        const getData = await fetch(`${API_URL}/leads/detail/${leadId}`,{
            method:"GET",
            headers:{
                'Authorization': 'Bearer ' + req.cookies.token,
            }
        })
        data = await getData.json()


        if (isJwtVerified && typeof window === 'undefined') {
            const idUsers           = isJwtVerified.id;
            const role              = isJwtVerified.role;

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
                data:data
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




export default connect(mapStateToProps, mapDispatchToProps)(DetailLead);
