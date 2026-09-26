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
  toolbar.id = "home-admin-toolbar";
  toolbar.style.display = window.isAdminMode() ? "flex" : "none";
  toolbar.innerHTML =
    '<span class="admin-toolbar-label">Admin Mode</span>' +
    '<button type="button" class="admin-toolbar-btn" data-action="add-project">+ Add Project</button>' +
    '<button type="button" class="admin-toolbar-btn" data-action="reset-projects">Reset project changes</button>';

  document.body.appendChild(toolbar);

  window.addEventListener("adminmode:change", function (e) {
    toolbar.style.display = e.detail.on ? "flex" : "none";
    if (window.renderProjectsGrid) window.renderProjectsGrid(true);
  });

  toolbar.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");
    if (action === "add-project") openModal(null);
    if (action === "reset-projects") {
      if (confirm("Discard all Admin Mode edits and revert to the shipped project list?")) {
        window.resetProjects();
      }
    }
  });

  // Edit-button clicks are on cards re-rendered by projects-render.js
  document.addEventListener("click", function (e) {
    var editBtn = e.target.closest(".project-edit-btn");
    if (editBtn) {
      var index = parseInt(editBtn.getAttribute("data-edit-index"), 10);
      openModal(index);
      return;
    }

    var moveBtn = e.target.closest(".project-move-btn:not(.project-move-btn-disabled)");
    if (moveBtn) {
      var from = parseInt(moveBtn.getAttribute("data-move-index"), 10);
      var dir = moveBtn.getAttribute("data-dir");
      var to = dir === "up" ? from - 1 : from + 1;
      var projects = window.getProjects().slice();
      if (to < 0 || to >= projects.length) return;
      var tmp = projects[from];
      projects[from] = projects[to];
      projects[to] = tmp;
      window.setProjects(projects, { animate: false });
    }
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
    var isFile = /^data:/.test(link.url || "");
    var fileTitle = isFile ? "File attached" + (link.fileName ? ": " + link.fileName : "") : "Upload a file instead of a URL";
    return (
      '<div class="admin-link-row" data-link-row="' + i + '">' +
        '<input type="text" class="admin-input" data-field="link-label" data-i="' + i + '" placeholder="Label (e.g. Prototype)" value="' + esc(link.label) + '" />' +
        '<input type="url" class="admin-input" data-field="link-url" data-i="' + i + '" placeholder="' + (isFile ? "(file attached)" : "https:// (leave blank for TBD)") + '" value="' + (isFile ? "" : esc(link.url)) + '" data-original-url="' + esc(link.url || "") + '" data-original-filename="' + esc(link.fileName || "") + '" />' +
        '<button type="button" class="admin-icon-btn admin-link-upload-btn' + (isFile ? " has-file" : "") + '" data-action="upload-link" data-i="' + i + '" title="' + esc(fileTitle) + '" aria-label="' + esc(fileTitle) + '">\u{1F4CE}</button>' +
        '<input type="file" class="admin-link-file" data-field="link-file" data-i="' + i + '" hidden />' +
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
    var fileInputs = Array.prototype.slice.call(modal.querySelectorAll('[data-field="link-file"]'));
    var links = labels.map(function (l, i) {
      var uploaded = uploadedLinkFiles.get(fileInputs[i]);
      if (uploaded) {
        return { label: l.value.trim(), url: uploaded.dataURL, fileName: uploaded.fileName };
      }
      var typed = urls[i].value.trim();
      if (typed) return { label: l.value.trim(), url: typed };
      // Untouched row: fall back to whatever it already had (a plain URL,
      // an already-attached file, or nothing) rather than wiping a file
      // out just because its input is shown blank for readability.
      var fileName = urls[i].getAttribute("data-original-filename") || "";
      var result = { label: l.value.trim(), url: urls[i].getAttribute("data-original-url") || "" };
      if (fileName) result.fileName = fileName;
      return result;
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

  var uploadedLinkFiles = new Map();

  function openModal(index) {
    editingIndex = index;
    uploadedLinkFiles.clear();
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
    if (e.target.matches('[data-field="link-file"]')) {
      var linkFile = e.target.files && e.target.files[0];
      if (!linkFile) return;
      var linkReader = new FileReader();
      linkReader.onload = function () {
        uploadedLinkFiles.set(e.target, { dataURL: linkReader.result, fileName: linkFile.name });
        var row = e.target.closest(".admin-link-row");
        var urlInput = row.querySelector('[data-field="link-url"]');
        urlInput.value = "";
        urlInput.placeholder = "(file attached)";
        var uploadBtn = row.querySelector(".admin-link-upload-btn");
        uploadBtn.classList.add("has-file");
        var title = "File attached: " + linkFile.name;
        uploadBtn.title = title;
        uploadBtn.setAttribute("aria-label", title);
      };
      linkReader.readAsDataURL(linkFile);
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

    if (action === "upload-link") {
      btn.closest(".admin-link-row").querySelector('[data-field="link-file"]').click();
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
})();
