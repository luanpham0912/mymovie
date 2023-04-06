import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons';
import { history } from '../../App';
import { DangKyAction } from '../../Redux/Actions/QuanLyNguoiDungAction';

export default function Register() {
  const dispatch = useDispatch()
  const [typePassword , setTypePassword] = useState(false)
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: null,
      maNhom: "GP00",
      hoTen: ""

    }, 
    onSubmit: values => {

     dispatch(DangKyAction(values))
    },

  })

  const handleChangeMaNhom =( e ) => {

    formik.setFieldValue('maNhom' , e.target.value)
  }
  return <>

    <h2 className='font-bold text-2xl text-zinc-200 mb-10'> Register </h2>
    <form onSubmit={formik.handleSubmit}>
      {/* Username input */}
      <div className="mb-6">
        <input required type="text" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-200 bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-200 focus:bg-transparent focus:border-blue-600 focus:outline-none" name="taiKhoan" onChange={formik.handleChange} placeholder="Tài khoản" />
      </div>
      {/* Password input */}
      <div className="mb-6 relative">
        <input required type={typePassword ? "text" : "password"} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-200 bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-200 focus:bg-transparent focus:border-blue-600 focus:outline-none " name="matKhau" onChange={formik.handleChange} placeholder="Mật khẩu" />
        { typePassword ? <button type='button' onClick={()=>{setTypePassword(!typePassword)}} className='absolute  right-3 top-3'><EyeInvisibleOutlined /></button> :
        <button type='button' onClick={()=>{setTypePassword(!typePassword)}} className='absolute  right-3 top-3'>< EyeOutlined/></button>}
      </div>
      {/* Email input */}
      <div className="mb-6">
        <input required type="email" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-200 bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-200 focus:bg-transparent focus:border-blue-600 focus:outline-none" name="email" onChange={formik.handleChange} placeholder="Email" />
      
      </div>
            {/* hoTen input */}
            <div className="mb-6">
        <input required type="text" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-200 bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-200 focus:bg-transparent focus:border-blue-600 focus:outline-none" name="hoTen" onChange={formik.handleChange} placeholder="Họ và tên" />
      </div>
      {/* sđt input */}
      <div className="mb-6">
        <input type="tel" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-200 bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-200 focus:bg-transparent focus:border-blue-600 focus:outline-none" name="soDt" onChange={formik.handleChange} placeholder="Số điện thoại" />
      </div>
      {/* maNhom input */}
      <div className="mb-6">
        <label className='mr-2 text-white text-xl'>Mã nhóm</label>
        <select className='border text-gray-200  rounded-md border-slate-300 p-2 bg-transparent focus:border-slate-200 focus:outline-none expand::bg-transparent'  defaultValue={"GP00"}  onChange={handleChangeMaNhom}>
            <option  value={"GP00"}>GP00</option>
            <option value={"GP01"}>GP01</option>
        </select>

      </div>



      <div className="text-center lg:text-left">
        <button type='submit' className="inline-block px-7 py-3 bg-transparent text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-400 hover:shadow-lg focus:bg-slate-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out border border-solid border-gray-300">
          Register
        </button>

      </div>
    </form>
  </>
}
