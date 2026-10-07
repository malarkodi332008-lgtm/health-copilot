import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  UserRound,
  FlaskConical,
  FileText,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const translations = {
  English: {
    back: "Back",
    step: "STEP 3 OF 4 • REVIEW",
    title: "Check what we found.",
    description:
      "AI extracted the information below from your document. Please review it carefully before continuing.",
    completed: "AI extraction completed",
    ready: "Ready for review",
    reportInfo: "REPORT INFORMATION",
    patientDetails: "Patient & report details",
    editNote:
      "Edit any value if it doesn't match the original document.",
    patientName: "Patient name",
    reportType: "Report type",
    hemoglobin: "Hemoglobin",
    glucose: "Glucose",
    platelets: "Platelets",
    wbc: "WBC",
    control: "You're in control",
    controlNote:
      "Always compare extracted values with the original medical document before confirming.",
    confirm: "Confirm information",
    important: "Important:",
    disclaimer:
      "AI extraction can make mistakes. Confirm the information using the original document. This application does not provide a medical diagnosis.",
  },

  Tamil: {
    back: "பின்செல்",
    step: "படி 3 / 4 • சரிபார்ப்பு",
    title: "எடுக்கப்பட்ட தகவல்களை சரிபார்க்கவும்.",
    description:
      "உங்கள் ஆவணத்திலிருந்து AI எடுத்த தகவல்கள் கீழே உள்ளன. தொடர்வதற்கு முன் அவற்றை கவனமாக சரிபார்க்கவும்.",
    completed: "AI தகவல் பிரித்தெடுப்பு முடிந்தது",
    ready: "சரிபார்ப்புக்கு தயார்",
    reportInfo: "அறிக்கை தகவல்",
    patientDetails: "நோயாளர் மற்றும் அறிக்கை விவரங்கள்",
    editNote:
      "அசல் ஆவணத்துடன் பொருந்தவில்லை என்றால் எந்த மதிப்பையும் திருத்தலாம்.",
    patientName: "நோயாளர் பெயர்",
    reportType: "அறிக்கை வகை",
    hemoglobin: "ஹீமோகுளோபின்",
    glucose: "குளுக்கோஸ்",
    platelets: "பிளேட்லெட்கள்",
    wbc: "WBC",
    control: "கட்டுப்பாடு உங்களிடமே",
    controlNote:
      "உறுதிப்படுத்துவதற்கு முன் எடுக்கப்பட்ட மதிப்புகளை அசல் மருத்துவ ஆவணத்துடன் ஒப்பிடவும்.",
    confirm: "தகவலை உறுதிப்படுத்தவும்",
    important: "முக்கியம்:",
    disclaimer:
      "AI தகவல் பிரித்தெடுப்பில் தவறுகள் இருக்கலாம். அசல் ஆவணத்தைப் பயன்படுத்தி தகவலை உறுதிப்படுத்தவும். இந்த பயன்பாடு மருத்துவ நோயறிதலை வழங்காது.",
  },

  Hindi: {
    back: "वापस",
    step: "चरण 3 / 4 • समीक्षा",
    title: "हमने जो पाया उसे जाँचें।",
    description:
      "AI ने आपके दस्तावेज़ से नीचे दी गई जानकारी निकाली है। आगे बढ़ने से पहले इसे ध्यान से जाँचें।",
    completed: "AI जानकारी निकालना पूरा हुआ",
    ready: "समीक्षा के लिए तैयार",
    reportInfo: "रिपोर्ट जानकारी",
    patientDetails: "मरीज़ और रिपोर्ट विवरण",
    editNote:
      "यदि कोई जानकारी मूल दस्तावेज़ से मेल नहीं खाती है तो उसे बदल सकते हैं।",
    patientName: "मरीज़ का नाम",
    reportType: "रिपोर्ट प्रकार",
    hemoglobin: "हीमोग्लोबिन",
    glucose: "ग्लूकोज़",
    platelets: "प्लेटलेट्स",
    wbc: "WBC",
    control: "नियंत्रण आपके हाथ में है",
    controlNote:
      "पुष्टि करने से पहले निकाली गई जानकारी की तुलना मूल चिकित्सा दस्तावेज़ से करें।",
    confirm: "जानकारी की पुष्टि करें",
    important: "महत्वपूर्ण:",
    disclaimer:
      "AI जानकारी निकालते समय गलतियाँ कर सकता है। मूल दस्तावेज़ से जानकारी की पुष्टि करें। यह एप्लिकेशन चिकित्सा निदान प्रदान नहीं करता है।",
  },

  Telugu: {
    back: "వెనుకకు",
    step: "దశ 3 / 4 • సమీక్ష",
    title: "మేము కనుగొన్న సమాచారాన్ని తనిఖీ చేయండి.",
    description:
      "AI మీ పత్రం నుండి కింది సమాచారాన్ని సేకరించింది. కొనసాగించే ముందు దాన్ని జాగ్రత్తగా సమీక్షించండి.",
    completed: "AI సమాచారం సేకరణ పూర్తైంది",
    ready: "సమీక్షకు సిద్ధంగా ఉంది",
    reportInfo: "నివేదిక సమాచారం",
    patientDetails: "రోగి మరియు నివేదిక వివరాలు",
    editNote:
      "అసలు పత్రంతో సరిపోలకపోతే ఏ విలువనైనా సవరించవచ్చు.",
    patientName: "రోగి పేరు",
    reportType: "నివేదిక రకం",
    hemoglobin: "హీమోగ్లోబిన్",
    glucose: "గ్లూకోజ్",
    platelets: "ప్లేట్‌లెట్లు",
    wbc: "WBC",
    control: "నియంత్రణ మీ చేతుల్లో ఉంది",
    controlNote:
      "నిర్ధారించే ముందు తీసుకున్న విలువలను అసలు వైద్య పత్రంతో పోల్చండి.",
    confirm: "సమాచారాన్ని నిర్ధారించండి",
    important: "ముఖ్యమైనది:",
    disclaimer:
      "AI సమాచారం సేకరించేటప్పుడు తప్పులు చేయవచ్చు. అసలు పత్రాన్ని ఉపయోగించి సమాచారాన్ని నిర్ధారించండి. ఈ అప్లికేషన్ వైద్య నిర్ధారణను అందించదు.",
  },

  Malayalam: {
    back: "തിരികെ",
    step: "ഘട്ടം 3 / 4 • പരിശോധന",
    title: "ഞങ്ങൾ കണ്ടെത്തിയ വിവരങ്ങൾ പരിശോധിക്കുക.",
    description:
      "AI നിങ്ങളുടെ ഡോക്യുമെന്റിൽ നിന്ന് താഴെയുള്ള വിവരങ്ങൾ ശേഖരിച്ചു. തുടരുന്നതിന് മുമ്പ് അത് ശ്രദ്ധാപൂർവ്വം പരിശോധിക്കുക.",
    completed: "AI വിവര ശേഖരണം പൂർത്തിയായി",
    ready: "പരിശോധനയ്ക്ക് തയ്യാറാണ്",
    reportInfo: "റിപ്പോർട്ട് വിവരങ്ങൾ",
    patientDetails: "രോഗിയും റിപ്പോർട്ട് വിവരങ്ങളും",
    editNote:
      "അസൽ ഡോക്യുമെന്റുമായി പൊരുത്തപ്പെടുന്നില്ലെങ്കിൽ ഏതെങ്കിലും വിവരങ്ങൾ തിരുത്താം.",
    patientName: "രോഗിയുടെ പേര്",
    reportType: "റിപ്പോർട്ട് തരം",
    hemoglobin: "ഹീമോഗ്ലോബിൻ",
    glucose: "ഗ്ലൂക്കോസ്",
    platelets: "പ്ലേറ്റ്ലെറ്റുകൾ",
    wbc: "WBC",
    control: "നിയന്ത്രണം നിങ്ങളുടേതാണ്",
    controlNote:
      "സ്ഥിരീകരിക്കുന്നതിന് മുമ്പ് എടുത്ത വിവരങ്ങൾ അസൽ മെഡിക്കൽ ഡോക്യുമെന്റുമായി താരതമ്യം ചെയ്യുക.",
    confirm: "വിവരങ്ങൾ സ്ഥിരീകരിക്കുക",
    important: "പ്രധാനപ്പെട്ടത്:",
    disclaimer:
      "AI വിവരങ്ങൾ ശേഖരിക്കുമ്പോൾ തെറ്റുകൾ സംഭവിക്കാം. അസൽ ഡോക്യുമെന്റ് ഉപയോഗിച്ച് വിവരങ്ങൾ സ്ഥിരീകരിക്കുക. ഈ ആപ്ലിക്കേഷൻ മെഡിക്കൽ രോഗനിർണ്ണയം നൽകുന്നില്ല.",
  },

  Kannada: {
    back: "ಹಿಂದೆ",
    step: "ಹಂತ 3 / 4 • ಪರಿಶೀಲನೆ",
    title: "ನಾವು ಕಂಡುಕೊಂಡ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    description:
      "AI ನಿಮ್ಮ ದಾಖಲೆಯಿಂದ ಕೆಳಗಿನ ಮಾಹಿತಿಯನ್ನು ಸಂಗ್ರಹಿಸಿದೆ. ಮುಂದುವರಿಯುವ ಮೊದಲು ಅದನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಪರಿಶೀಲಿಸಿ.",
    completed: "AI ಮಾಹಿತಿ ಸಂಗ್ರಹಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ",
    ready: "ಪರಿಶೀಲನೆಗೆ ಸಿದ್ಧವಾಗಿದೆ",
    reportInfo: "ವರದಿ ಮಾಹಿತಿ",
    patientDetails: "ರೋಗಿ ಮತ್ತು ವರದಿ ವಿವರಗಳು",
    editNote:
      "ಮೂಲ ದಾಖಲೆಗೆ ಹೊಂದಿಕೆಯಾಗದಿದ್ದರೆ ಯಾವುದೇ ಮಾಹಿತಿಯನ್ನು ತಿದ್ದುಪಡಿ ಮಾಡಬಹುದು.",
    patientName: "ರೋಗಿಯ ಹೆಸರು",
    reportType: "ವರದಿ ಪ್ರಕಾರ",
    hemoglobin: "ಹಿಮೋಗ್ಲೋಬಿನ್",
    glucose: "ಗ್ಲೂಕೋಸ್",
    platelets: "ಪ್ಲೇಟ್‌ಲೆಟ್‌ಗಳು",
    wbc: "WBC",
    control: "ನಿಯಂತ್ರಣ ನಿಮ್ಮ ಕೈಯಲ್ಲಿದೆ",
    controlNote:
      "ದೃಢೀಕರಿಸುವ ಮೊದಲು ತೆಗೆದ ಮಾಹಿತಿಯನ್ನು ಮೂಲ ವೈದ್ಯಕೀಯ ದಾಖಲೆಯೊಂದಿಗೆ ಹೋಲಿಸಿ.",
    confirm: "ಮಾಹಿತಿಯನ್ನು ದೃಢೀಕರಿಸಿ",
    important: "ಪ್ರಮುಖ:",
    disclaimer:
      "AI ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸುವಾಗ ತಪ್ಪುಗಳು ಸಂಭವಿಸಬಹುದು. ಮೂಲ ದಾಖಲೆಯನ್ನು ಬಳಸಿ ಮಾಹಿತಿಯನ್ನು ದೃಢೀಕರಿಸಿ. ಈ ಅಪ್ಲಿಕೇಶನ್ ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವನ್ನು ನೀಡುವುದಿಲ್ಲ.",
  },
};

