import {  Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import moment from "moment";
import {  useState } from "react";
import {  useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import "./Tabs.css";

function ComponentTabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };



  const { detailPhim } = useSelector(state => state.QuanLyPhimReducer)
 

  const renderMenu = () => {
    return detailPhim.heThongRapChieu?.map((cumrap, index) => {
      return <TabPane tab={<img src={cumrap.logo} className='rounded-full w-14 h-14' alt='11' />} key={cumrap.maHeThongRap}>
        <div>
          {cumrap.cumRapChieu.map((rap, index) => {
            return <div key={index}>
              <div className='flex ' style={{ width: "100%" }}>
                <img src={rap.hinhAnh} className=' w-10 h-10 mr-2' alt='123' />
                <div className=''>
                  <h1 className='m-0 text-[#1677ff]'>{rap.tenCumRap}</h1>
              
                </div>
              </div>
              <div className='grid grid-cols-4 text-white mt-5'>
                {rap.lichChieuPhim.map((lichchieu, index) => {
                  return <div key={index} >
                    <p>{lichchieu.tenRap}</p>
                    <NavLink to={`/checkout/${lichchieu.maLichChieu}`} className='text-green-500'> {moment(lichchieu.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
                  </div>
                })}
              </div>
            </div>
          })}
        </div>
      </TabPane>
    })
  }


  return (
    <div className="containerTabs">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
         Lịch chiếu
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
         Thông tin
        </button>

      </div>

      <div className="content-tabs">
        <div className={toggleState === 1 ? "content  active-content" : "content"} >         
              <Tabs tabPosition='left'>
                {renderMenu()}
              </Tabs>
       </div>

        <div className={toggleState === 2 ? "content  active-content" : "content"}>
          <p className='text-base text-white'>{detailPhim?.moTa}</p>
        </div>

      </div>
    </div>
  );
}

export default ComponentTabs;