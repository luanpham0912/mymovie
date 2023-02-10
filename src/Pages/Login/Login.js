import React from 'react'
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { QuanLyNguoiDungAction } from '../../Redux/Actions/QuanLyNguoiDungAction';
import { history } from '../../App';
import { useEffect } from 'react';

export default function Login() {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
           type : "HIDE_LOADING"
       })
   }, [])
   
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: ''
          },
          onSubmit: values => {
            dispatch(QuanLyNguoiDungAction(values))
          },
          
    })


    return <>

        <h2 className='font-bold text-2xl'>  ĐĂNG NHẬP   </h2>
        <form onSubmit={ formik.handleSubmit}>
            {/* Email input */}
            <div className="mb-6">
                <input type="text" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="taiKhoan" onChange={formik.handleChange} placeholder="Tai Khoan" />
            </div>
            {/* Password input */}
            <div className="mb-6">
                <input type="password" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="matKhau" onChange={formik.handleChange} placeholder="Mat Khau" />
            </div>

            <div className="text-center lg:text-left">
                <button type='submit' className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Login
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                   Bạn chưa có tài khoản ?
                    <button onClick={()=>{
                        history.push('/register')
                    }} className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Đăng ký</button>
                </p>
            </div>
        </form>
    </>
}
