import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CalendarDays,
  Filter,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import VoiceButton from "../components/VoiceButton";

const translations = {
  English: {
    back: "Back",
    eyebrow: "REPORTS",
    title: "Your medical reports",
    description:
      "View and organize the documents you have uploaded to Health Copilot.",
    all: "All",
    lab: "Lab Report",
    prescription: "Prescription",
    medical: "Medical Report",
    noReports: "No reports found.",
    listenTitle: "Prefer listening?",
    listenText:
      "Listen to a summary of your uploaded reports in your selected language.",
    voiceIntro: "You have uploaded the following reports:",
  },

  Tamil: {
    back: "பின்செல்",
    eyebrow: "அறிக்கைகள்",
    title: "உங்கள் மருத்துவ அறிக்கைகள்",
    description:
      "Health Copilot-ல் நீங்கள் பதிவேற்றிய ஆவணங்களைப் பார்க்கவும் ஒழுங்குபடுத்தவும்.",
    all: "அனைத்தும்",
    lab: "ஆய்வக அறிக்கை",
    prescription: "மருந்துச் சீட்டு",
    medical: "மருத்துவ அறிக்கை",
    noReports: "அறிக்கைகள் எதுவும் இல்லை.",
    listenTitle: "கேட்டு அறிய விரும்புகிறீர்களா?",
    listenText:
      "நீங்கள் தேர்வு செய்த மொழியில் பதிவேற்றிய அறிக்கைகளின் சுருக்கத்தை கேளுங்கள்.",
    voiceIntro: "நீங்கள் பதிவேற்றிய அறிக்கைகள்:",
  },

  Hindi: {
    back: "वापस",
    eyebrow: "रिपोर्ट्स",
    title: "आपकी चिकित्सा रिपोर्ट्स",
    description:
      "Health Copilot में अपलोड किए गए दस्तावेज़ देखें और व्यवस्थित करें।",
    all: "सभी",
    lab: "लैब रिपोर्ट",
    prescription: "प्रिस्क्रिप्शन",
    medical: "चिकित्सा रिपोर्ट",
    noReports: "कोई रिपोर्ट नहीं मिली।",
    listenTitle: "सुनकर समझना चाहते हैं?",
    listenText:
      "अपनी चुनी हुई भाषा में अपलोड की गई रिपोर्ट्स का सारांश सुनें।",
    voiceIntro: "आपने ये रिपोर्ट्स अपलोड की हैं:",
  },

  Telugu: {
    back: "వెనుకకు",
    eyebrow: "రిపోర్టులు",
    title: "మీ వైద్య నివేదికలు",
    description:
      "Health Copilotలో మీరు అప్‌లోడ్ చేసిన పత్రాలను చూడండి మరియు క్రమబద్ధీకరించండి.",
    all: "అన్నీ",
    lab: "ల్యాబ్ నివేదిక",
    prescription: "ప్రిస్క్రిప్షన్",
    medical: "వైద్య నివేదిక",
    noReports: "నివేదికలు ఏవీ కనుగొనబడలేదు.",
    listenTitle: "విని తెలుసుకోవాలనుకుంటున్నారా?",
    listenText:
      "మీరు ఎంచుకున్న భాషలో అప్‌లోడ్ చేసిన నివేదికల సారాంశాన్ని వినండి.",
    voiceIntro: "మీరు అప్‌లోడ్ చేసిన నివేదికలు:",
  },

  Malayalam: {
    back: "തിരികെ",
    eyebrow: "റിപ്പോർട്ടുകൾ",
    title: "നിങ്ങളുടെ മെഡിക്കൽ റിപ്പോർട്ടുകൾ",
    description:
      "Health Copilot-ൽ നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത ഡോക്യുമെന്റുകൾ കാണുകയും ക്രമീകരിക്കുകയും ചെയ്യുക.",
    all: "എല്ലാം",
    lab: "ലാബ് റിപ്പോർട്ട്",
    prescription: "പ്രിസ്ക്രിപ്ഷൻ",
    medical: "മെഡിക്കൽ റിപ്പോർട്ട്",
    noReports: "റിപ്പോർട്ടുകളൊന്നും കണ്ടെത്തിയില്ല.",
    listenTitle: "കേട്ട് മനസ്സിലാക്കണോ?",
    listenText:
      "നിങ്ങൾ തിരഞ്ഞെടുത്ത ഭാഷയിൽ അപ്‌ലോഡ് ചെയ്ത റിപ്പോർട്ടുകളുടെ സംഗ്രഹം കേൾക്കുക.",
    voiceIntro: "നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത റിപ്പോർട്ടുകൾ:",
  },

  Kannada: {
    back: "ಹಿಂದೆ",
    eyebrow: "ವರದಿಗಳು",
    title: "ನಿಮ್ಮ ವೈದ್ಯಕೀಯ ವರದಿಗಳು",
    description:
      "Health Copilotನಲ್ಲಿ ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಾಖಲೆಗಳನ್ನು ನೋಡಿ ಮತ್ತು ವ್ಯವಸ್ಥೆಗೊಳಿಸಿ.",
    all: "ಎಲ್ಲವೂ",
    lab: "ಲ್ಯಾಬ್ ವರದಿ",
    prescription: "ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್",
    medical: "ವೈದ್ಯಕೀಯ ವರದಿ",
    noReports: "ಯಾವುದೇ ವರದಿಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
    listenTitle: "ಕೇಳಿ ತಿಳಿದುಕೊಳ್ಳಬೇಕೇ?",
    listenText:
      "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಷೆಯಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ವರದಿಗಳ ಸಾರಾಂಶವನ್ನು ಕೇಳಿ.",
    voiceIntro: "ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ವರದಿಗಳು:",
  },
};

