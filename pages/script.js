document.addEventListener("DOMContentLoaded", function () {
  const resetPasswordForm = document.getElementById("resetPasswordForm");
  const resetMessage = document.getElementById("resetMessage");

  resetPasswordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("resetEmail").value;
    if (!email) {
      resetMessage.textContent = "Vui lòng nhập email hợp lệ!";
      resetMessage.style.color = "red";
      return;
    }

    // Giả lập kiểm tra email từ API giả định
    const apiUrl = "http://localhost:3000/users";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((users) => {
        const user = users.find((u) => u.email === email);
        if (user) {
          resetMessage.innerHTML = `
            <span style="color: green;">Tài khoản của bạn được tìm thấy!</span><br>
       <div class="d-flex justify-content-start flex-wrap">
            <strong>Email:</strong> ${user.email}<br>
            <strong>Password:</strong> ${user.password}
       </div>
          `;
        } else {
          resetMessage.textContent = "Email không tồn tại!";
          resetMessage.style.color = "red";
        }
      })
      .catch((error) => {
        resetMessage.textContent = "Lỗi hệ thống, vui lòng thử lại!";
        resetMessage.style.color = "red";
      });
  });
});
