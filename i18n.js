/* ============================================
   Sampoorn Swachhata - Language Toggle (i18n)
   English / Telugu / Hindi
   Client-side only: translates elements tagged
   with data-i18n / data-i18n-placeholder.
   Selection persists across pages via localStorage.
   ============================================ */

const SS_TRANSLATIONS = {
  en: {
    "nav.dashboard": "Dashboard",
    "nav.map": "Map",
    "nav.upload": "Upload Photo",
    "nav.bins": "Bins",
    "nav.analytics": "Analytics",
    "brand.subtitle": "A SUSTAINABLE DEVELOPMENT GOAL INITIATIVE",
    "footer.developedBy": "Developed by",
    "footer.role": "Student Developer",
    "footer.teammates": "Team Mates",
    "footer.coRole": "Co-Student Developers",
    "footer.rights": "All rights reserved.",
    "lang.label": "Language",

    "hero.welcome": "Welcome to Sampoorn Swachhata",
    "hero.subtitle": "Complete Cleanliness Management System for SUSTAINABLE and SMARTER COMMUNITIES.",
    "stat.plantsWatered": "Plants Watered Today",
    "stat.totalPhotos": "Total Photos Uploaded",
    "stat.activeBins": "Active Bins",
    "stat.binsEmpty": "Bins Empty",
    "stat.wasteToday": "Waste Collected Today (kg)",
    "stat.areaCovered": "Area Covered Today",
    "card.binStatus": "Bin Status",
    "btn.viewAll": "View All",
    "card.about": "About",
    "about.text": "Sampoorn Swachhata is a comprehensive clean and green management initiative for SUSTAINABLE AND SMART CITIES.",
    "card.recentPhotos": "Recent Cleaning Photos",
    "btn.uploadNew": "Upload New",
    "empty.noPhotosTitle": "No Photos Yet",
    "empty.noPhotosText": "Start by uploading your first cleaning photo!",
    "btn.uploadPhoto": "Upload Photo",
    "tag.plantsWatered": "Plants Watered",
    "tag.gpsTagged": "GPS Tagged",
    "label.unknownVehicle": "Unknown Vehicle",
    "label.noCaption": "No caption provided",
    "card.analyticsPreview": "Waste & Coverage Analytics",
    "btn.viewAnalytics": "View Full Analytics",

    "page.binManagement": "Bin Management",
    "page.binManagementSub": "Monitor and update bin status, waste quantity and segregation across all locations",
    "stat.emptyBins": "Empty Bins",
    "stat.halfFull": "Half Full",
    "stat.fullBins": "Full Bins",
    "stat.totalBins": "Total Bins",
    "card.allBins": "All Bins",
    "btn.viewOnMap": "View on Map",
    "th.location": "Location",
    "th.status": "Status",
    "th.fillLevel": "Fill Level (kg)",
    "th.wasteType": "Waste Type",
    "th.lastUpdate": "Last Update",
    "th.action": "Action",
    "btn.update": "Update",
    "legend.title": "Status Legend",
    "legend.empty": "Bin is empty and ready for use",
    "legend.half": "Bin is partially filled",
    "legend.full": "Bin needs immediate emptying",
    "waste.dry": "Dry",
    "waste.wet": "Wet",
    "waste.ewaste": "E-Waste",
    "waste.mixed": "Mixed",

    "page.liveMap": "Live Location Map",
    "page.liveMapSub": "Real-time tracking of bins, vehicles, and cleaning activities",
    "legend.emptyBin": "Empty Bin",
    "legend.halfBin": "Half Full Bin",
    "legend.fullBin": "Full Bin",
    "legend.photoLocation": "Photo Location",
    "stat.activeVehicles": "Active Vehicles",
    "stat.binLocations": "Bin Locations",
    "stat.photoUploads": "Photo Uploads",
    "card.vehicleLoad": "Vehicle Waste Load",

    "page.uploadTitle": "Upload Cleaning Proof",
    "page.uploadSub": "Capture and share your cleaning activities with GPS location",
    "label.selectVehicle": "Select Vehicle",
    "label.nearbyBin": "Nearby Bin",
    "label.caption": "Caption",
    "placeholder.caption": "e.g., 'Cleaned near main gate'",
    "label.photo": "Photo",
    "upload.dragDrop": "Click to upload or drag and drop",
    "upload.sizeLimit": "PNG, JPG, JPEG up to 10MB",
    "label.plantsWateredCheck": "Plants were watered in this area",
    "btn.useLocation": "Use Current Location",
    "label.optional": "(optional)",

    "page.analytics": "Waste & Cleanliness Analytics",
    "page.analyticsSub": "Track daily collection, segregation, area coverage, and vehicle/bin load in real time",
    "stat.totalCollected": "Total Waste Collected (kg)",
    "stat.dryWaste": "Dry Waste (kg)",
    "stat.wetWaste": "Wet Waste (kg)",
    "stat.ewaste": "E-Waste (kg)",
    "stat.avgCoverage": "Area Covered Today",
    "stat.avgBinFill": "Average Bin Fill",
    "card.dailyTrend": "Waste Collected Per Day (kg)",
    "card.segregation": "Waste Segregation Breakdown",
    "card.coverage": "Area Coverage Trend",
    "card.binLevels": "Bin Fill Status (kg)",
    "card.vehicleLoads": "Vehicle Waste Load"
  },

  te: {
    "nav.dashboard": "డాష్‌బోర్డ్",
    "nav.map": "మ్యాప్",
    "nav.upload": "ఫోటో అప్‌లోడ్",
    "nav.bins": "బిన్‌లు",
    "nav.analytics": "విశ్లేషణలు",
    "brand.subtitle": "ఒక సుస్థిర అభివృద్ధి లక్ష్యం చొరవ",
    "footer.developedBy": "అభివృద్ధి చేసినవారు",
    "footer.role": "స్టూడెంట్ డెవలపర్",
    "footer.teammates": "టీమ్ మేట్స్",
    "footer.coRole": "కో-స్టూడెంట్ డెవలపర్స్",
    "footer.rights": "అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.",
    "lang.label": "భాష",

    "hero.welcome": "సంపూర్ణ స్వచ్ఛతకు స్వాగతం",
    "hero.subtitle": "సుస్థిర మరియు స్మార్ట్ సమాజాల కోసం సంపూర్ణ పరిశుభ్రత నిర్వహణ వ్యవస్థ.",
    "stat.plantsWatered": "ఈరోజు నీరు పోసిన మొక్కలు",
    "stat.totalPhotos": "మొత్తం అప్‌లోడ్ చేసిన ఫోటోలు",
    "stat.activeBins": "యాక్టివ్ బిన్‌లు",
    "stat.binsEmpty": "ఖాళీ బిన్‌లు",
    "stat.wasteToday": "ఈరోజు సేకరించిన వ్యర్థాలు (కేజీ)",
    "stat.areaCovered": "ఈరోజు కవర్ చేసిన ప్రాంతం",
    "card.binStatus": "బిన్ స్థితి",
    "btn.viewAll": "అన్నీ చూడండి",
    "card.about": "గురించి",
    "about.text": "సంపూర్ణ స్వచ్ఛత అనేది సుస్థిర మరియు స్మార్ట్ నగరాల కోసం ఒక సమగ్ర పరిశుభ్రత మరియు హరిత నిర్వహణ చొరవ.",
    "card.recentPhotos": "ఇటీవలి క్లీనింగ్ ఫోటోలు",
    "btn.uploadNew": "కొత్తది అప్‌లోడ్ చేయండి",
    "empty.noPhotosTitle": "ఇంకా ఫోటోలు లేవు",
    "empty.noPhotosText": "మీ మొదటి క్లీనింగ్ ఫోటోను అప్‌లోడ్ చేయడం ద్వారా ప్రారంభించండి!",
    "btn.uploadPhoto": "ఫోటో అప్‌లోడ్ చేయండి",
    "tag.plantsWatered": "మొక్కలకు నీరు పోశారు",
    "tag.gpsTagged": "GPS ట్యాగ్ చేయబడింది",
    "label.unknownVehicle": "తెలియని వాహనం",
    "label.noCaption": "క్యాప్షన్ లేదు",
    "card.analyticsPreview": "వ్యర్థాలు & కవరేజ్ విశ్లేషణలు",
    "btn.viewAnalytics": "పూర్తి విశ్లేషణలు చూడండి",

    "page.binManagement": "బిన్ నిర్వహణ",
    "page.binManagementSub": "అన్ని ప్రాంతాలలో బిన్ స్థితి, వ్యర్థాల పరిమాణం మరియు విభజనను పర్యవేక్షించండి",
    "stat.emptyBins": "ఖాళీ బిన్‌లు",
    "stat.halfFull": "సగం నిండినవి",
    "stat.fullBins": "నిండిన బిన్‌లు",
    "stat.totalBins": "మొత్తం బిన్‌లు",
    "card.allBins": "అన్ని బిన్‌లు",
    "btn.viewOnMap": "మ్యాప్‌లో చూడండి",
    "th.location": "ప్రదేశం",
    "th.status": "స్థితి",
    "th.fillLevel": "నింపిన స్థాయి (కేజీ)",
    "th.wasteType": "వ్యర్థాల రకం",
    "th.lastUpdate": "చివరి నవీకరణ",
    "th.action": "చర్య",
    "btn.update": "నవీకరించు",
    "legend.title": "స్థితి వివరణ",
    "legend.empty": "బిన్ ఖాళీగా ఉంది, వాడకానికి సిద్ధంగా ఉంది",
    "legend.half": "బిన్ పాక్షికంగా నిండి ఉంది",
    "legend.full": "బిన్‌ను వెంటనే ఖాళీ చేయాలి",
    "waste.dry": "పొడి వ్యర్థం",
    "waste.wet": "తడి వ్యర్థం",
    "waste.ewaste": "ఈ-వ్యర్థం",
    "waste.mixed": "మిశ్రమం",

    "page.liveMap": "ప్రత్యక్ష లొకేషన్ మ్యాప్",
    "page.liveMapSub": "బిన్‌లు, వాహనాలు మరియు క్లీనింగ్ కార్యకలాపాల ప్రత్యక్ష ట్రాకింగ్",
    "legend.emptyBin": "ఖాళీ బిన్",
    "legend.halfBin": "సగం నిండిన బిన్",
    "legend.fullBin": "నిండిన బిన్",
    "legend.photoLocation": "ఫోటో ప్రదేశం",
    "stat.activeVehicles": "యాక్టివ్ వాహనాలు",
    "stat.binLocations": "బిన్ ప్రదేశాలు",
    "stat.photoUploads": "ఫోటో అప్‌లోడ్‌లు",
    "card.vehicleLoad": "వాహనం వ్యర్థాల లోడ్",

    "page.uploadTitle": "క్లీనింగ్ రుజువు అప్‌లోడ్ చేయండి",
    "page.uploadSub": "GPS లొకేషన్‌తో మీ క్లీనింగ్ కార్యకలాపాలను క్యాప్చర్ చేసి పంచుకోండి",
    "label.selectVehicle": "వాహనాన్ని ఎంచుకోండి",
    "label.nearbyBin": "సమీప బిన్",
    "label.caption": "క్యాప్షన్",
    "placeholder.caption": "ఉదా., 'మెయిన్ గేట్ దగ్గర శుభ్రం చేశాము'",
    "label.photo": "ఫోటో",
    "upload.dragDrop": "అప్‌లోడ్ చేయడానికి క్లిక్ చేయండి లేదా డ్రాగ్ చేసి డ్రాప్ చేయండి",
    "upload.sizeLimit": "PNG, JPG, JPEG 10MB వరకు",
    "label.plantsWateredCheck": "ఈ ప్రాంతంలో మొక్కలకు నీరు పోశారు",
    "btn.useLocation": "ప్రస్తుత లొకేషన్ ఉపయోగించండి",
    "label.optional": "(ఐచ్ఛికం)",

    "page.analytics": "వ్యర్థాలు & పరిశుభ్రత విశ్లేషణలు",
    "page.analyticsSub": "రోజువారీ సేకరణ, విభజన, ప్రాంత కవరేజ్, వాహనం/బిన్ లోడ్‌ను ప్రత్యక్షంగా ట్రాక్ చేయండి",
    "stat.totalCollected": "మొత్తం సేకరించిన వ్యర్థాలు (కేజీ)",
    "stat.dryWaste": "పొడి వ్యర్థం (కేజీ)",
    "stat.wetWaste": "తడి వ్యర్థం (కేజీ)",
    "stat.ewaste": "ఈ-వ్యర్థం (కేజీ)",
    "stat.avgCoverage": "ఈరోజు కవర్ చేసిన ప్రాంతం",
    "stat.avgBinFill": "సగటు బిన్ నింపుదల",
    "card.dailyTrend": "రోజుకు సేకరించిన వ్యర్థాలు (కేజీ)",
    "card.segregation": "వ్యర్థాల విభజన వివరణ",
    "card.coverage": "ప్రాంత కవరేజ్ ధోరణి",
    "card.binLevels": "బిన్ నింపుదల స్థితి (కేజీ)",
    "card.vehicleLoads": "వాహనం వ్యర్థాల లోడ్"
  },

  hi: {
    "nav.dashboard": "डैशबोर्ड",
    "nav.map": "मानचित्र",
    "nav.upload": "फोटो अपलोड करें",
    "nav.bins": "बिन्स",
    "nav.analytics": "विश्लेषण",
    "brand.subtitle": "एक सतत विकास लक्ष्य पहल",
    "footer.developedBy": "द्वारा विकसित",
    "footer.role": "स्टूडेंट डेवलपर",
    "footer.teammates": "टीम मेट्स",
    "footer.coRole": "सह-छात्र डेवलपर्स",
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "lang.label": "भाषा",

    "hero.welcome": "संपूर्ण स्वच्छता में आपका स्वागत है",
    "hero.subtitle": "टिकाऊ और स्मार्ट समुदायों के लिए संपूर्ण स्वच्छता प्रबंधन प्रणाली।",
    "stat.plantsWatered": "आज सींचे गए पौधे",
    "stat.totalPhotos": "कुल अपलोड की गई फ़ोटो",
    "stat.activeBins": "सक्रिय बिन्स",
    "stat.binsEmpty": "खाली बिन्स",
    "stat.wasteToday": "आज एकत्रित कचरा (किग्रा)",
    "stat.areaCovered": "आज कवर किया गया क्षेत्र",
    "card.binStatus": "बिन की स्थिति",
    "btn.viewAll": "सभी देखें",
    "card.about": "परिचय",
    "about.text": "संपूर्ण स्वच्छता टिकाऊ और स्मार्ट शहरों के लिए एक व्यापक स्वच्छता और हरित प्रबंधन पहल है।",
    "card.recentPhotos": "हाल की सफाई फ़ोटो",
    "btn.uploadNew": "नई अपलोड करें",
    "empty.noPhotosTitle": "अभी तक कोई फ़ोटो नहीं",
    "empty.noPhotosText": "अपनी पहली सफाई फ़ोटो अपलोड करके शुरू करें!",
    "btn.uploadPhoto": "फोटो अपलोड करें",
    "tag.plantsWatered": "पौधों को सींचा गया",
    "tag.gpsTagged": "GPS टैग किया गया",
    "label.unknownVehicle": "अज्ञात वाहन",
    "label.noCaption": "कोई कैप्शन नहीं दिया गया",
    "card.analyticsPreview": "कचरा और कवरेज विश्लेषण",
    "btn.viewAnalytics": "पूरा विश्लेषण देखें",

    "page.binManagement": "बिन प्रबंधन",
    "page.binManagementSub": "सभी स्थानों पर बिन की स्थिति, कचरे की मात्रा और पृथक्करण की निगरानी करें",
    "stat.emptyBins": "खाली बिन्स",
    "stat.halfFull": "आधे भरे",
    "stat.fullBins": "पूरी तरह भरे बिन्स",
    "stat.totalBins": "कुल बिन्स",
    "card.allBins": "सभी बिन्स",
    "btn.viewOnMap": "मानचित्र पर देखें",
    "th.location": "स्थान",
    "th.status": "स्थिति",
    "th.fillLevel": "भराव स्तर (किग्रा)",
    "th.wasteType": "कचरे का प्रकार",
    "th.lastUpdate": "अंतिम अपडेट",
    "th.action": "कार्रवाई",
    "btn.update": "अपडेट करें",
    "legend.title": "स्थिति सूचक",
    "legend.empty": "बिन खाली है और उपयोग के लिए तैयार है",
    "legend.half": "बिन आंशिक रूप से भरा है",
    "legend.full": "बिन को तुरंत खाली करने की आवश्यकता है",
    "waste.dry": "सूखा कचरा",
    "waste.wet": "गीला कचरा",
    "waste.ewaste": "ई-कचरा",
    "waste.mixed": "मिश्रित",

    "page.liveMap": "लाइव लोकेशन मानचित्र",
    "page.liveMapSub": "बिन्स, वाहनों और सफाई गतिविधियों की वास्तविक समय ट्रैकिंग",
    "legend.emptyBin": "खाली बिन",
    "legend.halfBin": "आधा भरा बिन",
    "legend.fullBin": "पूरा भरा बिन",
    "legend.photoLocation": "फोटो स्थान",
    "stat.activeVehicles": "सक्रिय वाहन",
    "stat.binLocations": "बिन स्थान",
    "stat.photoUploads": "फोटो अपलोड",
    "card.vehicleLoad": "वाहन कचरा भार",

    "page.uploadTitle": "सफाई प्रमाण अपलोड करें",
    "page.uploadSub": "GPS लोकेशन के साथ अपनी सफाई गतिविधियों को कैप्चर और साझा करें",
    "label.selectVehicle": "वाहन चुनें",
    "label.nearbyBin": "निकटतम बिन",
    "label.caption": "कैप्शन",
    "placeholder.caption": "उदा., 'मुख्य गेट के पास सफाई की'",
    "label.photo": "फोटो",
    "upload.dragDrop": "अपलोड करने के लिए क्लिक करें या खींचकर छोड़ें",
    "upload.sizeLimit": "PNG, JPG, JPEG अधिकतम 10MB",
    "label.plantsWateredCheck": "इस क्षेत्र में पौधों को सींचा गया",
    "btn.useLocation": "वर्तमान स्थान का उपयोग करें",
    "label.optional": "(वैकल्पिक)",

    "page.analytics": "कचरा और स्वच्छता विश्लेषण",
    "page.analyticsSub": "दैनिक संग्रह, पृथक्करण, क्षेत्र कवरेज और वाहन/बिन भार को वास्तविक समय में ट्रैक करें",
    "stat.totalCollected": "कुल एकत्रित कचरा (किग्रा)",
    "stat.dryWaste": "सूखा कचरा (किग्रा)",
    "stat.wetWaste": "गीला कचरा (किग्रा)",
    "stat.ewaste": "ई-कचरा (किग्रा)",
    "stat.avgCoverage": "आज कवर किया गया क्षेत्र",
    "stat.avgBinFill": "औसत बिन भराव",
    "card.dailyTrend": "प्रतिदिन एकत्रित कचरा (किग्रा)",
    "card.segregation": "कचरा पृथक्करण विवरण",
    "card.coverage": "क्षेत्र कवरेज प्रवृत्ति",
    "card.binLevels": "बिन भराव स्थिति (किग्रा)",
    "card.vehicleLoads": "वाहन कचरा भार"
  }
};

(function () {
  const STORAGE_KEY = 'ss_lang';

  function currentLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function applyLanguage(lang) {
    const dict = SS_TRANSLATIONS[lang] || SS_TRANSLATIONS.en;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    document.documentElement.setAttribute('lang', lang);
    localStorage.setItem(STORAGE_KEY, lang);

    document.querySelectorAll('.lang-select').forEach(function (sel) {
      sel.value = lang;
    });
  }

  function initLanguageSwitcher() {
    document.querySelectorAll('.lang-select').forEach(function (sel) {
      sel.addEventListener('change', function () {
        applyLanguage(this.value);
      });
    });
    applyLanguage(currentLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
  } else {
    initLanguageSwitcher();
  }

  // Expose for use by page-specific scripts (e.g. chart labels on /analytics)
  window.SSI18N = { applyLanguage: applyLanguage, currentLang: currentLang, dict: SS_TRANSLATIONS };
})();
