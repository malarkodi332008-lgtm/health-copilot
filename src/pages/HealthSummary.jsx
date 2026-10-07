import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Lightbulb,
  ChevronDown,
} from "lucide-react";
import VoiceButton from "../components/VoiceButton";
import { useApp } from "../context/AppContext";

const translations = {
  English: {
    back: "Back",
    step: "HEALTH SUMMARY",
    title: "A simple explanation of your report.",
    description:
      "This summary organizes information from your uploaded document in simple language.",
    aiSummary: "AI HEALTH SUMMARY",
    summary:
      "Your recent report contains some values that may need attention. These values should be interpreted together with your symptoms, medical history, and the reference range shown on the report.",
    meaning: "What does this mean?",
    meaningText:
      "A value marked for attention does not by itself confirm a medical condition. A qualified healthcare professional can interpret the result in context.",
    recommendations: "Safe next steps",
    recommendation1:
      "Keep the original report available when discussing the results with a healthcare professional.",
    recommendation2:
      "Follow the instructions already provided by your healthcare team.",
    recommendation3:
      "Do not start, stop, or change medicines based only on this AI explanation.",
    voiceTitle: "Prefer listening?",
    voiceText:
      "Listen to the health summary in your selected language.",
    important: "Important:",
    disclaimer:
      "This summary is educational and does not provide a medical diagnosis.",
    viewRecommendations: "View recommendations",
  },

  Tamil: {
    back: "பின்செல்",
    step: "சுகாதார சுருக்கம்",
    title: "உங்கள் அறிக்கைக்கான எளிய விளக்கம்.",
    description:
      "நீங்கள் பதிவேற்றிய ஆவணத்தில் உள்ள தகவல்களை இந்த சுருக்கம் எளிய மொழியில் ஒழுங்குபடுத்துகிறது.",
    aiSummary: "AI சுகாதார சுருக்கம்",
    summary:
      "உங்கள் சமீபத்திய அறிக்கையில் சில மதிப்புகள் கவனிக்கப்பட வேண்டியதாக இருக்கலாம். இந்த மதிப்புகளை உங்கள் அறிகுறிகள், மருத்துவ வரலாறு மற்றும் அறிக்கையில் உள்ள reference range ஆகியவற்றுடன் சேர்த்து புரிந்துகொள்ள வேண்டும்.",
    meaning: "இதன் பொருள் என்ன?",
    meaningText:
      "கவனிக்க வேண்டியதாக குறிக்கப்பட்ட ஒரு மதிப்பு மட்டும் ஒரு நோயை உறுதி செய்யாது. தகுதியான சுகாதார நிபுணர் முடிவை முழு சூழலில் விளக்க முடியும்.",
    recommendations: "பாதுகாப்பான அடுத்த படிகள்",
    recommendation1:
      "சுகாதார நிபுணருடன் முடிவுகளைப் பற்றி பேசும்போது அசல் அறிக்கையை அருகில் வைத்திருக்கவும்.",
    recommendation2:
      "உங்கள் சுகாதார குழு ஏற்கனவே வழங்கிய வழிமுறைகளைப் பின்பற்றவும்.",
    recommendation3:
      "இந்த AI விளக்கத்தை மட்டும் அடிப்படையாகக் கொண்டு மருந்துகளை தொடங்கவோ நிறுத்தவோ மாற்றவோ வேண்டாம்.",
    voiceTitle: "கேட்டு அறிய விரும்புகிறீர்களா?",
    voiceText:
      "நீங்கள் தேர்வு செய்த மொழியில் சுகாதார சுருக்கத்தை கேளுங்கள்.",
    important: "முக்கியம்:",
    disclaimer:
      "இந்த சுருக்கம் கல்வி சார்ந்த தகவல் மட்டுமே; மருத்துவ நோயறிதலை வழங்காது.",
    viewRecommendations: "பரிந்துரைகளைப் பார்க்கவும்",
  },

  Hindi: {
    back: "वापस",
    step: "स्वास्थ्य सारांश",
    title: "आपकी रिपोर्ट की एक सरल व्याख्या।",
    description:
      "यह सारांश आपके अपलोड किए गए दस्तावेज़ की जानकारी को सरल भाषा में व्यवस्थित करता है।",
    aiSummary: "AI स्वास्थ्य सारांश",
    summary:
      "आपकी हाल की रिपोर्ट में कुछ मानों पर ध्यान देने की आवश्यकता हो सकती है। इन मानों को आपके लक्षणों, चिकित्सा इतिहास और रिपोर्ट में दिए गए संदर्भ मानों के साथ समझना चाहिए।",
    meaning: "इसका क्या मतलब है?",
    meaningText:
      "किसी मान का ध्यान देने योग्य होना अपने आप में किसी बीमारी की पुष्टि नहीं करता। योग्य स्वास्थ्य पेशेवर परिणाम को संदर्भ के साथ समझा सकते हैं।",
    recommendations: "सुरक्षित अगले कदम",
    recommendation1:
      "परिणामों पर स्वास्थ्य पेशेवर से बात करते समय मूल रिपोर्ट अपने पास रखें।",
    recommendation2:
      "अपनी स्वास्थ्य टीम द्वारा पहले से दी गई सलाह का पालन करें।",
    recommendation3:
      "केवल इस AI विवरण के आधार पर दवाइयाँ शुरू, बंद या बदलें नहीं।",
    voiceTitle: "सुनकर समझना चाहते हैं?",
    voiceText:
      "अपनी चुनी हुई भाषा में स्वास्थ्य सारांश सुनें।",
    important: "महत्वपूर्ण:",
    disclaimer:
      "यह सारांश केवल शैक्षिक जानकारी है और चिकित्सा निदान प्रदान नहीं करता है।",
    viewRecommendations: "सिफारिशें देखें",
  },

  Telugu: {
    back: "వెనుకకు",
    step: "ఆరోగ్య సారాంశం",
    title: "మీ నివేదికకు సులభమైన వివరణ.",
    description:
      "మీరు అప్‌లోడ్ చేసిన పత్రంలోని సమాచారాన్ని ఈ సారాంశం సులభమైన భాషలో క్రమబద్ధీకరిస్తుంది.",
    aiSummary: "AI ఆరోగ్య సారాంశం",
    summary:
      "మీ తాజా నివేదికలో కొన్ని విలువలకు శ్రద్ధ అవసరం కావచ్చు. ఈ విలువలను మీ లక్షణాలు, వైద్య చరిత్ర మరియు నివేదికలో చూపిన reference range తో కలిసి అర్థం చేసుకోవాలి.",
    meaning: "దీని అర్థం ఏమిటి?",
    meaningText:
      "శ్రద్ధ అవసరమని గుర్తించిన ఒక విలువ మాత్రమే ఏదైనా వైద్య పరిస్థితిని నిర్ధారించదు. అర్హత కలిగిన ఆరోగ్య నిపుణుడు మొత్తం సందర్భంలో ఫలితాన్ని అర్థం చేసుకోగలరు.",
    recommendations: "సురక్షితమైన తదుపరి దశలు",
    recommendation1:
      "ఫలితాల గురించి ఆరోగ్య నిపుణుడితో మాట్లాడేటప్పుడు అసలు నివేదికను దగ్గర ఉంచుకోండి.",
    recommendation2:
      "మీ ఆరోగ్య బృందం ఇప్పటికే ఇచ్చిన సూచనలను పాటించండి.",
    recommendation3:
      "ఈ AI వివరణ ఆధారంగా மட்டுமே మందులను ప్రారంభించవద్దు, ఆపవద్దు அல்லது మార్చవద్దు.",
    voiceTitle: "విని తెలుసుకోవాలనుకుంటున్నారా?",
    voiceText:
      "మీరు ఎంచుకున్న భాషలో ఆరోగ్య సారాంశాన్ని వినండి.",
    important: "ముఖ్యమైనది:",
    disclaimer:
      "ఈ సారాంశం విద్యా సమాచారాన్ని మాత్రమే అందిస్తుంది మరియు వైద్య నిర్ధారణను ఇవ్వదు.",
    viewRecommendations: "సిఫార్సులను చూడండి",
  },

  Malayalam: {
    back: "തിരികെ",
    step: "ആരോഗ്യ സംഗ്രഹം",
    title: "നിങ്ങളുടെ റിപ്പോർട്ടിന്റെ ലളിതമായ വിശദീകരണം.",
    description:
      "നിങ്ങൾ അപ്‌ലോഡ് ചെയ്ത ഡോക്യുമെന്റിലെ വിവരങ്ങൾ ഈ സംഗ്രഹം ലളിതമായ ഭാഷയിൽ ക്രമീകരിക്കുന്നു.",
    aiSummary: "AI ആരോഗ്യ സംഗ്രഹം",
    summary:
      "നിങ്ങളുടെ ഏറ്റവും പുതിയ റിപ്പോർട്ടിലെ ചില മൂല്യങ്ങൾക്ക് ശ്രദ്ധ ആവശ്യമായേക്കാം. ഈ മൂല്യങ്ങൾ നിങ്ങളുടെ ലക്ഷണങ്ങൾ, മെഡിക്കൽ ചരിത്രം, റിപ്പോർട്ടിലെ reference range എന്നിവയുമായി ചേർത്ത് മനസ്സിലാക്കണം.",
    meaning: "ഇതിന്റെ അർത്ഥമെന്താണ്?",
    meaningText:
      "ശ്രദ്ധ ആവശ്യമായതായി അടയാളപ്പെടുത്തിയ ഒരു മൂല്യം മാത്രം ഒരു രോഗസ്ഥിതി സ്ഥിരീകരിക്കില്ല. യോഗ്യനായ ആരോഗ്യ വിദഗ്ധന് ഫലം മുഴുവൻ സാഹചര്യത്തോടൊപ്പം വ്യാഖ്യാനിക്കാനാകും.",
    recommendations: "സുരക്ഷിതമായ അടുത്ത ഘട്ടങ്ങൾ",
    recommendation1:
      "ഫലങ്ങളെക്കുറിച്ച് ആരോഗ്യ വിദഗ്ധനുമായി സംസാരിക്കുമ്പോൾ അസൽ റിപ്പോർട്ട് കൈവശം വയ്ക്കുക.",
    recommendation2:
      "നിങ്ങളുടെ ആരോഗ്യസംഘം ഇതിനകം നൽകിയ നിർദ്ദേശങ്ങൾ പാലിക്കുക.",
    recommendation3:
      "ഈ AI വിശദീകരണം മാത്രം അടിസ്ഥാനമാക്കി മരുന്നുകൾ ആരംഭിക്കുകയോ നിർത്തുകയോ മാറ്റുകയോ ചെയ്യരുത്.",
    voiceTitle: "കേട്ട് മനസ്സിലാക്കണോ?",
    voiceText:
      "നിങ്ങൾ തിരഞ്ഞെടുത്ത ഭാഷയിൽ ആരോഗ്യ സംഗ്രഹം കേൾക്കുക.",
    important: "പ്രധാനപ്പെട്ടത്:",
    disclaimer:
      "ഈ സംഗ്രഹം വിദ്യാഭ്യാസ വിവരങ്ങൾ മാത്രമാണ്; മെഡിക്കൽ രോഗനിർണ്ണയം നൽകുന്നില്ല.",
    viewRecommendations: "ശുപാർശകൾ കാണുക",
  },

  Kannada: {
    back: "ಹಿಂದೆ",
    step: "ಆರೋಗ್ಯ ಸಾರಾಂಶ",
    title: "ನಿಮ್ಮ ವರದಿಯ ಸರಳ ವಿವರಣೆ.",
    description:
      "ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ದಾಖಲೆಯ ಮಾಹಿತಿಯನ್ನು ಈ ಸಾರಾಂಶವು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವ್ಯವಸ್ಥೆಗೊಳಿಸುತ್ತದೆ.",
    aiSummary: "AI ಆರೋಗ್ಯ ಸಾರಾಂಶ",
    summary:
      "ನಿಮ್ಮ ಇತ್ತೀಚಿನ ವರದಿಯಲ್ಲಿನ ಕೆಲವು ಮೌಲ್ಯಗಳಿಗೆ ಗಮನ ಅಗತ್ಯವಾಗಿರಬಹುದು. ಈ ಮೌಲ್ಯಗಳನ್ನು ನಿಮ್ಮ ಲಕ್ಷಣಗಳು, ವೈದ್ಯಕೀಯ ಇತಿಹಾಸ ಮತ್ತು ವರದಿಯಲ್ಲಿರುವ reference range ಜೊತೆಗೆ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಬೇಕು.",
    meaning: "ಇದರ ಅರ್ಥವೇನು?",
    meaningText:
      "ಗಮನ ಅಗತ್ಯವೆಂದು ಗುರುತಿಸಲಾದ ಒಂದು ಮೌಲ್ಯ ಮಾತ್ರ ವೈದ್ಯಕೀಯ ಸ್ಥಿತಿಯನ್ನು ದೃಢಪಡಿಸುವುದಿಲ್ಲ. ಅರ್ಹ ಆರೋಗ್ಯ ವೃತ್ತಿಪರರು ಫಲಿತಾಂಶವನ್ನು ಸಂಪೂರ್ಣ ಸಂದರ್ಭದೊಂದಿಗೆ ಅರ್ಥೈಸಬಹುದು.",
    recommendations: "ಸುರಕ್ಷಿತ ಮುಂದಿನ ಹಂತಗಳು",
    recommendation1:
      "ಫಲಿತಾಂಶಗಳ ಕುರಿತು ಆರೋಗ್ಯ ವೃತ್ತಿಪರರೊಂದಿಗೆ ಮಾತನಾಡುವಾಗ ಮೂಲ ವರದಿಯನ್ನು ಹತ್ತಿರದಲ್ಲಿಡಿ.",
    recommendation2:
      "ನಿಮ್ಮ ಆರೋಗ್ಯ ತಂಡ ಈಗಾಗಲೇ ನೀಡಿರುವ ಸೂಚನೆಗಳನ್ನು ಅನುಸರಿಸಿ.",
    recommendation3:
      "ಈ AI ವಿವರಣೆಯನ್ನು ಮಾತ್ರ ಆಧರಿಸಿ ಔಷಧಿಗಳನ್ನು ಪ್ರಾರಂಭಿಸಬೇಡಿ, ನಿಲ್ಲಿಸಬೇಡಿ ಅಥವಾ ಬದಲಾಯಿಸಬೇಡಿ.",
    voiceTitle: "ಕೇಳಿ ತಿಳಿದುಕೊಳ್ಳಬೇಕೇ?",
    voiceText:
      "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಭಾಷೆಯಲ್ಲಿ ಆರೋಗ್ಯ ಸಾರಾಂಶವನ್ನು ಕೇಳಿ.",
    important: "ಪ್ರಮುಖ:",
    disclaimer:
      "ಈ ಸಾರಾಂಶವು ಶೈಕ್ಷಣಿಕ ಮಾಹಿತಿಗಾಗಿ ಮಾತ್ರ ಮತ್ತು ವೈದ್ಯಕೀಯ ರೋಗನಿರ್ಣಯವನ್ನು ನೀಡುವುದಿಲ್ಲ.",
    viewRecommendations: "ಶಿಫಾರಸುಗಳನ್ನು ನೋಡಿ",
  },
};

