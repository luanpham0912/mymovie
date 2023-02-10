
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom'
import './Detail.css'
import { LayThongTinLichChieuPhimAction } from '../../Redux/Actions/QuanLyRapAction';
import ComponentTabs from '../../Components/Tabs/Tabs';
import { DivRating } from '../../Components/RatingCircle';

export default function Detail(props) {

  const { detailPhim } = useSelector(state => state.QuanLyPhimReducer)
  console.log(detailPhim)
  const countStar = `${Number(((detailPhim.danhGia) * 180) / 10)}`




  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(LayThongTinLichChieuPhimAction(props.match.params.id))
  }, [])

  return (
    <div className='w-full h-auto' style={{ backgroundImage: `url(${detailPhim?.hinhAnh})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }} >
      <div className='w-full h-[50rem]' style={{  backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.9) 80%)"   , backdropFilter: "grayscale(10%) blur(15px)" }}>
        <div className='grid grid-cols-4 gap-0 w-4/5 mx-auto pt-32 '>
          <div>
            <img className='w-1/2 ml-auto' src={detailPhim?.hinhAnh} alt="phim" />
          </div>
          <div className='ml-2 grid content-center text-white col-span-2'>
            <p className='text-xs m-0'>Ngày chiếu: {detailPhim?.ngayKhoiChieu}</p>
            <h1 className='text-xl'>{detailPhim?.tenPhim}</h1>
          </div>
          <div>
            <div className="circle-wrap mb-3">
              <div className="circle">
                <DivRating className='mask full ' rotate={`${countStar}`}>
                  <DivRating className='fill ' rotate={`${countStar}`} />
                </DivRating>
                <div className="mask half">
                  <DivRating className='fill ' rotate={`${countStar}`} />
                </div>
                <div className="inside-circle"  >{detailPhim?.danhGia}<span className='text-gray-500 text-base'>/10</span></div>
              </div>
            </div>
            <Rate allowHalf disabled value={Number(detailPhim?.danhGia) / 2} />
          </div>

        </div>
        <div className='w-2/4 mx-auto'>
          <ComponentTabs />
        </div>


      </div>
    </div>
  )
}
