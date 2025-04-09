document.addEventListener("DOMContentLoaded", function () {
    // Giữ lại phần khai báo ban đầu
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");
    const sortDropdown = document.getElementById("sortDropdown");

    // Lấy URL hiện tại
    const currentUrl = window.location.href;
    function setActiveTab() {
    const lowerUrl = currentUrl.toLowerCase();

    // Xoá class 'active' cho tất cả nav-link
    navLinks.forEach(link => link.classList.remove('active'));

    // Nếu URL là trang con của Video (ví dụ: highlight hoặc news)
    if (lowerUrl.includes("highlight") || lowerUrl.includes("news.html")) {
        // Giả sử mục Video có href "/pages/video.html"
        const videoLink = document.querySelector('.navbar-nav .nav-link[href="/pages/video.html"]');
        if (videoLink) {
            videoLink.classList.add('active');
        }
    } else {
        // Logic mặc định: Active các nav-link nếu URL chứa text của nav-link
        navLinks.forEach(link => {
            const linkText = link.textContent.trim().toLowerCase();
            if (lowerUrl.includes(linkText)) {
                link.classList.add('active');
            }
        });
    }
    }

// Gọi hàm khi trang được tải
setActiveTab();

    // Số video mỗi trang được tính theo nhóm
    const videosPerPage = 6;
    let currentPage = 1;

    function showPage(page) {
        const allGroups = document.querySelectorAll('.video-group');
        allGroups.forEach((group, index) => {
            if (index >= (page - 1) * videosPerPage && index < page * videosPerPage) {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
            }
        });
        updatePagination(page);
    }

    function updatePagination(page) {
        const totalGroups = document.querySelectorAll('.video-group').length;
        const totalPages = Math.ceil(totalGroups / videosPerPage);
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        prevBtn.style.display = page === 1 ? 'none' : 'block';
        nextBtn.style.display = page === totalPages ? 'none' : 'block';

        const pageButtons = document.querySelectorAll('.page-item');
        if (totalPages < 2) {
            document.getElementById('page-2').style.display = 'none';
        } else {
            document.getElementById('page-2').style.display = 'inline';
        }

        pageButtons.forEach((btn, index) => {
            if (index === page) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        document.getElementById('page-1').style.display = 'inline';
    }

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

    document.getElementById('page-1').addEventListener('click', () => {
        currentPage = 1;
        showPage(currentPage);
    });

    document.getElementById('page-2').addEventListener('click', () => {
        currentPage = 2;
        showPage(currentPage);
    });

    showPage(currentPage);

    // =========================================
    // 2. TÌM KIẾM (theo từng video-item, trong từng video-group)
    // =========================================
    function searchVideos() {
        const searchQuery = searchInput.value.toLowerCase();
        const groups = document.querySelectorAll(".video-group");

        groups.forEach(group => {
            const videoItems = group.querySelectorAll(".video-item");
            let groupHasMatch = false;

            videoItems.forEach(item => {
                const titleElement = item.querySelector(".card-text1");
                if (titleElement) {
                    const title = titleElement.textContent.toLowerCase();
                    if (title.includes(searchQuery)) {
                        item.style.display = 'block';
                        groupHasMatch = true;
                    } else {
                        item.style.display = 'none';
                    }
                } else {
                    item.style.display = 'none';
                }
            });

            if (groupHasMatch) {
                group.style.display = 'block';
            } else {
                group.style.display = 'none';
            }
        });

        // Nếu có tìm kiếm, ẩn phân trang để hiện tất cả kết quả
        if (searchQuery.trim() !== "") {
            document.getElementById('prev-btn').style.display = 'none';
            document.getElementById('next-btn').style.display = 'none';
        } else {
            // Nếu rỗng, hiện phân trang theo thiết lập
            showPage(currentPage);
        }
    }

    searchButton.addEventListener("click", function () {
        searchVideos();
    });
    // Bạn cũng có thể thêm tìm kiếm theo sự kiện input:
    //searchInput.addEventListener("input", searchVideos);//

    // =========================================
    // 3. SẮP XẾP VIDEO (dựa trên thuộc tính của video-group)
    // =========================================
    function sortVideos() {
        const sortOrder = sortDropdown.value;
        const videoGroups = Array.from(document.querySelectorAll('.video-group'));

        if (sortOrder === "newest") {
            videoGroups.sort((a, b) => {
                const dateA = new Date(a.getAttribute('data-year'), a.getAttribute('data-month') - 1);
                const dateB = new Date(b.getAttribute('data-year'), b.getAttribute('data-month') - 1);
                return dateB - dateA;
            });
        } else if (sortOrder === "oldest") {
            videoGroups.sort((a, b) => {
                const dateA = new Date(a.getAttribute('data-year'), a.getAttribute('data-month') - 1);
                const dateB = new Date(b.getAttribute('data-year'), b.getAttribute('data-month') - 1);
                return dateA - dateB;
            });
        }

        const videoContainer = document.querySelector('.col-md-9');
        videoContainer.innerHTML = '';
        videoGroups.forEach(group => {
            videoContainer.appendChild(group);
        });

        currentPage = 1;
        showPage(currentPage);
    }

    sortDropdown.addEventListener("change", sortVideos);
});
