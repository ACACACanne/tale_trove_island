function getItemEmoji(itemId) {
  const map = {
    hat_crown: "👑",
    hat_cap: "🧢",
    hat_wizard: "🧙‍♂️",
    glasses_cool: "🕶️",
    glasses_nerd: "👓",
    outfit_hero: "🦸‍♂️",
    outfit_dino: "🦖",
    pet_bunny: "🐰",
    pet_dragon: "🐉",
  };
  return map[itemId] || "";
}

function getEquippedEmoji(slot) {
  const config = state.profile.avatar_config || {};
  const itemId = config[slot];
  return getItemEmoji(itemId);
}

function getBaseAvatar() {
  const config = state.profile.avatar_config || {};
  return config.base || "🐵";
}

function renderFullBodyAvatar(containerClass = "w-40 h-56 sm:w-48 sm:h-64") {
  const petId = state.profile.avatar_config?.pet;
  const outfitEmoji = getEquippedEmoji("outfit");

  return `
        <div class="${containerClass} bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 rounded-3xl flex flex-col items-center justify-between p-4 shadow-2xl border-4 border-white/30 relative overflow-visible">
            <!-- Top Hat Slot -->
            <div class="h-10 flex items-center justify-center text-4xl sm:text-5xl z-30 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                ${getEquippedEmoji("hat")}
            </div>

            <!-- Head & Glasses Center Zone -->
            <div class="relative flex flex-col items-center justify-center my-auto">
                <div class="text-6xl sm:text-7xl select-none z-10 filter drop-shadow-md">${getBaseAvatar()}</div>
                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl sm:text-3xl z-20 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    ${getEquippedEmoji("glasses")}
                </div>
            </div>

            <!-- Torso / Outfit Zone -->
            <div class="h-12 flex items-center justify-center text-3xl sm:text-4xl z-20 drop-shadow-md bg-white/10 backdrop-blur-sm px-4 py-1 rounded-2xl border border-white/20">
                ${outfitEmoji || '<span class="text-[10px] text-white/40 font-semibold tracking-wider">NO OUTFIT</span>'}
            </div>

            <!-- Pet Companion Corner Badge -->
            ${
              petId
                ? `
                <div class="absolute -bottom-2 -right-2 text-3xl sm:text-4xl z-40 drop-shadow-lg bg-black/60 backdrop-blur-md rounded-2xl p-1.5 border border-white/30 animate-bounce">
                    ${getEquippedEmoji("pet")}
                </div>
            `
                : ""
            }
        </div>
    `;
}

function renderProfileSelectScreen() {
  return `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md sm:max-w-xl w-full flex flex-col gap-5 text-center animate-fadeIn">
            <span class="text-5xl sm:text-6xl floating">🎒✨</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-yellow-300">Who is playing today?</h2>
            <p class="text-white/80 text-xs sm:text-sm">Select your name or create a new profile to track your stars and stories!</p>

            <div class="grid grid-cols-1 gap-2.5 sm:gap-3 max-h-56 sm:max-h-60 overflow-y-auto pr-1">
                ${state.profiles
                  .map(
                    (p) => `
                    <button onclick="selectProfile(${p.id})" class="bg-white/20 hover:bg-white/30 border border-white/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl flex justify-between items-center shadow-lg transition bounce-hover text-left">
                        <div class="flex items-center gap-2.5 sm:gap-3">
                            <span class="text-2xl sm:text-3xl">🐵</span>
                            <div>
                                <h4 class="font-bold text-base sm:text-lg text-yellow-200">${p.name}</h4>
                                <p class="text-[11px] sm:text-xs text-white/70">Year ${p.year_group} • ⭐ ${p.stars} Stars</p>
                            </div>
                        </div>
                        <span class="bg-emerald-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold shadow">Play! 🚀</span>
                    </button>
                `,
                  )
                  .join("")}
            </div>

            <button onclick="createNewProfilePrompt()" class="bg-gradient-to-r from-teal-500 to-cyan-500 hover:scale-105 text-white font-extrabold py-3.5 sm:py-4 px-4 rounded-xl sm:rounded-2xl shadow-xl transition text-base sm:text-lg mt-1">
                + Create New Classmate Profile 🌟
            </button>
        </div>
    `;
}

