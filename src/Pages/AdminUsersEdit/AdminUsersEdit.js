import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CapNhapThongTinNguoiDungAction, LayDanhSachNguoiDung, TimKiemNguoiDungAction } from '../../Redux/Actions/QuanLyNguoiDungAction'
import {
    EyeOutlined,
    EyeInvisibleOutlined
} from '@ant-design/icons';

export default function AdminUsersEdit(props) {
    const dispatch = useDispatch()
    const { userEdit } = useSelector(state => state.QuanLyUsers)
   
    useEffect(() => {
     
        dispatch(TimKiemNguoiDungAction(props.match.params.id))
    }, [])
    const [typePassword, setTypePassword] = useState(false)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            
            taiKhoan: userEdit.taiKhoan,
            matKhau: userEdit.matKhau,
            email: userEdit.email,
            soDt: userEdit.soDt,
            maNhom: "GP00",
            hoTen: userEdit.hoTen,
            maLoaiNguoiDung: userEdit.maLoaiNguoiDung,
            
        },
        onSubmit: values => {
            values.maNhom = "GP00"
            dispatch(CapNhapThongTinNguoiDungAction(values))
            console.log("values", values)
        },

    })
    const handleChangeMaLoaiNguoiDung = (e) => {
        console.log(e.target.value)
        formik.setFieldValue('maLoaiNguoiDung', e.target.value)
    }
    return (
        <>
            <h2 className='font-bold text-2xl'> CẬP NHẬP TÀI KHOẢN </h2>
            <form onSubmit={formik.handleSubmit}>
                {/* Username input */}
                <div className="mb-6">
                    <label className='text-sm text-slate-600 font-bold'>Username</label>
                    <input disabled type="text" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none cursor-no-drop" name="taiKhoan" value={formik.values.taiKhoan} onChange={formik.handleChange} placeholder="Tài khoản" />
                </div>
                {/* Password input */}
                <div className="mb-6 relative">
                    <label className='text-sm text-slate-600 font-bold'>Password</label>
                    <input required type={ typePassword ? "text" : "password"} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none " value={formik.values.matKhau} name="matKhau" onChange={formik.handleChange} placeholder="Mật khẩu" />
                    {typePassword ? <button type='button' onClick={() => { setTypePassword(!typePassword) }} className='absolute  right-3 top-9'><EyeInvisibleOutlined /></button> :
                        <button type='button' onClick={() => { setTypePassword(!typePassword) }} className='absolute  right-3 top-9'>< EyeOutlined /></button>}
                </div>
                {/* Email input */}
                <div className="mb-6">
                    <label className='text-sm text-slate-600 font-bold'>Email</label>
                    <input required type="email" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="Email" />

                </div>
                {/* hoTen input */}
                <div className="mb-6">
                    <label className='text-sm text-slate-600 font-bold'>Họ Tên</label>
                    <input required type="text" className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="hoTen" value={formik.values.hoTen} onChange={formik.handleChange} placeholder="Họ và tên" />
                </div>
                {/* sđt input */}
                <div className="mb-6">
                    <label className='text-sm text-slate-600 font-bold'>Số điện thoại</label>
                    <input required className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="soDt" value={formik.values.soDt} onChange={formik.handleChange} placeholder="Số điện thoại" />
                </div>
                {/* maLoaiNguoiDung input */}
                <div className="mb-6">
                    <label className='mr-2 text-sm text-slate-600 font-bold '>Mã loại người dùng </label>
                    <select className='border-2 rounded-md border-slate-300 p-2 ' value={formik.values.maLoaiNguoiDung} onChange={handleChangeMaLoaiNguoiDung}>
                        <option value={"KhachHang"}>Khách hàng</option>
                        <option value={"QuanTri"}>Quản trị</option>
                    </select>

                </div>



                <div className="text-center lg:text-left">
                    <button type='submit' className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                        Update
                    </button>

                </div>
            </form>
        </>
    )
}
