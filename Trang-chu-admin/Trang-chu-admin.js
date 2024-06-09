
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
    if(!sidebar.classList.contains("locked")){
      sidebar.classList.add("hoverable");
      sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    }
    else {
      sidebar.classList.remove("hoverable");
      sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    }
  }
};
window.addEventListener('resize', handleResize);
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

document.querySelector('.card.col').addEventListener('click', function() {
  var myModal = new bootstrap.Modal(document.getElementById('myModal'));
  myModal.show();
});

function updateData() {
  var vatTuData = localStorage.getItem("vatTuData");
  if (!vatTuData) return; // Kiểm tra xem có dữ liệu không

  var vatTuArray = JSON.parse(vatTuData);

  // Tạo một đối tượng để lưu trữ số lượng của từng vật tư
  var soLuongVatTu = {};

  vatTuArray.forEach(function (item) {
    soLuongVatTu[item.tenVatTu] = parseInt(item.soLuong);
  });

  // Lấy tất cả các phần tử có class là 'number-vat-tu'
  var numberVatTuElements = document.querySelectorAll('.number-vat-tu');

  // Cập nhật nội dung của từng phần tử
  numberVatTuElements.forEach(function (element) {
    var tenVatTu = element.getAttribute('data-name');
    if (soLuongVatTu[tenVatTu] !== undefined) {
      element.innerText = soLuongVatTu[tenVatTu];
    } else {
      element.innerText = 0; // Nếu không có số lượng, đặt mặc định là 0
    }
  });
}

// Cập nhật dữ liệu ngay khi trang được tải
document.addEventListener('DOMContentLoaded', (event) => {
  updateData();
});

// Định kỳ kiểm tra dữ liệu mỗi 1 giây
setInterval(updateData, 1000);