function openSendSettings() {
  const p = state.profile;
  const container = document.getElementById("app-container");
  container.innerHTML = `
        <div class="bg-white/15 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md sm:max-w-lg w-full flex flex-col gap-5 text-center animate-fadeIn">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-yellow-300">🧠 SEND & Accessibility</h2>
                <button onclick="setView('dashboard')" class="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold">⬅️ Back</button>
            </div>

            <div class="flex flex-col gap-4 text-left">
                <div class="bg-black/20 p-3.5 sm:p-4 rounded-2xl border border-white/10">
                    <label class="block font-bold text-sm sm:text-base text-teal-300 mb-2">English Dialect (Spelling & Writing)</label>
                    <div class="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <button onclick="saveSendPref('dialect', 'UK')" class="p-2.5 sm:p-3 rounded-xl font-bold text-xs sm:text-sm border-2 ${p.dialect === "UK" ? "bg-teal-600 border-teal-300 shadow-lg" : "bg-white/10 border-white/20"}">
                            🇬🇧 British English
                        </button>
                        <button onclick="saveSendPref('dialect', 'US')" class="p-2.5 sm:p-3 rounded-xl font-bold text-xs sm:text-sm border-2 ${p.dialect === "US" ? "bg-teal-600 border-teal-300 shadow-lg" : "bg-white/10 border-white/20"}">
                            🇺🇸 American English
                        </button>
                    </div>
                </div>

                <div class="bg-black/20 p-3.5 sm:p-4 rounded-2xl border border-white/10">
                    <label class="block font-bold text-sm sm:text-base text-pink-300 mb-2">Sensory Theme (Autism / ADHD Friendly)</label>
                    <div class="grid grid-cols-2 gap-2.5 sm:gap-3">
                        <button onclick="saveSendPref('theme_mode', 'pastel')" class="p-2.5 sm:p-3 rounded-xl font-bold text-xs sm:text-sm border-2 ${p.theme_mode === "pastel" ? "bg-pink-600 border-pink-300 shadow-lg" : "bg-white/10 border-white/20"}">
                            🌿 Cozy Pastel
                        </button>
                        <button onclick="saveSendPref('theme_mode', 'vibrant')" class="p-2.5 sm:p-3 rounded-xl font-bold text-xs sm:text-sm border-2 ${p.theme_mode === "vibrant" ? "bg-pink-600 border-pink-300 shadow-lg" : "bg-white/10 border-white/20"}">
                            ✨ Vibrant Neon
                        </button>
                    </div>
                </div>

                <div class="bg-black/20 p-3.5 sm:p-4 rounded-2xl border border-white/10 flex justify-between items-center gap-3">
                    <div class="text-left">
                        <h4 class="font-bold text-sm sm:text-base text-yellow-300">Dyslexia-Friendly Font & Spacing</h4>
                        <p class="text-[11px] sm:text-xs text-white/70">Increases letter spacing and legibility.</p>
                    </div>
                    <button onclick="saveSendPref('dyslexia_font', ${!p.dyslexia_font})" class="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shrink-0 ${p.dyslexia_font ? "bg-emerald-600 text-white" : "bg-white/20 text-white/70"}">
                        ${p.dyslexia_font ? "ENABLED ✓" : "DISABLED"}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function renderLandingScreen() {
  const dialectLabel =
    state.profile.dialect === "UK"
      ? "British English 🇬🇧"
      : "American English 🇺🇸";
  return `
        <div class="flex flex-col items-center text-center gap-6 sm:gap-8 w-full max-w-xl sm:max-w-2xl p-5 sm:p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl shadow-2xl animate-fadeIn">
            <div class="text-6xl sm:text-7xl floating">🏝️✨</div>
            <h2 class="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-yellow-300 via-pink-300 to-teal-300 bg-clip-text text-transparent">Welcome, ${state.profile.name}!</h2>
            
            <p class="text-base sm:text-xl text-white/90 leading-relaxed font-semibold">
                Are you ready for Tale Trove Island where <span class="text-yellow-300">math turns to treasure, reading unlocks magic, and every story sparks an adventure?</span>
            </p>

            <div class="bg-black/20 px-3.5 sm:px-4 py-2 rounded-xl border border-white/10 text-xs text-teal-300 font-semibold">
                👤 Active Profile: ${state.profile.name} (Year ${state.profile.year_group}) • ${dialectLabel}
            </div>

            <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button onclick="setView('dashboard')" class="bg-gradient-to-r from-yellow-400 via-pink-500 to-teal-400 hover:scale-105 text-gray-900 font-extrabold text-base sm:text-lg py-3.5 sm:py-4 px-8 rounded-full shadow-2xl transition transform active:scale-95 border-2 border-white/40">
                    Start Adventure! 🚀
                </button>
                <button onclick="goToProfiles()" class="bg-white/20 hover:bg-white/30 font-bold py-3.5 sm:py-4 px-6 rounded-full shadow-lg transition text-sm sm:text-base">
                    Switch Profile
                </button>
            </div>
        </div>
    `;
}

function renderDashboard() {
  const p = state.profile;
  return `
        <div class="flex flex-col items-center gap-6 sm:gap-8 w-full animate-fadeIn">
            <div class="text-center flex justify-between items-center w-full px-2 sm:px-4">
                <button onclick="setView('landing')" class="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl text-xs font-bold">⬅️ Home</button>
                <div>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-yellow-300 drop-shadow-md">Hello, ${p.name}! ✨</h2>
                    <p class="text-white/80 text-xs sm:text-sm mt-0.5">What fun adventure would you like to explore today?</p>
                </div>
                <button onclick="goToProfiles()" class="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-xl text-xs font-bold">👤 Switch</button>
            </div>

            <!-- Full Body Avatar Card -->
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col items-center gap-4 relative floating">
                ${renderFullBodyAvatar()}
                <div class="text-center mt-1">
                    <span class="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">School Year ${p.year_group} Explorer (${p.dialect})</span>
                </div>
            </div>

            <!-- Action Grid Buttons -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-2xl">
                <button onclick="startPracticeSetup()" class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex items-center gap-4 sm:gap-5 bounce-hover border-2 border-emerald-300 text-left">
                    <span class="text-4xl sm:text-5xl bg-white/20 p-3 sm:p-4 rounded-2xl shrink-0">🎯</span>
                    <div>
                        <h3 class="text-xl sm:text-2xl font-bold">Practice Timetables</h3>
                        <p class="text-emerald-100 text-xs sm:text-sm">Gentle math practice & timers!</p>
                    </div>
                </button>

                <button onclick="startWordGame()" class="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex items-center gap-4 sm:gap-5 bounce-hover border-2 border-teal-300 text-left">
                    <span class="text-4xl sm:text-5xl bg-white/20 p-3 sm:p-4 rounded-2xl shrink-0">📦</span>
                    <div>
                        <h3 class="text-xl sm:text-2xl font-bold">Pet Box Word Game</h3>
                        <p class="text-teal-100 text-xs sm:text-sm">Free the pets with spelling & reading!</p>
                    </div>
                </button>

                <button onclick="setView('stories')" class="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex items-center gap-4 sm:gap-5 bounce-hover border-2 border-pink-300 text-left">
                    <span class="text-4xl sm:text-5xl bg-white/20 p-3 sm:p-4 rounded-2xl shrink-0">📖</span>
                    <div>
                        <h3 class="text-xl sm:text-2xl font-bold">Magical Story Creator</h3>
                        <p class="text-pink-100 text-xs sm:text-sm">Write in ${p.dialect === "UK" ? "British" : "American"} English!</p>
                    </div>
                </button>

                <button onclick="setView('wardrobe')" class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex items-center gap-4 sm:gap-5 bounce-hover border-2 border-purple-300 text-left">
                    <span class="text-4xl sm:text-5xl bg-white/20 p-3 sm:p-4 rounded-2xl shrink-0">👕</span>
                    <div>
                        <h3 class="text-xl sm:text-2xl font-bold">Avatar Wardrobe</h3>
                        <p class="text-purple-100 text-xs sm:text-sm">Dress up your character with stars!</p>
                    </div>
                </button>

                <button onclick="setView('challenge')" class="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex items-center gap-4 sm:gap-5 bounce-hover border-2 border-amber-300 text-left">
                    <span class="text-4xl sm:text-5xl bg-white/20 p-3 sm:p-4 rounded-2xl shrink-0">⚡</span>
                    <div>
                        <h3 class="text-xl sm:text-2xl font-bold">Speed Challenge</h3>
                        <p class="text-amber-100 text-xs sm:text-sm">Test your ninja speed for bonus stars!</p>
                    </div>
                </button>

                <button onclick="setView('world')" class="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-xl flex items-center gap-4 sm:gap-5 bounce-hover border-2 border-blue-300 text-left">
                    <span class="text-4xl sm:text-5xl bg-white/20 p-3 sm:p-4 rounded-2xl shrink-0">🏝️</span>
                    <div>
                        <h3 class="text-xl sm:text-2xl font-bold">Sunday World Builder</h3>
                        <p class="text-blue-100 text-xs sm:text-sm">Build your dream world & pets!</p>
                    </div>
                </button>
            </div>

            <button onclick="openSettingsModal()" class="text-xs sm:text-sm text-white/70 hover:text-white underline cursor-pointer">
                ⚙️ Update Name / School Year
            </button>
        </div>
    `;
}

function renderPracticeScreen() {
  const pr = state.practice;
  if (pr.currentIndex >= pr.questions.length) {
    finishPracticeSession();
    return `<div class="text-center"><h2 class="text-2xl sm:text-3xl font-bold text-yellow-300 animate-bounce">🎉 Amazing Job! Saving your stars...</h2></div>`;
  }

  const q = pr.questions[pr.currentIndex];

  return `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md sm:max-w-xl w-full flex flex-col items-center gap-5 relative">
            <div class="w-full flex justify-between items-center text-xs sm:text-sm font-semibold text-white/80">
                <span>Question ${pr.currentIndex + 1} / ${pr.session_length}</span>
                <div class="flex items-center gap-2">
                    <button onclick="speakText('${q.a} times ${q.b}')" class="bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full text-xs" title="Read Aloud (TTS)">🔊 Listen</button>
                    ${pr.level !== "easy" ? `<div class="bg-red-500/20 border border-red-400 px-2.5 py-0.5 rounded-full text-red-300 flex items-center gap-1 text-xs">⏱️ <span id="timer-display">${pr.timer}</span>s</div>` : ""}
                </div>
            </div>

            <div class="bg-white/25 border-4 border-white/40 px-6 sm:px-10 py-6 sm:py-8 rounded-2xl sm:rounded-3xl shadow-2xl text-center w-full">
                <span class="text-4xl sm:text-5xl font-extrabold tracking-wider text-yellow-200">${q.a} × ${q.b} = ?</span>
            </div>

            <div id="options-grid" class="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                ${generateOptions(q.answer)
                  .map(
                    (opt) => `
                    <button onclick="submitAnswer(${opt},${q.answer})" class="bg-white/20 hover:bg-white/30 border-2 border-white/30 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-2xl sm:text-3xl font-bold shadow-lg transition transform active:scale-95">${opt}</button>
                `,
                  )
                  .join("")}
            </div>

            <div id="gentle-modal" class="hidden absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center p-5 text-center animate-fadeIn">
                <span class="text-4xl sm:text-5xl mb-2">🐱</span>
                <h3 class="text-xl sm:text-2xl font-bold text-yellow-300">Need a little extra time, superstar?</h3>
                <p class="text-white/80 text-xs sm:text-sm mt-1 mb-5">Take all the time you need! No rush here.</p>
                <button onclick="addExtraTime()" class="bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 font-extrabold px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-lg hover:scale-105 transition text-sm sm:text-base">Yes, give me +10 seconds! ⏰</button>
            </div>
        </div>
    `;
}

function renderWordGameScreen() {
  const wg = state.wordGame;
  const wordList = state.profile.dialect === "UK" ? wg.wordsUK : wg.wordsUS;

  if (wg.currentIndex >= wordList.length) {
    return `<div class="text-center"><h2 class="text-2xl sm:text-3xl font-bold text-yellow-300 animate-bounce">🎉 All Pets Rescued! Saving your stars...</h2></div>`;
  }

  let displayWordHTML = "";
  let wordComplete = true;
  for (let char of wg.activeWord) {
    if (wg.guessedLetters.includes(char)) {
      displayWordHTML += `<span class="w-10 h-12 sm:w-12 sm:h-14 bg-white/25 border-2 border-yellow-300 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold text-yellow-300 shadow">${char}</span>`;
    } else {
      displayWordHTML += `<span class="w-10 h-12 sm:w-12 sm:h-14 bg-white/10 border-2 border-white/30 rounded-xl flex items-center justify-center text-2xl sm:text-3xl font-bold text-white/50 shadow">_</span>`;
      wordComplete = false;
    }
  }

  if (wordComplete) {
    playSound("correct");
    wg.correctCount++;
    wg.currentIndex++;
    setTimeout(() => {
      loadNextWordGameRound();
      renderView();
    }, 1000);
    return `
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md sm:max-w-lg w-full text-center flex flex-col gap-5 animate-fadeIn">
                <span class="text-6xl sm:text-7xl animate-bounce">🎉📦🔓</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-yellow-300">You Let the ${wg.currentPet} Out of the Box!</h2>
                <p class="text-emerald-300 font-bold text-lg sm:text-xl">+10 ⭐ Star Points Earned!</p>
            </div>
        `;
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md sm:max-w-xl w-full flex flex-col items-center gap-5 relative">
            <div class="w-full flex justify-between items-center text-xs sm:text-sm font-semibold text-white/80">
                <span>Word Rescue (${state.profile.dialect}) ${wg.currentIndex + 1} / ${wordList.length}</span>
                <button onclick="speakText('${wg.hint}')" class="bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full text-xs">🔊 Read Hint</button>
            </div>

            <div class="relative bg-gradient-to-tr from-amber-800 to-amber-600 border-4 border-amber-400 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl floating">
                <div class="text-5xl sm:text-6xl">${wg.currentPet}</div>
                <div class="absolute -top-3 bg-yellow-400 text-gray-900 px-2.5 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow">Locked Box 📦</div>
            </div>

            <p class="text-yellow-200 font-semibold text-sm sm:text-lg text-center px-2">Hint: ${wg.hint}</p>

            <div class="flex gap-1.5 sm:gap-2 justify-center my-1 flex-wrap">
                ${displayWordHTML}
            </div>

            <div class="grid grid-cols-7 gap-1.5 sm:gap-2 w-full mt-1">
                ${alphabet
                  .map((letter) => {
                    const guessed = wg.guessedLetters.includes(letter);
                    return `
                        <button onclick="guessLetter('${letter}')" ${guessed ? 'disabled class="bg-gray-700/50 text-gray-400 cursor-not-allowed text-xs sm:text-lg p-2 sm:p-3 rounded-lg sm:rounded-xl"' : 'class="bg-white/20 hover:bg-white/30 border border-white/30 p-2 sm:p-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-lg shadow active:scale-95 transition"'} >
                            ${letter}
                        </button>
                    `;
                  })
                  .join("")}
            </div>

            <button onclick="setView('dashboard')" class="text-white/60 hover:text-white text-xs sm:text-sm mt-1">⬅️ Back to Dashboard</button>
        </div>
    `;
}

