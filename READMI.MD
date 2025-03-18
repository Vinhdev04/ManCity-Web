# WEBMC - Website Quản Lý Câu Lạc Bộ Manchester City

## 📌 Giới thiệu dự án

**WEBSITE MANCITY** là một hệ thống website được xây dựng nhằm mục đích quản lý và cung cấp thông tin toàn diện về Câu lạc bộ bóng đá Manchester City. Website không chỉ phục vụ người dùng truy cập tra cứu thông tin mà còn hỗ trợ quản trị nội dung, đặt vé, quản lý thành viên và giới thiệu các dịch vụ liên quan đến CLB.

---

## ⚙️ Công nghệ sử dụng

- **HTML5, CSS3, JavaScript**
- **Bootstrap 5**
- **SwiperJS, SplideJS (hiển thị slider giao diện mượt mà)**
- **JSON Server (mô phỏng dữ liệu backend)**
- **LocalStorage / Cookies để xử lý login session**

---

## 📁 Cấu trúc thư mục

```
WEBMC/
│
├── assets/
│   ├── css/                → Các tệp CSS giao diện
│   ├── Images/             → Hình ảnh minh họa
│   └── javascript/         → Mã JS sử dụng chung
│
├── database/
│   ├── db.json             → Dữ liệu mô phỏng từ JSON Server
│   ├── package.json        → Cấu hình npm
│
├── helper/
│   ├── Cookies.js          → Xử lý cookie
│   └── handleLogin.js      → Logic xử lý đăng nhập
│
├── pages/
│   → Chứa toàn bộ các trang HTML của dự án
│   ├── homeKit.html
│   ├── honours.html
│   ├── teamhonours.html
│   ├── individualhonours.html
│   ├── detailKit.html
│   ├── detailMatch.html
│   ├── player.html / playerDetail.html
│   ├── tickets.html / menticket.html / womenticket.html
│   └── ...v.v
│
├── partials/               → (Dự kiến chứa header/footer tái sử dụng)
│
├── services/
│   ├── callAPI.js              → Gọi API từ db.json
│   ├── handleSwiperJS.js       → Cấu hình Swiper slider
│   ├── hospitality.js          → Xử lý trang dịch vụ Hospitality
│   ├── filterProduct.js / filterNew.js → Lọc sản phẩm/tin tức
│   └── ...
│
├── test/                   → Tài liệu & kiểm thử
│   └── [2] Phieu theo doi tien doDACS.doc
│
└── index.html              → Trang chủ chính
```

---

## 📌 Chức năng chính

- **🏆 Hiển thị danh hiệu CLB**: `teamHonours`, `individualHonours`, `clbHonours`
- **⚽ Quản lý cầu thủ**: `player.html`, `playerDetail.html`
- **📅 Thông tin trận đấu**: `detailMatch`, `detailResult`, `tableAllClub`
- **🧑‍💼 Đăng nhập/Đăng ký**: `login`, `register`
- \*\*🎟 Đặt vé: `tickets`, `menticket`, `womenticket`
- **💬 Trang dịch vụ & giới thiệu CLB**: `hospitality`, `club`, `EtihadCampusDevelopment`
- **🛒 Shop bán đồ**: `shop.html` -** 📽 Thư viện video, tin tức**: `video.html`, `new.html`

---

## ✅ Hướng phát triển tiếp theo

- Tách component HTML thành các phần dùng lại (header, footer)
- Kết nối với API thật (NodeJS/Express hoặc Firebase)
- Tích hợp chức năng tìm kiếm nâng cao, lọc nội dung
- Responsive Mobile-Friendly 100%

---

## 👨‍💻 Nhóm phát triển

- **Thành viên**: [Điền tên nhóm phát triển ở đây]
- **Môn học**: Công nghệ phần mềm - Đồ án cuối kỳ
- **Giảng viên hướng dẫn**: [Tên GV]

---

## 📄 Tài liệu liên quan

- `SPRINT_BACKLOG_CNPM.xlsx`
- `SPRINT_REVIEW_CNPM.xlsx`
- `Phiếu theo dõi tiến độ DACS.doc`

---

Cảm ơn bạn đã sử dụng dự án!
