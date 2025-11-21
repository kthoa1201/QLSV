// data-service.js
import { SinhVien } from "./models.js";

export class DanhSachSV {
    constructor() {
        this.list = [];
    }

    themSV(sv) {
        if (sv instanceof SinhVien) {
            this.list.push(sv);
        } else {
            console.error("Đối tượng không hợp lệ!");
        }
    }

    xoaSV(maSV) {
        this.list = this.list.filter(sv => sv.maSV !== maSV);
    }

    capNhatSV(svMoi) {
        const index = this.list.findIndex(sv => sv.maSV === svMoi.maSV);
        if (index !== -1) {
            this.list[index] = svMoi;
        } else {
            console.warn("Không tìm thấy sinh viên để cập nhật!");
        }
    }
}
