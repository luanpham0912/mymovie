import { quanLyRapService } from "../../Services/QuanLyRapService/QuanLyRapService"
import { SET_CHI_TIET_PHIM_API, SET_CUM_RAP_THEO_THONG_RAP_API, SET_HE_THONG_RAP_API } from "../Types/ConstQuanLyPhim/ConstQuanLyPhim"
import {history} from '../../App'


export const LayThongTinLichChieuHeThongRapAction = () =>{
    return async (dispatch) => {
        try{
            dispatch({
            type: "DISPLAY_LOADING"
            })
           const res =  await quanLyRapService.LayThongTinLichChieuHeThongRap()
         
            await dispatch({
            type: SET_HE_THONG_RAP_API,
            heThongRapChieu : res.data.content
           })
           dispatch({
            type: "HIDE_LOADING"
            })
        }catch(err){
            console.log("error", err)
            dispatch({
                type: "HIDE_LOADING"
                })
        }
    }
}

export const LayThongTinLichChieuPhimAction = (maPhim) =>{
    return async (dispatch) => {
        try{
            dispatch({
                type: "DISPLAY_LOADING"
                })
           const res =  await quanLyRapService.LayThongTinLichChieuPhim(maPhim)
         
        await    dispatch({
            type: SET_CHI_TIET_PHIM_API,
            detailPhim : res.data.content
           })
           dispatch({
            type: "HIDE_LOADING"
            })
        }catch(err){
            console.log("error", err)
            dispatch({
                type: "HIDE_LOADING"
                })
        }
    }
}


export const LayThongCumRapTheoHeThongAction = (maHeThongRap) =>{
    return async (dispatch) => {
        try{

           const res =  await quanLyRapService.LayThongCumRapTheoHeThong(maHeThongRap)
            console.log(res)
         dispatch({
            type: SET_CUM_RAP_THEO_THONG_RAP_API,
            cumRap : res.data.content
           })

        }catch(err){
            console.log("error", err)
    
        }
    }
}