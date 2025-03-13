const callAPI = async () => {
  try {
    const response = await fetch("http://localhost:3000/schedule");

    if (!response.ok) {
      throw new Error(`Lỗi HTTP ! Trạng thái: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi trong quá trình gọi API", error);
    return null;
  }
};

// Show data from API
const showData = async () => {
  const data = await callAPI();
  if (data) {
    let slidesHTML = "";

    data.forEach((item) => {
      slidesHTML += `

      <div class="swiper-slide">
          <div class="border p-3 shadow-sm bg-white rounded-3">
            <div class="d-flex justify-content-between mb-2 align-items-center">
              <h5 class="text-uppercase text-secondary small mb-0">Next Fixture</h5>
              <a href="#!" class="text-dark fw-bolder">All fixtures <i class="ri-arrow-right-line"></i></a>
            </div>
            <div class="text-center mb-2">
              <p class="mb-0 small text-muted">Sân vận động: <strong>${item.stadium}</strong></p>
            </div>
            <div class="d-flex align-items-center justify-content-around mt-2">
              <div class="text-center">
                <img src="${item.logoHome}" alt="${item.home}" style="max-width: 50px" />
                <span class="fw-bold d-block mt-1">${item.home}</span>
              </div>
              <div class="text-center bg-light border rounded px-3 py-1 shadow-sm">
                <p class="mb-0 fw-bold text-dark">${item.time}</p>
                <p class="mb-0 small text-secondary">${item.gtm}</p>
              </div>
              <div class="text-center">
                <img src="${item.logoAway}" alt="${item.away}" style="max-width: 50px" />
                <span class="fw-bold d-block mt-1">${item.away}</span>
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3 gap-2">
              <button class="btn btn-outline-secondary text-uppercase fw-bold">Preview</button>
              <button class="btn btn-outline-primary text-uppercase fw-bold">Buy Tickets</button>
            </div>
          </div>
        </div>
      `;
    });

    // Gắn HTML đúng cấu trúc Swiper
    const html = `
    <div class="container">
      <div class="swiper mySwipers">
        <div class="swiper-wrapper">
          ${slidesHTML}
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev swiper-slide-button d-none"></div>
        <div class="swiper-button-next swiper-slide-button d-none"></div>
      </div>
      </div>
    `;

    document.querySelector(".schedule__slider").innerHTML = html;

    // Khởi tạo Swiper sau khi render xong HTML
    new Swiper(".mySwipers", {
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
  } else {
    document.querySelector(".schedule__slider").innerHTML =
      "<p class='text-danger'>Không có trận đấu nào.</p>";
  }
};

showData();
