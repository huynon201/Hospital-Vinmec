const sidebar = document.querySelector(".sidebar");
const sidebarOpenBtn = document.querySelector("#sidebar-open");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");
const columContent = document.querySelector(".colum-content");

// Function to handle window resize
const handleResize = () => {
  if (window.innerWidth < 800) {
    sidebar.classList.add("close");
    sidebar.classList.remove("locked");
    sidebar.classList.remove("hoverable");
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  } else {
    sidebar.classList.remove("close");
    sidebar.classList.add("locked");
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
    if (!sidebar.classList.contains("locked")) {
      sidebar.classList.add("hoverable");
      sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    } else {
      sidebar.classList.remove("hoverable");
      sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    }
  }
};
window.addEventListener("resize", handleResize);
handleResize();
// Function to toggle the lock state of the sidebar
const toggleLock = () => {
  sidebar.classList.toggle("locked");
  if (!sidebar.classList.contains("locked")) {
    sidebar.classList.add("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  } else {
    sidebar.classList.remove("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
  }
};

// Function to hide the sidebar when the mouse leaves
const hideSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  }
};

// Function to show the sidebar when the mouse enters
const showSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
  }
};

// Function to toggle the sidebar
const toggleSidebar = () => {
  sidebar.classList.toggle("close");
  if (sidebar.classList.contains("close")) {
    columContent.classList.remove("locked", "full");
    columContent.classList.add("closed");
  } else {
    columContent.classList.remove("closed", "full");
    columContent.classList.add("locked");
  }
};

// Adding event listeners to buttons and sidebar for the corresponding actions
sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);

// Initial call to handle resize
handleResize();

let data = JSON.parse(localStorage.getItem("vatTuData")) || [];
let currentEditIndex = null;

function saveData() {
  localStorage.setItem("vatTuData", JSON.stringify(data));
}

const input = document.getElementById("danh-muc");
const browsers = document.getElementById("browsers");

input.onfocus = function () {
  browsers.style.display = "block";
  input.style.borderRadius = "5px 5px 0 0";
};

input.onblur = function () {
  setTimeout(() => {
    browsers.style.display = "none";
    input.style.borderRadius = "5px";
  }, 100);
};

input.oninput = function () {
  currentFocus = -1;
  var text = input.value.toUpperCase();
  for (let option of browsers.options) {
    if (option.value.toUpperCase().indexOf(text) > -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  }
};

input.onchange = function () {
  let val = input.value;
  let opts = browsers.options;
  for (let i = 0; i < opts.length; i++) {
    if (opts[i].value === val) {
      input.value = opts[i].value;
      break;
    }
  }
};

var currentFocus = -1;
input.onkeydown = function (e) {
  if (e.keyCode == 40) {
    currentFocus++;
    addActive(browsers.options);
  } else if (e.keyCode == 38) {
    currentFocus--;
    addActive(browsers.options);
  } else if (e.keyCode == 13) {
    e.preventDefault();
    if (currentFocus > -1) {
      if (browsers.options) browsers.options[currentFocus].click();
    }
  }
};

function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = x.length - 1;
  x[currentFocus].classList.add("active");
}

function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
  }
}

function updateDanhMucDropdown() {
  const danhMucDropdown = document.getElementById("browsers");
  const dataDanhMuc = JSON.parse(localStorage.getItem("danhMucData")) || [];

  danhMucDropdown.innerHTML = "";

  dataDanhMuc.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.tenDanhMuc;
    option.textContent = item.tenDanhMuc;
    danhMucDropdown.appendChild(option);

    option.onclick = function () {
      input.value = item.tenDanhMuc;
      browsers.style.display = "none";
      input.style.borderRadius = "5px";
    };
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateDanhMucDropdown(); // Gọi hàm này khi trang được tải để cập nhật datalist
});

