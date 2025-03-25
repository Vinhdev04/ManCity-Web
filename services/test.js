const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
  console.error("ID parameter is missing from the URL.");
} else {
  fetch(`http://localhost:3000/videos/${id}`)
    .then(response => response.json())
    .then(data => {
      let html = "";

      // Nếu API trả về đối tượng đơn, chuyển thành mảng để duyệt foreach
      const videos = Array.isArray(data) ? data : [data];

      videos.forEach((item) => {
        html += `
          <div class="row justify-content-center">
            <div class="col-12 col-sm-8 col-md-6 mb-4">
              <div class="card text-center">              
                <div class="ratio ratio-16x9">
                  <iframe
                    src="${item.video.href}"
                    title="YouTube video player"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="card-body">
                  <h2 class="card-title text-uppercase fw-bolder">${item.title}</h2>
                  <h6 class="card-subtitle mb-3 text">${item.date} - ${item.time}</h6>
                  <hr style="border-top: 3px solidrgb(221, 233, 245);">
                  <p class="text mb-0 mr-3">Share</p>
                  <!-- Phần Share -->
                  <div class="share-buttons">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://yourpageurl.com" target="_blank" class="share-btn">
                      <i class="ri-facebook-line"></i> Facebook
                    </a>
                    <a href="https://twitter.com/intent/tweet?url=https://yourpageurl.com&text=Check this out!" target="_blank" class="share-btn">
                      <i class="ri-twitter-line"></i> Twitter
                    </a>
                    <a href="mailto:?subject=Check this out&body=Check this video at: https://yourpageurl.com" target="_blank" class="share-btn">
                      <i class="ri-mail-line"></i> Email
                    </a>
                  </div>
                  </div>

                <div class="card-body">
                  <p class="card-text small">${item.video.des}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      });

      const containerVideo = document.querySelector(".video");
      if (containerVideo) {
        containerVideo.innerHTML = html;
      } else {
        console.error("Không tìm thấy phần tử .video trong HTML!");
      }
    })
    .catch(err => console.error("Lỗi fetch API:", err));
}
