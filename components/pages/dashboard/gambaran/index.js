import React,{useState,useEffect} from 'react'
import Card from '../../../presentationals/card/card'

const Gambaran = ({stats}) => {
    const [total,setTotal] = useState({
        totalLost:'',
        totalLead:'',
        totalActive:'',
        konversi:''
    })

    const _total = () => {
        let totalLost = stats.new.lost + stats.pending.lost + stats.contacted.lost + stats.galleryVisit.lost + stats.negotiation.lost + stats.booked.lost + stats.spaSign.lost;
        let totalLead = stats.new.total + stats.pending.total + stats.contacted.total + stats.galleryVisit.total + stats.negotiation.total + stats.booked.total + stats.spaSign.total;
        let totalActive = stats.pending.active + stats.contacted.active + stats.galleryVisit.active + stats.negotiation.active + stats.booked.active + stats.spaSign.active;
        let konversi = (totalActive / stats.new.total * 100).toFixed(2)
        
        setTotal({
            totalLost,
            totalLead,
            totalActive,
            konversi
        })
    }

    useEffect(() => {
        if(stats){
            _total()
        }
    }, [stats])


    return (
        // <>
        // <p>{JSON.stringify(stats ? stats.new : '')}</p>
        // <p>{stats ? stats.new.total : ''}</p>
        // <p>{total.totalLost}</p>

        // </>
        <div className='d-flex dashboard__wrapper'>
            <div className='dashboard__wrapper-item'>
                <h4 className='text-center'>FUNNEL LEADS</h4>
                <Card className="card__funnel p-4">
                    <div className='funnel__wrapper'>
                        <div className='funnel_container '>
                            <div className='funnel_item funnel_1 funnel_header'>
                                <div className='funnel_header2'></div>
                                <div className='funnel_item_header'>
                                    <span className='type'>NEW</span>
                                    <div className='text-center'>
                                        <span className='m-0 d-block'>{stats && stats.new.total} Leads</span>
                                        <span>{stats && stats.new.active} Aktif</span>
                                    </div>
                                </div>
                                <div className='funnel_item_body'>
                                    <span className='m-0 d-block'>{stats && stats.new.percentProgress} Kemajuan</span>
                                    {/* <span>rata-rata 0 hari</span> */}
                                </div>
                            </div>
                            <div className='stage_lost'>
                                <span>{stats && stats.new.lost} Hilang</span>

                            </div>
                        </div>
                        <div className='funnel_container'>
                            <div className='funnel_item funnel_2 funnel_header'>
                                <div className='funnel_item_header'>
                                    <span className='type'>PENDING RESPONSE</span>
                                    <div className='text-center'>
                                        <span className='m-0 d-block'>{stats && stats.pending.active} Leads</span>
                                        <span>Aktif</span>
                                    </div>
                                </div>
                                <div className='funnel_item_body'>
                                    <span className='m-0 d-block'>{stats && stats.pending.percentProgress} Kemajuan</span>
                                    {/* <span>rata-rata 0 hari</span> */}
                                </div>
                            </div>
                            <div className='stage_lost'>
                                <span>{stats && stats.pending.lost} Hilang</span>
                            </div>
                        </div>
                        <div className='funnel_container'>
                            <div className='funnel_item funnel_3 funnel_header'>
                                <div className='funnel_item_header'>
                                    <span className='type'>CONTACTED</span>
                                    <div className='text-center'>
                                        <span className='m-0 d-block'>{stats && stats.contacted.active} Leads</span>
                                        <span>Aktif</span>
                                    </div>
                                </div>
                                <div className='funnel_item_body'>
                                    <span className='m-0 d-block'>{stats && stats.contacted.percentProgress} Kemajuan</span>
                                    {/* <span>rata-rata 0 hari</span> */}
                                </div>
                            </div>
                            <div className='stage_lost'>
                                <span>{stats && stats.contacted.lost} Hilang</span>
                            </div>
                        </div>
                        <div className='funnel_container'>
                            <div className='funnel_item funnel_4 funnel_header'>
                                <div className='funnel_item_header'>
                                    <span className='type'>SALES GALLERY VISIT</span>
                                    <div className='text-center'>
                                        <span className='m-0 d-block'>{stats && stats.galleryVisit.active} Leads</span>
                                        <span>Aktif</span>
                                    </div>
                                </div>
                                <div className='funnel_item_body'>
                                    <span className='m-0 d-block'>{stats && stats.galleryVisit.percentProgress} Kemajuan</span>
                                    <span>rata-rata 0 hari</span>
                                </div>
                            </div>
                            <div className='stage_lost'>
                                <span>{stats && stats.galleryVisit.lost} Hilang</span>

                            </div>
                        </div>
                        <div className='funnel_container'>
                            <div className='funnel_item funnel_5 funnel_header'>
                                <div className='funnel_item_header'>
                                    <span className='type'>NEGOTIATION</span>
                                    <div className='text-center'>
                                        <span className='m-0 d-block'>{stats && stats.negotiation.active} Leads</span>
                                        <span>Aktif</span>
                                    </div>
                                </div>
                                <div className='funnel_item_body'>
                                    <span className='m-0 d-block'>{stats && stats.negotiation.percentProgress} Kemajuan</span>
                                    {/* <span>rata-rata 0 hari</span> */}
                                </div>
                            </div>
                            <div className='stage_lost'>
                                <span>{stats && stats.negotiation.lost} Hilang</span>

                            </div>
                        </div>
                        <div className='funnel_container'>
                            <div className='funnel_item funnel_6 funnel_header'>
                                <div className='funnel_item_header'>
                                    <span className='type'>BOOKED</span>
                                    <div className='text-center'>
                                        <span className='m-0 d-block'>{stats && stats.booked.active} Leads</span>
                                        <span>Aktif</span>
                                    </div>
                                </div>
                                <div className='funnel_item_body'>
                                    <span className='m-0 d-block'>{stats && stats.booked.percentProgress} Kemajuan</span>
                                    {/* <span>rata-rata 0 hari</span> */}
                                </div>
                            </div>
                            <div className='stage_lost'>
                                <span>{stats && stats.booked.lost} Hilang</span>

                            </div>
                        </div>
                        <div className='funnel_container'>
                            <div className='funnel_item funnel_7'>
                                <div className='funnel_item_header'>
                                    <span className='type'>SPA SIGNED</span>
                                    <div className='text-center'>
                                        <span className='m-0 d-block'>{stats && stats.spaSign.active} Leads</span>
                                        <span>Aktif</span>
                                    </div>
                                </div>
                                <div className='funnel_bottom'></div>
                            </div>
                        </div>
                    </div>
                    <div className='status__wrapper'>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Leads Terkonversi</span>
                            {/* aktif kecuali kecuali yg new  / lead saat ini*/} 
                            <span className='status_leads'>{total.totalActive} Leads {(total.konversi)} %</span>
                        </div>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            {/* total new*/}
                            <span className='status_text'>Lead saat ini</span>
                            <span className='status_leads'>{stats && stats.new.total}</span>
                        </div>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Total Prospek Hilang</span>
                            <span className='status_leads'>{total.totalLost} Leads ({(total.totalLost/stats?.new.total * 100).toFixed(2)})% </span>
                        </div>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Total Prospek Pending Response</span>
                            <span className='status_leads'>{stats?.pending.active} Leads ({(stats?.pending.active/stats?.new.total * 100).toFixed(2)})% </span>
                        </div>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Total Prospek Contacted</span>
                            <span className='status_leads'>{stats?.contacted.active} Leads ({(stats?.contacted.active/stats?.new.total * 100).toFixed(2)})% </span>
                        </div>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Total Prospek Gallery Visit</span>
                            <span className='status_leads'>{stats?.galleryVisit.active} Leads ({(stats?.galleryVisit.active/stats?.new.total * 100).toFixed(2)})% </span>
                        </div>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Total Prospek Negotiation</span>
                            <span className='status_leads'>{stats?.negotiation.active} Leads ({(stats?.negotiation.active/stats?.new.total * 100).toFixed(2)})% </span>
                        </div>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Total Prospek Booked</span>
                            <span className='status_leads'>{stats?.booked.active} Leads ({(stats?.booked.active/stats?.new.total * 100).toFixed(2)})% </span>
                        </div>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Total Prospek SPA Sign</span>
                            <span className='status_leads'>{stats?.spaSign.active} Leads ({(stats?.spaSign.active/stats?.new.total * 100).toFixed(2)})% </span>
                        </div>
                    </div>
                </Card>
            </div>
            <div className='dashboard__wrapper-item'>
                <h4 className='text-center'>PIPELINE AKTIF PROYEK</h4>
                <Card className="card__pipeline p-4">
                    <div className='card__pipeline-wrapper'>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.new.active}</span></div>
                            <div className='boxf item-end'><span className='status_text'>New</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.pending.active}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Pending Response</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.contacted.active}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Contacted</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.galleryVisit.active}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Sales Gallery Vist</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.negotiation.active}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Negotiation</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.booked.active}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Booked</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.spaSign.active}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Spa Signed</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{total.totalLost}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Lost</span></div>
                        </div>
                    </div>
                    <div className='status__wrapper'>
                        {/* <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Lead kosong</span>
                            <span className='status_leads'>464</span>
                        </div> */}
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Gambaran