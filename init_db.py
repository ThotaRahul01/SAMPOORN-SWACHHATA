"""
Database Initialization Script
Sampoorn Swachhata - Complete Cleanliness Management System

v2: Adds waste-quantity tracking (kg), waste segregation
(Dry / Wet / E-Waste), vehicle load levels, area-coverage
tracking, and a daily_stats table used to power the Analytics
dashboard.
"""

import sqlite3
import os
import datetime
import random


def init_db(path='database.db'):
    """Initialize the database with all required tables and sample data"""
    conn = sqlite3.connect(path)
    c = conn.cursor()

    # ============================================
    # Create Tables
    # ============================================

    # Vehicles table - stores cleaning vehicle information
    c.execute('''
        CREATE TABLE IF NOT EXISTS vehicles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            driver TEXT NOT NULL,
            status TEXT DEFAULT 'Idle',
            lat REAL,
            lon REAL,
            capacity_kg REAL DEFAULT 1000,
            current_load_kg REAL DEFAULT 0,
            last_update TEXT
        )
    ''')

    # Bins table - stores bin locations, fill levels and waste type
    c.execute('''
        CREATE TABLE IF NOT EXISTS bins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            location TEXT NOT NULL,
            lat REAL,
            lon REAL,
            level TEXT DEFAULT 'Empty',
            capacity_kg REAL DEFAULT 50,
            current_kg REAL DEFAULT 0,
            waste_type TEXT DEFAULT 'Mixed',
            last_update TEXT
        )
    ''')

    # Photos table - stores uploaded cleaning proof photos
    c.execute('''
        CREATE TABLE IF NOT EXISTS photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            vehicle_id INTEGER,
            bin_id INTEGER,
            caption TEXT,
            filename TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            lat REAL,
            lon REAL,
            plants_watered INTEGER DEFAULT 0,
            FOREIGN KEY(vehicle_id) REFERENCES vehicles(id),
            FOREIGN KEY(bin_id) REFERENCES bins(id)
        )
    ''')

    # Daily stats table - powers the Analytics dashboard
    # (waste collected per day, segregation split, area covered %)
    c.execute('''
        CREATE TABLE IF NOT EXISTS daily_stats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT UNIQUE NOT NULL,
            total_waste_kg REAL DEFAULT 0,
            dry_waste_kg REAL DEFAULT 0,
            wet_waste_kg REAL DEFAULT 0,
            ewaste_kg REAL DEFAULT 0,
            area_covered_pct REAL DEFAULT 0,
            bins_emptied INTEGER DEFAULT 0
        )
    ''')

    # Campus info - single-row table with campus-wide targets used
    # to compute "% of area covered" on the Analytics page
    c.execute('''
        CREATE TABLE IF NOT EXISTS campus_info (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            total_area_km2 REAL DEFAULT 1.2,
            total_zones INTEGER DEFAULT 12
        )
    ''')

    # ============================================
    # Insert Sample Data
    # ============================================

    now = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    # Sample vehicles (with capacity + current load in kg)
    vehicles = [
        ('Truck-01', 'Siva', 'Cleaning', 17.4667, 78.5800, 1000, 420, now),
        ('Truck-02', 'Lakshmi', 'Idle', 17.4700, 78.5860, 1000, 90, now),
        ('Truck-03', 'Ramesh', 'Cleaning', 17.4750, 78.5650, 800, 640, now),
    ]

    c.executemany(
        """INSERT INTO vehicles
           (name, driver, status, lat, lon, capacity_kg, current_load_kg, last_update)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
        vehicles
    )

    # Sample bins around GCET area (capacity/current in kg + waste type)
    bins = [
        ('Near Main Gate - GCET', 17.4765, 78.5610, 'Half', 50, 26, 'Mixed', now),
        ('HIMALAYA Roadside - Sector 5', 17.4800, 78.5870, 'Full', 60, 57, 'Wet', now),
        ('Bus Stop - Near GCET', 17.4750, 78.5630, 'Empty', 40, 4, 'Dry', now),
        ('Canteen Area - GCET', 17.4770, 78.5620, 'Half', 50, 29, 'Wet', now),
        ('Library Entrance', 17.4760, 78.5605, 'Empty', 30, 3, 'Dry', now),
        ('E-Waste Collection Point - Admin Block', 17.4772, 78.5615, 'Half', 80, 35, 'E-Waste', now),
    ]

    c.executemany(
        """INSERT INTO bins
           (location, lat, lon, level, capacity_kg, current_kg, waste_type, last_update)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
        bins
    )

    # Campus info (used for "area covered" calculations)
    c.execute(
        "INSERT OR IGNORE INTO campus_info (id, total_area_km2, total_zones) VALUES (1, 1.2, 12)"
    )

    # 14 days of sample daily_stats so the Analytics charts have
    # something meaningful to show out of the box
    random.seed(42)
    today = datetime.date.today()
    for i in range(13, -1, -1):
        day = today - datetime.timedelta(days=i)
        dry = round(random.uniform(35, 65), 1)
        wet = round(random.uniform(55, 95), 1)
        ewaste = round(random.uniform(2, 12), 1)
        total = round(dry + wet + ewaste, 1)
        coverage = round(random.uniform(68, 98), 1)
        bins_emptied = random.randint(8, 22)
        c.execute(
            """INSERT OR IGNORE INTO daily_stats
               (date, total_waste_kg, dry_waste_kg, wet_waste_kg, ewaste_kg, area_covered_pct, bins_emptied)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (day.strftime('%Y-%m-%d'), total, dry, wet, ewaste, coverage, bins_emptied)
        )

    conn.commit()
    conn.close()
    print(f'Database initialized successfully at: {path}')


if __name__ == '__main__':
    db_path = os.path.join(os.path.dirname(__file__), 'database.db')
    init_db(db_path)
    print('Done!')
