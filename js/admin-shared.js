(function () {
  "use strict";

  var ADMIN_KEY = "portfolio_admin_mode_v1";

  function isAdminMode() {
    try { return localStorage.getItem(ADMIN_KEY) === "1"; } catch (e) { return false; }
  }

  // No visible toggle on the public site — Admin Mode is reached from the
  // browser console (window.setAdminMode(true)) rather than a page control,
  // so visitors never see an "Admin Mode" affordance.
  function setAdminMode(on) {
    try { localStorage.setItem(ADMIN_KEY, on ? "1" : "0"); } catch (e) {}
    document.body.classList.toggle("admin-mode", on);
    window.dispatchEvent(new CustomEvent("adminmode:change", { detail: { on: on } }));
  }

  window.isAdminMode = isAdminMode;
  window.setAdminMode = setAdminMode;
})();
