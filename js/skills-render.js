(function () {
  "use strict";

  var STORAGE_KEY = "portfolio_skills_override_v1";
  window.SKILLS_STORAGE_KEY = STORAGE_KEY;

  function loadSkills() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return window.SKILLS_DATA.map(function (g) { return JSON.parse(JSON.stringify(g)); });
  }

  var state = { groups: loadSkills() };

  function getSkills() { return state.groups; }

  function setSkills(next) {
    state.groups = next;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
    renderSkills();
  }

  function resetSkills() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    state.groups = window.SKILLS_DATA.map(function (g) { return JSON.parse(JSON.stringify(g)); });
    renderSkills();
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function groupHTML(group, gIndex) {
    var admin = document.body.classList.contains("admin-mode");
    var tags = (group.tags || []).map(function (tag, tIndex) {
      return (
        '<span class="tag' + (admin ? " tag-admin" : "") + '">' +
          esc(tag) +
          (admin ? '<button type="button" class="tag-remove" data-group-index="' + gIndex + '" data-tag-index="' + tIndex + '" aria-label="Remove tag">×</button>' : "") +
        "</span>"
      );
    }).join("");

    var addTagBtn = admin
      ? '<button type="button" class="tag tag-add" data-add-tag-for="' + gIndex + '">+ Add tag</button>'
      : "";

    var removeGroupBtn = admin
      ? '<button type="button" class="skill-group-remove" data-remove-group="' + gIndex + '" aria-label="Delete group">Delete group</button>'
      : "";

    return (
      '<div class="skill-card" data-group-index="' + gIndex + '">' +
        "<h3>" + esc(group.title) + "</h3>" +
        '<div class="tag-row">' + tags + addTagBtn + "</div>" +
        removeGroupBtn +
      "</div>"
    );
  }

  function renderSkills() {
    var mount = document.getElementById("skill-groups");
    if (!mount) return;
    mount.innerHTML = state.groups.map(groupHTML).join("");
  }

  window.getSkills = getSkills;
  window.setSkills = setSkills;
  window.resetSkills = resetSkills;
  window.renderSkillGroups = renderSkills;

  renderSkills();
})();