function renderStoriesScreen() {
  const dialectBadge =
    state.profile.dialect === "UK"
      ? "🇬🇧 British English"
      : "🇺🇸 American English";
  return `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-xl sm:max-w-2xl w-full flex flex-col gap-5 animate-fadeIn">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                    <h2 class="text-2xl sm:text-3xl font-extrabold text-pink-300">📖 Magical Story Creator</h2>
                    <p class="text-xs text-white/70">Author: ${state.profile.name} • ${dialectBadge}</p>
                </div>
                <div class="flex gap-2 w-full sm:w-auto">
                    <button onclick="setView('writer')" class="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 px-3.5 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm shadow flex items-center justify-center gap-1.5 flex-1 sm:flex-initial">✍️ Write Story</button>
                    <button onclick="setView('dashboard')" class="bg-white/20 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-white/30">⬅️ Back</button>
                </div>
            </div>

            <div class="flex flex-col gap-3.5 sm:gap-4 max-h-80 sm:max-h-96 overflow-y-auto pr-1">
                ${
                  state.stories.length === 0
                    ? `
                    <div class="text-center py-8 sm:py-10 text-white/50 bg-white/5 rounded-2xl border border-white/10 px-4">
                        <span class="text-3xl sm:text-4xl block mb-2">📜</span>
                        <p class="text-xs sm:text-sm">No stories written yet! Click "Write Story" to begin your first masterpiece.</p>
                    </div>
                `
                    : state.stories
                        .map(
                          (s) => `
                    <div class="bg-white/20 border border-white/30 p-4 sm:p-5 rounded-2xl flex flex-col gap-2 shadow-lg text-left">
                        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5">
                            <h3 class="font-bold text-lg sm:text-xl text-yellow-300">${s.title}</h3>
                            <span class="bg-white/20 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs text-pink-200 font-semibold">${s.theme} •${s.date}</span>
                        </div>
                        <p class="text-white/90 text-xs sm:text-sm whitespace-pre-wrap bg-black/20 p-3 sm:p-4 rounded-xl border border-white/10">${s.content}</p>
                        <div class="flex justify-end mt-1">
                            <button onclick="speakText('${s.content.replace(/'/g, "")}')" class="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg text-xs font-bold">🔊 Read Aloud</button>
                        </div>
                    </div>
                `,
                        )
                        .join("")
                }
            </div>
        </div>
    `;
}