// Initialize default data if localStorage is empty
if (data.length === 0) {
  data = [
    {
      id: Date.now(),
      tenVatTu: "Kim tiêm",
      moTa: "Kim tiêm dành cho y tá hoặc bác sĩ",
      soLuong: "1",
      thuongHieu: "Vinahankook",
      mauSac: "Trắng",
      kichThuoc: "15 cm",
      tenDanhMuc: "Thiết bị y tế",
      anhVatTu: "../Assets/content/supplies/kim-tiem.png",
    },
    {
      id: Date.now() + 1,
      tenVatTu: "Khẩu trang",
      moTa: "Khẩu trang y tế chống bụi bẩn dùng 1 lần",
      soLuong: "1",
      thuongHieu: "Unicharm",
      mauSac: "Xanh",
      kichThuoc: "11 cm",
      tenDanhMuc: "Vật dụng y tế",
      anhVatTu: "../Assets/content/supplies/khau-trang.png",
    },
    {
      id: Date.now() + 2,
      tenVatTu: "Áo Bluose",
      moTa: "Áo dành cho các bác sĩ",
      soLuong: "1",
      thuongHieu: "Vinkook",
      mauSac: "Trắng",
      kichThuoc: "1m4",
      tenDanhMuc: "Vật dụng y tế",
      anhVatTu: "../Assets/content/supplies/ao-blue.png",
    },
    {
      id: Date.now() + 3,
      tenVatTu: "Áo Phẫu Thuật",
      moTa: "Áo dành cho bác sĩ phẫu thuật",
      soLuong: "1",
      thuongHieu: "Biotech",
      mauSac: "Xanh",
      kichThuoc: "1m10",
      tenDanhMuc: "Vật dụng y tế",
      anhVatTu: "../Assets/content/supplies/ao-phau-thuat.png",
    },
    {
      id: Date.now() + 4,
      tenVatTu: "Máy Hiển Vi",
      moTa: "Máy công nghệ cao dùng để soi vật nhỏ",
      soLuong: "1",
      thuongHieu: "borgh",
      mauSac: "Trắng",
      kichThuoc: "40cm",
      tenDanhMuc: "Thiết bị y tế",
      anhVatTu: "../Assets/content/supplies/may-hien-vi.png",
    },
    {
      id: Date.now() + 5,
      tenVatTu: "Thuốc Giảm Đau",
      moTa: "Thuốc điều trị giảm đau",
      soLuong: "1",
      thuongHieu: "Panadol",
      mauSac: "Đỏ",
      kichThuoc: "12mg",
      tenDanhMuc: "Thiết bị y tế",
      anhVatTu: "../Assets/content/supplies/thuoc-giam-dau.png",
    },
    {
      id: Date.now() + 6,
      tenVatTu: "Băng Cá Nhân",
      moTa: "Băng dán vết thương",
      soLuong: "1",
      thuongHieu: "kemsre",
      mauSac: "Nâu",
      kichThuoc: "4cm",
      tenDanhMuc: "Vật dụng y tế",
      anhVatTu: "../Assets/content/supplies/bang-ca-nhan.png",
    },
    {
      id: Date.now() + 6,
      tenVatTu: "Găng tay phẫu thuật",
      moTa: "Găng tay đã được tuyệt trùng",
      soLuong: "1",
      thuongHieu: "emswre",
      mauSac: "xanh",
      kichThuoc: "15cm",
      tenDanhMuc: "Vật dụng y tế",
      anhVatTu: "../Assets/content/supplies/gang-tay.png",
    },
  ];
  saveData();
}

