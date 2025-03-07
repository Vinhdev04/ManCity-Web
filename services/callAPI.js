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
  console.log(data);

  if (data) {
    let html = ""; // Biến chứa HTML

    data.forEach((item) => {
      html += `
        <div class="swiper-slide">
          <div class="border p-3">
            <div class="d-flex justify-content-between mt-1 mb-2 align-items-center">
              <h5 class="text-uppercase text-secondary small mb-0">
                ${"Next Fixture"}
              </h5>
               <a href="#!" class="text-dark me-2 fw-bolder">
               All fixtures <i class="ri-arrow-right-line"></i>
              </a>
            </div>
            <div class="text-center">
              <p class="mb-0 small text-muted">Sân vận động: <strong>${
                item.stadium
              }</strong></p>
            </div>
            <div class="d-flex align-items-center justify-content-around mt-2">
              <div class="text-center d-flex flex-column align-items-center">
                <img src="${item.logoHome}" alt="${
        item.home
      }" class="img-fluid" style="max-width: 50px" />
                <span class="fw-bold">${item.home}</span>
              </div>
              <div class="time text-center bg-light border rounded px-3 shadow-sm">
                <p class="mb-0 fw-bold text-dark">${item.time}</p>
                <p class="mb-0 small text-secondary">${item.gtm}</p>
               </div>


              <div class="text-center d-flex flex-column align-items-center mt-2">
                <img src="${item.logoAway}" alt="${
        item.away
      }" class="img-fluid" style="max-width: 50px" />
                <span class="fw-bold">${item.away}</span>
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-center mt-3">
              <button class="btn btn-outline-secondary text-uppercase fw-bold shadow me-3">
                Preview
              </button>
              <button class="btn btn-outline-primary text-uppercase fw-bold shadow">
              Buy Tickets
              </button>
            </div>
          </div>
        </div>
      `;
    });

    document.querySelector(".swiper-wrapper").innerHTML = html;
  } else {
    console.error("Lỗi không có dữ liệu trả về từ API...");
    document.querySelector(".swiper-wrapper").innerHTML =
      "<p class='text-danger'>Không có trận đấu nào.</p>";
  }
  console.log(data);
};

showData();
