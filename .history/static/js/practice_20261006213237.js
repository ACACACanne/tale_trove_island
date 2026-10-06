function startPracticeSetup(topicId = "timetables") {
  state.curriculum.activeTopic = topicId;
  const topicNames = {
    timetables: "Multiplication Timetables",
    division: "Division & Sharing",
    fractions: "Fractions & Decimals",
    biology: "Biology (Living Things)",
    chemistry: "Chemistry (States of Matter)",
    physics: "Physics (Forces & Light)",
    history: "History & Civilizations",
    geography: "Geography & Mapping",
    art_theory: "Art & Color Theory",
  };
  const title = topicNames[topicId] || "Practice Session";

  const container = document.getElementById("app-container");
  container.innerHTML = `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md sm:max-w-xl w-full flex flex-col gap-5 text-center">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-yellow-300">Practice: ${title} 🎒</h2>
            <p class="text-white/80 text-xs sm:text-sm">Select difficulty & session length (ADHD Micro-session support):</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button onclick="beginPractice('easy', 5, '${topicId}')" class="bg-emerald-600 hover:bg-emerald-500 p-3.5 sm:p-4 rounded-2xl font-bold border-2 border-emerald-300 flex flex-row sm:flex-col items-center justify-center sm:justify-start gap-2 bounce-hover">
                    <span class="text-2xl sm:text-3xl">🌱</span>
                    <div>
                        <span>Untimed (5 Qs)</span>
                        <span class="block text-[11px] text-emerald-200">Zero Pressure</span>
                    </div>
                </button>
                <button onclick="beginPractice('medium', 10, '${topicId}')" class="bg-blue-600 hover:bg-blue-500 p-3.5 sm:p-4 rounded-2xl font-bold border-2 border-blue-300 flex flex-row sm:flex-col items-center justify-center sm:justify-start gap-2 bounce-hover">
                    <span class="text-2xl sm:text-3xl">⭐</span>
                    <div>
                        <span>Gentle (10 Qs)</span>
                        <span class="block text-[11px] text-blue-200">Helpful Timers</span>
                    </div>
                </button>
                <button onclick="beginPractice('hard', 10, '${topicId}')" class="bg-purple-600 hover:bg-purple-500 p-3.5 sm:p-4 rounded-2xl font-bold border-2 border-purple-300 flex flex-row sm:flex-col items-center justify-center sm:justify-start gap-2 bounce-hover">
                    <span class="text-2xl sm:text-3xl">🔥</span>
                    <div>
                        <span>Speed (10 Qs)</span>
                        <span class="block text-[11px] text-purple-200">Challenge Mode</span>
                    </div>
                </button>
            </div>
            
            <button onclick="setView('curriculum_topics')" class="text-white/60 hover:text-white text-xs sm:text-sm mt-1">⬅️ Back to Topics</button>
        </div>
    `;
}

function beginPractice(level, count, topicId = null) {
  const tId = topicId || state.curriculum.activeTopic || "timetables";
  state.curriculum.activeTopic = tId;
  state.practice.level = level;
  state.practice.session_length = count;
  state.practice.currentIndex = 0;
  state.practice.correctCount = 0;
  state.practice.timer = level === "easy" ? 0 : level === "medium" ? 25 : 12;
  state.practice.needMoreTimeTriggered = false;

  if (tId === "timetables") {
    const yg = state.profile.year_group;
    let maxTable = yg === 2 ? 5 : yg === 3 ? 8 : 12;
    let questions = [];
    for (let i = 0; i < count; i++) {
      const a = Math.floor(Math.random() * maxTable) + 2;
      const b = Math.floor(Math.random() * 10) + 1;
      questions.push({ a, b, answer: a * b, isQuiz: false });
    }
    state.practice.questions = questions;
  } else {
    generateTopicQuestions(tId, count);
  }

  state.view = "practice";
  renderView();
}

