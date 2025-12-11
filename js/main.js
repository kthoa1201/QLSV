import { SinhVien } from './model.js';
import { DanhSachSV } from './data-service.js';
import { renderDanhSach } from './ui.js';


const dssv = new DanhSachSV();
const btnSave = document.getElementById('btnSave');
const formSV = document.getElementById('formSV'); 
const txtMaSV = document.getElementById('txtMaSV'); 

let maSVDangSua = null; 


const initializeApp = () => {
    renderDanhSach(dssv.danhSach); 
}

const getFormData = () => {
    const maSV = txtMaSV.value;
    const tenSV = document.getElementById('txtTenSV').value;
    const diemToan = parseFloat(document.getElementById('txtDiemToan').value);
    const diemVan = parseFloat(document.getElementById('txtDiemVan').value);
    
    return { maSV, tenSV, diemToan, diemVan };
};


const toggleLoading = (isLoading) => {
    btnSave.disabled = isLoading;
    
    if (!isLoading) {
        btnSave.textContent = maSVDangSua ? `Cập nhật SV` : 'Thêm';
    } else {
        btnSave.textContent = 'Đang xử lý...';
    }
}


const resetForm = () => {
    formSV.reset();
    txtMaSV.disabled = false; 
    maSVDangSua = null;
    toggleLoading(false); 
}


const handleUpdate = async ({ maSV, tenSV, diemToan, diemVan }) => {
    
    const thongTinMoi = { tenSV, diemToan, diemVan };
    
    console.log(`Đang cập nhật SV ${maSV}...`);
    
    await dssv.capNhatSV(maSV, thongTinMoi);
    
    renderDanhSach(dssv.danhSach);
    resetForm();
    console.log("Cập nhật thành công!");
}


const handleAdd = async ({ maSV, tenSV, diemToan, diemVan }) => {
    const maSVExists = dssv.danhSach.some(sv => String(sv.maSV) === maSV);

    if (maSVExists) {
        throw new Error(`Mã Sinh Viên ${maSV} đã tồn tại. Vui lòng bấm Sửa để Cập nhật!`);
    }
    
    const newSV = new SinhVien(maSV, tenSV, diemToan, diemVan);

    console.log("Đang thêm dữ liệu...");
    await dssv.themSV(newSV); 
    
    renderDanhSach(dssv.danhSach);
    resetForm();
    console.log("Thêm thành công!");
}



btnSave.addEventListener('click', async (e) => {
    e.preventDefault(); 
    toggleLoading(true); 

    const { maSV, tenSV, diemToan, diemVan } = getFormData();
    
    try {
        if (maSVDangSua) {
            
            await handleUpdate({ maSV, tenSV, diemToan, diemVan });
        } else {

            await handleAdd({ maSV, tenSV, diemToan, diemVan });
        }
    } catch (error) {
        alert(`Lỗi: ${error.message}`);
        console.error(error);
        toggleLoading(false); 
    } finally {
    
        if (error) toggleLoading(false); 
    }
});


document.getElementById('tbodySinhVien').addEventListener('click', async (e) => {
    const id = e.target.getAttribute('data-id'); 

    if (e.target.classList.contains('btn-xoa')) {
        
        toggleLoading(true); 
        try {
            console.log(`Đang xóa SV ${id}...`);
            await dssv.xoaSV(id);
            renderDanhSach(dssv.danhSach);
            resetForm();
        } catch (error) {
             alert(`Lỗi xóa: ${error.message}`);
        } finally {
             toggleLoading(false);
        }
    }
    
    if (e.target.classList.contains('btn-sua')) {
      
        const svCanSua = dssv.danhSach.find(sv => String(sv.maSV) === String(id));
        
        if (svCanSua) {
    
            txtMaSV.value = svCanSua.maSV;
            document.getElementById('txtTenSV').value = svCanSua.tenSV;
            document.getElementById('txtDiemToan').value = svCanSua.diemToan;
            document.getElementById('txtDiemVan').value = svCanSua.diemVan;

            txtMaSV.disabled = true; 
            maSVDangSua = svCanSua.maSV; 
            btnSave.textContent = `Cập nhật SV `;
        }
    }
});

initializeApp();