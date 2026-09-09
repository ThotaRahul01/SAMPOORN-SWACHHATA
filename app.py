"""
Sampoorn Swachhata - Complete Cleanliness Management System
Geethanjali College of Engineering and Technology
Developed by GCET Robotics Club
"""

from flask import Flask, render_template, request, redirect, url_for, send_from_directory, flash, jsonify
import sqlite3
import os
import datetime
import uuid
from werkzeug.utils import secure_filename

# Configuration
BASE_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(BASE_DIR, 'database.db')
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'static', 'uploads')
ALLOWED_EXT = {'png', 'jpg', 'jpeg', 'gif'}

# Initialize Flask app
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.secret_key = 'sampoorn-swachhata-secret-key-v2024'


def get_db_connection():
    """Get database connection with row factory"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXT


def bin_fill_pct(row):
    """Percentage full (by kg) for a bin row. Falls back gracefully if capacity is 0."""
    cap = row['capacity_kg'] if row['capacity_kg'] else 0
    cur = row['current_kg'] if row['current_kg'] else 0
    if not cap:
        return 0
    return round(min(cur / cap, 1) * 100, 1)


def vehicle_load_pct(row):
    """Percentage full (by kg) for a vehicle row."""
    cap = row['capacity_kg'] if row['capacity_kg'] else 0
    cur = row['current_load_kg'] if row['current_load_kg'] else 0
    if not cap:
        return 0
    return round(min(cur / cap, 1) * 100, 1)


# ============================================
# Routes
# ============================================

@app.route('/')
def index():
    """Dashboard - Main page with stats and recent photos"""
    conn = get_db_connection()

    # Get photos with vehicle and bin info
    photos = conn.execute('''
        SELECT p.id, p.caption, p.filename, p.timestamp, p.lat, p.lon, p.plants_watered,
               b.location as bin_location, v.name as vehicle_name 
        FROM photos p 
        LEFT JOIN bins b ON p.bin_id = b.id 
        LEFT JOIN vehicles v ON p.vehicle_id = v.id 
        ORDER BY p.timestamp DESC
    ''').fetchall()

    # Get all bins
    bins = conn.execute('SELECT * FROM bins').fetchall()
    bins_view = [dict(b, fill_pct=bin_fill_pct(b)) for b in bins]

    # Count today's watered plants
    today = datetime.datetime.now().strftime('%Y-%m-%d')
    watered_count = conn.execute(
        "SELECT COUNT(*) as cnt FROM photos WHERE plants_watered = 1 AND DATE(timestamp) = ?",
        (today,)
    ).fetchone()['cnt']

    # Today's / latest waste + coverage snapshot for the dashboard stat cards
    today_stats = conn.execute(
        'SELECT * FROM daily_stats WHERE date = ?', (today,)
    ).fetchone()
    if today_stats is None:
        today_stats = conn.execute(
            'SELECT * FROM daily_stats ORDER BY date DESC LIMIT 1'
        ).fetchone()

    conn.close()

    return render_template('index.html',
                           photos=photos,
                           bins=bins_view,
                           watered_count=watered_count,
                           today_stats=today_stats,
                           college_name='Geethanjali College of Engineering and Technology',
                           area_name='ECIL Area, Hyderabad')

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    """Upload cleaning proof photos"""
    conn = get_db_connection()
    vehicles = conn.execute('SELECT * FROM vehicles').fetchall()
    bins = conn.execute('SELECT * FROM bins').fetchall()
    conn.close()
    
    if request.method == 'POST':
        # Get form data
        vehicle_id = request.form.get('vehicle_id') or None
        bin_id = request.form.get('bin_id') or None
        caption = request.form.get('caption', '').strip()
        lat = request.form.get('lat') or None
        lon = request.form.get('lon') or None
        plants_watered = 1 if request.form.get('plants_watered') == 'on' else 0
        
        # Handle file upload
        file = request.files.get('photo')
        if not file or file.filename == '':
            flash('Please select a photo to upload.', 'danger')
            return redirect(request.url)
        
        if not allowed_file(file.filename):
            flash('Unsupported file type. Please use PNG, JPG, JPEG, or GIF.', 'danger')
            return redirect(request.url)
        
        # Save file with unique name
        filename = secure_filename(file.filename)
        ext = filename.rsplit('.', 1)[-1].lower()
        unique_name = f"{uuid.uuid4().hex}.{ext}"
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_name)
        file.save(save_path)
        
        # Store in database
        conn = get_db_connection()
        conn.execute('''
            INSERT INTO photos (vehicle_id, bin_id, caption, filename, timestamp, lat, lon, plants_watered) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (vehicle_id, bin_id, caption, unique_name, 
              datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'), lat, lon, plants_watered))
        conn.commit()
        conn.close()
        
        flash('Photo uploaded successfully!', 'success')
        return redirect(url_for('index'))
    
    return render_template('upload.html', 
                           vehicles=vehicles, 
                           bins=bins,
                           college_name='Geethanjali College of Engineering and Technology',
                           area_name='ECIL Area, Hyderabad')

@app.route('/bins')
def bins_list():
    """Bin management page"""
    conn = get_db_connection()
    bins = conn.execute('SELECT * FROM bins').fetchall()
    bins_view = [dict(b, fill_pct=bin_fill_pct(b)) for b in bins]
    conn.close()
    
    return render_template('bins.html', 
                           bins=bins_view,
                           college_name='Geethanjali College of Engineering and Technology',
                           area_name='ECIL Area, Hyderabad')


@app.route('/bins/update', methods=['POST'])
def bins_update():
    """Update bin status, waste quantity (kg) and waste type"""
    bin_id = request.form.get('bin_id')
    level = request.form.get('level')
    current_kg = request.form.get('current_kg')
    waste_type = request.form.get('waste_type')

    conn = get_db_connection()

    if current_kg not in (None, ''):
        conn.execute(
            'UPDATE bins SET level = ?, current_kg = ?, waste_type = ?, last_update = ? WHERE id = ?',
            (level, current_kg, waste_type, datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'), bin_id)
        )
    else:
        conn.execute(
            'UPDATE bins SET level = ?, last_update = ? WHERE id = ?',
            (level, datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'), bin_id)
        )

    conn.commit()
    conn.close()
    
    flash('Bin status updated successfully!', 'success')
    return redirect(url_for('bins_list'))


@app.route('/map')
def map_view():
    """Interactive map view"""
    conn = get_db_connection()
    vehicles = conn.execute('SELECT * FROM vehicles').fetchall()
    bins = conn.execute('SELECT * FROM bins').fetchall()
    photos = conn.execute('SELECT * FROM photos').fetchall()
    conn.close()
    
    return render_template('map.html', 
                           vehicles=vehicles, 
                           bins=bins, 
                           photos=photos,
                           college_name='Geethanjali College of Engineering and Technology',
                           area_name='ECIL Area, Hyderabad')


@app.route('/analytics')
def analytics():
    """Analytics dashboard - waste volumes, segregation, coverage, vehicle & bin loads"""
    conn = get_db_connection()

    daily = conn.execute(
        'SELECT * FROM daily_stats ORDER BY date ASC LIMIT 14'
    ).fetchall()

    bins = conn.execute('SELECT * FROM bins').fetchall()
    vehicles = conn.execute('SELECT * FROM vehicles').fetchall()
    campus = conn.execute('SELECT * FROM campus_info WHERE id = 1').fetchone()

    conn.close()

    # Segregation totals (all-time, from the seeded/updated daily_stats rows)
    total_dry = sum(d['dry_waste_kg'] for d in daily)
    total_wet = sum(d['wet_waste_kg'] for d in daily)
    total_ewaste = sum(d['ewaste_kg'] for d in daily)
    total_all = round(total_dry + total_wet + total_ewaste, 1)

    latest = daily[-1] if daily else None

    bins_view = [dict(b, fill_pct=bin_fill_pct(b)) for b in bins]
    vehicles_view = [dict(v, load_pct=vehicle_load_pct(v)) for v in vehicles]

    avg_bin_fill = round(sum(b['fill_pct'] for b in bins_view) / len(bins_view), 1) if bins_view else 0

    return render_template('analytics.html',
                           daily=daily,
                           bins=bins_view,
                           vehicles=vehicles_view,
                           campus=campus,
                           total_dry=round(total_dry, 1),
                           total_wet=round(total_wet, 1),
                           total_ewaste=round(total_ewaste, 1),
                           total_all=total_all,
                           latest=latest,
                           avg_bin_fill=avg_bin_fill,
                           college_name='Geethanjali College of Engineering and Technology',
                           area_name='ECIL Area, Hyderabad')


@app.route('/api/markers')
def api_markers():
    """API endpoint for map markers"""
    conn = get_db_connection()
    bins = conn.execute('SELECT id, location, lat, lon, level FROM bins').fetchall()
    photos = conn.execute(
        'SELECT id, caption, filename, lat, lon, plants_watered FROM photos WHERE lat IS NOT NULL AND lon IS NOT NULL'
    ).fetchall()
    conn.close()
    
    return jsonify({
        'bins': [dict(b) for b in bins],
        'photos': [dict(p) for p in photos]
    })


@app.route('/api/analytics')
def api_analytics():
    """API endpoint - raw analytics data (used by the charts on /analytics)"""
    conn = get_db_connection()
    daily = conn.execute('SELECT * FROM daily_stats ORDER BY date ASC LIMIT 14').fetchall()
    conn.close()

    return jsonify({
        'labels': [d['date'] for d in daily],
        'total_waste_kg': [d['total_waste_kg'] for d in daily],
        'dry_waste_kg': [d['dry_waste_kg'] for d in daily],
        'wet_waste_kg': [d['wet_waste_kg'] for d in daily],
        'ewaste_kg': [d['ewaste_kg'] for d in daily],
        'area_covered_pct': [d['area_covered_pct'] for d in daily],
    })


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serve uploaded files"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


# ============================================
# Error Handlers
# ============================================

@app.errorhandler(404)
def not_found(error):
    flash('Page not found.', 'danger')
    return redirect(url_for('index'))


@app.errorhandler(500)
def server_error(error):
    flash('An error occurred. Please try again.', 'danger')
    return redirect(url_for('index'))


# ============================================
# Main Entry Point
# ============================================

if __name__ == '__main__':
    # Initialize database if it doesn't exist
    if not os.path.exists(DB_PATH):
        from init_db import init_db
        init_db(DB_PATH)
        print('Database initialized successfully!')
    
    # Create upload folder if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    # Run the app
    app.run(host='0.0.0.0', port=5000, debug=True)
