import {useEffect,useState,useRef} from 'react'
import Image from 'next/image'
import Select from "react-select";
import { useRouter } from 'next/router'

import {connect} from 'react-redux';

import {API_URL, API_URL_LOCAL} from '../../../../utils/config'
import {getTime,getCurrentDate} from '../../../../utils/date'

import Button1 from '../../../presentationals/button/button_1'
import Card from '../../../presentationals/card/card'
import {Close} from '../../../presentationals/close'
import Modal from '../../../presentationals/modal'
import { CheckBox } from '../../../presentationals/checkbox'
import { Bookmark } from '../../../svg/bookmark'
import Date from '../../../presentationals/date';


const optionsTipeStatus = [
    { value: "1", label: "Hot" },
    { value: "2", label: "Warm" },
    { value: "3", label: "Cold" },
];
const optionsCatatan = [
    { value: "4", label: "No Pick-Up" },
    { value: "5", label: "Outstation" },
    { value: "6", label: "Very Busy" },
    { value: "7", label: "Leasehold issue" },
    { value: "8", label: "Need More Rebate" },
    { value: "9", label: "Discuss With Family" },
    { value: "10", label: "Need To Bring Partner" },
    { value: "11", label: "Need To Check Loan Availability" },
    { value: "12", label: "Lainnya" },
];
const optionsDari = [
    { value: "13", label: "New" },
    { value: "14", label: "Outstation" },
    { value: "15", label: "Very Busy" },
    { value: "16", label: "Leasehold issue" },
];
const optionsKepada = [
    { value: "17", label: "No Pick-Up" },
    { value: "18", label: "Outstation" },
    { value: "19", label: "Very Busy" },
    { value: "20", label: "Leasehold issue" },
    { value: "21", label: "Need More Rebate" },
    { value: "22", label: "Discuss With Family" },
    { value: "23", label: "Need To Bring Partner" },
    { value: "24", label: "Need To Check Loan Availability" },
    { value: "25", label: "Lainnya" },
];
const optionsPipeline = [
    { value: "17", label: "Pending Response" },
    { value: "18", label: "Contacted" },
    { value: "19", label: "Sales Gallery Visit" },
    { value: "20", label: "Negotiation" },
    { value: "21", label: "Booked" },
    { value: "22", label: "SPA Signed" },
    { value: "23", label: "Lost" },
];
const optionsStatus = [
    { value: "17", label: "Hot" },
    { value: "18", label: "Warm" },
    { value: "19", label: "Cold" },
];

