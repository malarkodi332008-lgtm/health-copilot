import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  CheckCircle2,
  FileSearch,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const translations = {
  English: {
    step: "STEP 2 OF 4 • AI PROCESSING",
    title: "Understanding your report",
    description:
      "Health Copilot is reading the uploaded document and preparing important information for your review.",
    processing: "Processing report",
    ai: "AI",
    reading: "Reading document",
    readingDesc: "Document structure detected",
    extracting: "Extracting health information",
    extractingDesc: "Finding relevant report values",
    preparing: "Preparing your review",
    preparingDesc: "Almost ready",
    security:
      "You will review and confirm the extracted information before continuing.",
    note: "AI-assisted extraction • Demo mode",
  },

  Tamil: {
    step: "படி 2 / 4 • AI செயலாக்கம்",
    title: "உங்கள் அறிக்கையை புரிந்துகொள்கிறோம்",
    description:
      "Health Copilot உங்கள் ஆவணத்தைப் படித்து, நீங்கள் சரிபார்க்க வேண்டிய முக்கியமான தகவல்களைத் தயாரிக்கிறது.",
    processing: "அறிக்கை செயலாக்கப்படுகிறது",
    ai: "AI",
    reading: "ஆவணம் படிக்கப்படுகிறது",
    readingDesc: "ஆவண அமைப்பு கண்டறியப்பட்டது",
    extracting: "சுகாதார தகவல்கள் எடுக்கப்படுகின்றன",
    extractingDesc: "தேவையான அறிக்கை மதிப்புகள் கண்டறியப்படுகின்றன",
    preparing: "உங்கள் சரிபார்ப்புக்கு தயாராகிறது",
    preparingDesc: "கிட்டத்தட்ட தயார்",
    security:
      "தொடர்வதற்கு முன் எடுக்கப்பட்ட தகவல்களை நீங்கள் சரிபார்த்து உறுதிப்படுத்துவீர்கள்.",
    note: "AI உதவியுடன் தகவல் பிரித்தெடுப்பு • Demo mode",
  },

  Hindi: {
    step: "चरण 2 / 4 • AI प्रोसेसिंग",
    title: "आपकी रिपोर्ट को समझ रहे हैं",
    description:
      "Health Copilot आपके दस्तावेज़ को पढ़ रहा है और समीक्षा के लिए महत्वपूर्ण जानकारी तैयार कर रहा है।",
    processing: "रिपोर्ट प्रोसेस हो रही है",
    ai: "AI",
    reading: "दस्तावेज़ पढ़ा जा रहा है",
    readingDesc: "दस्तावेज़ की संरचना पहचानी गई",
    extracting: "स्वास्थ्य जानकारी निकाली जा रही है",
    extractingDesc: "ज़रूरी रिपोर्ट मान खोजे जा रहे हैं",
    preparing: "आपकी समीक्षा के लिए तैयार हो रहा है",
    preparingDesc: "लगभग तैयार",
    security:
      "आगे बढ़ने से पहले आप निकाली गई जानकारी की समीक्षा और पुष्टि करेंगे।",
    note: "AI सहायता से जानकारी निकालना • डेमो मोड",
  },

  Telugu: {
    step: "దశ 2 / 4 • AI ప్రాసెసింగ్",
    title: "మీ నివేదికను అర్థం చేసుకుంటున్నాము",
    description:
      "Health Copilot మీ పత్రాన్ని చదివి, మీరు సమీక్షించడానికి అవసరమైన ముఖ్యమైన సమాచారాన్ని సిద్ధం చేస్తోంది.",
    processing: "నివేదిక ప్రాసెస్ అవుతోంది",
    ai: "AI",
    reading: "పత్రాన్ని చదువుతోంది",
    readingDesc: "పత్ర నిర్మాణం గుర్తించబడింది",
    extracting: "ఆరోగ్య సమాచారాన్ని సేకరిస్తోంది",
    extractingDesc: "అవసరమైన నివేదిక విలువలను కనుగొంటోంది",
    preparing: "మీ సమీక్షకు సిద్ధమవుతోంది",
    preparingDesc: "దాదాపు సిద్ధంగా ఉంది",
    security:
      "కొనసాగించే ముందు తీసుకున్న సమాచారాన్ని మీరు సమీక్షించి నిర్ధారించాలి.",
    note: "AI సహాయంతో సమాచారం సేకరణ • డెమో మోడ్",
  },

  Malayalam: {
    step: "ഘട്ടം 2 / 4 • AI പ്രോസസ്സിംഗ്",
    title: "നിങ്ങളുടെ റിപ്പോർട്ട് മനസ്സിലാക്കുന്നു",
    description:
      "Health Copilot നിങ്ങളുടെ ഡോക്യുമെന്റ് വായിച്ച്, നിങ്ങൾ പരിശോധിക്കേണ്ട പ്രധാന വിവരങ്ങൾ തയ്യാറാക്കുന്നു.",
    processing: "റിപ്പോർട്ട് പ്രോസസ്സ് ചെയ്യുന്നു",
    ai: "AI",
    reading: "ഡോക്യുമെന്റ് വായിക്കുന്നു",
    readingDesc: "ഡോക്യുമെന്റ് ഘടന കണ്ടെത്തി",
    extracting: "ആരോഗ്യ വിവരങ്ങൾ ശേഖരിക്കുന്നു",
    extractingDesc: "ആവശ്യമായ റിപ്പോർട്ട് മൂല്യങ്ങൾ കണ്ടെത്തുന്നു",
    preparing: "നിങ്ങളുടെ പരിശോധനയ്ക്ക് തയ്യാറാക്കുന്നു",
    preparingDesc: "ഏകദേശം തയ്യാറായി",
    security:
      "തുടരുന്നതിന് മുമ്പ് എടുത്ത വിവരങ്ങൾ നിങ്ങൾ പരിശോധിച്ച് സ്ഥിരീകരിക്കും.",
    note: "AI സഹായത്തോടെയുള്ള വിവര ശേഖരണം • ഡെമോ മോഡ്",
  },

  Kannada: {
    step: "ಹಂತ 2 / 4 • AI ಪ್ರೊಸೆಸಿಂಗ್",
    title: "ನಿಮ್ಮ ವರದಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ",
    description:
      "Health Copilot ನಿಮ್ಮ ದಾಖಲೆಯನ್ನು ಓದಿ, ನೀವು ಪರಿಶೀಲಿಸಬೇಕಾದ ಪ್ರಮುಖ ಮಾಹಿತಿಯನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತಿದೆ.",
    processing: "ವರದಿ ಪ್ರಕ್ರಿಯೆಗೊಳ್ಳುತ್ತಿದೆ",
    ai: "AI",
    reading: "ದಾಖಲೆಯನ್ನು ಓದುತ್ತಿದೆ",
    readingDesc: "ದಾಖಲೆ ರಚನೆ ಪತ್ತೆಯಾಗಿದೆ",
    extracting: "ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುತ್ತಿದೆ",
    extractingDesc: "ಅಗತ್ಯವಾದ ವರದಿ ಮೌಲ್ಯಗಳನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ",
    preparing: "ನಿಮ್ಮ ಪರಿಶೀಲನೆಗೆ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ",
    preparingDesc: "ಬಹುತೇಕ ಸಿದ್ಧವಾಗಿದೆ",
    security:
      "ಮುಂದುವರಿಯುವ ಮೊದಲು ತೆಗೆದ ಮಾಹಿತಿಯನ್ನು ನೀವು ಪರಿಶೀಲಿಸಿ ದೃಢೀಕರಿಸುತ್ತೀರಿ.",
    note: "AI ಸಹಾಯದಿಂದ ಮಾಹಿತಿ ಸಂಗ್ರಹಣೆ • ಡೆಮೋ ಮೋಡ್",
  },
};

