import { history } from "../../App"
import { Notificantion } from "../../Components/Notificantion/Notificantion"
import { quanLyPhimService } from "../../Services/quanLyPhimSerivce/quanLyPhimService"
import { SET_CAROUSEL_API, SET_LIST_FILM_API, SET_THONG_TIN_PHIM_API } from "../Types/ConstQuanLyPhim/ConstQuanLyPhim"



export const LayDanhSachBannerAction = (url) =>{
    return async (dispatch) => {
        try{
           const res =  await quanLyPhimService.LayDanhSachBanner()
           dispatch({
            type: SET_CAROUSEL_API,
            arrCarousel : res.data.content
           })

        }catch(err){
            console.log("error", err)
        }
    }
}


export const LayDanhSachFilmAction = (tenPhim = '') =>{
    return async (dispatch) => {
        try{
            dispatch({
                type: "DISPLAY_LOADING"
            })
           const res =  await quanLyPhimService.LayDanhSachPhim(tenPhim)
            await dispatch({
            type: SET_LIST_FILM_API,
            arrFilm : res.data.content
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

export const themPhimUploadHinhAction = (formData) => {
    return async dispatch => {
        try {
            const res = await quanLyPhimService.themPhimUploadHinh(formData)
            alert("thêm phim thành công")
            history.push('/admin')
        }catch (err) {
            console.log(err)
        }
    }
}

export const layThongTinPhimAction = (maPhim) =>{
    return async dispatch =>{
        try {
            const res = await quanLyPhimService.layThongTinPhim(maPhim)
            // console.log(res)
            dispatch({
                type : SET_THONG_TIN_PHIM_API,
                thongTinPhimEdit : res.data.content
            })
        }catch(err) {
            console.log(err)
        }
    }
}

export const capNhapThongTinPhimUploadAction = (formData) => {
    return async dispatch => {
        try {
            const res = await quanLyPhimService.capNhapThongTinPhimUpload(formData)
            Notificantion("success","Cập nhập phim thành công")
            dispatch({
                type : SET_THONG_TIN_PHIM_API,
                thongTinPhimEdit : {}
            })
            history.push("/admin")
           console.log(res)
        }catch (err) {
            console.log(err)
        }
    }
}

export const xoaPhimAction = (maPhim) =>{
    return async dispatch =>{
        try {
            const res = await quanLyPhimService.xoaPhim(maPhim)
            alert("xóa phim thành công")
            // console.log(res)
            dispatch(LayDanhSachFilmAction())
        }catch(err) {
            console.log(err)
        }
    }
}