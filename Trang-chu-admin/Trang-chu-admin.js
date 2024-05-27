
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
