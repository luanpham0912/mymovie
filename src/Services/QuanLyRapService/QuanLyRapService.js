import { BaseService } from "../BaseService";


export class QuanLyRapService extends BaseService {
    constructor(){
        super()
    }
    LayThongTinLichChieuHeThongRap = () =>{
        return this.get(`QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP00`)
    }
    LayThongTinLichChieuPhim = (maPhim) => {
        return this.get(`QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    LayThongCumRapTheoHeThong = (maHeThongRap) => {
        return this.get(`QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
    
}

export const quanLyRapService = new QuanLyRapService()

