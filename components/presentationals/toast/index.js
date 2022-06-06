import React,{useState} from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

function NotificationToast({active,closeNotif,data}) {
    return (
        <ToastContainer position="bottom-end" className="p-3 position-fixed">
            {data.map((item,key)=>(
                <Toast key={key} show={active} onClose={()=>closeNotif(key)} >
                    <Toast.Header>
                        <strong className="me-auto toast-title">{item.title}</strong>
                        {/* <small>11 mins ago</small> */}
                    </Toast.Header>
                    <Toast.Body>
                        <p className='toast-body'>{item.body}</p>
                    </Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    );
  }

export default  NotificationToast