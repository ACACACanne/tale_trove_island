function startPracticeSetup(topicId = "timetables") {
  state.curriculum.activeTopic = topicId;
  const topicNames = {
    timetables: "Multiplication Timetables",
    division: "Division & Sharing",
    fractions: "Fractions, Decimals & Percentages",
    grammar: "Grammar & Punctuation",
    biology: "Biology (Living Things & Habitats)",
    chemistry: "Chemistry (States of Matter)",
    physics: "Physics (Forces, Light & Space)",
    history: "History & Civilizations",
    geography: "Geography & Mapping",
    art_theory: "Art & Design Theory",
  };
  const title = topicNames[topicId] || "Practice Session";

  const container = document.getElementById("app-container");
  container.innerHTML = `
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md sm:max-w-xl w-full flex flex-col gap-5 text-center animate-fadeIn">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-yellow-300">Practice: ${title} 🎒</h2>
            <p class="text-white/80 text-xs sm:text-sm">Select difficulty & session length (50+ Curriculum Questions Bank):</p>
            
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
  const isUK = state.profile.dialect === "UK";
  const isHarder = state.curriculum.difficulty === "harder";
  let pool = [];

  if (topicId === "division") {
    let maxDivisor = yg === 2 ? 5 : yg === 3 ? 8 : 12;
    for (let d = 2; d <= maxDivisor; d++) {
      for (let m = 1; m <= 15; m++) {
        let product = d * m;
        pool.push({ q: `${product} ÷ ${d} = ?`, answer: m });
      }
    }
  } else if (topicId === "fractions") {
    pool = [
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
      {
        q: `Which is bigger: 2/5 or 4/5?`,
        answer: "4/5",
        options: ["2/5", "4/5"],
      },
      {
        q: `Which is bigger: 1/10 or 1/5?`,
        answer: "1/5",
        options: ["1/10", "1/5"],
      },
      {
        q: `Which is bigger: 2/3 or 1/3?`,
        answer: "2/3",
        options: ["2/3", "1/3"],
      },
      {
        q: `Which is bigger: 5/8 or 3/8?`,
        answer: "5/8",
        options: ["5/8", "3/8"],
      },
      {
        q: `Which is bigger: 7/10 or 3/10?`,
        answer: "7/10",
        options: ["7/10", "3/10"],
      },
      {
        q: `Which is bigger: 4/6 or 5/6?`,
        answer: "5/6",
        options: ["4/6", "5/6"],
      },
      {
        q: `Which is bigger: 1/8 or 1/4?`,
        answer: "1/4",
        options: ["1/8", "1/4"],
      },
      { q: `What is 1/2 of ${yg * 10}?`, answer: (yg * 10) / 2 },
      { q: `What is 1/4 of ${yg * 20}?`, answer: (yg * 20) / 4 },
      { q: `What is 3/4 of 20?`, answer: 15 },
      { q: `What is 1/5 of 50?`, answer: 10 },
      { q: `What is 2/5 of 50?`, answer: 20 },
      { q: `What is 3/5 of 50?`, answer: 30 },
      { q: `What is 4/5 of 50?`, answer: 40 },
      { q: `What is 1/3 of 30?`, answer: 10 },
      { q: `What is 2/3 of 30?`, answer: 20 },
      { q: `What is 1/10 of 100?`, answer: 10 },
      { q: `What is 3/10 of 100?`, answer: 30 },
      { q: `What is 7/10 of 100?`, answer: 70 },
      {
        q: `What is 0.5 expressed as a percentage? (%)`,
        answer: "50%",
        options: ["25%", "50%", "75%", "100%"],
      },
      {
        q: `What is 0.25 expressed as a percentage? (%)`,
        answer: "25%",
        options: ["25%", "50%", "75%", "10%"],
      },
      {
        q: `What is 0.75 expressed as a percentage? (%)`,
        answer: "75%",
        options: ["25%", "50%", "75%", "90%"],
      },
      {
        q: `What is 0.1 expressed as a percentage? (%)`,
        answer: "10%",
        options: ["5%", "10%", "20%", "50%"],
      },
      {
        q: `What is 0.2 expressed as a percentage? (%)`,
        answer: "20%",
        options: ["10%", "20%", "30%", "40%"],
      },
      {
        q: `What is 0.6 as a percentage? (%)`,
        answer: "60%",
        options: ["40%", "50%", "60%", "70%"],
      },
      {
        q: `What is 0.8 as a percentage? (%)`,
        answer: "80%",
        options: ["70%", "80%", "90%", "100%"],
      },
      {
        q: `What is 0.1 as a fraction?`,
        answer: "1/10",
        options: ["1/2", "1/4", "1/10", "1/100"],
      },
      {
        q: `What is 0.25 as a fraction?`,
        answer: "1/4",
        options: ["1/2", "1/4", "3/4", "2/3"],
      },
      {
        q: `What is 0.5 as a fraction?`,
        answer: "1/2",
        options: ["1/2", "1/4", "3/4", "1/3"],
      },
      {
        q: `What is 0.75 as a fraction?`,
        answer: "3/4",
        options: ["1/2", "1/4", "3/4", "2/3"],
      },
      {
        q: `Add 1/4 + 1/4 = ?`,
        answer: "2/4",
        options: ["1/4", "2/4", "3/4", "4/4"],
      },
      {
        q: `Add 1/5 + 2/5 = ?`,
        answer: "3/5",
        options: ["1/5", "2/5", "3/5", "4/5"],
      },
      {
        q: `Add 3/10 + 4/10 = ?`,
        answer: "7/10",
        options: ["1/10", "5/10", "7/10", "9/10"],
      },
      {
        q: `Subtract 3/4 - 1/4 = ?`,
        answer: "2/4",
        options: ["1/4", "2/4", "3/4", "0"],
      },
      {
        q: `Subtract 4/5 - 2/5 = ?`,
        answer: "2/5",
        options: ["1/5", "2/5", "3/5", "4/5"],
      },
      {
        q: `What is 1/2 + 1/4?`,
        answer: "3/4",
        options: ["1/2", "3/4", "1/4", "1"],
      },
      {
        q: `What is 0.3 as a fraction?`,
        answer: "3/10",
        options: ["1/3", "3/10", "3/100", "1/30"],
      },
      {
        q: `What is 0.9 as a fraction?`,
        answer: "9/10",
        options: ["1/9", "9/10", "1/2", "3/4"],
      },
      { q: `What is 1/2 of 60?`, answer: 30 },
      { q: `What is 1/3 of 60?`, answer: 20 },
      { q: `What is 1/4 of 60?`, answer: 15 },
      { q: `What is 1/5 of 60?`, answer: 12 },
      { q: `What is 1/6 of 60?`, answer: 10 },
      { q: `What is 3/10 of 50?`, answer: 15 },
      { q: `What is 4/10 of 50?`, answer: 20 },
      { q: `What is 6/10 of 50?`, answer: 30 },
      { q: `What is 8/10 of 50?`, answer: 40 },
    ];
  } else if (topicId === "grammar") {
    pool = [
      {
        q: `Identify the noun in: "The clever dog chased the ball."`,
        answer: "dog",
        options: ["clever", "dog", "barked", "loudly"],
      },
      {
        q: `Identify the verb in: "Children laughed happily outside."`,
        answer: "laughed",
        options: ["Children", "laughed", "happily", "outside"],
      },
      {
        q: `Identify the adjective in: "A bright red apple fell."`,
        answer: "red",
        options: ["bright", "red", "apple", "fell"],
      },
      {
        q: `Identify the adverb in: "She sang the song beautifully."`,
        answer: "beautifully",
        options: ["She", "sang", "song", "beautifully"],
      },
      {
        q: `What punctuation mark ends an interrogative sentence?`,
        answer: "Question mark (?)",
        options: ["Full stop (.)", "Question mark (?)", "Exclamation (!)"],
      },
      {
        q: `Choose the correct plural of 'child':`,
        answer: "children",
        options: ["childs", "children", "childes", "child"],
      },
      {
        q: `Choose the correct plural of 'mouse':`,
        answer: "mice",
        options: ["mouses", "mice", "mouse", "meese"],
      },
      {
        q: `Choose the correct past tense of 'run':`,
        answer: "ran",
        options: ["runned", "ran", "running", "runs"],
      },
      {
        q: `Choose the correct past tense of 'eat':`,
        answer: "ate",
        options: ["eated", "ate", "eten", "eating"],
      },
      {
        q: `Which word is a synonym for 'fast'?`,
        answer: "quick",
        options: ["slow", "quick", "heavy", "cold"],
      },
      {
        q: `Identify the pronoun in: "He walked to the store."`,
        answer: "He",
        options: ["He", "walked", "store", "to"],
      },
      {
        q: `Identify the preposition in: "The cat slept under the table."`,
        answer: "under",
        options: ["cat", "slept", "under", "table"],
      },
      {
        q: `Identify the conjunction in: "I wanted to play, but it started raining."`,
        answer: "but",
        options: ["wanted", "play", "but", "raining"],
      },
      {
        q: `What is the antonym of 'brave'?`,
        answer: "cowardly",
        options: ["fearless", "cowardly", "bold", "strong"],
      },
      {
        q: `What is the antonym of 'ancient'?`,
        answer: "modern",
        options: ["old", "modern", "historic", "dusty"],
      },
      {
        q: `Choose the correct spelling of the word meaning 'for the reason that':`,
        answer: "because",
        options: ["becuse", "because", "becrause", "bekase"],
      },
      {
        q: `Choose the correct spelling for a companion:`,
        answer: "friend",
        options: ["freind", "friend", "frend", "frind"],
      },
      {
        q: `Choose the correct spelling of 'necessary':`,
        answer: "necessary",
        options: ["neccesary", "necessary", "nesessary", "necesary"],
      },
      {
        q: `Choose the correct spelling of 'separate':`,
        answer: "separate",
        options: ["seperate", "separate", "sepparate", "seprate"],
      },
      {
        q: `Choose the correct spelling of 'definite':`,
        answer: "definite",
        options: ["definate", "definite", "definit", "defint"],
      },
      {
        q: `What is a word that sounds the same as another word with a different meaning called?`,
        answer: "Homophone",
        options: ["Homophone", "Synonym", "Antonym", "Prefix"],
      },
      {
        q: `Add the correct prefix to 'agree' to mean the opposite:`,
        answer: "disagree",
        options: ["misagree", "disagree", "unagree", "reagree"],
      },
      {
        q: `Add the correct suffix to 'help' to mean willing to assist:`,
        answer: "helpful",
        options: ["helpless", "helpful", "helper", "helping"],
      },
      {
        q: `Identify the compound word in: "She loves basketball."`,
        answer: "basketball",
        options: ["She", "loves", "basketball", "none"],
      },
      {
        q: `Identify the proper noun in: "London is a busy capital."`,
        answer: "London",
        options: ["London", "busy", "capital", "is"],
      },
      {
        q: `Which sentence uses a capital letter correctly?`,
        answer: "Sarah went to Paris.",
        options: [
          "sarah went to paris.",
          "Sarah went to Paris.",
          "sarah Went To Paris.",
          "SARAH went to paris.",
        ],
      },
      {
        q: `What is the past tense of 'jump'?`,
        answer: "jumped",
        options: ["jumping", "jumped", "jumps", "jumpen"],
      },
      {
        q: `What is the plural of 'fox'?`,
        answer: "foxes",
        options: ["foxs", "foxes", "foxies", "foxen"],
      },
      {
        q: `What is the plural of 'baby'?`,
        answer: "babies",
        options: ["babys", "babies", "babyies", "babs"],
      },
      {
        q: `What is the plural of 'leaf'?`,
        answer: "leaves",
        options: ["leafs", "leaves", "leafes", "leavs"],
      },
      {
        q: `Choose the synonym for 'happy':`,
        answer: "joyful",
        options: ["sad", "joyful", "angry", "tired"],
      },
      {
        q: `Choose the synonym for 'smart':`,
        answer: "clever",
        options: ["dull", "clever", "slow", "loud"],
      },
      {
        q: `Choose the antonym for 'noisy':`,
        answer: "quiet",
        options: ["loud", "quiet", "busy", "fast"],
      },
      {
        q: `Choose the antonym for 'giant':`,
        answer: "tiny",
        options: ["huge", "massive", "tiny", "tall"],
      },
      {
        q: `Which word is an adverb in: "He ran quickly."`,
        answer: "quickly",
        options: ["He", "ran", "quickly", "none"],
      },
      {
        q: `Which word is an adjective in: "A tall tree."`,
        answer: "tall",
        options: ["A", "tall", "tree", "none"],
      },
      {
        q: `What is the contraction for 'do not'?`,
        answer: "don't",
        options: ["dont", "don't", "do'nt", "d'not"],
      },
      {
        q: `What is the contraction for 'cannot'?`,
        answer: "can't",
        options: ["cant", "can't", "ca'not", "can not"],
      },
      {
        q: `What punctuation shows possession in "Sarah's book"?`,
        answer: "Apostrophe",
        options: ["Comma", "Apostrophe", "Hyphen", "Colon"],
      },
      {
        q: `What punctuation ends an exclamatory sentence?`,
        answer: "Exclamation mark",
        options: ["Period", "Exclamation mark", "Question mark"],
      },
      {
        q: `Identify the subject in: "The bird flew high."`,
        answer: "The bird",
        options: ["The bird", "flew", "high", "none"],
      },
      {
        q: `Identify the predicate in: "The sun shines."`,
        answer: "shines",
        options: ["The sun", "shines", "sun shines", "none"],
      },
      {
        q: `Which is a compound sentence?`,
        answer: "I like cake, and my brother likes pie.",
        options: [
          "I like cake.",
          "I like cake, and my brother likes pie.",
          "Running fast.",
          "Because it rained.",
        ],
      },
      {
        q: `What is a prefix?`,
        answer: "Letters added to the beginning of a word",
        options: [
          "Letters added to the beginning of a word",
          "Letters added to the end",
          "A punctuation mark",
          "A type of noun",
        ],
      },
      {
        q: `What is a suffix?`,
        answer: "Letters added to the end of a word",
        options: [
          "Letters added to the beginning",
          "Letters added to the end of a word",
          "A type of verb",
          "A sentence",
        ],
      },
      {
        q: `Which word is spelled correctly?`,
        answer: isUK ? "colour" : "color",
        options: [isUK ? "colour" : "color", "colur", "cullor", "coler"],
      },
      {
        q: `Which word is spelled correctly?`,
        answer: isUK ? "favourite" : "favorite",
        options: [
          isUK ? "favourite" : "favorite",
          "faveorit",
          "favorit",
          "favrite",
        ],
      },
      {
        q: `Which word is spelled correctly?`,
        answer: isUK ? "centre" : "center",
        options: [isUK ? "centre" : "center", "centr", "centar", "sentre"],
      },
      {
        q: `Which word is spelled correctly?`,
        answer: isUK ? "programme" : "program",
        options: [
          isUK ? "programme" : "program",
          "programe",
          "progrm",
          "prograhm",
        ],
      },
      {
        q: `Which is a complete sentence?`,
        answer: "The cat chased the mouse.",
        options: [
          "Chased the mouse.",
          "The cat chased the mouse.",
          "Under the table.",
          "Running in the yard.",
        ],
      },
      {
        q: `What is the plural of 'sheep'?`,
        answer: "sheep",
        options: ["sheeps", "sheep", "sheepes", "shoop"],
      },
      {
        q: `What is the plural of 'tooth'?`,
        answer: "teeth",
        options: ["toothes", "teeth", "tooths", "teeths"],
      },
      {
        q: `What is the plural of 'foot'?`,
        answer: "feet",
        options: ["foots", "feet", "feets", "footen"],
      },
      {
        q: `Choose the synonym for 'begin':`,
        answer: "start",
        options: ["finish", "start", "stop", "end"],
      },
      {
        q: `Choose the synonym for 'end':`,
        answer: "finish",
        options: ["start", "begin", "finish", "open"],
      },
    ];
  } else if (topicId === "biology") {
    pool = [
      {
        q: `What do green plants need to produce food via photosynthesis?`,
        answer: "Sunlight",
        options: ["Sunlight", "Darkness", "Plastic", "Sound"],
      },
      {
        q: `Which animal group is warm-blooded and has hair or fur?`,
        answer: "Mammals",
        options: ["Mammals", "Reptiles", "Amphibians", "Fish"],
      },
      {
        q: `What part of a flowering plant anchors it and absorbs water?`,
        answer: "Roots",
        options: ["Roots", "Leaves", "Petals", "Stem"],
      },
      {
        q: `Which gas do humans inhale that is vital for respiration?`,
        answer: "Oxygen",
        options: ["Oxygen", "Carbon Dioxide", "Helium", "Nitrogen"],
      },
      {
        q: `Which gas do plants absorb from the air during photosynthesis?`,
        answer: "Carbon dioxide",
        options: ["Oxygen", "Carbon dioxide", "Hydrogen", "Argon"],
      },
      {
        q: `Which of these is an amphibian?`,
        answer: "Frog",
        options: ["Frog", "Eagle", "Lion", "Shark"],
      },
      {
        q: `What is the life cycle stage of a butterfly between caterpillar and adult?`,
        answer: "Pupa",
        options: ["Egg", "Pupa", "Tadpole", "Seed"],
      },
      {
        q: `Which organism is a primary producer in a food chain?`,
        answer: "Grass",
        options: ["Grass", "Lion", "Hawk", "Frog"],
      },
      {
        q: `What do we call animals that eat only plants?`,
        answer: "Herbivores",
        options: ["Herbivores", "Carnivores", "Omnivores", "Decomposers"],
      },
      {
        q: `What do we call animals that eat other animals?`,
        answer: "Carnivores",
        options: ["Herbivores", "Carnivores", "Producers", "Seedlings"],
      },
      {
        q: `What do we call animals that eat both plants and animals?`,
        answer: "Omnivores",
        options: ["Herbivores", "Carnivores", "Omnivores", "Decomposers"],
      },
      {
        q: `Which organ in the human body pumps blood?`,
        answer: "Heart",
        options: ["Heart", "Lungs", "Brain", "Stomach"],
      },
      {
        q: `Which organ in the human body is responsible for breathing?`,
        answer: "Lungs",
        options: ["Heart", "Lungs", "Liver", "Kidneys"],
      },
      {
        q: `Which organ controls thoughts, memory, and body actions?`,
        answer: "Brain",
        options: ["Heart", "Brain", "Stomach", "Bones"],
      },
      {
        q: `What is the outer covering of birds?`,
        answer: "Feathers",
        options: ["Feathers", "Fur", "Scales", "Shell"],
      },
      {
        q: `What is the outer covering of fish?`,
        answer: "Scales",
        options: ["Feathers", "Fur", "Scales", "Hair"],
      },
      {
        q: `Which of these is a reptile?`,
        answer: "Snake",
        options: ["Snake", "Frog", "Dolphin", "Robin"],
      },
      {
        q: `Where do most plants get their nutrients from?`,
        answer: "Soil",
        options: ["Soil", "Air only", "Clouds", "Rocks"],
      },
      {
        q: `What is habitat?`,
        answer: "Environment",
        options: ["Environment", "Food", "Weather", "Zoo"],
      },
      {
        q: `What is pollination?`,
        answer: "Pollen transfer",
        options: ["Pollen transfer", "Watering", "Root growth", "Decay"],
      },
      {
        q: `Which insect is famous for making honey?`,
        answer: "Bee",
        options: ["Bee", "Ant", "Fly", "Wasp"],
      },
      {
        q: `What do earthworms do for soil?`,
        answer: "Aerate",
        options: ["Aerate", "Poison", "Dry", "Bake"],
      },
      {
        q: `What is an ecosystem?`,
        answer: "Community",
        options: ["Community", "Rock", "Cloud", "Star"],
      },
      {
        q: `Which vertebrate group lays leathery or hard shells on land?`,
        answer: "Reptiles",
        options: ["Reptiles", "Mammals", "Amphibians", "Fish"],
      },
      {
        q: `What is the main function of plant leaves?`,
        answer: "Photosynthesis",
        options: [
          "Photosynthesis",
          "Anchoring",
          "Drinking mud",
          "Making noise",
        ],
      },
      {
        q: `Which of these is a deciduous tree?`,
        answer: "Oak",
        options: ["Oak", "Pine", "Fir", "Cactus"],
      },
      {
        q: `Which of these is an evergreen tree?`,
        answer: "Pine",
        options: ["Pine", "Oak", "Maple", "Apple"],
      },
      {
        q: `What is a vertebrate?`,
        answer: "Backbone",
        options: ["Backbone", "No backbone", "Plant", "Fungus"],
      },
      {
        q: `What is an invertebrate?`,
        answer: "No backbone",
        options: ["No backbone", "Backbone", "Bird", "Mammal"],
      },
      {
        q: `Which of these is an invertebrate?`,
        answer: "Spider",
        options: ["Spider", "Dog", "Bird", "Fish"],
      },
      {
        q: `What is an adaptation?`,
        answer: "Survival trait",
        options: ["Survival trait", "Disease", "Color", "Food"],
      },
      {
        q: `Why do birds migrate in winter?`,
        answer: "Food and warmth",
        options: ["Food and warmth", "To sleep", "To hide", "They don't"],
      },
      {
        q: `What is hibernation?`,
        answer: "Winter sleep",
        options: ["Winter sleep", "Running", "Eating", "Flying"],
      },
      {
        q: `Which animal hibernates in winter?`,
        answer: "Bear",
        options: ["Bear", "Lion", "Shark", "Eagle"],
      },
      {
        q: `What is a food chain?`,
        answer: "Energy sequence",
        options: ["Energy sequence", "Grocery list", "Recipe", "House"],
      },
      {
        q: `What is the ultimate source of energy for life on Earth?`,
        answer: "The Sun",
        options: ["The Sun", "Volcanoes", "Moon", "Ocean"],
      },
      {
        q: `What do microorganisms include?`,
        answer: "Bacteria",
        options: ["Bacteria", "Whales", "Trees", "Birds"],
      },
      {
        q: `Which fungi makes bread rise?`,
        answer: "Yeast",
        options: ["Yeast", "Mushroom", "Mold", "Algae"],
      },
      {
        q: `What is seed dispersal?`,
        answer: "Seed transport",
        options: ["Seed transport", "Eating", "Watering", "Planting"],
      },
      {
        q: `How are dandelion seeds dispersed?`,
        answer: "Wind",
        options: ["Wind", "Swimming", "Tunneling", "Lightning"],
      },
      {
        q: `What is germination?`,
        answer: "Seed growth",
        options: ["Seed growth", "Decay", "Petal drop", "Root rot"],
      },
      {
        q: `What do seeds need to germinate?`,
        answer: "Water and warmth",
        options: ["Water and warmth", "Darkness", "Salt", "Sound"],
      },
      {
        q: `Which skeletal part protects the brain?`,
        answer: "Skull",
        options: ["Skull", "Ribcage", "Spine", "Pelvis"],
      },
      {
        q: `Which skeletal part protects the heart and lungs?`,
        answer: "Ribcage",
        options: ["Skull", "Ribcage", "Arms", "Legs"],
      },
      {
        q: `What is the function of joints?`,
        answer: "Flexible movement",
        options: [
          "Flexible movement",
          "Blood making",
          "Digestion",
          "Water storage",
        ],
      },
      {
        q: `What connects muscles to bones?`,
        answer: "Tendons",
        options: ["Tendons", "Ligaments", "Skin", "Hair"],
      },
      {
        q: `What connects bones to bones?`,
        answer: "Ligaments",
        options: ["Ligaments", "Tendons", "Muscles", "Nerves"],
      },
      {
        q: `Why are muscles in pairs?`,
        answer: "Opposing pull",
        options: ["Opposing pull", "Symmetry", "Warmth", "Fat storage"],
      },
      {
        q: `What is a balanced diet?`,
        answer: "Healthy foods",
        options: ["Healthy foods", "Sweets only", "Meat only", "Starvation"],
      },
      {
        q: `Why does the body need calcium?`,
        answer: "Strong bones",
        options: ["Strong bones", "Hair color", "Running", "Breathing"],
      },
      {
        q: `Which blood cells fight infections?`,
        answer: "White blood cells",
        options: [
          "Red blood cells",
          "White blood cells",
          "Platelets",
          "Plasma",
        ],
      },
      {
        q: `Which blood cells carry oxygen?`,
        answer: "Red blood cells",
        options: [
          "Red blood cells",
          "White blood cells",
          "Platelets",
          "Plasma",
        ],
      },
      {
        q: `What is pollination by insects called?`,
        answer: "Biotic",
        options: ["Biotic", "Wind", "Water", "Self"],
      },
      {
        q: `What is metamorphosis?`,
        answer: "Body transformation",
        options: ["Body transformation", "Sleeping", "Growing", "Eating"],
      },
      {
        q: `Which animal undergoes complete metamorphosis?`,
        answer: "Butterfly",
        options: ["Butterfly", "Dog", "Human", "Kangaroo"],
      },
    ];
  } else if (topicId === "chemistry") {
    pool = [
      {
        q: `What is water in its solid state called?`,
        answer: "Ice",
        options: ["Ice", "Steam", "Gas", "Magma"],
      },
      {
        q: `What is water in its gas state called?`,
        answer: "Steam",
        options: ["Ice", "Steam", "Solid", "Rock"],
      },
      {
        q: `Is wood a solid, liquid, or gas?`,
        answer: "Solid",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
      },
      {
        q: `Which process turns liquid water into gas?`,
        answer: "Evaporation",
        options: ["Evaporation", "Freezing", "Melting", "Condensation"],
      },
      {
        q: `Which process turns water vapour into liquid droplets?`,
        answer: "Condensation",
        options: ["Evaporation", "Condensation", "Melting", "Freezing"],
      },
      {
        q: `At what temperature does pure water freeze into ice (°C)?`,
        answer: "0°C",
        options: ["0°C", "50°C", "100°C", "-10°C"],
      },
      {
        q: `At what temperature does pure water boil into steam (°C)?`,
        answer: "100°C",
        options: ["0°C", "50°C", "100°C", "212°C"],
      },
      {
        q: `Which material is magnetic?`,
        answer: "Iron",
        options: ["Iron", "Wood", "Plastic", "Rubber"],
      },
      {
        q: `What is a solid?`,
        answer: "Fixed shape and volume",
        options: ["Fixed shape and volume", "Fluid", "Gas", "Plasma"],
      },
      {
        q: `What is a liquid?`,
        answer: "Flows and takes container shape",
        options: [
          "Flows and takes container shape",
          "Rigid",
          "Compressed gas",
          "Crystal",
        ],
      },
      {
        q: `What is a gas?`,
        answer: "Fills available space",
        options: ["Fills available space", "Hard", "Puddle", "Ice"],
      },
      {
        q: `What happens when you heat ice?`,
        answer: "Melts into water",
        options: ["Melts into water", "Turns to rock", "Disappears", "Freezes"],
      },
      {
        q: `What happens when you cool water below 0°C?`,
        answer: "Freezes into ice",
        options: ["Freezes into ice", "Boils", "Turns to gas", "Nothing"],
      },
      {
        q: `Which of these is a liquid at room temperature?`,
        answer: "Milk",
        options: ["Milk", "Rock", "Wood", "Iron"],
      },
      {
        q: `Which of these is a gas at room temperature?`,
        answer: "Oxygen",
        options: ["Oxygen", "Stone", "Gold", "Water"],
      },
      {
        q: `What is melting?`,
        answer: "Solid to liquid",
        options: [
          "Solid to liquid",
          "Liquid to gas",
          "Gas to liquid",
          "Liquid to solid",
        ],
      },
      {
        q: `What is freezing?`,
        answer: "Liquid to solid",
        options: ["Liquid to solid", "Solid to gas", "Boiling", "Evaporating"],
      },
      {
        q: `What is boiling?`,
        answer: "Vaporization when heated",
        options: ["Vaporization when heated", "Cooling", "Freezing", "Melting"],
      },
      {
        q: `Which material is transparent?`,
        answer: "Glass",
        options: ["Glass", "Wood", "Brick", "Cardboard"],
      },
      {
        q: `Which material is opaque?`,
        answer: "Brick",
        options: ["Brick", "Glass", "Plastic film", "Water"],
      },
      {
        q: `Which material is waterproof?`,
        answer: "Plastic",
        options: ["Plastic", "Paper", "Cloth", "Cardboard"],
      },
      {
        q: `Which material absorbs water easily?`,
        answer: "Sponge",
        options: ["Sponge", "Plastic", "Rubber", "Glass"],
      },
      {
        q: `What is a mixture?`,
        answer: "Combined substances",
        options: [
          "Combined substances",
          "Pure element",
          "Melted plastic",
          "Frozen water",
        ],
      },
      {
        q: `How can you separate sand and iron filings?`,
        answer: "Magnet",
        options: ["Magnet", "Boiling", "Filtering", "Freezing"],
      },
      {
        q: `How can you separate sand from water?`,
        answer: "Filtering",
        options: ["Filtering", "Evaporation", "Freezing", "Magnetism"],
      },
      {
        q: `How can you separate salt dissolved in water?`,
        answer: "Evaporation",
        options: ["Evaporation", "Magnet", "Sieve", "Strainer"],
      },
      {
        q: `What does 'soluble' mean?`,
        answer: "Dissolves in liquid",
        options: ["Dissolves in liquid", "Waterproof", "Magnetic", "Rock"],
      },
      {
        q: `What does 'insoluble' mean?`,
        answer: "Does not dissolve",
        options: ["Does not dissolve", "Melts", "Gas", "Invisible"],
      },
      {
        q: `Is sugar soluble in water?`,
        answer: "Yes",
        options: ["Yes", "No", "Oil only", "Frozen"],
      },
      {
        q: `Is sand soluble in water?`,
        answer: "No",
        options: ["Yes", "No", "Always", "Instantly"],
      },
      {
        q: `What is a reversible change?`,
        answer: "Can be undone",
        options: [
          "Can be undone",
          "Burning wood",
          "Baking cake",
          "Cooking egg",
        ],
      },
      {
        q: `What is an irreversible change?`,
        answer: "Cannot be undone",
        options: [
          "Cannot be undone",
          "Melting chocolate",
          "Freezing water",
          "Dissolving salt",
        ],
      },
      {
        q: `Is baking a cake reversible or irreversible?`,
        answer: "Irreversible",
        options: ["Reversible", "Irreversible", "Magnetic", "Evaporative"],
      },
      {
        q: `Is dissolving sugar reversible?`,
        answer: "Yes",
        options: ["Yes", "No", "Irreversible", "Explosive"],
      },
      {
        q: `What is a chemical reaction?`,
        answer: "New substances formed",
        options: ["New substances formed", "Freezing", "Melting", "Cutting"],
      },
      {
        q: `Evidence of chemical reaction:`,
        answer: "Fizzing or color change",
        options: ["Fizzing or color change", "Melting", "Folding", "Boiling"],
      },
      {
        q: `Condensation in water cycle:`,
        answer: "Gas to liquid cloud",
        options: ["Gas to liquid cloud", "Rain", "River", "Melting"],
      },
      {
        q: `Precipitation in water cycle:`,
        answer: "Rain or snow",
        options: ["Rain or snow", "Puddle drying", "Sun", "Wind"],
      },
      {
        q: `Evaporation driver:`,
        answer: "Sun's heat",
        options: ["Sun's heat", "Moonlight", "Earthquake", "Snow"],
      },
      {
        q: `Why do puddles disappear?`,
        answer: "Evaporation",
        options: ["Evaporation", "Animals", "Absorption", "Freezing"],
      },
      {
        q: `Thermal conductivity:`,
        answer: "Heat transfer",
        options: ["Heat transfer", "Loudness", "Weight", "Color"],
      },
      {
        q: `Good thermal insulator:`,
        answer: "Wool",
        options: ["Wool", "Copper", "Iron", "Silver"],
      },
      {
        q: `Good thermal conductor:`,
        answer: "Metal",
        options: ["Metal", "Wood", "Plastic", "Cloth"],
      },
      {
        q: `Electrical conductivity:`,
        answer: "Electricity flow",
        options: [
          "Electricity flow",
          "Light reflection",
          "Magnetism",
          "Melting",
        ],
      },
      {
        q: `Electrical conductor:`,
        answer: "Copper wire",
        options: ["Copper wire", "Rubber", "Plastic", "Wood"],
      },
      {
        q: `Electrical insulator:`,
        answer: "Rubber",
        options: ["Rubber", "Copper", "Iron", "Aluminum"],
      },
      {
        q: `Baking soda and vinegar mix:`,
        answer: "Fizzing and carbon dioxide",
        options: ["Fizzing and carbon dioxide", "Gold", "Ice", "Nothing"],
      },
      {
        q: `What is rust?`,
        answer: "Iron oxide",
        options: ["Iron oxide", "Paint", "Plastic", "Silver"],
      },
      {
        q: `What causes rust?`,
        answer: "Oxygen and water",
        options: ["Oxygen and water", "Ice and dark", "Salt only", "Heat"],
      },
      {
        q: `Preventing rust:`,
        answer: "Painting or oiling",
        options: ["Painting or oiling", "Adding water", "Rain", "Heating"],
      },
      {
        q: `What is a solution?`,
        answer: "Solute in solvent",
        options: ["Solute in solvent", "Rock", "Oil", "Gas"],
      },
      {
        q: `What is a solute?`,
        answer: "Dissolved substance",
        options: ["Dissolved substance", "Liquid solvent", "Brick", "Rock"],
      },
      {
        q: `What is a solvent?`,
        answer: "Dissolving liquid",
        options: ["Dissolving liquid", "Solid", "Metal", "Plastic"],
      },
    ];
  } else if (topicId === "physics") {
    pool = [
      {
        q: `Which force pulls objects down toward Earth?`,
        answer: "Gravity",
        options: ["Gravity", "Magnetism", "Friction", "Tension"],
      },
      {
        q: `What travels faster across the universe?`,
        answer: "Light",
        options: ["Light", "Sound", "Cheetah", "Rocket"],
      },
      {
        q: `What type of energy do we get from the Sun?`,
        answer: "Light and Heat",
        options: ["Light and Heat", "Sound", "Nuclear", "Magnetic"],
      },
      {
        q: `Which poles of two magnets attract each other?`,
        answer: "Opposite poles",
        options: ["Opposite poles", "Like poles", "Neither", "Both North"],
      },
      {
        q: `What creates sound waves?`,
        answer: "Vibrations",
        options: ["Vibrations", "Colors", "Silence", "Shadows"],
      },
      {
        q: `What is friction?`,
        answer: "Resistance to motion",
        options: [
          "Resistance to motion",
          "Magnetic push",
          "Gravity pull",
          "Light beam",
        ],
      },
      {
        q: `Which surface creates the most friction?`,
        answer: "Rough carpet",
        options: ["Rough carpet", "Smooth ice", "Glass", "Oiled metal"],
      },
      {
        q: `Which surface creates the least friction?`,
        answer: "Ice",
        options: ["Ice", "Sandpaper", "Road", "Mud"],
      },
      {
        q: `What is air resistance?`,
        answer: "Drag in air",
        options: ["Drag in air", "Magnetic pull", "Gravity", "Sound"],
      },
      {
        q: `What shape reduces air resistance?`,
        answer: "Streamlined teardrop",
        options: ["Streamlined teardrop", "Flat box", "Cube", "Sphere"],
      },
      {
        q: `What is water resistance?`,
        answer: "Drag in water",
        options: ["Drag in water", "Boiling", "Melting", "Gravity"],
      },
      {
        q: `What does a simple lever do?`,
        answer: "Lifts heavy loads with a pivot",
        options: [
          "Lifts heavy loads with a pivot",
          "Generates electricity",
          "Freezes water",
          "Makes sound",
        ],
      },
      {
        q: `What is a pulley used for?`,
        answer: "Lifting with ropes and wheels",
        options: [
          "Lifting with ropes and wheels",
          "Painting",
          "Measuring",
          "Cooking",
        ],
      },
      {
        q: `What is a gear?`,
        answer: "Toothed wheel for motion",
        options: [
          "Toothed wheel for motion",
          "Rubber band",
          "Magnet",
          "Battery",
        ],
      },
      {
        q: `Power source in simple circuit:`,
        answer: "Battery",
        options: ["Battery", "Wooden stick", "Cord", "Bulb"],
      },
      {
        q: `Switch function in circuit:`,
        answer: "Turns circuit on or off",
        options: [
          "Turns circuit on or off",
          "Increases battery",
          "Destroys power",
          "Creates water",
        ],
      },
      {
        q: `Electrical conductor:`,
        answer: "Copper wire",
        options: ["Copper wire", "Rubber", "Wood", "Plastic"],
      },
      {
        q: `Electrical insulator:`,
        answer: "Plastic",
        options: ["Plastic", "Copper", "Iron", "Aluminum"],
      },
      {
        q: `Adding more batteries to circuit:`,
        answer: "Brighter bulb",
        options: ["Brighter bulb", "Turns off", "Freezes", "Reverses time"],
      },
      {
        q: `Earth's natural satellite:`,
        answer: "The Moon",
        options: ["The Moon", "Mars", "Sun", "Venus"],
      },
      {
        q: `Earth rotation time (1 day):`,
        answer: "24 hours",
        options: ["24 hours", "365 days", "1 month", "1 hour"],
      },
      {
        q: `Earth orbit time (1 year):`,
        answer: "365 days",
        options: ["365 days", "24 hours", "30 days", "7 days"],
      },
      {
        q: `Cause of day and night:`,
        answer: "Earth rotation",
        options: [
          "Earth rotation",
          "Sun turning off",
          "Clouds",
          "Moon blocking",
        ],
      },
      {
        q: `Closest planet to Sun:`,
        answer: "Mercury",
        options: ["Mercury", "Earth", "Mars", "Neptune"],
      },
      {
        q: `Red Planet:`,
        answer: "Mars",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
      },
      {
        q: `Largest planet:`,
        answer: "Jupiter",
        options: ["Jupiter", "Saturn", "Earth", "Neptune"],
      },
      {
        q: `Ringed planet:`,
        answer: "Saturn",
        options: ["Saturn", "Mars", "Venus", "Mercury"],
      },
      {
        q: `What is light?`,
        answer: "Energy that lets us see",
        options: ["Energy that lets us see", "Sound", "Liquid", "Magnetism"],
      },
      {
        q: `How shadows form:`,
        answer: "Object blocks light",
        options: ["Object blocks light", "Bright lights", "Mirrors", "Echoes"],
      },
      {
        q: `Light on flat mirror:`,
        answer: "Reflects equally",
        options: ["Reflects equally", "Absorbed", "Turns to sound", "Stops"],
      },
      {
        q: `Refraction of light:`,
        answer: "Bending of light",
        options: ["Bending of light", "Reflection", "Darkness", "Shadow"],
      },
      {
        q: `Colors of rainbow:`,
        answer: "ROYGBIV",
        options: ["ROYGBIV", "Black and white", "Brown", "Pink"],
      },
      {
        q: `Volume of sound:`,
        answer: "Loudness",
        options: ["Loudness", "Pitch", "Speed", "Color"],
      },
      {
        q: `Pitch of sound:`,
        answer: "High or low",
        options: ["High or low", "Loudness", "Length", "Weight"],
      },
      {
        q: `Higher pitch on string instrument:`,
        answer: "Shorter/tighter string",
        options: [
          "Shorter/tighter string",
          "Longer string",
          "Underwater",
          "Darkness",
        ],
      },
      {
        q: `Air pressure:`,
        answer: "Pushing air force",
        options: [
          "Pushing air force",
          "Wind speed",
          "Temperature",
          "Rain weight",
        ],
      },
      {
        q: `Buoyancy:`,
        answer: "Upward fluid force",
        options: ["Upward fluid force", "Gravity", "Magnetism", "Drag"],
      },
      {
        q: `Why steel ships float:`,
        answer: "Displaced water buoyant force",
        options: [
          "Displaced water buoyant force",
          "Steel is lighter",
          "Magnets",
          "Wind",
        ],
      },
      {
        q: `Kinetic energy:`,
        answer: "Energy of motion",
        options: ["Energy of motion", "Stored energy", "Magnetism", "Darkness"],
      },
      {
        q: `Potential energy:`,
        answer: "Stored energy",
        options: ["Stored energy", "Motion", "Light", "Sound"],
      },
      {
        q: `Force unit:`,
        answer: "Newtons",
        options: ["Newtons", "Kilograms", "Joules", "Watts"],
      },
      {
        q: `Current unit:`,
        answer: "Amperes",
        options: ["Amperes", "Volts", "Ohms", "Watts"],
      },
      {
        q: `Sound unit:`,
        answer: "Decibels",
        options: ["Decibels", "Hertz", "Meters", "Grams"],
      },
      {
        q: `Momentum:`,
        answer: "Mass in motion",
        options: ["Mass in motion", "Stored heat", "Voltage", "Light"],
      },
      {
        q: `Earth's galaxy:`,
        answer: "Milky Way",
        options: ["Milky Way", "Andromeda", "Sombrero", "Triangulum"],
      },
    ];
  } else if (topicId === "history") {
    if (isUK) {
      pool = [
        {
          q: `Which famous civilization built the Great Pyramids?`,
          answer: "Ancient Egyptians",
          options: ["Ancient Egyptians", "Romans", "Vikings", "Greeks"],
        },
        {
          q: `Who won the Battle of Hastings in 1066?`,
          answer: "William the Conqueror",
          options: [
            "William the Conqueror",
            "King Harold",
            "Julius Caesar",
            "Queen Victoria",
          ],
        },
        {
          q: `During which historical era did Queen Victoria rule Britain?`,
          answer: "Victorian Era",
          options: ["Victorian Era", "Stone Age", "Tudor", "World War II"],
        },
        {
          q: `Which Roman emperor initiated Hadrian's Wall across Britain?`,
          answer: "Hadrian",
          options: ["Hadrian", "Nero", "Augustus", "Trajan"],
        },
        {
          q: `Who was the Tudor king with six wives?`,
          answer: "Henry VIII",
          options: ["Henry VIII", "Edward VI", "Richard III", "William III"],
        },
        {
          q: `What period came first in British history?`,
          answer: "Stone Age",
          options: ["Stone Age", "Victorian Era", "World War II", "Roman Era"],
        },
        {
          q: `Scandianvian raiders of early Britain:`,
          answer: "Vikings",
          options: ["Vikings", "Romans", "Greeks", "Normans"],
        },
        {
          q: `Year of the Great Fire of London:`,
          answer: "1666",
          options: ["1666", "1066", "1588", "1805"],
        },
        {
          q: `WWII British Prime Minister:`,
          answer: "Winston Churchill",
          options: [
            "Winston Churchill",
            "Neville Chamberlain",
            "Clement Attlee",
            "Queen Elizabeth",
          ],
        },
        {
          q: `Queen with 63-year 19th-century reign:`,
          answer: "Queen Victoria",
          options: ["Queen Victoria", "Elizabeth I", "Mary", "Cleopatra"],
        },
        {
          q: `Who discovered penicillin in 1928?`,
          answer: "Alexander Fleming",
          options: [
            "Alexander Fleming",
            "Isaac Newton",
            "Charles Darwin",
            "Stephen Hawking",
          ],
        },
        {
          q: `Famous Crimean War nurse ("Lady with the Lamp"):`,
          answer: "Florence Nightingale",
          options: [
            "Florence Nightingale",
            "Queen Victoria",
            "Boadicea",
            "Emmeline Pankhurst",
          ],
        },
        {
          q: `Suffragette movement leader:`,
          answer: "Emmeline Pankhurst",
          options: [
            "Emmeline Pankhurst",
            "Florence Nightingale",
            "Elizabeth Fry",
            "Margaret Thatcher",
          ],
        },
        {
          q: `Ancient wonder in Alexandria, Egypt:`,
          answer: "Lighthouse of Alexandria",
          options: [
            "Lighthouse of Alexandria",
            "Colosseum",
            "Eiffel Tower",
            "Big Ben",
          ],
        },
        {
          q: `First female UK Prime Minister:`,
          answer: "Margaret Thatcher",
          options: [
            "Margaret Thatcher",
            "Theresa May",
            "Liz Truss",
            "Queen Victoria",
          ],
        },
        {
          q: `Ship that sank in 1912:`,
          answer: "Titanic",
          options: ["Titanic", "Mayflower", "HMS Victory", "Mary Rose"],
        },
        {
          q: `King who signed the Magna Carta in 1215:`,
          answer: "King John",
          options: ["King John", "Henry VIII", "Richard", "Alfred"],
        },
        {
          q: `Anglo-Saxon king who burnt cakes:`,
          answer: "Alfred the Great",
          options: ["Alfred the Great", "Edward", "Harold", "Athelstan"],
        },
        {
          q: `Roman bath heating system:`,
          answer: "Hypocaust",
          options: ["Hypocaust", "Electric", "Coal", "Solar"],
        },
        {
          q: `Celtic queen who fought Romans:`,
          answer: "Boudica",
          options: ["Boudica", "Cleopatra", "Nefertiti", "Elizabeth"],
        },
        {
          q: `Century when WWI started:`,
          answer: "20th century",
          options: ["20th century", "19th", "18th", "21st"],
        },
        {
          q: `Year WWII ended:`,
          answer: "1945",
          options: ["1945", "1918", "1939", "1950"],
        },
        {
          q: `Teacher of Alexander the Great:`,
          answer: "Aristotle",
          options: ["Aristotle", "Plato", "Socrates", "Pythagoras"],
        },
        {
          q: `Empire of Julius Caesar and Augustus:`,
          answer: "Roman Empire",
          options: ["Roman Empire", "Greek", "Persian", "British"],
        },
        {
          q: `Ancient Egyptian writing paper:`,
          answer: "Papyrus",
          options: ["Papyrus", "Paper", "Clay", "Parchment"],
        },
        {
          q: `Inventor of printing press:`,
          answer: "Johannes Gutenberg",
          options: [
            "Johannes Gutenberg",
            "Thomas Edison",
            "Leonardo",
            "Newton",
          ],
        },
        {
          q: `Explorer on Golden Hind:`,
          answer: "Sir Francis Drake",
          options: [
            "Sir Francis Drake",
            "James Cook",
            "Walter Raleigh",
            "Henry Hudson",
          ],
        },
        {
          q: `Naval commander at Trafalgar (1805):`,
          answer: "Horatio Nelson",
          options: ["Horatio Nelson", "Churchill", "Drake", "Wellington"],
        },
        {
          q: `Victor of Waterloo (1815):`,
          answer: "Duke of Wellington",
          options: ["Duke of Wellington", "Nelson", "Churchill", "George III"],
        },
        {
          q: `Ancient Chinese defense wall:`,
          answer: "Great Wall of China",
          options: [
            "Great Wall of China",
            "Hadrian's Wall",
            "Pyramids",
            "Colosseum",
          ],
        },
        {
          q: `Mesopotamian writing script:`,
          answer: "Cuneiform",
          options: ["Cuneiform", "Hieroglyphics", "Latin", "Greek"],
        },
        {
          q: `Egyptian queen allied with Caesar:`,
          answer: "Cleopatra",
          options: ["Cleopatra", "Nefertiti", "Hatshepsut", "Ankhesenamun"],
        },
        {
          q: `Egyptian body preservation:`,
          answer: "Mummification",
          options: ["Mummification", "Cremation", "Freezing", "Painting"],
        },
        {
          q: `King Arthur's sword legend:`,
          answer: "Sword in the stone",
          options: [
            "Sword in the stone",
            "Excalibur only",
            "Golden fleece",
            "Holy grail",
          ],
        },
        {
          q: `Sherwood Forest outlaw:`,
          answer: "Robin Hood",
          options: ["Robin Hood", "King Arthur", "Guy Fawkes", "Cromwell"],
        },
        {
          q: `1605 Parliament bomb plotters leader:`,
          answer: "Guy Fawkes",
          options: ["Guy Fawkes", "Cromwell", "Charles I", "Henry VIII"],
        },
        {
          q: `Parliamentarian leader in Civil War:`,
          answer: "Oliver Cromwell",
          options: [
            "Oliver Cromwell",
            "Charles I",
            "Charles II",
            "Shakespeare",
          ],
        },
        {
          q: `Playwright of Romeo and Juliet:`,
          answer: "William Shakespeare",
          options: [
            "William Shakespeare",
            "Charles Dickens",
            "Jane Austen",
            "Chaucer",
          ],
        },
        {
          q: `Author of Oliver Twist:`,
          answer: "Charles Dickens",
          options: ["Charles Dickens", "Shakespeare", "Rowling", "Roald Dahl"],
        },
        {
          q: `Theory of evolution author:`,
          answer: "Charles Darwin",
          options: ["Charles Darwin", "Isaac Newton", "Einstein", "Pasteur"],
        },
        {
          q: `Discoverer of gravity (apple):`,
          answer: "Sir Isaac Newton",
          options: ["Sir Isaac Newton", "Einstein", "Galileo", "Edison"],
        },
        {
          q: `First person on the Moon:`,
          answer: "Neil Armstrong",
          options: [
            "Neil Armstrong",
            "Buzz Aldrin",
            "Yuri Gagarin",
            "Columbus",
          ],
        },
        {
          q: `First space satellite (1957):`,
          answer: "Sputnik 1",
          options: ["Sputnik 1", "Apollo 11", "Voyager", "Hubble"],
        },
        {
          q: `First woman to fly solo across Atlantic:`,
          answer: "Amelia Earhart",
          options: [
            "Amelia Earhart",
            "Florence Nightingale",
            "Rosa Parks",
            "Marie Curie",
          ],
        },
        {
          q: `Developer of relativity theory:`,
          answer: "Albert Einstein",
          options: ["Albert Einstein", "Newton", "Tesla", "Hawking"],
        },
        {
          q: `Discoverer of polonium and radium:`,
          answer: "Marie Curie",
          options: ["Marie Curie", "Franklin", "Lovelace", "Earhart"],
        },
        {
          q: `Inventor of incandescent light bulb:`,
          answer: "Thomas Edison",
          options: ["Thomas Edison", "Bell", "Tesla", "Wright Brothers"],
        },
        {
          q: `Inventor of the telephone:`,
          answer: "Alexander Graham Bell",
          options: ["Alexander Graham Bell", "Edison", "Marconi", "Ford"],
        },
        {
          q: `Inventors of the first airplane (1903):`,
          answer: "The Wright Brothers",
          options: ["The Wright Brothers", "Amelia Earhart", "Edison", "Bell"],
        },
        {
          q: `Birthplace of democracy:`,
          answer: "Athens",
          options: ["Athens", "Sparta", "Troy", "Corinth"],
        },
      ];
    } else {
      pool = [
        {
          q: `Who was the first President of the United States?`,
          answer: "George Washington",
          options: [
            "George Washington",
            "Abraham Lincoln",
            "Thomas Jefferson",
            "Benjamin Franklin",
          ],
        },
        {
          q: `In what year was the Declaration of Independence signed?`,
          answer: "1776",
          options: ["1492", "1776", "1861", "1903"],
        },
        {
          q: `Ancient Native American cliff-dwellers in Southwest:`,
          answer: "Ancestral Puebloans",
          options: ["Ancestral Puebloans", "Mayans", "Aztecs", "Incas"],
        },
        {
          q: `President during the American Civil War:`,
          answer: "Abraham Lincoln",
          options: [
            "Abraham Lincoln",
            "George Washington",
            "Andrew Jackson",
            "Theodore Roosevelt",
          ],
        },
        {
          q: `Explorer in 1492 under Spanish flag:`,
          answer: "Christopher Columbus",
          options: [
            "Christopher Columbus",
            "Neil Armstrong",
            "George Washington",
            "Thomas Edison",
          ],
        },
        {
          q: `1773 protest against tea taxes in Boston:`,
          answer: "Boston Tea Party",
          options: [
            "Boston Tea Party",
            "American Revolution",
            "Civil War",
            "Gold Rush",
          ],
        },
        {
          q: `Speaker of "I Have a Dream" speech (1963):`,
          answer: "Martin Luther King Jr.",
          options: [
            "Martin Luther King Jr.",
            "Abraham Lincoln",
            "John F. Kennedy",
            "Rosa Parks",
          ],
        },
        {
          q: `Constitutional amendment for women's suffrage:`,
          answer: "19th Amendment",
          options: [
            "19th Amendment",
            "1st Amendment",
            "13th Amendment",
            "22nd Amendment",
          ],
        },
        {
          q: `President who issued Emancipation Proclamation:`,
          answer: "Abraham Lincoln",
          options: ["Abraham Lincoln", "Washington", "Grant", "Jackson"],
        },
        {
          q: `1803 land deal doubling US territory:`,
          answer: "Louisiana Purchase",
          options: ["Louisiana Purchase", "Alaska", "Florida", "Oregon"],
        },
        {
          q: `Main author of Declaration of Independence:`,
          answer: "Thomas Jefferson",
          options: ["Thomas Jefferson", "Washington", "Franklin", "Adams"],
        },
        {
          q: `Civil rights activist on Montgomery bus:`,
          answer: "Rosa Parks",
          options: [
            "Rosa Parks",
            "Harriet Tubman",
            "Sojourner Truth",
            "Maya Angelou",
          ],
        },
        {
          q: `Conductor of Underground Railroad:`,
          answer: "Harriet Tubman",
          options: [
            "Harriet Tubman",
            "Rosa Parks",
            "Susan B. Anthony",
            "Clara Barton",
          ],
        },
        {
          q: `Year American Civil War started:`,
          answer: "1861",
          options: ["1861", "1776", "1914", "1941"],
        },
        {
          q: `Treaty ending Revolutionary War:`,
          answer: "Treaty of Paris (1783)",
          options: ["Treaty of Paris (1783)", "Ghent", "Versailles", "Peace"],
        },
        {
          q: `Native guide for Lewis and Clark:`,
          answer: "Sacagawea",
          options: ["Sacagawea", "Pocahontas", "Sitting Bull", "Geronimo"],
        },
        {
          q: `Inventor of the telegraph:`,
          answer: "Samuel Morse",
          options: ["Samuel Morse", "Bell", "Edison", "Franklin"],
        },
        {
          q: `Inventor of lightning rod:`,
          answer: "Benjamin Franklin",
          options: ["Benjamin Franklin", "Edison", "Ford", "Hamilton"],
        },
        {
          q: `Industrialist of assembly line car manufacturing:`,
          answer: "Henry Ford",
          options: ["Henry Ford", "Edison", "Carnegie", "Rockefeller"],
        },
        {
          q: `1929 stock market crash event:`,
          answer: "The Great Depression",
          options: [
            "The Great Depression",
            "WWI",
            "Gold Rush",
            "Industrial Revolution",
          ],
        },
        {
          q: `President during WWII and Depression:`,
          answer: "Franklin D. Roosevelt",
          options: ["Franklin D. Roosevelt", "Truman", "Hoover", "Eisenhower"],
        },
        {
          q: `President who ordered atomic weapons use in WWII:`,
          answer: "Harry S. Truman",
          options: ["Harry S. Truman", "Roosevelt", "Eisenhower", "Kennedy"],
        },
        {
          q: `Commander of Continental Army:`,
          answer: "George Washington",
          options: [
            "George Washington",
            "Benedict Arnold",
            "Nathan Hale",
            "Hamilton",
          ],
        },
        {
          q: `Supreme law of the US:`,
          answer: "The Constitution",
          options: [
            "The Constitution",
            "Declaration",
            "Bill of Rights",
            "Articles",
          ],
        },
        {
          q: `First ten constitutional amendments:`,
          answer: "The Bill of Rights",
          options: [
            "The Bill of Rights",
            "Preamble",
            "Federalist Papers",
            "Gettysburg Address",
          ],
        },
        {
          q: `Lincoln's speech at Gettysburg:`,
          answer: "Gettysburg Address",
          options: [
            "Gettysburg Address",
            "Inaugural",
            "Farewell",
            "Declaration",
          ],
        },
        {
          q: `First state to join Union:`,
          answer: "Delaware",
          options: ["Delaware", "Virginia", "Pennsylvania", "Massachusetts"],
        },
        {
          q: `1848 western migration rush:`,
          answer: "California Gold Rush",
          options: ["California Gold Rush", "Klondike", "Colorado", "Nevada"],
        },
        {
          q: `First American to orbit Earth:`,
          answer: "John Glenn",
          options: ["John Glenn", "Armstrong", "Aldrin", "Shepard"],
        },
        {
          q: `First American in space:`,
          answer: "Alan Shepard",
          options: ["Alan Shepard", "Glenn", "Armstrong", "Gagarin"],
        },
        {
          q: `President who founded national parks:`,
          answer: "Theodore Roosevelt",
          options: [
            "Theodore Roosevelt",
            "Franklin Roosevelt",
            "Lincoln",
            "Wilson",
          ],
        },
        {
          q: `Third US President:`,
          answer: "Thomas Jefferson",
          options: ["Thomas Jefferson", "Madison", "Monroe", "Adams"],
        },
        {
          q: `President during 1969 Moon landing:`,
          answer: "Richard Nixon",
          options: ["Richard Nixon", "Kennedy", "Johnson", "Ford"],
        },
        {
          q: `Tribe meeting Pilgrims in 1621:`,
          answer: "Wampanoag",
          options: ["Wampanoag", "Cherokee", "Navajo", "Sioux"],
        },
        {
          q: `Southern pre-Civil War economy base:`,
          answer: "Plantation slavery / Agriculture",
          options: [
            "Plantation slavery / Agriculture",
            "Manufacturing",
            "Tech",
            "Mining",
          ],
        },
        {
          q: `Eli Whitney invention for cotton:`,
          answer: "Cotton gin",
          options: ["Cotton gin", "Steamboat", "Locomotive", "Telegraph"],
        },
        {
          q: `Apache leader who resisted expansion:`,
          answer: "Geronimo",
          options: ["Geronimo", "Sitting Bull", "Crazy Horse", "Tecumseh"],
        },
        {
          q: `Lakota leader at Little Bighorn:`,
          answer: "Sitting Bull and Crazy Horse",
          options: [
            "Sitting Bull and Crazy Horse",
            "Chief Joseph",
            "Geronimo",
            "Tecumseh",
          ],
        },
        {
          q: `Turning point battle of Civil War:`,
          answer: "Battle of Gettysburg",
          options: [
            "Battle of Gettysburg",
            "Bull Run",
            "Antietam",
            "Appomattox",
          ],
        },
        {
          q: `Lee's surrender location:`,
          answer: "Appomattox Court House",
          options: [
            "Appomattox Court House",
            "Gettysburg",
            "Yorktown",
            "Valley Forge",
          ],
        },
        {
          q: `Second US President:`,
          answer: "John Adams",
          options: ["John Adams", "Jefferson", "Madison", "Hamilton"],
        },
        {
          q: `Colony founded by William Penn for Quakers:`,
          answer: "Pennsylvania",
          options: ["Pennsylvania", "Georgia", "Maryland", "New York"],
        },
        {
          q: `Early Florida colonizer power:`,
          answer: "Spain",
          options: ["Spain", "France", "Britain", "Netherlands"],
        },
        {
          q: `Forced Native relocation in 1830s:`,
          answer: "Trail of Tears",
          options: ["Trail of Tears", "Long Walk", "Oregon Trail", "Gold Rush"],
        },
        {
          q: `Phonograph and camera inventor:`,
          answer: "Thomas Edison",
          options: ["Thomas Edison", "Tesla", "Franklin", "Bell"],
        },
        {
          q: `AC electricity pioneer:`,
          answer: "Nikola Tesla",
          options: ["Nikola Tesla", "Edison", "Franklin", "Morse"],
        },
        {
          q: `First to reach South Pole (1911):`,
          answer: "Roald Amundsen",
          options: ["Roald Amundsen", "Peary", "Shackleton", "Columbus"],
        },
        {
          q: `Secret routes for escaping slavery:`,
          answer: "Underground Railroad",
          options: [
            "Underground Railroad",
            "Freedom Train",
            "Railway",
            "Oregon Trail",
          ],
        },
        {
          q: `Last of 50 states to join Union:`,
          answer: "Hawaii",
          options: ["Hawaii", "Alaska", "Arizona", "New Mexico"],
        },
        {
          q: `1960s civil rights leader (black nationalism):`,
          answer: "Malcolm X",
          options: [
            "Malcolm X",
            "Martin Luther King Jr.",
            "Rosa Parks",
            "John Lewis",
          ],
        },
      ];
    }
  } else if (topicId === "geography") {
    if (isUK) {
      pool = [
        {
          q: `What is the capital city of the United Kingdom?`,
          answer: "London",
          options: ["London", "Edinburgh", "Cardiff", "Belfast"],
        },
        {
          q: `Which river flows directly through London?`,
          answer: "River Thames",
          options: [
            "River Thames",
            "River Severn",
            "River Trent",
            "River Mersey",
          ],
        },
        {
          q: `What is the highest mountain peak in the UK?`,
          answer: "Ben Nevis",
          options: ["Ben Nevis", "Snowdon", "Scafell Pike", "Slieve Donard"],
        },
        {
          q: `How many countries make up the United Kingdom?`,
          answer: "4",
          options: ["2", "3", "4", "5"],
        },
        {
          q: `What is the capital of Scotland?`,
          answer: "Edinburgh",
          options: ["Edinburgh", "Glasgow", "London", "Belfast"],
        },
        {
          q: `What is the capital of Wales?`,
          answer: "Cardiff",
          options: ["Cardiff", "Swansea", "Edinburgh", "London"],
        },
        {
          q: `What is the capital of Northern Ireland?`,
          answer: "Belfast",
          options: ["Belfast", "Dublin", "Cardiff", "London"],
        },
        {
          q: `Imaginary line dividing Earth into Northern/Southern hemispheres:`,
          answer: "Equator",
          options: ["Equator", "Prime Meridian", "Tropic", "Arctic"],
        },
        {
          q: `Longest river in the UK:`,
          answer: "River Severn",
          options: [
            "River Severn",
            "River Thames",
            "River Trent",
            "River Ouse",
          ],
        },
        {
          q: `Loch Ness location country:`,
          answer: "Scotland",
          options: ["Scotland", "England", "Wales", "Northern Ireland"],
        },
        {
          q: `Capital of England:`,
          answer: "London",
          options: ["London", "Manchester", "Birmingham", "Liverpool"],
        },
        {
          q: `Sea separating Britain from Europe:`,
          answer: "North Sea and English Channel",
          options: [
            "North Sea and English Channel",
            "Mediterranean",
            "Pacific",
            "Baltic",
          ],
        },
        {
          q: `Mountain range known as spine of England:`,
          answer: "The Pennines",
          options: ["The Pennines", "Cambrian", "Grampians", "Cotswolds"],
        },
        {
          q: `Ocean northwest of British Isles:`,
          answer: "Atlantic Ocean",
          options: ["Atlantic Ocean", "Indian", "Southern", "Arctic"],
        },
        {
          q: `Largest continent on Earth:`,
          answer: "Asia",
          options: ["Asia", "Africa", "North America", "Europe"],
        },
        {
          q: `Smallest continent on Earth:`,
          answer: "Australia",
          options: ["Australia", "Antarctica", "Europe", "South America"],
        },
        {
          q: `Continent covered in ice sheet with no countries:`,
          answer: "Antarctica",
          options: ["Antarctica", "Asia", "Europe", "Africa"],
        },
        {
          q: `Largest hot desert in the world:`,
          answer: "Sahara Desert",
          options: ["Sahara Desert", "Gobi", "Mojave", "Kalahari"],
        },
        {
          q: `Mountain range with Mount Everest:`,
          answer: "The Himalayas",
          options: ["The Himalayas", "Andes", "Alps", "Rockies"],
        },
        {
          q: `Longest river in the world:`,
          answer: "Nile River",
          options: ["Nile River", "Amazon", "Mississippi", "Yangtze"],
        },
        {
          q: `Largest river by volume:`,
          answer: "Amazon River",
          options: ["Amazon River", "Nile", "Thames", "Danube"],
        },
        {
          q: `Four cardinal compass points:`,
          answer: "North, South, East, West",
          options: [
            "North, South, East, West",
            "Up, Down, Left, Right",
            "Top, Bottom",
            "Seasons",
          ],
        },
        {
          q: `Latitude measures:`,
          answer: "North or south of Equator",
          options: [
            "North or south of Equator",
            "East or west",
            "Depth",
            "Height",
          ],
        },
        {
          q: `Longitude measures:`,
          answer: "East or west of Prime Meridian",
          options: [
            "East or west of Prime Meridian",
            "North or south",
            "Wind",
            "Temp",
          ],
        },
        {
          q: `Map scale shows:`,
          answer: "Map to ground distance ratio",
          options: [
            "Map to ground distance ratio",
            "Temp",
            "Steepness",
            "Depth",
          ],
        },
        {
          q: `Group of islands:`,
          answer: "Archipelago",
          options: ["Archipelago", "Mountain", "Valley", "Desert"],
        },
        {
          q: `Land almost surrounded by water:`,
          answer: "Peninsula",
          options: ["Peninsula", "Island", "Volcano", "Mountain"],
        },
        {
          q: `Fertile spot in desert with water:`,
          answer: "Oasis",
          options: ["Oasis", "Dune", "Riverbed", "Iceberg"],
        },
        {
          q: `Largest ocean:`,
          answer: "Pacific Ocean",
          options: ["Pacific Ocean", "Atlantic", "Indian", "Arctic"],
        },
        {
          q: `Smallest and coldest ocean:`,
          answer: "Arctic Ocean",
          options: ["Arctic Ocean", "Pacific", "Atlantic", "Indian"],
        },
        {
          q: `Capital of France:`,
          answer: "Paris",
          options: ["Paris", "Berlin", "Rome", "Madrid"],
        },
        {
          q: `Capital of Italy:`,
          answer: "Rome",
          options: ["Rome", "Paris", "Athens", "London"],
        },
        {
          q: `Capital of Japan:`,
          answer: "Tokyo",
          options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        },
        {
          q: `Capital of Australia:`,
          answer: "Canberra",
          options: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
        },
        {
          q: `Capital of Canada:`,
          answer: "Ottawa",
          options: ["Ottawa", "Toronto", "Vancouver", "Montreal"],
        },
        {
          q: `Country shaped like a boot:`,
          answer: "Italy",
          options: ["Italy", "Spain", "Greece", "India"],
        },
        {
          q: `Largest population country:`,
          answer: "India / China",
          options: ["India / China", "USA", "Brazil", "Russia"],
        },
        {
          q: `Australian dry interior region:`,
          answer: "The Outback",
          options: ["The Outback", "Sahara", "Tundra", "Everglades"],
        },
        {
          q: `Volcano definition:`,
          answer: "Crust opening with lava",
          options: [
            "Crust opening with lava",
            "Ice cave",
            "Ocean trench",
            "Plain",
          ],
        },
        {
          q: `Earthquake cause:`,
          answer: "Tectonic plates movement",
          options: [
            "Tectonic plates movement",
            "Rain",
            "Tides",
            "Volcano cooling",
          ],
        },
        {
          q: `0 degrees longitude line:`,
          answer: "Prime Meridian",
          options: ["Prime Meridian", "Equator", "Tropic", "Date Line"],
        },
        {
          q: `Contour lines on topographic map:`,
          answer: "Elevation and land shape",
          options: [
            "Elevation and land shape",
            "Borders",
            "Rivers",
            "Highways",
          ],
        },
        {
          q: `Gases surrounding Earth:`,
          answer: "Atmosphere",
          options: ["Atmosphere", "Biosphere", "Lithosphere", "Hydrosphere"],
        },
        {
          q: `Earth surface water percentage:`,
          answer: "About 71%",
          options: ["About 71%", "About 29%", "About 50%", "About 90%"],
        },
        {
          q: `Glacier definition:`,
          answer: "Moving mass of ice",
          options: [
            "Moving mass of ice",
            "Ocean wave",
            "Crystal cave",
            "River",
          ],
        },
        {
          q: `Delta definition:`,
          answer: "Wetland where river meets sea",
          options: [
            "Wetland where river meets sea",
            "Mountain",
            "Desert storm",
            "Cave",
          ],
        },
        {
          q: `Sunshine State (US):`,
          answer: "Florida",
          options: ["Florida", "California", "Texas", "Hawaii"],
        },
        {
          q: `Largest US state:`,
          answer: "Alaska",
          options: ["Alaska", "Texas", "California", "Montana"],
        },
        {
          q: `Highest mountain in North America:`,
          answer: "Denali",
          options: ["Denali", "Rainier", "Whitney", "Pikes Peak"],
        },
        {
          q: `African country with Pyramids of Giza:`,
          answer: "Egypt",
          options: ["Egypt", "Kenya", "South Africa", "Morocco"],
        },
      ];
    } else {
      pool = [
        {
          q: `What is the capital city of the United States?`,
          answer: "Washington, D.C.",
          options: [
            "Washington, D.C.",
            "New York City",
            "Los Angeles",
            "Chicago",
          ],
        },
        {
          q: `How many states are in the United States?`,
          answer: "50",
          options: ["48", "50", "51", "52"],
        },
        {
          q: `Longest river in North America:`,
          answer: "Missouri-Mississippi",
          options: ["Missouri-Mississippi", "Colorado", "Rio Grande", "Hudson"],
        },
        {
          q: `US island chain state in Pacific:`,
          answer: "Hawaii",
          options: ["Hawaii", "Alaska", "Florida", "California"],
        },
        {
          q: `Western US mountain range:`,
          answer: "Rocky Mountains",
          options: ["Rocky Mountains", "Appalachian", "Alps", "Himalayas"],
        },
        {
          q: `Eastern US mountain range:`,
          answer: "Appalachian Mountains",
          options: [
            "Appalachian Mountains",
            "Rocky Mountains",
            "Sierra Nevada",
            "Andes",
          ],
        },
        {
          q: `Largest US state by area:`,
          answer: "Alaska",
          options: ["Alaska", "Texas", "California", "Montana"],
        },
        {
          q: `Imaginary line dividing hemispheres:`,
          answer: "Equator",
          options: ["Equator", "Prime Meridian", "Tropic", "Arctic"],
        },
        {
          q: `Capital of California:`,
          answer: "Sacramento",
          options: ["Sacramento", "Los Angeles", "San Francisco", "San Diego"],
        },
        {
          q: `Capital of Texas:`,
          answer: "Austin",
          options: ["Austin", "Dallas", "Houston", "San Antonio"],
        },
        {
          q: `Capital of New York:`,
          answer: "Albany",
          options: ["Albany", "New York City", "Buffalo", "Syracuse"],
        },
        {
          q: `Capital of Florida:`,
          answer: "Tallahassee",
          options: ["Tallahassee", "Miami", "Orlando", "Tampa"],
        },
        {
          q: `Great Lake entirely in the US:`,
          answer: "Lake Michigan",
          options: ["Lake Michigan", "Superior", "Huron", "Ontario"],
        },
        {
          q: `Highest peak in contiguous US:`,
          answer: "Mount Whitney",
          options: ["Mount Whitney", "Rainier", "Pikes Peak", "Hood"],
        },
        {
          q: `Deepest US lake:`,
          answer: "Crater Lake",
          options: ["Crater Lake", "Tahoe", "Salt Lake", "Superior"],
        },
        {
          q: `Desert in CA, NV, AZ:`,
          answer: "Mojave Desert",
          options: ["Mojave Desert", "Sahara", "Gobi", "Atacama"],
        },
        {
          q: `Largest continent:`,
          answer: "Asia",
          options: ["Asia", "Africa", "North America", "Europe"],
        },
        {
          q: `Smallest continent:`,
          answer: "Australia",
          options: ["Australia", "Antarctica", "Europe", "South America"],
        },
        {
          q: `Ice sheet continent with no countries:`,
          answer: "Antarctica",
          options: ["Antarctica", "Asia", "Europe", "Africa"],
        },
        {
          q: `Largest hot desert:`,
          answer: "Sahara Desert",
          options: ["Sahara Desert", "Gobi", "Mojave", "Kalahari"],
        },
        {
          q: `Mountain range with Everest:`,
          answer: "The Himalayas",
          options: ["The Himalayas", "Andes", "Alps", "Rockies"],
        },
        {
          q: `Longest river in the world:`,
          answer: "Nile River",
          options: ["Nile River", "Amazon", "Mississippi", "Yangtze"],
        },
        {
          q: `Largest river by volume:`,
          answer: "Amazon River",
          options: ["Amazon River", "Nile", "Thames", "Danube"],
        },
        {
          q: `Four cardinal compass points:`,
          answer: "North, South, East, West",
          options: [
            "North, South, East, West",
            "Up, Down",
            "Top, Bottom",
            "Seasons",
          ],
        },
        {
          q: `Latitude measures:`,
          answer: "North/south of Equator",
          options: ["North/south of Equator", "East/west", "Depth", "Height"],
        },
        {
          q: `Longitude measures:`,
          answer: "East/west of Prime Meridian",
          options: [
            "East/west of Prime Meridian",
            "North/south",
            "Wind",
            "Temp",
          ],
        },
        {
          q: `Map scale shows:`,
          answer: "Map to ground ratio",
          options: ["Map to ground ratio", "Temp", "Steepness", "Depth"],
        },
        {
          q: `Group of islands:`,
          answer: "Archipelago",
          options: ["Archipelago", "Mountain", "Valley", "Desert"],
        },
        {
          q: `Land almost surrounded by water:`,
          answer: "Peninsula",
          options: ["Peninsula", "Island", "Volcano", "Mountain"],
        },
        {
          q: `Desert fertile water spot:`,
          answer: "Oasis",
          options: ["Oasis", "Dune", "Riverbed", "Iceberg"],
        },
        {
          q: `Largest ocean:`,
          answer: "Pacific Ocean",
          options: ["Pacific Ocean", "Atlantic", "Indian", "Arctic"],
        },
        {
          q: `Smallest/coldest ocean:`,
          answer: "Arctic Ocean",
          options: ["Arctic Ocean", "Pacific", "Atlantic", "Indian"],
        },
        {
          q: `Capital of France:`,
          answer: "Paris",
          options: ["Paris", "Berlin", "Rome", "Madrid"],
        },
        {
          q: `Capital of Italy:`,
          answer: "Rome",
          options: ["Rome", "Paris", "Athens", "London"],
        },
        {
          q: `Capital of Japan:`,
          answer: "Tokyo",
          options: ["Tokyo", "Beijing", "Seoul", "Bangkok"],
        },
        {
          q: `Capital of Australia:`,
          answer: "Canberra",
          options: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
        },
        {
          q: `Capital of Canada:`,
          answer: "Ottawa",
          options: ["Ottawa", "Toronto", "Vancouver", "Montreal"],
        },
        {
          q: `Country shaped like a boot:`,
          answer: "Italy",
          options: ["Italy", "Spain", "Greece", "India"],
        },
        {
          q: `Largest population country:`,
          answer: "India / China",
          options: ["India / China", "USA", "Brazil", "Russia"],
        },
        {
          q: `Volcano definition:`,
          answer: "Crust opening with lava",
          options: ["Crust opening with lava", "Ice cave", "Trench", "Plain"],
        },
        {
          q: `Earthquake cause:`,
          answer: "Tectonic plates movement",
          options: ["Tectonic plates movement", "Rain", "Tides", "Cooling"],
        },
        {
          q: `0 degrees longitude line:`,
          answer: "Prime Meridian",
          options: ["Prime Meridian", "Equator", "Tropic", "Date Line"],
        },
        {
          q: `Contour lines show:`,
          answer: "Elevation and land shape",
          options: [
            "Elevation and land shape",
            "Borders",
            "Rivers",
            "Highways",
          ],
        },
        {
          q: `Gases surrounding Earth:`,
          answer: "Atmosphere",
          options: ["Atmosphere", "Biosphere", "Lithosphere", "Hydrosphere"],
        },
        {
          q: `Earth water percentage:`,
          answer: "About 71%",
          options: ["About 71%", "About 29%", "About 50%", "About 90%"],
        },
        {
          q: `Glacier definition:`,
          answer: "Moving mass of ice",
          options: ["Moving mass of ice", "Wave", "Crystal", "River"],
        },
        {
          q: `Delta definition:`,
          answer: "Wetland where river meets sea",
          options: [
            "Wetland where river meets sea",
            "Mountain",
            "Storm",
            "Cave",
          ],
        },
        {
          q: `Sunshine State (US):`,
          answer: "Florida",
          options: ["Florida", "California", "Texas", "Hawaii"],
        },
        {
          q: `Highest mountain in North America:`,
          answer: "Denali",
          options: ["Denali", "Rainier", "Whitney", "Pikes Peak"],
        },
        {
          q: `African country with Pyramids:`,
          answer: "Egypt",
          options: ["Egypt", "Kenya", "South Africa", "Morocco"],
        },
      ];
    }
  } else if (topicId === "art_theory") {
    pool = [
      {
        q: `Traditional primary colors in art:`,
        answer: "Red, Blue, Yellow",
        options: [
          "Red, Blue, Yellow",
          "Orange, Green, Purple",
          "Black, White, Grey",
          "Pink, Brown, Gold",
        ],
      },
      {
        q: `Blue and yellow mix gives:`,
        answer: "Green",
        options: ["Green", "Purple", "Orange", "Brown"],
      },
      {
        q: `Red and yellow mix gives:`,
        answer: "Orange",
        options: ["Orange", "Green", "Purple", "Pink"],
      },
      {
        q: `Red and blue mix gives:`,
        answer: "Purple",
        options: ["Purple", "Green", "Orange", "Brown"],
      },
      {
        q: `Painter of 'Mona Lisa':`,
        answer: "Leonardo da Vinci",
        options: ["Leonardo da Vinci", "Van Gogh", "Monet", "Picasso"],
      },
      {
        q: `Painter of 'The Starry Night':`,
        answer: "Vincent van Gogh",
        options: ["Vincent van Gogh", "Rembrandt", "Matisse", "Dalí"],
      },
      {
        q: `Colors opposite on color wheel:`,
        answer: "Complementary colors",
        options: [
          "Complementary colors",
          "Primary colors",
          "Monochromatic",
          "Pastel",
        ],
      },
      {
        q: `Sculpture definition:`,
        answer: "3D art made by carving or modeling",
        options: [
          "3D art made by carving or modeling",
          "Flat pencil drawing",
          "Watercolor",
          "Photograph",
        ],
      },
      {
        q: `Secondary colors created by:`,
        answer: "Mixing two primary colors",
        options: [
          "Mixing two primary colors",
          "Mixing black and white",
          "Water only",
          "Glitter",
        ],
      },
      {
        q: `Example of secondary color:`,
        answer: "Green",
        options: ["Green", "Red", "Blue", "Yellow"],
      },
      {
        q: `Warm colors:`,
        answer: "Red, orange, yellow",
        options: [
          "Red, orange, yellow",
          "Blue, green, purple",
          "Black and white",
          "Grey",
        ],
      },
      {
        q: `Cool colors:`,
        answer: "Blue, green, purple",
        options: [
          "Blue, green, purple",
          "Red, orange, yellow",
          "Gold and silver",
          "Neon yellow",
        ],
      },
      {
        q: `Portrait definition:`,
        answer: "Artwork of a person",
        options: ["Artwork of a person", "Landscape", "Still life", "Abstract"],
      },
      {
        q: `Landscape definition:`,
        answer: "Natural scenery artwork",
        options: [
          "Natural scenery artwork",
          "Close-up face",
          "Machinery",
          "Portrait",
        ],
      },
      {
        q: `Still life definition:`,
        answer: "Inanimate everyday objects",
        options: [
          "Inanimate everyday objects",
          "Running animal",
          "Flying bird",
          "King portrait",
        ],
      },
      {
        q: `Painter of melting clocks ('Persistence of Memory'):`,
        answer: "Salvador Dalí",
        options: ["Salvador Dalí", "Monet", "Matisse", "Rembrandt"],
      },
      {
        q: `Pioneer of Cubism ('Guernica'):`,
        answer: "Pablo Picasso",
        options: ["Pablo Picasso", "Van Gogh", "Monet", "Da Vinci"],
      },
      {
        q: `Impressionist painter of water lilies:`,
        answer: "Claude Monet",
        options: ["Claude Monet", "Dalí", "Picasso", "Da Vinci"],
      },
      {
        q: `Perspective in art:`,
        answer: "Illusion of 3D space on 2D surface",
        options: [
          "Illusion of 3D space on 2D surface",
          "Mixing paints",
          "Canvas size",
          "Framing",
        ],
      },
      {
        q: `Shading purpose:`,
        answer: "Light, shadow, and depth",
        options: [
          "Light, shadow, and depth",
          "Erasing",
          "Gluing",
          "Brightness",
        ],
      },
      {
        q: `Canvas definition:`,
        answer: "Stretched fabric painting surface",
        options: [
          "Stretched fabric painting surface",
          "Paper notebook",
          "Clay pot",
          "Digital screen",
        ],
      },
      {
        q: `Pottery definition:`,
        answer: "Objects made from clay baked in kiln",
        options: [
          "Objects made from clay baked in kiln",
          "Glassblowing",
          "Wood carving",
          "Oil painting",
        ],
      },
      {
        q: `Kiln definition:`,
        answer: "High-temperature clay baking oven",
        options: [
          "High-temperature clay baking oven",
          "Brush cleaner",
          "Picture frame",
          "Desk",
        ],
      },
      {
        q: `Abstract art:`,
        answer: "Non-representational shapes and colors",
        options: [
          "Non-representational shapes and colors",
          "Realistic photo",
          "Portrait",
          "Map",
        ],
      },
      {
        q: `Mosaic art:`,
        answer: "Artwork from small glass/tile pieces",
        options: [
          "Artwork from small glass/tile pieces",
          "Pencil sketch",
          "Watercolor",
          "Bronze statue",
        ],
      },
      {
        q: `Printmaking:`,
        answer: "Transferring ink from matrix to surface",
        options: [
          "Transferring ink from matrix to surface",
          "Digital photo",
          "Carving marble",
          "Weaving",
        ],
      },
      {
        q: `Palette definition:`,
        answer: "Board for mixing paints",
        options: ["Board for mixing paints", "Brush", "Canvas stand", "Eraser"],
      },
      {
        q: `Charcoal use:`,
        answer: "Dark expressive sketches",
        options: [
          "Dark expressive sketches",
          "Watercolor",
          "Pottery",
          "Gluing",
        ],
      },
      {
        q: `Watercolor paint characteristics:`,
        answer: "Water-soluble and transparent",
        options: [
          "Water-soluble and transparent",
          "Thick oil",
          "Acrylic",
          "Wax",
        ],
      },
      {
        q: `Acrylic paint characteristics:`,
        answer: "Fast-drying synthetic paint",
        options: [
          "Fast-drying synthetic paint",
          "Water color",
          "Melted wax",
          "Sap",
        ],
      },
      {
        q: `Texture in art:`,
        answer: "Surface quality or feel",
        options: [
          "Surface quality or feel",
          "Light brightness",
          "Canvas weight",
          "Paint cost",
        ],
      },
      {
        q: `Symmetry:`,
        answer: "Balanced proportions mirroring sides",
        options: [
          "Balanced proportions mirroring sides",
          "Random splatters",
          "Crooked lines",
          "Tiny details",
        ],
      },
      {
        q: `Asymmetry:`,
        answer: "Unbalanced design",
        options: ["Unbalanced design", "Perfect mirror", "Grid", "Circle"],
      },
      {
        q: `Mural definition:`,
        answer: "Artwork painted directly on wall",
        options: [
          "Artwork painted directly on wall",
          "Notebook sketch",
          "Framed canvas",
          "Postcard",
        ],
      },
      {
        q: `Pop art movement theme:`,
        answer: "Popular culture subjects",
        options: [
          "Popular culture subjects",
          "Cave paintings",
          "Renaissance",
          "Stained glass",
        ],
      },
      {
        q: `Pop art icon (Campbell's soup cans):`,
        answer: "Andy Warhol",
        options: ["Andy Warhol", "Da Vinci", "Monet", "Van Gogh"],
      },
      {
        q: `Origami:`,
        answer: "Japanese paper folding",
        options: [
          "Japanese paper folding",
          "Clay pottery",
          "Glass sculpture",
          "Painting",
        ],
      },
      {
        q: `Calligraphy:`,
        answer: "Decorative handwriting",
        options: [
          "Decorative handwriting",
          "Fast typing",
          "Scribbling",
          "Printing",
        ],
      },
      {
        q: `Complementary colors purpose:`,
        answer: "Create high contrast and brightness",
        options: [
          "Create high contrast and brightness",
          "Make grey",
          "Erase",
          "Waterproof",
        ],
      },
      {
        q: `Hue definition:`,
        answer: "Another word for color",
        options: ["Another word for color", "Brush stroke", "Shadow", "Canvas"],
      },
      {
        q: `Tint definition:`,
        answer: "Adding white to lighten color",
        options: [
          "Adding white to lighten color",
          "Adding black",
          "Mixing primaries",
          "Washing brush",
        ],
      },
      {
        q: `Shade definition:`,
        answer: "Adding black to darken color",
        options: [
          "Adding black to darken color",
          "Adding white",
          "Watering down",
          "Neon",
        ],
      },
      {
        q: `Self-portrait definition:`,
        answer: "Artist portrait of themselves",
        options: [
          "Artist portrait of themselves",
          "Friend picture",
          "Landscape",
          "Pet photo",
        ],
      },
      {
        q: `Artist who cut off his ear:`,
        answer: "Vincent van Gogh",
        options: ["Vincent van Gogh", "Rembrandt", "Monet", "Picasso"],
      },
      {
        q: `Terracotta:`,
        answer: "Unglazed or glazed fired clay",
        options: [
          "Unglazed or glazed fired clay",
          "Blue glass",
          "Steel",
          "Wool",
        ],
      },
      {
        q: `Sketch definition:`,
        answer: "Rough preliminary drawing",
        options: [
          "Rough preliminary drawing",
          "Museum masterpiece",
          "Marble statue",
          "Animation",
        ],
      },
      {
        q: `1-point perspective:`,
        answer: "Single vanishing point on horizon",
        options: [
          "Single vanishing point on horizon",
          "No lines",
          "Finger painting",
          "Red paint",
        ],
      },
      {
        q: `Collage technique:`,
        answer: "Gluing various materials to backing",
        options: [
          "Gluing various materials to backing",
          "Carving stone",
          "Mixing oil",
          "Pottery",
        ],
      },
      {
        q: `Sketchbook use:`,
        answer: "Practicing drawing ideas and studies",
        options: [
          "Practicing drawing ideas and studies",
          "Boiling water",
          "Storing brushes",
          "Math homework",
        ],
      },
    ];
  }

  // Expand pool to ensure 50+ unique variants if pool size is smaller
  let expandedQuestions = [];
  while (expandedQuestions.length < count && pool.length > 0) {
    let item = pool[Math.floor(Math.random() * pool.length)];
    expandedQuestions.push(item);
  }

  state.practice.questions = expandedQuestions.map((item) => ({
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

  const isCorrect =
    String(chosen).trim().toLowerCase() ===
    String(correct).trim().toLowerCase();

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
    let shuffledOpts = [...q.options].sort(() => Math.random() - 0.5);
    optionsHTML = shuffledOpts
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
