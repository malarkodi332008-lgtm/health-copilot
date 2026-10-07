import { ArrowRight, Sparkles } from "lucide-react";
import { useApp } from "../context/AppContext";

const translations = {
  English: {
    badge: "AI Summary",
    title: "Your health report summary",
    description:
      "Your recent report has been reviewed. A few values may need attention, while some results are within the expected range.",
    button: "View full summary",
  },

  Tamil: {
    badge: "AI சுருக்கம்",
    title: "உங்கள் சுகாதார அறிக்கை சுருக்கம்",
    description:
      "உங்கள் சமீபத்திய அறிக்கை மதிப்பாய்வு செய்யப்பட்டுள்ளது. சில மதிப்புகள் கவனிக்கப்பட வேண்டியதாக இருக்கலாம், சில முடிவுகள் எதிர்பார்க்கப்படும் வரம்பில் உள்ளன.",
    button: "முழு சுருக்கத்தைப் பார்க்கவும்",
  },

  Hindi: {
    badge: "AI सारांश",
    title: "आपकी स्वास्थ्य रिपोर्ट का सारांश",
    description:
      "आपकी हाल की रिपोर्ट की समीक्षा की गई है। कुछ मानों पर ध्यान देने की आवश्यकता हो सकती है, जबकि कुछ परिणाम अपेक्षित सीमा में हैं।",
    button: "पूरा सारांश देखें",
  },

  Telugu: {
    badge: "AI సారాంశం",
    title: "మీ ఆరోగ్య నివేదిక సారాంశం",
    description:
      "మీ తాజా నివేదిక సమీక్షించబడింది. కొన్ని విలువలకు శ్రద్ధ అవసరం కావచ్చు, మరికొన్ని ఫలితాలు ఆశించిన పరిధిలో ఉన్నాయి.",
    button: "పూర్తి సారాంశాన్ని చూడండి",
  },

  Malayalam: {
    badge: "AI സംഗ്രഹം",
    title: "നിങ്ങളുടെ ആരോഗ്യ റിപ്പോർട്ട് സംഗ്രഹം",
    description:
      "നിങ്ങളുടെ ഏറ്റവും പുതിയ റിപ്പോർട്ട് പരിശോധിച്ചു. ചില മൂല്യങ്ങൾക്ക് ശ്രദ്ധ ആവശ്യമായേക്കാം, ചില ഫലങ്ങൾ പ്രതീക്ഷിക്കുന്ന പരിധിയിലാണ്.",
    button: "പൂർണ്ണ സംഗ്രഹം കാണുക",
  },

  Kannada: {
    badge: "AI ಸಾರಾಂಶ",
    title: "ನಿಮ್ಮ ಆರೋಗ್ಯ ವರದಿ ಸಾರಾಂಶ",
    description:
      "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ವರದಿಯನ್ನು ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ಕೆಲವು ಮೌಲ್ಯಗಳಿಗೆ ಗಮನ ಅಗತ್ಯವಾಗಿರಬಹುದು, ಕೆಲವು ಫಲಿತಾಂಶಗಳು ನಿರೀಕ್ಷಿತ ವ್ಯಾಪ್ತಿಯಲ್ಲಿವೆ.",
    button: "ಪೂರ್ಣ ಸಾರಾಂಶ ನೋಡಿ",
  },
};

export default function SummaryCard({ onClick }) {
  const { language } = useApp();

  const text = translations[language] || translations.English;

  return (
    <div className="card summary-card">
      <div className="card-top">
        <div className="icon-box blue">
          <Sparkles size={22} />
        </div>

        <span className="ai-badge">
          {text.badge}
        </span>
      </div>

      <h3>{text.title}</h3>

      <p>{text.description}</p>

      <button
        className="text-button"
        onClick={onClick}
        type="button"
      >
        {text.button}
        <ArrowRight size={17} />
      </button>
    </div>
  );
}