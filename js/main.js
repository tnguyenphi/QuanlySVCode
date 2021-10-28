//global
//tạo thể hiện của DanhSachSinhVien
// CHỉ khởi tạo mảng sinh viên 1 lần để có thể têm nhiều giá trị vào mảng
// có thể dùng đc cho toàn hệ thống
var dssv = new DanhSachSinhVien();
var validation = new Validation();

function getELE(id) {
    return document.getElementById(id)
}

// Lưu ds SV xuống local Storage (Kho lưu trữ offline của browser)
function setLocalStorage(mangSV) {
    //localStorage : object có sẵn của js
    // localStorage phải lưu thành kiểu JSON
    // JSON.stringify: chuyển từ kiểu biến JS sang kiểu JSON
    localStorage.setItem("DSSV", JSON.stringify(mangSV));
}

function getLocalStorage(mangSV) {
    // Khi lấy lên , localStorage sẽ trả kết quả là JSON
    //JSON.parse chuyển từ JSON sang mảng
    // nếu ko có localStorage thì trả về null
    //null là kiểu dữ liệu trong JS
    // dssv.mangSV = null => đổi sang kiểu null
    if (localStorage.getItem("DSSV") != null) {
        dssv.mangSV = JSON.parse(localStorage.getItem("DSSV"));
        hienThiTable(dssv.mangSV);
    }

}
getLocalStorage();

function layThongTinSV() {
    var ma = getELE("txtMaSV").value;
    var ten = getELE("txtTenSV").value;
    var email = getELE("txtEmail").value;
    var pass = getELE("txtPass").value;
    var date = getELE("txtNgaySinh").value;
    var khoa = getELE("khSV").value;
    var toan = getELE("txtDiemToan").value;
    var hoa = getELE("txtDiemHoa").value;
    var ly = getELE("txtDiemLy").value;


    // chỉ được phép thêm sv khi tất cả dữ liệu đều hợp lệ
    // giả sử dữ liệu hợp lệ
    var isValid = true;

    // các bước kiểm tra dữ liệu
    // Mã SV: kiểm tra rỗng , kiểm tra trùng
    // &(cộng kiểu binary(0,1)), &&(so sánh giá trị của biểu thức)
    // 1 & 1 => 1
    // isValid mới = isValid cũ & validation.checkEmpty

    isValid &= validation.checkEmpty(ma,"Mã SV không được để trống","spanMaSV") && validation.checkID(ma,"Mã Sv không được trùng","spanMaSV",dssv.mangSV);

    // Tên SV: Kiểm tra rỗng , kiểm tra ký tự chữ
    isValid &= validation.checkEmpty(ten,"Tên SV không được để trống","spanTenSV") && validation.checkName(ten,"Tên SV Phải là kiểu chữ","spanTenSV");

    //Email: Kiểm tra rỗng, kiểm tra định dạng email
    isValid &= validation.checkEmpty(email,"Email không được để trống","spanEmailSV") && validation.checkEmail(email,"Email phải đúng định dạng","spanEmailSV");
    //Password: 
    isValid &= validation.checkEmpty(pass,"Password không được để trống","spanMatKhau") && validation.checkPass(pass,"Mật khẩu phải đúng định dạng","spanMatKhau") ;

    // Khóa học: Kiểm tra người dùng có chọn khóa học ko
    
    isValid &= validation.checkSelect("khSV","Chọn Khóa học","spanKhoaHoc") 

    // Điểm khóa học: Kiểm tra rỗng, định dạng điểm (Kiểu số, 0-10)
    isValid &= validation.checkEmpty(toan,"Điểm toán không được để trống","spanToan") && validation.checkScore(toan,"Điểm toán phải là số từ 0 đến 10","spanToan");

    isValid &= validation.checkEmpty(hoa,"Điểm Hóa không được để trống","spanHoa") && validation.checkScore(toan,"Điểm Hóa phải là số từ 0 đến 10","spanHoa");

    isValid &= validation.checkEmpty(ly,"Điểm Lý không được để trống","spanLy") && validation.checkScore(ly,"Điểm Lý phải là số từ 0 đến 10","spanLy");
    

    if (isValid){
    //Gọi lớp SinhVien ra để sử dụng
    // tạo thể hiện(instance) lớp đối tượng SinhVien
    // new tenLop
    var sv = new SinhVien(ma.trim(), ten, email, pass, date, khoa, Number(toan), Number(hoa), Number(ly));
    sv.dtb = sv.tinhDTB();
    // console.log(sv);
    // console.table(sv)

    // Object sv
    // Array 
    // => mảng sinh viên = [sv1,sv2,sv3]
    dssv.themSV(sv);
    console.log(dssv.mangSV)

    hienThiTable(dssv.mangSV);
    //khi có sự thay đổi trong mangsv thì set lại localStorage
    setLocalStorage(dssv.mangSV);
    }
}


