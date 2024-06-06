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

input.onchange = function() {
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
  const dataDanhMuc = JSON.parse(localStorage.getItem('danhMucData')) || [];
  
  danhMucDropdown.innerHTML = ""; 

  dataDanhMuc.forEach(item => {
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


document.addEventListener("DOMContentLoaded", function() {
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
      tenDanhMuc: "danh mục 1",
      anhVatTu: "../Assets/content/supplies/kim-tiem.png"
    },
    {
      id: Date.now() + 1,
      tenVatTu: "Khẩu trang",
      moTa: "Khẩu trang y tế chống bụi bẩn dùng 1 lần",
      soLuong: "1",
      thuongHieu: "Unicharm",
      mauSac: "Xanh",
      kichThuoc: "11 cm",
      tenDanhMuc: "danh mục 1",
      anhVatTu: "../Assets/content/supplies/khau-trang.png"
    }
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
        <button onclick="deleteItem(${index})" class="btn btn-danger">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
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
    
    reader.onload = function(e) {
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
    newItem.anhVatTu = currentEditIndex !== null ? data[currentEditIndex].anhVatTu : ""; // Giữ nguyên ảnh nếu không chọn ảnh mới
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

document.addEventListener("DOMContentLoaded", function() {
  render();
  const addBtn = document.querySelector(".modal-footer .btn-info");
  addBtn.onclick = addOrEdit;
});
