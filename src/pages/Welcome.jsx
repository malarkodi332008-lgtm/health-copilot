import { useNavigate } from "react-router-dom";
import {
  HeartPulse,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  FileText,
  BrainCircuit,
} from "lucide-react";
import VoiceButton from "../components/VoiceButton";
import { useApp } from "../context/AppContext";

const translations = {
  English: {
    brandSubtitle: "Your personal health companion",
    badge: "YOUR AI HEALTH COMPANION",
    greeting: (name) =>
      `Hello ${name}, welcome to your AI Health Copilot.`,
    description:
      "Understand your medical reports in simple language, listen to explanations, and keep your health information organized.",
    getStarted: "Get started",
    privacy: "Privacy-first",
    aiAssisted: "AI-assisted",
    reportFriendly: "Report-friendly",
    summary: "AI Summary",
    simpleExplanation: "Simple explanation",
    reports: "Medical Reports",
    organizedSecurely: "Organized securely",
    reviewFirst: "Review first",
    stayInControl: "You stay in control",
    important: "Important:",
    disclaimer:
      "This prototype provides educational information and does not diagnose medical conditions.",
  },

  Tamil: {
    brandSubtitle: "உங்கள் தனிப்பட்ட சுகாதார துணை",
    badge: "உங்கள் AI சுகாதார துணை",
    greeting: (name) =>
      `வணக்கம் ${name}, உங்கள் AI Health Copilot-க்கு வரவேற்கிறோம்.`,
    description:
      "உங்கள் மருத்துவ அறிக்கைகளை எளிய மொழியில் புரிந்துகொள்ளுங்கள், விளக்கங்களை கேளுங்கள், மேலும் உங்கள் சுகாதார தகவல்களை ஒழுங்காக வைத்திருக்கலாம்.",
    getStarted: "தொடங்குங்கள்",
    privacy: "தனியுரிமை முதலில்",
    aiAssisted: "AI உதவியுடன்",
    reportFriendly: "அறிக்கைகளுக்கு ஏற்றது",
    summary: "AI சுருக்கம்",
    simpleExplanation: "எளிய விளக்கம்",
    reports: "மருத்துவ அறிக்கைகள்",
    organizedSecurely: "பாதுகாப்பாக ஒழுங்குபடுத்தப்பட்டது",
    reviewFirst: "முதலில் சரிபார்க்கவும்",
    stayInControl: "கட்டுப்பாடு உங்களிடமே",
    important: "முக்கியம்:",
    disclaimer:
      "இந்த prototype கல்வி சார்ந்த தகவலை மட்டுமே வழங்குகிறது; மருத்துவ நோயறிதலை வழங்காது.",
  },

  Hindi: {
    brandSubtitle: "आपका व्यक्तिगत स्वास्थ्य सहायक",
    badge: "आपका AI स्वास्थ्य सहायक",
    greeting: (name) =>
      `नमस्ते ${name}, आपके AI Health Copilot में आपका स्वागत है।`,
    description:
      "अपनी चिकित्सा रिपोर्ट को सरल भाषा में समझें, विवरण सुनें और अपनी स्वास्थ्य जानकारी को व्यवस्थित रखें।",
    getStarted: "शुरू करें",
    privacy: "गोपनीयता पहले",
    aiAssisted: "AI सहायता",
    reportFriendly: "रिपोर्ट के लिए उपयोगी",
    summary: "AI सारांश",
    simpleExplanation: "सरल विवरण",
    reports: "चिकित्सा रिपोर्ट",
    organizedSecurely: "सुरक्षित रूप से व्यवस्थित",
    reviewFirst: "पहले समीक्षा करें",
    stayInControl: "नियंत्रण आपके हाथ में",
    important: "महत्वपूर्ण:",
    disclaimer:
      "यह प्रोटोटाइप केवल शैक्षिक जानकारी प्रदान करता है और चिकित्सा निदान नहीं करता है।",
  },

  Telugu: {
    brandSubtitle: "మీ వ్యక్తిగత ఆరోగ్య సహాయకుడు",
    badge: "మీ AI ఆరోగ్య సహాయకుడు",
    greeting: (name) =>
      `నమస్కారం ${name}, మీ AI Health Copilot కి స్వాగతం.`,
    description:
      "మీ వైద్య నివేదికలను సులభమైన భాషలో అర్థం చేసుకోండి, వివరణలను వినండి మరియు మీ ఆరోగ్య సమాచారాన్ని క్రమబద్ధంగా ఉంచుకోండి.",
    getStarted: "ప్రారంభించండి",
    privacy: "గోప్యతకు ప్రాధాన్యం",
    aiAssisted: "AI సహాయం",
    reportFriendly: "నివేదికలకు అనుకూలం",
    summary: "AI సారాంశం",
    simpleExplanation: "సులభమైన వివరణ",
    reports: "వైద్య నివేదికలు",
    organizedSecurely: "సురక్షితంగా క్రమబద్ధీకరించబడింది",
    reviewFirst: "ముందుగా సమీక్షించండి",
    stayInControl: "నియంత్రణ మీ చేతుల్లో ఉంది",
    important: "ముఖ్యమైనది:",
    disclaimer:
      "ఈ ప్రోటోటైప్ విద్యా సమాచారాన్ని మాత్రమే అందిస్తుంది మరియు వైద్య నిర్ధారణ చేయదు.",
  },

  Malayalam: {
    brandSubtitle: "നിങ്ങളുടെ വ്യക്തിഗത ആരോഗ്യ സഹായി",
    badge: "നിങ്ങളുടെ AI ആരോഗ്യ സഹായി",
    greeting: (name) =>
      `നമസ്കാരം ${name}, നിങ്ങളുടെ AI Health Copilot-ലേക്ക് സ്വാഗതം.`,
    description:
      "നിങ്ങളുടെ മെഡിക്കൽ റിപ്പോർട്ടുകൾ ലളിതമായ ഭാഷയിൽ മനസ്സിലാക്കുക, വിശദീകരണങ്ങൾ കേൾക്കുക, നിങ്ങളുടെ ആരോഗ്യ വിവരങ്ങൾ ക്രമീകരിച്ച് സൂക്ഷിക്കുക.",
    getStarted: "ആരംഭിക്കുക",
    privacy: "സ്വകാര്യത ആദ്യം",
    aiAssisted: "AI സഹായത്തോടെ",
    reportFriendly: "റിപ്പോർട്ടുകൾക്കായി അനുയോജ്യം",
    summary: "AI സംഗ്രഹം",
    simpleExplanation: "ലളിതമായ വിശദീകരണം",
    reports: "മെഡിക്കൽ റിപ്പോർട്ടുകൾ",
    organizedSecurely: "സുരക്ഷിതമായി ക്രമീകരിച്ചത്",
    reviewFirst: "ആദ്യം പരിശോധിക്കുക",
    stayInControl: "നിയന്ത്രണം നിങ്ങളുടേതാണ്",
    important: "പ്രധാനപ്പെട്ടത്:",
    disclaimer:
      "ഈ പ്രോട്ടോടൈപ്പ് വിദ്യാഭ്യാസ വിവരങ്ങൾ മാത്രം നൽകുന്നു; മെഡിക്കൽ രോഗനിർണ്ണയം നൽകുന്നില്ല.",
  },

  Kannada: {
    brandSubtitle: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಸಹಾಯಕ",
    badge: "ನಿಮ್ಮ AI ಆರೋಗ್ಯ ಸಹಾಯಕ",
    greeting: (name) =>
      `ನಮಸ್ಕಾರ ${name}, ನಿಮ್ಮ AI Health Copilot ಗೆ ಸ್ವಾಗತ.`,
    description:
      "ನಿಮ್ಮ ವೈದ್ಯಕೀಯ ವರದಿಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ, ವಿವರಣೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ನಿಮ್ಮ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಕ್ರಮಬದ್ಧವಾಗಿ ಇರಿಸಿ.",
    getStarted: "ಪ್ರಾರಂಭಿಸಿ",
    privacy: "ಗೌಪ್ಯತೆ ಮೊದಲು",
    aiAssisted: "AI ಸಹಾಯ",
    reportFriendly: "ವರದಿಗಳಿಗೆ ಅನುಕೂಲ",
    summary: "AI ಸಾರಾಂಶ",
    simpleExplanation: "ಸರಳ ವಿವರಣೆ",
    reports: "ವೈದ್ಯಕೀಯ ವರದಿಗಳು",
    organizedSecurely: "ಸುರಕ್ಷಿತವಾಗಿ ವ್ಯವಸ್ಥೆಗೊಳಿಸಲಾಗಿದೆ",
    reviewFirst: "ಮೊದಲು ಪರಿಶೀಲಿಸಿ",
    stayInControl: "ನಿಯಂತ್ರಣ ನಿಮ್ಮ ಕೈಯಲ್ಲಿದೆ",
    important: "ಪ್ರಮುಖ:",
    disclaimer:
      "ಈ ಪ್ರೋಟೋಟೈಪ್ ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ನೀಡುತ್ತದೆ ಮತ್ತು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವನ್ನು ನೀಡುವುದಿಲ್ಲ.",
  },
};