function generateTopicQuestions(topicId, count) {
  const yg = state.profile.year_group;
  let questions = [];
  const isHarder = state.curriculum.difficulty === "harder";

  if (topicId === "division") {
    for (let i = 0; i < count; i++) {
      const b = Math.floor(Math.random() * (isHarder ? 12 : 6)) + 2;
      const multiplier = Math.floor(Math.random() * 10) + 1;
      const a = b * multiplier;
      questions.push({ q: `${a} ÷ ${b} = ?`, answer: multiplier });
    }
  } else if (topicId === "fractions") {
    const basePool = [
      {
        q: `Which is bigger: 1/2 or 1/4?`,
        answer: "1/2",
        options: ["1/2", "1/4"],
      },
      {
        q: `Which is bigger: 1/3 or 1/2?`,
        answer: "1/2",
        options: ["1/3", "1/2"],
      },
      {
        q: `Which is bigger: 3/4 or 1/4?`,
        answer: "3/4",
        options: ["3/4", "1/4"],
      },
      { q: `What is 1/2 of ${yg * 10}?`, answer: (yg * 10) / 2 },
      { q: `What is 1/4 of ${yg * 20}?`, answer: (yg * 20) / 4 },
      {
        q: `What is 0.5 expressed as a percentage? (%)`,
        answer: 50,
        options: ["25%", "50%", "75%", "100%"],
      },
    ];
    while (questions.length < count) {
      questions.push(basePool[Math.floor(Math.random() * basePool.length)]);
    }
  } else if (topicId === "biology") {
    const basePool = [
      {
        q: `What do plants need for photosynthesis?`,
        answer: "Sunlight",
        options: ["Sunlight", "Darkness", "Plastic", "Sound"],
      },
      {
        q: `Which animal is a mammal?`,
        answer: "Dolphin",
        options: ["Frog", "Dolphin", "Shark", "Snake"],
      },
      {
        q: `What part of a plant absorbs water from soil?`,
        answer: "Roots",
        options: ["Roots", "Leaves", "Petals", "Stem"],
      },
    ];
    while (questions.length < count) {
      questions.push(basePool[Math.floor(Math.random() * basePool.length)]);
    }
  } else if (topicId === "chemistry") {
    const basePool = [
      {
        q: `What is water in its solid state called?`,
        answer: "Ice",
        options: ["Ice", "Steam", "Gas", "Magma"],
      },
      {
        q: `Is glass a solid, liquid, or gas?`,
        answer: "Solid",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
      },
      {
        q: `What state of matter is air?`,
        answer: "Gas",
        options: ["Solid", "Liquid", "Gas", "Rock"],
      },
    ];
    while (questions.length < count) {
      questions.push(basePool[Math.floor(Math.random() * basePool.length)]);
    }
  } else if (topicId === "physics") {
    const basePool = [
      {
        q: `Which force pulls objects down to Earth?`,
        answer: "Gravity",
        options: ["Gravity", "Magnetism", "Friction", "Tension"],
      },
      {
        q: `What travels faster: light or sound?`,
        answer: "Light",
        options: ["Light", "Sound", "Both equal", "Neither"],
      },
    ];
    while (questions.length < count) {
      questions.push(basePool[Math.floor(Math.random() * basePool.length)]);
    }
  } else if (topicId === "history") {
    const basePool = [
      {
        q: `Who built the pyramids?`,
        answer: "Ancient Egyptians",
        options: ["Ancient Egyptians", "Ancient Romans", "Vikings", "Greeks"],
      },
      {
        q: `Which historical era came first?`,
        answer: "Stone Age",
        options: ["Stone Age", "Victorian Era", "World War II", "Space Age"],
      },
    ];
    while (questions.length < count) {
      questions.push(basePool[Math.floor(Math.random() * basePool.length)]);
    }
  } else if (topicId === "geography") {
    const basePool = [
      {
        q: `How many continents are there on Earth?`,
        answer: 7,
        options: [5, 6, 7, 8],
      },
      {
        q: `Which is the largest ocean on Earth?`,
        answer: "Pacific",
        options: ["Atlantic", "Pacific", "Indian", "Arctic"],
      },
    ];
    while (questions.length < count) {
      questions.push(basePool[Math.floor(Math.random() * basePool.length)]);
    }
  } else if (topicId === "art_theory") {
    const basePool = [
      {
        q: `Which of these are primary colors?`,
        answer: "Red/Blue/Yellow",
        options: [
          "Red/Blue/Yellow",
          "Pink/Black/White",
          "Green/Orange/Purple",
          "Brown/Grey/Gold",
        ],
      },
      {
        q: `What do you get when you mix blue and yellow?`,
        answer: "Green",
        options: ["Green", "Orange", "Purple", "Brown"],
      },
    ];
    while (questions.length < count) {
      questions.push(basePool[Math.floor(Math.random() * basePool.length)]);
    }
  }

  state.practice.questions = questions.map((item) => ({
    text: item.q,
    answer: item.answer,
    options: item.options || null,
    a: item.q,
    b: "",
    isQuiz: true,
  }));
}

function advancePractice() {
  const pr = state.practice;
  pr.currentIndex++;
  pr.timer = pr.level === "easy" ? 0 : pr.level === "medium" ? 25 : 12;
  pr.needMoreTimeTriggered = false;
  renderView();
}