function render() {
  const tbody = document.querySelector("#render tbody");
  tbody.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.id}</td>
      <td>${item.tenVatTu}</td>
      <td>${item.moTa}</td>
      <td>${item.soLuong}</td>
      <td>${item.mauSac}</td>
      <td>${item.kichThuoc}</td>
      <td>${item.thuongHieu}</td>
      <td>${item.tenDanhMuc}</td>
      <td><img style="height: 50px; width: 50px;" src="${item.anhVatTu}"></td>
      <td>
        <button onclick="editItem(${index})" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal-tao">Sửa</button>
        <button class="xoa btn btn-danger" data-index="${index}">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });
  attachDeleteListeners();
}
function attachDeleteListeners() {
  document.querySelectorAll(".xoa").forEach(button => {
      button.addEventListener("click", function () {
          // Check if there's an existing popover and remove it
          const existingPopover = document.querySelector(".popover");
          if (existingPopover) {
              existingPopover.remove();
          }

          const index = this.getAttribute("data-index");
          const popoverContent = document.getElementById("confirmDelete").cloneNode(true);
          popoverContent.classList.remove("d-none");
          document.body.appendChild(popoverContent);

          const popover = new bootstrap.Popover(this, {
              content: popoverContent,
              html: true,
              placement: "top",
              trigger: "focus",
          });
          popover.show();

          // Remove previous event listeners to prevent multiple triggers
          popoverContent.querySelector(".xoa-real").removeEventListener("click", handleDelete);
          popoverContent.querySelector(".cancel").removeEventListener("click", handleCancel);

          // Handle the deletion
          function handleDelete() {
              deleteItem(index);
              popoverContent.remove();
              render();
          }

          // Handle cancellation
          function handleCancel() {
              popoverContent.remove();
          }

          popoverContent.querySelector(".xoa-real").addEventListener("click", handleDelete);
          popoverContent.querySelector(".cancel").addEventListener("click", handleCancel);
          
      });
  });
}


function addOrEdit() {
  const tenVatTuInput = document.getElementById("ten-vat-tu");
  const moTaInput = document.getElementById("mo-ta");
  const thuongHieuInput = document.getElementById("thuong-hieu");
  const kichThuocInput = document.getElementById("kich-thuoc");
  const tenDanhMucInput = document.getElementById("danh-muc");
  const mauSacInput = document.getElementById("mau");
  const anhVatTuInput = document.getElementById("anh-vat-tu");
  const soLuongInput = document.getElementById("so-luong");

  const newItem = {
    id: currentEditIndex !== null ? data[currentEditIndex].id : Date.now(),
    tenVatTu: tenVatTuInput.value,
    moTa: moTaInput.value,
    thuongHieu: thuongHieuInput.value,
    kichThuoc: kichThuocInput.value,
    tenDanhMuc: tenDanhMucInput.value,
    mauSac: mauSacInput.value,
    soLuong: soLuongInput.value,
  };

  if (anhVatTuInput.files.length > 0) {
    const file = anhVatTuInput.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      newItem.anhVatTu = e.target.result;
      if (currentEditIndex !== null) {
        data[currentEditIndex] = newItem;
        currentEditIndex = null;
      } else {
        data.push(newItem);
      }
      saveData();
      render();
    };

    reader.readAsDataURL(file);
  } else {
    newItem.anhVatTu =
      currentEditIndex !== null ? data[currentEditIndex].anhVatTu : ""; // Giữ nguyên ảnh nếu không chọn ảnh mới
    if (currentEditIndex !== null) {
      data[currentEditIndex] = newItem;
      currentEditIndex = null;
    } else {
      data.push(newItem);
    }
    saveData();
    render();
  }

  tenVatTuInput.value = "";
  moTaInput.value = "";
  thuongHieuInput.value = "";
  kichThuocInput.value = "";
  tenDanhMucInput.value = "";
  mauSacInput.value = "";
  anhVatTuInput.value = "";
  soLuongInput.value = "";

  // Chuyển nút "Lưu" trở lại thành "Tạo"
  const addBtn = document.querySelector(".modal-footer .btn-info");
  addBtn.textContent = "Tạo";
  addBtn.onclick = addOrEdit;


  const alertDiv = document.createElement("div");
  alertDiv.classList.add(
    "alert",
    "alert-success",
    "alert-dismissible",
    "fade",
    "show",
    "alert-container"
  );
  alertDiv.setAttribute("role", "alert");
  alertDiv.innerHTML = `
    Tạo vật tư mới thành công! 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
`;

  // Thêm thông báo vào container ở đầu trang
  const alertContainer = document.getElementById("alert-container");
  alertContainer.appendChild(alertDiv);

  // Thêm sự kiện click cho nút đóng thông báo
  const closeButton = alertDiv.querySelector(".btn-close");
  closeButton.addEventListener("click", function () {
    alertDiv.remove();
  });

  // Tự động tắt thông báo sau 3 giây
  setTimeout(function () {
    alertDiv.remove();
  }, 3000); // Thời gian chờ 3 giây để người dùng có thể nhìn thấy thông báo

  // Kiểm tra xem phần tử alertDiv có được thêm vào DOM hay không
  console.log("Alert div added:", alertContainer.contains(alertDiv));
}

