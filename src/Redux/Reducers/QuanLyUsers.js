import { SET_DANH_SACH_USERS_API, SET_USER_EDIT } from "../Types/ConstQuanLyPhim/ConstQuanLyPhim"

const initialState = {
    arrUsers: [],
    userEdit : {
      email: "",
      hoTen: "",
      maLoaiNguoiDung: "",
      matKhau: "",
      soDt: "",
      taiKhoan: "",
    }
}

export const QuanLyUsers = (state = initialState,action) => {
  switch (action.type) {
    case SET_DANH_SACH_USERS_API : {
        state.arrUsers = action.arrUsers
        return {...state}
    }
    case SET_USER_EDIT : {
        let userEditMask = {...state.userEdit}
        for(let key in action.userEdit ){
          if(action.userEdit[key] === null){
            userEditMask = {...userEditMask,[key] : '' }
          }else{
            userEditMask =  {...userEditMask,[key] : action.userEdit[key] }
          }
          
        }    
        state.userEdit = userEditMask
        return {...state}
    }
  default:
    return {...state}
  }
}
