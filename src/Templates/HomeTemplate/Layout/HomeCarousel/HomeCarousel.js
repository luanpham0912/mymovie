import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './HomeCarousel.css'
import { Carousel } from 'antd';
import { LayDanhSachBannerAction } from '../../../../Redux/Actions/QuanLyPhimAction';
const contentStyle = {
    height: '100vh',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"

};

export default function HomeCarousel() {
    const dispatch = useDispatch()
    const { arrCarousel } = useSelector(state => state.CarouselReducer)

    useEffect(() => {
        dispatch(LayDanhSachBannerAction())
    }, [])
    
    return (
        <Carousel effect="fade" autoplay={true}>
            {arrCarousel.map((item, index) => {
                return <div key={index} >
                    <h3 style={{ ...contentStyle, backgroundImage: `url(${item.hinhAnh})`, }}>
                        <img src={item.hinhAnh} className='w-full opacity-0 ' alt={item.hinhAnh} />
                    </h3>
                </div>
            })}

        </Carousel>
    )
}
