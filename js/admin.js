(function () {
  "use strict";

  if (document.body.getAttribute("data-page") !== "home") return;

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function emptyProject() {
    return { id: "new-project-" + Date.now(), category: "", name: "", headline: "", description: "", tags: [], cover: "", links: [{ label: "", url: "" }] };
  }

  function slugify(str) {
    return String(str || "").toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || ("project-" + Date.now());
  }

  // ---- Toolbar (the floating toggle itself lives in admin-shared.js) ---

  var toolbar = document.createElement("div");
  toolbar.className = "admin-toolbar";
  toolbar.style.display = window.isAdminMode() ? "flex" : "none";
  toolbar.innerHTML =
    '<span class="admin-toolbar-label">Admin Mode — editing Projects</span>' +
    '<button type="button" class="admin-toolbar-btn" data-action="add">+ Add Project</button>' +
    '<button type="button" class="admin-toolbar-btn" data-action="export">Export data file</button>' +
    '<button type="button" class="admin-toolbar-btn" data-action="reset">Reset changes</button>';

  document.body.appendChild(toolbar);

  window.addEventListener("adminmode:change", function (e) {
    toolbar.style.display = e.detail.on ? "flex" : "none";
    if (window.renderProjectsGrid) window.renderProjectsGrid(true);
  });

  toolbar.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");
    if (action === "add") openModal(null);
    if (action === "export") exportDataFile();
    if (action === "reset") {
      if (confirm("Discard all Admin Mode edits and revert to the shipped project list?")) {
        window.resetProjects();
      }
    }
  });

  // Edit-button clicks are on cards re-rendered by projects-render.js
  document.addEventListener("click", function (e) {
    var editBtn = e.target.closest(".project-edit-btn");
    if (!editBtn) return;
    var index = parseInt(editBtn.getAttribute("data-edit-index"), 10);
    openModal(index);
  });

  // ---- Modal -----------------------------------------------------------

  var overlay = document.createElement("div");
  overlay.className = "admin-modal-overlay";
  overlay.style.display = "none";
  overlay.innerHTML = '<div class="admin-modal" role="dialog" aria-modal="true"></div>';
  document.body.appendChild(overlay);
  var modal = overlay.querySelector(".admin-modal");

  var editingIndex = null; // null = adding a new project

  function categoryOptionsHTML(current) {
    var presets = window.PROJECT_CATEGORY_PRESETS || [];
    var isCustom = current && presets.indexOf(current) === -1;
    var html = presets.map(function (c) {
      return '<option value="' + esc(c) + '"' + (c === current ? " selected" : "") + ">" + esc(c) + "</option>";
    }).join("");
    html += '<option value="__custom__"' + (isCustom ? " selected" : "") + ">Other (type below)…</option>";
    return html;
  }

  function linkRowHTML(link, i) {
    return (
      '<div class="admin-link-row" data-link-row="' + i + '">' +
        '<input type="text" class="admin-input" data-field="link-label" data-i="' + i + '" placeholder="Label (e.g. Prototype)" value="' + esc(link.label) + '" />' +
        '<input type="url" class="admin-input" data-field="link-url" data-i="' + i + '" placeholder="https:// (leave blank for TBD)" value="' + esc(link.url) + '" />' +
        '<button type="button" class="admin-icon-btn" data-action="remove-link" data-i="' + i + '" aria-label="Remove link">×</button>' +
      "</div>"
    );
  }

  function renderModal(project) {
    var links = project.links && project.links.length ? project.links : [{ label: "", url: "" }];
    var isCustomCategory = !!project.category && window.PROJECT_CATEGORY_PRESETS.indexOf(project.category) === -1;
    modal.innerHTML =
      '<h3 class="admin-modal-title">' + (editingIndex === null ? "Add Project" : "Edit Project") + "</h3>" +
      '<label class="admin-label">Category</label>' +
      '<select class="admin-input" data-field="category-select">' + categoryOptionsHTML(project.category) + "</select>" +
      '<input type="text" class="admin-input admin-category-custom" data-field="category-custom" placeholder="Custom category" style="display:' + (isCustomCategory ? "block" : "none") + '" value="' +
        (isCustomCategory ? esc(project.category) : "") + '" />' +

      '<label class="admin-label">Project name</label>' +
      '<input type="text" class="admin-input" data-field="name" value="' + esc(project.name) + '" />' +

      '<label class="admin-label">Headline</label>' +
      '<input type="text" class="admin-input" data-field="headline" value="' + esc(project.headline) + '" />' +

      '<label class="admin-label">Description</label>' +
      '<textarea class="admin-input admin-textarea" data-field="description">' + esc(project.description) + "</textarea>" +

      '<label class="admin-label">Tags (comma-separated)</label>' +
      '<input type="text" class="admin-input" data-field="tags" value="' + esc((project.tags || []).join(", ")) + '" />' +

      '<label class="admin-label">Cover photo (URL/path, or upload below)</label>' +
      '<input type="text" class="admin-input" data-field="cover" value="' + esc(project.cover) + '" />' +
      '<input type="file" accept="image/*" class="admin-file" data-field="cover-file" />' +
      (project.cover ? '<img class="admin-cover-preview" src="' + esc(project.cover) + '" alt="" />' : "") +

      '<label class="admin-label">Links</label>' +
      '<div class="admin-links">' + links.map(linkRowHTML).join("") + "</div>" +
      '<button type="button" class="admin-toolbar-btn" data-action="add-link">+ Add link</button>' +

      '<div class="admin-modal-actions">' +
        (editingIndex === null ? "" : '<button type="button" class="admin-btn admin-btn-danger" data-action="delete">Delete</button>') +
        '<button type="button" class="admin-btn" data-action="cancel">Cancel</button>' +
        '<button type="button" class="admin-btn admin-btn-primary" data-action="save">Save</button>' +
      "</div>";
  }

  function currentModalProject() {
    var categorySelect = modal.querySelector('[data-field="category-select"]');
    var categoryCustom = modal.querySelector('[data-field="category-custom"]');
    var category = categorySelect.value === "__custom__" ? categoryCustom.value.trim() : categorySelect.value;

    var labels = Array.prototype.slice.call(modal.querySelectorAll('[data-field="link-label"]'));
    var urls = Array.prototype.slice.call(modal.querySelectorAll('[data-field="link-url"]'));
    var links = labels.map(function (l, i) {
      return { label: l.value.trim(), url: urls[i].value.trim() };
    }).filter(function (l) { return l.label; });

    return {
      category: category,
      name: modal.querySelector('[data-field="name"]').value.trim(),
      headline: modal.querySelector('[data-field="headline"]').value.trim(),
      description: modal.querySelector('[data-field="description"]').value.trim(),
      tags: modal.querySelector('[data-field="tags"]').value.split(",").map(function (t) { return t.trim(); }).filter(Boolean),
      cover: modal.querySelector('[data-field="cover"]').value.trim(),
      links: links.length ? links : []
    };
  }

  function openModal(index) {
    editingIndex = index;
    var project = index === null ? emptyProject() : JSON.parse(JSON.stringify(window.getProjects()[index]));
    renderModal(project);
    overlay.style.display = "flex";
  }

  function closeModal() {
    overlay.style.display = "none";
    editingIndex = null;
  }

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  modal.addEventListener("change", function (e) {
    if (e.target.matches('[data-field="category-select"]')) {
      modal.querySelector(".admin-category-custom").style.display =
        e.target.value === "__custom__" ? "block" : "none";
    }
    if (e.target.matches('[data-field="cover-file"]')) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        modal.querySelector('[data-field="cover"]').value = reader.result;
        var preview = modal.querySelector(".admin-cover-preview");
        if (!preview) {
          preview = document.createElement("img");
          preview.className = "admin-cover-preview";
          e.target.after(preview);
        }
        preview.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });

  modal.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");

    if (action === "cancel") return closeModal();

    if (action === "add-link") {
      var wrap = modal.querySelector(".admin-links");
      var i = wrap.querySelectorAll(".admin-link-row").length;
      wrap.insertAdjacentHTML("beforeend", linkRowHTML({ label: "", url: "" }, i));
      return;
    }

    if (action === "remove-link") {
      btn.closest(".admin-link-row").remove();
      return;
    }

    if (action === "delete") {
      if (!confirm("Delete this project? This can't be undone (unless you Reset changes).")) return;
      var projects = window.getProjects().slice();
      projects.splice(editingIndex, 1);
      window.setProjects(projects, { animate: false });
      closeModal();
      return;
    }

    if (action === "save") {
      var data = currentModalProject();
      if (!data.name) { alert("Give the project a name before saving."); return; }
      var projects = window.getProjects().slice();
      if (editingIndex === null) {
        data.id = slugify(data.name);
        projects.push(data);
      } else {
        data.id = projects[editingIndex].id;
        projects[editingIndex] = data;
      }
      window.setProjects(projects, { animate: false });
      closeModal();
    }
  });

  // ---- Export ------------------------------------------------------------

  function exportDataFile() {
    var projects = window.getProjects();
    var json = JSON.stringify(projects, null, 2);
    var content =
      "// Source of truth for the Projects grid. Generated by Admin Mode export on " +
      new Date().toISOString() + ".\n" +
      "window.PROJECTS_DATA = " + json + ";\n\n" +
      "window.PROJECT_CATEGORY_PRESETS = " + JSON.stringify(window.PROJECT_CATEGORY_PRESETS, null, 2) + ";\n";

    var blob = new Blob([content], { type: "text/javascript" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "projects-data.js";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    alert("Downloaded projects-data.js. Replace js/projects-data.js in the repo with this file and commit to make your edits permanent for all visitors.");
  }
})();
