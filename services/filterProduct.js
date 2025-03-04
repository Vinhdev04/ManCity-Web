//TODO: HANDLE FILTER-CATEGORY
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const dataCategory = this.getAttribute("data-category");
    document.getElementById("filter-age").value = "";
    document.getElementById("filter-size").value = "";
    document.getElementById("priceFilter").value = "";
    filterProducts(dataCategory);
  });
});

//TODO: HANDLE FILTER [SIZE-OLD-PRICE]
document
  .querySelectorAll("#filter-age, #filter-size, #priceFilter")
  .forEach((select) => {
    select.addEventListener("change", () => filterProducts());
  });

function filterProducts(category = "all") {
  const selectedAge = document.getElementById("filter-age").value;
  const selectedSize = document.getElementById("filter-size").value;
  const sortOption = document.getElementById("priceFilter").value;
  let products = Array.from(document.querySelectorAll(".product-item"));

  // Lọc theo danh mục, tuổi và kích thước
  products.forEach((product) => {
    const productCategory = product.getAttribute("data-category");
    const productAge = product.getAttribute("data-age");
    const productSize = product.getAttribute("data-size");

    const categoryMatch = category === "all" || productCategory === category;
    const ageMatch = !selectedAge || productAge === selectedAge;
    const sizeMatch = !selectedSize || productSize === selectedSize;

    product.style.display =
      categoryMatch && ageMatch && sizeMatch ? "block" : "none";
  });

  // Sắp xếp theo giá

  // if (sortOption) {
  //   let productList = document.querySelector(".row"); // Container chứa sản phẩm
  //   let visibleProducts = products.filter((p) => p.style.display !== "none");

  //   visibleProducts.sort((a, b) => {
  //     if (sortOption === "best-seller") {
  //       let salesA = parseInt(a.getAttribute("data-sales")) || 0;
  //       let salesB = parseInt(b.getAttribute("data-sales")) || 0;
  //       return salesB - salesA;
  //     } else {
  //       let priceA = parseFloat(
  //         a
  //           .querySelector(".price")
  //           .textContent.replace("£", "")
  //           .replace(",", ".")
  //       );
  //       let priceB = parseFloat(
  //         b
  //           .querySelector(".price")
  //           .textContent.replace("£", "")
  //           .replace(",", ".")
  //       );
  //       return sortOption === "low-high" ? priceA - priceB : priceB - priceA;
  //     }
  //   });

  //   visibleProducts.forEach((product) => productList.appendChild(product)); // Cập nhật giao diện
  // }
}
