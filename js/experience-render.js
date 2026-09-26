(function () {
  "use strict";

  if (document.body.getAttribute("data-page") !== "experience") return;

  var STORAGE_KEY = "portfolio_experience_override_v1";
  window.EXPERIENCE_STORAGE_KEY = STORAGE_KEY;

  function loadExperience() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      /* ignore corrupt/blocked storage, fall back to shipped data */
    }
    return window.EXPERIENCE_DATA.map(function (x) { return JSON.parse(JSON.stringify(x)); });
  }

  var state = { experience: loadExperience() };

  function getExperience() { return state.experience; }

  function setExperience(next, opts) {
    state.experience = next;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      /* storage full or blocked; edits still work for this page view */
    }
    renderExperience(!(opts && opts.animate));
  }

  function resetExperience() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    state.experience = window.EXPERIENCE_DATA.map(function (x) { return JSON.parse(JSON.stringify(x)); });
    renderExperience(true);
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cardHTML(exp, index, total) {
    var admin = document.body.classList.contains("admin-mode");

    var tags = (exp.tags || []).length
      ? '<div class="tag-row">' + (exp.tags || []).map(function (t) {
          return '<span class="tag">' + esc(t) + "</span>";
        }).join("") + "</div>"
      : "";

    var bullets = (exp.bullets || []).map(function (b) {
      return "<li>" + esc(b) + "</li>";
    }).join("");

    var statsHTML = (exp.stats || []).length
      ? '<div class="exp-block-label">At a Glance</div>' +
        '<div class="exp-stats">' + (exp.stats || []).map(function (s) {
          return (
            '<div class="exp-stat">' +
              '<span class="exp-stat-value">' + esc(s.value) + "</span>" +
              '<span class="exp-stat-label">' + esc(s.label) + "</span>" +
            "</div>"
          );
        }).join('<span class="exp-stat-arrow" aria-hidden="true">→</span>') +
        "</div>"
      : "";

    var highlightsHTML = (exp.highlights || []).length
      ? '<div class="exp-block-label">What I Worked On</div>' +
        '<div class="exp-highlights">' + (exp.highlights || []).map(function (h) {
          return (
            '<div class="exp-highlight">' +
              '<span class="exp-highlight-icon" aria-hidden="true">' + esc(h.icon || "") + "</span>" +
              '<div>' +
                '<div class="exp-highlight-title">' + esc(h.title) + "</div>" +
                '<p class="exp-highlight-desc">' + esc(h.description) + "</p>" +
              "</div>" +
            "</div>"
          );
        }).join("") +
        "</div>"
      : "";

    var body = highlightsHTML
      ? statsHTML + highlightsHTML
      : (bullets ? '<ul class="exp-bullets">' + bullets + "</ul>" : "");

    var links = (exp.links || []).length
      ? '<div class="exp-links">' + (exp.links || []).map(function (l) {
          if (!l.url) return '<span class="link-chip" data-tbd="true">' + esc(l.label) + " (link TBD)</span>";
          var external = /^https?:\/\//.test(l.url);
          return '<a class="link-chip" href="' + esc(l.url) + '"' + (external ? ' target="_blank" rel="noopener"' : "") + ">" + esc(l.label) + "</a>";
        }).join("") + "</div>"
      : "";

    var editBtn = admin
      ? '<button type="button" class="project-edit-btn" data-edit-index="' + index + '" aria-label="Edit experience">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>' +
        "</button>"
      : "";

    var moveControls = admin
      ? '<div class="exp-move-controls">' +
        (index > 0
          ? '<button type="button" class="exp-move-btn" data-move-index="' + index + '" data-dir="up" aria-label="Move this role earlier">▲</button>'
          : '<span class="exp-move-btn exp-move-btn-disabled" aria-hidden="true">▲</span>') +
        (index < total - 1
          ? '<button type="button" class="exp-move-btn" data-move-index="' + index + '" data-dir="down" aria-label="Move this role later">▼</button>'
          : '<span class="exp-move-btn exp-move-btn-disabled" aria-hidden="true">▼</span>') +
        "</div>"
      : "";

    return (
      '<article class="exp-card reveal" data-exp-id="' + esc(exp.id) + '" data-index="' + index + '">' +
        editBtn +
        moveControls +
        '<div class="exp-card-head">' +
          '<div>' +
            '<div class="exp-role">' + esc(exp.role) + "</div>" +
            '<div class="exp-org">' + esc(exp.org) + "</div>" +
          "</div>" +
          '<div class="exp-meta">' + esc(exp.location) + "<br />" + esc(exp.dates) + "</div>" +
        "</div>" +
        tags +
        body +
        links +
      "</article>"
    );
  }

  function renderExperience(skipReveal) {
    var mount = document.getElementById("timeline");
    if (!mount) return;
    var total = state.experience.length;
    mount.innerHTML = state.experience.map(function (x, i) { return cardHTML(x, i, total); }).join("");

    if (skipReveal) {
      mount.querySelectorAll(".reveal").forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else if (window.observeReveal) {
      mount.querySelectorAll(".reveal").forEach(function (el) {
        window.observeReveal(el);
      });
    }

    if (window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent("experience:rendered"));
    }
  }

  window.getExperience = getExperience;
  window.setExperience = setExperience;
  window.resetExperience = resetExperience;
  window.renderExperienceTimeline = renderExperience;

  renderExperience();
})();
