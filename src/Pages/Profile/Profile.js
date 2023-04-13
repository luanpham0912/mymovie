import { set } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { CapNhapThongTinNguoiDungAction, LayThongTinTaiKhoanAction } from '../../Redux/Actions/QuanLyNguoiDungAction'
import { USERLOGIN } from '../../Utils/ConstantDoMain/ConstantDomain'
import { KetQuaDatVe } from '../Checkout/Checkout'

export default function Profile() {

  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [inputPassword, setInputPassword] = useState({
    value: {
      oldPassWord: '',
      newPassWord: ''
    },
    errors: {
      oldPassWord: '',
      newPassWord: ''
    }
  })
  const { userLogin, thongTinTaiKhoan } = useSelector(state => state.QuanLyNguoiDungReducer)
  useEffect(() => {
    dispatch(LayThongTinTaiKhoanAction())
  }, [])
  if (!localStorage.getItem(USERLOGIN)) {
    return <Redirect to="/login" />
  }

  const handleChangeInput = (e) => {

    setShow(e.target.checked)
  }
  const handleChangeInputText = (e) => {
    let { name, value, type } = e.target;
    console.log(name, value);

    let newValue = { ...inputPassword.value, [name]: value };

    setInputPassword({
      ...inputPassword,
      value: newValue,
    })
  }
  const handleSubmitForm = (e) => {
    e.preventDefault()
    let newErrors = { ...inputPassword.errors };


    if (inputPassword.value.oldPassWord !== thongTinTaiKhoan.matKhau) {
      newErrors["oldPassWord"] = 'Sai mật khẩu !';

    } else {
      newErrors["oldPassWord"] = '';

    }

    // if (inputPassword.value.newPassWord !== inputPassword.value.oldPassWord) {
    //   newErrors["newPassWord"] = 'Mật khẩu không khớp !';

    // } else {
    //   newErrors["newPassWord"] = '';

    // }

    setInputPassword({
      ...inputPassword,
      errors: newErrors
    })
    let isValid = true;
    for (let key in newErrors) {
      if (newErrors[key] !== '') {
        return isValid = false;
      }
     
  }
  if(isValid) {
      const editAccount = {
        ...thongTinTaiKhoan,matKhau : inputPassword.value.newPassWord,maLoaiNguoiDung : "QuanTri"
      }
      console.log(editAccount)
      dispatch(CapNhapThongTinNguoiDungAction(editAccount,false))
  }

  }

  return (
    <div className='px-10 pt-32 '>
      <div className='flex gap-5'>
        <img className='rounded-full' style={{ height: "150px" }} src={`https://i.pravatar.cc/150?img=${userLogin.hoTen}`} alt='avatar' />
        <div className='text-sm'>
          <p>Họ tên: <span className='text-lg text-stone-700 font-bold'>{thongTinTaiKhoan.hoTen}</span></p>
          <p>Email: <span className='text-lg text-stone-700 font-bold'>{thongTinTaiKhoan.email}</span></p>
          <p>Số điện thoại: <span className='text-lg text-stone-700 font-bold'>{thongTinTaiKhoan.soDT}</span></p>
          <p>Tài khoản: <span className='text-lg text-stone-700 font-bold'>{thongTinTaiKhoan.taiKhoan}</span></p>
          <div>
            <label htmlFor="checkboxPassword">Đổi mật khẩu: </label>
            <input id='checkboxPassword' className='ml-2' type='checkbox' onChange={handleChangeInput} />
            <form className={`form-group mt-2 ${show ? "block" : "hidden"}`} onSubmit={handleSubmitForm}>
              <label style={{width: "40%" ,display : "inline-block"}}>Mật khẩu hiện tại: </label>
              <input required type='password' onChange={handleChangeInputText} className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-400' placeholder='Nhập mật khẩu hiện tại' name='oldPassWord' />
              <small className="form-text text-red-700 font-bold block text-center mt-2">{inputPassword.errors.oldPassWord}</small>
              <br />
              <label style={{width: "40%" ,display : "inline-block"}}>Mật khẩu mới: </label>
              <input required type='password' onChange={handleChangeInputText} className='shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-400' placeholder='Nhập mật khẩu mới' name='newPassWord' />
              <small className="form-text text-red-700 font-bold block text-center mt-2">{inputPassword.errors.newPassWord}</small>
              <br />
              <button type="submit" className="py-3 px-2 bg-lime-400 mt-3 text-black rounded-md">Cập nhập</button>

            </form>

          </div>
        </div>
      </div>
      <KetQuaDatVe thongTinTaiKhoan={thongTinTaiKhoan} />
    </div>
  )
}
