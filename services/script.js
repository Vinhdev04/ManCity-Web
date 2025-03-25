document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".row a");
    const paginationLinks = document.querySelectorAll(".pagination .page-link");
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Lấy URL hiện tại
    const currentUrl = window.location.href;

    // Hàm cập nhật lớp active cho navbar
    function setActiveTab() {
        navLinks.forEach(link => {
            // Kiểm tra nếu URL hiện tại chứa từ khóa của tab
            if (currentUrl.includes(link.textContent.trim().toLowerCase())) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Gọi hàm để cập nhật navbar khi trang được tải
    setActiveTab();
  
    // Hàm hiển thị các video theo số trang (mỗi trang 9 video)
    function showPage(pageNumber) {
      const videosPerPage = 9;
      const start = (pageNumber - 1) * videosPerPage;
      const end = start + videosPerPage;
  
      videos.forEach((video, index) => {
        video.style.display = (index >= start && index < end) ? "block" : "none";
      });
    }
  
    // Cập nhật trạng thái disabled cho nút mũi tên
    function updateArrowState(pageNumber) {
      const pageItems = document.querySelectorAll(".pagination .page-item");
      const leftArrow = pageItems[0];
      const rightArrow = pageItems[pageItems.length - 1];
  
      if (pageNumber === 1) {
        leftArrow.classList.add("disabled");
      } else {
        leftArrow.classList.remove("disabled");
      }
  
      if (pageNumber === 3) {
        rightArrow.classList.add("disabled");
      } else {
        rightArrow.classList.remove("disabled");
      }
    }
  
    // Cập nhật active cho các số trang (bỏ qua các nút mũi tên)
    function updateActivePage(pageNumber) {
      const pageItems = document.querySelectorAll(".pagination .page-item");
      pageItems.forEach(item => {
        // Nếu không chứa thẻ <i> thì là mục số trang
        if (!item.querySelector("i")) {
          // Loại bỏ "(current)" nếu có, sau đó so sánh
          const text = item.textContent.replace(/\(current\)/i, "").trim();
          if (text === pageNumber.toString()) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        }
      });
      updateArrowState(pageNumber);
    }
  
    // Hiển thị trang đầu tiên khi load
    showPage(1);
    updateActivePage(1);
  
    // Lắng nghe sự kiện click của các liên kết phân trang
    paginationLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        let pageNumber;
  
        // Nếu có chứa thẻ <i> => đây là nút mũi tên
        if (this.querySelector("i")) {
          const activeItem = document.querySelector(".pagination .page-item.active a");
          const currentPage = parseInt(activeItem.textContent.replace(/\(current\)/i, "").trim());
          if (this.querySelector("i").classList.contains("ri-arrow-left-line")) {
            pageNumber = currentPage > 1 ? currentPage - 1 : 1;
          } else if (this.querySelector("i").classList.contains("ri-arrow-right-line")) {
            pageNumber = currentPage < 3 ? currentPage + 1 : 3;
          } else {
            pageNumber = currentPage;
          }
        } else {
          // Nếu không chứa <i>, đây là số trang
          pageNumber = parseInt(this.textContent.trim());
        }
        
        updateActivePage(pageNumber);
        showPage(pageNumber);
      });
    });
  });
  