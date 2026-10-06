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
        <div class="bg-white/10 backdrop-blur-xl border border-white/20 p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl max-w-md sm:max-w-xl w-full flex flex-col gap-5 text-center">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-yellow-300">Practice: ${title} 🎒</h2>
            <p class="text-white/80 text-xs sm:text-sm">Select difficulty & session length (50+ Curriculum Questions per Topic):</p>
            
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
        answer: 50,
        options: ["25%", "50%", "75%", "100%"],
      },
      {
        q: `What is 0.25 expressed as a percentage? (%)`,
        answer: 25,
        options: ["25%", "50%", "75%", "10%"],
      },
      {
        q: `What is 0.75 expressed as a percentage? (%)`,
        answer: 75,
        options: ["25%", "50%", "75%", "90%"],
      },
      {
        q: `What is 0.1 expressed as a percentage? (%)`,
        answer: 10,
        options: ["5%", "10%", "20%", "50%"],
      },
      {
        q: `What is 0.2 expressed as a percentage? (%)`,
        answer: 20,
        options: ["10%", "20%", "30%", "40%"],
      },
      {
        q: `What is 0.6 as a percentage? (%)`,
        answer: 60,
        options: ["40%", "50%", "60%", "70%"],
      },
      {
        q: `What is 0.8 as a percentage? (%)`,
        answer: 80,
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
        q: `Identify the noun: "The happy dog barked loudly."`,
        answer: "dog",
        options: ["happy", "dog", "barked", "loudly"],
      },
      {
        q: `Identify the verb: "Children played football in the park."`,
        answer: "played",
        options: ["Children", "played", "football", "park"],
      },
      {
        q: `Identify the adjective: "A bright yellow sun shone down."`,
        answer: "yellow",
        options: ["bright", "yellow", "sun", "shone"],
      },
      {
        q: `Identify the adverb: "She sang the song beautifully."`,
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
        q: `Identify the pronoun: "He walked to the store."`,
        answer: "He",
        options: ["He", "walked", "store", "to"],
      },
      {
        q: `Identify the preposition: "The cat slept under the table."`,
        answer: "under",
        options: ["cat", "slept", "under", "table"],
      },
      {
        q: `Identify the conjunction: "I wanted to play, but it started raining."`,
        answer: "but",
        options: ["wanted", "play", "but", "raining"],
      },
      {
        q: `What is the antonym of 'brave'?`,
        answer: "cowardly / timid",
        options: ["fearless", "cowardly / timid", "bold", "strong"],
      },
      {
        q: `What is the antonym of 'ancient'?`,
        answer: "modern / new",
        options: ["old", "modern / new", "historic", "dusty"],
      },
      {
        q: `Choose the correct spelling:`,
        answer: isUK ? "because" : "because",
        options: ["becuse", "because", "becrause", "bekase"],
      },
      {
        q: `Choose the correct spelling:`,
        answer: isUK ? "friend" : "friend",
        options: ["freind", "friend", "frend", "frind"],
      },
      {
        q: `Choose the correct spelling:`,
        answer: isUK ? "necessary" : "necessary",
        options: ["neccesary", "necessary", "nesessary", "necesary"],
      },
      {
        q: `Choose the correct spelling:`,
        answer: isUK ? "separate" : "separate",
        options: ["seperate", "separate", "sepparate", "seprate"],
      },
      {
        q: `Choose the correct spelling:`,
        answer: isUK ? "definite" : "definite",
        options: ["definate", "definite", "definit", "defint"],
      },
      {
        q: `What is a word that sounds the same as 'their' called?`,
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
        q: `Identify the compound word:`,
        answer: "football",
        options: ["running", "football", "jump", "dog"],
      },
      {
        q: `Identify the proper noun in: "London is a busy city."`,
        answer: "London",
        options: ["London", "busy", "city", "is"],
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
        answer: "Apostrophe (')",
        options: ["Comma (,)", "Apostrophe (')", "Hyphen (-)", "Colon (:)"],
      },
      {
        q: `What punctuation ends an exclamatory sentence?`,
        answer: "Exclamation mark (!)",
        options: ["Period (.)", "Exclamation mark (!)", "Question mark (?)"],
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
        answer: "Pupa (Chrysalis)",
        options: ["Egg", "Pupa (Chrysalis)", "Tadpole", "Seed"],
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
        answer: "The natural home or environment of an animal or plant",
        options: [
          "The natural home or environment of an animal or plant",
          "A type of food",
          "A weather pattern",
          "An artificial zoo",
        ],
      },
      {
        q: `What is pollination?`,
        answer: "Transfer of pollen from male to female plant parts",
        options: [
          "Transfer of pollen from male to female plant parts",
          "Watering a plant",
          "Growing roots",
          "Plant decay",
        ],
      },
      {
        q: `Which insect is famous for making honey?`,
        answer: "Bee",
        options: ["Bee", "Ant", "Fly", "Wasp"],
      },
      {
        q: `What do earthworms do for soil?`,
        answer: "Aerate and enrich it",
        options: [
          "Aerate and enrich it",
          "Destroy nutrients",
          "Poison plants",
          "Make it dry",
        ],
      },
      {
        q: `What is an ecosystem?`,
        answer:
          "A community of living organisms interacting with their environment",
        options: [
          "A community of living organisms interacting with their environment",
          "A single animal",
          "A rock formation",
          "A weather forecast",
        ],
      },
      {
        q: `Which vertebrate group lays eggs with soft leathery or hard shells on land?`,
        answer: "Reptiles and Birds",
        options: ["Reptiles and Birds", "Mammals", "Amphibians", "Fish"],
      },
      {
        q: `What is the main function of plant leaves?`,
        answer: "To make food via photosynthesis",
        options: [
          "To make food via photosynthesis",
          "To absorb rocks",
          "To drink muddy water",
          "To make noise",
        ],
      },
      {
        q: `Which of these is a deciduous tree?`,
        answer: "Oak (loses leaves in autumn)",
        options: [
          "Oak (loses leaves in autumn)",
          "Pine tree",
          "Fir tree",
          "Cactus",
        ],
      },
      {
        q: `Which of these is an evergreen tree?`,
        answer: "Pine",
        options: ["Pine", "Oak", "Maple", "Apple tree"],
      },
      {
        q: `What is a vertebrate?`,
        answer: "An animal with a backbone",
        options: [
          "An animal with a backbone",
          "An animal without a backbone",
          "A plant",
          "A fungus",
        ],
      },
      {
        q: `What is an invertebrate?`,
        answer: "An animal without a backbone",
        options: [
          "An animal with a backbone",
          "An animal without a backbone",
          "A bird",
          "A mammal",
        ],
      },
      {
        q: `Which of these is an invertebrate?`,
        answer: "Spider",
        options: ["Spider", "Dog", "Bird", "Fish"],
      },
      {
        q: `What is an adaptation?`,
        answer: "A physical or behavioral trait that helps an organism survive",
        options: [
          "A physical or behavioral trait that helps an organism survive",
          "A disease",
          "A color preference",
          "A type of food",
        ],
      },
      {
        q: `Why do birds migrate in winter?`,
        answer: "To find warmer weather and more food",
        options: [
          "To find warmer weather and more food",
          "To sleep all year",
          "To hide from predators",
          "They don't migrate",
        ],
      },
      {
        q: `What is hibernation?`,
        answer: "A deep sleep that helps animals survive winter",
        options: [
          "A deep sleep that helps animals survive winter",
          "Running very fast",
          "Eating twice as much",
          "Flying south",
        ],
      },
      {
        q: `Which animal hibernates in winter?`,
        answer: "Bear / Hedgehog",
        options: ["Bear / Hedgehog", "Lion", "Shark", "Eagle"],
      },
      {
        q: `What is a food chain?`,
        answer:
          "A sequence showing how energy passes from one organism to another",
        options: [
          "A sequence showing how energy passes from one organism to another",
          "A grocery store list",
          "A plant recipe",
          "Animal housing",
        ],
      },
      {
        q: `What is the ultimate source of energy for almost all life on Earth?`,
        answer: "The Sun",
        options: ["The Sun", "Volcanoes", "The Moon", "Deep oceans"],
      },
      {
        q: `What do microorganisms include?`,
        answer: "Bacteria and fungi",
        options: [
          "Bacteria and fungi",
          "Elephants and whales",
          "Trees and flowers",
          "Birds and fish",
        ],
      },
      {
        q: `Which fungi is commonly used to make bread rise?`,
        answer: "Yeast",
        options: ["Yeast", "Mushroom", "Mold", "Algae"],
      },
      {
        q: `What is seed dispersal?`,
        answer: "The movement or transport of seeds away from the parent plant",
        options: [
          "The movement or transport of seeds away from the parent plant",
          "Eating seeds",
          "Watering seeds",
          "Planting seeds in a pot",
        ],
      },
      {
        q: `How are dandelion seeds typically dispersed?`,
        answer: "By wind",
        options: [
          "By wind",
          "By swimming",
          "By underground tunneling",
          "By lightning",
        ],
      },
      {
        q: `What is germination?`,
        answer: "The process where a seed starts to grow into a new plant",
        options: [
          "The process where a seed starts to grow into a new plant",
          "When a plant dies",
          "When flowers drop petals",
          "Root decay",
        ],
      },
      {
        q: `What do seeds need to germinate?`,
        answer: "Water, warmth, and oxygen",
        options: [
          "Water, warmth, and oxygen",
          "Darkness and ice",
          "Plastic and salt",
          "Sound waves",
        ],
      },
      {
        q: `Which part of the human skeleton protects the brain?`,
        answer: "Skull",
        options: ["Skull", "Ribcage", "Spine", "Pelvis"],
      },
      {
        q: `Which part of the skeleton protects the heart and lungs?`,
        answer: "Ribcage",
        options: ["Skull", "Ribcage", "Arm bones", "Leg bones"],
      },
      {
        q: `What is the function of joints in the skeleton?`,
        answer: "To allow bones to move flexibly",
        options: [
          "To allow bones to move flexibly",
          "To make blood",
          "To digest food",
          "To store water",
        ],
      },
      {
        q: `What connects muscles to bones?`,
        answer: "Tendons",
        options: ["Tendons", "Ligaments", "Skin", "Hair"],
      },
      {
        q: `What connects bones to other bones at joints?`,
        answer: "Ligaments",
        options: ["Ligaments", "Tendons", "Muscles", "Nerves"],
      },
      {
        q: `Why are muscles attached to bones in pairs?`,
        answer: "To pull bones in opposite directions (contract and relax)",
        options: [
          "To pull bones in opposite directions",
          "To look symmetrical",
          "To keep warm",
          "To store fat",
        ],
      },
      {
        q: `What is a balanced diet?`,
        answer: "Eating the right amount of different foods for health",
        options: [
          "Eating the right amount of different foods for health",
          "Eating only sweets",
          "Eating only meat",
          "Not eating at all",
        ],
      },
      {
        q: `Why does the human body need calcium?`,
        answer: "For strong teeth and bones",
        options: [
          "For strong teeth and bones",
          "For hair color",
          "For running fast",
          "For breathing underwater",
        ],
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
        answer: "Water vapour / Steam",
        options: ["Ice", "Water vapour / Steam", "Solid", "Rock"],
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
        q: `Which process turns water vapour into liquid water droplets?`,
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
        answer: "A state of matter with a fixed shape and volume",
        options: [
          "A state of matter with a fixed shape and volume",
          "A fluid that flows",
          "An invisible gas",
          "A hot plasma",
        ],
      },
      {
        q: `What is a liquid?`,
        answer:
          "A state of matter that flows and takes the shape of its container",
        options: [
          "A state of matter that flows and takes the shape of its container",
          "A rigid object",
          "A compressed gas",
          "A crystal",
        ],
      },
      {
        q: `What is a gas?`,
        answer: "A state of matter that fills any available space",
        options: [
          "A state of matter that fills any available space",
          "A hard solid",
          "A puddle of water",
          "Ice cubes",
        ],
      },
      {
        q: `What happens when you heat ice?`,
        answer: "It melts into liquid water",
        options: [
          "It melts into liquid water",
          "It turns into solid rock",
          "It disappears forever",
          "It freezes colder",
        ],
      },
      {
        q: `What happens when you cool liquid water below 0°C?`,
        answer: "It freezes into ice",
        options: [
          "It freezes into ice",
          "It boils into steam",
          "It turns into gas",
          "Nothing",
        ],
      },
      {
        q: `Which of these is a liquid at room temperature?`,
        answer: "Juice / Milk",
        options: ["Juice / Milk", "Rock", "Wood", "Iron bar"],
      },
      {
        q: `Which of these is a gas at room temperature?`,
        answer: "Oxygen / Air",
        options: ["Oxygen / Air", "Stone", "Gold", "Water"],
      },
      {
        q: `What is melting?`,
        answer: "Turning from a solid into a liquid",
        options: [
          "Turning from a solid into a liquid",
          "Turning from liquid to gas",
          "Turning from gas to liquid",
          "Turning liquid to solid",
        ],
      },
      {
        q: `What is freezing?`,
        answer: "Turning from a liquid into a solid",
        options: [
          "Turning from a liquid into a solid",
          "Turning solid to gas",
          "Boiling water",
          "Evaporating puddles",
        ],
      },
      {
        q: `What is boiling?`,
        answer: "Rapid vaporization of a liquid when heated",
        options: [
          "Rapid vaporization of a liquid when heated",
          "Cooling down soup",
          "Freezing juice",
          "Melting plastic",
        ],
      },
      {
        q: `Which material is transparent (lets light pass through clearly)?`,
        answer: "Clear glass",
        options: ["Clear glass", "Wood", "Brick", "Cardboard"],
      },
      {
        q: `Which material is opaque (does not let light pass through)?`,
        answer: "Brick or wood",
        options: [
          "Brick or wood",
          "Clear window glass",
          "Thin plastic film",
          "Water",
        ],
      },
      {
        q: `Which material is waterproof?`,
        answer: "Plastic or rubber",
        options: [
          "Plastic or rubber",
          "Paper towel",
          "Cotton cloth",
          "Cardboard box",
        ],
      },
      {
        q: `Which material absorbs water easily?`,
        answer: "Sponge or cotton",
        options: [
          "Sponge or cotton",
          "Plastic sheet",
          "Rubber boots",
          "Glass mug",
        ],
      },
      {
        q: `What is a mixture?`,
        answer: "Two or more substances combined without chemical bonding",
        options: [
          "Two or more substances combined without chemical bonding",
          "A single pure element",
          "Melted plastic",
          "Frozen water",
        ],
      },
      {
        q: `How can you separate a mixture of sand and iron filings?`,
        answer: "Using a magnet",
        options: [
          "Using a magnet",
          "By boiling",
          "By filtering with water only",
          "By freezing",
        ],
      },
      {
        q: `How can you separate insoluble sand from water?`,
        answer: "Filtering",
        options: ["Filtering", "Evaporation", "Freezing", "Magnetism"],
      },
      {
        q: `How can you separate salt dissolved in water?`,
        answer: "Evaporation (boiling water away)",
        options: ["Evaporation", "A magnet", "A sieve", "Straining"],
      },
      {
        q: `What does 'soluble' mean?`,
        answer: "Able to dissolve in a liquid",
        options: [
          "Able to dissolve in a liquid",
          "Waterproof",
          "Magnetic",
          "Solid rock",
        ],
      },
      {
        q: `What does 'insoluble' mean?`,
        answer: "Not able to dissolve in a liquid",
        options: [
          "Not able to dissolve in a liquid",
          "Melts easily",
          "Turns into gas",
          "Invisible",
        ],
      },
      {
        q: `Is sugar soluble in water?`,
        answer: "Yes",
        options: ["Yes", "No", "Only in oil", "Only when frozen"],
      },
      {
        q: `Is sand soluble in water?`,
        answer: "No",
        options: ["Yes", "No", "Always", "Instantly"],
      },
      {
        q: `What is a reversible change?`,
        answer: "A change that can be undone (like melting ice)",
        options: [
          "A change that can be undone",
          "Burning wood",
          "Baking a cake",
          "Cooking an egg",
        ],
      },
      {
        q: `What is an irreversible change?`,
        answer: "A change that cannot be easily undone (like baking a cake)",
        options: [
          "A change that cannot be easily undone",
          "Melting chocolate",
          "Freezing water",
          "Dissolving salt",
        ],
      },
      {
        q: `Is baking a cake a reversible or irreversible change?`,
        answer: "Irreversible",
        options: ["Reversible", "Irreversible", "Magnetic", "Evaporative"],
      },
      {
        q: `Is dissolving sugar in water reversible?`,
        answer: "Yes (via evaporation)",
        options: [
          "Yes (via evaporation)",
          "No, never",
          "Irreversible",
          "Explosive",
        ],
      },
      {
        q: `What is a chemical reaction?`,
        answer: "A process where substances combine to form new substances",
        options: [
          "A process where substances combine to form new substances",
          "Freezing water",
          "Melting butter",
          "Cutting paper",
        ],
      },
      {
        q: `Which of these shows evidence of a chemical reaction?`,
        answer: "Color change, fizzing, or burning",
        options: [
          "Color change, fizzing, or burning",
          "Melting ice",
          "Folding paper",
          "Boiling water",
        ],
      },
      {
        q: `What is condensation in the water cycle?`,
        answer: "Water vapour cooling into clouds",
        options: [
          "Water vapour cooling into clouds",
          "Rain falling down",
          "Rivers flowing",
          "Ice melting",
        ],
      },
      {
        q: `What is precipitation in the water cycle?`,
        answer: "Rain, snow, sleet, or hail falling from clouds",
        options: [
          "Rain, snow, sleet, or hail falling from clouds",
          "Puddles drying up",
          "Sun heating oceans",
          "Wind blowing",
        ],
      },
      {
        q: `What is evaporation driven by in nature?`,
        answer: "The Sun's heat",
        options: ["The Sun's heat", "Moonlight", "Earthquakes", "Snowstorms"],
      },
      {
        q: `Why do puddles disappear on a sunny day?`,
        answer: "Evaporation into the air",
        options: [
          "Evaporation into the air",
          "Animals drinking them",
          "Earth absorbing them entirely",
          "Freezing",
        ],
      },
      {
        q: `What is thermal conductivity?`,
        answer: "How well a material transfers heat",
        options: [
          "How well a material transfers heat",
          "How loud it is",
          "How heavy it weighs",
          "Its color",
        ],
      },
      {
        q: `Which material is a good thermal insulator (keeps things warm)?`,
        answer: "Wool or polystyrene",
        options: [
          "Wool or polystyrene",
          "Copper metal",
          "Iron rod",
          "Silver spoon",
        ],
      },
      {
        q: `Which material is a good thermal conductor (transfers heat quickly)?`,
        answer: "Metal (like copper or aluminum)",
        options: [
          "Metal (like copper or aluminum)",
          "Wood",
          "Plastic",
          "Cloth",
        ],
      },
      {
        q: `What is electrical conductivity?`,
        answer: "How well a material allows electricity to flow through it",
        options: [
          "How well a material allows electricity to flow through it",
          "How much light it reflects",
          "Its magnetic pull",
          "Its melting point",
        ],
      },
      {
        q: `Which material is an electrical conductor?`,
        answer: "Copper wire",
        options: [
          "Copper wire",
          "Rubber band",
          "Plastic ruler",
          "Wooden stick",
        ],
      },
      {
        q: `Which material is an electrical insulator?`,
        answer: "Plastic or rubber coating",
        options: [
          "Plastic or rubber coating",
          "Copper wire",
          "Iron nail",
          "Aluminum foil",
        ],
      },
      {
        q: `What happens when you mix baking soda and vinegar?`,
        answer: "Fizzing and production of carbon dioxide gas",
        options: [
          "Fizzing and production of carbon dioxide gas",
          "Solid gold forms",
          "Water freezes",
          "Nothing happens",
        ],
      },
      {
        q: `What is rust?`,
        answer:
          "A reddish compound formed when iron reacts with oxygen and water",
        options: [
          "A reddish compound formed when iron reacts with oxygen and water",
          "Painted metal",
          "Melted plastic",
          "Clean silver",
        ],
      },
      {
        q: `What two things are needed for iron to rust?`,
        answer: "Oxygen and water",
        options: [
          "Oxygen and water",
          "Ice and darkness",
          "Salt and sunlight only",
          "Plastic and heat",
        ],
      },
      {
        q: `How can you prevent iron from rusting?`,
        answer: "Painting, oiling, or galvanizing",
        options: [
          "Painting, oiling, or galvanizing",
          "Adding more water",
          "Leaving it in the rain",
          "Heating it up",
        ],
      },
    ];
  } else if (topicId === "physics") {
    pool = [
      {
        q: `Which invisible force pulls objects down toward the center of the Earth?`,
        answer: "Gravity",
        options: ["Gravity", "Magnetism", "Friction", "Air resistance"],
      },
      {
        q: `What travels faster across the universe?`,
        answer: "Light",
        options: ["Light", "Sound", "A cheetah", "A rocket"],
      },
      {
        q: `What type of energy do we get from the Sun?`,
        answer: "Light and Heat energy",
        options: [
          "Light and Heat energy",
          "Sound energy",
          "Nuclear waste",
          "Magnetic pull",
        ],
      },
      {
        q: `Which poles of two magnets attract each other?`,
        answer: "Opposite poles (North & South)",
        options: [
          "Opposite poles (North & South)",
          "Like poles (North & North)",
          "Neither",
          "Both North",
        ],
      },
      {
        q: `What creates sound waves?`,
        answer: "Vibrations",
        options: ["Vibrations", "Colors", "Stillness", "Shadows"],
      },
      {
        q: `What is friction?`,
        answer: "A force that resists motion when two surfaces touch",
        options: [
          "A force that resists motion when two surfaces touch",
          "A magnetic push",
          "Gravity pull",
          "Light beam",
        ],
      },
      {
        q: `Which surface creates the most friction with a rolling ball?`,
        answer: "Rough carpet",
        options: [
          "Rough carpet",
          "Smooth ice",
          "Polished glass",
          "Oiled metal",
        ],
      },
      {
        q: `Which surface creates the least friction?`,
        answer: "Ice or air hockey table",
        options: [
          "Ice or air hockey table",
          "Sandpaper",
          "Concrete road",
          "Deep mud",
        ],
      },
      {
        q: `What is air resistance (drag)?`,
        answer: "Friction acting on an object moving through air",
        options: [
          "Friction acting on an object moving through air",
          "Magnetic pull",
          "Gravity",
          "Sound wave",
        ],
      },
      {
        q: `What shape helps reduce air resistance (streamlining)?`,
        answer: "A teardrop or pointed aerodynamic shape",
        options: [
          "A teardrop or pointed aerodynamic shape",
          "A flat wide box",
          "A cube",
          "A sphere",
        ],
      },
      {
        q: `What is water resistance?`,
        answer: "Friction acting on an object moving through water",
        options: [
          "Friction acting on an object moving through water",
          "Water boiling",
          "Ice melting",
          "Gravity",
        ],
      },
      {
        q: `What does a simple lever do?`,
        answer:
          "Helps lift heavy loads with less effort using a pivot (fulcrum)",
        options: [
          "Helps lift heavy loads with less effort using a pivot (fulcrum)",
          "Generates electricity",
          "Freezes water",
          "Makes sound louder",
        ],
      },
      {
        q: `What is a pulley used for?`,
        answer: "To lift heavy objects easily using ropes and wheels",
        options: [
          "To lift heavy objects easily using ropes and wheels",
          "To paint walls",
          "To measure temperature",
          "To cook food",
        ],
      },
      {
        q: `What is a gear?`,
        answer:
          "A wheel with teeth that meshes with other gears to transmit motion and force",
        options: [
          "A wheel with teeth that meshes with other gears to transmit motion and force",
          "A smooth rubber band",
          "A magnet",
          "A battery",
        ],
      },
      {
        q: `What source provides electrical power in a simple circuit?`,
        answer: "A battery or cell",
        options: [
          "A battery or cell",
          "A wooden stick",
          "A plastic cord",
          "A glass bulb",
        ],
      },
      {
        q: `What does a switch do in an electrical circuit?`,
        answer: "Opens or closes the circuit to turn electricity on or off",
        options: [
          "Opens or closes the circuit to turn electricity on or off",
          "Increases battery size",
          "Destroys electricity",
          "Creates water",
        ],
      },
      {
        q: `What is a conductor of electricity?`,
        answer:
          "A material that allows electrical current to pass through easily",
        options: [
          "A material that allows electrical current to pass through easily",
          "Rubber",
          "Wood",
          "Plastic",
        ],
      },
      {
        q: `What is an electrical insulator?`,
        answer: "A material that stops electricity from flowing",
        options: [
          "A material that stops electricity from flowing",
          "Copper wire",
          "Silver",
          "Iron nail",
        ],
      },
      {
        q: `How does increasing the number of batteries in a simple circuit affect a buzzer or bulb?`,
        answer: "It makes the bulb brighter or buzzer louder",
        options: [
          "It makes the bulb brighter or buzzer louder",
          "It turns it off completely",
          "It freezes the circuit",
          "It reverses time",
        ],
      },
      {
        q: `What is Earth's natural satellite called?`,
        answer: "The Moon",
        options: ["The Moon", "Mars", "The Sun", "Venus"],
      },
      {
        q: `How long does it take for Earth to complete one full rotation on its axis (1 day)?`,
        answer: "24 hours",
        options: ["24 hours", "365 days", "1 month", "1 hour"],
      },
      {
        q: `How long does it take for Earth to orbit the Sun once (1 year)?`,
        answer: "365 and 1/4 days",
        options: ["365 and 1/4 days", "24 hours", "30 days", "7 days"],
      },
      {
        q: `Why do we experience day and night on Earth?`,
        answer: "Because Earth rotates on its axis",
        options: [
          "Because Earth rotates on its axis",
          "Because the Sun turns off at night",
          "Because clouds cover the Sun",
          "Because the Moon blocks the Sun every evening",
        ],
      },
      {
        q: `Which planet is closest to the Sun?`,
        answer: "Mercury",
        options: ["Mercury", "Earth", "Mars", "Neptune"],
      },
      {
        q: `Which planet is known as the Red Planet?`,
        answer: "Mars",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
      },
      {
        q: `Which planet is the largest in our solar system?`,
        answer: "Jupiter",
        options: ["Jupiter", "Saturn", "Earth", "Neptune"],
      },
      {
        q: `Which planet is famous for its large beautiful rings?`,
        answer: "Saturn",
        options: ["Saturn", "Mars", "Venus", "Mercury"],
      },
      {
        q: `What is light?`,
        answer:
          "A form of energy that travels in straight lines and lets us see",
        options: [
          "A form of energy that travels in straight lines and lets us see",
          "A type of sound",
          "A liquid",
          "A magnetic force",
        ],
      },
      {
        q: `How do shadows form?`,
        answer: "When an opaque object blocks light",
        options: [
          "When an opaque object blocks light",
          "When lights are turned up bright",
          "When mirrors reflect color",
          "When sound echoes",
        ],
      },
      {
        q: `What happens to light when it hits a flat mirror?`,
        answer: "It reflects cleanly at equal angles",
        options: [
          "It reflects cleanly at equal angles",
          "It is absorbed completely",
          "It turns into sound",
          "It stops moving",
        ],
      },
      {
        q: `What is refraction of light?`,
        answer:
          "The bending of light as it passes from one medium to another (like air to water)",
        options: [
          "The bending of light as it passes from one medium to another",
          "Light bouncing off a mirror",
          "Light turning into darkness",
          "Shadow formation",
        ],
      },
      {
        q: `What colors make up white light (like a rainbow)?`,
        answer: "Red, Orange, Yellow, Green, Blue, Indigo, Violet (ROYGBIV)",
        options: [
          "Red, Orange, Yellow, Green, Blue, Indigo, Violet (ROYGBIV)",
          "Black and White only",
          "Brown and Grey",
          "Pink and Gold",
        ],
      },
      {
        q: `What is volume in relation to sound?`,
        answer: "How loud or quiet a sound is",
        options: [
          "How loud or quiet a sound is",
          "How high or low a pitch is",
          "How fast sound travels",
          "Its color",
        ],
      },
      {
        q: `What is pitch in relation to sound?`,
        answer: "How high or low a sound is",
        options: [
          "How high or low a sound is",
          "How loud a sound is",
          "How long a sound lasts",
          "The weight of sound",
        ],
      },
      {
        q: `How do you make a higher pitched sound on a guitar or violin?`,
        answer: "Make the string shorter, tighter, or thinner",
        options: [
          "Make the string shorter, tighter, or thinner",
          "Make it longer and looser",
          "Play underwater",
          "Turn off the lights",
        ],
      },
      {
        q: `What is air pressure?`,
        answer: "The force exerted by air molecules pushing on surfaces",
        options: [
          "The force exerted by air molecules pushing on surfaces",
          "Wind speed",
          "Cloud temperature",
          "Rainfall weight",
        ],
      },
      {
        q: `What is buoyancy?`,
        answer:
          "The upward force that a fluid exerts on an object, making it float",
        options: [
          "The upward force that a fluid exerts on an object, making it float",
          "Downward gravity pull",
          "Magnetic attraction",
          "Friction drag",
        ],
      },
      {
        q: `Why do heavy steel ships float on water?`,
        answer:
          "Because their shape displaces enough water to create an upward buoyant force equal to their weight",
        options: [
          "Because their shape displaces enough water",
          "Because steel is lighter than water",
          "Because of magnets",
          "Because of wind",
        ],
      },
      {
        q: `What is kinetic energy?`,
        answer: "Energy of motion",
        options: [
          "Energy of motion",
          "Stored battery energy",
          "Magnetic pull",
          "Darkness",
        ],
      },
      {
        q: `What is potential energy?`,
        answer: "Stored energy due to position or state",
        options: [
          "Stored energy due to position or state",
          "Motion energy",
          "Light speed",
          "Sound wave",
        ],
      },
    ];
  } else if (topicId === "history") {
    if (isUK) {
      pool = [
        {
          q: `Which famous civilization built the Great Pyramids?`,
          answer: "Ancient Egyptians",
          options: [
            "Ancient Egyptians",
            "Ancient Romans",
            "Anglo-Saxons",
            "Vikings",
          ],
        },
        {
          q: `Who won the Battle of Hastings in 1066?`,
          answer: "William the Conqueror (Normans)",
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
          options: [
            "Victorian Era",
            "Stone Age",
            "Tudor Period",
            "World War II",
          ],
        },
        {
          q: `Which Roman emperor initiated the building of Hadrian's Wall across Britain?`,
          answer: "Hadrian",
          options: ["Hadrian", "Nero", "Augustus", "Trajan"],
        },
        {
          q: `Who was the famous Tudor king who had six wives?`,
          answer: "Henry VIII",
          options: ["Henry VIII", "Edward VI", "Richard III", "William III"],
        },
        {
          q: `What period came first in British history?`,
          answer: "Stone Age",
          options: [
            "Stone Age",
            "Victorian Era",
            "World War II",
            "Victorian Era",
          ],
        },
        {
          q: `Who were fierce warriors and sailors from Scandinavia who raided Britain?`,
          answer: "Vikings",
          options: ["Vikings", "Romans", "Greeks", "Normans"],
        },
        {
          q: `In what year did the Great Fire of London take place?`,
          answer: "1666",
          options: ["1066", "1588", "1666", "1805"],
        },
        {
          q: `Who was the wartime Prime Minister of the UK during World War II?`,
          answer: "Winston Churchill",
          options: [
            "Winston Churchill",
            "Neville Chamberlain",
            "Clement Attlee",
            "Queen Elizabeth II",
          ],
        },
        {
          q: `Which queen reigned for over 63 years during the 19th and early 20th centuries?`,
          answer: "Queen Victoria",
          options: [
            "Queen Victoria",
            "Queen Elizabeth I",
            "Queen Mary",
            "Cleopatra",
          ],
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
          q: `Which ancient Native American culture built extensive cliff dwellings in the American Southwest?`,
          answer: "Ancestral Puebloans (Anasazi)",
          options: ["Ancestral Puebloans", "Mayans", "Aztecs", "Incas"],
        },
        {
          q: `Who was the President during the American Civil War?`,
          answer: "Abraham Lincoln",
          options: [
            "Abraham Lincoln",
            "George Washington",
            "Andrew Jackson",
            "Theodore Roosevelt",
          ],
        },
        {
          q: `Who explored the Americas in 1492 under the Spanish flag?`,
          answer: "Christopher Columbus",
          options: [
            "Christopher Columbus",
            "Neil Armstrong",
            "George Washington",
            "Thomas Edison",
          ],
        },
        {
          q: `Which event in 1773 protested British tea taxes in Boston harbor?`,
          answer: "Boston Tea Party",
          options: [
            "Boston Tea Party",
            "American Revolution",
            "Civil War",
            "Gold Rush",
          ],
        },
        {
          q: `Who gave the famous "I Have a Dream" speech in 1963?`,
          answer: "Martin Luther King Jr.",
          options: [
            "Martin Luther King Jr.",
            "Abraham Lincoln",
            "John F. Kennedy",
            "Rosa Parks",
          ],
        },
        {
          q: `Which US constitutional amendment granted women the right to vote?`,
          answer: "19th Amendment",
          options: [
            "19th Amendment",
            "1st Amendment",
            "13th Amendment",
            "22nd Amendment",
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
          options: [
            "Ben Nevis",
            "Snowdon (Yr Wyddfa)",
            "Scafell Pike",
            "Slieve Donard",
          ],
        },
        {
          q: `How many countries make up the United Kingdom?`,
          answer: "4 (England, Scotland, Wales, Northern Ireland)",
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
          q: `Which imaginary line divides the Earth into Northern and Southern hemispheres?`,
          answer: "The Equator",
          options: [
            "The Equator",
            "Prime Meridian",
            "Tropic of Cancer",
            "Arctic Circle",
          ],
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
          q: `How many states are in the United States of America?`,
          answer: 50,
          options: [48, 50, 51, 52],
        },
        {
          q: `Which river is the longest in North America?`,
          answer: "Missouri-Mississippi River system",
          options: [
            "Missouri-Mississippi",
            "Colorado River",
            "Rio Grande",
            "Hudson River",
          ],
        },
        {
          q: `Which US state is an island chain in the Pacific Ocean?`,
          answer: "Hawaii",
          options: ["Hawaii", "Alaska", "Florida", "California"],
        },
        {
          q: `Which mountain range runs along the western United States?`,
          answer: "Rocky Mountains",
          options: [
            "Rocky Mountains",
            "Appalachian Mountains",
            "Alps",
            "Himalayas",
          ],
        },
        {
          q: `Which mountain range runs along the eastern United States?`,
          answer: "Appalachian Mountains",
          options: [
            "Appalachian Mountains",
            "Rocky Mountains",
            "Sierra Nevada",
            "Andes",
          ],
        },
        {
          q: `What is the largest US state by total area?`,
          answer: "Alaska",
          options: ["Alaska", "Texas", "California", "Montana"],
        },
        {
          q: `Which imaginary line divides the Earth into Northern and Southern hemispheres?`,
          answer: "The Equator",
          options: [
            "The Equator",
            "Prime Meridian",
            "Tropic of Cancer",
            "Arctic Circle",
          ],
        },
      ];
    }
  } else if (topicId === "art_theory") {
    pool = [
      {
        q: `Which of these are the three traditional primary colors in art?`,
        answer: "Red, Blue, Yellow",
        options: [
          "Red, Blue, Yellow",
          "Orange, Green, Purple",
          "Black, White, Grey",
          "Pink, Brown, Gold",
        ],
      },
      {
        q: `What color do you get when you mix blue and yellow paint?`,
        answer: "Green",
        options: ["Green", "Purple", "Orange", "Brown"],
      },
      {
        q: `What color do you get when you mix red and yellow paint?`,
        answer: "Orange",
        options: ["Orange", "Green", "Purple", "Pink"],
      },
      {
        q: `What color do you get when you mix red and blue paint?`,
        answer: "Purple",
        options: ["Purple", "Green", "Orange", "Brown"],
      },
      {
        q: `Who painted the famous masterpiece 'Mona Lisa'?`,
        answer: "Leonardo da Vinci",
        options: [
          "Leonardo da Vinci",
          "Vincent van Gogh",
          "Claude Monet",
          "Pablo Picasso",
        ],
      },
      {
        q: `Which artist is famous for painting swirling night skies ('The Starry Night')?`,
        answer: "Vincent van Gogh",
        options: [
          "Vincent van Gogh",
          "Rembrandt",
          "Henri Matisse",
          "Salvador Dalí",
        ],
      },
      {
        q: `What do we call colors that are opposite each other on the color wheel (like blue and orange)?`,
        answer: "Complementary colors",
        options: [
          "Complementary colors",
          "Primary colors",
          "Monochromatic shades",
          "Pastel tones",
        ],
      },
      {
        q: `What is sculpture in art?`,
        answer:
          "A three-dimensional art work made by carving, modeling, or welding",
        options: [
          "A three-dimensional art work made by carving, modeling, or welding",
          "A flat pencil drawing",
          "A watercolor painting",
          "A photograph",
        ],
      },
    ];
  }

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
