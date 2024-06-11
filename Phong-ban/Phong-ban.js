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


let dataPb = JSON.parse(localStorage.getItem('phongBanData')) || [];

function saveData() {
  localStorage.setItem('phongBanData', JSON.stringify(dataPb));
}

// Initialize default data if localStorage is empty
if (dataPb.length === 0) {
  dataPb = [
    { id: Date.now(), tenPhongBan: "Kế hoạch tổng hợp", moTaPb: "Phụ trách lên kế hoạch" },
    { id: Date.now() + 1, tenPhongBan: "Điều dưỡng", moTaPb: "Chăm sóc bệnh nhân" },
    { id: Date.now() + 2, tenPhongBan: "Tài chính", moTaPb: "Quản lí tài chính bệnh viện" }
  ];
  saveData();
}

function render() {
  const tbody = document.querySelector("#render tbody");
  tbody.innerHTML = "";
  dataPb.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.id}</td>
      <td>${item.tenPhongBan}</td>
      <td>${item.moTaPb}</td>
      <td>
        <button onclick="editItem(${index})" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#myModal">Sửa</button>
        <button onclick="deleteItem(${index})" class="btn btn-danger">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function add() {

  const tenPhongBanInput = document.getElementById("ten-phong-ban");
  const moTaPbInput = document.getElementById("mo-ta-pb");

  const newItem = {
    id: Date.now(),
    tenPhongBan: tenPhongBanInput.value,
    moTaPb: moTaPbInput.value,
  };

  dataPb.push(newItem);
  saveData();
  tenPhongBanInput.value = "";
  moTaPbInput.value = "";
  render();
}

function editItem(index) {
  const item = dataPb[index];
  if (item) {
    const tenPhongBanInput = document.getElementById("ten-phong-ban");
    const moTaPbInput = document.getElementById("mo-ta-pb");

    tenPhongBanInput.value = item.tenPhongBan;
    moTaPbInput.value = item.moTaPb;

    const addBtn = document.querySelector(".modal-footer .btn-info");
    addBtn.textContent = "Lưu";
    addBtn.onclick = function() {
      item.tenPhongBan = tenPhongBanInput.value;
      item.moTaPb = moTaPbInput.value;
      dataPb[index] = item; // Update the item in place
      saveData();
      render();
      tenPhongBanInput.value = "";
      moTaPbInput.value = "";
      addBtn.textContent = "Tạo";
      addBtn.onclick = add;
    };
    $("#myModal").modal("show");
  }
}


function deleteItem(index) {
  if (index !== -1) {
    dataPb.splice(index, 1);
    saveData();
    render();
  }
}

document.addEventListener('DOMContentLoaded', render);