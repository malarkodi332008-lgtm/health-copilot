import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FlaskConical,
  Sparkles,
  Filter,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import VoiceButton from "../components/VoiceButton";

const translations = {
  English: {
    back: "Back",
    eyebrow: "LAB RESULTS",
    title: "Your test results",
    description:
      "Review the values extracted from your uploaded reports in one place.",
    all: "All",
    normal: "Normal",
    attention: "Needs Attention",
    noResults: "No results found.",
    listenTitle: "Prefer listening?",
    listenText:
      "Listen to the explanation of your lab results in your selected language.",
    explanation: "This result was extracted from your uploaded report. A qualified healthcare professional can interpret it using your symptoms, history, and the reference range shown on the report.",
    disclaimer:
      "Lab values shown here are for educational review only and do not provide a medical diagnosis.",
  },

  Tamil: {
    back: "பின்செல்",
    eyebrow: "ஆய்வக முடிவுகள்",
    title: "உங்கள் பரிசோதனை முடிவுகள்",
    description:
      "நீங்கள் பதிவேற்றிய அறிக்கைகளிலிருந்து எடுக்கப்பட்ட மதிப்புகளை ஒரே இடத்தில் பார்க்கலாம்.",
    all: "அனைத்தும்",
    normal: "இயல்பானது",
    attention: "கவனம் தேவை",
    noResults: "முடிவுகள் எதுவும் இல்லை.",
    listenTitle: "கேட்டு அறிய விரும்புகிறீர்களா?",
    listenText:
      "நீங்கள் தேர்வு செய்த மொழியில் ஆய்வக முடிவுகளின் விளக்கத்தை கேளுங்கள்.",
    explanation:
      "இந்த முடிவு நீங்கள் பதிவேற்றிய அறிக்கையிலிருந்து எடுக்கப்பட்டது. உங்கள் அறிகுறிகள், மருத்துவ வரலாறு மற்றும் அறிக்கையில் உள்ள reference range ஆகியவற்றைப் பயன்படுத்தி தகுதியான சுகாதார நிபுணர் இதை விளக்க முடியும்.",
    disclaimer:
      "இங்கே காட்டப்படும் ஆய்வக மதிப்புகள் கல்வி சார்ந்த மதிப்பாய்வுக்காக மட்டுமே; மருத்துவ நோயறிதலை வழங்காது.",
  },

  Hindi: {
    back: "वापस",
    eyebrow: "लैब परिणाम",
    title: "आपके परीक्षण परिणाम",
    description:
      "अपलोड की गई रिपोर्टों से निकाले गए मानों की एक जगह समीक्षा करें।",
    all: "सभी",
    normal: "सामान्य",
    attention: "ध्यान देने की आवश्यकता",
    noResults: "कोई परिणाम नहीं मिला।",
    listenTitle: "सुनकर समझना चाहते हैं?",
    listenText:
      "अपनी चुनी हुई भाषा में लैब परिणामों की व्याख्या सुनें।",
    explanation:
      "यह परिणाम आपकी अपलोड की गई रिपोर्ट से निकाला गया है। योग्य स्वास्थ्य पेशेवर आपके लक्षणों, चिकित्सा इतिहास और रिपोर्ट में दिए गए reference range के आधार पर इसकी व्याख्या कर सकते हैं।",
    disclaimer:
      "यहाँ दिखाए गए लैब मान केवल शैक्षिक समीक्षा के लिए हैं और चिकित्सा निदान प्रदान नहीं करते।",
  },

  Telugu: {
    back: "వెనుకకు",
    eyebrow: "ల్యాబ్ ఫలితాలు",
    title: "మీ పరీక్షా ఫలితాలు",
    description:
      "మీరు అప్‌లోడ్ చేసిన నివేదికల నుండి తీసుకున్న విలువలను ఒకే చోట సమీక్షించండి.",
    all: "అన్నీ",
    normal: "సాధారణం",
    attention: "శ్రద్ధ అవసరం",
    noResults: "ఫలితాలు ఏవీ లేవు.",
    listenTitle: "విని తెలుసుకోవాలనుకుంటున్నారా?",
    listenText:
      "మీరు ఎంచుకున్న భాషలో ల్యాబ్ ఫలితాల వివరణను వినండి.",
    explanation:
      "ఈ ఫలితం మీరు అప్‌లోడ్ చేసిన నివేదిక నుండి తీసుకోబడింది. మీ లక్షణాలు, వైద్య చరిత్ర మరియు నివేదికలో ఉన్న reference range ఆధారంగా అర్హత కలిగిన ఆరోగ్య నిపుణుడు దీనిని అర్థం చేసుకోవచ్చు.",
    disclaimer:
      "ఇక్కడ చూపిన ల్యాబ్ విలువలు విద్యా సమీక్ష కోసం మాత్రమే మరియు వైద్య నిర్ధారణను అందించవు.",
  },

  Malayalam: {
    back: "തിരികെ",
    eyebrow: "ലാബ് ഫലങ്ങൾ",
    title: "നിങ്ങളുടെ പരിശോധനാ ഫലങ്ങൾ",
    description:
      "നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത റിപ്പോർട്ടുകളിൽ നിന്ന് ശേഖരിച്ച മൂല്യങ്ങൾ ഒരിടത്ത് പരിശോധിക്കുക.",
    all: "എല്ലാം",
    normal: "സാധാരണ",
    attention: "ശ്രദ്ധ ആവശ്യമാണ്",
    noResults: "ഫലങ്ങളൊന്നും കണ്ടെത്തിയില്ല.",
    listenTitle: "കേട്ട് മനസ്സിലാക്കണോ?",
    listenText:
      "നിങ്ങൾ തിരഞ്ഞെടുത്ത ഭാഷയിൽ ലാബ് ഫലങ്ങളുടെ വിശദീകരണം കേൾക്കുക.",
    explanation:
      "ഈ ഫലം നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത റിപ്പോർട്ടിൽ നിന്ന് ശേഖരിച്ചതാണ്. നിങ്ങളുടെ ലക്ഷണങ്ങൾ, മെഡിക്കൽ ചരിത്രം, റിപ്പോർട്ടിലെ reference range എന്നിവ ഉപയോഗിച്ച് യോഗ്യനായ ആരോഗ്യ വിദഗ്ധന് ഇത് വ്യാഖ്യാനിക്കാം.",
    disclaimer:
      "ഇവിടെ കാണുന്ന ലാബ് മൂല്യങ്ങൾ വിദ്യാഭ്യാസപരമായ പരിശോധനയ്ക്ക് മാത്രമാണ്; മെഡിക്കൽ രോഗനിർണ്ണയം നൽകുന്നില്ല.",
  },

  Kannada: {
    back: "ಹಿಂದೆ",
    eyebrow: "ಲ್ಯಾಬ್ ಫಲಿತಾಂಶಗಳು",
    title: "ನಿಮ್ಮ ಪರೀಕ್ಷಾ ಫಲಿತಾಂಶಗಳು",
    description:
      "ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ವರದಿಗಳಿಂದ ತೆಗೆದ ಮೌಲ್ಯಗಳನ್ನು ಒಂದೇ ಸ್ಥಳದಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.",
    all: "ಎಲ್ಲವೂ",
    normal: "ಸಾಮಾನ್ಯ",
    attention: "ಗಮನ ಅಗತ್ಯ",
    noResults: "ಯಾವುದೇ ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    listenTitle: "ಕೇಳಿ ತಿಳಿದುಕೊಳ್ಳಬೇಕೇ?",
    listenText:
      "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಷೆಯಲ್ಲಿ ಲ್ಯಾಬ್ ಫಲಿತಾಂಶಗಳ ವಿವರಣೆಯನ್ನು ಕೇಳಿ.",
    explanation:
      "ಈ ಫಲಿತಾಂಶವನ್ನು ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ವರದಿಯಿಂದ ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ. ನಿಮ್ಮ ಲಕ್ಷಣಗಳು, ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ ಮತ್ತು ವರದಿಯ reference range ಆಧರಿಸಿ ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರು ಇದನ್ನು ಅರ್ಥೈಸಬಹುದು.",
    disclaimer:
      "ಇಲ್ಲಿ ತೋರಿಸಿರುವ ಲ್ಯಾಬ್ ಮೌಲ್ಯಗಳು ಶೈಕ್ಷಣಿಕ ಪರಿಶೀಲನೆಗಾಗಿ ಮಾತ್ರ ಮತ್ತು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವನ್ನು ನೀಡುವುದಿಲ್ಲ.",
  },
};

