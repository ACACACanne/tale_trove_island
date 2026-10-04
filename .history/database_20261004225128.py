import sqlite3
import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_NAME = os.path.join(BASE_DIR, "tale_trove_island.db")

def get_db():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()
    
    # Profile Table (matching main.py queries to 'profile')
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT DEFAULT 'Superstar',
            year_group INTEGER DEFAULT 3,
            stars INTEGER DEFAULT 0,
            streak_days INTEGER DEFAULT 0,
            last_practice_date TEXT DEFAULT '',
            avatar_config TEXT DEFAULT '{}',
            dialect TEXT DEFAULT 'UK',
            theme_mode TEXT DEFAULT 'pastel',
            dyslexia_font BOOLEAN DEFAULT 0
        )
    ''')
    
    # Inventory Table 
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_id TEXT UNIQUE,
            item_type TEXT,
            name TEXT,
            cost INTEGER,
            unlocked BOOLEAN DEFAULT 0
        )
    ''')

    # Sunday World Objects Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS world_objects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_type TEXT,
            x INTEGER,
            y INTEGER,
            color TEXT
        )
    ''')

    # Stories Table linked to profile_id
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS stories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            profile_id INTEGER,
            title TEXT,
            content TEXT,
            date TEXT,
            theme TEXT
        )
    ''')
    
    # Seed default inventory items if empty
    cursor.execute("SELECT COUNT(*) FROM inventory")
    if cursor.fetchone()[0] == 0:
        default_items = [
            ("hat_crown", "hat", "Golden Crown", 50, 0),
            ("hat_cap", "hat", "Cool Baseball Cap", 20, 1),
            ("hat_wizard", "hat", "Wizard Hat", 40, 0),
            ("glasses_cool", "glasses", "Star Sunglasses", 30, 0),
            ("glasses_nerd", "glasses", "Smart Specs", 15, 1),
            ("outfit_hero", "outfit", "Superhero Cape", 60, 0),
            ("outfit_dino", "outfit", "Dinosaur Onesie", 75, 0),
            ("pet_bunny", "pet", "Hoppy Bunny", 100, 0),
            ("pet_dragon", "pet", "Mini Dragon", 120, 0),
            ("pet_fox", "pet", "Clever Fox", 90, 0),
            ("pet_penguin", "pet", "Chilly Penguin", 80, 0),
            ("pet_unicorn", "pet", "Magical Unicorn", 150, 0),
            ("pet_owl", "pet", "Wise Owl", 110, 0),
            ("pet_kitten", "pet", "Playful Kitten", 70, 0),
            ("pet_puppy", "pet", "Loyal Puppy", 85, 0),
            ("pet_turtle", "pet", "Slowpoke Turtle", 65, 0),
            ("pet_hamster", "pet", "Tiny Hamster", 55, 0),
            ("pet_parrot", "pet", "Chatty Parrot", 95, 0),
            ("pet_frog", "pet", "Jumping Frog", 60, 0),
            ("pet_snake", "pet", "Sneaky Snake", 105, 0),
            ("pet_horse", "pet", "Galloping Horse", 130, 0),
            ("pet_monkey", "pet", "Mischievous Monkey", 115, 0),
            ("pet_elephant", "pet", "Gentle Elephant", 140, 0),
            ("pet_lion", "pet", "Brave Lion", 160, 0),
            ("pet_tiger", "pet", "Fierce Tiger", 170, 0),
            ("pet_bear", "pet", "Cuddly Bear", 180, 0),
            ("pet_wolf", "pet", "Lone Wolf", 190, 0),
            ("pet_rabbit", "pet", "Quick Rabbit", 200, 0),
            ("pet_squirrel", "pet", "Nutty Squirrel", 210, 0),
            ("pet_bee", "pet", "Buzzing Bee", 220, 0),
            ("pet_butterfly", "pet", "Fluttering Butterfly", 230, 0),
            ("pet_dragonfly", "pet", "Shimmering Dragonfly", 240, 0),
            ("pet_snail", "pet", "Slow Snail", 250, 0),
            ("pet_crab", "pet", "Crabby Crab", 260, 0),
            ("pet_fish", "pet", "Swimming Fish", 270, 0),
            ("pet_seahorse", "pet", "Graceful Seahorse", 280, 0),
            ("pet_octopus", "pet", "Clever Octopus", 290, 0),
            ("pet_shark", "pet", "Fierce Shark", 300, 0)
        ]
        cursor.executemany("INSERT OR IGNORE INTO inventory (item_id, item_type, name, cost, unlocked) VALUES (?, ?, ?, ?, ?)", default_items)

    # Seed default profile if empty
    cursor.execute("SELECT COUNT(*) FROM profile")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO profile (name, year_group, stars, streak_days, avatar_config, dialect, theme_mode) VALUES (?, ?, ?, ?, ?, ?, ?)",
                       ("Superstar", 3, 25, 5, json.dumps({"hat": "hat_cap", "glasses": "glasses_nerd", "outfit": "none"}), "UK", "pastel"))

    conn.commit()
    conn.close()