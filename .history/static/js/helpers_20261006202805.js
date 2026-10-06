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

function setView(v) {
  if (state.view === "practice" && state.practice.timerInterval) {
    clearInterval(state.practice.timerInterval);
  }
  state.view = v;
  renderView();
}

function renderView() {
  const container = document.getElementById("app-container");
  if (!container) return;
  container.innerHTML = "";
  if (typeof playSound === "function") playSound("click");

  if (state.view === "profile_select") {
    container.innerHTML = renderProfileSelectScreen();
  } else if (state.view === "landing") {
    container.innerHTML = renderLandingScreen();
  } else if (state.view === "dashboard") {
    container.innerHTML = renderDashboard();
  } else if (state.view === "curriculum_topics") {
    container.innerHTML = renderCurriculumTopicsScreen();
  } else if (state.view === "practice") {
    container.innerHTML = renderPracticeScreen();
    if (typeof startPracticeTimer === "function") startPracticeTimer();
  } else if (state.view === "wordgame") {
    container.innerHTML = renderWordGameScreen();
  } else if (state.view === "stories") {
    container.innerHTML = renderStoriesScreen();
  } else if (state.view === "writer") {
    container.innerHTML = renderStoryWriterScreen();
  } else if (state.view === "wardrobe") {
    container.innerHTML = renderWardrobeScreen();
  } else if (state.view === "world") {
    container.innerHTML = renderWorldBuilderScreen();
  } else if (state.view === "challenge") {
    container.innerHTML = renderChallengeScreen();
  }
}

function goToProfiles() {
  state.view = "profile_select";
  loadProfiles();
  renderView();
}
