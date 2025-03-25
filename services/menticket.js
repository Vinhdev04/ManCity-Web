document.querySelector(".filter-button").addEventListener("click", function () {
  // Lấy giá trị từ các select
  const selectedTeam = document.getElementById("team").value;
  const selectedCompetition = document.getElementById("competition").value;
  const selectedLocation = document.getElementById("location").value;

  // Lấy tất cả các trận đấu
  const matches = document.querySelectorAll(".match");

  matches.forEach((match) => {
    // Lấy thông tin từ trận đấu
    const competition = match.querySelector(".competition").innerText.trim();
    const stadium = match.querySelector(".stadium").innerText.trim();
    const homeTeam = match
      .querySelector(".team-home .team-name")
      .innerText.trim();
    const awayTeam = match
      .querySelector(".team-away .team-name")
      .innerText.trim();

    // Xác định location của trận đấu (Home hay Away)
    let matchLocation = "Away"; // Mặc định là "Away"
    if (stadium.includes("Etihad Stadium")) {
      matchLocation = "Home";
    }

    // Kiểm tra điều kiện lọc
    const isTeamMatch =
      selectedTeam === "Men's Team" ||
      homeTeam.includes("Manchester City") ||
      awayTeam.includes("Manchester City");
    const isCompetitionMatch =
      selectedCompetition === "All Competitions" ||
      competition.includes(selectedCompetition);
    const isLocationMatch =
      selectedLocation === "All Locations" ||
      matchLocation === selectedLocation;

    // Hiển thị hoặc ẩn trận đấu
    if (isTeamMatch && isCompetitionMatch && isLocationMatch) {
      match.style.display = "block"; // Hiển thị trận đấu
    } else {
      match.style.display = "none"; // Ẩn trận đấu
    }
  });
});