function editItem(index) {
  const item = data[index];
  if (item) {
    currentEditIndex = index;

    const tenVatTuInput = document.getElementById("ten-vat-tu");
    const moTaInput = document.getElementById("mo-ta");
    const thuongHieuInput = document.getElementById("thuong-hieu");
    const kichThuocInput = document.getElementById("kich-thuoc");
    const tenDanhMucInput = document.getElementById("danh-muc");
    const mauSacInput = document.getElementById("mau");
    const anhVatTuInput = document.getElementById("anh-vat-tu");
    const soLuongInput = document.getElementById("so-luong");

    tenVatTuInput.value = item.tenVatTu;
    moTaInput.value = item.moTa;
    thuongHieuInput.value = item.thuongHieu;
    kichThuocInput.value = item.kichThuoc;
    tenDanhMucInput.value = item.tenDanhMuc;
    mauSacInput.value = item.mauSac;
    soLuongInput.value = item.soLuong;

    // Chuyển nút "Tạo" thành "Lưu"
    const addBtn = document.querySelector(".modal-footer .btn-info");
    addBtn.textContent = "Lưu";
    addBtn.onclick = addOrEdit;

    $("#modal-tao").modal("show");
  }
}

function deleteItem(index) {
  if (index !== -1) {
    data.splice(index, 1);
    saveData();
    render();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  render();
  const addBtn = document.querySelector(".modal-footer .btn-info");
  addBtn.onclick = addOrEdit;
});

document.addEventListener("DOMContentLoaded", function () {
  // Initial call to populate the datalist for existing inputs
  updateVatTuDropdowns();
});

function updateVatTuDropdowns() {
  const dataVatTu = JSON.parse(localStorage.getItem("vatTuData")) || [];

  // Find all input elements with id "vat-tu-input"
  const vatTuInputs = document.querySelectorAll("#vat-tu-input");

  vatTuInputs.forEach((vatTuInput) => {
    const vatTuDropdown = vatTuInput.nextElementSibling;

    vatTuDropdown.innerHTML = "";

    dataVatTu.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.tenVatTu;
      option.textContent = item.tenVatTu;

      option.onclick = function () {
        vatTuInput.value = item.tenVatTu;
        vatTuDropdown.style.display = "none";
        vatTuInput.style.borderRadius = "5px";
      };

      vatTuDropdown.appendChild(option);
    });

    // Event listeners for each input element
    vatTuInput.addEventListener("focus", function () {
      vatTuDropdown.style.display = "block";
      vatTuInput.style.borderRadius = "5px 5px 0 0";
    });

    vatTuInput.addEventListener("blur", function () {
      setTimeout(() => {
        vatTuDropdown.style.display = "none";
        vatTuInput.style.borderRadius = "5px";
      }, 100);
    });

    vatTuInput.addEventListener("input", function () {
      const text = vatTuInput.value.toUpperCase();
      for (let option of vatTuDropdown.options) {
        if (option.value.toUpperCase().indexOf(text) > -1) {
          option.style.display = "block";
        } else {
          option.style.display = "none";
        }
      }
    });

    let currentFocus = -1;
    vatTuInput.addEventListener("keydown", function (e) {
      if (e.keyCode === 40) {
        currentFocus++;
        addActive(vatTuDropdown.options);
      } else if (e.keyCode === 38) {
        currentFocus--;
        addActive(vatTuDropdown.options);
      } else if (e.keyCode === 13) {
        e.preventDefault();
        if (currentFocus > -1) {
          if (vatTuDropdown.options)
            vatTuDropdown.options[currentFocus].click();
        }
      }

      function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        x[currentFocus].classList.add("active");
      }

      function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
          x[i].classList.remove("active");
        }
      }
    });
  });
}

