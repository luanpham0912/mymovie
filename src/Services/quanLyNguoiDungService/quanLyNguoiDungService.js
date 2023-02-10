import { BaseService } from "../BaseService";


export class QuanLyNguoiDungService extends BaseService {
    constructor (){
        super()
    }
    dangNhap = (account)=>{
        return this.post(`QuanLyNguoiDung/DangNhap`,account)
    }
    LayThongTinTaiKhoan = ()=>{
        return this.post(`QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
    dangKy = (account) => {
        return this.post(`QuanLyNguoiDung/DangKy`,account)
    }
    LayDanhSachNguoiDung = (tenTimKiem) =>{
        if(tenTimKiem === '' ) {
            return this.get(`QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00`)

        }else {
            return this.get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP00&tuKhoa=${tenTimKiem}`)
        }
    }
    TimKiemNguoiDung = (tenTimKiem) => {
        return this.get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP00&tuKhoa=${tenTimKiem}`)
    }
    CapNhapThongTinNguoiDung = (editAccount) => {
        return this.put(`QuanLyNguoiDung/CapNhatThongTinNguoiDung`,editAccount)
    }
    xoaNguoiDung = (TaiKhoan) => {
        return this.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${TaiKhoan}`)
    }
    themNguoiDung = (account) =>{
        return this.post(`QuanLyNguoiDung/ThemNguoiDung`,account)
    }
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService()


