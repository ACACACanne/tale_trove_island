import sqlite3
import json

DB_NAME = "tale_trove_island.db"

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
    
    # Inventory Table (matching main.py queries to 'inventory')
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
        ]
        cursor.executemany("INSERT OR IGNORE INTO inventory (item_id, item_type, name, cost, unlocked) VALUES (?, ?, ?, ?, ?)", default_items)

    # Seed default profile if empty
    cursor.execute("SELECT COUNT(*) FROM profile")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO profile (name, year_group, stars, streak_days, avatar_config, dialect, theme_mode) VALUES (?, ?, ?, ?, ?, ?, ?)",
                       ("Superstar", 3, 25, 5, json.dumps({"hat": "hat_cap", "glasses": "glasses_nerd", "outfit": "none"}), "UK", "pastel"))

    conn.commit()
    conn.close()