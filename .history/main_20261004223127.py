import os
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, Response
from pydantic import BaseModel
import sqlite3
import json
from datetime import date
from database import init_db, get_db

app = FastAPI(title="Tale Trove Island", description="Multi-user SEND-friendly app for kids")

# Absolute pathing for reliable static file serving
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")

@app.on_event("startup")
def startup_event():
    init_db()

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

@app.get("/")
def read_index():
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))

@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    return Response(status_code=204)

class ProfileCreate(BaseModel):
    name: str
    year_group: int
    dialect: str
    theme_mode: str
    dyslexia_font: bool

class ProfileUpdate(BaseModel):
    name: str
    year_group: int
    dialect: str
    theme_mode: str
    dyslexia_font: bool

class PracticeResult(BaseModel):
    profile_id: int
    correct_count: int
    total_count: int
    level: str

class WordGameResult(BaseModel):
    profile_id: int
    correct_count: int

class PurchaseItem(BaseModel):
    profile_id: int
    item_id: str

class EquipItem(BaseModel):
    profile_id: int
    slot: str
    item_id: str

class WorldObject(BaseModel):
    item_type: str
    x: int
    y: int
    color: str

class StoryCreate(BaseModel):
    profile_id: int
    title: str
    content: str
    theme: str

@app.get("/api/profiles")
def get_profiles():
    conn = get_db()
    cursor = conn.cursor()
    profiles = cursor.execute("SELECT * FROM profile").fetchall()
    conn.close()
    return [dict(p) for p in profiles]

@app.post("/api/profiles/create")
def create_profile(data: ProfileCreate):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO profile (name, year_group, stars, streak_days, avatar_config, dialect, theme_mode, dyslexia_font) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                   (data.name, data.year_group, 10, 1, json.dumps({"hat": "hat_cap", "glasses": "glasses_nerd", "outfit": "none"}), data.dialect, data.theme_mode, int(data.dyslexia_font)))
    conn.commit()
    new_id = cursor.lastrowid
    profile = cursor.execute("SELECT * FROM profile WHERE id = ?", (new_id,)).fetchone()
    conn.close()
    return dict(profile)

@app.get("/api/profile/{profile_id}")
def get_profile_data(profile_id: int):
    conn = get_db()
    cursor = conn.cursor()
    profile = cursor.execute("SELECT * FROM profile WHERE id = ?", (profile_id,)).fetchone()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    inventory = cursor.execute("SELECT * FROM inventory").fetchall()
    world = cursor.execute("SELECT * FROM world_objects").fetchall()
    stories = cursor.execute("SELECT * FROM stories WHERE profile_id = ? ORDER BY id DESC", (profile_id,)).fetchall()
    conn.close()
    
    return {
        "profile": {
            "id": profile["id"],
            "name": profile["name"],
            "year_group": profile["year_group"],
            "stars": profile["stars"],
            "streak_days": profile["streak_days"],
            "last_practice_date": profile["last_practice_date"],
            "avatar_config": json.loads(profile["avatar_config"]),
            "dialect": profile["dialect"],
            "theme_mode": profile["theme_mode"],
            "dyslexia_font": bool(profile["dyslexia_font"])
        },
        "inventory": [dict(row) for row in inventory],
        "world_objects": [dict(row) for row in world],
        "stories": [dict(row) for row in stories]
    }

@app.post("/api/profile/{profile_id}")
def update_profile(profile_id: int, data: ProfileUpdate):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("UPDATE profile SET name = ?, year_group = ?, dialect = ?, theme_mode = ?, dyslexia_font = ? WHERE id = ?",
                   (data.name, data.year_group, data.dialect, data.theme_mode, int(data.dyslexia_font), profile_id))
    conn.commit()
    conn.close()
    return {"status": "success"}