function renderStoryWriterScreen() {
  return `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-xl sm:max-w-2xl w-full flex flex-col gap-5 animate-fadeIn">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-pink-300">✍️️ Story Writing Studio</h2>
                <button onclick="setView('stories')" class="bg-white/20 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-white/30">⬅️ Cancel</button>
            </div>

            <div class="flex flex-col gap-3.5 sm:gap-4 text-left">
                <div>
                    <label class="block text-xs sm:text-sm font-bold text-white/80 mb-1">Story Title 📜</label>
                    <input id="story-title-input" type="text" placeholder="e.g. The Brilliant Bunny Journey" class="w-full bg-white/20 border border-white/30 rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-white/50 focus:outline-none focus:border-pink-400 font-semibold" />
                </div>

                <div>
                    <label class="block text-xs sm:text-sm font-bold text-white/80 mb-1">Choose Theme 🎨</label>
                    <select id="story-theme-input" class="w-full bg-indigo-950 border border-white/30 rounded-xl sm:rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white focus:outline-none focus:border-pink-400 font-semibold">
                        <option value="Magical Fantasy">✨ Magical Fantasy</option>
                        <option value="Cute Animal Adventure">🐰 Cute Animal Adventure</option>
                        <option value="Daily Life & Fun">🌟 Daily Life & Fun</option>
                        <option value="Space Exploration">🚀 Space Exploration</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs sm:text-sm font-bold text-white/80 mb-1">Write Your Story 📝</label>
                    <textarea id="story-content-input" rows="5" placeholder="Once upon a time..." class="w-full bg-white/20 border border-white/30 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 text-sm sm:text-base text-white placeholder-white/50 focus:outline-none focus:border-pink-400"></textarea>
                </div>

                <button onclick="saveStoryAPI()" class="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-extrabold py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl transition hover:scale-105 text-base sm:text-lg">Save Story & Earn +30 ⭐ Stars!</button>
            </div>
        </div>
    `;
}

