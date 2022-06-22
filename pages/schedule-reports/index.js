import React,{useEffect,useState,useRef} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Select from "react-select";
import {verifyJwt} from '../../utils/verifyJwt'
import {API_URL,API_URL_LOCAL} from '../../utils/config'

import {connect} from 'react-redux';
import {wrapper} from '../../redux/store';
import * as action from '../../redux/filter/action'
import {reauthenticate} from '../../redux/auth/action'

import Layout from '../../components/layout/index'
import Card from '../../components/presentationals/card/card'
import Modal from '../../components/presentationals/modal/index'
import {Close} from '../../components/presentationals/close'
import ReportModal from '../../components/presentationals/modal/reportModal';
import { useExcelDownloder } from 'react-xls';

const optionsFrequently = [
  { value: "daily", label: "Harian" },
  { value: "weekly", label: "Mingguan" },
  { value: "monthly", label: "Bulanan" },
];

const optionsPeriodeLaporan = [
  { value: 1, label: "Hari Terakhir" },
  { value: 7, label: "7 Hari Terakhir" },
  { value: 3, label: "Bulan Ini (MTD)" },
  { value: 120, label: "3 Bulan Terakhir" },
  { value: 360, label: "12 Bulan Terakhir" },
  { value: 0, label: "Seumur Hidup" },
];

