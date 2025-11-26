document.addEventListener("DOMContentLoaded", () => {
  let open = false;
  const container = document.querySelector(".buttons");
  const primary = document.querySelector(".buttons .button-primary");
  const secondaries = Array.from(
    document.querySelectorAll(".buttons .button-secondary")
  );

  // Prevent clicks inside the buttons area from closing immediately
  if (container)
    container.addEventListener("click", (e) => e.stopPropagation());

  // Expose global function used by inline onclick="myFunction()"
  window.myFunction = function () {
    if (!primary || primary.disabled || primary.classList.contains("disabled"))
      return;
    secondaries.forEach((el) => el.classList.toggle("show"));
    primary.classList.toggle("active");
    const isActive = primary.classList.contains("active");
    document.body.classList.toggle("dimmed", isActive);
    open = isActive || secondaries.some((s) => s.classList.contains("show"));
  };

  // Click outside: close star and remove dim
  window.addEventListener("click", () => {
    if (!open) return;
    secondaries.forEach((el) => el.classList.remove("show"));
    if (primary) primary.classList.remove("active");
    document.body.classList.remove("dimmed");
    open = false;
  });
  /*
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
  */
  document.querySelectorAll(".button-primary").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // ignore clicks when disabled/inactive
      if (btn.disabled || btn.classList.contains("disabled"))
        document.body.classList.remove("dimmed");
      return;
      // existing behavior (toggle active)
      e.preventDefault();
      btn.classList.toggle("active");
    });
  });

  // helper to enable/disable the primary button programmatically
  window.setPrimaryDisabled = function (disabled = true) {
    const btn = document.querySelector(".button-primary");
    if (!btn) return;
    btn.disabled = !!disabled;
    btn.classList.toggle("disabled", !!disabled);
    // remove active when disabling
    if (disabled) btn.classList.remove("active");
  };

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