function renderWardrobeScreen() {
  const baseOptions = ["🐵", "🐰", "🦊", "🐼", "🐯", "🐱", "🦄", "🦁"];
  const currentBase = getBaseAvatar();
  return `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-xl sm:max-w-2xl w-full flex flex-col gap-5 animate-fadeIn">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl sm:text-3xl font-extrabold text-pink-300">Avatar Wardrobe 👕</h2>
                <button onclick="setView('dashboard')" class="bg-white/20 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold hover:bg-white/30">⬅️ Back</button>
            </div>

            <div class="flex flex-col items-center gap-3">
                ${renderFullBodyAvatar("w-32 h-44 sm:w-36 sm:h-48")}
                
                <div class="flex flex-col items-center gap-1.5 w-full mt-2">
                    <span class="text-xs font-bold text-yellow-200">Choose Base Animal Character:</span>
                    <div class="flex gap-2 justify-center flex-wrap">
                        ${baseOptions
                          .map(
                            (emoji) => `
                            <button onclick="equipItem('base', '${emoji}')" class="w-10 h-10 rounded-xl text-xl flex items-center justify-center border-2 transition ${currentBase === emoji ? "bg-yellow-400 border-white scale-110 shadow-lg" : "bg-white/20 border-white/30 hover:bg-white/30"}">${emoji}</button>
                        `,
                          )
                          .join("")}
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-h-72 sm:max-h-96 overflow-y-auto pr-1">
                ${state.inventory
                  .map((item) => {
                    const config = state.profile.avatar_config || {};
                    const isEquipped = config[item.item_type] === item.item_id;
                    return `
                    <div class="bg-white/20 border border-white/30 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl flex justify-between items-center shadow-md">
                        <div class="text-left">
                            <h4 class="font-bold text-base sm:text-lg">${item.name}</h4>
                            <p class="text-[11px] sm:text-xs text-yellow-300">⭐ ${item.cost} Stars • <span class="uppercase text-[10px] bg-white/20 px-2 py-0.5 rounded">${item.item_type}</span></p>
                        </div>
                        <div class="flex gap-2">
                            ${
                              item.unlocked
                                ? `
                                ${
                                  isEquipped
                                    ? `
                                    <button onclick="equipItem('${item.item_type}', '')" class="bg-amber-600 hover:bg-amber-500 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow">Remove</button>
                                `
                                    : `
                                    <button onclick="equipItem('${item.item_type}', '${item.item_id}')" class="bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow">Equip</button>
                                `
                                }
                            `
                                : `
                                <button onclick="buyItem('${item.item_id}')" class="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm shadow">Unlock</button>
                            `
                            }
                        </div>
                    </div>
                `;
                  })
                  .join("")}
            </div>
        </div>
    `;
}

