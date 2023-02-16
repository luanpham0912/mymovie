import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './HomeCarousel.css'
import { Carousel } from 'antd';
import { LayDanhSachBannerAction } from '../../../../Redux/Actions/QuanLyPhimAction';
const contentStyle = {
    height: '75vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundSize: "77%",
    backgroundPosition: "top",
    backgroundRepeat: "no-repeat"

};

export default function HomeCarousel() {
    const dispatch = useDispatch()
    const { arrCarousel } = useSelector(state => state.CarouselReducer)

    useEffect(() => {
        dispatch(LayDanhSachBannerAction())
    }, [])

    return (
        

            <Carousel effect="fade" autoplay={true} >
                {arrCarousel.map((item, index) => {
                    return <div key={index} >
                        <div style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})` }}>
                            <img src={item.hinhAnh} className='w-full opacity-0 ' alt={item.hinhAnh} />
                        </div>
                    </div>
                })}

            </Carousel>


    )
}