function startPracticeTimer() {
  const pr = state.practice;
  if (pr.level === "easy") return;

  if (pr.timerInterval) clearInterval(pr.timerInterval);
  pr.timerInterval = setInterval(() => {
    pr.timer--;
    const timerEl = document.getElementById("timer-display");
    if (timerEl) timerEl.textContent = pr.timer;

    if (pr.timer === 5 && !pr.needMoreTimeTriggered && pr.level === "medium") {
      pr.needMoreTimeTriggered = true;
      const modal = document.getElementById("gentle-modal");
      if (modal) modal.classList.remove("hidden");
    }

    if (pr.timer <= 0) {
      clearInterval(pr.timerInterval);
      playSound("wrong");
      advancePractice();
    }
  }, 1000);
}

function addExtraTime() {
  state.practice.timer += 10;
  state.needMoreTimeTriggered = true;
  const modal = document.getElementById("gentle-modal");
  if (modal) modal.classList.add("hidden");
  startPracticeTimer();
}

function submitAnswer(chosen, correct) {
  if (state.practice.timerInterval) clearInterval(state.practice.timerInterval);

  const isCorrect = String(chosen).trim() === String(correct).trim();

  if (isCorrect) {
    playSound("correct");
    state.practice.correctCount++;
  } else {
    playSound("wrong");
  }

  advancePractice();
}

async function finishPracticeSession() {
  const pr = state.practice;
  try {
    const multiplier = state.curriculum.difficulty === "harder" ? 2 : 1;
    const res = await fetch("/api/practice/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile_id: state.activeProfileId,
        correct_count: pr.correctCount * multiplier,
        total_count: pr.session_length,
        level: pr.level,
      }),
    });
    const data = await res.json();
    state.profile.stars = data.total_stars;
    state.profile.streak_days = data.streak_days;
    updateHeader();

    const container = document.getElementById("app-container");
    container.innerHTML = `
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full text-center flex flex-col gap-5 animate-fadeIn">
                <span class="text-5xl sm:text-6xl animate-bounce">🏆</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-yellow-300">Practice Completed!</h2>
                <div class="bg-white/20 p-4 rounded-2xl">
                    <p class="text-base sm:text-xl">You got <span class="font-bold text-emerald-300">${pr.correctCount}</span> out of ${pr.session_length} correct!</p>
                    <p class="text-base sm:text-lg text-yellow-300 mt-2 font-bold">+${pr.correctCount * 5 * multiplier} ⭐ Earned!</p>
                </div>
                <div class="flex flex-col gap-2.5 w-full">
                    <button onclick="setView('curriculum_topics')" class="bg-gradient-to-r from-emerald-500 to-teal-500 hover:scale-105 font-bold py-3 px-6 rounded-xl sm:rounded-2xl shadow-lg transition text-sm sm:text-base">🔄 Back to Subject Topics</button>
                    <button onclick="setView('dashboard')" class="bg-white/20 hover:bg-white/30 font-bold py-3 px-6 rounded-xl sm:rounded-2xl shadow-lg transition text-sm sm:text-base">🏠 Back to Dashboard</button>
                </div>
            </div>
        `;
  } catch (e) {
    setView("dashboard");
  }
}

function startWordGame() {
  const wg = state.wordGame;
  wg.currentIndex = 0;
  wg.correctCount = 0;
  loadNextWordGameRound();
  setView("wordgame");
}

function loadNextWordGameRound() {
  const wg = state.wordGame;
  const wordList = state.profile.dialect === "UK" ? wg.wordsUK : wg.wordsUS;
  if (wg.currentIndex >= wordList.length) {
    finishWordGame();
    return;
  }
  const currentItem = wordList[wg.currentIndex];
  wg.activeWord = currentItem.word;
  wg.hint = currentItem.hint;
  wg.guessedLetters = [];
  wg.wrongAttempts = 0;
  const pets = ["🐰", "🐱", "🐶", "🦊", "🐼", "🐨"];
  wg.currentPet = pets[Math.floor(Math.random() * pets.length)];
}

function guessLetter(letter) {
  const wg = state.wordGame;
  if (wg.guessedLetters.includes(letter)) return;
  wg.guessedLetters.push(letter);

  const wordList = state.profile.dialect === "UK" ? wg.wordsUK : wg.wordsUS;
  const currentItem = wordList[wg.currentIndex];

  if (currentItem.word.includes(letter)) {
    playSound("correct");
  } else {
    playSound("wrong");
    wg.wrongAttempts++;
  }
  renderView();
}

