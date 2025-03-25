document.addEventListener("DOMContentLoaded", function () {
  const itemsPerPage = 5;
  const tabData = {
    allNews: { container: "#allNews .article-item", currentPage: 1 },
    clubNews: { container: "#clubNews .article-item", currentPage: 1 },
    mensTeam: { container: "#mensTeam .article-item", currentPage: 1 },
  };

  function showPage(tabId, page) {
    const items = document.querySelectorAll(tabData[tabId].container);
    const totalPages = Math.ceil(items.length / itemsPerPage);

    items.forEach((item, index) => {
      item.style.display =
        index >= (page - 1) * itemsPerPage && index < page * itemsPerPage
          ? "flex"
          : "none";
    });

    updatePagination(tabId, totalPages);
  }

  function updatePagination(tabId, totalPages) {
    const tabElement = document.getElementById(tabId);
    if (!tabElement) return;

    let paginationContainer = tabElement.querySelector(".pagination");
    if (!paginationContainer) {
      paginationContainer = document.createElement("div");
      paginationContainer.classList.add("pagination");
      tabElement.appendChild(paginationContainer);
    }
    paginationContainer.innerHTML = "";

    if (totalPages > 1) {
      // Nút Previous
      const prevBtn = document.createElement("button");
      prevBtn.innerText = "«";
      prevBtn.classList.add("page-btn", "prev-btn");
      prevBtn.disabled = tabData[tabId].currentPage === 1;
      prevBtn.addEventListener("click", function () {
        if (tabData[tabId].currentPage > 1) {
          tabData[tabId].currentPage--;
          showPage(tabId, tabData[tabId].currentPage);
        }
      });
      paginationContainer.appendChild(prevBtn);

      // Nút số trang
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.classList.add("page-btn", "num-btn");
        if (i === tabData[tabId].currentPage) {
          btn.classList.add("active");
        }
        btn.addEventListener("click", function () {
          tabData[tabId].currentPage = i;
          showPage(tabId, i);
        });
        paginationContainer.appendChild(btn);
      }

      // Nút Next
      const nextBtn = document.createElement("button");
      nextBtn.innerText = "»";
      nextBtn.classList.add("page-btn", "next-btn");
      nextBtn.disabled = tabData[tabId].currentPage === totalPages;
      nextBtn.addEventListener("click", function () {
        if (tabData[tabId].currentPage < totalPages) {
          tabData[tabId].currentPage++;
          showPage(tabId, tabData[tabId].currentPage);
        }
      });
      paginationContainer.appendChild(nextBtn);
    }
  }

  document.querySelectorAll(".nav-link").forEach((tab) => {
    tab.addEventListener("shown.bs.tab", function (e) {
      const tabId = e.target.getAttribute("href").replace("#", "");
      showPage(tabId, 1);
    });
  });

  // Khởi tạo phân trang cho từng tab
  Object.keys(tabData).forEach((tabId) => {
    showPage(tabId, 1);
  });
});
