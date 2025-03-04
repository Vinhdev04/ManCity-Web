document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const newsItems = document.querySelectorAll(".news-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.getAttribute("data-filter");

      newsItems.forEach((item) => {
        if (category === "all") {
          item.style.display = "flex"; // Hiện tất cả bài viết
        } else {
          const itemCategory = item.getAttribute("data-category");
          if (itemCategory === category) {
            item.style.display = "flex"; // Hiện bài viết có category tương ứng
          } else {
            item.style.display = "none"; // Ẩn bài viết không thuộc category
          }
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const allNewsItems = document.querySelectorAll("#allNews .news-item");
  const clubNewsContainer = document.querySelector(
    "#clubNews .club-news-container"
  );
  const mensTeamContainer = document.querySelector("#mensTeam .col-md-9");

  allNewsItems.forEach((item) => {
    const category = item.querySelector("p")?.innerText.trim().toUpperCase();

    if (category === "CLUB NEWS") {
      clubNewsContainer.appendChild(item.cloneNode(true));
    } else if (category === "MEN'S TEAM") {
      mensTeamContainer.appendChild(item.cloneNode(true));
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const newsItems = document.querySelectorAll("#allNews .news-item");
  const itemsPerPage = 5;
  let currentPage = 1;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const pageNumbersContainer = document.getElementById("pageNumbers");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function showPage(page) {
    newsItems.forEach((item, index) => {
      item.style.display =
        index >= (page - 1) * itemsPerPage && index < page * itemsPerPage
          ? "flex"
          : "none";
    });

    document
      .querySelectorAll(".page-btn")
      .forEach((btn) => btn.classList.remove("active"));
    document.getElementById(`page-${page}`)?.classList.add("active");

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
  }

  function createPaginationButtons() {
    pageNumbersContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      button.textContent = i;
      button.classList.add("page-btn");
      button.id = `page-${i}`;
      button.setAttribute("data-page", i);

      if (i === currentPage) {
        button.classList.add("active");
      }

      button.addEventListener("click", function () {
        currentPage = parseInt(this.getAttribute("data-page"));
        showPage(currentPage);
      });

      pageNumbersContainer.appendChild(button);
    }
  }

  prevBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      showPage(currentPage);
    }
  });

  nextBtn.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      showPage(currentPage);
    }
  });

  if (totalPages > 1) {
    createPaginationButtons();
  }
  showPage(currentPage);
});
