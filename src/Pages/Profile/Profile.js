import { set } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { LayThongTinTaiKhoanAction } from '../../Redux/Actions/QuanLyNguoiDungAction'
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
    const { name, value } = e.target
 
    setInputPassword({ ...inputPassword, value :{...inputPassword.value,[name]: value}  })
  }
  const handleSubmitForm = (e) => {
    
    e.preventDefault()
    if (thongTinTaiKhoan.matKhau === inputPassword.value.oldPassWord) {
        setInputPassword({
          ...inputPassword,errors : {...inputPassword.errors,oldPassWord : "" }
        })
    }else{
   
      setInputPassword({
        ...inputPassword,errors : {...inputPassword.errors,oldPassWord : "Mật khẩu không đúng! " }
      })
    }
  
  }

  return (
    <div className='px-10 pt-32 '>
      <div className='flex gap-5'>
        <img className='rounded-full' style={{ height: "150px" }} src={`https://i.pravatar.cc/150?img=${userLogin.hoTen}`} alt='avatar' />
        <div className='text-sm'>
          <p>Họ tên: <span className='text-lg text-stone-700 font-bold'>{userLogin.hoTen}</span></p>
          <p>Email: <span className='text-lg text-stone-700 font-bold'>{userLogin.email}</span></p>
          <p>Số điện thoại: <span className='text-lg text-stone-700 font-bold'>{userLogin.soDT}</span></p>
          <p>Tài khoản: <span className='text-lg text-stone-700 font-bold'>{userLogin.taiKhoan}</span></p>
          <div>
            <label htmlFor="checkboxPassword">Đổi mật khẩu: </label>
            <input id='checkboxPassword' className='ml-2' type='checkbox' onChange={handleChangeInput} />
            <form className={`form-group mt-2 ${show ? "block" : "hidden"}`} onSubmit={handleSubmitForm}>
              <label>Mật khẩu hiện tại: </label>
              <input  required type='password' onChange={handleChangeInputText} className='form-control' placeholder='Nhập mật khẩu hiện tại' name='oldPassWord' />
              <small  className="form-text text-red-700 font-bold">{inputPassword.errors.oldPassWord}</small>
              <br />
              <label>Mật khẩu mới: </label>
              <input  required type='password' onChange={handleChangeInputText} className='form-control' placeholder='Nhập mật khẩu mới' name='newPassWord' />
              <button type="submit" className="btn btn-primary mt-3 text-blue-600">Cập nhập</button>

            </form>

          </div>
        </div>
      </div>
      <KetQuaDatVe thongTinTaiKhoan={thongTinTaiKhoan} />
    </div>
  )
}
