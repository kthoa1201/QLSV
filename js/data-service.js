// js/data-service.js
import { SinhVien } from './model.js'; // Đã sửa models.js -> model.js

export class DanhSachSV {
    constructor() {
        this.danhSach = [];
    }

    _mockDelay(ms = 500) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async themSV(sv) {
        await this._mockDelay();
        // Immutable Update
        this.danhSach = [...this.danhSach, sv]; 
        return this.danhSach;
    }

    async xoaSV(maSV) {
        await this._mockDelay();
        // Sử dụng .filter()
        this.danhSach = this.danhSach.filter(sv => sv.maSV !== maSV);
        return this.danhSach;
    }

    async capNhatSV(maSV, thongTinMoi) {
        await this._mockDelay();
        // Immutable Update - Map + Spread
        this.danhSach = this.danhSach.map(sv => {
            if (sv.maSV === maSV) {
                return { ...sv, ...thongTinMoi }; 
            }
            return sv;
        });
        return this.danhSach;
    }
}