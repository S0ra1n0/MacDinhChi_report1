document.addEventListener("DOMContentLoaded", () => {
  const viewer = document.getElementById("docx-viewer");
  if (!viewer) return;

  async function loadDocx() {
    viewer.textContent = "Loading document...";
    try {
      const resp = await fetch("document.docx");
      if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
      const arrayBuffer = await resp.arrayBuffer();
      if (!window.mammoth) throw new Error("mammoth not loaded");
      const result = await mammoth.convertToHtml({ arrayBuffer });
      viewer.innerHTML = result.value || "<p>(Document produced no HTML)</p>";
      if (result.messages && result.messages.length)
        console.warn("Mammoth messages:", result.messages);
    } catch (err) {
      console.error(err);
      viewer.innerHTML = `<p>Failed to load document. <a href="document.docx">Download document.docx</a></p>`;
    }
  }

  loadDocx();
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