export default function HealthSummary() {
  const navigate = useNavigate();
  const { language } = useApp();

  const text = translations[language] || translations.English;

  const spokenSummary = `${text.summary}. ${text.recommendations}. ${text.recommendation1}`;

  return (
    <div className="app-page premium-summary-page">
      <div className="page-container narrow">
        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
          type="button"
        >
          <ArrowLeft size={18} />
          {text.back}
        </button>

        <div className="summary-heading">
          <div className="summary-heading-icon">
            <Sparkles size={26} />
          </div>

          <div>
            <span className="eyebrow">{text.step}</span>

            <h1>{text.title}</h1>

            <p>{text.description}</p>
          </div>
        </div>

        <section className="card premium-summary-card">
          <div className="summary-card-label">
            <Sparkles size={17} />
            <span>{text.aiSummary}</span>
          </div>

          <p className="summary-main-text">
            {text.summary}
          </p>

          <div className="summary-voice">
            <div>
              <strong>{text.voiceTitle}</strong>
              <p>{text.voiceText}</p>
            </div>

            <VoiceButton
              text={spokenSummary}
              language={language}
            />
          </div>
        </section>

        <section className="card meaning-card">
          <details open>
            <summary>
              <span>
                <ChevronDown size={18} />
                {text.meaning}
              </span>
            </summary>

            <p>{text.meaningText}</p>
          </details>
        </section>

        <section className="card recommendations-card">
          <div className="recommendation-heading">
            <div className="recommendation-icon">
              <Lightbulb size={21} />
            </div>

            <div>
              <span className="eyebrow">
                {text.recommendations}
              </span>

              <h2>{text.recommendations}</h2>
            </div>
          </div>

          <div className="recommendation-list">
            <div className="recommendation-item">
              <ShieldCheck size={18} />
              <p>{text.recommendation1}</p>
            </div>

            <div className="recommendation-item">
              <ShieldCheck size={18} />
              <p>{text.recommendation2}</p>
            </div>

            <div className="recommendation-item">
              <ShieldCheck size={18} />
              <p>{text.recommendation3}</p>
            </div>
          </div>

          <button
            className="primary-button"
            onClick={() => navigate("/recommendations")}
            type="button"
          >
            {text.viewRecommendations}
          </button>
        </section>

        <div className="medical-disclaimer">
          <strong>{text.important}</strong> {text.disclaimer}
        </div>
      </div>
    </div>
  );
}