(function () {
  "use strict";

  if (document.body.getAttribute("data-page") !== "experience") return;

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function slugify(str) {
    return String(str || "").toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || ("role-" + Date.now());
  }

  function emptyExperience() {
    return { id: "new-role-" + Date.now(), role: "", org: "", logo: "", location: "", dates: "", tags: [], bullets: [""], links: [] };
  }

  // ---- Toolbar (shared with exp-photos.js, which appends its own
  // buttons here so Experience only ever shows one floating admin bar) --
  var toolbar = document.createElement("div");
  toolbar.className = "admin-toolbar";
  toolbar.id = "exp-admin-toolbar";
  toolbar.style.display = window.isAdminMode() ? "flex" : "none";
  toolbar.innerHTML =
    '<span class="admin-toolbar-label">Admin Mode — editing Experience</span>' +
    '<button type="button" class="admin-toolbar-btn" data-action="add">+ Add Role</button>' +
    '<button type="button" class="admin-toolbar-btn" data-action="reset">Reset changes</button>';
  document.body.appendChild(toolbar);

  window.addEventListener("adminmode:change", function (e) {
    toolbar.style.display = e.detail.on ? "flex" : "none";
    if (window.renderExperienceTimeline) window.renderExperienceTimeline(true);
  });

  toolbar.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");
    if (action === "add") openModal(null);
    if (action === "reset") {
      if (confirm("Discard all Admin Mode edits and revert to the shipped role list?")) {
        window.resetExperience();
      }
    }
  });

  // Edit/move clicks are on cards re-rendered by experience-render.js
  document.addEventListener("click", function (e) {
    var editBtn = e.target.closest(".exp-card .project-edit-btn");
    if (editBtn) {
      openModal(parseInt(editBtn.getAttribute("data-edit-index"), 10));
      return;
    }

    var moveBtn = e.target.closest(".exp-move-btn:not(.exp-move-btn-disabled)");
    if (moveBtn) {
      var from = parseInt(moveBtn.getAttribute("data-move-index"), 10);
      var dir = moveBtn.getAttribute("data-dir");
      var to = dir === "up" ? from - 1 : from + 1;
      var list = window.getExperience().slice();
      if (to < 0 || to >= list.length) return;
      var tmp = list[from];
      list[from] = list[to];
      list[to] = tmp;
      window.setExperience(list, { animate: false });
    }
  });

  // ---- Modal -------------------------------------------------------------

  var overlay = document.createElement("div");
  overlay.className = "admin-modal-overlay";
  overlay.style.display = "none";
  overlay.innerHTML = '<div class="admin-modal" role="dialog" aria-modal="true"></div>';
  document.body.appendChild(overlay);
  var modal = overlay.querySelector(".admin-modal");

  var editingIndex = null;

  function linkRowHTML(link, i) {
    return (
      '<div class="admin-link-row" data-link-row="' + i + '">' +
        '<input type="text" class="admin-input" data-field="link-label" data-i="' + i + '" placeholder="Label (e.g. View Presentation)" value="' + esc(link.label) + '" />' +
        '<input type="url" class="admin-input" data-field="link-url" data-i="' + i + '" placeholder="https:// (leave blank for TBD)" value="' + esc(link.url) + '" />' +
        '<button type="button" class="admin-icon-btn" data-action="remove-link" data-i="' + i + '" aria-label="Remove link">×</button>' +
      "</div>"
    );
  }

  function renderModal(exp) {
    var links = exp.links || [];
    modal.innerHTML =
      '<h3 class="admin-modal-title">' + (editingIndex === null ? "Add Role" : "Edit Role") + "</h3>" +

      '<label class="admin-label">Role / title</label>' +
      '<input type="text" class="admin-input" data-field="role" value="' + esc(exp.role) + '" />' +

      '<label class="admin-label">Organization</label>' +
      '<input type="text" class="admin-input" data-field="org" value="' + esc(exp.org) + '" />' +

      '<label class="admin-label">Organization logo (URL/path, or upload below — leave blank for a monogram)</label>' +
      '<input type="text" class="admin-input" data-field="logo" value="' + esc(exp.logo || "") + '" />' +
      '<input type="file" accept="image/*" class="admin-file" data-field="logo-file" />' +
      (exp.logo ? '<img class="admin-cover-preview" src="' + esc(exp.logo) + '" alt="" style="max-height:80px;object-fit:contain;background:#fff;" />' : "") +

      '<label class="admin-label">Location</label>' +
      '<input type="text" class="admin-input" data-field="location" value="' + esc(exp.location) + '" />' +

      '<label class="admin-label">Dates</label>' +
      '<input type="text" class="admin-input" data-field="dates" value="' + esc(exp.dates) + '" />' +

      '<label class="admin-label">Tags (comma-separated)</label>' +
      '<input type="text" class="admin-input" data-field="tags" value="' + esc((exp.tags || []).join(", ")) + '" />' +

      '<label class="admin-label">Bullets (one per line)</label>' +
      '<textarea class="admin-input admin-textarea" data-field="bullets" style="min-height:160px">' + esc((exp.bullets || []).join("\n")) + "</textarea>" +

      '<label class="admin-label">Links</label>' +
      '<div class="admin-links">' + links.map(linkRowHTML).join("") + "</div>" +
      '<button type="button" class="admin-toolbar-btn" data-action="add-link">+ Add link</button>' +

      '<div class="admin-modal-actions">' +
        (editingIndex === null ? "" : '<button type="button" class="admin-btn admin-btn-danger" data-action="delete">Delete</button>') +
        '<button type="button" class="admin-btn" data-action="cancel">Cancel</button>' +
        '<button type="button" class="admin-btn admin-btn-primary" data-action="save">Save</button>' +
      "</div>";
  }

  function currentModalExperience() {
    var labels = Array.prototype.slice.call(modal.querySelectorAll('[data-field="link-label"]'));
    var urls = Array.prototype.slice.call(modal.querySelectorAll('[data-field="link-url"]'));
    var links = labels.map(function (l, i) {
      return { label: l.value.trim(), url: urls[i].value.trim() };
    }).filter(function (l) { return l.label; });

    return {
      role: modal.querySelector('[data-field="role"]').value.trim(),
      org: modal.querySelector('[data-field="org"]').value.trim(),
      logo: modal.querySelector('[data-field="logo"]').value.trim(),
      location: modal.querySelector('[data-field="location"]').value.trim(),
      dates: modal.querySelector('[data-field="dates"]').value.trim(),
      tags: modal.querySelector('[data-field="tags"]').value.split(",").map(function (t) { return t.trim(); }).filter(Boolean),
      bullets: modal.querySelector('[data-field="bullets"]').value.split("\n").map(function (b) { return b.trim(); }).filter(Boolean),
      links: links
    };
  }

  function openModal(index) {
    editingIndex = index;
    var exp = index === null ? emptyExperience() : JSON.parse(JSON.stringify(window.getExperience()[index]));
    renderModal(exp);
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
    if (!e.target.matches('[data-field="logo-file"]')) return;
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      modal.querySelector('[data-field="logo"]').value = reader.result;
      var preview = modal.querySelector(".admin-cover-preview");
      if (!preview) {
        preview = document.createElement("img");
        preview.className = "admin-cover-preview";
        preview.style.cssText = "max-height:80px;object-fit:contain;background:#fff;";
        e.target.after(preview);
      }
      preview.src = reader.result;
    };
    reader.readAsDataURL(file);
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
      if (!confirm("Delete this role? This can't be undone (unless you Reset changes).")) return;
      var list = window.getExperience().slice();
      list.splice(editingIndex, 1);
      window.setExperience(list, { animate: false });
      closeModal();
      return;
    }

    if (action === "save") {
      var data = currentModalExperience();
      if (!data.role) { alert("Give the role a title before saving."); return; }
      var experience = window.getExperience().slice();
      if (editingIndex === null) {
        data.id = slugify(data.role + "-" + data.org);
        experience.push(data);
      } else {
        // The modal only edits the plain fields — carry over stats/
        // highlights (the "at a glance" numbers and worked-on cards),
        // which aren't editable here, so saving doesn't wipe them.
        var previous = experience[editingIndex];
        data.id = previous.id;
        if (previous.stats) data.stats = previous.stats;
        if (previous.highlights) data.highlights = previous.highlights;
        experience[editingIndex] = data;
      }
      window.setExperience(experience, { animate: false });
      closeModal();
    }
  });
})();