export default function Welcome() {
  const navigate = useNavigate();
  const { profile, language } = useApp();

  const text = translations[language] || translations.English;
  const name = profile.name || "there";
  const greeting = text.greeting(name);

  return (
    <div className="welcome-page premium-welcome">
      <div className="welcome-glow glow-one" />
      <div className="welcome-glow glow-two" />

      <div className="welcome-container">
        <div className="welcome-top-brand">
          <div className="premium-brand-icon">
            <HeartPulse size={24} />
          </div>

          <div>
            <strong>Health Copilot</strong>
            <span>{text.brandSubtitle}</span>
          </div>
        </div>

        <div className="welcome-main">
          <div className="welcome-content">
            <div className="intro-badge">
              <Sparkles size={14} />
              {text.badge}
            </div>

            <h1>{greeting}</h1>

            <p className="welcome-description">
              {text.description}
            </p>

            <div className="welcome-actions">
              <VoiceButton
                text={greeting}
                language={language}
              />

              <button
                className="primary-button premium-submit"
                onClick={() => navigate("/upload")}
                type="button"
              >
                {text.getStarted}
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="welcome-trust">
              <span>
                <ShieldCheck size={15} />
                {text.privacy}
              </span>

              <span>
                <BrainCircuit size={15} />
                {text.aiAssisted}
              </span>

              <span>
                <FileText size={15} />
                {text.reportFriendly}
              </span>
            </div>
          </div>

          <div className="health-visual">
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />

            <div className="health-core">
              <HeartPulse size={58} />
              <span>HEALTH</span>
              <strong>COPILOT</strong>
            </div>

            <div className="floating-card floating-card-one">
              <Sparkles size={18} />

              <div>
                <strong>{text.summary}</strong>
                <span>{text.simpleExplanation}</span>
              </div>
            </div>

            <div className="floating-card floating-card-two">
              <FileText size={18} />

              <div>
                <strong>{text.reports}</strong>
                <span>{text.organizedSecurely}</span>
              </div>
            </div>

            <div className="floating-card floating-card-three">
              <ShieldCheck size={18} />

              <div>
                <strong>{text.reviewFirst}</strong>
                <span>{text.stayInControl}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="welcome-note">
          <strong>{text.important}</strong> {text.disclaimer}
        </div>
      </div>
    </div>
  );
}