function renderWorldBuilderScreen() {
  return `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl max-w-xl sm:max-w-3xl w-full flex flex-col gap-4 animate-fadeIn">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                    <h2 class="text-xl sm:text-2xl font-extrabold text-cyan-300">🏝️ Sunday World Builder</h2>
                    <p class="text-[11px] sm:text-xs text-white/70">Place trees, houses, and cute pets in your virtual world!</p>
                </div>
                <div class="flex gap-2 w-full sm:w-auto">
                    <button onclick="clearWorld()" class="bg-red-500/30 hover:bg-red-500/50 border border-red-400 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold flex-1 sm:flex-initial">Clear World</button>
                    <button onclick="setView('dashboard')" class="bg-white/20 px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold hover:bg-white/30">⬅️ Back</button>
                </div>
            </div>

            <div class="flex flex-wrap gap-2 bg-white/10 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl justify-center items-center">
                <span class="text-xs sm:text-sm font-bold w-full sm:w-auto text-center">Choose item to place:</span>
                <button onclick="selectedWorldItem('tree')" class="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-xl text-lg sm:text-xl">🌲 Tree</button>
                <button onclick="selectedWorldItem('house')" class="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-xl text-lg sm:text-xl">🏠 House</button>
                <button onclick="selectedWorldItem('bunny')" class="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-xl text-lg sm:text-xl">🐰 Bunny</button>
                <button onclick="selectedWorldItem('flower')" class="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-xl text-lg sm:text-xl">🌻 Flower</button>
            </div>

            <div id="world-grid" class="grid grid-cols-8 gap-1.5 sm:gap-2 bg-black/30 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/25 min-h-[280px] sm:min-h-[350px] overflow-x-auto">
                ${renderGridCells()}
            </div>
        </div>
    `;
}

