import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock3,
  FileText,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import VoiceButton from "../components/VoiceButton";

const translations = {
  English: {
    back: "Back",
    eyebrow: "TIMELINE",
    title: "Your health journey",
    description:
      "See your uploaded reports and important activity in chronological order.",
    listenTitle: "Prefer listening?",
    listenText:
      "Listen to the timeline in your selected language.",
    uploaded: "Report uploaded",
    uploadedDesc: "Your blood test report was added.",
    analyzed: "AI analysis completed",
    analyzedDesc:
      "Report information was extracted and prepared for review.",
    confirmed: "Information confirmed",
    confirmedDesc:
      "You reviewed the extracted information and confirmed it.",
    current: "Latest activity",
  },

  Tamil: {
    back: "பின்செல்",
    eyebrow: "காலவரிசை",
    title: "உங்கள் சுகாதார பயணம்",
    description:
      "நீங்கள் பதிவேற்றிய அறிக்கைகள் மற்றும் முக்கிய செயல்பாடுகளை காலவரிசைப்படி பார்க்கலாம்.",
    listenTitle: "கேட்டு அறிய விரும்புகிறீர்களா?",
    listenText:
      "நீங்கள் தேர்வு செய்த மொழியில் காலவரிசையை கேளுங்கள்.",
    uploaded: "அறிக்கை பதிவேற்றப்பட்டது",
    uploadedDesc: "உங்கள் இரத்தப் பரிசோதனை அறிக்கை சேர்க்கப்பட்டது.",
    analyzed: "AI பகுப்பாய்வு முடிந்தது",
    analyzedDesc:
      "அறிக்கையின் தகவல்கள் எடுக்கப்பட்டு சரிபார்ப்புக்கு தயாரானது.",
    confirmed: "தகவல் உறுதிப்படுத்தப்பட்டது",
    confirmedDesc:
      "நீங்கள் எடுக்கப்பட்ட தகவல்களை சரிபார்த்து உறுதிப்படுத்தினீர்கள்.",
    current: "சமீபத்திய செயல்பாடு",
  },

  Hindi: {
    back: "वापस",
    eyebrow: "समयरेखा",
    title: "आपकी स्वास्थ्य यात्रा",
    description:
      "अपलोड की गई रिपोर्ट्स और महत्वपूर्ण गतिविधियों को क्रम के अनुसार देखें।",
    listenTitle: "सुनकर समझना चाहते हैं?",
    listenText:
      "अपनी चुनी हुई भाषा में समयरेखा सुनें।",
    uploaded: "रिपोर्ट अपलोड हुई",
    uploadedDesc: "आपकी ब्लड टेस्ट रिपोर्ट जोड़ी गई।",
    analyzed: "AI विश्लेषण पूरा हुआ",
    analyzedDesc:
      "रिपोर्ट की जानकारी निकाली गई और समीक्षा के लिए तैयार की गई।",
    confirmed: "जानकारी की पुष्टि हुई",
    confirmedDesc:
      "आपने निकाली गई जानकारी की समीक्षा करके पुष्टि की।",
    current: "नवीनतम गतिविधि",
  },

  Telugu: {
    back: "వెనుకకు",
    eyebrow: "టైమ్‌లైన్",
    title: "మీ ఆరోగ్య ప్రయాణం",
    description:
      "మీరు అప్‌లోడ్ చేసిన నివేదికలు మరియు ముఖ్యమైన కార్యకలాపాలను కాలక్రమంలో చూడండి.",
    listenTitle: "విని తెలుసుకోవాలనుకుంటున్నారా?",
    listenText:
      "మీరు ఎంచుకున్న భాషలో టైమ్‌లైన్‌ను వినండి.",
    uploaded: "నివేదిక అప్‌లోడ్ చేయబడింది",
    uploadedDesc: "మీ రక్త పరీక్ష నివేదిక జోడించబడింది.",
    analyzed: "AI విశ్లేషణ పూర్తైంది",
    analyzedDesc:
      "నివేదిక సమాచారం సేకరించి సమీక్ష కోసం సిద్ధం చేయబడింది.",
    confirmed: "సమాచారం నిర్ధారించబడింది",
    confirmedDesc:
      "మీరు తీసుకున్న సమాచారాన్ని సమీక్షించి నిర్ధారించారు.",
    current: "తాజా కార్యకలాపం",
  },

  Malayalam: {
    back: "തിരികെ",
    eyebrow: "ടൈംലൈൻ",
    title: "നിങ്ങളുടെ ആരോഗ്യ യാത്ര",
    description:
      "നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത റിപ്പോർട്ടുകളും പ്രധാന പ്രവർത്തനങ്ങളും ക്രമത്തിൽ കാണുക.",
    listenTitle: "കേട്ട് മനസ്സിലാക്കണോ?",
    listenText:
      "നിങ്ങൾ തിരഞ്ഞെടുത്ത ഭാഷയിൽ ടൈംലൈൻ കേൾക്കുക.",
    uploaded: "റിപ്പോർട്ട് അപ്‌ലോഡ് ചെയ്തു",
    uploadedDesc: "നിങ്ങളുടെ ബ്ലഡ് ടെസ്റ്റ് റിപ്പോർട്ട് ചേർത്തു.",
    analyzed: "AI വിശകലനം പൂർത്തിയായി",
    analyzedDesc:
      "റിപ്പോർട്ട് വിവരങ്ങൾ ശേഖരിച്ച് പരിശോധനയ്ക്ക് തയ്യാറാക്കി.",
    confirmed: "വിവരങ്ങൾ സ്ഥിരീകരിച്ചു",
    confirmedDesc:
      "നിങ്ങൾ ശേഖരിച്ച വിവരങ്ങൾ പരിശോധിച്ച് സ്ഥിരീകരിച്ചു.",
    current: "ഏറ്റവും പുതിയ പ്രവർത്തനം",
  },

  Kannada: {
    back: "ಹಿಂದೆ",
    eyebrow: "ಟೈಮ್‌ಲೈನ್",
    title: "ನಿಮ್ಮ ಆರೋಗ್ಯ ಪ್ರಯಾಣ",
    description:
      "ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ವರದಿಗಳು ಮತ್ತು ಪ್ರಮುಖ ಚಟುವಟಿಕೆಗಳನ್ನು ಕ್ರಮವಾಗಿ ನೋಡಿ.",
    listenTitle: "ಕೇಳಿ ತಿಳಿದುಕೊಳ್ಳಬೇಕೇ?",
    listenText:
      "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಷೆಯಲ್ಲಿ ಟೈಮ್‌ಲೈನ್ ಕೇಳಿ.",
    uploaded: "ವರದಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಲಾಗಿದೆ",
    uploadedDesc: "ನಿಮ್ಮ ರಕ್ತ ಪರೀಕ್ಷಾ ವರದಿಯನ್ನು ಸೇರಿಸಲಾಗಿದೆ.",
    analyzed: "AI ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ",
    analyzedDesc:
      "ವರದಿ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಿ ಪರಿಶೀಲನೆಗೆ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ.",
    confirmed: "ಮಾಹಿತಿ ದೃಢೀಕರಿಸಲಾಗಿದೆ",
    confirmedDesc:
      "ನೀವು ತೆಗೆದ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ ದೃಢೀಕರಿಸಿದ್ದೀರಿ.",
    current: "ಇತ್ತೀಚಿನ ಚಟುವಟಿಕೆ",
  },
};

