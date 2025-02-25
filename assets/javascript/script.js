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
