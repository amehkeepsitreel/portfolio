/* =========================================================
   Amy Reel — Art & Design
   Progressive-enhancement behavior:
   - Mobile nav disclosure (keyboard + screen-reader friendly)
   - Portfolio medium filter (Home/Portfolio pages degrade to
     "show everything" if JS is unavailable, since all markup
     is visible by default)
   ========================================================= */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      setNavOpen(!isOpen);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setNavOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" &&
          !links.contains(e.target) && !toggle.contains(e.target)) {
        setNavOpen(false);
      }
    });
  }

  function setNavOpen(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    links.setAttribute("data-open", open ? "true" : "false");
    if (open) {
      var firstLink = links.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  }

  /* ---- Portfolio filter ---- */
  var filterGroup = document.querySelector("[data-filter-group]");
  var grid = document.querySelector("[data-work-grid]");
  var status = document.querySelector("[data-filter-status]");

  if (filterGroup && grid) {
    var buttons = Array.prototype.slice.call(filterGroup.querySelectorAll("[data-filter]"));
    var cards = Array.prototype.slice.call(grid.querySelectorAll("[data-category]"));

    filterGroup.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-filter]");
      if (!btn) return;

      buttons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      btn.setAttribute("aria-pressed", "true");

      var value = btn.getAttribute("data-filter");
      grid.setAttribute("data-filtering", value === "all" ? "false" : "true");

      var shown = 0;
      cards.forEach(function (card) {
        var match = value === "all" || card.getAttribute("data-category") === value;
        card.setAttribute("data-match", match ? "true" : "false");
        if (match) shown++;
      });

      if (status) {
        status.textContent = value === "all"
          ? "Showing all " + cards.length + " projects."
          : "Showing " + shown + " project" + (shown === 1 ? "" : "s") + " in " + btn.textContent.trim() + ".";
      }
    });
  }
})();
