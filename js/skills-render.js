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

  // A few standout skills get a filled, bolder treatment so a recruiter's
  // eye lands somewhere specific first instead of scanning ~40 tags evenly.
  var SIGNATURE_SKILLS = ["Roadmap Planning", "AI Prototyping", "Figma", "Cross-Functional Collaboration"];

  function groupHTML(group, gIndex) {
    var admin = document.body.classList.contains("admin-mode");
    var tags = (group.tags || []).map(function (tag, tIndex) {
      var signature = SIGNATURE_SKILLS.indexOf(tag) !== -1;
      return (
        '<span class="tag' + (signature ? " tag-signature" : "") + (admin ? " tag-admin" : "") + '">' +
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

    var num = String(gIndex + 1).padStart(2, "0");

    return (
      '<div class="skill-panel">' +
        '<div class="skill-panel-head">' +
          '<span class="skill-panel-num">' + num + '</span>' +
          '<span class="skill-panel-title">' + esc(group.title) + '</span>' +
        '</div>' +
        '<div class="tag-row">' + tags + addTagBtn + '</div>' +
        removeGroupBtn +
      '</div>'
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
