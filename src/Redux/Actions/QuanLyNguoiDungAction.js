import { history } from "../../App"
import * as _ from 'lodash'
import { quanLyNguoiDungService } from "../../Services/quanLyNguoiDungService/quanLyNguoiDungService"
import { SET_THONG_TIN_TAI_KHOAN, SET_USER_LOGIN, USERLOGIN } from "../../Utils/ConstantDoMain/ConstantDomain"
import { SET_DANH_SACH_USERS_API, SET_USER_EDIT } from "../Types/ConstQuanLyPhim/ConstQuanLyPhim"
import { Notificantion } from "../../Components/Notificantion/Notificantion"



export const QuanLyNguoiDungAction = (account) =>{
    return async dispatch => {
      try{

        const result = await quanLyNguoiDungService.dangNhap(account)
        await dispatch({
            type: SET_USER_LOGIN,
            userLogin : result.data.content
        })
  
        history.push('/')
      }catch(err){
        Notificantion("error","Tài khoản hoặc mật khẩu không đúng !")
       
        console.log(err)
       
      }
        
    }
}


export const LayThongTinTaiKhoanAction = () =>{
  return async dispatch => { 
    try{
      dispatch({
        type : "DISPLAY_LOADING"
     })
      const result = await quanLyNguoiDungService.LayThongTinTaiKhoan()
      await dispatch({
          type: SET_THONG_TIN_TAI_KHOAN,
          thongTinTaiKhoan : result.data.content
      })
      console.log(result)
      await dispatch({
        type : "HIDE_LOADING"
    })
    }catch(err){
      console.log(err.response?.content)
    }
      
  }
}

export const DangKyAction = (account) =>{
  return async dispatch => {
    try{

      const result = await quanLyNguoiDungService.dangKy(account)
      alert("Đăng ký tài khoản thành công")


      history.push('/login')
    }catch(err){
     console.log(err.response.data.content)
      alert(err.response.data.content)
    }
      
  }
}
export const LayDanhSachNguoiDung = (tenTimKiem = '') => {
  return async dispatch => {
     try{
        const res = await quanLyNguoiDungService.LayDanhSachNguoiDung(tenTimKiem)
        dispatch({
          type: SET_DANH_SACH_USERS_API,
          arrUsers : res.data.content
        })
     }catch (err) {
      console.log(err)
     }
  }
}
export const TimKiemNguoiDungAction = (tenTimKiem) => {
  return async dispatch => {
     try{
        const res = await quanLyNguoiDungService.TimKiemNguoiDung(tenTimKiem)
        // let arrUsers = _.find(res.data.content, function(o) { return o.taiKhoan === tenTimKiem; });
        
        dispatch({
          type: SET_USER_EDIT,
          userEdit : _.find(res.data.content, function(o) { return o.taiKhoan === tenTimKiem; })
        })
     }catch (err) {
      console.log(err)
     }
  }
}
export const CapNhapThongTinNguoiDungAction = (editAccount) => {
  return async dispatch => {
     try{
        const res = await quanLyNguoiDungService.CapNhapThongTinNguoiDung(editAccount)
        Notificantion('success',"Cập Nhập thành công")
        localStorage.setItem(USERLOGIN,JSON.stringify(res.data.content))
        history.push('/users')
     }catch (err) {
      console.log(err)
     }
  }
}
export const XoaNguoiDungAction = (TaiKhoan) => {
  return async dispatch => {
     try{
        const res = await quanLyNguoiDungService.xoaNguoiDung(TaiKhoan)

        alert('Xóa Người dùng thành công')
        dispatch(LayDanhSachNguoiDung())
     }catch (err) {
      console.log(err)
     }
  }
}
export const ThemNguoiDungAction = (account) => {
  return async dispatch => {
     try{
        const res = await quanLyNguoiDungService.themNguoiDung(account)

        alert('Thêm người dùng thành công')
        history.push('/users')
        dispatch(LayDanhSachNguoiDung())
     }catch (err) {
      console.log(err)
     }
  }
}
