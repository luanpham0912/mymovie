import { Breadcrumb } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import MultipleRowSlick from '../../Components/RSlick/MultipleRowSlick'
import { LayDanhSachFilmAction } from '../../Redux/Actions/QuanLyPhimAction'

export default function Contacts(props) {

  const dispatch = useDispatch()
  const { arrFilm } = useSelector(state => state.QuanLyPhimReducer)

  useEffect(() => {
    dispatch(LayDanhSachFilmAction())

  }, [])
  return (
    <div className='md:w-4/5 w-full md:mx-auto mx-0 pt-9'>
      <section className="text-gray-600 body-font" id='listFilm'>
        <div className="py-10 px-5">
          <MultipleRowSlick arrFilm={arrFilm} />
        </div>
      </section>


    </div>
  )
}
