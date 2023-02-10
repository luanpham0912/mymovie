import _ from 'lodash'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Footer(props) {
    console.log("first", props)
    const { heThongRapChieu } = useSelector(state => state.QuanLyRapReducer)

    const arrHeThongRap = _.map(heThongRapChieu, (heThongRap) => _.pick(heThongRap, ['maHeThongRap', 'tenHeThongRap', "logo"]))
    console.log(arrHeThongRap)
    return (
        <footer className=" bg-[#001529] text-white body-font mt-8">
            <div className="container px-5 py-14 mx-auto flex  md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className=" basis-1/2 md:mx-0 mx-auto text-center md:text-left">
                    <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-8 h-8 dark:text-violet-400">
                            <path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
                            <path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
                        </svg>
                        <span className='font-bold text-2xl ml-3 text-violet-400'>Cinema</span>
                    </a>
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
