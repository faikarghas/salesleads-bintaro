import React,{useEffect,useState,useRef} from 'react'
import Select from "react-select";
import { useRouter } from 'next/router'
import Modal from '.'

import {Close} from '../close/index'

import {API_URL,API_URL_LOCAL} from '../../../utils/config'
import {optionsFrequently,optionsPeriodeLaporan} from '../../../utils/data'


const ReportModal = ({token,ActiveModal,CurrentModal,modalTarget,CloseModal,idReport,reportName,reportPeriod,reportFrequency}) => {
    const [selectValue, setSelectValue] = useState({
        periode: '',
        frekuensi: '',
    });
    const [textInput,setTextInput] = useState(reportName ? reportName : '')
    const [loadingText,setLoadingText] = useState('Submit')
    const router = useRouter()

    const handleChange = (_selectValue,name) => {
        const value = _selectValue;
        setSelectValue({
            ...selectValue,
            [name.name]: value
        });
      };

    const handleInput = (_selectValue,name) => {
        const value = _selectValue.target.value;
        setTextInput(value)
    };

    const _updateReport = () => {
        setLoadingText('Loading...')
        fetch(`${API_URL}/stats/settings/${idReport}`,{
            method:"PUT",
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

    const setPeriodAndFreqInputValue = () => {
        let currentPeriod 
        if (reportPeriod) {
            currentPeriod = optionsPeriodeLaporan.filter((i)=>{
                return i.value == reportPeriod
            })
        }

        setSelectValue({
            ...selectValue,
            ['periode']: currentPeriod? currentPeriod[0] : {},
            ['frekuensi']: optionsFrequently.filter(item=>item.value == reportFrequency)
        });
    }
    useEffect(() => {
        setTextInput(reportName)
        setPeriodAndFreqInputValue()
    }, [ActiveModal])


  return (
    <Modal className="laporan" currentModal={CurrentModal} modalTarget={modalTarget} isActive={ActiveModal}>
          <div className='modal__cs--header d-flex justify-content-between align-items-center '>
              <Close action={CloseModal}/>
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
              <button className='btn btn-primary btn-simpan w-100 p-2' onClick={_updateReport}>{loadingText}</button>
          </div>
    </Modal>
  )
}

export default ReportModal