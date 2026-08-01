/**
 * Team card description toggles.
 *
 * One delegated listener on the grid drives all six cards. Opening a card
 * closes any other, so at most one description is on screen at a time.
 */
(function () {
  "use strict";

  var OPEN_CLASS = "is-open";
  var grid = document.querySelector(".team-grid");

  if (!grid) {
    return;
  }

  function setExpanded(toggle, isOpen) {
    var bio = document.getElementById(toggle.getAttribute("aria-controls"));

    toggle.setAttribute("aria-expanded", String(isOpen));

    if (bio) {
      bio.classList.toggle(OPEN_CLASS, isOpen);
    }
  }

  function closeAll(except) {
    var open = grid.querySelectorAll('.team-card__toggle[aria-expanded="true"]');

    Array.prototype.forEach.call(open, function (toggle) {
      if (toggle !== except) {
        setExpanded(toggle, false);
      }
    });
  }

  grid.addEventListener("click", function (event) {
    var toggle = event.target.closest(".team-card__toggle");

    if (!toggle) {
      return;
    }

    var willOpen = toggle.getAttribute("aria-expanded") !== "true";

    closeAll(toggle);
    setExpanded(toggle, willOpen);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") {
      return;
    }

    closeAll(null);
  });
})();
