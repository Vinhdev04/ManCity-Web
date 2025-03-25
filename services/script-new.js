document.addEventListener("DOMContentLoaded", function () {
    const videos = document.querySelectorAll(".video-group");
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const sortDropdown = document.getElementById("sortDropdown"); // Lấy dropdown sắp xếp
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Lấy URL hiện tại
    const currentUrl = window.location.href;

    // Hàm cập nhật lớp active cho navbar
    function setActiveTab() {
        navLinks.forEach(link => {
            // Kiểm tra nếu URL hiện tại chứa từ khóa của tab
            if (currentUrl.includes(link.textContent.trim().toLowerCase())) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Gọi hàm để cập nhật navbar khi trang được tải
    setActiveTab();
    // Số video mỗi trang
    const videosPerPage = 6;
    let currentPage = 1; // Trang mặc định
    
    // Hàm hiển thị video cho trang cụ thể
    function showPage(page) {
        const allGroups = document.querySelectorAll('.video-group'); // Lấy tất cả các nhóm video
        allGroups.forEach((group, index) => {
            // Ẩn hoặc hiện nhóm video theo trang
            if (index >= (page - 1) * videosPerPage && index < page * videosPerPage) {
                group.style.display = 'block'; // Hiển thị nhóm video của trang này
            } else {
                group.style.display = 'none'; // Ẩn nhóm video không thuộc trang này
            }
        });
        updatePagination(page); // Cập nhật phân trang
    }
    
    // Cập nhật phân trang
    function updatePagination(page) {
        const totalVideos = document.querySelectorAll('.video-group').length; // Tổng số video
        const totalPages = Math.ceil(totalVideos / videosPerPage); // Tính số trang dựa trên tổng số video
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        // Hiển thị nút "Previous" và "Next" đúng
        prevBtn.style.display = page === 1 ? 'none' : 'block'; // Ẩn nút "Previous" nếu đang ở trang đầu tiên
        nextBtn.style.display = page === totalPages ? 'none' : 'block'; // Ẩn nút "Next" nếu đang ở trang cuối cùng
    
        // Cập nhật các nút trang số (1, 2) tùy theo số lượng video
        const pageButtons = document.querySelectorAll('.page-item');
        
        // Ẩn các nút trang không cần thiết (nếu chỉ có 1 trang, ẩn trang 2)
        if (totalPages < 2) {
            document.getElementById('page-2').style.display = 'none';
        } else {
            document.getElementById('page-2').style.display = 'inline';
        }
    
        // Cập nhật trạng thái nút của trang hiện tại
        pageButtons.forEach((btn, index) => {
            if (index === page) {
                btn.classList.add('active'); // Đánh dấu trang hiện tại
            } else {
                btn.classList.remove('active');
            }
        });
    
        // Hiển thị các nút trang chính
        document.getElementById('page-1').style.display = 'inline';
    }
    
    // Xử lý sự kiện chuyển trang
    document.getElementById('next-btn').addEventListener('click', () => {
        const totalPages = Math.ceil(document.querySelectorAll('.video-group').length / videosPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });
    
    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });
    
    // Xử lý sự kiện cho các nút số trang (1 và 2)
    document.getElementById('page-1').addEventListener('click', () => {
        currentPage = 1;
        showPage(currentPage);
    });
    
    document.getElementById('page-2').addEventListener('click', () => {
        currentPage = 2;
        showPage(currentPage);
    });
    
    // Mặc định hiển thị trang đầu tiên
    showPage(currentPage);

    // =========================================
    // 2. TÌM KIẾM
    // =========================================
    function searchVideos() {
        const searchQuery = searchInput.value.toLowerCase(); // Lấy giá trị tìm kiếm và chuyển thành chữ thường
        videos.forEach(video => {
            const title = video.querySelector(".card-text").textContent.toLowerCase(); // Lấy tên video
            if (title.includes(searchQuery)) {
                video.style.display = 'block'; // Hiển thị video nếu tên chứa từ khóa tìm kiếm
            } else {
                video.style.display = 'none'; // Ẩn video nếu tên không chứa từ khóa
            }
        });
    }

    // Gắn sự kiện cho nút tìm kiếm
    searchButton.addEventListener("click", function () {
        searchVideos(); // Chạy hàm tìm kiếm khi nhấn nút
    });

    // =========================================
    // 3. SẮP XẾP VIDEO
    // =========================================
    function sortVideos() {
        const sortOrder = sortDropdown.value; // Lấy giá trị lựa chọn từ dropdown
        
        const videoGroups = Array.from(document.querySelectorAll('.video-group')); // Chuyển NodeList thành Array để có thể sử dụng sort
        if (sortOrder === "newest") {
            // Sắp xếp từ mới nhất đến cũ nhất
            videoGroups.sort((a, b) => {
                const dateA = new Date(a.getAttribute('data-year'), a.getAttribute('data-month') - 1);
                const dateB = new Date(b.getAttribute('data-year'), b.getAttribute('data-month') - 1);
                return dateB - dateA; // Sắp xếp theo thứ tự giảm dần (mới nhất trước)
            });
        } else if (sortOrder === "oldest") {
            // Sắp xếp từ cũ nhất đến mới nhất
            videoGroups.sort((a, b) => {
                const dateA = new Date(a.getAttribute('data-year'), a.getAttribute('data-month') - 1);
                const dateB = new Date(b.getAttribute('data-year'), b.getAttribute('data-month') - 1);
                return dateA - dateB; // Sắp xếp theo thứ tự tăng dần (cũ nhất trước)
            });
        }

        // Xóa tất cả các video hiện tại trong DOM
        const videoContainer = document.querySelector('.col-md-9');
        videoContainer.innerHTML = '';

        // Thêm lại các video sau khi đã sắp xếp
        videoGroups.forEach(group => {
            videoContainer.appendChild(group);
        });

        // Hiển thị lại trang đầu tiên sau khi sắp xếp
        currentPage = 1;
        showPage(currentPage);
    }

    // Lắng nghe sự kiện thay đổi giá trị trong dropdown sắp xếp
    sortDropdown.addEventListener("change", sortVideos);
});
