import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Footer(props) {
   
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)

    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', "logo"]))
 
    return (
        <footer className=" bg-[#001529] text-white body-font mt-8">
            <div className="container px-5 py-14 mx-auto flex  md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className=" basis-1/2 md:mx-0 mx-auto text-center md:text-left">
                    <div href="/" className="flex items-center p-2">
                        <img src={require("../../../../Assets/Img/icon-logo-png-11.jpg")} alt="Logo" style={{width : "30%",objectFit :"cover"}}/>
                        <span className='font-bold text-2xl ml-3 text-violet-400'>Cinema</span>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Clone Movie web - Phạm Ngọc Luân</p>
                </div>
                <div className="basis-1/4  md:pl-20 md:mt-0 mt-10 md:text-left text-center">
                    <h3 className='mb-4 text-xl font-bold'>Partner</h3>
                    <div className='grid grid-cols-2 justify-items-center md:justify-items-start'>
                        {arrHeThongRap.map((heThong,index)=>{
                            return <img key={index}  src={heThong.logo} alt={heThong.tenHeThongRap} className='w-10 h-10 rounded-full'  />
                        })}
                    </div>
                </div>
                <div className=" basis-1/4 md:ml-5 sm:mt-0 mt-2 md:text-left text-center">
                    <h3 className='mb-4 text-xl font-bold'>Social</h3>
                    <div className='flex justify-items-center md:justify-items-start'>
                        <a className="text-gray-500" href='https://www.facebook.com/luan.pham.108889/'>
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                        <a className="ml-3 text-gray-500" href='https://www.linkedin.com/in/lu%C3%A2n-ph%E1%BA%A1m-652224264/'>
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row  border-t-2  border-t-slate-600">
                <p className="text-gray-500 text-sm text-center sm:text-left">© 2022  —
                    <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank">@LuanPham</a>
                </p>

            </div>
        </footer>

    )
}
