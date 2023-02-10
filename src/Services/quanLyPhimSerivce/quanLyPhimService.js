import { BaseService } from "../BaseService";


export class QuanLyPhimService extends BaseService {
    constructor() {
        super()
    }
    LayDanhSachBanner = () => {
        return this.get('QuanLyPhim/LayDanhSachBanner')
    }
    LayDanhSachPhim = (tenPhim) => {
        if (tenPhim.trim() !== '') {
            return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP00&tenPhim=${tenPhim.trim()}`)

        }
        return this.get(`QuanLyPhim/LayDanhSachPhim?maNhom=GP00`)
    }
    themPhimUploadHinh = (formData) => {
        return this.post(`QuanLyPhim/ThemPhimUploadHinh`, formData)
    }
    layThongTinPhim = (maPhim) => {
        return this.get(`QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }
    capNhapThongTinPhimUpload = (formData) => {
        return this.post(`QuanLyPhim/CapNhatPhimUpload`, formData)
    }
    xoaPhim = (maPhim) => {
        return this.delete(`QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const quanLyPhimService = new QuanLyPhimService()


