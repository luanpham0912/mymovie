import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayThongTinLichChieuHeThongRapAction } from '../../Redux/Actions/QuanLyRapAction'
import Contacts from '../Contact/Contacts'
import MenuHome from '../Home/MenuHome/MenuHome'

export default function News(props) {
  console.log(props,"props")
  const dispatch = useDispatch()
  useEffect(() => {

    dispatch(LayThongTinLichChieuHeThongRapAction())
  }, [])
  const {heThongRapChieu} = useSelector(state => state.QuanLyRapReducer)
  return (
    <div className='md:w-4/5 w-full md:mx-auto mx-0 pt-10'>
      <section className="text-gray-600 body-font" id='listFilm'>
        <div className="py-10 px-5">
        <MenuHome heThongRapChieu={heThongRapChieu} />
        </div>
      </section>


    </div>
  )
}
