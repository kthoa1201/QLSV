// main.js
import { SinhVien } from "./models.js";
import { DanhSachSV } from "./data-service.js";

const ds = new DanhSachSV();
const form = document.getElementById("form-sinh-vien");
const ketQua = document.getElementById("ket-qua");

// Xử lý submit form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const { maSV, tenSV, diemToan, diemVan } = values;

    // Tạo đối tượng sinh viên mới
    const sv = new SinhVien(maSV, tenSV, diemToan, diemVan);

    // Thêm vào danh sách
    ds.themSV(sv);

    // Render bảng
    renderTable();

    // Reset form
    form.reset();
});

// Render bảng danh sách sinh viên
function renderTable() {
    ketQua.innerHTML = `
        <table border="1" cellpadding="10">
            <thead>
                <tr>
                    <th>Mã SV</th>
                    <th>Tên</th>
                    <th>Toán</th>
                    <th>Văn</th>
                    <th>Điểm TB</th>
                    <th>Xếp loại</th>
                </tr>
            </thead>
            <tbody>
                ${ds.list.map(sv => `
                    <tr>
                        <td>${sv.maSV}</td>
                        <td>${sv.tenSV}</td>
                        <td>${sv.diemToan}</td>
                        <td>${sv.diemVan}</td>
                        <td>${sv.tinhDiemTB()}</td>
                        <td>${sv.xepLoai()}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}
