import React, {  } from 'react';
import {  Tabs } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import monent from 'moment'
import { NavLink } from 'react-router-dom';

export default function MenuHome(props) {
  
  const renderMenu = () => {
    return props.heThongRapChieu.map((cumrap, index) => {
      return <TabPane tab={<img src={cumrap.logo} className='rounded-full w-14 h-14' alt={cumrap.logo} />} key={cumrap.maHeThongRap}>
        <Tabs tabPosition='left'>
          {cumrap.lstCumRap.slice(0,5).map((rap, index) => {
            return <TabPane tab={
            <div className='flex ' style={{width:"350px"}}>
                <img src={cumrap.logo} className=' w-10 h-10 mr-2' alt={cumrap.logo} />
                <div className=''>
                    <h1 className='m-0 '>{rap.tenCumRap}</h1>
                    <p  className='text-red-600 text-left mt-1'>Chi tiết</p>
                </div>
            </div>} 
            key={index}>

                  {rap.danhSachPhim.slice(0,5).map((phim,index)=>{
                    return <div key={index} className=' flex my-2'>
                          <img src={phim.hinhAnh} className=' w-16 h-16 mr-4' alt={phim.hinhAnh}/>
                          <div className=''>
                              <h2>{phim.tenPhim}</h2>
                              <div>
                              {phim.lstLichChieuTheoPhim.slice(0,5).map((lichchieu,index)=>{
                                 return <NavLink to={`/checkout/${lichchieu.maLichChieu}`} className='text-green-500 p-1' key={index}>{ monent(lichchieu.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
                              })
                                }
                              </div>
                          </div>
                    </div>
                  })}
                  
            </TabPane>
          })}
        </Tabs>
      </TabPane>
    })
  }
  return (
    <Tabs tabPosition='left'>
      {renderMenu()}
    </Tabs>
  )
}
