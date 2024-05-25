function donGiaXe(loaiXe) {
  switch (loaiXe) {
    case 'uberCar':
      return uberCar = {
        giaTienKMDauTien: 8000,
        giaTienTu1Den19: 7500,
        giaTienTu19TroLen: 7000,
        donGiaCho: 2000
      }
    case 'uberSUV':
      return uberSUV = {
        giaTienKMDauTien: 9000,
        giaTienTu1Den19: 8500,
        giaTienTu19TroLen: 8000,
        donGiaCho: 3000
      }
    case 'uberBlack':
      return uberBlack = {
        giaTienKMDauTien: 10000,
        giaTienTu1Den19: 9500,
        giaTienTu19TroLen: 9000,
        donGiaCho: 3500
      }
  }
}

function tienCuocXe(loaiXe, soKM, thoiGianCho) {
  let donGia = donGiaXe(loaiXe)
  tongTien = 0;
  if (soKM >= 1 && soKM <= 19) {
    if (thoiGianCho > 3) {
      tongTien = donGia.giaTienKMDauTien + donGia.giaTienTu1Den19 * (soKM - 1) + Math.floor((thoiGianCho - 1) / 3) * donGia.donGiaCho
    } else {
      tongTien = donGia.giaTienKMDauTien + donGia.giaTienTu1Den19 * (soKM - 1)
    }
  } else {
    if (thoiGianCho > 3) {
      tongTien = donGia.giaTienKMDauTien + donGia.giaTienTu1Den19 * 18 + donGia.giaTienTu19TroLen * (soKM - 19) + Math.floor((thoiGianCho - 1) / 3) * donGia.donGiaCho
    } else {
      tongTien = donGia.giaTienKMDauTien + donGia.giaTienTu1Den19 * 18 + donGia.giaTienTu19TroLen * (soKM - 19)
    }
  }
  return tongTien;
}

//enforce that only a float can be inputed
function enforceFloat() {
  var valid = /^\d+\d*$|^[\d]*$/;
  var number = /\d+\d*|[\d]*|[\d]+[\d]*|[\d]+/;
  if (!valid.test(this.value)) {
    var n = this.value.match(number);
    this.value = n ? n[0] : '';
  }
}
let listInput = document.querySelectorAll(".contact100-form input")
listInput.forEach((input) => {
  input.onkeyup = input.onchange = enforceFloat;
})

document.querySelector(".contact100-form-btn").onclick = function () {
  if (!document.querySelector("input[type='radio']:checked") || document.getElementById("txt-km").value == "") {
    alert("Vui lòng điền đầy đủ thông tin !")
    return false
  }
  let loaiXe = document.querySelector("input[type='radio']:checked").value;
  let soKM = Number(document.getElementById("txt-km").value);
  let thoiGianCho = Number(document.getElementById("txt-thoiGianCho").value);
  let tienCuoc = tienCuocXe(loaiXe, soKM, thoiGianCho)
  document.getElementById("divThanhTien").style.display = "block"
  document.getElementById("xuatTien").innerHTML = tienCuoc.toLocaleString(
    'it-IT', { style: 'currency', currency: 'VND' }
  )
}

document.querySelector("[data-toggle='modal']").onclick = function () {
  if (!document.querySelector("input[type='radio']:checked") || document.getElementById("txt-km").value == "") {
    alert("Vui lòng điền đầy đủ thông tin !")
    return false
  }
  let loaiXe = document.querySelector("input[type='radio']:checked").value;
  let soKM = Number(document.getElementById("txt-km").value);
  let thoiGianCho = Number(document.getElementById("txt-thoiGianCho").value);
  let tienCuoc = tienCuocXe(loaiXe, soKM, thoiGianCho).toLocaleString(
    'it-IT', { style: 'currency', currency: 'VND' }
  )
  $('#exampleModal').modal('show');
  let donGia = donGiaXe(loaiXe)
  document.querySelector(".modal-body").innerHTML = `
  <div class="table-responsive">
      <table class="table mb-0">
        <thead>
          <tr>
            <th colspan="2">Loại xe</th>
            <th>${loaiXe}</th>
            <th>Số km: ${soKM}km</th>
          </tr>
        </thead>
        <tbody>
          <tr class="">
            <td>CHI TIẾT</td>
            <td>SỬ DỤNG</td>
            <td>ĐƠN GIÁ <span class="small">(1000đ)</span></td>
            <td>THÀNH TIỀN <span class="small">(1000đ)</span></td>
          </tr>
          <tr class="">
            <td>KM đầu tiên</td>
            <td>1km</td>
            <td>${donGia.giaTienKMDauTien}</td>
            <td>${donGia.giaTienKMDauTien}</td>
          </tr>
          ${soKM > 1 ?
      `
            <tr class="">
              <td>Từ 1km đến ${soKM > 19 ? 19 : soKM}km</td>
              <td>${soKM > 19 ? 18 : soKM - 1}km</td>
              <td>${donGia.giaTienTu1Den19}</td>
              <td>${donGia.giaTienTu1Den19 * (soKM > 19 ? 18 : soKM - 1)}</td>
            </tr>
            `
      : ""
    }
          ${soKM > 19 ?
      `
            <tr class="">
            <td>Từ 19km trở lên</td>
            <td>${soKM > 19 ? soKM - 19 : ""}km</td>
            <td>${donGia.giaTienTu19TroLen}</td>
            <td>${donGia.giaTienTu19TroLen * (soKM > 19 ? soKM - 19 : "")}</td>
            </tr>
            `
      : ""
    }
          <tr class="">
            <td>Thời gian chờ<br><span class="small">3 phút đầu free</span></td>
            <td>${thoiGianCho > 3 ? `Chờ ${thoiGianCho} phút, tính tiền ${thoiGianCho - 3} phút` : thoiGianCho == 0 ? 0 : `chờ ${thoiGianCho} phút`}</td>
            <td>${thoiGianCho > 3 ? donGia.donGiaCho : 0}</td>
            <td>${thoiGianCho > 3 ? donGia.donGiaCho * (Math.floor((thoiGianCho - 1) / 3)) : 0}</td>
          </tr>
          <tr>
            <td colspan="4" class="text-right">TỔNG TIỀN: <span class="text-danger">${tienCuoc}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
}