export default function Reports() {
  const navigate = useNavigate();
  const { language } = useApp();

  const text = translations[language] || translations.English;

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
    {
      name: "Discharge Summary",
      date: "20 Sep 2026",
      type: "Medical Report",
    },
  ];

  const [filter, setFilter] = useState("All");

  const filterOptions = [
    { value: "All", label: text.all },
    { value: "Lab Report", label: text.lab },
    { value: "Prescription", label: text.prescription },
    { value: "Medical Report", label: text.medical },
  ];

  const filteredReports = useMemo(() => {
    if (filter === "All") {
      return reports;
    }

    return reports.filter((report) => report.type === filter);
  }, [filter]);

  const spokenReports = `${text.voiceIntro} ${reports
    .map(
      (report) =>
        `${report.name}, ${report.date}, ${report.type}.`
    )
    .join(" ")}`;

  return (
    <div className="app-page premium-reports-page">
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
            <FileText size={26} />
          </div>

          <div>
            <span className="eyebrow">{text.eyebrow}</span>

            <h1>{text.title}</h1>

            <p>{text.description}</p>
          </div>
        </div>

        <div className="card reports-voice-card">
          <div className="reports-voice-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <strong>{text.listenTitle}</strong>
            <p>{text.listenText}</p>
          </div>

          <VoiceButton
            text={spokenReports}
            language={language}
          />
        </div>

        <div className="reports-filter-bar">
          <div className="reports-filter-label">
            <Filter size={17} />
            <span>{text.eyebrow}</span>
          </div>

          <div className="reports-filters">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`filter-button ${
                  filter === option.value ? "active" : ""
                }`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="result-list">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                className="card report-card"
                key={`${report.name}-${report.date}`}
              >
                <div className="report-icon">
                  <FileText size={22} />
                </div>

                <div className="report-info">
                  <h3>{report.name}</h3>

                  <div className="report-meta">
                    <span>
                      <CalendarDays size={15} />
                      {report.date}
                    </span>

                    <span>
                      {report.type === "Lab Report"
                        ? text.lab
                        : report.type === "Prescription"
                        ? text.prescription
                        : text.medical}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card empty-state">
              <p>{text.noReports}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}