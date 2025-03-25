document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả bài báo từ tab All News
  const allArticles = document.querySelectorAll("#allNews .article-item");

  // Hàm thêm bài báo vào tab tương ứng
  function populateTab(
    tabId,
    category,
    containerSelector = ".article-container"
  ) {
    const articleContainer = document.querySelector(
      `#${tabId} ${containerSelector}`
    );
    if (!articleContainer) {
      console.error(`Không tìm thấy ${containerSelector} trong #${tabId}`);
      return;
    }

    // Xóa nội dung cũ nếu có (trừ tab Men's Team vì đã có dữ liệu riêng)
    if (tabId !== "mensTeam") {
      articleContainer.innerHTML = "";
    }

    // Lọc và thêm các bài báo phù hợp từ All News
    allArticles.forEach((article) => {
      const categoryText = article
        .querySelector(".article-text p")
        .textContent.trim();
      if (categoryText === category) {
        const clonedArticle = article.cloneNode(true);
        articleContainer.appendChild(clonedArticle);
      }
    });
  }

  // Đổ dữ liệu từ All News vào các tab
  populateTab("clubNews", "CLUB NEWS"); // Thêm vào tab Club News
  populateTab("mensTeam", "MEN'S TEAM", ".col-md-9"); // Thêm vào tab Men's Team

  // Xử lý chức năng lọc trong tab Men's Team
  const filterButtons = document.querySelectorAll("#mensTeam .filter-btn");
  const mensTeamArticles = document.querySelectorAll("#mensTeam .article-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      mensTeamArticles.forEach((article) => {
        const category = article.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          article.style.display = "block";
        } else {
          article.style.display = "none";
        }
      });

      // Cập nhật trạng thái nút active
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Xử lý chuyển đổi tab
  const tabLinks = document.querySelectorAll(".nav-tabs .nav-link");
  if (tabLinks.length > 0) {
    tabLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Xóa trạng thái active từ tất cả các tab
        document.querySelectorAll(".tab-pane").forEach((tab) => {
          tab.classList.remove("show", "active");
        });
        tabLinks.forEach((tab) => {
          tab.classList.remove("active");
        });

        // Kích hoạt tab được nhấp
        this.classList.add("active");
        const tabId = this.getAttribute("href").substring(1);
        const targetTab = document.getElementById(tabId);
        if (targetTab) {
          targetTab.classList.add("show", "active");
        }
      });
    });
  }

  // Đặt tab đầu tiên làm active nếu cần
  const firstTab = document.querySelector("#allNews");
  if (firstTab) {
    firstTab.classList.add("show", "active");
  }
});
