# 🌿 Sampoorn Swachhata - Professional Edition

**Complete Cleanliness Management System**  
Developed by Team SAMPOORN SWACHHATA, Geethanjali College of Engineering and Technology, ECIL Area, Hyderabad

---

## ✨ Features

### 📊 Dashboard
- **Real-time Statistics**: View plants watered, photos uploaded, and bin status
- **Recent Activity Gallery**: Browse all cleaning photos with metadata
- **Bin Status Overview**: Quick view of all bin fill levels
- **Animated UI**: Smooth transitions and hover effects

### 📸 Photo Upload
- **Drag & Drop Support**: Easy file upload with preview
- **GPS Integration**: Capture current location automatically
- **Vehicle & Bin Association**: Link photos to specific vehicles and bins
- **Plant Watering Tracking**: Mark areas where plants were watered

### 🗑️ Bin Management
- **Status Tracking**: Monitor bin levels (Empty/Half/Full)
- **Quick Updates**: Change bin status with one click
- **Visual Indicators**: Color-coded status badges
- **Last Update Timestamp**: Track when each bin was last checked

### 🗺️ Interactive Map
- **Live Location View**: See all bins and photo locations on map
- **Custom Markers**: Different icons for bins and photos
- **Popup Information**: Click markers for detailed info
- **Leaflet Integration**: Smooth, responsive map experience
- **Vehicle Waste Load**: Live kg-based load bars for every vehicle

### 🌐 Multi-Language Support (New)
- **English / తెలుగు / हिन्दी** toggle in the navbar
- Selection is remembered across pages (saved in the browser)
- No page reload needed — text updates instantly

### ♻️ Waste Quantity & Segregation Tracking (New)
- Every bin now tracks **fill level in kilograms** (current kg / capacity kg), not just Empty/Half/Full
- Bins can be tagged by **waste type**: Dry, Wet, E-Waste, or Mixed
- Vehicles track **current load (kg) vs. capacity (kg)**

### 📈 Analytics Dashboard (New)
- **Waste Collected Per Day** — stacked bar chart (Dry / Wet / E-Waste)
- **Area Coverage Trend** — % of campus covered per day, over the last 14 days
- **Waste Segregation Breakdown** — doughnut chart of total Dry/Wet/E-Waste
- **Bin Fill Status** — kg-based fill bars for every bin
- **Vehicle Waste Load** — kg-based load bars for every vehicle
- Powered by a new `daily_stats` table and a `/api/analytics` JSON endpoint

---

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Step 1: Extract the ZIP file
```bash
unzip sampoorn_swachhata_pro.zip
cd sampoorn_swachhata_pro
```

### Step 2: Create Virtual Environment (Recommended)
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Initialize Database
```bash
python init_db.py
```

### Step 5: Run the Application
```bash
python app.py
```

### Step 6: Access the Application
Open your browser and navigate to: **http://localhost:5000**

---

## 📁 Project Structure

```
sampoorn_swachhata_pro/
├── app.py                 # Main Flask application
├── init_db.py             # Database initialization script
├── requirements.txt       # Python dependencies
├── README.md              # This file
├── database.db            # SQLite database (created after init)
├── static/
│   ├── css/
│   │   └── style.css      # Professional styling
│   ├── uploads/           # Uploaded photos storage
│   │   └── (photos saved here)
│   └── equinox_logo.png   # Team Equinox logo
└── templates/
    ├── base.html          # Base template with navigation
    ├── index.html         # Dashboard page
    ├── upload.html        # Photo upload page
    ├── bins.html          # Bin management page
    └── map.html           # Interactive map page
```

---

## 🎨 Design Highlights

### Modern UI Components
- **Gradient Backgrounds**: Beautiful teal-green gradient theme
- **Glassmorphism Effects**: Modern translucent card designs
- **Smooth Animations**: Fade-in and slide-in effects
- **Responsive Layout**: Works on desktop, tablet, and mobile

### Color Scheme
- **Primary**: Teal (#0d9488) - Represents cleanliness & eco-friendliness
- **Success**: Green (#22c55e) - Empty bins, plants watered
- **Warning**: Orange (#f59e0b) - Half-full bins
- **Danger**: Red (#ef4444) - Full bins requiring attention

### Typography
- **Font Family**: Inter, Segoe UI, system fonts
- **Weights**: 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold), 800 (Extra-bold)

---

## 🔧 Configuration

### Changing College/Area Name
Edit `app.py` and modify these variables in each route:
```python
college_name='Your College Name'
area_name='Your Area Name'
```

### Adding More Sample Data
Edit `init_db.py` and add entries to the `vehicles` or `bins` lists before running `init_db.py`.

### Customizing Colors
Edit `static/css/style.css` and modify the CSS variables at the top:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    ...
}
```

---

## 📱 Screenshots

### Dashboard
- Hero section with welcome message
- Statistics cards with animated counters
- Photo gallery with filtering tags
- Bin status sidebar

### Upload Page
- Drag & drop file zone
- Form with vehicle/bin selection
- GPS location capture
- Photo preview before upload

### Bin Management
- Table with all bins
- Quick status update dropdowns
- Color-coded status badges
- Statistics summary cards

### Map View
- Full-screen interactive map
- Custom markers for bins and photos
- Legend for marker types
- Popup information on click

---

## 🤝 Contributing

This project is developed by the **GCET Robotics Club**. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is proprietary to **Geethanjali College of Engineering and Technology**. All rights reserved.

---

## 🙏 Acknowledgments

- **Team SAMPOORN SWACHHATA** for the initiative
- **GCET Robotics Club** for development support
- **OpenStreetMap** for map tiles
- **Leaflet.js** for interactive maps
- **Bootstrap 5** for responsive framework
- **Font Awesome** for icons

---

## 📞 Support

For support or inquiries, contact:
- **Email**: robotics@gcet.edu.in
- **Location**: Geethanjali College of Engineering and Technology, ECIL Area, Hyderabad

---

<p align="center">
  <strong>🌿 Keep Our Campus Clean! 🌿</strong>
</p>
