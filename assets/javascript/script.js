//TODO: HANDLE PAGE[VIDEO]
$(document).ready(function () {
  // Hiển thị modal khi truy cập trang
  $("#largeModal").modal("show");

  // Lấy phần tử iframe của video
  let video = $("#largeModal iframe")[0];

  // Thêm tham số autoplay vào URL video
  let videoSrc = video.src;
  video.src = videoSrc + "&autoplay=1&mute=1";

  // Dừng video sau 8 giây và đóng modal
  setTimeout(function () {
    video.src = videoSrc; // Reset lại video (dừng phát)
    $("#largeModal").modal("hide");
  }, 8000);
});

//TODO: LOAD CODE[SUB-MENU] FROME FILE "navbar.html" to "index.html"
//TODO: LOAD CODE[FOOTER] FROME FILE "footer.html" to "index.html"
//TODO: LOAD CODE[NAVBAR] FROME FILE "navbar.html" to "index.html"
function loadHTML(elementId, file) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => alert("Lỗi trong quá trình tải và đọc dữ liệu! ", error));
}

// Load header and footer
window.onload = function () {
  loadHTML("navbar", "/partials/navbar.html");
};