const Tugas = ({token,leadid,idusers,histories}) => {
    const [selectValue, setSelectValue] = useState({
        tipe_status: '',
        catatan: '',
        dari: '',
        kepada: '',
        pipeline : '',
        catatan : '',
        status : ''
    });
    const [isDone, setIsDone] = useState(false);
    const [historyContactId, setHistoryContactId] = useState();
    const [modal,setModal] = useState({
        isActive: false,
        id: 0,
    });
    const [catatanText,setCatatanText] = useState('Simpan')
    const router = useRouter()


    const _setDone = (selectValue) => {
        setIsDone(prevstate => !prevstate);
    };

    const handleChange = (selectValue,name) => {
        const value = selectValue;
        setSelectValue({
            ...selectValue,
            [name]: value
        });
    };

    const handleTextarea = (selectValue) => {
        const value = selectValue.target.value;
        setSelectValue({
            ...selectValue,
            [selectValue.target.name]: value
        });
    };

    const _showModal = (id,_historyContactId='') => {
        setModal((modal)=>{
          return {
            isActive : !modal.isActive,
            id : id
          }
        })
        setHistoryContactId(_historyContactId)
    }

    const _closeModalHandler = () => {
        setModal((modal)=>{
            return {
            isActive : false,
            id : 0
            }
        })
    }

    const _updateCatatan = async () => {
        setCatatanText('Loading...')
        const getData = await fetch(`${API_URL}/leads/notes/${historyContactId}`,{
            method:"PUT",
            headers:{
              'Authorization': 'Bearer '+token,
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
                notes: selectValue.catatan,
                historyContactId: historyContactId,
                userId: idusers
            })
        })
        const result = await getData.json()
        if (result.status){
            router.reload(window.location.pathname)
            setCatatanText('Simpan')
        }
    }


  return (
    <div className='tab__content'>
        <div className='tab__content_listFilters'>
            {/* <ul>
                <li><Button1 text="Telepon"/></li>
                <li><Button1 text="WhatsApp"/></li>
                <li><Button1 text="Email"/></li>
            </ul> */}
        </div>
        <div className='tab__content_body'>
            <div className='tab__content_body--toDo'>
                <label className='text-center d-block'>Selesai ({histories.length})</label>
                <div className='list_toDo'>
                    {histories.map((history,i)=>{
                        return (
                            <Card className="card__toDo" key={i}>
                                <div className='card__toDo--header'>
                                    <span className='d-block info__lead'>{history.userContactedVia.toUpperCase()}</span>
                                    {/* <Bookmark /> */}
                                </div>
                                <div className='card__toDo--body'>
                                    <div className='d-flex justify-content-between'>
                                        <ul>
                                            <li><p className='time'>{getCurrentDate(history.createdAt)}</p></li>
                                        </ul>
                                        <div>
                                            <div className='btn btn-tambah' id={history.historyContactId} onClick={()=>_showModal(2,history.historyContactId)} >{history.notes ? 'Ubah Catatan' : 'Tambah Catatan'}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='card__toDo--footer'>
                                    <p className='m-0 last__activity'>{history.notes}</p>
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </div>
        <div className={`modal__wrapper ${modal.isActive ? 'active' : ''}`}>

            <Modal className="pipeline" currentModal={modal.id} modalTarget={2} isActive={modal.isActive}>
                <div className='modal__cs--header d-flex justify-content-between align-items-center '>
                    <h2>Catatan</h2>
                    <Close action={_closeModalHandler}/>
                </div>
                <div className='modal__cs--body'>
                    <form className={''}>
                        <div className='mb-4 d-flex flex-column'>
                            <label>Catatan</label>
                            <textarea rows="4" className='form-input' cols={3} value={selectValue.catatan} onChange={handleTextarea} name='catatan'/>
                        </div>
                    </form>
                </div>
                <div className={`modal__cs--footer }`}>
                    <button className='btn btn-primary btn-simpan w-100 p-2' onClick={_updateCatatan}>{catatanText}</button>
                </div>
            </Modal>

            <Modal className="rincian-tugas" currentModal={modal.id} modalTarget={1} isActive={modal.isActive}>
                <div className='modal__cs--header d-flex justify-content-between align-items-center '>
                    <h2>Rincian Tugas</h2>
                    <Close action={_closeModalHandler}/>
                </div>
                <div className='modal__cs--body'>
                    <ul className='mb-5'>
                        <li><p className='next__activity'>Call new lead</p></li>
                        <li><p className='time'> 11 Dec 2020 • 18.05 </p></li>
                    </ul>
                    <div className='d-flex align-items-center justify-content-between'>
                        <CheckBox text="Tandai Sebagai Selesai" onChange={_setDone} defaultChecked={false} />
                        <a className='btn-call' href=''>Telepon Sekarang</a>
                    </div>
                    <form className={`${isDone ? 'd-block':'d-none'}`}>
                        <div className='mb-4'>
                            <label>Tipe Status</label>
                            <Select
                                openMenuOnFocus={true}
                                options={optionsTipeStatus}
                                value={selectValue.tipe_status}
                                onChange={handleChange}
                                className='react-select-container'
                                classNamePrefix="react-select"
                                name='tipe_status'
                            />
                        </div>
                        <div className='mb-4'>
                            <label>Catatan</label>
                            <Select
                                openMenuOnFocus={true}
                                options={optionsCatatan}
                                value={selectValue.catatan}
                                onChange={handleChange}
                                className='react-select-container'
                                classNamePrefix="react-select"
                                name='catatan'
                            />
                        </div>
                        <div className='mb-4'>
                            <label>Dari</label>
                            <Select
                                openMenuOnFocus={true}
                                options={optionsDari}
                                value={selectValue.dari}
                                onChange={handleChange}
                                className='react-select-container'
                                classNamePrefix="react-select"
                                name='dari'
                            />
                        </div>
                        <div className='mb-4'>
                            <label>Kepada</label>
                            <Select
                                openMenuOnFocus={true}
                                options={optionsKepada}
                                value={selectValue.dari}
                                onChange={handleChange}
                                className='react-select-container'
                                classNamePrefix="react-select"
                                name='kepada'
                            />
                        </div>
                    </form>

                </div>
                <div className={`modal__cs--footer ${isDone ? 'd-block':'d-none'}`}>
                    <button className='btn btn-primary btn-simpan w-100 p-2'>Simpan</button>
                </div>
            </Modal>
            <Modal className="status" currentModal={modal.id} modalTarget={3} isActive={modal.isActive}>
                <div className='modal__cs--header d-flex justify-content-between align-items-center '>
                    <h2>Update Status</h2>
                    <Close action={_closeModalHandler}/>
                </div>
                <div className='modal__cs--body'>
                    <form className={''}>
                        <div className='mb-4'>
                            <label>Status</label>
                            <Select
                                openMenuOnFocus={true}
                                options={optionsStatus}
                                value={selectValue.status}
                                onChange={handleChange}
                                className='react-select-container'
                                classNamePrefix="react-select"
                                name='status'
                                placeholder="Hot"
                            />
                        </div>
                    </form>
                </div>
                <div className={`modal__cs--footer }`}>
                    <button className='btn btn-primary btn-simpan w-100 p-2'>Simpan</button>
                </div>
            </Modal>
        </div>

        {/* <div onClick={()=>_showModal(2)} className='tambah_tugas'><p className='m-0'>+</p></div> */}
    </div>
  )
}

const mapStateToProps = state => ({
    token: state.auth.token
  });

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tugas);