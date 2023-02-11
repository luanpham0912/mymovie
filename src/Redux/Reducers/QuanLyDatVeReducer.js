import { DAT_VE, DAT_VE_THANH_CONG, LAY_DANH_SACH_PHONG_VE } from "../../Utils/ConstantDoMain/ConstantDomain"

const initialState = {
    chiTietPhongVe : [],
    arrGheDangDat : [],
    page: 1
}

export const QuanLyDatVeReducer = (state = initialState, action) => {
  switch (action.type) {

    case LAY_DANH_SACH_PHONG_VE : {
        state.chiTietPhongVe = action.chiTietPhongVe
        return {...state}
    }
    case DAT_VE : {
      let arrGheCapNhap = [...state.arrGheDangDat]
      const indexGhe = arrGheCapNhap.findIndex(ghe => ghe.maGhe === action.gheDuocChon.maGhe)
      if(indexGhe !== -1){
        state.arrGheDangDat.splice(indexGhe,1)
      }
      else{
        state.arrGheDangDat.push(action.gheDuocChon)

      }
      return {...state}
    }
    case DAT_VE_THANH_CONG :{

      state.arrGheDangDat = []
      return {...state}

    }
    case "CHUYEN_TAB" : {
   
      state.page = action.tab
      state.arrGheDangDat = []
      return {...state}
    }

  default:
    return {...state}
  }
}
