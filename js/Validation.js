
function Validation() {
    //method
    //kiểm tra rỗng
    this.checkEmpty = function (value, message, spanID) {
        // "   text  " => trim() => "text"
        if (value.trim() != "") {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        //Không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
    //kiểm tra mã trùng
    this.checkID = function (value, message, spanID, mangSV) {
        // giả sữ mã chưa tồn tại trong mảng
        var isExist = false;
        // some(): hàm giúp duyệt mảng và đồng thời kiểm tra theo điều kiện. nếu tìm phần tử thõa điều kiện thì return về true, ngược lại là false 
        isExist = mangSV.some(function (sv) {
            return value == sv.maSV;
        });
        //có tồn tại mã trùng
        if (isExist) {
            //không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            document.getElementById(spanID).style.display = "block";
            return false
        } else {
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
    }
    this.checkName = function (value, message, spanID) {
        //kiểu string
        var pattern = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$";

        //chuyển kiểu từ string sang RegExp
        var reg = new RegExp(pattern);

        if (reg.test(value)) {
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            document.getElementById(spanID).style.display = "none";
            return true;
        }
        //không hợp lệ
        document.getElementById(spanID).innerHTML = message;
        document.getElementById(spanID).style.display = "block";
        return false;
    }
}