//OVERVIEW:  SLIDER TOP SALE
var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 10,
  loop: true,

  autoplay: {
    delay: 3000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

//OVERVIEW: Slider TOP PLAYER
var swiper = new Swiper(".topSwiper", {
  slidesPerView: "auto",
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

//OVERVIEW: Slider Feedback
var myswiper = new Swiper(".feedbackSwiper", {
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

//OVERVIEW:
var swiper = new Swiper(".mySwipers", {
  slidesPerView: 1,
  spaceBetween: 20,
  autoplay: {
    delay: 3000,
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

//OVERVIEW: Slider Results
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/results")
    .then((response) => response.json())
    .then((data) => {
      let container = document.querySelector(".results .container");
      let resultsContainer = container.querySelector(".row");

      // Nếu `.row` chưa tồn tại, tạo mới và thêm vào `.container`
      if (!resultsContainer) {
        resultsContainer = document.createElement("div");
        resultsContainer.classList.add("row");
        container.appendChild(resultsContainer);
      }

      // Xóa nội dung cũ nhưng giữ tiêu đề
      resultsContainer.innerHTML = `
        <div class="col">
          <h2 class="text-uppercase text-primary mb-4 highlight-title">
            Kết quả thi đấu mùa giải 2024/2025
          </h2>
        </div>
      `;

      let sliderHtml = `
        <div class="swiper mySwiper">
          <div class="swiper-wrapper">
      `;

      data.forEach((item) => {
        sliderHtml += `
          <div class="swiper-slide">
            <div class="border p-3 shadow rounded-2">
              <div class="d-flex justify-content-between mt-2">
                <h5 class="text-uppercase text-secondary small">Last Result</h5>
                <a href="#!" class="text-dark me-2">All Fixture <i class="ri-arrow-right-line"></i></a>
              </div>
              <div class="text-center">
                <p class="mb-0 fw-bold">${item.date}</p>
                <p class="mb-0">${item.league}</p>
              </div>
              <div class="d-flex align-items-center justify-content-around mt-2">
                <div class="text-center d-flex flex-column">
                  <img src="${item.home_team.logo}" alt="${item.home_team.name}" class="img-fluid" style="width: 50px">
                  <span class="fw-bold">${item.home_team.name}</span>
                </div>
                <div class="text-center bg-dark text-white p-2 fw-bold">
                  ${item.score.home} - ${item.score.away}
                </div>
                <div class="text-center d-flex flex-column">
                  <img src="${item.away_team.logo}" alt="${item.away_team.name}" class="img-fluid" style="width: 50px">
                  <span class="fw-bold">${item.away_team.name}</span>
                </div>
              </div> 
              <div class="text-center mt-3">
                <button class="btn btn-outline-primary fw-bold shadow">Match Report</button>
              </div>
            </div>
          </div>
        `;
      });

      sliderHtml += `</div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next d-none"></div>
        <div class="swiper-button-prev d-none"></div>
      </div>`;

      // Thêm slider vào sau tiêu đề mà không ghi đè
      resultsContainer.insertAdjacentHTML("beforeend", sliderHtml);

      // Khởi động Swiper sau khi DOM đã cập nhật
      new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        autoplay: {
          delay: 3000,
        },
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        breakpoints: {
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        },
      });
    })
    .catch((error) => console.error("Lỗi Fetch API:", error));
});
