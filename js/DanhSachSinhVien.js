function DanhSachSinhVien(){
    //Property
    // this đại diện cho lớp đối tượng
    this.mangSV = []
    //Method
    this.themSV = function (sv){
        this.mangSV.push(sv)
    }
    // Nhập vào mã sinh viên
    // return vị trí (index) tìm được
    this.timViTri = function (ma){
        //map (): giúp duyệt mảng với cú pháp ngắn gọn (ES6)
        // return trong map thì sẽ trả về 1 mảng mới =>  nếu cần trả về 1 giá trị đơn lẻ thì để return ngoài map
        // sv đại diện cho 1 phần tử trong mảng
        //mangSV[i] = sv
        var viTri = -1;
        this.mangSV.map(function(sv,index){
            //kiếm tra sv có mã trùng với mã đang cần tìm
            //nếu tìm thấy thì gán giá trị index mới vào biện vị trí
            if (sv.maSV == ma){
                viTri = index;
            }
        })
        return viTri;
    }
    //B1: Tìm vị trí sv cần xóa ở trong mangSV
    //B2: Xóa sv ra khỏi mảng dựa vào vị trí
    this.xoaSV = function (ma){
        var viTri = this.timViTri(ma);
        if ( viTri > -1 ){
            //tìm thấy vị trí
            // xóa sv ra khỏi mảng
            //splice(vị trí bắt đầu của phần tử cần xóa, số lượng phần tử cần xóa);
            this.mangSV.splice(viTri,1);

        }
    }

    this.layChiTiet = function (ma){
        var viTri = this.timViTri(ma);
        if (viTri > -1){
            //tìm thấy
            //return đối tượng sv tìm được
            return this.mangSV[viTri];
        }else{
            console.log("không tìm thấy")
        }
    }

    this.capNhatSV = function(sv){
        // tìm vị trí(index) sv cần cập nhật
        var viTri = this.timViTri(sv.maSV);
        if (viTri > -1){
            //tìm thấy
            //Gán giá trị 
            this.mangSV[viTri] = sv;
        }else{
            console.log("không tìm thấy")
        }
    }
}

//prototype=> thêm phương thức thuộc tính mới cho 1 lớp đối tượng đã được xây dựng từ trước mà ko cần sửa trực tiếp : Tránh rủi ro khi code mới sai ảnh hưởng tới code cũ
//prototype (ES5)

DanhSachSinhVien.prototype.searchName = function (tuKhoa){
    var mangTK = [];
    // từ khóa be => phải tìm đc sinh viên có chưa từ be (bé Ben Bé BÉ)
    // chuyển từ khóa về kiểu chữ thường và xóa khoảng trắng
    var tuTK = tuKhoa.trim().toLowerCase()
    this.mangSV.map(function(sv){
        //chuyển tên sv về kiểu chữ thường
        var ten = sv.tenSV.toLowerCase();

        // kiểm tra tên sv có chứa từ khóa hay không
        if (ten.indexOf(tuTK) > -1){
            console.log("Tìm thấy tên sv");
            //nếu tìm thấy thì lưu sv vào trong mangTK
            mangTK.push(sv);
        }
    });
    return mangTK;
}
