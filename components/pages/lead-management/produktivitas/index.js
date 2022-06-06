import {useEffect,useState} from 'react'
import Select from "react-select";

import Card from '../../../presentationals/card/card'

const options = [
    { value: "1", label: "Sekarang" },
    { value: "2", label: "7 Hari Terakhir" },
    { value: "3", label: "Bulan Ini (MTD)" },
    { value: "4", label: "3 Bulan Terakhir" },
    { value: "5", label: "12 Bulan Terakhir" },
    { value: "6", label: "Tahun ini (YTD)" },
    { value: "7", label: "Seumur hidup" }
];

const Produktivitas = ({histories}) => {
    const [selectValue, setSelectValue] = useState("");

    const handleChange = (selectValue) => {
        setSelectValue(selectValue);
    };

    const totalWa = histories.filter(data=>{
        return data.userContactedVia === 'wa'
    })

    const totalTelephone = histories.filter(data=>{
        return data.userContactedVia === 'telephone'
    })

    const totalEmail = histories.filter(data=>{
        return data.userContactedVia === 'mail'
    })

  return (
    <div className='tab__content'>
        <div className='tab__content_body'>
            <Card className="card__produktivitas">
                {/* <Select
                    openMenuOnFocus={true}
                    options={options}
                    value={selectValue}
                    onChange={handleChange}
                    className='react-select-container'
                    classNamePrefix="react-select"
                /> */}
                <h4 className='mb-4'>Ringkasan Aktivitas</h4>
                <div className='summary__activity'>
                    <div className='summary__activity_item'>
                        <h3>{totalTelephone.length}</h3>
                        <label>Perkiraan Telepon</label>
                    </div>
                    <div className='summary__activity_item'>
                        <h3>{totalWa.length}</h3>
                        <label>Perkiraan WhatsApp</label>
                    </div>
                    <div className='summary__activity_item'>
                        <h3>{totalEmail.length}</h3>
                        <label>Perkiraan Email</label>
                    </div>
                </div>
            </Card>
        </div>
    </div>
  )
}

export default Produktivitas