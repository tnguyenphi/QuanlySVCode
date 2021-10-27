/**
 * B1: Lấy dữ liệu từ form bên Trái
 * B2: Xử lý thông tin
 * _tinhDTB
 * _xepLoai
 * 
 * B3: Hiển thị thông tin ở phần bên phải
 */
//Hàm rút gọn cú pháp Dom thẻ bằng ID
function getELEQuery(id){
    return document.querySelector(id);
}

function layDuLieu(){
    // B1: Lấy dữ liệu từ form 
    var ma = getELEQuery("#txtMaSV").value;
    var ten = getELEQuery("#txtTenSV").value;
    var loai = getELEQuery("#loaiSV").value;
    var diemToan = getELEQuery("#txtDiemToan").value;
    var diemVan = getELEQuery("#txtDiemVan").value;
    //cần return nhiều giá trị => Biến chứa nhiều giá trị(array)
    //Object: 
    //tạo đối tượng sv
    var sv = {
        //chứa thông tin sv => đặc điểm của đối tượng
        // thuộc tính (property) (key:value)
        maSV:ma,
        tenSV:ten,
        loaiSV:loai,
        diemToan:diemToan,
        diemVan: diemVan,

        //phương thức (method: những hành động xử lý thông tin liên qan về SV) hàm trong đối tượng
        tinhDTB:function(diem1,diem2){
            return (Number(diem1) + Number(diem2))/2;   
        },
        xepLoai:function(dtb){
            if(dtb<=10 && dtb >=7){
                return "Giỏi";
            } else if (dtb>=0 && dtb<7){
                return "Yếu";
            }else {
                console.log("ĐTB không hợp lệ")
            }
        }
    }
    return sv;
}

function hienThi(){

    var sinhvien = layDuLieu();
    //sử dụng các thuộc tính của đối tượng
    // Object.property
    getELEQuery("#spanTenSV").innerHTML = sinhvien.tenSV;
    getELEQuery("#spanMaSV").innerHTML = sinhvien.maSV;
    getELEQuery("#spanLoaiSV").innerHTML = sinhvien.loaiSV;
    var dtb = sinhvien.tinhDTB(sinhvien.diemToan,sinhvien.diemVan);
    getELEQuery("#spanDTB").innerHTML = dtb;
    getELEQuery("#spanXepLoai").innerHTML = sinhvien.xepLoai(dtb);



    // var dtb = tinhDTB(diemToan,diemVan);
    // var loai = xepLoai(dtb);
    // getELEQuery("#spanMaSV").innerHTML = maSV;
    // getELEQuery("#spanTenSV").innerHTML = tenSV;
    // getELEQuery("#spanLoaiSV").innerHTML = loaiSV;
    // // getELEQuery("#spanDTB").innerHTML = dtb;
    // getELEQuery("#spanDTB").innerHTML = tinhDTB(diemToan,diemVan);
    // // getELEQuery("#spanXepLoai").innerHTML = loai;
    // getELEQuery("#spanXepLoai").innerHTML = xepLoai(tinhDTB(diemToan,diemVan));


    
}

function tinhDTB(diem1,diem2) {
    return (Number(diem1) + Number(diem2))/2;
}

function xepLoai(dtb){
    if(dtb<=10 && dtb >=7){
        return "Giỏi";
    } else if (dtb>=0 && dtb<7){
        return "Yếu";
    }else {
        console.log("ĐTB không hợp lệ")
    }
}