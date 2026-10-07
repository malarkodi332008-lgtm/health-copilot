import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Pill,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import VoiceButton from "../components/VoiceButton";
import MedicineCard from "../components/MedicineCard";

const translations = {
  English: {
    back: "Back",
    eyebrow: "MEDICINES",
    title: "Your medicines",
    description:
      "Review medicine information found in your uploaded prescription.",
    listenTitle: "Prefer listening?",
    listenText:
      "Listen to the medicine information in your selected language.",
    sourceNote: "Source: Uploaded prescription",
    safetyTitle: "Important medicine note",
    safetyText:
      "This information is taken from the uploaded document. Do not start, stop, or change a medicine based only on AI output. Follow your healthcare professional's instructions.",
    empty: "No medicine information found.",
  },

  Tamil: {
    back: "பின்செல்",
    eyebrow: "மருந்துகள்",
    title: "உங்கள் மருந்துகள்",
    description:
      "நீங்கள் பதிவேற்றிய மருந்துச் சீட்டிலிருந்து கிடைத்த மருந்து தகவல்களை சரிபார்க்கவும்.",
    listenTitle: "கேட்டு அறிய விரும்புகிறீர்களா?",
    listenText:
      "நீங்கள் தேர்வு செய்த மொழியில் மருந்து தகவல்களை கேளுங்கள்.",
    sourceNote: "மூலம்: பதிவேற்றிய மருந்துச் சீட்டு",
    safetyTitle: "முக்கியமான மருந்து குறிப்பு",
    safetyText:
      "இந்த தகவல்கள் நீங்கள் பதிவேற்றிய ஆவணத்திலிருந்து எடுக்கப்பட்டவை. AI தகவலை மட்டும் அடிப்படையாகக் கொண்டு மருந்தை தொடங்கவோ, நிறுத்தவோ அல்லது மாற்றவோ வேண்டாம். உங்கள் சுகாதார நிபுணரின் வழிமுறைகளைப் பின்பற்றுங்கள்.",
    empty: "மருந்து தகவல்கள் எதுவும் கிடைக்கவில்லை.",
  },

  Hindi: {
    back: "वापस",
    eyebrow: "दवाइयाँ",
    title: "आपकी दवाइयाँ",
    description:
      "अपलोड किए गए प्रिस्क्रिप्शन में मिली दवा की जानकारी की समीक्षा करें।",
    listenTitle: "सुनकर समझना चाहते हैं?",
    listenText:
      "अपनी चुनी हुई भाषा में दवा की जानकारी सुनें।",
    sourceNote: "स्रोत: अपलोड किया गया प्रिस्क्रिप्शन",
    safetyTitle: "महत्वपूर्ण दवा नोट",
    safetyText:
      "यह जानकारी आपके अपलोड किए गए दस्तावेज़ से ली गई है। केवल AI जानकारी के आधार पर दवा शुरू, बंद या बदलें नहीं। अपने स्वास्थ्य पेशेवर की सलाह का पालन करें।",
    empty: "दवा की कोई जानकारी नहीं मिली।",
  },

  Telugu: {
    back: "వెనుకకు",
    eyebrow: "మందులు",
    title: "మీ మందులు",
    description:
      "మీరు అప్‌లోడ్ చేసిన ప్రిస్క్రిప్షన్‌లో కనిపించిన మందుల సమాచారాన్ని సమీక్షించండి.",
    listenTitle: "విని తెలుసుకోవాలనుకుంటున్నారా?",
    listenText:
      "మీరు ఎంచుకున్న భాషలో మందుల సమాచారాన్ని వినండి.",
    sourceNote: "మూలం: అప్‌లోడ్ చేసిన ప్రిస్క్రిప్షన్",
    safetyTitle: "ముఖ్యమైన మందుల గమనిక",
    safetyText:
      "ఈ సమాచారం మీరు అప్‌లోడ్ చేసిన పత్రం నుండి తీసుకోబడింది. AI సమాచారం ఆధారంగా మాత్రమే మందులను ప్రారంభించవద్దు, ఆపవద్దు లేదా మార్చవద్దు. మీ ఆరోగ్య నిపుణుడి సూచనలను పాటించండి.",
    empty: "మందుల సమాచారం ఏదీ కనుగొనబడలేదు.",
  },

  Malayalam: {
    back: "തിരികെ",
    eyebrow: "മരുന്നുകൾ",
    title: "നിങ്ങളുടെ മരുന്നുകൾ",
    description:
      "നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത പ്രിസ്ക്രിപ്ഷനിൽ നിന്നുള്ള മരുന്ന് വിവരങ്ങൾ പരിശോധിക്കുക.",
    listenTitle: "കേട്ട് മനസ്സിലാക്കണോ?",
    listenText:
      "നിങ്ങൾ തിരഞ്ഞെടുത്ത ഭാഷയിൽ മരുന്ന് വിവരങ്ങൾ കേൾക്കുക.",
    sourceNote: "ഉറവിടം: അപ്‌ലോഡ് ചെയ്ത പ്രിസ്ക്രിപ്ഷൻ",
    safetyTitle: "പ്രധാനപ്പെട്ട മരുന്ന് കുറിപ്പ്",
    safetyText:
      "ഈ വിവരങ്ങൾ നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത ഡോക്യുമെന്റിൽ നിന്നാണ് എടുത്തത്. AI വിവരങ്ങൾ മാത്രം അടിസ്ഥാനമാക്കി മരുന്നുകൾ ആരംഭിക്കുകയോ നിർത്തുകയോ മാറ്റുകയോ ചെയ്യരുത്. നിങ്ങളുടെ ആരോഗ്യ വിദഗ്ധന്റെ നിർദ്ദേശങ്ങൾ പാലിക്കുക.",
    empty: "മരുന്ന് വിവരങ്ങളൊന്നും കണ്ടെത്തിയില്ല.",
  },

  Kannada: {
    back: "ಹಿಂದೆ",
    eyebrow: "ಔಷಧಿಗಳು",
    title: "ನಿಮ್ಮ ಔಷಧಿಗಳು",
    description:
      "ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ನಲ್ಲಿ ಕಂಡುಬಂದ ಔಷಧಿ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    listenTitle: "ಕೇಳಿ ತಿಳಿದುಕೊಳ್ಳಬೇಕೇ?",
    listenText:
      "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಷೆಯಲ್ಲಿ ಔಷಧಿ ಮಾಹಿತಿಯನ್ನು ಕೇಳಿ.",
    sourceNote: "ಮೂಲ: ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್",
    safetyTitle: "ಪ್ರಮುಖ ಔಷಧಿ ಸೂಚನೆ",
    safetyText:
      "ಈ ಮಾಹಿತಿಯನ್ನು ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಾಖಲೆಯಿಂದ ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆ. AI ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ಆಧರಿಸಿ ಔಷಧಿಯನ್ನು ಪ್ರಾರಂಭಿಸಬೇಡಿ, ನಿಲ್ಲಿಸಬೇಡಿ ಅಥವಾ ಬದಲಾಯಿಸಬೇಡಿ. ನಿಮ್ಮ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರ ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ.",
    empty: "ಯಾವುದೇ ಔಷಧಿ ಮಾಹಿತಿ ಕಂಡುಬಂದಿಲ್ಲ.",
  },
};