function render_nhap() {
  const tablebody = document.querySelector("#render-nhap tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>
      <fieldset>
        <input type="search"
          autocomplete="off"
          role="combobox"
          list=""
          id="vat-tu-input"
          name="vatTuInput" required>
        <datalist id="vat-tu-dropdown" role="listbox">
        </datalist>
      </fieldset>
    </td>
    <td>
      <input id="so-luong-input" type="number" value="1" min="1">
    </td>
    <td>
      <button class="delete-btn btn btn-danger btn-sm">Xóa</button>
    </td>
  `;

  tablebody.appendChild(row);

  row.querySelector(".delete-btn").addEventListener("click", () => {
    tablebody.removeChild(row);
  });

  // Update dropdowns for all inputs, including the new one
  updateVatTuDropdowns();
}

function render_xuat() {
  const tablebody = document.querySelector("#render-xuat tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>
      <fieldset>
        <input type="search"
          autocomplete="off"
          role="combobox"
          list=""
          id="vat-tu-input"
          name="vatTuInput" required>
        <datalist id="vat-tu-dropdown" role="listbox">
        </datalist>
      </fieldset>
    </td>
    <td>
      <input id="so-luong-output" type="number" value="1" min="1">
    </td>
    <td>
      <button class="delete-btn btn btn-danger btn-sm">Xóa</button>
    </td>
  `;

  tablebody.appendChild(row);

  row.querySelector(".delete-btn").addEventListener("click", () => {
    tablebody.removeChild(row);
  });

  // Update dropdowns for all inputs, including the new one
  updateVatTuDropdowns();
}
document.addEventListener("DOMContentLoaded", function () {
  // Existing code...
  // Function to clear the table with id "render-nhap"
  function clearTable() {
    const tableBody = document.querySelector("#render-nhap tbody");
    tableBody.innerHTML = ""; // Clear the table body content
  }

  // Attach the function to the "Nhập" button click event
  document
    .querySelector(".nhap-phieu-kho")
    .addEventListener("click", clearTable);
  // Other existing JavaScript code...
});

document.addEventListener("DOMContentLoaded", function () {
  // Existing code...
  // Function to clear the table with id "render-nhap"
  function clearTable() {
    const tableBody = document.querySelector("#render-xuat tbody");
    tableBody.innerHTML = ""; // Clear the table body content
  }

  // Attach the function to the "Nhập" button click event
  document
    .querySelector(".xuat-phieu-kho")
    .addEventListener("click", clearTable);
  // Other existing JavaScript code...
});

function capNhatSoLuongVatTu() {
  var tenVatTu = document.getElementById("vat-tu-input").value;
  var soLuongIn = parseInt(document.getElementById("so-luong-input").value);

  var vatTuData = localStorage.getItem("vatTuData");
  var vatTuArray = vatTuData ? JSON.parse(vatTuData) : [];

  // Tìm vật tư trong mảng
  var vatTu = vatTuArray.find(function (item) {
    return item.tenVatTu === tenVatTu;
  });

  if (vatTu) {
    vatTu.soLuong = parseInt(vatTu.soLuong) + soLuongIn; // Ensure soLuong is parsed as integer

    // Lưu lại dữ liệu vào localStorage
    localStorage.setItem("vatTuData", JSON.stringify(vatTuArray));

    // Cập nhật hiển thị
    updateData();
  } else {
    alert("Vật tư không tồn tại.");
  }
}

// Gán sự kiện click cho nút "Cập nhật"
document
  .querySelector(".nhap-phieu-kho")
  .addEventListener("click", capNhatSoLuongVatTu);

document.addEventListener("DOMContentLoaded", (event) => {
  updateData();
});

function capNhatSoLuongVatTuOut() {
  var tenVatTu = document.getElementById("vat-tu-input").value;

  var soLuongOut = parseInt(document.getElementById("so-luong-output").value);

  var vatTuData = localStorage.getItem("vatTuData");
  var vatTuArray = vatTuData ? JSON.parse(vatTuData) : [];

  // Tìm vật tư trong mảng
  var vatTu = vatTuArray.find(function (item) {
    return item.tenVatTu === tenVatTu;
  });

  if (vatTu) {
    vatTu.soLuong = parseInt(vatTu.soLuong) - soLuongOut; // Ensure soLuong is parsed as integer

    // Lưu lại dữ liệu vào localStorage
    localStorage.setItem("vatTuData", JSON.stringify(vatTuArray));

    // Cập nhật hiển thị
    updateData();
  } else {
    alert("Vật tư không tồn tại.");
  }
}
document
  .querySelector(".xuat-phieu-kho")
  .addEventListener("click", capNhatSoLuongVatTuOut);

// Cập nhật dữ liệu ngay khi trang được tải
document.addEventListener("DOMContentLoaded", (event) => {
  updateData();
});

function getCurrentDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function saveInputData() {
  // Lấy dữ liệu exData hiện tại từ localStorage, nếu có
  let exData = JSON.parse(localStorage.getItem("exData")) || [];

  // Chọn tất cả các input có id="vat-tu-input" và "soLuongVatTuNhap"
  const vatTuInputElements = document.querySelectorAll("#vat-tu-input");
  const soLuongInputElements = document.querySelectorAll("#so-luong-input");
  const tenPhieuNhapKho = document.querySelector("#name-phieu-nhap-kho"); // Sử dụng querySelector để lấy một phần tử duy nhất
  const ngayNhap = getCurrentDate();

  // Kiểm tra xem có phần tử #name-phieu-nhap-kho không
  if (tenPhieuNhapKho) {
    // Duyệt qua tất cả các input và lưu dữ liệu vào exData
    vatTuInputElements.forEach((vatTuInput, index) => {
      const vatTuValue = vatTuInput.value;
      const soLuongValue = soLuongInputElements[index].value;
      const ngayNhapValue = ngayNhap;
      const tenPhieuNhapKhoValue = tenPhieuNhapKho.value; // Lấy giá trị từ phần tử duy nhất
      const idValue = Date.now();
      exData.push({
        id: idValue,
        vatTu: vatTuValue,
        soLuong: soLuongValue,
        ngayNhap: ngayNhapValue,
        tenPhieuNhap: tenPhieuNhapKhoValue,
      });
    });
  } else {
    console.error("Không tìm thấy phần tử có id là 'name-phieu-nhap-kho'");
  }

  // Lưu dữ liệu vào localStorage
  localStorage.setItem("exData", JSON.stringify(exData));

  // Hiển thị thông báo nhập hàng thành công
  const alertDiv = document.createElement("div");
  alertDiv.classList.add(
    "alert",
    "alert-success",
    "alert-dismissible",
    "fade",
    "show",
    "alert-container"
  );
  alertDiv.setAttribute("role", "alert");
  alertDiv.innerHTML = `
    Nhập hàng thành công! 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
`;

  // Thêm thông báo vào container ở đầu trang
  const alertContainer = document.getElementById("alert-container");
  alertContainer.appendChild(alertDiv);

  // Thêm sự kiện click cho nút đóng thông báo
  const closeButton = alertDiv.querySelector(".btn-close");
  closeButton.addEventListener("click", function () {
    alertDiv.remove();
  });

  // Tự động tắt thông báo sau 3 giây
  setTimeout(function () {
    alertDiv.remove();
  }, 3000); // Thời gian chờ 3 giây để người dùng có thể nhìn thấy thông báo

  // Kiểm tra xem phần tử alertDiv có được thêm vào DOM hay không
  console.log("Alert div added:", alertContainer.contains(alertDiv));
}

// Sử dụng ví dụ: Gọi hàm này khi nhấn nút với id="importButton"
document
  .getElementById("exportButton")
  .addEventListener("click", saveInputData);

// Sử dụng ví dụ: Gọi hàm này khi nhấn nút với id="importButton"
// document
//   .getElementById("importButton")
//   .addEventListener("click", saveInputData);



function saveOutputData() {
  // Lấy dữ liệu imData hiện tại từ localStorage, nếu có
  let imData = JSON.parse(localStorage.getItem("imData")) || [];

  // Chọn tất cả các input có id="vat-tu-input" và "soLuongVatTuNhap"
  const vatTuInputElements = document.querySelectorAll("#vat-tu-input");
  const soLuongInputElements = document.querySelectorAll("#so-luong-output");
  const tenPhieuXuatKho = document.querySelector("#name-phieu-xuat-kho"); // Sử dụng querySelector để lấy một phần tử duy nhất
  const tenPhongBanNhan = document.querySelector("#phong-ban-nhan"); // Sử dụng querySelector để lấy một phần tử duy nhất
  const tenNhanVienNhan = document.querySelector("#nhan-vien-nhan"); // Sử dụng querySelector để lấy một phần tử duy nhất
  const ngayNhap = getCurrentDate();

  // Kiểm tra xem có phần tử #name-phieu-nhap-kho không
  if (tenPhieuXuatKho) {
    // Duyệt qua tất cả các input và lưu dữ liệu vào exData
    vatTuInputElements.forEach((vatTuInput, index) => {
      const vatTuValue = vatTuInput.value;
      const soLuongValue = soLuongInputElements[index].value;
      const ngayNhapValue = ngayNhap;
      const tenPhieuXuatKhoValue = tenPhieuXuatKho.value; // Lấy giá trị từ phần tử duy nhất
      const tenPhongBanNhanValue = tenPhongBanNhan.value;
      const tenNhanVienNhanValue = tenNhanVienNhan.value
      const idValue = Date.now();
      imData.push({
        id: idValue,
        vatTu: vatTuValue,
        soLuong: soLuongValue,
        ngayNhap: ngayNhapValue,
        tenPhieuXuat: tenPhieuXuatKhoValue,
        tenPhongBan: tenPhongBanNhanValue,
        tenNhanVien: tenNhanVienNhanValue
      });
    });
  } else {
    console.error("Không tìm thấy phần tử có id là 'name-phieu-nhap-kho'");
  }

  // Lưu dữ liệu vào localStorage
  localStorage.setItem("imData", JSON.stringify(imData));

  // Hiển thị thông báo nhập hàng thành công
  const alertDiv = document.createElement("div");
  alertDiv.classList.add(
    "alert",
    "alert-success",
    "alert-dismissible",
    "fade",
    "show",
    "alert-container"
  );
  alertDiv.setAttribute("role", "alert");
  alertDiv.innerHTML = `
    Xuất hàng thành công! 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
`;

  // Thêm thông báo vào container ở đầu trang
  const alertContainer = document.getElementById("alert-container");
  alertContainer.appendChild(alertDiv);

  // Thêm sự kiện click cho nút đóng thông báo
  const closeButton = alertDiv.querySelector(".btn-close");
  closeButton.addEventListener("click", function () {
    alertDiv.remove();
  });

  // Tự động tắt thông báo sau 3 giây
  setTimeout(function () {
    alertDiv.remove();
  }, 3000); // Thời gian chờ 3 giây để người dùng có thể nhìn thấy thông báo

  // Kiểm tra xem phần tử alertDiv có được thêm vào DOM hay không
  console.log("Alert div added:", alertContainer.contains(alertDiv));
}

// Sử dụng ví dụ: Gọi hàm này khi nhấn nút với id="importButton"


// Sử dụng ví dụ: Gọi hàm này khi nhấn nút với id="importButton"
document
  .getElementById("importButton")
  .addEventListener("click", saveOutputData);





const inputPhongBan = document.getElementById("phong-ban-nhan");
const brPhongBanNhan = document.getElementById("br-phong-ban-nhan");

inputPhongBan.onfocus = function () {
  brPhongBanNhan.style.display = "block";
  inputPhongBan.style.borderRadius = "5px 5px 0 0";
};

inputPhongBan.onblur = function () {
  setTimeout(() => {
    brPhongBanNhan.style.display = "none";
    inputPhongBan.style.borderRadius = "5px";
  }, 100);
};

inputPhongBan.oninput = function () {
  currentFocus = -1;
  var text = inputPhongBan.value.toUpperCase();
  for (let option of brPhongBanNhan.options) {
    if (option.value.toUpperCase().indexOf(text) > -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  }
};

inputPhongBan.onchange = function () {
  let val = inputPhongBan.value;
  let opts = brPhongBanNhan.options;
  for (let i = 0; i < opts.length; i++) {
    if (opts[i].value === val) {
      inputPhongBan.value = opts[i].value;
      break;
    }
  }
};

var currentFocus = -1;
inputPhongBan.onkeydown = function (e) {
  if (e.keyCode == 40) {
    currentFocus++;
    addActive(brPhongBanNhan.options);
  } else if (e.keyCode == 38) {
    currentFocus--;
    addActive(brPhongBanNhan.options);
  } else if (e.keyCode == 13) {
    e.preventDefault();
    if (currentFocus > -1) {
      if (brPhongBanNhan.options) brPhongBanNhan.options[currentFocus].click();
    }
  }
};

function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = x.length - 1;
  x[currentFocus].classList.add("active");
}

function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
  }
}

