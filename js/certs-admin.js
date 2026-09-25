(function () {
  "use strict";

  if (document.body.getAttribute("data-page") !== "home") return;

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function slugify(str) {
    return String(str || "").toLowerCase().trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || ("cert-" + Date.now());
  }

  function emptyCert() {
    return { id: "new-cert-" + Date.now(), name: "", issuer: "", date: "", url: "" };
  }

  // Buttons are appended to the shared home-page toolbar admin.js creates,
  // so the page only ever shows one floating admin bar.
  function wireToolbarButtons() {
    var toolbar = document.getElementById("home-admin-toolbar");
    if (!toolbar || toolbar.querySelector('[data-action="add-cert"]')) return;

    toolbar.insertAdjacentHTML(
      "beforeend",
      '<button type="button" class="admin-toolbar-btn" data-action="add-cert">+ Add Certification</button>' +
      '<button type="button" class="admin-toolbar-btn" data-action="export-certs">Export certs data</button>' +
      '<button type="button" class="admin-toolbar-btn" data-action="reset-certs">Reset cert changes</button>'
    );

    toolbar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) return;
      var action = btn.getAttribute("data-action");
      if (action === "add-cert") openModal(null);
      if (action === "export-certs") exportDataFile();
      if (action === "reset-certs") {
        if (confirm("Discard all Admin Mode edits and revert to the shipped certification list?")) {
          window.resetCerts();
        }
      }
    });
  }
  wireToolbarButtons();
  window.addEventListener("adminmode:change", function (e) {
    wireToolbarButtons();
    if (window.renderCertsGrid) window.renderCertsGrid();
  });

  document.addEventListener("click", function (e) {
    var editBtn = e.target.closest(".cert-edit-btn");
    if (!editBtn) return;
    openModal(parseInt(editBtn.getAttribute("data-edit-index"), 10));
  });

  var overlay = document.createElement("div");
  overlay.className = "admin-modal-overlay";
  overlay.style.display = "none";
  overlay.innerHTML = '<div class="admin-modal" role="dialog" aria-modal="true"></div>';
  document.body.appendChild(overlay);
  var modal = overlay.querySelector(".admin-modal");

  var editingIndex = null;

  function renderModal(cert) {
    modal.innerHTML =
      '<h3 class="admin-modal-title">' + (editingIndex === null ? "Add Certification" : "Edit Certification") + "</h3>" +

      '<label class="admin-label">Certification name</label>' +
      '<input type="text" class="admin-input" data-field="name" value="' + esc(cert.name) + '" />' +

      '<label class="admin-label">Issuer</label>' +
      '<input type="text" class="admin-input" data-field="issuer" value="' + esc(cert.issuer) + '" />' +

      '<label class="admin-label">Date</label>' +
      '<input type="text" class="admin-input" data-field="date" value="' + esc(cert.date) + '" />' +

      '<label class="admin-label">Certificate URL (leave blank for TBD)</label>' +
      '<input type="url" class="admin-input" data-field="url" value="' + esc(cert.url) + '" />' +

      '<div class="admin-modal-actions">' +
        (editingIndex === null ? "" : '<button type="button" class="admin-btn admin-btn-danger" data-action="delete">Delete</button>') +
        '<button type="button" class="admin-btn" data-action="cancel">Cancel</button>' +
        '<button type="button" class="admin-btn admin-btn-primary" data-action="save">Save</button>' +
      "</div>";
  }

  function openModal(index) {
    editingIndex = index;
    var cert = index === null ? emptyCert() : JSON.parse(JSON.stringify(window.getCerts()[index]));
    renderModal(cert);
    overlay.style.display = "flex";
  }

  function closeModal() {
    overlay.style.display = "none";
    editingIndex = null;
  }

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  modal.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");

    if (action === "cancel") return closeModal();

    if (action === "delete") {
      if (!confirm("Delete this certification? This can't be undone (unless you Reset changes).")) return;
      var certs = window.getCerts().slice();
      certs.splice(editingIndex, 1);
      window.setCerts(certs);
      closeModal();
      return;
    }

    if (action === "save") {
      var data = {
        name: modal.querySelector('[data-field="name"]').value.trim(),
        issuer: modal.querySelector('[data-field="issuer"]').value.trim(),
        date: modal.querySelector('[data-field="date"]').value.trim(),
        url: modal.querySelector('[data-field="url"]').value.trim()
      };
      if (!data.name) { alert("Give the certification a name before saving."); return; }
      var certs = window.getCerts().slice();
      if (editingIndex === null) {
        data.id = slugify(data.name);
        certs.push(data);
      } else {
        data.id = certs[editingIndex].id;
        certs[editingIndex] = data;
      }
      window.setCerts(certs);
      closeModal();
    }
  });

  function exportDataFile() {
    var certs = window.getCerts();
    var content =
      "// Source of truth for the Certifications grid. Generated by Admin Mode export on " +
      new Date().toISOString() + ".\n" +
      "window.CERTS_DATA = " + JSON.stringify(certs, null, 2) + ";\n";
    var blob = new Blob([content], { type: "text/javascript" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "certs-data.js";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    alert("Downloaded certs-data.js. Replace js/certs-data.js in the repo with this file and commit to make your edits permanent for all visitors.");
  }
})();
