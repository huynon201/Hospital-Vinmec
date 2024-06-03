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

let data = JSON.parse(localStorage.getItem('danhMucData')) || [];

function saveData() {
  localStorage.setItem('danhMucData', JSON.stringify(data));
}

// Initialize default data if localStorage is empty
if (data.length === 0) {
  data = [
    { id: Date.now(), tenDanhMuc: "Danh Mục 1", moTa: "Mô tả danh mục 1" },
    { id: Date.now() + 1, tenDanhMuc: "Danh Mục 2", moTa: "Mô tả danh mục 2" }
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
      <td>${item.tenDanhMuc}</td>
      <td>${item.moTa}</td>
      <td>
        <button onclick="editItem(${index})" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#myModal">Sửa</button>
        <button onclick="deleteItem(${index})" class="btn btn-danger">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function add() {
  const tenDanhMucInput = document.getElementById("ten-danh-muc");
  const moTaInput = document.getElementById("mo-ta");

  const newItem = {
    id: Date.now(),
    tenDanhMuc: tenDanhMucInput.value,
    moTa: moTaInput.value,
  };

  data.push(newItem);
  saveData();
  tenDanhMucInput.value = "";
  moTaInput.value = "";
  render();
}

function editItem(index) {
  const item = data[index];
  if (item) {
    const tenDanhMucInput = document.getElementById("ten-danh-muc");
    const moTaInput = document.getElementById("mo-ta");

    tenDanhMucInput.value = item.tenDanhMuc;
    moTaInput.value = item.moTa;

    const addBtn = document.querySelector(".modal-footer .btn-info");
    addBtn.textContent = "Lưu";
    addBtn.onclick = function() {
      item.tenDanhMuc = tenDanhMucInput.value;
      item.moTa = moTaInput.value;
      data[index] = item; // Update the item in place
      saveData();
      render();
      tenDanhMucInput.value = "";
      moTaInput.value = "";
      addBtn.textContent = "Tạo";
      addBtn.onclick = add;
    };
    $("#myModal").modal("show");
  }
}

function deleteItem(index) {
  if (index !== -1) {
    data.splice(index, 1);
    saveData();
    render();
  }
}

document.addEventListener('DOMContentLoaded', render);