/* Applies the saved theme and language before first paint (no flash of wrong theme). */
(function () {
  try {
    var theme = localStorage.getItem("lm-theme");
    if (theme !== "light" && theme !== "dark") {
      theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    document.documentElement.setAttribute("data-theme", theme);
    var query = null;
    try { query = new URLSearchParams(window.location.search).get("lang"); } catch (e) {}
    var saved = query || localStorage.getItem("lm-lang");
    if (saved === "en") {
      document.documentElement.setAttribute("data-lang", "en");
      document.documentElement.setAttribute("lang", "en");
    }
  } catch (e) { /* storage unavailable — defaults from markup are used */ }
})();
