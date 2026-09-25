(function () {
  "use strict";

  var STORAGE_KEY = "portfolio_certs_override_v1";
  window.CERTS_STORAGE_KEY = STORAGE_KEY;

  function loadCerts() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return window.CERTS_DATA.map(function (c) { return JSON.parse(JSON.stringify(c)); });
  }

  var state = { certs: loadCerts() };

  function getCerts() { return state.certs; }

  function setCerts(next) {
    state.certs = next;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
    renderCerts();
  }

  function resetCerts() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    state.certs = window.CERTS_DATA.map(function (c) { return JSON.parse(JSON.stringify(c)); });
    renderCerts();
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function cardHTML(cert, index) {
    var admin = document.body.classList.contains("admin-mode");
    var link = cert.url
      ? '<a class="link-chip" href="' + esc(cert.url) + '" target="_blank" rel="noopener">Certificate</a>'
      : '<span class="link-chip" data-tbd="true">Certificate</span>';
    var editBtn = admin
      ? '<button type="button" class="cert-edit-btn" data-edit-index="' + index + '" aria-label="Edit certification">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>' +
        "</button>"
      : "";
    return (
      '<div class="cert-card" data-index="' + index + '">' +
        editBtn +
        "<div>" +
          '<div class="cert-name">' + esc(cert.name) + "</div>" +
          '<div class="cert-meta">' + esc(cert.issuer) + " · " + esc(cert.date) + "</div>" +
        "</div>" +
        link +
      "</div>"
    );
  }

  function renderCerts() {
    var mount = document.getElementById("cert-grid");
    if (!mount) return;
    mount.innerHTML = state.certs.map(cardHTML).join("");
  }

  window.getCerts = getCerts;
  window.setCerts = setCerts;
  window.resetCerts = resetCerts;
  window.renderCertsGrid = renderCerts;

  renderCerts();
})();
