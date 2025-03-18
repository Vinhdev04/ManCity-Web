document.addEventListener("DOMContentLoaded", function () {
  const allNewsItems = document.querySelectorAll("#allNews .news-item");
  const clubNewsContainer = document.querySelector(
    "#clubNews .club-news-container"
  );
  const mensTeamContainer = document.querySelector("#mensTeam .col-md-9");

  if (!clubNewsContainer || !mensTeamContainer) {
    console.error("Không tìm thấy container!");
    return;
  }

  allNewsItems.forEach((item) => {
    const category = item.querySelector("p")?.innerText.trim().toUpperCase();

    if (category === "CLUB NEWS") {
      const cloneItem = item.cloneNode(true);
      cloneItem.classList.add("show"); // Đảm bảo hiển thị
      clubNewsContainer.appendChild(cloneItem);
    } else if (category === "MEN'S TEAM") {
      const cloneItem = item.cloneNode(true);
      cloneItem.classList.add("show");
      mensTeamContainer.appendChild(cloneItem);
    }

    item.classList.add("show"); // Hiển thị tất cả trên tab "All News"
  });

  // Xử lý chuyển tab
  document.querySelectorAll(".nav-tabs .nav-link").forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelectorAll(".nav-tabs .nav-link")
        .forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      const tabId = this.getAttribute("data-tab");

      document.querySelectorAll(".news-list").forEach((list) => {
        list.style.display = "none";
      });

      document.getElementById(tabId).style.display = "flex"; // Hiển thị tab được chọn
    });
  });
});