export default function LabResults() {
  const navigate = useNavigate();
  const { language, extractedData } = useApp();

  const text = translations[language] || translations.English;

  const [filter, setFilter] = useState("All");

  const labs = [
    {
      name: "Hemoglobin",
      value: extractedData.hb,
      unit: "g/dL",
      status: "Needs Attention",
    },
    {
      name: "Glucose",
      value: extractedData.glucose,
      unit: "mg/dL",
      status: "Needs Attention",
    },
    {
      name: "Platelets",
      value: extractedData.platelets,
      unit: "/µL",
      status: "Normal",
    },
    {
      name: "WBC",
      value: extractedData.wbc,
      unit: "/µL",
      status: "Normal",
    },
  ];

  const filteredLabs = useMemo(() => {
    if (filter === "All") return labs;

    return labs.filter((lab) => lab.status === filter);
  }, [filter, labs]);

  const filterButtons = [
    {
      value: "All",
      label: text.all,
    },
    {
      value: "Normal",
      label: text.normal,
    },
    {
      value: "Needs Attention",
      label: text.attention,
    },
  ];

  const spokenText = labs
    .map(
      (lab) =>
        `${lab.name}: ${lab.value} ${lab.unit}. ${
          lab.status === "Normal" ? text.normal : text.attention
        }.`
    )
    .join(" ");

  return (
    <div className="app-page premium-lab-page">
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
            <FlaskConical size={26} />
          </div>

          <div>
            <span className="eyebrow">{text.eyebrow}</span>

            <h1>{text.title}</h1>

            <p>{text.description}</p>
          </div>
        </div>

        <div className="card lab-voice-card">
          <div className="lab-voice-icon">
            <Sparkles size={20} />
          </div>

          <div className="lab-voice-content">
            <strong>{text.listenTitle}</strong>
            <p>{text.listenText}</p>
          </div>

          <VoiceButton
            text={spokenText}
            language={language}
          />
        </div>

        <div className="lab-filter-bar">
          <div className="lab-filter-label">
            <Filter size={17} />
            <span>{text.eyebrow}</span>
          </div>

          <div className="lab-filters">
            {filterButtons.map((button) => (
              <button
                key={button.value}
                type="button"
                className={`filter-button ${
                  filter === button.value ? "active" : ""
                }`}
                onClick={() => setFilter(button.value)}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        <div className="result-list">
          {filteredLabs.length > 0 ? (
            filteredLabs.map((lab) => (
              <div key={lab.name} className="card lab-card">
                <div className="lab-icon">
                  <FlaskConical size={20} />
                </div>

                <div className="lab-main">
                  <div className="lab-title-row">
                    <div>
                      <h3>{lab.name}</h3>
                      <p>
                        {lab.value} {lab.unit}
                      </p>
                    </div>

                    <span
                      className={`status ${
                        lab.status === "Needs Attention"
                          ? "attention"
                          : "normal"
                      }`}
                    >
                      {lab.status === "Normal"
                        ? text.normal
                        : text.attention}
                    </span>
                  </div>

                  <details className="explanation">
                    <summary>
                      {text.meaning || "What does this mean?"}
                    </summary>

                    <p>{text.explanation}</p>
                  </details>
                </div>
              </div>
            ))
          ) : (
            <div className="card empty-state">
              <p>{text.noResults}</p>
            </div>
          )}
        </div>

        <div className="medical-disclaimer">
          {text.disclaimer}
        </div>
      </div>
    </div>
  );
}