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
    
    # Profile Table
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
    
    # Seed or update default inventory items
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
        ("pet_fox", "pet", "Foxy Friend", 90, 0),
        ("pet_penguin", "pet", "Penguin Pal", 80, 0),
        ("pet_unicorn", "pet", "Unicorn Buddy", 150, 0),
        ("pet_capibara", "pet", "Cuddly Capybara", 110, 0),
        ("pet_hedgehog", "pet", "Hedgehog Helper", 95, 0),
        ("pet_koala", "pet", "Koala Companion", 130, 0),
        ("pet_sloth", "pet", "Sleepy Sloth", 85, 0),
        ("pet_turtle", "pet", "Turtle Totem", 70, 0),
        ("pet_owl", "pet", "Wise Owl", 140, 0),
        ("pet_frog", "pet", "Friendly Frog", 65, 0),
        ("outfit_knight", "outfit", "Knight Armor", 80, 0),
        ("outfit_princess", "outfit", "Princess Dress", 90, 0),
        ("outfit_pirate", "outfit", "Pirate Costume", 85, 0),
        ("outfit_astronaut", "outfit", "Astronaut Suit", 100, 0),
        ("outfit_ninja", "outfit", "Ninja Outfit", 95, 0),
        ("outfit_vampire", "outfit", "Vampire Cloak", 110, 0),
        ("outfit_witch", "outfit", "Witch Robe", 105, 0),
        ("hat_top_hat", "hat", "Top Hat", 25, 1),
        ("hat_beanie", "hat", "Warm Beanie", 15, 1),
        ("hat_sombrero", "hat", "Fiesta Sombrero", 30, 0),
        ("hat_beret", "hat", "Artist Beret", 20, 1),
        ("hat_fedora", "hat", "Stylish Fedora", 35, 0),
        ("hat_headband", "hat", "Sporty Headband", 10, 1),
        ("hat_bandana", "hat", "Cool Bandana", 15, 1),
        ("hat_cowboy", "hat", "Cowboy Hat", 40, 0),
        ("hat_sailor", "hat", "Sailor Cap", 25, 1),
        ("hat_chef", "hat", "Chef's Hat", 30, 0),
        ("hat_party", "hat", "Party Hat", 20, 1),
        ("hat_floral", "hat", "Floral Crown", 35, 0),
        ("hat_steampunk", "hat", "Steampunk Goggles", 45, 0),
        ("hat_santa", "hat", "Santa Hat", 50, 0),
        ("hat_easter", "hat", "Easter Bunny Ears", 30, 0),
        ("hat_halloween", "hat", "Witch's Hat", 40, 0),
        ("hat_newyear", "hat", "New Year Party Hat", 25, 1),
        ("hat_valentine", "hat", "Valentine's Heart Hat", 30, 0),
        ("hat_stpatricks", "hat", "St. Patrick's Shamrock Hat", 35, 0),
        ("hat_independence", "hat", "Independence Day Hat", 40, 0),
        ("hat_thanksgiving", "hat", "Thanksgiving Pilgrim Hat", 45, 0),
        ("hat_christmas", "hat", "Christmas Elf Hat", 50, 0),
        ("hat_halloween2", "hat", "Pumpkin Hat", 30, 0),
        ("hat_winter", "hat", "Winter Beanie", 20, 1),
        ("hat_summer", "hat", "Summer Straw Hat", 25, 1),
        ("hat_spring", "hat", "Spring Flower Hat", 30, 0),
        ("hat_autumn", "hat", "Autumn Leaf Hat", 35, 0),
        ("Dress", "outfit", "Elegant Dress", 100, 0),
        ("Suit", "outfit", "Formal Suit", 120, 0),
        ("Casual", "outfit", "Casual Outfit", 80, 0),
        ("Sportswear", "outfit", "Sportswear Set", 90, 0),
        ("Winter Coat", "outfit", "Warm Winter Coat", 110, 0),
        ("Summer Dress", "outfit", "Light Summer Dress", 95, 0),
        ("Raincoat", "outfit", "Waterproof Raincoat", 85, 0),
        ("Swimwear", "outfit", "Beach Swimwear", 100, 0),
        ("Pajamas", "outfit", "Cozy Pajamas", 75, 0),
        ("Business Attire", "outfit", "Professional Business Attire", 130, 0),
        ("Party Outfit", "outfit", "Fun Party Outfit", 90, 0),
        ("Traditional Dress", "outfit", "Cultural Traditional Dress", 120, 0),
        ("Fantasy Armor", "outfit", "Fantasy Armor Set", 150, 0),
        ("Steampunk Outfit", "outfit", "Steampunk Costume", 140, 0),
        ("Superhero Costume", "outfit", "Superhero Suit", 160, 0),
        ("Animal Costume", "outfit", "Animal Onesie Costume", 110, 0),
    ]
    for item in default_items:
        cursor.execute('''
            INSERT INTO inventory (item_id, item_type, name, cost, unlocked)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(item_id) DO UPDATE SET
                item_type = excluded.item_type,
                name = excluded.name,
                cost = excluded.cost
        ''', item)

    # Seed default profile if empty
    cursor.execute("SELECT COUNT(*) FROM profile")
    if cursor.fetchone()[0] == 0:
        cursor.execute("INSERT INTO profile (name, year_group, stars, streak_days, avatar_config, dialect, theme_mode) VALUES (?, ?, ?, ?, ?, ?, ?)",
                       ("Superstar", 3, 25, 5, json.dumps({"base": "🐵", "hat": "hat_cap", "glasses": "glasses_nerd", "outfit": "none"}), "UK", "pastel"))

    conn.commit()
    conn.close()