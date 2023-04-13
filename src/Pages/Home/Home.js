import React,{useEffect} from 'react'
import MenuHome from './MenuHome/MenuHome'
import {useSelector,useDispatch} from 'react-redux'
import MultipleRowSlick from '../../Components/RSlick/MultipleRowSlick'
import { LayDanhSachFilmAction } from '../../Redux/Actions/QuanLyPhimAction'
import { LayThongTinLichChieuHeThongRapAction } from '../../Redux/Actions/QuanLyRapAction'
import HomeCarousel from '../../Templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel'
import { Breadcrumb } from 'antd'
import { NavLink } from 'react-router-dom'
import Loading from '../../Components/Loading/Loading'

export default function Home(props) {
 

  const dispatch = useDispatch()
  const {arrFilm} = useSelector(state => state.QuanLyPhimReducer)
  
  const {heThongRapChieu} = useSelector(state => state.QuanLyRapReducer)


  useEffect(() => {
    dispatch(LayDanhSachFilmAction())
    dispatch(LayThongTinLichChieuHeThongRapAction())
  }, [])
  
  
  return (
    <div> 
     <div className='relative hiha' style={{backgroundImage : "url('./img/wallbackground.jpg')"}}>  
        <HomeCarousel />

      </div>


   
    <div className='md:w-4/5 w-full md:mx-auto mx-0'>
      <section className="text-gray-600 body-font" id='listFilm'>
          <div className="py-10 px-5">
              <MultipleRowSlick arrFilm={arrFilm}/>
          </div>
      </section>
    
      <MenuHome heThongRapChieu={heThongRapChieu} />
     
    </div>
     </div>
  )
}
