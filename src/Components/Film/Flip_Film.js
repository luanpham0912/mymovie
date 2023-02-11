import React, { useState } from 'react'
import { PlayCircleOutlined } from '@ant-design/icons'
import './Flip_Film.css'
import { NavLink } from 'react-router-dom';
import { history } from "../../App";
import { useDispatch } from 'react-redux';
import { LayThongTinLichChieuPhimAction } from '../../Redux/Actions/QuanLyRapAction';
import { Button, Modal } from 'antd';

export default function Film_Flip(props) {

    const { item } = props;
   
    
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openTrailer, setOpenTrailer] = useState("hidden")
    const showModal = () => {
        setOpenTrailer("")

        setIsModalOpen(true);
    };
    const handleCancel = (e) => {
        console.log(e)
        setIsModalOpen(false);

    };
 
    const cssHot = item.hot ? "cssHot" : ""
    return (

        <div className="flip-card mt-5">
            <div className={`flip-card-inner`}>
            {/* color:"white",position: "relative",top: '-9px',text-align: "center",right:" -10px" */}
            <div className={` ${cssHot}`}><span  style={{color : "white" , position : "relative",top:"-9px",textAlign : "center",right:"-10px"}}>{cssHot ? "Hot" : ""}</span></div>
        
                <div className="flip-card-front">
                    <img src={item.hinhAnh} alt="Avatar" style={{ width: "200px", height: "100%" }} onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'; }} />
                </div>
                <div className="flip-card-back" style={{ position: 'relative', backgroundColor: 'rgba(0,0,0,.9)', width: "100%", height: "90%" }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: "100%", height: "100%" }} >
                        <img src={item.hinhAnh} alt="Avatar" style={{ width: "200px", height: "100%" }} onError={e => { e.target.onerror = null; e.target.src = 'https://picsum.photos/300/300'; }} />
                    </div>
                    <div className="w-full h-full" style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,.7)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div onClick={showModal}>
                            <div className="rounded-full cursor-pointer text-orange-500"><PlayCircleOutlined style={{ fontSize: '50px' }}
                            /></div>
                            <div className="text-xl mt-2 font-semibold">{item.tenPhim}</div>
                        </div>
                    </div>

                </div>
            </div>
            <div onClick={() => {
                history.push(`/detail/${item.maPhim}`);
            }} className="text-white text-center cursor-pointer py-2 bg-indigo-400 mb-2 text-success-50 font-bold">ĐẶT VÉ</div>

            <Modal className='Modalcustom' width={"67%"} open={isModalOpen} onCancel={handleCancel} footer={null} closable={false} destroyOnClose={true}>
                <p className='text-center text-white text-base font-bold pb-3 mb-0'>{item.tenPhim}</p>
                <iframe width="100%" height="480px" title={item.tenPhim}
                    src={item.trailer}>
                </iframe>
            </Modal>
        </div>

    )
}

