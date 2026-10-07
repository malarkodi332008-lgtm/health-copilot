import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Lightbulb,
  ShieldCheck,
  FileText,
  CalendarCheck,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import VoiceButton from "../components/VoiceButton";

const translations = {
  English: {
    back: "Back",
    eyebrow: "RECOMMENDATIONS",
    title: "Safe next steps",
    description:
      "Educational suggestions based on the information shown in your health records.",
    listenTitle: "Prefer listening?",
    listenText:
      "Listen to these recommendations in your selected language.",
    oneTitle: "Review your original report",
    oneText:
      "Keep the original report available and compare important values before discussing them with a healthcare professional.",
    twoTitle: "Follow existing medical advice",
    twoText:
      "Continue following instructions already provided by your healthcare team.",
    threeTitle: "Keep your records organized",
    threeText:
      "Upload important medical documents so your health information stays easier to review over time.",
    fourTitle: "Ask questions when something is unclear",
    fourText:
      "Write down questions about unfamiliar values, medicines, or report terms and discuss them with a qualified healthcare professional.",
    important: "Important:",
    disclaimer:
      "These are educational next steps, not a diagnosis or a prescription. Do not start, stop, or change medicines based only on AI output.",
    openLabs: "Review lab results",
  },

  Tamil: {
    back: "பின்செல்",
    eyebrow: "பரிந்துரைகள்",
    title: "பாதுகாப்பான அடுத்த படிகள்",
    description:
      "உங்கள் சுகாதார பதிவுகளில் காட்டப்பட்டுள்ள தகவல்களை அடிப்படையாகக் கொண்ட கல்வி சார்ந்த பரிந்துரைகள்.",
    listenTitle: "கேட்டு அறிய விரும்புகிறீர்களா?",
    listenText:
      "இந்த பரிந்துரைகளை நீங்கள் தேர்வு செய்த மொழியில் கேளுங்கள்.",
    oneTitle: "அசல் அறிக்கையை சரிபார்க்கவும்",
    oneText:
      "அசல் அறிக்கையை அருகில் வைத்துக் கொண்டு முக்கியமான மதிப்புகளை ஒப்பிட்டு, பின்னர் சுகாதார நிபுணருடன் கலந்துரையாடவும்.",
    twoTitle: "ஏற்கனவே வழங்கப்பட்ட மருத்துவ ஆலோசனையைப் பின்பற்றவும்",
    twoText:
      "உங்கள் சுகாதார குழு ஏற்கனவே வழங்கிய வழிமுறைகளை தொடர்ந்து பின்பற்றவும்.",
    threeTitle: "உங்கள் பதிவுகளை ஒழுங்காக வைத்திருக்கவும்",
    threeText:
      "முக்கியமான மருத்துவ ஆவணங்களை பதிவேற்றுவதன் மூலம் உங்கள் சுகாதார தகவல்களை காலப்போக்கில் எளிதாக சரிபார்க்கலாம்.",
    fourTitle: "புரியாத விஷயங்களைப் பற்றி கேளுங்கள்",
    fourText:
      "தெரியாத மதிப்புகள், மருந்துகள் அல்லது அறிக்கை சொற்கள் குறித்து கேள்விகளை எழுதிக் கொண்டு தகுதியான சுகாதார நிபுணரிடம் கேளுங்கள்.",
    important: "முக்கியம்:",
    disclaimer:
      "இவை கல்வி சார்ந்த அடுத்த படிகள் மட்டுமே; நோயறிதல் அல்லது மருந்து பரிந்துரை அல்ல. AI தகவலை மட்டும் அடிப்படையாகக் கொண்டு மருந்துகளை தொடங்கவோ, நிறுத்தவோ அல்லது மாற்றவோ வேண்டாம்.",
    openLabs: "ஆய்வக முடிவுகளைப் பார்க்கவும்",
  },

  Hindi: {
    back: "वापस",
    eyebrow: "सिफारिशें",
    title: "सुरक्षित अगले कदम",
    description:
      "आपके स्वास्थ्य रिकॉर्ड में दिखाई गई जानकारी के आधार पर शैक्षिक सुझाव।",
    listenTitle: "सुनकर समझना चाहते हैं?",
    listenText:
      "इन सुझावों को अपनी चुनी हुई भाषा में सुनें।",
    oneTitle: "मूल रिपोर्ट की समीक्षा करें",
    oneText:
      "मूल रिपोर्ट अपने पास रखें और महत्वपूर्ण मानों की तुलना करें, फिर स्वास्थ्य पेशेवर से चर्चा करें।",
    twoTitle: "पहले से दी गई चिकित्सा सलाह का पालन करें",
    twoText:
      "आपकी स्वास्थ्य टीम द्वारा दी गई मौजूदा सलाह का पालन करते रहें।",
    threeTitle: "अपने रिकॉर्ड व्यवस्थित रखें",
    threeText:
      "महत्वपूर्ण चिकित्सा दस्तावेज़ अपलोड करते रहें ताकि समय के साथ स्वास्थ्य जानकारी की समीक्षा आसान हो।",
    fourTitle: "जो स्पष्ट न हो उसके बारे में पूछें",
    fourText:
      "अज्ञात मानों, दवाइयों या रिपोर्ट के शब्दों के बारे में प्रश्न लिखें और योग्य स्वास्थ्य पेशेवर से चर्चा करें।",
    important: "महत्वपूर्ण:",
    disclaimer:
      "ये केवल शैक्षिक अगले कदम हैं, निदान या प्रिस्क्रिप्शन नहीं। केवल AI आउटपुट के आधार पर दवाइयाँ शुरू, बंद या बदलें नहीं।",
    openLabs: "लैब परिणाम देखें",
  },

  Telugu: {
    back: "వెనుకకు",
    eyebrow: "సిఫార్సులు",
    title: "సురక్షితమైన తదుపరి దశలు",
    description:
      "మీ ఆరోగ్య రికార్డుల్లో చూపిన సమాచారాన్ని ఆధారంగా చేసుకున్న విద్యా సూచనలు.",
    listenTitle: "విని తెలుసుకోవాలనుకుంటున్నారా?",
    listenText:
      "ఈ సూచనలను మీరు ఎంచుకున్న భాషలో వినండి.",
    oneTitle: "అసలు నివేదికను సమీక్షించండి",
    oneText:
      "అసలు నివేదికను దగ్గర ఉంచుకుని ముఖ్యమైన విలువలను పోల్చి, ఆరోగ్య నిపుణుడితో చర్చించండి.",
    twoTitle: "ఇప్పటికే ఇచ్చిన వైద్య సూచనలను పాటించండి",
    twoText:
      "మీ ఆరోగ్య బృందం ఇప్పటికే ఇచ్చిన సూచనలను కొనసాగించండి.",
    threeTitle: "మీ రికార్డులను క్రమబద్ధంగా ఉంచండి",
    threeText:
      "ముఖ్యమైన వైద్య పత్రాలను అప్‌లోడ్ చేస్తూ ఉండండి, తద్వారా కాలక్రమంలో ఆరోగ్య సమాచారాన్ని సులభంగా సమీక్షించవచ్చు.",
    fourTitle: "అర్థం కాని విషయాలపై ప్రశ్నలు అడగండి",
    fourText:
      "తెలియని విలువలు, మందులు లేదా నివేదిక పదాల గురించి ప్రశ్నలను రాసుకుని అర్హత కలిగిన ఆరోగ్య నిపుణుడితో చర్చించండి.",
    important: "ముఖ్యమైనది:",
    disclaimer:
      "ఇవి విద్యా సంబంధిత తదుపరి దశలు మాత్రమే; వైద్య నిర్ధారణ లేదా మందుల సూచన కాదు. AI ఫలితాల ఆధారంగా మాత్రమే మందులను ప్రారంభించవద్దు, ఆపవద్దు లేదా మార్చవద్దు.",
    openLabs: "ల్యాబ్ ఫలితాలను సమీక్షించండి",
  },

  Malayalam: {
    back: "തിരികെ",
    eyebrow: "ശുപാർശകൾ",
    title: "സുരക്ഷിതമായ അടുത്ത ഘട്ടങ്ങൾ",
    description:
      "നിങ്ങളുടെ ആരോഗ്യ രേഖകളിൽ കാണുന്ന വിവരങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ള വിദ്യാഭ്യാസ നിർദ്ദേശങ്ങൾ.",
    listenTitle: "കേട്ട് മനസ്സിലാക്കണോ?",
    listenText:
      "ഈ നിർദ്ദേശങ്ങൾ നിങ്ങൾ തിരഞ്ഞെടുത്ത ഭാഷയിൽ കേൾക്കുക.",
    oneTitle: "അസൽ റിപ്പോർട്ട് പരിശോധിക്കുക",
    oneText:
      "അസൽ റിപ്പോർട്ട് കൈവശം വച്ച് പ്രധാന മൂല്യങ്ങൾ താരതമ്യം ചെയ്ത ശേഷം ആരോഗ്യ വിദഗ്ധനുമായി ചർച്ച ചെയ്യുക.",
    twoTitle: "നേരത്തെ നൽകിയ മെഡിക്കൽ നിർദ്ദേശങ്ങൾ പാലിക്കുക",
    twoText:
      "നിങ്ങളുടെ ആരോഗ്യസംഘം ഇതിനകം നൽകിയ നിർദ്ദേശങ്ങൾ തുടരുക.",
    threeTitle: "നിങ്ങളുടെ രേഖകൾ ക്രമീകരിച്ച് സൂക്ഷിക്കുക",
    threeText:
      "പ്രധാന മെഡിക്കൽ ഡോക്യുമെന്റുകൾ അപ്‌ലോഡ് ചെയ്യുക, അങ്ങനെ കാലക്രമത്തിൽ ആരോഗ്യ വിവരങ്ങൾ പരിശോധിക്കുന്നത് എളുപ്പമാകും.",
    fourTitle: "വ്യക്തമല്ലാത്ത കാര്യങ്ങളെക്കുറിച്ച് ചോദിക്കുക",
    fourText:
      "അറിയാത്ത മൂല്യങ്ങൾ, മരുന്നുകൾ, റിപ്പോർട്ട് പദങ്ങൾ എന്നിവയെക്കുറിച്ച് ചോദ്യങ്ങൾ കുറിച്ച് യോഗ്യനായ ആരോഗ്യ വിദഗ്ധനുമായി ചർച്ച ചെയ്യുക.",
    important: "പ്രധാനപ്പെട്ടത്:",
    disclaimer:
      "ഇവ വിദ്യാഭ്യാസപരമായ അടുത്ത ഘട്ടങ്ങൾ മാത്രമാണ്; രോഗനിർണ്ണയമോ മരുന്ന് നിർദ്ദേശമോ അല്ല. AI ഫലങ്ങൾ മാത്രം അടിസ്ഥാനമാക്കി മരുന്നുകൾ ആരംഭിക്കുകയോ നിർത്തുകയോ മാറ്റുകയോ ചെയ്യരുത്.",
    openLabs: "ലാബ് ഫലങ്ങൾ പരിശോധിക്കുക",
  },

  Kannada: {
    back: "ಹಿಂದೆ",
    eyebrow: "ಶಿಫಾರಸುಗಳು",
    title: "ಸುರಕ್ಷಿತ ಮುಂದಿನ ಹಂತಗಳು",
    description:
      "ನಿಮ್ಮ ಆರೋಗ್ಯ ದಾಖಲೆಗಳಲ್ಲಿ ತೋರಿಸಿರುವ ಮಾಹಿತಿಯನ್ನು ಆಧರಿಸಿದ ಶೈಕ್ಷಣಿಕ ಸಲಹೆಗಳು.",
    listenTitle: "ಕೇಳಿ ತಿಳಿದುಕೊಳ್ಳಬೇಕೇ?",
    listenText:
      "ಈ ಸಲಹೆಗಳನ್ನು ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಷೆಯಲ್ಲಿ ಕೇಳಿ.",
    oneTitle: "ಮೂಲ ವರದಿಯನ್ನು ಪರಿಶೀಲಿಸಿ",
    oneText:
      "ಮೂಲ ವರದಿಯನ್ನು ಹತ್ತಿರದಲ್ಲಿಟ್ಟುಕೊಂಡು ಮುಖ್ಯ ಮೌಲ್ಯಗಳನ್ನು ಹೋಲಿಸಿ ನಂತರ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೊಂದಿಗೆ ಚರ್ಚಿಸಿ.",
    twoTitle: "ಈಗಾಗಲೇ ನೀಡಿರುವ ವೈದ್ಯಕೀಯ ಸಲಹೆಯನ್ನು ಅನುಸರಿಸಿ",
    twoText:
      "ನಿಮ್ಮ ಆರೋಗ್ಯ ತಂಡ ಈಗಾಗಲೇ ನೀಡಿರುವ ಸೂಚನೆಗಳನ್ನು ಮುಂದುವರಿಸಿ.",
    threeTitle: "ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ವ್ಯವಸ್ಥಿತವಾಗಿ ಇರಿಸಿ",
    threeText:
      "ಪ್ರಮುಖ ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುತ್ತಿರಿ, ಇದರಿಂದ ಕಾಲಕ್ರಮದಲ್ಲಿ ಆರೋಗ್ಯ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸುವುದು ಸುಲಭವಾಗುತ್ತದೆ.",
    fourTitle: "ಸ್ಪಷ್ಟವಾಗದ ವಿಷಯಗಳ ಬಗ್ಗೆ ಕೇಳಿ",
    fourText:
      "ತಿಳಿಯದ ಮೌಲ್ಯಗಳು, ಔಷಧಿಗಳು ಅಥವಾ ವರದಿ ಪದಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳನ್ನು ಬರೆದು ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೊಂದಿಗೆ ಚರ್ಚಿಸಿ.",
    important: "ಪ್ರಮುಖ:",
    disclaimer:
      "ಇವು ಶೈಕ್ಷಣಿಕ ಮುಂದಿನ ಹಂತಗಳು ಮಾತ್ರ; ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯ ಅಥವಾ ಔಷಧಿ ಸೂಚನೆಗಳಲ್ಲ. AI ಫಲಿತಾಂಶವನ್ನು ಮಾತ್ರ ಆಧರಿಸಿ ಔಷಧಿಯನ್ನು ಪ್ರಾರಂಭಿಸಬೇಡಿ, ನಿಲ್ಲಿಸಬೇಡಿ ಅಥವಾ ಬದಲಾಯಿಸಬೇಡಿ.",
    openLabs: "ಲ್ಯಾಬ್ ಫಲಿತಾಂಶಗಳನ್ನು ಪರಿಶೀಲಿಸಿ",
  },
};

