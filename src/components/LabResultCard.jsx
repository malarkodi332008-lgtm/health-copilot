import { FlaskConical, ChevronRight } from "lucide-react";
import { useApp } from "../context/AppContext";

const translations = {
  English: {
    normal: "Normal",
    attention: "Needs Attention",
    meaning: "What does this mean?",
  },

  Tamil: {
    normal: "இயல்பானது",
    attention: "கவனம் தேவை",
    meaning: "இதன் பொருள் என்ன?",
  },

  Hindi: {
    normal: "सामान्य",
    attention: "ध्यान देने की आवश्यकता",
    meaning: "इसका क्या मतलब है?",
  },

  Telugu: {
    normal: "సాధారణం",
    attention: "శ్రద్ధ అవసరం",
    meaning: "దీని అర్థం ఏమిటి?",
  },

  Malayalam: {
    normal: "സാധാരണ",
    attention: "ശ്രദ്ധ ആവശ്യമാണ്",
    meaning: "ഇതിന്റെ അർത്ഥമെന്താണ്?",
  },

  Kannada: {
    normal: "ಸಾಮಾನ್ಯ",
    attention: "ಗಮನ ಅಗತ್ಯ",
    meaning: "ಇದರ ಅರ್ಥವೇನು?",
  },
};

export default function LabResultCard({
  name,
  value,
  unit,
  status,
  explanation,
}) {
  const { language } = useApp();

  const text = translations[language] || translations.English;

  const attention = status === "Needs Attention";

  const displayStatus = attention
    ? text.attention
    : text.normal;

  return (
    <div className="card lab-card">
      <div className="lab-icon">
        <FlaskConical size={20} />
      </div>

      <div className="lab-main">
        <div className="lab-title-row">
          <div>
            <h3>{name}</h3>
            <p>
              {value} {unit}
            </p>
          </div>

          <span
            className={`status ${
              attention ? "attention" : "normal"
            }`}
          >
            {displayStatus}
          </span>
        </div>

        {explanation && (
          <details className="explanation">
            <summary>
              {text.meaning}
              <ChevronRight size={16} />
            </summary>

            <p>{explanation}</p>
          </details>
        )}
      </div>
    </div>
  );
}