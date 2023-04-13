import React, { Fragment, useEffect, useRef, useState } from 'react'
import * as _ from 'lodash'
import "./Checkout.css"
import { useDispatch, useSelector } from 'react-redux'
import { DatVeAction, QuanLyDatVeAction } from '../../Redux/Actions/QuanLyDatVeAction'
import { DAT_VE, TOKEN, USERLOGIN } from '../../Utils/ConstantDoMain/ConstantDomain'
import { LayThongTinTaiKhoanAction } from '../../Redux/Actions/QuanLyNguoiDungAction'
import moment from 'moment'
import { Animated } from 'react-animated-css'
import { history } from '../../App'
import {
  HomeOutlined,
  SmileOutlined,
  FrownOutlined,
} from '@ant-design/icons';
// import _default from 'react-redux/es/components/connect'

function Checkout(props) {

  const dispatch = useDispatch()
  const { chiTietPhongVe, arrGheDangDat } = useSelector(state => state.QuanLyDatVeReducer)
  const { danhSachGhe, thongTinPhim } = chiTietPhongVe
  const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
  const [time , setTime] = useState(60)
  const timerId = useRef()
  useEffect(() => {
    dispatch(QuanLyDatVeAction(props.match.params.id))

    timerId.current = setInterval(()=>{
      if(time <= 0){
        clearInterval(timerId.current)
      }else {
        setTime(preTime => preTime - 1)
      }
     
  },1000)
    return () => {
      clearInterval(timerId.current)
    }
     
    
  }, [time])

  const renderDanhSachGhe = () => {
    return danhSachGhe?.map((ghe, index) => {
      let cssGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let cssGheMinhDat = ''
      if (ghe.taiKhoanNguoiDat === userLogin.taiKhoan) {
        cssGheMinhDat = "gheMinhDat"
      }

      let cssGheDaDat = ghe.daDat ? "gheKhachDat" : "";

      let indexGheDangDat = arrGheDangDat.findIndex(gheDD => gheDD.maGhe === ghe.maGhe)
      let cssGheDangDat = indexGheDangDat !== -1 ? "gheDangDat" : ""
      let disabledButton = () => {
        if(ghe.daDat || time === 0 ){
           return true
        }
        return false
      }
      return <Fragment key={index} >
        <button disabled={disabledButton()} className={`ghe ${cssGheVip} ${cssGheMinhDat} ${cssGheDaDat} ${cssGheDangDat}`}
          onClick={() => {
            dispatch({
              type: DAT_VE,
              gheDuocChon: ghe
            })
          }}  >
          {ghe.tenGhe}
        </button>
        {(index + 1) % 16 === 0 ? <br /> : ''}

      </Fragment>
    })
  }
  console.log("timelengt", time.toString().concat("0"))
   const renderCountdownTime = () => {
      return <span>
            00 : {time < 10 ? "0".concat(time.toString()) : time }
      </span>
   }
  return (

    <div className='w-full h-auto' >
      <div className='w-full h-[50rem]'>
        <div className='flex justify-center gap-2'>
          <div className='w-4/6'>
            <div className='w-5/6 h-3 bg-black monitor relative'>
              <p className='text-center pt-4 text-orange-400'>Màn hình</p>
            </div>
            <div className='absolute left-[57%] font-bold text-4xl' > {renderCountdownTime()} </div>
            <div className='w-5/6 mt-10 flex justify-center'>
              <div className=''>
                {renderDanhSachGhe()}
              </div>
            </div>
            <table className='w-11/12 mx-auto mt-3'>
              <thead>
                <tr className='text-black text-base font-semibold'>
                  <td className=''>Ghế chưa đặt</td>
                  <td className=''>Ghế đang đặt</td>
                  <td className=''>Ghế VIP</td>
                  <td className=''>Ghế bạn đã đặt</td>
                  <td className=''>Ghế người khác đặt</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='w-1/6'><button className='ghe mx-auto '><SmileOutlined /></button></td>
                  <td className='w-1/6'><button className='ghe gheDangDat '><SmileOutlined /></button></td>
                  <td className='w-1/6'><button className='ghe gheVip '><SmileOutlined /></button></td>
                  <td className='w-1/6'><button className='ghe gheMinhDat '><SmileOutlined /></button></td>
                  <td className='w-1/6'><button className='ghe gheKhachDat '><FrownOutlined /></button></td>

                </tr>
              </tbody>
            </table>
          </div>
          <div className='w-[33%] '>
            <p className='text-center text-green-500 text-4xl mt-5'> {arrGheDangDat?.reduce((total, ghe, index) => {
              return total += ghe.giaVe
            }, 0).toLocaleString()} đ</p>
            <hr />
            <h1 className='text-violet-500  font-mono text-bold text-3xl mt-3'>{thongTinPhim?.tenPhim}</h1>
            <p className='text-gray-500 font-semibold tracking-wide font-sans text-xs'>Địa điểm: <span className='text-zinc-700 text-xl ' > {thongTinPhim?.diaChi} </span></p>
            <p className='text-gray-500 font-semibold tracking-wide font-sans text-xs'>Ngày chiếu: <span className='text-zinc-700 text-xl ' > {thongTinPhim?.ngayChieu} </span> </p>
            <hr />
            <div className='text-red-600 my-4 flex flex-wrap'>Ghế: {_.sortBy(arrGheDangDat, ['stt']).map((ghe, index) => {
              return <div key={index} className='text-green-600 mx-1 font-bold'>[ {ghe.tenGhe} ]</div>
            })}</div>
            <hr />
            <p className='text-gray-500 font-semibold tracking-wide font-sans text-xs'>email: <span className='text-zinc-700 text-xl ' > {userLogin.email} </span></p>
            <hr />
            <p className='text-gray-500 font-semibold tracking-wide font-sans text-xs'>phone: <span className='text-zinc-700 text-xl ' > {userLogin.soDT} </span></p>

            <button
              className='w-full p-3 bg-purple-400 hover:bg-purple-600 transition-all duration-200 text-white text-xl mt-3'
              onClick={() => {
                const DanhSachVe = {
                  maLichChieu: props.match.params.id,
                  danhSachVe: arrGheDangDat
                }
                dispatch(DatVeAction(DanhSachVe))
                setTime(60)
              }}
            >Đặt vé</button>



          </div>
        </div>
      </div>
    </div>





  )
}

