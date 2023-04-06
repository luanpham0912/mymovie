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

        <h2 className='font-bold text-2xl text-zinc-200 mb-10'>  LOGIN   </h2>
        <form onSubmit={ formik.handleSubmit}>
            {/* Email input */}
            <div className="mb-6">
                <input type="text" className="form-control block w-full px-4 py-2 text-xl font-normal text-white focus:text-white bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0  focus:bg-transparent focus:border-blue-600 focus:outline-none " name="taiKhoan" onChange={formik.handleChange} placeholder="Tài Khoản" />
            </div>
            {/* Password input */}
            <div className="mb-6">
                <input type="password" className="form-control block w-full px-4 py-2 text-xl font-normal text-white focus:text-white bg-transparent bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:bg-transparent focus:border-blue-600 focus:outline-none" name="matKhau" onChange={formik.handleChange} placeholder="Mật Khẩu" />
            </div>

            <div className="text-center lg:text-left">
                <button type='submit' className="inline-block px-7 py-3 bg-transparent text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-slate-400 hover:shadow-lg focus:bg-slate-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out border border-solid border-gray-300">
                    Login
                </button>
                <p className="text-sm font-semibold mt-6 pt-1 mb-0">
                   You don't have account ? 
                    <button onClick={()=>{
                        history.push('/register')
                    }} className="ml-2 text-white hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Register</button>
                </p>
            </div>
        </form>
    </>
}
