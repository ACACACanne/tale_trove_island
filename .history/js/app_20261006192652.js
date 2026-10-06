function openSettingsModal() {
  const name = prompt("Update your explorer name:", state.profile.name);
  const yg = prompt(
    "Update your school year (2 to 6):",
    state.profile.year_group,
  );
  if (name && yg) updateProfileAPI(name.trim(), parseInt(yg));
}

window.onload = () => {
  loadProfiles();
};
