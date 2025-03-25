document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const articles = document.querySelectorAll(".article-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      articles.forEach((article) => {
        const category = article.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          article.style.display = "flex"; // Đảm bảo display: flex
          article.style.opacity = "1";
          article.style.transition = "opacity 0.3s ease";
        } else {
          article.style.opacity = "0";
          article.style.transition = "opacity 0.3s ease";
          setTimeout(() => {
            article.style.display = "none";
          }, 300);
        }
      });
    });
  });

  const allButton = document.querySelector('.filter-btn[data-filter="all"]');
  if (allButton) {
    allButton.click();
  }
});
