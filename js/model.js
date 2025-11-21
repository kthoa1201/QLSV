// models.js
export class SinhVien {
    constructor(_maSV, _tenSV, _diemToan, _diemVan) {
        this.maSV = _maSV;
        this.tenSV = _tenSV;
        this.diemToan = parseFloat(_diemToan);
        this.diemVan = parseFloat(_diemVan);
    }

    tinhDiemTB() {
        return (this.diemToan + this.diemVan) / 2;
    }

    xepLoai() {
        const dtb = this.tinhDiemTB();
        if (dtb >= 0 && dtb <= 10) {
            if (dtb >= 8) return "Giỏi";
            else if (dtb >= 6.5) return "Khá";
            else if (dtb >= 5) return "Trung bình";
            else return "Yếu";
        }
        return "Điểm không hợp lệ";
    }
}