let currentWorldBrush = "tree";
function selectedWorldItem(type) {
  currentWorldBrush = type;
  playSound("click");
}

function renderGridCells() {
  let html = "";
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 8; c++) {
      const obj = state.world_objects.find((o) => o.x === c && o.y === r);
      let emoji = "";
      if (obj) {
        if (obj.item_type === "tree") emoji = "🌲";
        else if (obj.item_type === "house") emoji = "🏠";
        else if (obj.item_type === "bunny") emoji = "🐰";
        else if (obj.item_type === "flower") emoji = "🌻";
      }
      html += `<div onclick="placeWorldObject(${c}, ${r})" class="bg-white/10 hover:bg-white/25 border border-white/15 h-12 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center text-2xl sm:text-3xl cursor-pointer transition">${emoji}</div>`;
    }
  }
  return html;
}

function renderChallengeScreen() {
  return `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md sm:max-w-lg w-full text-center flex flex-col gap-5 animate-fadeIn">
            <span class="text-5xl sm:text-6xl animate-bounce">⚡</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-amber-300">Speed Challenge Mode</h2>
            <p class="text-white/80 text-xs sm:text-sm">Answer 10 rapid-fire questions as fast as you can to earn double Star Points!</p>
            <button onclick="beginPractice('hard', 10)" class="bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 font-extrabold py-3.5 sm:py-4 rounded-xl sm:rounded-2xl shadow-xl hover:scale-105 transition text-base sm:text-xl">Start Speed Challenge! 🔥</button>
            <button onclick="setView('dashboard')" class="text-white/70 hover:text-white text-xs sm:text-sm">⬅️ Back to Dashboard</button>
        </div>
    `;
}
