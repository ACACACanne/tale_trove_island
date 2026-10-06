function updateHeader() {
  const starEl = document.getElementById("header-stars");
  const badgeEl = document.getElementById("current-user-badge");
  const footerEl = document.getElementById("dialect-footer-badge");
  if (starEl) starEl.textContent = state.profile.stars;
  if (badgeEl) badgeEl.textContent = state.profile.name;
  if (footerEl)
    footerEl.textContent =
      state.profile.dialect === "UK" ? "Dialect: UK 🇬🇧" : "Dialect: US 🇺🇸";
}

function applyThemeAndDialect() {
  const root = document.getElementById("body-root");
  if (!root) return;
  if (state.profile.theme_mode === "pastel") {
    root.className =
      "bg-gradient-to-br from-slate-900 via-teal-950 to-indigo-950 min-h-screen text-slate-100 font-sans flex flex-col items-center justify-between p-3 sm:p-6 select-none transition-colors duration-300";
  } else {
    root.className =
      "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 min-h-screen text-white font-sans flex flex-col items-center justify-between p-3 sm:p-6 select-none transition-colors duration-300";
  }

  if (state.profile.dyslexia_font) {
    root.classList.add("font-dyslexia", "dyslexia-spacing");
  } else {
    root.classList.remove("font-dyslexia", "dyslexia-spacing");
  }
}

function goToProfiles() {
  state.view = "profile_select";
  loadProfiles();
  renderView();
}
