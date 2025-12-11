import { SinhVien } from './model.js'; 

export class DanhSachSV {
    constructor() {
        this.danhSach = this.layLocal() || []; 
    }

    
    luuLocal() {
    
        localStorage.setItem('DSSV_KEY', JSON.stringify(this.danhSach));
    }

    layLocal() {
        const dataJson = localStorage.getItem('DSSV_KEY');
        if (dataJson) {
            const dataArr = JSON.parse(dataJson);
           
            return dataArr.map(item => new SinhVien(item.maSV, item.tenSV, item.diemToan, item.diemVan));
        }
        return null;
    }


    _mockDelay(ms = 1500) { 
        return new Promise(resolve => setTimeout(resolve, ms));
    }

   
    async themSV(sv) {
        await this._mockDelay();
        this.danhSach = [...this.danhSach, sv]; 
        this.luuLocal(); 
        return this.danhSach;
    }

    async xoaSV(maSV) {
        await this._mockDelay();
        this.danhSach = this.danhSach.filter(sv => String(sv.maSV) !== String(maSV));
        this.luuLocal(); 
        return this.danhSach;
    }

    async capNhatSV(maSV, thongTinMoi) {
        await this._mockDelay();
        this.danhSach = this.danhSach.map(sv => {
            if (String(sv.maSV) === String(maSV)) {
                return { ...sv, ...thongTinMoi }; 
            }
            return sv;
        });
        this.luuLocal();
        return this.danhSach;
    }
}