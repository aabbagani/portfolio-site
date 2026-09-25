(function () {
  "use strict";

  var STORAGE_KEY = "portfolio_projects_override_v1";
  window.PROJECTS_STORAGE_KEY = STORAGE_KEY;

  function loadProjects() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      /* ignore corrupt/blocked storage, fall back to shipped data */
    }
    return window.PROJECTS_DATA.map(function (p) { return JSON.parse(JSON.stringify(p)); });
  }

  var state = { projects: loadProjects() };

  function getProjects() {
    return state.projects;
  }

  function setProjects(next, opts) {
    state.projects = next;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      /* storage full or blocked; edits still work for this page view */
    }
    renderProjects(!(opts && opts.animate));
  }

  function resetProjects() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    state.projects = window.PROJECTS_DATA.map(function (p) { return JSON.parse(JSON.stringify(p)); });
    renderProjects(true);
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cardHTML(project, index) {
    var tags = (project.tags || []).map(function (t) {
      return '<span class="tag">' + esc(t) + "</span>";
    }).join("");

    var links = (project.links || []).map(function (l) {
      if (!l.url) {
        return '<span class="link-chip" data-tbd="true">' + esc(l.label) + " (link TBD)</span>";
      }
      return '<a class="link-chip" href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + "</a>";
    }).join("");

    var cover = project.cover
      ? '<div class="project-cover"><img src="' + esc(project.cover) + '" alt="" /></div>'
      : "";

    var editBtn = document.body.classList.contains("admin-mode")
      ? '<button type="button" class="project-edit-btn" data-edit-index="' + index + '" aria-label="Edit project">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>' +
        "</button>"
      : "";

    return (
      '<article class="project-card reveal" id="project-' + esc(project.id) + '" data-index="' + index + '">' +
        editBtn +
        cover +
        '<div class="project-card-body">' +
          '<div class="project-card-top">' +
            '<div class="project-category">' + esc(project.category) + "</div>" +
            '<div class="project-name">' + esc(project.name) + "</div>" +
          "</div>" +
          '<div class="project-headline">' + esc(project.headline) + "</div>" +
          '<p class="project-desc">' + esc(project.description) + "</p>" +
          '<div class="tag-row">' + tags + "</div>" +
          '<div class="link-row">' + links + "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function renderProjects(skipReveal) {
    var mount = document.getElementById("project-grid");
    if (!mount) return;
    mount.innerHTML = state.projects.map(cardHTML).join("");

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
      window.dispatchEvent(new CustomEvent("projects:rendered"));
    }
  }

  window.getProjects = getProjects;
  window.setProjects = setProjects;
  window.resetProjects = resetProjects;
  window.renderProjectsGrid = renderProjects;

  // Runs synchronously during HTML parsing (this script sits right before
  // main.js, with no defer/async), so the mount element already exists and
  // the cards are in the DOM before main.js's own reveal-observer setup
  // scans the page moments later.
  renderProjects(false);
})();
