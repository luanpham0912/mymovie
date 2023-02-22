import { history } from "../../App"
import { Notificantion } from "../../Components/Notificantion/Notificantion"
import { quanLyDatVeReService } from "../../Services/QuanLyDatVeService/QuanLyDatVeService"
import { DAT_VE_THANH_CONG, LAY_DANH_SACH_PHONG_VE } from "../../Utils/ConstantDoMain/ConstantDomain"
import { LayThongTinTaiKhoanAction } from "./QuanLyNguoiDungAction"



export const QuanLyDatVeAction = (MaLichChieu) =>{
    return async dispatch => {
        try{
            const res = await quanLyDatVeReService.LayDanhSachPhongVe(MaLichChieu)     
            await dispatch({
                type : LAY_DANH_SACH_PHONG_VE,
                chiTietPhongVe : res.data.content
            })
        }catch(Err){
            console.log(Err)
        }
    }
} 

export const DatVeAction = (DanhSachVe) => {
    return async (dispatch,setState) => {
        try{
            dispatch({
                type : "DISPLAY_LOADING"
            })
            const res = await quanLyDatVeReService.DatVe(DanhSachVe)
           
            await dispatch(QuanLyDatVeAction(DanhSachVe.maLichChieu))

            await dispatch({
                type : DAT_VE_THANH_CONG
            })
          
            await dispatch(LayThongTinTaiKhoanAction())

             Notificantion("success","Đặt vé thành công")

            await dispatch({
                type : "CHUYEN_TAB",
                tab : 2
            })

        }catch(Err) {
            console.log(Err.response?.content)
            Notificantion("error","Đặt vé thất bại")
            dispatch({
                type : "HIDE_LOADING"
            })
        }
    }
}

export const TaoLichChieuAction = (lich) => {
    return async (dispatch) => {
        try{
         
            const res = await quanLyDatVeReService.TaoLichChieu(lich)
            Notificantion("success","Tạo lịch chiếu thành công")
            history.push('/admin')
        }catch(Err) {
            Notificantion("error","Tạo lịch chiếu thất bại")

            console.log(Err)
         
        }
    }
}