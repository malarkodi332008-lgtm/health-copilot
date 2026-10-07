import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mic,
  ShieldCheck,
  FileText,
  Sparkles,
} from "lucide-react";
import UploadCard from "../components/UploadCard";
import VoiceButton from "../components/VoiceButton";
import { useApp } from "../context/AppContext";

const translations = {
  English: {
    step: "STEP 1 OF 4",
    title: "Bring your report to life.",
    description:
      "Upload a medical document and let Health Copilot organize the important information for you.",
    aiExtraction: "AI-assisted extraction",
    reviewBefore: "Review before analysis",
    formats: "JPG, PNG or PDF",
    listening: "Prefer listening?",
    voiceDescription:
      "Listen to the upload instructions in your selected language.",
    security:
      "Always upload documents you are comfortable using in this prototype. Verify extracted information before continuing.",
    demo:
      "Demo note: This prototype uses mock AI extraction and does not provide a medical diagnosis.",
    back: "Back",
    voice:
      "Select your document type, then upload a JPG, PNG or PDF file. You can review the extracted information before continuing.",
  },

  Tamil: {
    step: "படி 1 / 4",
    title: "உங்கள் அறிக்கையை எளிதாக புரிந்துகொள்ள தொடங்குங்கள்.",
    description:
      "ஒரு மருத்துவ ஆவணத்தை பதிவேற்றுங்கள். முக்கியமான தகவல்களை Health Copilot ஒழுங்குபடுத்தும்.",
    aiExtraction: "AI மூலம் தகவல் பிரித்தெடுப்பு",
    reviewBefore: "பகுப்பாய்வுக்கு முன் சரிபார்ப்பு",
    formats: "JPG, PNG அல்லது PDF",
    listening: "கேட்டு வழிகாட்டுதலை பெற விரும்புகிறீர்களா?",
    voiceDescription:
      "நீங்கள் தேர்வு செய்த மொழியில் பதிவேற்ற வழிமுறைகளை கேளுங்கள்.",
    security:
      "இந்த prototype-ல் நீங்கள் பயன்படுத்த விரும்பும் ஆவணங்களை மட்டும் பதிவேற்றுங்கள். தொடர்வதற்கு முன் எடுக்கப்பட்ட தகவல்களை சரிபார்க்கவும்.",
    demo:
      "Demo குறிப்பு: இந்த prototype mock AI extraction-ஐ பயன்படுத்துகிறது மற்றும் மருத்துவ நோயறிதலை வழங்காது.",
    back: "பின்செல்",
    voice:
      "உங்கள் ஆவண வகையைத் தேர்ந்தெடுத்து, JPG, PNG அல்லது PDF கோப்பை பதிவேற்றுங்கள். தொடர்ந்து செல்லும் முன் எடுக்கப்பட்ட தகவல்களை சரிபார்க்கலாம்.",
  },

  Hindi: {
    step: "चरण 1 / 4",
    title: "अपनी रिपोर्ट को समझना शुरू करें।",
    description:
      "एक स्वास्थ्य दस्तावेज़ अपलोड करें और Health Copilot आपके लिए महत्वपूर्ण जानकारी व्यवस्थित करेगा।",
    aiExtraction: "AI द्वारा जानकारी निकालना",
    reviewBefore: "विश्लेषण से पहले समीक्षा",
    formats: "JPG, PNG या PDF",
    listening: "सुनकर मार्गदर्शन चाहते हैं?",
    voiceDescription:
      "अपनी चुनी हुई भाषा में अपलोड निर्देश सुनें।",
    security:
      "इस प्रोटोटाइप में केवल वे दस्तावेज़ अपलोड करें जिनका उपयोग करना आपको ठीक लगता है। आगे बढ़ने से पहले निकाली गई जानकारी की समीक्षा करें।",
    demo:
      "डेमो नोट: यह प्रोटोटाइप mock AI extraction का उपयोग करता है और चिकित्सा निदान प्रदान नहीं करता।",
    back: "वापस",
    voice:
      "अपना दस्तावेज़ प्रकार चुनें, फिर JPG, PNG या PDF फ़ाइल अपलोड करें। आगे बढ़ने से पहले निकाली गई जानकारी की समीक्षा करें।",
  },

  Telugu: {
    step: "దశ 1 / 4",
    title: "మీ నివేదికను సులభంగా అర్థం చేసుకోవడం ప్రారంభించండి.",
    description:
      "ఆరోగ్య పత్రాన్ని అప్‌లోడ్ చేయండి. Health Copilot మీ కోసం ముఖ్యమైన సమాచారాన్ని సక్రమంగా నిర్వహిస్తుంది.",
    aiExtraction: "AI సహాయంతో సమాచారం సేకరణ",
    reviewBefore: "విశ్లేషణకు ముందు సమీక్ష",
    formats: "JPG, PNG లేదా PDF",
    listening: "విని మార్గదర్శనం పొందాలనుకుంటున్నారా?",
    voiceDescription:
      "మీరు ఎంచుకున్న భాషలో అప్‌లోడ్ సూచనలను వినండి.",
    security:
      "ఈ ప్రోటోటైప్‌లో మీరు ఉపయోగించడానికి సౌకర్యంగా ఉన్న పత్రాలను మాత్రమే అప్‌లోడ్ చేయండి. కొనసాగించే ముందు తీసుకున్న సమాచారాన్ని సమీక్షించండి.",
    demo:
      "డెమో గమనిక: ఈ ప్రోటోటైప్ mock AI extraction ఉపయోగిస్తుంది మరియు వైద్య నిర్ధారణను అందించదు.",
    back: "వెనుకకు",
    voice:
      "మీ పత్ర రకాన్ని ఎంచుకుని, JPG, PNG లేదా PDF ఫైల్‌ను అప్‌లోడ్ చేయండి. కొనసాగించే ముందు తీసుకున్న సమాచారాన్ని సమీక్షించవచ్చు.",
  },

  Malayalam: {
    step: "ഘട്ടം 1 / 4",
    title: "നിങ്ങളുടെ റിപ്പോർട്ട് എളുപ്പത്തിൽ മനസ്സിലാക്കാൻ തുടങ്ങൂ.",
    description:
      "ഒരു ആരോഗ്യ ഡോക്യുമെന്റ് അപ്‌ലോഡ് ചെയ്യുക. Health Copilot പ്രധാന വിവരങ്ങൾ ക്രമീകരിക്കും.",
    aiExtraction: "AI സഹായത്തോടെയുള്ള വിവര ശേഖരണം",
    reviewBefore: "വിശകലനത്തിന് മുമ്പ് പരിശോധിക്കുക",
    formats: "JPG, PNG അല്ലെങ്കിൽ PDF",
    listening: "കേട്ട് മാർഗനിർദ്ദേശം വേണോ?",
    voiceDescription:
      "നിങ്ങൾ തിരഞ്ഞെടുത്ത ഭാഷയിൽ അപ്‌ലോഡ് നിർദ്ദേശങ്ങൾ കേൾക്കുക.",
    security:
      "ഈ പ്രോട്ടോടൈപ്പിൽ നിങ്ങൾക്ക് ഉപയോഗിക്കാൻ സൗകര്യമുള്ള രേഖകൾ മാത്രം അപ്‌ലോഡ് ചെയ്യുക. തുടരുന്നതിന് മുമ്പ് എടുത്ത വിവരങ്ങൾ പരിശോധിക്കുക.",
    demo:
      "ഡെമോ കുറിപ്പ്: ഈ പ്രോട്ടോടൈപ്പ് mock AI extraction ഉപയോഗിക്കുന്നു, മെഡിക്കൽ രോഗനിർണ്ണയം നൽകുന്നില്ല.",
    back: "തിരികെ",
    voice:
      "നിങ്ങളുടെ ഡോക്യുമെന്റ് തരം തിരഞ്ഞെടുക്കുക, തുടർന്ന് JPG, PNG അല്ലെങ്കിൽ PDF ഫയൽ അപ്‌ലോഡ് ചെയ്യുക. തുടരുന്നതിന് മുമ്പ് എടുത്ത വിവരങ്ങൾ പരിശോധിക്കാം.",
  },

  Kannada: {
    step: "ಹಂತ 1 / 4",
    title: "ನಿಮ್ಮ ವರದಿಯನ್ನು ಸುಲಭವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಪ್ರಾರಂಭಿಸಿ.",
    description:
      "ಆರೋಗ್ಯ ದಾಖಲೆಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. Health Copilot ನಿಮಗಾಗಿ ಮುಖ್ಯ ಮಾಹಿತಿಯನ್ನು ವ್ಯವಸ್ಥೆಗೊಳಿಸುತ್ತದೆ.",
    aiExtraction: "AI ಸಹಾಯದಿಂದ ಮಾಹಿತಿ ಸಂಗ್ರಹಣೆ",
    reviewBefore: "ವಿಶ್ಲೇಷಣೆಗೆ ಮೊದಲು ಪರಿಶೀಲನೆ",
    formats: "JPG, PNG ಅಥವಾ PDF",
    listening: "ಕೇಳಿ ಮಾರ್ಗದರ್ಶನ ಬೇಕೇ?",
    voiceDescription:
      "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಷೆಯಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಸೂಚನೆಗಳನ್ನು ಕೇಳಿ.",
    security:
      "ಈ ಪ್ರೋಟೋಟೈಪ್‌ನಲ್ಲಿ ನಿಮಗೆ ಬಳಸಲು ಅನುಕೂಲವಾಗಿರುವ ದಾಖಲೆಗಳನ್ನು ಮಾತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ಮುಂದುವರಿಯುವ ಮೊದಲು ತೆಗೆದ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.",
    demo:
      "ಡೆಮೋ ಸೂಚನೆ: ಈ ಪ್ರೋಟೋಟೈಪ್ mock AI extraction ಬಳಸುತ್ತದೆ ಮತ್ತು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವನ್ನು ನೀಡುವುದಿಲ್ಲ.",
    back: "ಹಿಂದೆ",
    voice:
      "ನಿಮ್ಮ ದಾಖಲೆ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ, ನಂತರ JPG, PNG ಅಥವಾ PDF ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ಮುಂದುವರಿಯುವ ಮೊದಲು ತೆಗೆದ ಮಾಹಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಬಹುದು.",
  },
};