export default function Medicines() {
  const navigate = useNavigate();
  const { language } = useApp();

  const text = translations[language] || translations.English;

  const medicines = [
    {
      name: "Paracetamol",
      dose: "500 mg",
      frequency: "Twice daily",
      timing: "After food",
      source: "Prescription",
    },
  ];

  const voiceText =
    medicines.length > 0
      ? medicines
          .map(
            (medicine) =>
              `${medicine.name}, ${medicine.dose}, ${medicine.frequency}, ${medicine.timing}.`
          )
          .join(" ")
      : text.empty;

  return (
    <div className="app-page premium-medicines-page">
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
            <Pill size={26} />
          </div>

          <div>
            <span className="eyebrow">{text.eyebrow}</span>

            <h1>{text.title}</h1>

            <p>{text.description}</p>
          </div>
        </div>

        <div className="card medicine-voice-card">
          <div className="medicine-voice-icon">
            <Sparkles size={20} />
          </div>

          <div>
            <strong>{text.listenTitle}</strong>
            <p>{text.listenText}</p>
          </div>

          <VoiceButton
            text={voiceText}
            language={language}
          />
        </div>

        <div className="result-list">
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <MedicineCard
                key={medicine.name}
                {...medicine}
              />
            ))
          ) : (
            <div className="card empty-state">
              <p>{text.empty}</p>
            </div>
          )}
        </div>

        <div className="medicine-source-note">
          <span>{text.sourceNote}</span>
        </div>

        <div className="medical-disclaimer medicine-safety-note">
          <ShieldCheck size={18} />
          <div>
            <strong>{text.safetyTitle}</strong>
            <p>{text.safetyText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}