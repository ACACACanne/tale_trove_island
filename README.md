# tale_trove_island
Tale Trove Island is a 100% local-first, privacy-first, gamified web application designed for junior school-aged children (ages 6–11). It blends multiplication timetables, reading, spelling, and creative story writing into a cohesive, anxiety-free, and highly engaging adventure.

Licence:

"The code in this repository is view-only. You may read the source code and fork the repository via GitHub's interface, but you are strictly prohibited from using, copying, modifying, or distributing this software for any commercial, production, or business purpose without a separate written agreement from the copyright holder."


Tale Trove Island: Application Overview & System Description

Tale Trove Island is a 100% local-first, privacy-first, gamified web application designed for junior school-aged children (ages 6–11). It blends multiplication timetables, reading, spelling, and creative story writing into a cohesive, anxiety-free, and highly engaging adventure.
Engineered specifically with SEND, SENCO, ADHD, Autism, and neurodiverse accessibility in mind, Tale Trove Island ensures that every child can learn at their own pace in a safe, offline environment where no personal data or location tracking ever leaves the computer.

Application Slogan
"Are you ready for Tale Trove Island where math turns to treasure, reading unlocks magic, and every story sparks an adventure?"

Core Design Pillars
1.	100% Local & Private: Runs entirely on the user's local machine via Python (FastAPI) and a local SQLite database (multiply_land.db). Zero cloud servers, zero telemetry, and zero location tracking.
2.	Neurodiverse & SEND Friendly: Includes built-in support for sensory regulation, dyslexia, attention spans, and processing differences.
3.	Pressure-Free Learning: Offers untimed modes, gentle timers with supportive extension prompts ("Need a little extra time, superstar?"), and non-punitive audio feedback.
4.	Bilingual English Dialect Support: Instant switching between British English (UK 🇬🇧) and American English (US 🇺🇸) for spelling, reading, and story writing.
   
Comprehensive Feature Breakdown
1. Gentle Timetable Practice
•	School Year Calibration: Tailored difficulty levels ranging from Year 2 (Age 6–7) to Year 6 (Age 10–11).
•	ADHD Micro-Sessions: Children can choose between quick 5-question micro-sprints or standard 10-question sessions to match their attention span.
•	Flexible Difficulty Levels:
o	Easy / Untimed: Zero time pressure with hint options.
o	Medium / Gentle Timer: Countdown with a reassuring time-extension prompt when time gets low.
o	Hard / Speed Challenge: Rapid-fire ninja mode for double Star Points .
•	Text-to-Speech (TTS): Built-in audio reader button (🔊 Listen) for children with reading processing difficulties.

3. Pet Box Word Game (Reading & Spelling Practice)
•	Word Rescue Mechanic: Children are presented with a locked box containing a cute animal (bunny, cat, dog, dragon, koala) and a playful riddle hint.
•	Interactive Alphabet Keyboard: Kids click or tap letters to spell out words (e.g., BUNNY, MAGIC, CASTLE). Correct letters unlock the box, letting the pet jump out with celebratory sound effects and +10 Star Points.
•	Dialect-Aware Word Banks: Automatically switches spelling targets based on whether the child has selected UK English (e.g., COLOUR, FAVOURITE, CENTRE) or US English (e.g., COLOR, FAVORITE, CENTER).

5. Magical Story Creator & Writing Studio
•	Creative Writing Practice: A dedicated writing studio where children can author their own fantasy, cute animal, daily life, or space adventure stories.
•	Theme Selection: Kids pick from categories like Magical Fantasy, Cute Animal Adventure, or Space Exploration.
•	Reward System: Saving a story awards +30 Star Points and stores it securely in their local library.
•	Audio Read-Aloud: Children can click "Read Aloud" on any saved story to listen to their own creations spoken back to them.

7. Avatar Wardrobe & Gamification Economy
•	Star Points: Earned through correct math answers, word game rescues, and storytelling.
•	Customization Studio: Spend Star Points in the Wardrobe to unlock and equip fun hats (Golden Crown, Wizard Hat), glasses (Star Sunglasses, Smart Specs), and outfits (Superhero Cape, Dinosaur Onesie).

9. The Sunday World Builder
•	Consistency Reward: Completing practice sessions across 6 days of the week unlocks Sunday special sandbox access.
•	Virtual Sandbox: Children can place trees, houses, flowers, and cute pet companions onto an interactive grid and interact with their custom virtual world.

11. SEND & Accessibility Hub
•	Cozy Pastel Low-Stimulus Theme: A one-click setting toggle that swaps vibrant neon aesthetics for calming slate and teal gradients to prevent sensory overload for autistic learners.
•	Dyslexia-Friendly Font & Spacing: Instantly applies high-legibility typography with increased letter and word spacing.
•	Independent Audio Controls: Toggleable background ambient music and gentle, non-punitive chime effects designed for emotional safety.

Technology Stack
•	Backend: Python 3.10+ with FastAPI (high-performance asynchronous local server).
•	Database: SQLite (multiply_land.db) for secure, self-contained local profile and story storage.
•	Frontend: HTML5, Tailwind CSS, and Vanilla JavaScript with responsive single-page architecture.
•	Accessibility APIs: Native Web Audio API (synthesized chime chiptunes and soft ambient melodies) and Web Speech API (Text-to-Speech read-aloud support).
