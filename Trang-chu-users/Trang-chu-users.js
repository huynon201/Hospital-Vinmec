
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

const loginModal = document.getElementById('loginModal');
const openLoginButton = document.getElementById('openLogin');
const closeModalSpan = document.getElementsByClassName('close')[0];

// Hiển thị modal đăng nhập khi nhấn nút "Đăng nhập"
$(document).ready(function() {
  $('#nhap').click(function() {
      $('#modal-tao').modal('show');
  });
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

let dataPb = JSON.parse(localStorage.getItem('YeuCauData')) || [];

function saveData() {
  localStorage.setItem('YeuCauData', JSON.stringify(dataPb));
}
function add() {

  const vatTuInput = document.getElementById("vat-tu-input");
  const soLuongInput = document.getElementById("so-luong-input");

  const newItem = {
    id: Date.now(),
    tenVatTu: vatTuInput.value,
    soLuong: soLuongInput.value,
  };

  dataPb.push(newItem);
  saveData();
  tenPhongBanInput.value = "";
  moTaPbInput.value = "";
}