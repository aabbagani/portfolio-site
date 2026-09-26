(function () {
  "use strict";

  if (document.body.getAttribute("data-page") !== "home") return;

  // Buttons are appended to the shared home-page toolbar admin.js creates,
  // so the page only ever shows one floating admin bar.
  function wireToolbarButtons() {
    var toolbar = document.getElementById("home-admin-toolbar");
    if (!toolbar || toolbar.querySelector('[data-action="add-skill-group"]')) return;

    toolbar.insertAdjacentHTML(
      "beforeend",
      '<button type="button" class="admin-toolbar-btn" data-action="add-skill-group">+ Add Skill Group</button>' +
      '<button type="button" class="admin-toolbar-btn" data-action="reset-skills">Reset skills changes</button>'
    );

    toolbar.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-action]");
      if (!btn) return;
      var action = btn.getAttribute("data-action");

      if (action === "add-skill-group") {
        var title = prompt("Name for the new skill group:", "");
        if (!title || !title.trim()) return;
        var groups = window.getSkills().slice();
        groups.push({ id: "group-" + Date.now(), title: title.trim(), tags: [] });
        window.setSkills(groups);
      }

      if (action === "reset-skills") {
        if (confirm("Discard all Admin Mode edits and revert to the shipped skill groups?")) {
          window.resetSkills();
        }
      }
    });
  }
  wireToolbarButtons();
  window.addEventListener("adminmode:change", function (e) {
    wireToolbarButtons();
    if (window.renderSkillGroups) window.renderSkillGroups();
  });

  document.addEventListener("click", function (e) {
    var addTagBtn = e.target.closest("[data-add-tag-for]");
    if (addTagBtn) {
      var gIndex = parseInt(addTagBtn.getAttribute("data-add-tag-for"), 10);
      var tag = prompt("New skill tag:", "");
      if (!tag || !tag.trim()) return;
      var groups = window.getSkills().slice();
      groups[gIndex] = JSON.parse(JSON.stringify(groups[gIndex]));
      groups[gIndex].tags.push(tag.trim());
      window.setSkills(groups);
      return;
    }

    var removeTagBtn = e.target.closest(".tag-remove");
    if (removeTagBtn) {
      var gi = parseInt(removeTagBtn.getAttribute("data-group-index"), 10);
      var ti = parseInt(removeTagBtn.getAttribute("data-tag-index"), 10);
      var groupsR = window.getSkills().slice();
      groupsR[gi] = JSON.parse(JSON.stringify(groupsR[gi]));
      groupsR[gi].tags.splice(ti, 1);
      window.setSkills(groupsR);
      return;
    }

    var removeGroupBtn = e.target.closest("[data-remove-group]");
    if (removeGroupBtn) {
      var idx = parseInt(removeGroupBtn.getAttribute("data-remove-group"), 10);
      if (!confirm("Delete this whole skill group? This can't be undone (unless you Reset changes).")) return;
      var groupsD = window.getSkills().slice();
      groupsD.splice(idx, 1);
      window.setSkills(groupsD);
    }
  });
})();
