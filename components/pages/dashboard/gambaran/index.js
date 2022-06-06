import React,{useState,useEffect} from 'react'
import Card from '../../../presentationals/card/card'

const Gambaran = ({stats}) => {
    const [total,setTotal] = useState({
        totalLost:'',
        totalLead:'',
        totalActive:'',
    })

    const _total = () => {
        let totalLost = stats.new.lost + stats.pending.lost + stats.contacted.lost + stats.galleryVisit.lost + stats.negotiation.lost + stats.booked.lost + stats.spaSign.lost;
        let totalLead = stats.new.total + stats.pending.total + stats.contacted.total + stats.galleryVisit.total + stats.negotiation.total + stats.booked.total + stats.spaSign.total;
        let totalActive = stats.new.active + stats.pending.active + stats.contacted.active + stats.galleryVisit.active + stats.negotiation.active + stats.booked.active + stats.spaSign.active;
        setTotal({
            totalLost,
            totalLead,
            totalActive,
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
                                        <span className='m-0 d-block'>{stats && stats.pending.total} Leads</span>
                                        <span>{stats && stats.pending.active} Aktif</span>
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
                                        <span className='m-0 d-block'>{stats && stats.contacted.total} Leads</span>
                                        <span>{stats && stats.contacted.active} Aktif</span>
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
                                        <span className='m-0 d-block'>{stats && stats.galleryVisit.total} Leads</span>
                                        <span>{stats && stats.galleryVisit.active} Aktif</span>
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
                                        <span className='m-0 d-block'>{stats && stats.negotiation.total} Leads</span>
                                        <span>{stats && stats.negotiation.active} Aktif</span>
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
                                        <span className='m-0 d-block'>{stats && stats.booked.total} Leads</span>
                                        <span>{stats && stats.booked.active} Aktif</span>
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
                                        <span className='m-0 d-block'>{stats && stats.spaSign.total} Leads</span>
                                        <span>{stats && stats.spaSign.active} Aktif</span>
                                    </div>
                                </div>
                                <div className='funnel_bottom'></div>
                            </div>
                        </div>
                    </div>
                    <div className='status__wrapper'>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Leads Terkonversi</span>
                            <span className='status_leads'>{total.totalActive} Leads ({(total.totalActive/total.totalLead * 100).toFixed(2)})%</span>
                        </div>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Lead saat ini</span>
                            <span className='status_leads'>{total.totalLead}</span>
                        </div>
                        <div className='d-flex justify-content-between status__wrapper-item'>
                            <span className='status_text'>Total Prospek Hilang</span>
                            <span className='status_leads'>{total.totalLost} Leads ({(total.totalLost/total.totalLead * 100).toFixed(2)})% </span>
                        </div>
                    </div>
                </Card>
            </div>
            <div className='dashboard__wrapper-item'>
                <h4 className='text-center'>PIPELINE AKTIF PROYEK</h4>
                <Card className="card__pipeline p-4">
                    <div className='card__pipeline-wrapper'>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.new.total}</span></div>
                            <div className='boxf item-end'><span className='status_text'>New</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.pending.total}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Pending Response</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.contacted.total}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Contacted</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.galleryVisit.total}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Sales Gallery Vist</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.negotiation.total}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Negotiation</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.booked.total}</span></div>
                            <div className='boxf item-end'><span className='status_text'>Booked</span></div>
                        </div>
                        <div className='card__pipeline-wrapper--item'>
                            <div className='boxf item-start'><span className='pipe_value'>{stats && stats.spaSign.total}</span></div>
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