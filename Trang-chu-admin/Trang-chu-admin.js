
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

document.addEventListener('DOMContentLoaded', function() {
  initializeData();
  attachSearchEvent();
});

function attachSearchEvent() {
  document.getElementById('search-box').addEventListener('input', function() {
      var searchTerm = this.value.toLowerCase();
      var cards = document.querySelectorAll('.card.col');

      cards.forEach(function(card) {
          var cardTitle = card.querySelector('.card-title').innerText.toLowerCase();
          if (cardTitle.includes(searchTerm)) {
              card.style.display = '';
          } else {
              card.style.display = 'none';
          }
      });
  });
}

function initializeData() {
  var vatTuData = localStorage.getItem("vatTuData");
  if (!vatTuData) return;

  var vatTuArray = JSON.parse(vatTuData);
  var columnSupplies = document.querySelector('.colum-supplies');
  columnSupplies.innerHTML = '';

  document.querySelectorAll('.modal').forEach(function(modal) {
      modal.remove();
  });

  vatTuArray.forEach(function(item) {
      var cardHTML = `
          <div class="card col" data-bs-toggle="modal" data-bs-target="#modal-${item.id}">
              <img class="card-img-top" src="${item.anhVatTu}" alt="" />
              <div class="card-body">
                  <h4 class="card-title">${item.tenVatTu}</h4>
              </div>
              <div class="icon-shopping">
                  <i class="bx bxs-shopping-bag"></i>
                  <p class="number-vat-tu" data-name="${item.tenVatTu}">${item.soLuong}</p>
              </div>
          </div>
      `;

      var modalHTML = `
          <div class="modal fade" id="modal-${item.id}">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                  <div class="modal-content">
                      <div class="row">
                          <div class="col-sm-6">
                              <img style="object-fit: cover" class="w-100 h-100" src="${item.anhVatTu}" alt="" />
                          </div>
                          <div class="col-sm-6">
                              <div class="modal-header d-flex justify-content-center align-items-center text-center">
                                  <h4 class="modal-title w-100">${item.tenVatTu}</h4>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                              </div>
                              <div class="modal-body">
                                  <p>Mô tả</p>
                                  <p>${item.moTa}</p>
                                  <p>Danh mục</p>
                                  <p>${item.tenDanhMuc}</p>
                                  <p>Thương hiệu</p>
                                  <p>${item.thuongHieu}</p>
                                  <p>Màu</p>
                                  <p>${item.mauSac}</p>
                                  <p>Số lượng</p>
                                  <p class="number-vat-tu" data-name="${item.tenVatTu}">${item.soLuong}</p>
                                  <p>Kích thước</p>
                                  <p>${item.kichThuoc}</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;

      columnSupplies.insertAdjacentHTML('beforeend', cardHTML);
      document.body.insertAdjacentHTML('beforeend', modalHTML);
  });

  // Gán lại sự kiện click cho các thẻ sau khi khởi tạo dữ liệu
  // document.querySelectorAll('.card.col').forEach(function(card) {
  //     card.addEventListener('click', function() {
  //         var modalId = card.getAttribute('data-bs-target');
  //         var myModal = new bootstrap.Modal(document.getElementById(modalId.replace('#', '')));
  //         myModal.show();
  //     });
  // });

  updateData();
}

function updateData() {
  var vatTuData = localStorage.getItem("vatTuData");
  if (!vatTuData) return;

  var vatTuArray = JSON.parse(vatTuData);
  var soLuongVatTu = {};

  vatTuArray.forEach(function(item) {
      soLuongVatTu[item.tenVatTu] = parseInt(item.soLuong);
  });

  var numberVatTuElements = document.querySelectorAll('.number-vat-tu');

  numberVatTuElements.forEach(function(element) {
      var tenVatTu = element.getAttribute('data-name');
      if (soLuongVatTu[tenVatTu] !== undefined) {
          element.innerText = soLuongVatTu[tenVatTu];
      } else {
          element.innerText = 0;
      }
  });
}


// function updateData() {
//   var vatTuData = localStorage.getItem("vatTuData");
//   if (!vatTuData) return; // Kiểm tra xem có dữ liệu không

//   var vatTuArray = JSON.parse(vatTuData);

//   // Tạo một đối tượng để lưu trữ số lượng của từng vật tư
//   var soLuongVatTu = {};

//   vatTuArray.forEach(function (item) {
//     soLuongVatTu[item.tenVatTu] = parseInt(item.soLuong);
//   });

//   // Lấy tất cả các phần tử có class là 'number-vat-tu'
//   var numberVatTuElements = document.querySelectorAll('.number-vat-tu');

//   // Cập nhật nội dung của từng phần tử
//   numberVatTuElements.forEach(function (element) {
//     var tenVatTu = element.getAttribute('data-name');
//     if (soLuongVatTu[tenVatTu] !== undefined) {
//       element.innerText = soLuongVatTu[tenVatTu];
//     } else {
//       element.innerText = 0; // Nếu không có số lượng, đặt mặc định là 0
//     }
//   });
// }

// function initializeData() {
//   var vatTuData = localStorage.getItem("vatTuData");
//   if (!vatTuData) return; // Kiểm tra xem có dữ liệu không

//   var vatTuArray = JSON.parse(vatTuData);

//   // Lấy phần tử cha chứa các thẻ card
//   var columnSupplies = document.querySelector('.colum-supplies');
//   columnSupplies.innerHTML = ''; // Xóa nội dung hiện tại để tránh trùng lặp

//   // Xóa các modal hiện tại để tránh trùng lặp
//   document.querySelectorAll('.modal').forEach(function (modal) {
//     modal.remove();
//   });

//   vatTuArray.forEach(function (item) {
//     var cardHTML = `
//       <div class="card col" data-bs-toggle="modal" data-bs-target="#modal-${item.id}">
//         <img class="card-img-top" src="${item.anhVatTu}" alt="" />
//         <div class="card-body">
//           <h4 class="card-title">${item.tenVatTu}</h4>
//         </div>
//         <div class="icon-shopping">
//           <i class="bx bxs-shopping-bag"></i>
//           <p class="number-vat-tu" data-name="${item.tenVatTu}">${item.soLuong}</p>
//         </div>
//       </div>
//     `;

//     var modalHTML = `
//       <div class="modal fade" id="modal-${item.id}">
//         <div class="modal-dialog modal-dialog-centered modal-lg">
//           <div class="modal-content">
//             <div class="row">
//               <div class="col-sm-6">
//                 <img style="object-fit: cover" class="w-100 h-100" src="${item.anhVatTu}" alt="" />
//               </div>
//               <!-- Modal Header -->
//               <div class="col-sm-6">
//                 <div class="modal-header d-flex justify-content-center align-items-center text-center">
//                   <h4 class="modal-title w-100">${item.tenVatTu}</h4>
//                   <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
//                 </div>

//                 <!-- Modal body -->
//                 <div class="modal-body">
//                   <p>Mô tả</p>
//                   <p>${item.moTa}</p>
//                   <p>Danh mục</p>
//                   <p>${item.tenDanhMuc}</p>
//                   <p>Thương hiệu</p>
//                   <p>${item.thuongHieu}</p>
//                   <p>Màu</p>
//                   <p>${item.mauSac}</p>
//                   <p>Số lượng</p>
//                   <p class="number-vat-tu" data-name="${item.tenVatTu}">${item.soLuong}</p>
//                   <p>Kích thước</p>
//                   <p>${item.kichThuoc}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     `;

//     columnSupplies.insertAdjacentHTML('beforeend', cardHTML);
//     document.body.insertAdjacentHTML('beforeend', modalHTML);
//   });

//   // Update the number of supplies immediately after initializing
//   updateData();
// }

// // Initialize data when the page is loaded
// document.addEventListener('DOMContentLoaded', (event) => {
//   initializeData();
// });

// // Periodically update only the data every 1 second without re-rendering the elements
// setInterval(updateData, 1000);
