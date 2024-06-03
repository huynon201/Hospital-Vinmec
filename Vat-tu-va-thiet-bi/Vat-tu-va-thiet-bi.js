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

// function previewImage() {
//     const fileInput = document.getElementById('anh-vat-tu');
//     const previewImg = document.getElementById('preview-img');
  
//     // Check if a file is selected
//     if (fileInput.files && fileInput.files[0]) {
//       const file = fileInput.files[0];
//       const reader = new FileReader();
  
//       reader.onload = function (e) {
//         previewImg.src = e.target.result;
//       };
  
//       reader.readAsDataURL(file);
//     }
//   }
  
  

let data = JSON.parse(localStorage.getItem("danhMucData")) || [];

function saveData() {
  localStorage.setItem("danhMucData", JSON.stringify(data));
}

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

function add() {
  const tenVatTuInput = document.getElementById("ten-vat-tu");
  const moTaInput = document.getElementById("mo-ta");
  const thuongHieuInput = document.getElementById("thuong-hieu");
  const kichThuocInput = document.getElementById("kich-thuoc");
  const tenDanhMucInput = document.getElementById("danh-muc");
  const mauSacInput = document.getElementById("mau");
  const anhVatTuInput = document.getElementById("anh-vat-tu");
  const soLuongInput = document.getElementById("so-luong");

  const newItem = {
    id: Date.now(),
    tenVatTu: tenVatTuInput.value,
    moTa: moTaInput.value,
    thuongHieu: thuongHieuInput.value,
    kichThuoc: kichThuocInput.value,
    tenDanhMuc: tenDanhMucInput.value,
    mauSac: mauSacInput.value,
    anhVatTu: URL.createObjectURL(anhVatTuInput.files[0]),
    soLuong: soLuongInput.value,
  };
  

  data.push(newItem);
  saveData();
  tenVatTuInput.value = "";
  moTaInput.value = "";
  thuongHieuInput.value = "";
  kichThuocInput.value = "";
  tenDanhMucInput.value = "";
  mauSacInput.value = "";
  anhVatTuInput.value = "";
  soLuongInput.value = "";
  render();
}

function editItem(index) {
  const item = data[index];
  if (item) {
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
    anhVatTuInput.value = item.anhVatTu;
    soLuongInput.value = item.soLuong;

    const addBtn = document.querySelector(".modal-footer .btn-info");
    addBtn.textContent = "Lưu";
    addBtn.onclick = function () {
      item.tenVatTu = tenVatTuInput.value;
      item.moTa = moTaInput.value;
      item.thuongHieu = thuongHieuInput.value;
      item.kichThuoc = kichThuocInput.value;
      item.tenDanhMuc = tenDanhMucInput.value;
      item.mauSac = mauSacInput.value;
      
      if (anhVatTuInput.files.length > 0) {
        item.anhVatTu = URL.createObjectURL(anhVatTuInput.files[0]); // Update image URL if a new file is selected
      }

      item.soLuong = soLuongInput.value;
      
      data[index] = item; // Update the item in place
      saveData();
      render();
      tenVatTuInput.value = "";
      moTaInput.value = "";
      thuongHieuInput.value = "";
      kichThuocInput.value = "";
      tenDanhMucInput.value = "";
      mauSacInput.value = "";
      anhVatTuInput.value = "";
      soLuongInput.value = "";
      addBtn.textContent = "Tạo";
      addBtn.onclick = add;
    };
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

document.addEventListener("DOMContentLoaded", render);

