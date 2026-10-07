import { useState } from "react";
import { Volume2, Square } from "lucide-react";

const languageCodes = {
  English: "en-IN",
  Tamil: "ta-IN",
  Hindi: "hi-IN",
  Telugu: "te-IN",
  Malayalam: "ml-IN",
  Kannada: "kn-IN",
};

const buttonText = {
  English: {
    listen: "Listen",
    stop: "Stop",
    unsupported: "Voice is not supported in this browser.",
  },

  Tamil: {
    listen: "கேளுங்கள்",
    stop: "நிறுத்து",
    unsupported: "இந்த browser-ல் குரல் ஆதரவு இல்லை.",
  },

  Hindi: {
    listen: "सुनें",
    stop: "रोकें",
    unsupported: "इस ब्राउज़र में वॉइस सुविधा उपलब्ध नहीं है।",
  },

  Telugu: {
    listen: "వినండి",
    stop: "ఆపండి",
    unsupported: "ఈ బ్రౌజర్‌లో వాయిస్ సపోర్ట్ లేదు.",
  },

  Malayalam: {
    listen: "കേൾക്കുക",
    stop: "നിർത്തുക",
    unsupported: "ഈ ബ്രൗസറിൽ വോയ്സ് പിന്തുണ ലഭ്യമല്ല.",
  },

  Kannada: {
    listen: "ಕೇಳಿ",
    stop: "ನಿಲ್ಲಿಸಿ",
    unsupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಬೆಂಬಲವಿಲ್ಲ.",
  },
};

export default function VoiceButton({
  text = "Welcome to your health copilot",
  language = "English",
}) {
  const [speaking, setSpeaking] = useState(false);

  const labels = buttonText[language] || buttonText.English;

  const speak = () => {
    if (!("speechSynthesis" in window)) {
      alert(labels.unsupported);
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = languageCodes[language] || "en-IN";

    utterance.onstart = () => {
      setSpeaking(true);
    };

    utterance.onend = () => {
      setSpeaking(false);
    };

    utterance.onerror = () => {
      setSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <button
      onClick={speaking ? stop : speak}
      className="voice-button"
      type="button"
      aria-label={speaking ? labels.stop : labels.listen}
    >
      {speaking ? (
        <Square size={18} />
      ) : (
        <Volume2 size={18} />
      )}

      <span>
        {speaking ? labels.stop : labels.listen}
      </span>
    </button>
  );
}