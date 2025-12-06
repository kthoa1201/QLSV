// js/main.js
import { SinhVien } from './model.js'; // Đã sửa models.js -> model.js
import { DanhSachSV } from './data-service.js';
import { renderDanhSach } from './ui.js';
import { generateID } from './idManager.js'; // Đã sửa utils.js -> idManager.js

const dssv = new DanhSachSV();

const getFormData = () => {
    const tenSV = document.getElementById('txtTenSV').value;
    const diemToan = parseFloat(document.getElementById('txtDiemToan').value);
    const diemVan = parseFloat(document.getElementById('txtDiemVan').value);
    
    // Yêu cầu: Destructuring assignment đã được ngầm thực hiện khi gọi hàm này
    return { tenSV, diemToan, diemVan };
};

// Xử lý sự kiện Thêm Sinh Viên
document.getElementById('btnThem').addEventListener('click', async (e) => {
    e.preventDefault(); 

    // Yêu cầu: Sử dụng Destructuring Assignment
    const { tenSV, diemToan, diemVan } = getFormData();
    
    // Tạo ID tự động từ Closure
    const maSV = generateID();

    const newSV = new SinhVien(maSV, tenSV, diemToan, diemVan);

    try {
        console.log("Đang thêm dữ liệu...");
        // Yêu cầu: Xử lý gọi hàm bằng async/await
        await dssv.themSV(newSV); 
        
        renderDanhSach(dssv.danhSach);
        console.log("Thêm thành công!");
    } catch (error) {
        console.error(error);
    }
});

// Xử lý sự kiện Xóa (Event Delegation)
document.getElementById('tbodySinhVien').addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-xoa')) {
        const idCanXoa = parseInt(e.target.getAttribute('data-id'));
        
        console.log(`Đang xóa SV ${idCanXoa}...`);
        await dssv.xoaSV(idCanXoa);
        
        renderDanhSach(dssv.danhSach);
    }
});