async function finishWordGame() {
  const wg = state.wordGame;
  try {
    const res = await fetch("/api/wordgame/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        profile_id: state.activeProfileId,
        correct_count: wg.correctCount,
      }),
    });
    const data = await res.json();
    state.profile.stars = data.total_stars;
    updateHeader();

    const container = document.getElementById("app-container");
    container.innerHTML = `
            <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full text-center flex flex-col gap-5 animate-fadeIn">
                <span class="text-5xl sm:text-6xl animate-bounce">🌟📦🎉</span>
                <h2 class="text-2xl sm:text-3xl font-extrabold text-yellow-300">All Pets Rescued!</h2>
                <div class="bg-white/20 p-4 rounded-2xl">
                    <p class="text-base sm:text-xl">You rescued ${wg.correctCount} pets successfully!</p>
                    <p class="text-base sm:text-lg text-yellow-300 mt-2 font-bold">+${wg.correctCount * 10} ⭐ Stars Earned!</p>
                </div>
                <button onclick="setView('dashboard')" class="bg-gradient-to-r from-teal-500 to-cyan-500 font-bold py-3 px-6 rounded-xl sm:rounded-2xl shadow-lg hover:scale-105 transition text-sm sm:text-base">Back to Dashboard 🚀</button>
            </div>
        `;
  } catch (e) {
    setView("dashboard");
  }
}

function openCurriculumSubject(subject) {
  if (subject === "writing") {
    setView("stories");
    return;
  }
  state.curriculum.activeSubject = subject;
  setView("curriculum_topics");
}

function setCurriculumDifficulty(diff) {
  state.curriculum.difficulty = diff;
  renderView();
}

function launchCurriculumTopic(topicId) {
  state.curriculum.activeTopic = topicId;
  if (topicId === "spelling") {
    startWordGame();
  } else {
    startPracticeSetup(topicId);
  }
}

function renderPracticeScreen() {
  const pr = state.practice;
  if (pr.currentIndex >= pr.questions.length) {
    finishPracticeSession();
    return `<div class="text-center"><h2 class="text-2xl sm:text-3xl font-bold text-yellow-300 animate-bounce">🎉 Amazing Job! Saving your stars...</h2></div>`;
  }

  const q = pr.questions[pr.currentIndex];
  const isQuiz = q.isQuiz;
  const questionText = isQuiz ? q.text : `${q.a} × ${q.b} = ?`;

  let optionsHTML = "";
  if (q.options) {
    optionsHTML = q.options
      .map(
        (opt) => `
            <button onclick="submitAnswer('${opt}', '${q.answer}')" class="bg-white/20 hover:bg-white/30 border-2 border-white/30 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-xl sm:text-2xl font-bold shadow-lg transition transform active:scale-95">${opt}</button>
        `,
      )
      .join("");
  } else {
    const opts = generateOptions(q.answer);
    optionsHTML = opts
      .map(
        (opt) => `
            <button onclick="submitAnswer(${opt}, ${q.answer})" class="bg-white/20 hover:bg-white/30 border-2 border-white/30 p-4 sm:p-5 rounded-xl sm:rounded-2xl text-2xl sm:text-3xl font-bold shadow-lg transition transform active:scale-95">${opt}</button>
        `,
      )
      .join("");
  }

  return `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md sm:max-w-xl w-full flex flex-col items-center gap-5 relative">
            <div class="w-full flex justify-between items-center text-xs sm:text-sm font-semibold text-white/80">
                <span>Question ${pr.currentIndex + 1} / ${pr.session_length}</span>
                <div class="flex items-center gap-2">
                    <button onclick="speakText('${questionText}')" class="bg-white/20 hover:bg-white/30 px-2 py-1 rounded-full text-xs" title="Read Aloud (TTS)">🔊 Listen</button>
                    ${pr.level !== "easy" ? `<div class="bg-red-500/20 border border-red-400 px-2.5 py-0.5 rounded-full text-red-300 flex items-center gap-1 text-xs">⏱️ <span id="timer-display">${pr.timer}</span>s</div>` : ""}
                </div>
            </div>

            <div class="bg-white/25 border-4 border-white/40 px-6 sm:px-10 py-6 sm:py-8 rounded-2xl sm:rounded-3xl shadow-2xl text-center w-full">
                <span class="text-2xl sm:text-4xl font-extrabold tracking-wide text-yellow-200">${questionText}</span>
            </div>

            <div id="options-grid" class="grid grid-cols-2 gap-3 sm:gap-4 w-full">
                ${optionsHTML}
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
