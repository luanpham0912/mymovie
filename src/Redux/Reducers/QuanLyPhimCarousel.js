import { SET_CHI_TIET_PHIM_API, SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU, SET_LIST_FILM_API, SET_THONG_TIN_PHIM_API } from "../Types/ConstQuanLyPhim/ConstQuanLyPhim"

const initialState = {
    arrFilm :[

         
    ],
    arrFilmDefault : [],
    dangChieu : true,
    sapChieu : false,
    detailPhim : {},
    thongTinPhimEdit : {}
}

export const QuanLyPhimReducer = (state = initialState, action) => {


  switch (action.type) {
  
    case SET_LIST_FILM_API : {
      state.arrFilm = action.arrFilm.filter(item => item.dangChieu === state.dangChieu && item.sapChieu === state.sapChieu)
      state.arrFilmDefault = action.arrFilm
      return {...state}
    }
    case SET_FILM_DANG_CHIEU : {
      state.dangChieu = true
      state.sapChieu = false
      state.arrFilm = state.arrFilmDefault.filter(item => item.dangChieu === state.dangChieu && item.sapChieu === state.sapChieu)
      console.log(state.arrFilm)
      console.log(state.arrFilmDefault)
      return {...state}
    }
    case SET_FILM_SAP_CHIEU: {
      state.dangChieu = false
      state.sapChieu = true
      state.arrFilm = state.arrFilmDefault.filter(item => item.sapChieu === state.sapChieu && item.dangChieu === state.dangChieu)
      console.log(state.arrFilm)
      console.log(state.arrFilmDefault)
      return {...state}
    }
    case SET_CHI_TIET_PHIM_API : {
      state.detailPhim = action.detailPhim
      return {...state}
    }
    case SET_THONG_TIN_PHIM_API : {
      state.thongTinPhimEdit = action.thongTinPhimEdit
    }
  default:
    return {...state}
  }
}