@app.post("/api/practice/complete")
def complete_practice(result: PracticeResult):
    conn = get_db()
    cursor = conn.cursor()
    
    multiplier = 2 if result.level == "hard" else (1.5 if result.level == "medium" else 1)
    earned_stars = int(result.correct_count * 5 * multiplier)
    
    profile = cursor.execute("SELECT stars, streak_days, last_practice_date FROM profile WHERE id = ?", (result.profile_id,)).fetchone()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
        
    new_stars = profile["stars"] + earned_stars
    today_str = str(date.today())
    streak = profile["streak_days"]
    last_date = profile["last_practice_date"]
    
    if last_date != today_str:
        streak += 1
        
    cursor.execute("UPDATE profile SET stars = ?, streak_days = ?, last_practice_date = ? WHERE id = ?",
                   (new_stars, streak, today_str, result.profile_id))
    conn.commit()
    conn.close()
    
    return {"earned_stars": earned_stars, "total_stars": new_stars, "streak_days": streak}

@app.post("/api/wordgame/complete")
def complete_wordgame(data: WordGameResult):
    earned_stars = data.correct_count * 10
    conn = get_db()
    cursor = conn.cursor()
    profile = cursor.execute("SELECT stars FROM profile WHERE id = ?", (data.profile_id,)).fetchone()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    new_stars = profile["stars"] + earned_stars
    cursor.execute("UPDATE profile SET stars = ? WHERE id = ?", (new_stars, data.profile_id))
    conn.commit()
    conn.close()
    return {"earned_stars": earned_stars, "total_stars": new_stars}

@app.post("/api/stories/save")
def save_story(story: StoryCreate):
    conn = get_db()
    cursor = conn.cursor()
    today_str = str(date.today())
    cursor.execute("INSERT INTO stories (profile_id, title, content, date, theme) VALUES (?, ?, ?, ?, ?)",
                   (story.profile_id, story.title, story.content, today_str, story.theme))
    
    profile = cursor.execute("SELECT stars FROM profile WHERE id = ?", (story.profile_id,)).fetchone()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    new_stars = profile["stars"] + 30
    cursor.execute("UPDATE profile SET stars = ? WHERE id = ?", (new_stars, story.profile_id))
    
    conn.commit()
    conn.close()
    return {"status": "success", "earned_stars": 30, "total_stars": new_stars}

@app.post("/api/avatar/equip")
def equip_avatar(data: EquipItem):
    conn = get_db()
    cursor = conn.cursor()
    profile = cursor.execute("SELECT avatar_config FROM profile WHERE id = ?", (data.profile_id,)).fetchone()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    config = json.loads(profile["avatar_config"])
    config[data.slot] = data.item_id
    cursor.execute("UPDATE profile SET avatar_config = ? WHERE id = ?", (json.dumps(config), data.profile_id))
    conn.commit()
    conn.close()
    return {"status": "success", "avatar_config": config}

@app.post("/api/avatar/buy")
def buy_item(data: PurchaseItem):
    conn = get_db()
    cursor = conn.cursor()
    
    item = cursor.execute("SELECT * FROM inventory WHERE item_id = ?", (data.item_id,)).fetchone()
    if not item:
        raise HTTPException(status_code=404, detail="Error: Item not found")
    if item["unlocked"]:
        return {"status": "already_unlocked"}
        
    profile = cursor.execute("SELECT stars FROM profile WHERE id = ?", (data.profile_id,)).fetchone()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    if profile["stars"] < item["cost"]:
        raise HTTPException(status_code=400, detail="Not enough Star Points!")
        
    new_stars = profile["stars"] - item["cost"]
    cursor.execute("UPDATE profile SET stars = ? WHERE id = ?", (new_stars, data.profile_id))
    cursor.execute("UPDATE inventory SET unlocked = 1 WHERE item_id = ?", (data.item_id,))
    conn.commit()
    conn.close()
    return {"status": "success", "remaining_stars": new_stars}

@app.post("/api/world/add")
def add_world_object(obj: WorldObject):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO world_objects (item_type, x, y, color) VALUES (?, ?, ?, ?)",
                   (obj.item_type, obj.x, obj.y, obj.color))
    conn.commit()
    conn.close()
    return {"status": "success"}

@app.delete("/api/world/clear")
def clear_world():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM world_objects")
    conn.commit()
    conn.close()
    return {"status": "success"}