async function loadProfiles() {
  try {
    const res = await fetch("/api/profiles");
    state.profiles = await res.json();
    if (state.profiles.length > 0 && !state.activeProfileId) {
      selectProfile(state.profiles[0].id);
    } else if (state.profiles.length === 0) {
      state.view = "profile_select";
      renderView();
    }
  } catch (e) {
    console.error("Failed to load profiles", e);
  }
}

async function selectProfile(id, targetView = "landing") {
  state.activeProfileId = id;
  try {
    const res = await fetch(`/api/profile/${id}`);
    const data = await res.json();
    state.profile = data.profile;
    state.inventory = data.inventory;
    state.world_objects = data.world_objects;
    state.stories = data.stories;
    updateHeader();
    applyThemeAndDialect();
    setView(targetView);
  } catch (e) {
    console.error("Failed to select profile", e);
  }
}

async function createNewProfilePrompt() {
  const name = prompt("Enter your explorer / classmate name:");
  if (!name) return;
  const yg = prompt("Enter your school year (2 to 6):", "3");
  if (!yg) return;

  try {
    const res = await fetch("/api/profiles/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        year_group: parseInt(yg) || 3,
        dialect: "UK",
        theme_mode: "pastel",
        dyslexia_font: false,
      }),
    });
    const newProf = await res.json();
    await loadProfiles();
    selectProfile(newProf.id);
  } catch (e) {
    alert("Failed to create profile");
  }
}

async function saveSendPref(field, val) {
  state.profile[field] = val;
  try {
    await fetch(`/api/profile/${state.activeProfileId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: state.profile.name,
        year_group: state.profile.year_group,
        dialect: state.profile.dialect,
        theme_mode: state.profile.theme_mode,
        dyslexia_font: state.profile.dyslexia_font,
      }),
    });
    applyThemeAndDialect();
    updateHeader();
    openSendSettings();
  } catch (e) {}
}

async function saveStoryAPI() {
  const title = document.getElementById("story-title-input").value.trim();
  const theme = document.getElementById("story-theme-input").value;
  const content = document.getElementById("story-content-input").value.trim();

  if (!title || !content) {
    alert("Please provide both a title and some story content!");
    return;
  }

  try {
    const res = await fetch("/api/stories/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile_id: state.activeProfileId,
        title,
        content,
        theme,
      }),
    });
    const data = await res.json();
    if (data.status === "success") {
      playSound("correct");
      selectProfile(state.activeProfileId);
      setView("stories");
    }
  } catch (e) {
    alert("Failed to save story");
  }
}

async function buyItem(itemId) {
  try {
    const res = await fetch("/api/avatar/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile_id: state.activeProfileId,
        item_id: itemId,
      }),
    });
    const data = await res.json();
    if (res.ok && data.status === "success") {
      playSound("correct");
      const profileRes = await fetch(`/api/profile/${state.activeProfileId}`);
      const profileData = await profileRes.json();
      state.profile = profileData.profile;
      state.inventory = profileData.inventory;
      updateHeader();
      renderView();
    } else {
      alert(
        data.detail ||
          "Not enough stars! Practice timetables or play word games to earn more ⭐.",
      );
    }
  } catch (e) {
    alert("Purchase failed");
  }
}

async function equipItem(slot, itemId) {
  try {
    const res = await fetch("/api/avatar/equip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile_id: state.activeProfileId,
        slot,
        item_id: itemId,
      }),
    });
    const data = await res.json();
    if (res.ok && data.status === "success") {
      playSound("click");
      state.profile.avatar_config = data.avatar_config;
      renderView();
    }
  } catch (e) {}
}

async function placeWorldObject(x, y) {
  try {
    playSound("click");
    const res = await fetch("/api/world/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        item_type: currentWorldBrush,
        x,
        y,
        color: "default",
      }),
    });
    if (res.ok) selectProfile(state.activeProfileId);
  } catch (e) {}
}

async function clearWorld() {
  try {
    await fetch("/api/world/clear", { method: "DELETE" });
    selectProfile(state.activeProfileId);
  } catch (e) {}
}

async function updateProfileAPI(name, year_group) {
  try {
    await fetch(`/api/profile/${state.activeProfileId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        year_group,
        dialect: state.profile.dialect,
        theme_mode: state.profile.theme_mode,
        dyslexia_font: state.profile.dyslexia_font,
      }),
    });
    selectProfile(state.activeProfileId);
  } catch (e) {}
}