export default function Recommendations() {
  const navigate = useNavigate();
  const { language } = useApp();

  const text = translations[language] || translations.English;

  const recommendationVoiceText = [
    text.oneTitle,
    text.oneText,
    text.twoTitle,
    text.twoText,
    text.threeTitle,
    text.threeText,
    text.fourTitle,
    text.fourText,
  ].join(". ");

  const recommendations = [
    {
      icon: FileText,
      title: text.oneTitle,
      description: text.oneText,
    },
    {
      icon: MessageCircle,
      title: text.twoTitle,
      description: text.twoText,
    },
    {
      icon: CalendarCheck,
      title: text.threeTitle,
      description: text.threeText,
    },
    {
      icon: Lightbulb,
      title: text.fourTitle,
      description: text.fourText,
    },
  ];

  return (
    <div className="app-page premium-recommendations-page">
      <div className="page-container narrow">
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
            <Lightbulb size={26} />
          </div>

          <div>
            <span className="eyebrow">{text.eyebrow}</span>
            <h1>{text.title}</h1>
            <p>{text.description}</p>
          </div>
        </div>

        <div className="card recommendations-voice-card">
          <div className="recommendations-voice-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <strong>{text.listenTitle}</strong>
            <p>{text.listenText}</p>
          </div>

          <VoiceButton
            text={recommendationVoiceText}
            language={language}
          />
        </div>

        <div className="recommendation-page-list">
          {recommendations.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                className="card recommendation-page-card"
                key={index}
              >
                <div className="recommendation-page-icon">
                  <Icon size={22} />
                </div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/labs")}
          type="button"
        >
          {text.openLabs}
        </button>

        <div className="medical-disclaimer">
          <ShieldCheck size={18} />
          <div>
            <strong>{text.important}</strong>
            <p>{text.disclaimer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}