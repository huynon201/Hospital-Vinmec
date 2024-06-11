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

let data = JSON.parse(localStorage.getItem("imData")) || [];
let currentEditIndex = null;

function saveData() {
  localStorage.setItem("imData", JSON.stringify(data));
}
if (data.length === 0) {
  data = [
    { id: Date.now(), vatTu: "Kim tiêm", soLuong: "1", ngayNhap: "06/6/2024", tenPhieuXuat: "Đạt nhận kim tiêm", tenNhanVien: "Nguyễn Huy Đạt", tenPhongBan: "Kế hoạch tổng hợp" },
    { id: Date.now() + 1, vatTu: "Khẩu trang", soLuong: "1", ngayNhap: "03/6/2024", tenPhieuXuat: "Doanh nhận  khẩu trang", tenNhanVien: "Vũ Đức Doanh", tenPhongBan: "Tài chính" }
  ];
  saveData();
}
// Hàm tạo id duy nhất
function generateRandomID() {
  return Math.floor(Math.random() * 1000000);
}

// Hàm thêm mới một mục vào data và lưu vào localStorage
function addNewItem(id, tenPhieuXuat, ngayNhap, tenNhanVien, tenPhongBan) {
  // Kiểm tra nếu tenPhieuXuat là một đối tượng và ghi log để debug
  if (typeof tenPhieuXuat === "object") {
    console.error("tenPhieuXuat là một đối tượng:", tenPhieuXuat);
  }

  // Đảm bảo rằng tenPhieuXuat là một chuỗi
  const newItem = {
    id, // Gán id duy nhất
    tenPhieuXuat: String(tenPhieuXuat),
    ngayNhap,
    tenNhanVien: String(tenNhanVien),
    tenPhongBan: String(tenPhongBan),
  };
  data.push(newItem);
  saveData();
  render();
}

function render() {
  const tbody = document.querySelector("#render tbody");
  tbody.innerHTML = "";
  data.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.id}</td>
      <td>${item.tenPhieuXuat}</td>
      <td>${item.ngayNhap}</td>
      <td>${item.tenNhanVien}</td>
      <td>${item.tenPhongBan}</td>
    `;
    tbody.appendChild(row);
  });
}

// Gọi hàm render để hiển thị dữ liệu khi trang được tải
document.addEventListener("DOMContentLoaded", render);

// Ví dụ thêm một mục mới (bạn có thể gọi hàm này từ một sự kiện như click vào nút "Thêm")
function initializeData() {
  var imData = localStorage.getItem("imData");
  if (!imData) return;

  var vatTuArray = JSON.parse(imData);
  var tbody = document.querySelector("#render tbody");
  tbody.innerHTML = "";

  document.querySelectorAll(".modal").forEach(function (modal) {
    modal.remove();
  });

  vatTuArray.forEach(function (item, index) {
    var rowHTML = `
          <tr data-bs-toggle="modal" data-bs-target="#modal-${item.id}">
              <td>${index + 1}</td>
              <td>${item.id}</td>
              <td>${item.tenPhieuXuat}</td>
              <td>${item.ngayNhap}</td>
              <td>${item.tenNhanVien}</td>
      <td>${item.tenPhongBan}</td>
          </tr>
      `;

    var modalHTML = `
          <div class="modal fade" id="modal-${item.id}" tabindex="-1" aria-labelledby="modalLabel-${item.id}" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h4 class="modal-title" style="width: 100%;text-align: center; " id="modalLabel-${item.id}">Phiếu Xuất</h4>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body ">
                          <p class="p-1">Tên phiếu xuất</p>
                          <p class="bg-light p-3 rounded">${item.tenPhieuXuat}</p>
                          <p class="p-1">Ngày xuất</p>
                          <p class="bg-light p-3 rounded">${item.ngayNhap}</p>
                          <p class="p-1">Vật tư xuất</p>
                          <p class="bg-light p-3 rounded" >${item.vatTu}</p>
                          <p class="p-1">Số lượng</p>
                          <p class="bg-light p-3 rounded">${item.soLuong}</p>
                      </div>
                  </div>
              </div>
          </div>
      `;

    tbody.insertAdjacentHTML("beforeend", rowHTML);
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  });
}

document.addEventListener("DOMContentLoaded", initializeData);