export function KetQuaDatVe(props) {
  const { thongTinTaiKhoan } = props
  const { thongTinDatVe } = thongTinTaiKhoan

 


  const renderThongTinDatVe = () => {
    return thongTinDatVe?.map((info, index) => {
      return <div key={index} className="p-4 lg:w-1/2">
        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
          <img alt="team" className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4" src={info.hinhAnh} />
          <div className="flex-grow sm:pl-8">
            <h2 className="tracking-wider title-font font-medium text-lg m-0 text-violet-400">{info.tenPhim}</h2>
            <h3 className="text-gray-500 mb-4  text-sm">{moment(info.ngayDat).format("DD-MM-YYYY hh:mm:ss")}</h3>
            <p className="m-0 tracking-wider text-lg">{info.danhSachGhe[0].tenHeThongRap}</p>
            <p className="mb-2 text-sm">{info.danhSachGhe[0].tenCumRap} - <span>{info.thoiLuongPhim} phút</span></p>
            <div className='flex flex-wrap justify-start gap-3 overflow-auto h-14 '>
              <div className='text-red-600'>Ghế: </div>
              {info.danhSachGhe?.map((ghe, index) => {
                return <div className='text-green-500 ' key={index}>[{ghe.tenGhe}]</div>
              })}
            </div>

          </div>
        </div>
      </div>
    })
  }


  return <section className="text-gray-600 body-font">
    <div className="container py-5 mx-auto">
      <div className="flex flex-col text-center w-full mb-10">
        <h6 className="text-3xl font-medium title-font mb-4 text-violet-600 tracking-widest">Lịch sử đặt vé</h6>
      </div>
      <div className="flex flex-wrap -m-4">
        {renderThongTinDatVe()}

      </div>
    </div>
  </section>
}










export default function DatVe(props) {
  const { page } = useSelector(state => state.QuanLyDatVeReducer)
  const { thongTinTaiKhoan, userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)


  // const [toggleState, setToggleState] = useState(page);
  const dispatch = useDispatch()
  const toggleTab = (index) => {
    dispatch({
      type: "CHUYEN_TAB",
      tab: index
    });
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: "CHUYEN_TAB",
        tab: 1
      });
    }
  }, [])
  useEffect(() => {
    dispatch(LayThongTinTaiKhoanAction())

  }, [])

  return (
    <div className="">
      <div className="flex px-5 my-2 w-full shadow-xl">
        <div
          className={page === 1 ? "text-purple-600 p-4 mr-2 border-t-0 border-l-0 border-r-0 border-b-2 border-solid border-indigo-600 cursor-pointer" : " p-4 mr-2 cursor-pointer"}
          onClick={() => toggleTab(1)}
        >
          1. Chọn ghế & Thanh toán
        </div>
        <div
          className={page === 2 ? "text-purple-600 p-4  ml-2 border-t-0 border-l-0 border-r-0 border-b-2  border-solid border-indigo-600 cursor-pointer" : " p-4 ml-2 cursor-pointer"}
          onClick={() => toggleTab(2)}
        >
          2. Kết quả đặt vé
        </div>
        <div
          className={"text-purple-600 pt-2  ml-14  cursor-pointer"}
          onClick={() => history.push('/')}
        >
          <HomeOutlined className='text-xl' />
        </div>
        <div className='ml-auto flex w-auto items-center'>
          <div> <p className='mb-0 font-normal text-sm tracking-wider text-slate-600'>{userLogin.hoTen}</p> </div>
          <div className='mr-4 ml-2' >
            <img className='rounded-full  h-8' alt='avatar' src={`https://i.pravatar.cc/32?img=${userLogin.hoTen}`} onClick={() => { history.push('/profile') }} />
          </div>
          <div className='pl-2 cursor-pointer hover:underline hover:decoration-blue-600' style={{ borderLeft: "1px solid #888888" }}
            onClick={() => {
              localStorage.removeItem(USERLOGIN)
              localStorage.removeItem(TOKEN)
              dispatch({ type: "DANG_XUAT" })
              history.push("/")

            }}>
            <p className='mb-0 text-sm font-thin text-blue-600'>Đăng xuất</p>
          </div>
        </div>
      </div>

      <div className="">
        <div className={page === 1 ? "  block " : "hidden"} >

          <Checkout {...props} />


        </div>

        <div className={page === 2 ? "  block " : "hidden"}>
          <KetQuaDatVe {...props} thongTinTaiKhoan={thongTinTaiKhoan} />
        </div>

      </div>
    </div>

  )
}