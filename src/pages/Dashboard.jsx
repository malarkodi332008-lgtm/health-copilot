import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronRight,
  FlaskConical,
  Pill,
  FileText,
  Sparkles,
  AlertCircle,
  Activity,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import LabResultCard from "../components/LabResultCard";
import MedicineCard from "../components/MedicineCard";
import ReportCard from "../components/ReportCard";
import VoiceButton from "../components/VoiceButton";
import { useApp } from "../context/AppContext";

const translations = {
  English: {
    eyebrow: "YOUR HEALTH SPACE",
    greeting: "Good morning",
    subtitle:
      "Here is a simple view of your latest health information.",
    aiSummary: "AI HEALTH SUMMARY",
    latestReport: "LATEST REPORT",
    heroTitle: "A clearer view of your health information.",
    summary:
      "Your recent report contains a few values that may need attention. Consider discussing the results with a qualified healthcare professional.",
    readSummary: "Read full summary",
    privacy: "Privacy-first",
    ai: "AI-assisted",
    reportFriendly: "Report-friendly",
    attention: "2 values need your attention",
    attentionText:
      "Some report values are marked for review. This is not a diagnosis.",
    reviewResults: "Review results",
    overview: "OVERVIEW",
    healthInfo: "Your health information",
    reviewFirst: "Review-first",
    medicines: "Medicines",
    medicineText: "Your uploaded prescription contains 1 medicine.",
    viewMedicines: "View medicines",
    labResults: "Lab results",
    labText: "Review values extracted from your latest report.",
    viewLabs: "View lab results",
    reports: "Reports",
    reportText: "Access your uploaded medical documents.",
    viewReports: "View reports",
    latest: "LATEST",
    seeAll: "See all",
    medications: "MEDICATIONS",
    documents: "DOCUMENTS",
    recentReports: "Recent reports",
    voice:
      "Your recent report contains a few values that may need attention. Consider discussing the results with a qualified healthcare professional.",
  },

  Tamil: {
    eyebrow: "உங்கள் சுகாதார பகுதி",
    greeting: "காலை வணக்கம்",
    subtitle:
      "உங்கள் சமீபத்திய சுகாதார தகவல்களின் எளிய பார்வை இங்கே.",
    aiSummary: "AI சுகாதார சுருக்கம்",
    latestReport: "சமீபத்திய அறிக்கை",
    heroTitle: "உங்கள் சுகாதார தகவல்களை தெளிவாகப் பாருங்கள்.",
    summary:
      "உங்கள் சமீபத்திய அறிக்கையில் சில மதிப்புகள் கவனிக்கப்பட வேண்டியதாக இருக்கலாம். முடிவுகளை தகுதியான சுகாதார நிபுணரிடம் விவாதிக்கலாம்.",
    readSummary: "முழு சுருக்கத்தைப் படிக்கவும்",
    privacy: "தனியுரிமை முதலில்",
    ai: "AI உதவியுடன்",
    reportFriendly: "அறிக்கைகளுக்கு ஏற்றது",
    attention: "2 மதிப்புகள் கவனிக்கப்பட வேண்டும்",
    attentionText:
      "சில அறிக்கை மதிப்புகள் சரிபார்ப்புக்காக குறிக்கப்பட்டுள்ளன. இது ஒரு நோயறிதல் அல்ல.",
    reviewResults: "முடிவுகளை சரிபார்க்கவும்",
    overview: "மேலோட்டம்",
    healthInfo: "உங்கள் சுகாதார தகவல்கள்",
    reviewFirst: "முதலில் சரிபார்க்கவும்",
    medicines: "மருந்துகள்",
    medicineText: "நீங்கள் பதிவேற்றிய மருந்துச் சீட்டில் 1 மருந்து உள்ளது.",
    viewMedicines: "மருந்துகளைப் பார்க்கவும்",
    labResults: "ஆய்வக முடிவுகள்",
    labText: "சமீபத்திய அறிக்கையிலிருந்து எடுக்கப்பட்ட மதிப்புகளைப் பார்க்கவும்.",
    viewLabs: "ஆய்வக முடிவுகளைப் பார்க்கவும்",
    reports: "அறிக்கைகள்",
    reportText: "நீங்கள் பதிவேற்றிய மருத்துவ ஆவணங்களை அணுகவும்.",
    viewReports: "அறிக்கைகளைப் பார்க்கவும்",
    latest: "சமீபத்தியவை",
    seeAll: "அனைத்தையும் பார்க்கவும்",
    medications: "மருந்துகள்",
    documents: "ஆவணங்கள்",
    recentReports: "சமீபத்திய அறிக்கைகள்",
    voice:
      "உங்கள் சமீபத்திய அறிக்கையில் சில மதிப்புகள் கவனிக்கப்பட வேண்டியதாக இருக்கலாம். முடிவுகளை தகுதியான சுகாதார நிபுணரிடம் விவாதிக்கலாம்.",
  },

  Hindi: {
    eyebrow: "आपका स्वास्थ्य स्थान",
    greeting: "सुप्रभात",
    subtitle:
      "यह आपकी हाल की स्वास्थ्य जानकारी का एक सरल दृश्य है।",
    aiSummary: "AI स्वास्थ्य सारांश",
    latestReport: "नवीनतम रिपोर्ट",
    heroTitle: "अपनी स्वास्थ्य जानकारी को और स्पष्ट रूप से देखें।",
    summary:
      "आपकी हाल की रिपोर्ट में कुछ मानों पर ध्यान देने की आवश्यकता हो सकती है। परिणामों पर योग्य स्वास्थ्य पेशेवर से चर्चा करें।",
    readSummary: "पूरा सारांश पढ़ें",
    privacy: "गोपनीयता पहले",
    ai: "AI सहायता",
    reportFriendly: "रिपोर्ट के लिए उपयोगी",
    attention: "2 मानों पर ध्यान देने की आवश्यकता है",
    attentionText:
      "कुछ रिपोर्ट मान समीक्षा के लिए चिह्नित हैं। यह कोई निदान नहीं है।",
    reviewResults: "परिणाम देखें",
    overview: "अवलोकन",
    healthInfo: "आपकी स्वास्थ्य जानकारी",
    reviewFirst: "पहले समीक्षा करें",
    medicines: "दवाइयाँ",
    medicineText:
      "आपके अपलोड किए गए प्रिस्क्रिप्शन में 1 दवा है।",
    viewMedicines: "दवाइयाँ देखें",
    labResults: "लैब परिणाम",
    labText:
      "आपकी नवीनतम रिपोर्ट से निकाले गए मान देखें।",
    viewLabs: "लैब परिणाम देखें",
    reports: "रिपोर्ट्स",
    reportText:
      "अपलोड किए गए चिकित्सा दस्तावेज़ देखें।",
    viewReports: "रिपोर्ट्स देखें",
    latest: "नवीनतम",
    seeAll: "सभी देखें",
    medications: "दवाइयाँ",
    documents: "दस्तावेज़",
    recentReports: "हाल की रिपोर्ट्स",
    voice:
      "आपकी हाल की रिपोर्ट में कुछ मानों पर ध्यान देने की आवश्यकता हो सकती है। परिणामों पर योग्य स्वास्थ्य पेशेवर से चर्चा करें।",
  },

  Telugu: {
    eyebrow: "మీ ఆరోగ్య స్థలం",
    greeting: "శుభోదయం",
    subtitle:
      "మీ తాజా ఆరోగ్య సమాచారానికి ఇది ఒక సులభమైన వీక్షణ.",
    aiSummary: "AI ఆరోగ్య సారాంశం",
    latestReport: "తాజా నివేదిక",
    heroTitle: "మీ ఆరోగ్య సమాచారాన్ని మరింత స్పష్టంగా చూడండి.",
    summary:
      "మీ తాజా నివేదికలో కొన్ని విలువలకు శ్రద్ధ అవసరం కావచ్చు. ఫలితాలను అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.",
    readSummary: "పూర్తి సారాంశాన్ని చదవండి",
    privacy: "గోప్యతకు ప్రాధాన్యం",
    ai: "AI సహాయం",
    reportFriendly: "నివేదికలకు అనుకూలం",
    attention: "2 విలువలకు శ్రద్ధ అవసరం",
    attentionText:
      "కొన్ని నివేదిక విలువలు సమీక్ష కోసం గుర్తించబడ్డాయి. ఇది వైద్య నిర్ధారణ కాదు.",
    reviewResults: "ఫలితాలను సమీక్షించండి",
    overview: "అవలోకనం",
    healthInfo: "మీ ఆరోగ్య సమాచారం",
    reviewFirst: "ముందుగా సమీక్షించండి",
    medicines: "మందులు",
    medicineText:
      "మీరు అప్‌లోడ్ చేసిన ప్రిస్క్రిప్షన్‌లో 1 మందు ఉంది.",
    viewMedicines: "మందులను చూడండి",
    labResults: "ల్యాబ్ ఫలితాలు",
    labText:
      "మీ తాజా నివేదిక నుండి తీసుకున్న విలువలను సమీక్షించండి.",
    viewLabs: "ల్యాబ్ ఫలితాలను చూడండి",
    reports: "రిపోర్టులు",
    reportText:
      "మీరు అప్‌లోడ్ చేసిన వైద్య పత్రాలను చూడండి.",
    viewReports: "రిపోర్టులను చూడండి",
    latest: "తాజా",
    seeAll: "అన్నీ చూడండి",
    medications: "మందులు",
    documents: "పత్రాలు",
    recentReports: "ఇటీవలి నివేదికలు",
    voice:
      "మీ తాజా నివేదికలో కొన్ని విలువలకు శ్రద్ధ అవసరం కావచ్చు. ఫలితాలను అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.",
  },

  Malayalam: {
    eyebrow: "നിങ്ങളുടെ ആരോഗ്യ ഇടം",
    greeting: "സുപ്രഭാതം",
    subtitle:
      "നിങ്ങളുടെ ഏറ്റവും പുതിയ ആരോഗ്യ വിവരങ്ങളുടെ ലളിതമായ കാഴ്ചയാണിത്.",
    aiSummary: "AI ആരോഗ്യ സംഗ്രഹം",
    latestReport: "ഏറ്റവും പുതിയ റിപ്പോർട്ട്",
    heroTitle: "നിങ്ങളുടെ ആരോഗ്യ വിവരങ്ങൾ കൂടുതൽ വ്യക്തമായി കാണുക.",
    summary:
      "നിങ്ങളുടെ ഏറ്റവും പുതിയ റിപ്പോർട്ടിലെ ചില മൂല്യങ്ങൾക്ക് ശ്രദ്ധ ആവശ്യമായേക്കാം. ഫലങ്ങൾ ഒരു യോഗ്യനായ ആരോഗ്യ വിദഗ്ധനുമായി ചർച്ച ചെയ്യുക.",
    readSummary: "പൂർണ്ണ സംഗ്രഹം വായിക്കുക",
    privacy: "സ്വകാര്യത ആദ്യം",
    ai: "AI സഹായത്തോടെ",
    reportFriendly: "റിപ്പോർട്ടുകൾക്ക് അനുയോജ്യം",
    attention: "2 മൂല്യങ്ങൾക്ക് ശ്രദ്ധ ആവശ്യമാണ്",
    attentionText:
      "ചില റിപ്പോർട്ട് മൂല്യങ്ങൾ പരിശോധനയ്ക്കായി അടയാളപ്പെടുത്തിയിട്ടുണ്ട്. ഇത് ഒരു രോഗനിർണ്ണയം അല്ല.",
    reviewResults: "ഫലങ്ങൾ പരിശോധിക്കുക",
    overview: "അവലോകനം",
    healthInfo: "നിങ്ങളുടെ ആരോഗ്യ വിവരങ്ങൾ",
    reviewFirst: "ആദ്യം പരിശോധിക്കുക",
    medicines: "മരുന്നുകൾ",
    medicineText:
      "നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത പ്രിസ്ക്രിപ്ഷനിൽ 1 മരുന്നുണ്ട്.",
    viewMedicines: "മരുന്നുകൾ കാണുക",
    labResults: "ലാബ് ഫലങ്ങൾ",
    labText:
      "ഏറ്റവും പുതിയ റിപ്പോർട്ടിൽ നിന്ന് ശേഖരിച്ച മൂല്യങ്ങൾ പരിശോധിക്കുക.",
    viewLabs: "ലാബ് ഫലങ്ങൾ കാണുക",
    reports: "റിപ്പോർട്ടുകൾ",
    reportText:
      "നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത മെഡിക്കൽ ഡോക്യുമെന്റുകൾ കാണുക.",
    viewReports: "റിപ്പോർട്ടുകൾ കാണുക",
    latest: "ഏറ്റവും പുതിയത്",
    seeAll: "എല്ലാം കാണുക",
    medications: "മരുന്നുകൾ",
    documents: "ഡോക്യുമെന്റുകൾ",
    recentReports: "സമീപകാല റിപ്പോർട്ടുകൾ",
    voice:
      "നിങ്ങളുടെ ഏറ്റവും പുതിയ റിപ്പോർട്ടിലെ ചില മൂല്യങ്ങൾക്ക് ശ്രദ്ധ ആവശ്യമായേക്കാം. ഫലങ്ങൾ ഒരു യോഗ്യനായ ആരോഗ്യ വിദഗ്ധനുമായി ചർച്ച ചെയ്യുക.",
  },

  Kannada: {
    eyebrow: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಸ್ಥಳ",
    greeting: "ಶುಭೋದಯ",
    subtitle:
      "ಇದು ನಿಮ್ಮ ಇತ್ತೀಚಿನ ಆರೋಗ್ಯ ಮಾಹಿತಿಯ ಸರಳ ನೋಟವಾಗಿದೆ.",
    aiSummary: "AI ಆರೋಗ್ಯ ಸಾರಾಂಶ",
    latestReport: "ಇತ್ತೀಚಿನ ವರದಿ",
    heroTitle: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಇನ್ನಷ್ಟು ಸ್ಪಷ್ಟವಾಗಿ ನೋಡಿ.",
    summary:
      "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ವರದಿಯಲ್ಲಿನ ಕೆಲವು ಮೌಲ್ಯಗಳಿಗೆ ಗಮನ ಅಗತ್ಯವಾಗಿರಬಹುದು. ಫಲಿತಾಂಶಗಳನ್ನು ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೊಂದಿಗೆ ಚರ್ಚಿಸಿ.",
    readSummary: "ಪೂರ್ಣ ಸಾರಾಂಶ ಓದಿ",
    privacy: "ಗೌಪ್ಯತೆ ಮೊದಲು",
    ai: "AI ಸಹಾಯ",
    reportFriendly: "ವರದಿಗಳಿಗೆ ಅನುಕೂಲ",
    attention: "2 ಮೌಲ್ಯಗಳಿಗೆ ಗಮನ ಅಗತ್ಯ",
    attentionText:
      "ಕೆಲವು ವರದಿ ಮೌಲ್ಯಗಳನ್ನು ಪರಿಶೀಲನೆಗಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ. ಇದು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವಲ್ಲ.",
    reviewResults: "ಫಲಿತಾಂಶಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
    overview: "ಅವಲೋಕನ",
    healthInfo: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿ",
    reviewFirst: "ಮೊದಲು ಪರಿಶೀಲಿಸಿ",
    medicines: "ಔಷಧಿಗಳು",
    medicineText:
      "ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ನಲ್ಲಿ 1 ಔಷಧಿಯಿದೆ.",
    viewMedicines: "ಔಷಧಿಗಳನ್ನು ನೋಡಿ",
    labResults: "ಲ್ಯಾಬ್ ಫಲಿತಾಂಶಗಳು",
    labText:
      "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ವರದಿಯಿಂದ ತೆಗೆದ ಮೌಲ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    viewLabs: "ಲ್ಯಾಬ್ ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಿ",
    reports: "ವರದಿಗಳು",
    reportText:
      "ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳನ್ನು ನೋಡಿ.",
    viewReports: "ವರದಿಗಳನ್ನು ನೋಡಿ",
    latest: "ಇತ್ತೀಚಿನ",
    seeAll: "ಎಲ್ಲವನ್ನೂ ನೋಡಿ",
    medications: "ಔಷಧಿಗಳು",
    documents: "ದಾಖಲೆಗಳು",
    recentReports: "ಇತ್ತೀಚಿನ ವರದಿಗಳು",
    voice:
      "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ವರದಿಯಲ್ಲಿನ ಕೆಲವು ಮೌಲ್ಯಗಳಿಗೆ ಗಮನ ಅಗತ್ಯವಾಗಿರಬಹುದು. ಫಲಿತಾಂಶಗಳನ್ನು ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೊಂದಿಗೆ ಚರ್ಚಿಸಿ.",
  },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { profile, language, extractedData } = useApp();

  const text = translations[language] || translations.English;
  const name = profile.name || extractedData.patientName || "there";

  const labs = [
    {
      name: "Hemoglobin",
      value: extractedData.hb,
      unit: "g/dL",
      status: "Needs Attention",
      explanation:
        "This is the hemoglobin value shown in the report. A healthcare professional can interpret it with your symptoms and other results.",
    },
    {
      name: "Glucose",
      value: extractedData.glucose,
      unit: "mg/dL",
      status: "Needs Attention",
      explanation:
        "This is the glucose value shown in the uploaded report. Interpretation can depend on when the sample was taken.",
    },
    {
      name: "Platelets",
      value: extractedData.platelets,
      unit: "/µL",
      status: "Normal",
      explanation:
        "This is the platelet count extracted from the report.",
    },
    {
      name: "WBC",
      value: extractedData.wbc,
      unit: "/µL",
      status: "Normal",
      explanation:
        "This is the white blood cell count extracted from the report.",
    },
  ];

  const medicines = [
    {
      name: "Paracetamol",
      dose: "500 mg",
      frequency: "Twice daily",
      timing: "After food",
      source: "Prescription",
    },
  ];

  const reports = [
    {
      name: "Blood Test",
      date: "06 Oct 2026",
      type: "Lab Report",
    },
    {
      name: "Prescription",
      date: "06 Oct 2026",
      type: "Prescription",
    },
  ];

  return (
    <div className="dashboard-layout premium-dashboard">
      <Navbar />

      <main className="main-content">
        <header className="topbar premium-topbar">
          <div>
            <span className="eyebrow">{text.eyebrow}</span>

            <h1>
              {text.greeting}, {name} 👋
            </h1>

            <p className="dashboard-subtitle">{text.subtitle}</p>
          </div>

          <button
            className="notification-button"
            aria-label="Notifications"
            type="button"
          >
            <Bell size={20} />
            <span className="notification-dot" />
          </button>
        </header>

        <section className="hero-summary premium-hero">
          <div className="hero-summary-content">
            <div className="hero-label">
              <span className="ai-badge">
                <Sparkles size={15} />
                {text.aiSummary}
              </span>

              <span className="hero-date">{text.latestReport}</span>
            </div>

            <h2>{text.heroTitle}</h2>

            <p>{text.summary}</p>

            <div className="hero-actions">
              <VoiceButton
                text={text.voice}
                language={language}
              />

              <button
                className="secondary-button"
                onClick={() => navigate("/summary")}
                type="button"
              >
                {text.readSummary}
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          <div className="hero-health-visual">
            <div className="hero-orbit" />

            <div className="hero-health-icon">
              <Activity size={34} />
            </div>

            <span className="hero-health-label">HEALTH</span>
          </div>
        </section>

        <section className="attention-card premium-attention">
          <div className="attention-icon">
            <AlertCircle size={22} />
          </div>

          <div className="attention-content">
            <strong>{text.attention}</strong>
            <p>{text.attentionText}</p>
          </div>

          <button
            className="text-button"
            onClick={() => navigate("/labs")}
            type="button"
          >
            {text.reviewResults}
            <ChevronRight size={17} />
          </button>
        </section>

        <div className="section-heading dashboard-section-title">
          <div>
            <span className="eyebrow">{text.overview}</span>
            <h2>{text.healthInfo}</h2>
          </div>

          <div className="dashboard-trust">
            <ShieldCheck size={15} />
            {text.reviewFirst}
          </div>
        </div>

        <div className="dashboard-grid premium-dashboard-grid">
          <SummaryCard
            onClick={() => navigate("/summary")}
          />

          <div className="card quick-card premium-quick-card">
            <div className="card-top">
              <div className="icon-box green">
                <Pill size={22} />
              </div>

              <span className="count-badge">1</span>
            </div>

            <h3>{text.medicines}</h3>

            <p>{text.medicineText}</p>

            <button
              className="text-button"
              onClick={() => navigate("/medicines")}
              type="button"
            >
              {text.viewMedicines}
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="card quick-card premium-quick-card">
            <div className="card-top">
              <div className="icon-box purple">
                <FlaskConical size={22} />
              </div>

              <span className="count-badge">4</span>
            </div>

            <h3>{text.labResults}</h3>

            <p>{text.labText}</p>

            <button
              className="text-button"
              onClick={() => navigate("/labs")}
              type="button"
            >
              {text.viewLabs}
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="card quick-card premium-quick-card">
            <div className="card-top">
              <div className="icon-box orange">
                <FileText size={22} />
              </div>

              <span className="count-badge">3</span>
            </div>

            <h3>{text.reports}</h3>

            <p>{text.reportText}</p>

            <button
              className="text-button"
              onClick={() => navigate("/reports")}
              type="button"
            >
              {text.viewReports}
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{text.latest}</span>
              <h2>{text.labResults}</h2>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/labs")}
              type="button"
            >
              {text.seeAll}
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="result-list">
            {labs.slice(0, 2).map((lab) => (
              <LabResultCard key={lab.name} {...lab} />
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{text.medications}</span>
              <h2>{text.medicines}</h2>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/medicines")}
              type="button"
            >
              {text.seeAll}
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="result-list">
            {medicines.map((medicine) => (
              <MedicineCard
                key={medicine.name}
                {...medicine}
              />
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{text.documents}</span>
              <h2>{text.recentReports}</h2>
            </div>

            <button
              className="text-button"
              onClick={() => navigate("/reports")}
              type="button"
            >
              {text.seeAll}
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="result-list">
            {reports.map((report) => (
              <ReportCard
                key={report.name}
                {...report}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}