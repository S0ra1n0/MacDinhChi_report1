document.addEventListener("DOMContentLoaded", () => {
  const wk = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const elWeek = document.getElementById("clock-weekday");
  const elDate = document.getElementById("clock-date");
  const elTime = document.getElementById("clock-time");

  const pad = (n) => String(n).padStart(2, "0");

  function updateClock() {
    const d = new Date();
    const weekday = wk[d.getDay()];
    const day = pad(d.getDate());
    const month = pad(d.getMonth() + 1);
    const year = d.getFullYear();
    const hh = pad(d.getHours());
    const mm = pad(d.getMinutes());
    const ss = pad(d.getSeconds());

    if (elWeek) elWeek.textContent = weekday;
    if (elDate) elDate.textContent = `${day}/${month}/${year}`;
    if (elTime) elTime.textContent = `${hh}:${mm}:${ss}`;
  }

  updateClock();
  setInterval(updateClock, 1000);
});