export default function Analysis() {
  const navigate = useNavigate();
  const { language } = useApp();

  const text = translations[language] || translations.English;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/verify");
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="processing-page premium-processing">
      <div className="processing-glow processing-glow-one" />
      <div className="processing-glow processing-glow-two" />

      <div className="processing-card premium-processing-card">
        <div className="processing-visual">
          <div className="processing-ring ring-one" />
          <div className="processing-ring ring-two" />

          <div className="processing-icon">
            <BrainCircuit size={42} />
          </div>
        </div>

        <span className="eyebrow">{text.step}</span>

        <h1>{text.title}</h1>

        <p className="processing-description">
          {text.description}
        </p>

        <div className="progress-wrapper">
          <div className="progress-label">
            <span>{text.processing}</span>
            <span>{text.ai}</span>
          </div>

          <div className="progress-track premium-progress">
            <div className="progress-bar" />
          </div>
        </div>

        <div className="processing-steps premium-processing-steps">
          <div className="processing-step complete">
            <div className="step-icon">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <strong>{text.reading}</strong>
              <span>{text.readingDesc}</span>
            </div>
          </div>

          <div className="processing-step complete">
            <div className="step-icon">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <strong>{text.extracting}</strong>
              <span>{text.extractingDesc}</span>
            </div>
          </div>

          <div className="processing-step active">
            <div className="step-icon">
              <Sparkles size={17} />
            </div>

            <div>
              <strong>{text.preparing}</strong>
              <span>{text.preparingDesc}</span>
            </div>

            <span className="loader-dot" />
          </div>
        </div>

        <div className="processing-security">
          <ShieldCheck size={17} />
          <span>{text.security}</span>
        </div>

        <div className="processing-note">
          <FileSearch size={16} />
          <span>{text.note}</span>
        </div>
      </div>
    </div>
  );
}