const getXepLoai = (dtb) => {

    if (dtb >= 8) return 'Giỏi';
    if (dtb >= 6.5) return 'Khá';
    if (dtb >= 5) return 'Trung Bình';
    return 'Yếu';
};


export const renderDanhSach = (arrSV) => {

    const content = arrSV.map((sv) => {

        const dtb = (parseFloat(sv.diemToan) + parseFloat(sv.diemVan)) / 2;
        const dtbFormatted = dtb.toFixed(2);
        const xepLoai = getXepLoai(dtb);

        
        return `
            <tr>
                <td>${sv.maSV}</td>
                <td>${sv.tenSV}</td>
                <td>${sv.diemToan}</td>
                <td>${sv.diemVan}</td>
                <td>${dtbFormatted}</td>
                <td>${xepLoai}</td> 
                <td>
                    <button class="btn-xoa" data-id="${sv.maSV}">Xóa</button>
                    <button class="btn-sua" data-id="${sv.maSV}">Sửa</button> </td>
            </tr>
        `;
    }).join('');

    document.getElementById('tbodySinhVien').innerHTML = content;
};