export default function TimelinePage() {
  const navigate = useNavigate();
  const { language } = useApp();

  const text = translations[language] || translations.English;

  const events = [
    {
      date: "06 Oct 2026",
      title: text.uploaded,
      description: text.uploadedDesc,
      icon: FileText,
    },
    {
      date: "06 Oct 2026",
      title: text.analyzed,
      description: text.analyzedDesc,
      icon: Sparkles,
    },
    {
      date: "06 Oct 2026",
      title: text.confirmed,
      description: text.confirmedDesc,
      icon: CheckCircle2,
    },
  ];

  const spokenTimeline = events
    .map(
      (event) =>
        `${event.title}. ${event.description}. ${event.date}.`
    )
    .join(" ");

  return (
    <div className="app-page premium-timeline-page">
      <div className="page-container">
        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
          type="button"
        >
          <ArrowLeft size={18} />
          {text.back}
        </button>

        <div className="page-heading premium-page-heading">
          <div className="page-heading-icon">
            <Clock3 size={26} />
          </div>

          <div>
            <span className="eyebrow">{text.eyebrow}</span>

            <h1>{text.title}</h1>

            <p>{text.description}</p>
          </div>
        </div>

        <div className="card timeline-voice-card">
          <div className="timeline-voice-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <strong>{text.listenTitle}</strong>
            <p>{text.listenText}</p>
          </div>

          <VoiceButton
            text={spokenTimeline}
            language={language}
          />
        </div>

        <div className="timeline-section-label">
          <span>{text.current}</span>
        </div>

        <div className="timeline">
          {events.map((event, index) => {
            const Icon = event.icon;

            return (
              <div
                className="timeline-item"
                key={`${event.title}-${index}`}
              >
                {index < events.length - 1 && (
                  <div className="timeline-line" />
                )}

                <div className="timeline-icon">
                  <Icon size={18} />
                </div>

                <div className="timeline-content">
                  <span>{event.date}</span>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}