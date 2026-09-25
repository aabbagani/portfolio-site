(function () {
  "use strict";

  var ADMIN_KEY = "portfolio_admin_mode_v1";

  function isAdminMode() {
    try { return localStorage.getItem(ADMIN_KEY) === "1"; } catch (e) { return false; }
  }

  var toggleBtn = document.createElement("button");
  toggleBtn.type = "button";
  toggleBtn.className = "admin-toggle";
  document.body.appendChild(toggleBtn);

  function paintToggle(on) {
    toggleBtn.textContent = on ? "Exit Admin Mode" : "Admin Mode";
    toggleBtn.classList.toggle("is-active", on);
  }
  paintToggle(isAdminMode());

  function setAdminMode(on) {
    try { localStorage.setItem(ADMIN_KEY, on ? "1" : "0"); } catch (e) {}
    document.body.classList.toggle("admin-mode", on);
    paintToggle(on);
    window.dispatchEvent(new CustomEvent("adminmode:change", { detail: { on: on } }));
  }

  toggleBtn.addEventListener("click", function () { setAdminMode(!isAdminMode()); });

  window.isAdminMode = isAdminMode;
  window.setAdminMode = setAdminMode;
})();