export default function VerifyExtraction() {
  const navigate = useNavigate();
  const { extractedData, setExtractedData, language } = useApp();

  const text = translations[language] || translations.English;

  const [data, setData] = useState(extractedData);

  const updateField = (field, value) => {
    setData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const confirm = () => {
    setExtractedData(data);
    navigate("/dashboard");
  };

  return (
    <div className="app-page premium-verify-page">
      <div className="page-container">
        <button
          className="back-button"
          onClick={() => navigate("/upload")}
          type="button"
        >
          <ArrowLeft size={18} />
          {text.back}
        </button>

        <div className="verify-heading">
          <div className="verify-heading-icon">
            <CheckCircle2 size={26} />
          </div>

          <div>
            <span className="eyebrow">{text.step}</span>

            <h1>{text.title}</h1>

            <p>{text.description}</p>
          </div>
        </div>

        <div className="verification-status">
          <div>
            <Sparkles size={18} />
            <span>{text.completed}</span>
          </div>

          <span className="verified-badge">
            <CheckCircle2 size={15} />
            {text.ready}
          </span>
        </div>

        <div className="card verification-card premium-verification-card">
          <div className="verification-header">
            <div>
              <div className="section-icon-label">
                <FileText size={17} />
                <span>{text.reportInfo}</span>
              </div>

              <h2>{text.patientDetails}</h2>

              <p>{text.editNote}</p>
            </div>
          </div>

          <div className="form-grid premium-form-grid">
            <label>
              <span>
                <UserRound size={14} />
                {text.patientName}
              </span>

              <input
                value={data.patientName}
                onChange={(e) =>
                  updateField("patientName", e.target.value)
                }
              />
            </label>

            <label>
              <span>
                <FileText size={14} />
                {text.reportType}
              </span>

              <input
                value={data.reportType}
                onChange={(e) =>
                  updateField("reportType", e.target.value)
                }
              />
            </label>

            <label>
              <span>
                <FlaskConical size={14} />
                {text.hemoglobin}
              </span>

              <div className="input-with-unit">
                <input
                  value={data.hb}
                  onChange={(e) =>
                    updateField("hb", e.target.value)
                  }
                />
                <span>g/dL</span>
              </div>
            </label>

            <label>
              <span>
                <FlaskConical size={14} />
                {text.glucose}
              </span>

              <div className="input-with-unit">
                <input
                  value={data.glucose}
                  onChange={(e) =>
                    updateField("glucose", e.target.value)
                  }
                />
                <span>mg/dL</span>
              </div>
            </label>

            <label>
              <span>
                <FlaskConical size={14} />
                {text.platelets}
              </span>

              <div className="input-with-unit">
                <input
                  value={data.platelets}
                  onChange={(e) =>
                    updateField("platelets", e.target.value)
                  }
                />
                <span>/µL</span>
              </div>
            </label>

            <label>
              <span>
                <FlaskConical size={14} />
                {text.wbc}
              </span>

              <div className="input-with-unit">
                <input
                  value={data.wbc}
                  onChange={(e) =>
                    updateField("wbc", e.target.value)
                  }
                />
                <span>/µL</span>
              </div>
            </label>
          </div>

          <div className="privacy-note premium-verification-note">
            <ShieldCheck size={19} />

            <div>
              <strong>{text.control}</strong>

              <span>{text.controlNote}</span>
            </div>
          </div>

          <button
            className="primary-button verify-submit"
            onClick={confirm}
            type="button"
          >
            {text.confirm}
            <CheckCircle2 size={18} />
          </button>
        </div>

        <div className="medical-disclaimer">
          <strong>{text.important}</strong> {text.disclaimer}
        </div>
      </div>
    </div>
  );
}