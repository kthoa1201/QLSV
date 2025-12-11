export class SinhVien {
    constructor(maSV, tenSV, diemToan, diemVan) {
        this.maSV = maSV;
        this.tenSV = tenSV;
        this.diemToan = diemToan;
        this.diemVan = diemVan;
    }

    tinhDTB() {
        return (this.diemToan + this.diemVan) / 2;
    }

    xepLoai() {
        const dtb = this.tinhDTB();
        if (dtb >= 8) return 'Giỏi';
        if (dtb >= 6.5) return 'Khá';
        if (dtb >= 5) return 'Trung Bình';
        return 'Yếu';
    }
}