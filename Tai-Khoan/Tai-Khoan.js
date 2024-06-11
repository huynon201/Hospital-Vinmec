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
$(document).ready(function () {
  
  var password = $("#mat-khau").val(); 
  
$(".input_box i").click(function () {
  var passwordField = $("#mat-khau");
  if (passwordField.attr("type") === "password") {
      passwordField.attr("type", "text");
      $(this).removeClass("bi-eye-slash").addClass("bi-eye");
  } else {
      passwordField.attr("type", "password");
      $(this).removeClass("bi-eye").addClass("bi-eye-slash");
  }
});
})


let data = JSON.parse(localStorage.getItem('taiKhoanData')) || [];

function saveData() {
  localStorage.setItem('taiKhoanData', JSON.stringify(data));
}

// Initialize default data if localStorage is empty
if (data.length === 0) {
  data = [
    { id: Date.now(), tenDangNhap: "TaiKhoan1", matKhau: "TaiKhoan1@", diaChi:"Hà Nội", soDienThoai: "0335393056", vaiTro: "Nhân viên"},
    { id: Date.now() + 1, tenDangNhap: "TaiKhoan2", matKhau: "TaiKhoan2@", diaChi:"Hà Nội", soDienThoai: "0876767036", vaiTro: "Bác sĩ phụ khoa"}
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
      <td>${item.tenDangNhap}</td>
      <td>${item.matKhau}</td>
      <td>${item.diaChi}</td>
      <td>${item.soDienThoai}</td>
      <td>${item.vaiTro}</td>
      <td>
        <button onclick="editItem(${index})" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#myModal">Sửa</button>
        <button onclick="deleteItem(${index})" class="btn btn-danger">Xóa</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function add() {
  const tenDangNhapInput = document.getElementById("ten-dang-nhap");
  const matKhauInput = document.getElementById("mat-khau");
  const diaChiInput = document.getElementById("dia-chi");
  const soDienThoaiInput = document.getElementById("so-dien-thoai");
  const vaiTroInput = document.getElementById("vai-tro");

  const newUsername = tenDangNhapInput.value;
  const newPassword = matKhauInput.value;

  // Hàm kiểm tra tên đăng nhập có tồn tại trong dữ liệu hay không
  function isUsernameDuplicate(username) {
    return data.some(item => item.tenDangNhap === username);
  }

  // Hàm kiểm tra điều kiện mật khẩu
  function isPasswordValid(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return password.length >= minLength && hasUpperCase && hasNumber && hasSpecialChar;
  }

  // Hàm kiểm tra điều kiện tên đăng nhập
  function isUsernameValid(username) {
    const minLength = 6;
    const hasNoSpecialChar = /^[a-zA-Z0-9]+$/.test(username); // Chỉ cho phép chữ cái và số
    return username.length >= minLength && hasNoSpecialChar;
  }

  // Kiểm tra điều kiện tên đăng nhập
  if (!isUsernameValid(newUsername)) {
    alert("Tên đăng nhập phải có ít nhất 6 ký tự và không được chứa ký tự đặc biệt hoặc dấu cách.");
    return; // Dừng việc thêm mới nếu tên đăng nhập không hợp lệ
  }

  if (isUsernameDuplicate(newUsername)) {
    alert("Tên đăng nhập đã tồn tại, vui lòng chọn tên đăng nhập khác.");
    return; // Dừng việc thêm mới nếu tên đăng nhập bị trùng
  }

  // Kiểm tra điều kiện mật khẩu
  if (!isPasswordValid(newPassword)) {
    alert("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, ký tự đặc biệt và số.");
    return; // Dừng việc thêm mới nếu mật khẩu không hợp lệ
  }

  const newItem = {
    id: Date.now(),
    tenDangNhap: newUsername,
    matKhau: newPassword,
    diaChi: diaChiInput.value,
    soDienThoai: soDienThoaiInput.value,
    vaiTro: vaiTroInput.value,
  };

  data.push(newItem);
  saveData();

  // Xóa nội dung các ô input sau khi thêm mới
  tenDangNhapInput.value = "";
  matKhauInput.value = "";
  diaChiInput.value = "";
  soDienThoaiInput.value = "";
  vaiTroInput.value = "";

  render();
}





function editItem(index) {
  const item = data[index];
  if (item) {
    const tenDangNhapInput = document.getElementById("ten-dang-nhap");
    const matKhauInput = document.getElementById("mat-khau");
    const diaChiInput = document.getElementById("dia-chi");
    const soDienThoaiInput = document.getElementById("so-dien-thoai");
    const vaiTroInput = document.getElementById("vai-tro");

    tenDangNhapInput.value = item.tenDangNhap;
    matKhauInput.value = item.matKhau;
    diaChiInput.value = item.diaChi;
    soDienThoaiInput.value = item.soDienThoai;
    vaiTroInput.value = item.vaiTro;

    const addBtn = document.querySelector(".modal-footer .btn-info");
    addBtn.textContent = "Lưu";
    addBtn.onclick = function() {
      // Kiểm tra tên đăng nhập đã tồn tại
      function isUsernameDuplicate(username, currentIndex) {
        return data.some((item, idx) => item.tenDangNhap === username && idx !== currentIndex);
      }

      const newUsername = tenDangNhapInput.value;
      const newPassword = matKhauInput.value;

      // Hàm kiểm tra điều kiện tên đăng nhập
      function isUsernameValid(username) {
        const minLength = 6;
        const hasNoSpecialChar = /^[a-zA-Z0-9]+$/.test(username); // Chỉ cho phép chữ cái và số
        return username.length >= minLength && hasNoSpecialChar;
      }

      // Kiểm tra điều kiện tên đăng nhập
      if (!isUsernameValid(newUsername)) {
        alert("Tên đăng nhập phải có ít nhất 6 ký tự và không được chứa ký tự đặc biệt hoặc dấu cách.");
        return; // Dừng việc chỉnh sửa nếu tên đăng nhập không hợp lệ
      }

      if (isUsernameDuplicate(newUsername, index)) {
        alert("Tên đăng nhập đã tồn tại, vui lòng chọn tên đăng nhập khác.");
        return; // Dừng việc chỉnh sửa nếu tên đăng nhập bị trùng
      }

      // Kiểm tra điều kiện mật khẩu
      function isPasswordValid(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return password.length >= minLength && hasUpperCase && hasNumber && hasSpecialChar;
      }

      if (!isPasswordValid(newPassword)) {
        alert("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, ký tự đặc biệt và số.");
        return; // Dừng việc chỉnh sửa nếu mật khẩu không hợp lệ
      }

      item.tenDangNhap = newUsername;
      item.matKhau = newPassword;
      item.diaChi = diaChiInput.value;
      item.soDienThoai = soDienThoaiInput.value;
      item.vaiTro = vaiTroInput.value;
      data[index] = item; // Update the item in place

      saveData();
      render();

      tenDangNhapInput.value = "";
      matKhauInput.value = "";
      diaChiInput.value = "";
      soDienThoaiInput.value = "";
      vaiTroInput.value = "";

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