function Reports({getFilterList,removeFilterList,badge,token}) {
    const [reports,setReport] = useState([]);
    const [reportsSummary,setReportSummary] = useState([]);
    const [loadingText,setLoadingText] = useState('Submit')
    const [deleteText,setDeleteText] = useState('Hapus')
    const [selectValue, setSelectValue] = useState({
      namaLaporan:'',
      periode: '',
      frekuensi: ''
    });
    const [textInput,setTextInput] = useState('')

    const [modal,setModal] = useState({
        isActive: false,
        id: 0,
        idReport: null,
        reportName: null,
        reportPeriod: null,
        reportFrequency: null,

    });

    const { ExcelDownloder, Type } = useExcelDownloder();
    const router = useRouter()

    const handleInput = (_selectValue,name) => {
        const value = _selectValue.target.value;
        setTextInput(value)
    };

    const handleChange = (_selectValue,name) => {
      const value = _selectValue;
      setSelectValue({
          ...selectValue,
          [name.name]: value
      });
    };

    const _showModal = (id,_idReport,_reportName,_reportPeriod,_reportFrequency) => {
        setModal((modal)=>{
          return {
            isActive : !modal.isActive,
            id : id,
            idReport: _idReport,
            reportName: _reportName,
            reportPeriod: _reportPeriod,
            reportFrequency: _reportFrequency,
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

    const _addReport = () => {
      setLoadingText('Loading...')
      fetch(`${API_URL}/stats/settings`,{
        method:"POST",
        headers:{
          'Authorization': 'Bearer '+token,
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          reportName: textInput,
          period: selectValue.periode.value,
          frequency: selectValue.frekuensi.value
        })
      })
      .then(response => {
        return response.json()
      })
      .then(response => {
        setTimeout(() => {
          setLoadingText('Submit')
        }, 2000);
        setLoadingText('Report Berhasil ditambah')
        router.reload(window.location.pathname)
      })
    }

    const _deleteReport = (id) => {
      setDeleteText('Loading...')
      fetch(`${API_URL}/stats/settings/${id}`,{
        method:"DELETE",
        headers:{
          'Authorization': 'Bearer '+token,
          'Content-Type':'application/json'
        },
      })
      .then(response => {
        return response.json()
      })
      .then(response => {
        setDeleteText('Hapus')
        router.reload(window.location.pathname)
      })
    }

    const downloadReport = async () => {
      let year = new Date().getFullYear();

      const getData = await fetch(`${API_URL}/stats/reports?period=${year}`,{
        method:"GET",
        headers:{
          'Authorization': 'Bearer ' + token,
        }
      })
      const result = await getData.json()

      if (result.status !== 400) {
        setReportSummary(result);
      }
    }


    const fetchData = async () => {
      const getData = await fetch(`${API_URL}/stats/settings`,{
        method:"GET",
        headers:{
          'Authorization': 'Bearer ' + token,
        }
      })
      const result = await getData.json()

      if (result.status !== 400) {
        setReport(result.data);
      }
    };

    useEffect( async () => {
      await downloadReport()
      await fetchData()
    }, [selectValue])

  return (
    <Layout>
      <div className='header__leadsManagement d-flex justify-content-between align-items-center'>
          <h2 className='m-0'>Jadwal Laporan</h2>
      </div>
      <div className='content__wrapper'>
        {reports.map((report,i)=>{
          return (
            <Card className={'card__laporan mb-5'} key={i}>
              <h4 className='mb-4'>{report.reportName}</h4>
              <div className='d-flex align-items-end justify-content-between flex-wrap'>
                <div className='report-info'>
                  <span className='d-block'> Pengiriman Berikutnya Dijadwalkan </span>
                  <span className='d-block'> </span>
                </div>
                <div className='report-action'>
                  <div className='edit-email' onClick={()=>_showModal(2,report.reportId,report.reportName,report.period,report.frequency)}>Ubah</div>
                  {/* <div className='send-email' onClick={()=>_sendReport(report.reportId)}>Email Laporan</div> */}
                  <ExcelDownloder
                    data={reportsSummary.data}
                    filename={'book'}
                    type={Type.Button} // or type={'button'}
                    className='send-email'
                  >
                    Download
                  </ExcelDownloder>
                  <div className='delete-email' onClick={()=>_deleteReport(report.reportId)}>{deleteText}</div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
      <div onClick={()=>_showModal(1)} className='tambah_tugas'><p className='m-0'>+</p></div>

      <div className={`modal__wrapper ${modal.isActive ? 'active' : ''}`}>
        <Modal className="laporan" currentModal={modal.id} modalTarget={1} isActive={modal.isActive}>
          <div className='modal__cs--header d-flex justify-content-between align-items-center '>
              <h2>Catatan</h2>
              <Close action={_closeModalHandler}/>
          </div>
          <div className='modal__cs--body'>
              <form className={''}>
                  <div className='mb-4 d-flex flex-column'>
                      <label>Nama Laporan</label>
                      <input className='' placeholder='' onChange={handleInput} value={textInput} name='namaLaporan'></input>
                  </div>
                  <div className='mb-4 d-flex flex-column'>
                      <label>Periode Laporan</label>
                      <Select
                          openMenuOnFocus={true}
                          options={optionsPeriodeLaporan}
                          value={selectValue.periode}
                          onChange={handleChange}
                          className='react-select-container'
                          classNamePrefix="react-select"
                          name='periode'
                      />
                  </div>
                  <div className='mb-4 d-flex flex-column'>
                      <label>Frekuensi</label>
                      <Select
                          openMenuOnFocus={true}
                          options={optionsFrequently}
                          value={selectValue.frekuensi}
                          onChange={handleChange}
                          className='react-select-container'
                          classNamePrefix="react-select"
                          name='frekuensi'
                      />
                  </div>
              </form>
          </div>
          <div className={`modal__cs--footer }`}>
              <button className='btn btn-primary btn-simpan w-100 p-2' onClick={_addReport}>{loadingText}</button>
          </div>
        </Modal>

        <ReportModal
          ActiveModal={modal.isActive}
          CurrentModal={modal.id}
          modalTarget={2}
          idReport={modal.idReport}
          CloseModal={_closeModalHandler}
          reportName={modal.reportName}
          reportPeriod={modal.reportPeriod}
          reportFrequency={modal.reportFrequency}
          token={token}
        >
        </ReportModal>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({
  filter: state.filter.listFilter,
  badge: state.filter.badge,
  token: state.auth.token,
});

const mapDispatchToProps = dispatch => {
  return {
    getFilterList: (data) => dispatch(action.getFilterList(data)),
    removeFilterList: (data) => dispatch(action.removeFilterList(data)),
  }
}

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


export default connect(mapStateToProps, mapDispatchToProps)(Reports);
