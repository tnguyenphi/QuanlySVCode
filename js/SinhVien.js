//Lớp Đối tượng => Tăng khả năng tái sử dụng của đối tượng (có thể sử dụng ở nhiều file code)

// => xử lý những chức nangw liên quan về quản lý (thêm, xóa , tìm kiếm, validation)

//khai báo lớp đối tượng (Class)
// ES5 
// tên hàm: camel case
//tên lớp : pascal case (SinhVien)
function SinhVien(ma,ten,email,pass,date,khoa,toan,hoa,ly){
    //thuộc tính
    //this đại diện cho SinhVien => giúp truy xuất được thuộc tính và phương thức
    this.maSV = ma;
    this.tenSV = ten;
    this.email = email;
    this.matKhau = pass;
    this.ngaySinh = date;
    this.khoaHoc = khoa;
    this.diemToan = toan;
    this.dienHoa = hoa;
    this.diemLy = ly;
    this.dtb = 0;
    //phương thức

    this.tinhDTB = function(){
        return (this.diemToan + this.dienHoa + this.diemLy)/3
    }
}