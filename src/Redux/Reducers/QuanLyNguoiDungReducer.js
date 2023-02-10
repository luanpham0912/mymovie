import { SET_THONG_TIN_TAI_KHOAN, SET_USER_LOGIN, TOKEN, USERLOGIN } from "../../Utils/ConstantDoMain/ConstantDomain"

let uslogin = {}
if(localStorage.getItem(USERLOGIN)){
    uslogin = JSON.parse(localStorage.getItem(USERLOGIN))
}


const initialState = {
    userLogin : uslogin,
    thongTinTaiKhoan : {}
}

export const QuanLyNguoiDungReducer = (state = initialState,action) => {
  switch (action.type) {

    case SET_USER_LOGIN : {
        localStorage.setItem(USERLOGIN,JSON.stringify(action.userLogin))
        localStorage.setItem(TOKEN,action.userLogin.accessToken)
        state.userLogin = action.userLogin
        
        return {...state}
    }
    case SET_THONG_TIN_TAI_KHOAN : {
      state.thongTinTaiKhoan = action.thongTinTaiKhoan
      return {...state}
    }
    case "DANG_XUAT" : {
      state.userLogin = {}
      return {...state}
    }
  default:      
     return {...state}

  }
}
