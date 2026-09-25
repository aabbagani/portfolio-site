(function () {
  "use strict";

  // Highlight the current top-level nav link (Home / Experience)
  var page = document.body.getAttribute("data-page");
  document.querySelectorAll(".primary-links a[data-page]").forEach(function (a) {
    if (a.getAttribute("data-page") === page) a.classList.add("active");
  });

  // Scrollspy for the Home quick-jump subnav
  var subnavLinks = Array.prototype.slice.call(document.querySelectorAll(".subnav a[data-target]"));
  if (subnavLinks.length) {
    var sections = subnavLinks
      .map(function (link) {
        var id = link.getAttribute("data-target");
        return document.getElementById(id);
      })
      .filter(Boolean);

    var setActive = function (id) {
      subnavLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("data-target") === id);
      });
    };

    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) setActive(entry.target.id);
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      sections.forEach(function (s) { spy.observe(s); });
    }
  }

  // Scroll-triggered fade/slide-in reveal
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal, .reveal-stagger"));
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      // threshold 0 + a bottom rootMargin fires as soon as the element's
      // top edge crosses into view, regardless of how tall the element is
      // (a fixed area-ratio threshold fails for tall stacked grids).
      var reveal = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0, rootMargin: "0px 0px -12% 0px" }
      );
      revealEls.forEach(function (el) { reveal.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  // Graceful fallback for experience photos that haven't been added yet
  document.querySelectorAll(".exp-photo img[data-fallback]").forEach(function (img) {
    var showPlaceholder = function () {
      img.style.display = "none";
      var ph = img.parentElement.querySelector(".photo-placeholder");
      if (ph) ph.style.display = "flex";
    };
    // A 404 on localhost can resolve before this listener attaches, so check
    // the already-settled state first and only listen for the rest.
    if (img.complete) {
      if (img.naturalWidth === 0) showPlaceholder();
    } else {
      img.addEventListener("error", showPlaceholder);
    }
  });
})();
