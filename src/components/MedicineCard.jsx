import { Pill, Clock, Volume2 } from "lucide-react";
import { useApp } from "../context/AppContext";

const translations = {
  English: {
    source: "Source",
    listen: "Listen",
    frequency: "Frequency",
    timing: "Timing",
  },

  Tamil: {
    source: "மூலம்",
    listen: "கேளுங்கள்",
    frequency: "அடிக்கடி",
    timing: "நேரம்",
  },

  Hindi: {
    source: "स्रोत",
    listen: "सुनें",
    frequency: "आवृत्ति",
    timing: "समय",
  },

  Telugu: {
    source: "మూలం",
    listen: "వినండి",
    frequency: "ఎంత తరచుగా",
    timing: "సమయం",
  },

  Malayalam: {
    source: "ഉറവിടം",
    listen: "കേൾക്കുക",
    frequency: "ആവൃത്തി",
    timing: "സമയം",
  },

  Kannada: {
    source: "ಮೂಲ",
    listen: "ಕೇಳಿ",
    frequency: "ಆವರ್ತನೆ",
    timing: "ಸಮಯ",
  },
};

export default function MedicineCard({
  name,
  dose,
  frequency,
  timing,
  source,
}) {
  const { language } = useApp();

  const text = translations[language] || translations.English;

  const speakMedicine = () => {
    if (!("speechSynthesis" in window)) {
      alert("Voice is not supported in this browser.");
      return;
    }

    const speechText = `${name}, ${dose}, ${frequency}, ${timing}`;

    const speech = new SpeechSynthesisUtterance(speechText);

    const languageCodes = {
      English: "en-IN",
      Tamil: "ta-IN",
      Hindi: "hi-IN",
      Telugu: "te-IN",
      Malayalam: "ml-IN",
      Kannada: "kn-IN",
    };

    speech.lang = languageCodes[language] || "en-IN";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="card medicine-card">
      <div className="medicine-icon">
        <Pill size={22} />
      </div>

      <div className="medicine-info">
        <h3>{name}</h3>

        <p>{dose}</p>

        <div className="medicine-meta">
          <span>
            <Clock size={15} />
            {frequency}
          </span>

          <span>{timing}</span>
        </div>

        <small>
          {text.source}: {source}
        </small>
      </div>

      <button
        className="icon-button"
        onClick={speakMedicine}
        title={text.listen}
        aria-label={text.listen}
        type="button"
      >
        <Volume2 size={18} />
      </button>
    </div>
  );
}