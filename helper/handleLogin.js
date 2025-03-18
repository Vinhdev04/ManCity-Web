// NOTE: Validation Form
(() => {
  const form = document.querySelector(".needs-validation");
  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");
    },
    false
  );
})();

const btnRegister = document.querySelector("#btn-Register");
btnRegister.addEventListener("click", (e) => {
  window.location.href = "/pages/login.html";
});

const form = document.querySelector("#register");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();

    let maxID = 0;
    users.forEach((user) => {
      if (user.id > maxID) {
        maxID = user.id;
      }
    });

    const newID = maxID + 1;

    const userData = {
      id: newID,
      firstName,
      lastName,
      username,
      email,
      password,
    };

    const postDataUser = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!postDataUser.ok) throw new Error("Đăng ký thất bại!");

    alert("Đăng ký thành công!");
    form.reset();

    // CHUYỂN TRANG SAU KHI ĐĂNG KÝ
    window.location.href = "/pages/login.html";
  } catch (error) {
    alert(error.message);
  }
});
