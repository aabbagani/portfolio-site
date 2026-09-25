(function () {
  "use strict";

  if (document.body.getAttribute("data-page") !== "experience") return;

  var STORAGE_KEY = "portfolio_exp_photos_v1";

  // Shipped default photos, keyed by each exp-card's data-exp-id. Any id
  // with no entry here still gets a (currently empty) scrapbook once
  // Admin Mode is on, so a photo can be added to any role.
  var DEFAULT_DATA = {
    "lightskiddo": [],
    "blumetra-apm": [],
    "cure-foundation": [
      { src: "assets/experience/cure-foundation-1.jpg", caption: "At the Golf Charity Fundraiser with Padma Shri Dr Vijay Anand Reddy & Dr Shashi Palkonda" },
      { src: "assets/experience/cure-foundation-2.jpg", caption: "At the CURE Foundation Gala" },
      { src: "assets/experience/cure-foundation-3.jpg", caption: "Anchoring the Press Meet & Inauguration: Cancer Crusaders Golf Championship, alongside chief guests Jagapati Babu and Chaitanya Menon" }
    ],
    "stellantis": [
      { src: "assets/experience/stellantis-1.jpg", caption: "Contributions highlighted in Town Hall for driving operational efficiency" }
    ],
    "louisa-ai": [
      { src: "assets/experience/louisa-ai-1.jpg", caption: "With Muriel Daccache (Product Strategist) & Relina Vas (Product Manager)" }
    ],
    "blumetra-apm-intern": [],
    "rose-trust": [],
    "blumetra-ba": [],
    "sthirta": []
  };

  function cloneDefaults() { return JSON.parse(JSON.stringify(DEFAULT_DATA)); }

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return cloneDefaults();
  }

  var state = { data: load() };

  function save(next) {
    state.data = next;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
    render();
  }

  function reset() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    state.data = cloneDefaults();
    render();
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var ROTATIONS = [-6, 4, -8, 7, -4, 6, -3];

  function photoHTML(photo, i, admin) {
    var rot = ROTATIONS[i % ROTATIONS.length];
    return (
      '<figure class="scrap-photo" style="transform:rotate(' + rot + 'deg)">' +
        '<img src="' + esc(photo.src) + '" alt="' + esc(photo.caption || "") + '" onerror="this.classList.add(\'img-missing\')" />' +
        (photo.caption ? '<figcaption>' + esc(photo.caption) + "</figcaption>" : "") +
        (admin ? '<button type="button" class="scrap-remove" data-remove-index="' + i + '" aria-label="Remove photo">×</button>' : "") +
      "</figure>"
    );
  }

  function render() {
    var admin = document.body.classList.contains("admin-mode");
    document.querySelectorAll(".exp-card[data-exp-id]").forEach(function (card) {
      var id = card.getAttribute("data-exp-id");
      var photos = state.data[id] || [];
      var container = card.querySelector(".scrapbook");

      if (!photos.length && !admin) {
        // Nothing to show and no admin chrome needed — but a container may
        // already exist from when admin mode was last on, with a now-stale
        // "+ Add Photo" button, so remove it rather than leaving it behind.
        if (container) container.remove();
        return;
      }

      if (!container) {
        container = document.createElement("div");
        container.className = "scrapbook";
        card.appendChild(container);
      }
      var html = photos.map(function (p, i) { return photoHTML(p, i, admin); }).join("");
      if (admin) {
        html += '<button type="button" class="scrap-add" data-add-for="' + esc(id) + '">+ Add Photo</button>';
      }
      container.innerHTML = html;
    });
  }

  // ---- Admin interactions --------------------------------------------

  document.addEventListener("click", function (e) {
    var addBtn = e.target.closest(".scrap-add");
    if (addBtn) {
      var id = addBtn.getAttribute("data-add-for");
      var input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.addEventListener("change", function () {
        var file = input.files && input.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          var caption = prompt("Caption for this photo (optional):", "") || "";
          var next = JSON.parse(JSON.stringify(state.data));
          if (!next[id]) next[id] = [];
          next[id].push({ src: reader.result, caption: caption });
          save(next);
        };
        reader.readAsDataURL(file);
      });
      input.click();
      return;
    }

    var removeBtn = e.target.closest(".scrap-remove");
    if (removeBtn) {
      var card = removeBtn.closest(".exp-card[data-exp-id]");
      var expId = card.getAttribute("data-exp-id");
      var index = parseInt(removeBtn.getAttribute("data-remove-index"), 10);
      if (!confirm("Remove this photo?")) return;
      var updated = JSON.parse(JSON.stringify(state.data));
      updated[expId].splice(index, 1);
      save(updated);
    }
  });

  window.addEventListener("adminmode:change", function () {
    toolbar.style.display = window.isAdminMode() ? "flex" : "none";
    render();
  });

  // ---- Toolbar (export / reset) ---------------------------------------

  var toolbar = document.createElement("div");
  toolbar.className = "admin-toolbar";
  toolbar.style.display = window.isAdminMode && window.isAdminMode() ? "flex" : "none";
  toolbar.innerHTML =
    '<span class="admin-toolbar-label">Admin Mode — click + Add Photo on any role, or × to remove one</span>' +
    '<button type="button" class="admin-toolbar-btn" data-action="export">Export photos data</button>' +
    '<button type="button" class="admin-toolbar-btn" data-action="reset">Reset changes</button>';
  document.body.appendChild(toolbar);

  toolbar.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-action]");
    if (!btn) return;
    if (btn.getAttribute("data-action") === "reset") {
      if (confirm("Discard all photo edits and revert to the shipped set?")) reset();
    }
    if (btn.getAttribute("data-action") === "export") {
      var content =
        "// Default Experience scrapbook photos, keyed by exp-card data-exp-id.\n" +
        "// Generated by Admin Mode export on " + new Date().toISOString() + ".\n" +
        "// Paste this object into js/exp-photos.js as the DEFAULT_DATA constant.\n" +
        JSON.stringify(state.data, null, 2) + "\n";
      var blob = new Blob([content], { type: "text/javascript" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "exp-photos-data.js";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      alert("Downloaded exp-photos-data.js. Use it to update DEFAULT_DATA in js/exp-photos.js, then commit, to make your edits permanent for all visitors.");
    }
  });

  render();
})();