export default function UploadReports() {
  const navigate = useNavigate();
  const { language } = useApp();

  const text = translations[language] || translations.English;

  const handleContinue = (documentData) => {
    navigate("/analysis", {
      state: documentData,
    });
  };

  return (
    <div className="app-page premium-upload-page">
      <div className="page-container narrow">
        <button
          className="back-button"
          onClick={() => navigate("/welcome")}
          type="button"
        >
          <ArrowLeft size={18} />
          {text.back}
        </button>

        <div className="upload-hero">
          <div className="upload-hero-icon">
            <FileText size={26} />
          </div>

          <div>
            <span className="eyebrow">{text.step}</span>

            <h1>{text.title}</h1>

            <p>{text.description}</p>
          </div>
        </div>

        <div className="upload-benefits">
          <div>
            <Sparkles size={17} />
            <span>{text.aiExtraction}</span>
          </div>

          <div>
            <ShieldCheck size={17} />
            <span>{text.reviewBefore}</span>
          </div>

          <div>
            <FileText size={17} />
            <span>{text.formats}</span>
          </div>
        </div>

        <UploadCard onContinue={handleContinue} />

        <div className="voice-tip premium-tip">
          <div className="tip-icon">
            <Mic size={19} />
          </div>

          <div>
            <strong>{text.listening}</strong>

            <p>{text.voiceDescription}</p>

            <VoiceButton
              text={text.voice}
              language={language}
            />
          </div>
        </div>

        <div className="upload-security">
          <ShieldCheck size={17} />

          <span>{text.security}</span>
        </div>

        <p className="disclaimer">{text.demo}</p>
      </div>
    </div>
  );
}