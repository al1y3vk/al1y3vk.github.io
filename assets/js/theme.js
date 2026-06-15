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

// Scrollspy: highlight the nav link for the section currently in view.
// Only runs on the single-page layout (sections with ids that the nav targets).
(function () {
  var links = {};
  document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) {
    links[a.getAttribute("href").slice(1)] = a;
  });
  var sections = Object.keys(links)
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if (!sections.length || !("IntersectionObserver" in window)) return;

  function setActive(id) {
    for (var k in links) links[k].removeAttribute("aria-current");
    if (links[id]) links[id].setAttribute("aria-current", "true");
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) setActive(e.target.id);
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(function (s) { io.observe(s); });
})();