function updatePhongBanDropdown() {
  const phongBanDropdown = document.getElementById("br-phong-ban-nhan");
  const dataDanhMuc = JSON.parse(localStorage.getItem("phongBanData")) || [];

  phongBanDropdown.innerHTML = "";

  dataDanhMuc.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.tenPhongBan;
    option.textContent = item.tenPhongBan;
    phongBanDropdown.appendChild(option);

    option.onclick = function () {
      inputPhongBan.value = item.tenPhongBan;
      brPhongBanNhan.style.display = "none";
      inputPhongBan.style.borderRadius = "5px";
    };
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updatePhongBanDropdown(); // Gọi hàm này khi trang được tải để cập nhật datalist
});

const inputNhanVien = document.getElementById("nhan-vien-nhan");
const brNhanVien = document.getElementById("br-nhan-vien-nhan");

inputNhanVien.onfocus = function () {
  brNhanVien.style.display = "block";
  inputNhanVien.style.borderRadius = "5px 5px 0 0";
};

inputNhanVien.onblur = function () {
  setTimeout(() => {
    brNhanVien.style.display = "none";
    inputNhanVien.style.borderRadius = "5px";
  }, 100);
};

inputNhanVien.oninput = function () {
  currentFocus = -1;
  var text = inputNhanVien.value.toUpperCase();
  for (let option of brNhanVien.options) {
    if (option.value.toUpperCase().indexOf(text) > -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  }
};

inputNhanVien.onchange = function () {
  let val = inputNhanVien.value;
  let opts = brNhanVien.options;
  for (let i = 0; i < opts.length; i++) {
    if (opts[i].value === val) {
      inputNhanVien.value = opts[i].value;
      break;
    }
  }
};

var currentFocus = -1;
inputNhanVien.onkeydown = function (e) {
  if (e.keyCode == 40) {
    currentFocus++;
    addActive(brNhanVien.options);
  } else if (e.keyCode == 38) {
    currentFocus--;
    addActive(brNhanVien.options);
  } else if (e.keyCode == 13) {
    e.preventDefault();
    if (currentFocus > -1) {
      if (brNhanVien.options) brNhanVien.options[currentFocus].click();
    }
  }
};

function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = x.length - 1;
  x[currentFocus].classList.add("active");
}

function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("active");
  }
}

function updateNhanVienDropdown() {
  const nhanVienDropdown = document.getElementById("br-nhan-vien-nhan");
  const dataDanhMuc = JSON.parse(localStorage.getItem("nhanVienData")) || [];

  nhanVienDropdown.innerHTML = "";

  dataDanhMuc.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.tenNhanVien;
    option.textContent = item.tenNhanVien;
    nhanVienDropdown.appendChild(option);

    option.onclick = function () {
      inputNhanVien.value = item.tenNhanVien;
      brNhanVien.style.display = "none";
      inputNhanVien.style.borderRadius = "5px";
    };
  });
}

document.addEventListener("DOMContentLoaded", function () {
  updateNhanVienDropdown(); // Gọi hàm này khi trang được tải để cập nhật datalist
});
