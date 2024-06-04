
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



//chưc năng login
$(document).ready(function () {
  $(".btn-login").click(function (e) {
      e.preventDefault();
      var name = $("#name").val();
      var password = $("#password").val();
      var errorName = "";
      var errorPassword = "";

      if (name === '') {
          errorName = 'Tên đăng nhập không được để trống';
          $(".error-name").text(errorName);
      } else if (name.length < 6) {
          errorName = 'Tên đăng nhập ít nhất 6 kí tự';
          $(".error-name").text(errorName);
      } else {
          $(".error-name").text("");
      }

      if (password === '') {
          errorPassword = 'Mật khẩu không được để trống';
          $(".error-password").text(errorPassword);
      } else if (password.length < 8 || !/[A-Z]/.test(password) || !/\W/.test(password) || !/\d/.test(password)) {
          errorPassword = "Mật khẩu cần ít nhất 8 ký tự, bao gồm chữ hoa, kí tự đặc biệt và số";
          $(".error-password").text(errorPassword);
      } else {
          $(".error-password").text("");
      }

      if (name === "huydat" && password === "Huydat201!") {
          var rememberLogin = $(".text_remember_login input[type='checkbox']").prop("checked");

          if (rememberLogin) {
              localStorage.setItem("username", name);
              localStorage.setItem("password", password);
          } else {
              localStorage.removeItem("username");
              localStorage.removeItem("password");
          }

          window.location.href = "../Trang-chu-admin/Trang-chu-admin.html";
      }
      if (name === "doanhvu" && password === "Doanhvu2003@") {
        var rememberLogin = $(".text_remember_login input[type='checkbox']").prop("checked");

        if (rememberLogin) {
            localStorage.setItem("username", name);
            localStorage.setItem("password", password);
        } else {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
        }

        window.location.href = "../Trang-chu-users/Trang-chu-users.html";
    }

  });

  $(".input_box i").click(function () {
      var passwordField = $("#password");
      if (passwordField.attr("type") === "password") {
          passwordField.attr("type", "text");
          $(this).removeClass("bi-eye-slash").addClass("bi-eye");
      } else {
          passwordField.attr("type", "password");
          $(this).removeClass("bi-eye").addClass("bi-eye-slash");
      }
  });

  var savedUsername = localStorage.getItem("username");
  var savedPassword = localStorage.getItem("password");
  if (savedUsername && savedPassword) {
      $("#name").val(savedUsername);
      $("#password").val(savedPassword);
      $(".text_remember_login input[type='checkbox']").prop("checked", true);
  }
});
// Adding event listeners to buttons and sidebar for the corresponding actions
sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);

// Initial call to handle resize
handleResize();

const loginModal = document.getElementById('loginModal');
const openLoginButton = document.getElementById('openLogin');
const closeModalSpan = document.getElementsByClassName('close')[0];

// Hiển thị modal đăng nhập khi nhấn nút "Đăng nhập"
openLoginButton.onclick = function() {
    loginModal.style.display = 'block';
}