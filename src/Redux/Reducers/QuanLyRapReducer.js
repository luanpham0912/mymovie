import { SET_CUM_RAP_THEO_THONG_RAP_API, SET_HE_THONG_RAP_API } from "../Types/ConstQuanLyPhim/ConstQuanLyPhim"

const initialState = {
    heThongRapChieu : [],
    cumRap : []
}

export const QuanLyRapReducer = (state = initialState,action) => {
  switch (action.type) {
    case SET_HE_THONG_RAP_API : {
        state.heThongRapChieu = action.heThongRapChieu
        return {...state}
    }
    case SET_CUM_RAP_THEO_THONG_RAP_API : {
      state.cumRap = action.cumRap
      return {...state}
    }
  default:
    return {...state}
  }
}