function hienThiTable(mangSV) {
    /**
     *B1: Duyệt mảng sinh viên để lấy từng sv ra
     *B2: tạo các thẻ tr mỗi tr đại diện cho 1 sv
     *B3: lưu các tr vào trong 1 biến content
     *B4: Đẩy content lên table
    */
    var content = "";
    for (var i = 0; i < mangSV.length; i++) {
        //string template / template literal (ES6)
        var trSV = `<tr>
              <td>${mangSV[i].maSV}</td>
              <td>${mangSV[i].tenSV}</td> 
              <td>${mangSV[i].email}</td> 
              <td>${mangSV[i].ngaySinh}</td> 
              <td>${mangSV[i].khoaHoc}</td> 
              <td>${mangSV[i].dtb}</td> 
              <td>
                <button onclick="xoaSinhVien('${mangSV[i].maSV}')" class ="btn btn-danger">Xóa</button>
                <button onclick="xemChiTiet('${mangSV[i].maSV}')" class ="btn btn-info">Xem</button>
              </td>   
        </tr>`;
        content += trSV;
    }
    console.log(content);
    getELE("tbodySinhVien").innerHTML = content;
}


function xoaSinhVien(ma) {
    dssv.xoaSV(ma);
    setLocalStorage(dssv.mangSV);
    hienThiTable(dssv.mangSV);
}


function resetForm(){
    getELE("formQLSV").reset();
    getELE("txtMaSV").disabled = false;
}

function xemChiTiet(ma) {
    var svTimDuoc = dssv.layChiTiet(ma);
    console.log(svTimDuoc);
    if (svTimDuoc != undefined) {
        // tìm được sv
        getELE("txtMaSV").disabled = true;
        getELE("txtMaSV").value = svTimDuoc.maSV;
        getELE("txtTenSV").value = svTimDuoc.tenSV;
        getELE("txtEmail").value = svTimDuoc.email;
        getELE("txtPass").value = svTimDuoc.matKhau;
        getELE("txtNgaySinh").value = svTimDuoc.ngaySinh;
        getELE("khSV").value = svTimDuoc.khoaHoc;
        getELE("txtDiemToan").value = svTimDuoc.diemToan;
        getELE("txtDiemHoa").value = svTimDuoc.dienHoa;
        getELE("txtDiemLy").value = svTimDuoc.diemLy;
    }else {
        console.log("Không tìm được")
    }
}

function capNhat(){
    var ma = getELE("txtMaSV").value;
    var ten = getELE("txtTenSV").value;
    var email = getELE("txtEmail").value;
    var pass = getELE("txtPass").value;
    var date = getELE("txtNgaySinh").value;
    var khoa = getELE("khSV").value;
    var toan = Number(getELE("txtDiemToan").value);
    var hoa = Number(getELE("txtDiemHoa").value);
    var ly = Number(getELE("txtDiemLy").value);

    var sv = new SinhVien(ma, ten, email, pass, date, khoa, toan, hoa, ly);
    sv.dtb = sv.tinhDTB();
    dssv.capNhatSV(sv);
    setLocalStorage(dssv.mangSV);
    hienThiTable(dssv.mangSV);
}


getELE("btnSearch").onclick = function (){
    var tuKhoa = getELE("txtSearch").value;
    var mangTK = dssv.searchName(tuKhoa);
    hienThiTable(mangTK);
}

// Người dùng gõ input thì lập tức search
//keypress, keydown, keyup
getELE("txtSearch").onkeyup = function(){
    var tuKhoa = getELE("txtSearch").value;
    var mangTK = dssv.searchName(tuKhoa);
    hienThiTable(mangTK);
}
