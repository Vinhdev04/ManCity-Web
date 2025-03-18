document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const newsItems = document.querySelectorAll(".news-item");

  // Ẩn tất cả bài báo khi load trang
  function hideAllNews() {
    newsItems.forEach((item) => {
      item.style.display = "none";
    });
  }

  // Ẩn tất cả bài báo khi tải trang
  hideAllNews();

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-filter");

      // Ẩn tất cả bài báo trước khi hiển thị cái cần thiết
      hideAllNews();

      if (category === "all") {
        newsItems.forEach((item) => {
          item.style.display = "flex"; // Hiện tất cả bài báo
        });
      } else {
        newsItems.forEach((item) => {
          if (item.getAttribute("data-category") === category) {
            item.style.display = "flex"; // Hiện bài báo có category tương ứng
          }
        });
      }

      // Xóa class active của tất cả nút, rồi thêm vào nút đang chọn
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
