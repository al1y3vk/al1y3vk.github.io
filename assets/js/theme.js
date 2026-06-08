// Theme toggle. Initial theme is set inline in <head> to avoid a flash;
// this only wires up the button and persists the user's choice.
(function () {
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  function label() {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    btn.textContent = dark ? "☀" : "☾"; // sun when dark, moon when light
    btn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  }

  btn.addEventListener("click", function () {
    var dark = document.documentElement.getAttribute("data-theme") === "dark";
    var next = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  });

  label();
})();
