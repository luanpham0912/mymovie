import { BaseService } from "../BaseService";


export class QuanLyDatVeReService extends BaseService {
    constructor (){
        super()
    }
    LayDanhSachPhongVe = (MaLichChieu)=>{
        return this.get(`QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${MaLichChieu}`)
    }
    DatVe = (DanhSachVe)=>{
        return this.post(`QuanLyDatVe/DatVe`,DanhSachVe)
    }
    TaoLichChieu = (lich) => {
        return this.post(`QuanLyDatVe/TaoLichChieu`,lich)
    }

}

export const quanLyDatVeReService = new QuanLyDatVeReService()


