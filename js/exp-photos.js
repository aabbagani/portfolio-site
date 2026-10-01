(function () {
  "use strict";

  if (document.body.getAttribute("data-page") !== "experience") return;

  var STORAGE_KEY = "portfolio_exp_photos_v1";

  // Shipped default photos, keyed by each role's id (js/experience-data.js).
  // Any id with no entry here still gets a (currently empty) scrapbook once
  // Admin Mode is on, so a photo can be added to any role — including one
  // added through Admin Mode itself, whose id won't appear here at all.
  var DEFAULT_DATA = {
    "lightskiddo": [],
    "blumetra-apm": [],
    "cure-foundation": [
      { src: "assets/experience/cure-foundation-1.jpg", caption: "At the Golf Charity Fundraiser with Padma Shri Dr Vijay Anand Reddy & Dr Shashi Palkonda" },
      { src: "assets/experience/cure-foundation-2.jpg", caption: "At the CURE Foundation Gala" },
      { src: "assets/experience/cure-foundation-3.jpg", caption: "Anchoring the Press Meet & Inauguration: Cancer Crusaders Golf Championship, alongside chief guests Jagapati Babu and Chaitanya Menon" }
    ],
    "stellantis": [
      { src: "assets/experience/stellantis-1.webp", caption: "Contributions highlighted in Town Hall for driving operational efficiency", fit: "contain" }
    ],
    "louisa-ai": [
      { src: "assets/experience/louisa-ai-1.webp", caption: "With Muriel Daccache (Product Strategist) & Relina Vas (Product Manager)" }
    ],
    "blumetra-apm-intern": [],
    "rose-trust": [],
    "blumetra-ba": [],
    "sthirta": [
      { src: "assets/experience/sthirta-instagram.jpg", caption: "Sthirta's Instagram storefront" }
    ],
    "digital-delane": []
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

  function photoHTML(photo, i, admin) {
    // Most scrapbook photos are candids where a square crop still reads fine;
    // a screenshot (like a presentation slide) loses its point if cropped, so
    // `fit: "contain"` lets a specific photo show in full, letterboxed.
    var imgStyle = photo.fit === "contain" ? ' style="object-fit: contain; background: var(--bg-elevated);"' : "";
    return (
      '<figure class="scrap-photo">' +
        '<img src="' + esc(photo.src) + '" alt="' + esc(photo.caption || "") + '"' + imgStyle + ' onerror="this.classList.add(\'img-missing\')" />' +
        (photo.caption ? '<figcaption>' + esc(photo.caption) + "</figcaption>" : "") +
        (admin
          ? '<div class="scrap-controls">' +
            '<button type="button" class="scrap-edit" data-edit-index="' + i + '" aria-label="Replace photo">⤴</button>' +
            '<button type="button" class="scrap-caption" data-caption-index="' + i + '" aria-label="Edit caption">✎</button>' +
            '<button type="button" class="scrap-remove" data-remove-index="' + i + '" aria-label="Remove photo">×</button>' +
            "</div>"
          : "") +
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

  // Experience cards are re-created from scratch by experience-render.js on
  // every add/edit/delete/reorder — re-attach scrapbooks each time.
  window.addEventListener("experience:rendered", render);

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
      return;
    }

    var captionBtn = e.target.closest(".scrap-caption");
    if (captionBtn) {
      var captionCard = captionBtn.closest(".exp-card[data-exp-id]");
      var captionExpId = captionCard.getAttribute("data-exp-id");
      var captionIndex = parseInt(captionBtn.getAttribute("data-caption-index"), 10);
      var current = state.data[captionExpId][captionIndex];
      var nextCaption = prompt("Caption for this photo:", current.caption || "");
      if (nextCaption === null) return;
      var withCaption = JSON.parse(JSON.stringify(state.data));
      withCaption[captionExpId][captionIndex].caption = nextCaption;
      save(withCaption);
      return;
    }

    var editBtn = e.target.closest(".scrap-edit");
    if (editBtn) {
      var editCard = editBtn.closest(".exp-card[data-exp-id]");
      var editExpId = editCard.getAttribute("data-exp-id");
      var editIndex = parseInt(editBtn.getAttribute("data-edit-index"), 10);
      var replaceInput = document.createElement("input");
      replaceInput.type = "file";
      replaceInput.accept = "image/*";
      replaceInput.addEventListener("change", function () {
        var file = replaceInput.files && replaceInput.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function () {
          var withImage = JSON.parse(JSON.stringify(state.data));
          withImage[editExpId][editIndex].src = reader.result;
          save(withImage);
        };
        reader.readAsDataURL(file);
      });
      replaceInput.click();
    }
  });

  window.addEventListener("adminmode:change", render);

  // ---- Toolbar buttons (appended to the shared bar experience-admin.js
  // creates, so Experience only ever shows one floating admin toolbar) ---

  function wireToolbarButtons() {
    var toolbar = document.getElementById("exp-admin-toolbar");
    if (!toolbar || toolbar.querySelector('[data-action="reset-photos"]')) return;

    var resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "admin-toolbar-btn";
    resetBtn.setAttribute("data-action", "reset-photos");
    resetBtn.textContent = "Reset photo changes";
    resetBtn.addEventListener("click", function () {
      if (confirm("Discard all photo edits and revert to the shipped set?")) reset();
    });

    toolbar.appendChild(resetBtn);
  }
  wireToolbarButtons();
  window.addEventListener("adminmode:change", wireToolbarButtons);

  render();
})();
