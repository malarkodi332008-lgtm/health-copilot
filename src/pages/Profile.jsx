import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserRound,
  Volume2,
  ShieldCheck,
  LockKeyhole,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const translations = {
  English: {
    back: "Back",
    eyebrow: "PROFILE",
    title: "Your profile",
    description: "Manage your personal settings and accessibility preferences.",
    personal: "Personal information",
    name: "Name",
    age: "Age",
    mobile: "Mobile number",
    language: "Preferred language",
    voice: "Voice support",
    voiceDescription: "Use voice guidance throughout the app.",
    simpleMode: "Simple Mode",
    simpleDescription:
      "Use larger text, simpler labels, and a more focused layout.",
    privacy: "Privacy",
    privacyDescription:
      "Only the information needed for this prototype is used.",
    pin: "PIN",
    pinDescription: "Your profile PIN is kept private.",
    logout: "Log out",
    enabled: "Enabled",
    save: "Settings are saved automatically.",
  },

  Tamil: {
    back: "பின்செல்",
    eyebrow: "சுயவிவரம்",
    title: "உங்கள் சுயவிவரம்",
    description: "உங்கள் தனிப்பட்ட அமைப்புகள் மற்றும் அணுகல் விருப்பங்களை நிர்வகிக்கவும்.",
    personal: "தனிப்பட்ட தகவல்",
    name: "பெயர்",
    age: "வயது",
    mobile: "மொபைல் எண்",
    language: "விருப்ப மொழி",
    voice: "குரல் ஆதரவு",
    voiceDescription: "App முழுவதும் குரல் வழிகாட்டுதலைப் பயன்படுத்தவும்.",
    simpleMode: "எளிய பயன்முறை",
    simpleDescription:
      "பெரிய எழுத்துகள், எளிய சொற்கள் மற்றும் எளிமையான அமைப்பைப் பயன்படுத்தவும்.",
    privacy: "தனியுரிமை",
    privacyDescription:
      "இந்த prototype-க்கு தேவையான தகவல்கள் மட்டுமே பயன்படுத்தப்படுகின்றன.",
    pin: "PIN",
    pinDescription: "உங்கள் profile PIN தனிப்பட்டதாக வைக்கப்படுகிறது.",
    logout: "வெளியேறு",
    enabled: "இயக்கப்பட்டுள்ளது",
    save: "அமைப்புகள் தானாக சேமிக்கப்படும்.",
  },

  Hindi: {
    back: "वापस",
    eyebrow: "प्रोफ़ाइल",
    title: "आपकी प्रोफ़ाइल",
    description: "अपनी व्यक्तिगत सेटिंग्स और एक्सेसिबिलिटी विकल्प प्रबंधित करें।",
    personal: "व्यक्तिगत जानकारी",
    name: "नाम",
    age: "आयु",
    mobile: "मोबाइल नंबर",
    language: "पसंदीदा भाषा",
    voice: "वॉइस सहायता",
    voiceDescription: "पूरे ऐप में वॉइस मार्गदर्शन का उपयोग करें।",
    simpleMode: "सिंपल मोड",
    simpleDescription:
      "बड़ा टेक्स्ट, आसान शब्द और अधिक सरल लेआउट का उपयोग करें।",
    privacy: "गोपनीयता",
    privacyDescription:
      "इस प्रोटोटाइप के लिए आवश्यक जानकारी का ही उपयोग किया जाता है।",
    pin: "PIN",
    pinDescription: "आपका प्रोफ़ाइल PIN निजी रखा जाता है।",
    logout: "लॉग आउट",
    enabled: "सक्षम",
    save: "सेटिंग्स अपने आप सेव होती हैं।",
  },

  Telugu: {
    back: "వెనుకకు",
    eyebrow: "ప్రొఫైల్",
    title: "మీ ప్రొఫైల్",
    description: "మీ వ్యక్తిగత సెట్టింగ్‌లు మరియు యాక్సెసిబిలిటీ ఎంపికలను నిర్వహించండి.",
    personal: "వ్యక్తిగత సమాచారం",
    name: "పేరు",
    age: "వయస్సు",
    mobile: "మొబైల్ నంబర్",
    language: "ఇష్టమైన భాష",
    voice: "వాయిస్ సహాయం",
    voiceDescription: "యాప్ అంతటా వాయిస్ మార్గదర్శకాన్ని ఉపయోగించండి.",
    simpleMode: "సింపుల్ మోడ్",
    simpleDescription:
      "పెద్ద అక్షరాలు, సులభమైన పదాలు మరియు సరళమైన లేఅవుట్ ఉపయోగించండి.",
    privacy: "గోప్యత",
    privacyDescription:
      "ఈ ప్రోటోటైప్‌కు అవసరమైన సమాచారం మాత్రమే ఉపయోగించబడుతుంది.",
    pin: "PIN",
    pinDescription: "మీ ప్రొఫైల్ PIN గోప్యంగా ఉంచబడుతుంది.",
    logout: "లాగ్ అవుట్",
    enabled: "ప్రారంభించబడింది",
    save: "సెట్టింగ్‌లు ఆటోమేటిక్‌గా సేవ్ అవుతాయి.",
  },

  Malayalam: {
    back: "തിരികെ",
    eyebrow: "പ്രൊഫൈൽ",
    title: "നിങ്ങളുടെ പ്രൊഫൈൽ",
    description: "നിങ്ങളുടെ വ്യക്തിഗത ക്രമീകരണങ്ങളും ആക്‌സസിബിലിറ്റി ഓപ്ഷനുകളും നിയന്ത്രിക്കുക.",
    personal: "വ്യക്തിഗത വിവരങ്ങൾ",
    name: "പേര്",
    age: "വയസ്സ്",
    mobile: "മൊബൈൽ നമ്പർ",
    language: "ഇഷ്ടപ്പെട്ട ഭാഷ",
    voice: "വോയ്സ് സഹായം",
    voiceDescription: "ആപ്പിലുടനീളം വോയ്സ് മാർഗനിർദ്ദേശം ഉപയോഗിക്കുക.",
    simpleMode: "സിംപിൾ മോഡ്",
    simpleDescription:
      "വലിയ ടെക്സ്റ്റും ലളിതമായ വാക്കുകളും കൂടുതൽ ലളിതമായ ലേഔട്ടും ഉപയോഗിക്കുക.",
    privacy: "സ്വകാര്യത",
    privacyDescription:
      "ഈ പ്രോട്ടോടൈപ്പിന് ആവശ്യമായ വിവരങ്ങൾ മാത്രമാണ് ഉപയോഗിക്കുന്നത്.",
    pin: "PIN",
    pinDescription: "നിങ്ങളുടെ പ്രൊഫൈൽ PIN സ്വകാര്യമായി സൂക്ഷിക്കുന്നു.",
    logout: "ലോഗ് ഔട്ട്",
    enabled: "പ്രവർത്തനക്ഷമം",
    save: "ക്രമീകരണങ്ങൾ സ്വയമേവ സംരക്ഷിക്കും.",
  },

  Kannada: {
    back: "ಹಿಂದೆ",
    eyebrow: "ಪ್ರೊಫೈಲ್",
    title: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್",
    description: "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಮತ್ತು ಪ್ರವೇಶ ಆಯ್ಕೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.",
    personal: "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ",
    name: "ಹೆಸರು",
    age: "ವಯಸ್ಸು",
    mobile: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    language: "ಆದ್ಯತೆಯ ಭಾಷೆ",
    voice: "ಧ್ವನಿ ಸಹಾಯ",
    voiceDescription: "ಆ್ಯಪ್‌ನಾದ್ಯಂತ ಧ್ವನಿ ಮಾರ್ಗದರ್ಶನವನ್ನು ಬಳಸಿ.",
    simpleMode: "ಸಿಂಪಲ್ ಮೋಡ್",
    simpleDescription:
      "ದೊಡ್ಡ ಅಕ್ಷರಗಳು, ಸರಳ ಪದಗಳು ಮತ್ತು ಸರಳ ಲೇಔಟ್ ಬಳಸಿ.",
    privacy: "ಗೌಪ್ಯತೆ",
    privacyDescription:
      "ಈ ಪ್ರೋಟೋಟೈಪ್‌ಗೆ ಅಗತ್ಯವಿರುವ ಮಾಹಿತಿಯನ್ನು ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ.",
    pin: "PIN",
    pinDescription: "ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ PIN ಖಾಸಗಿಯಾಗಿ ಇರಿಸಲಾಗುತ್ತದೆ.",
    logout: "ಲಾಗ್ ಔಟ್",
    enabled: "ಸಕ್ರಿಯವಾಗಿದೆ",
    save: "ಸೆಟ್ಟಿಂಗ್‌ಗಳು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಉಳಿಸಲಾಗುತ್ತದೆ.",
  },
};

export default function Profile() {
  const navigate = useNavigate();
  const {
    profile,
    setProfile,
    language,
    setLanguage,
  } = useApp();

  const text = translations[language] || translations.English;

  const [simpleMode, setSimpleMode] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const maskedMobile = profile.mobile
    ? `${"*".repeat(Math.max(0, profile.mobile.length - 4))}${profile.mobile.slice(-4)}`
    : "**********";

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="app-page premium-profile-page">
      <div className="page-container">
        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
          type="button"
        >
          <ArrowLeft size={18} />
          {text.back}
        </button>

        <div className="profile-page-heading">
          <div className="profile-heading-icon">
            <UserRound size={26} />
          </div>

          <div>
            <span className="eyebrow">{text.eyebrow}</span>
            <h1>{text.title}</h1>
            <p>{text.description}</p>
          </div>
        </div>

        <div className="profile-grid">
          <section className="card profile-card">
            <div className="profile-card-heading">
              <div className="profile-section-icon">
                <UserRound size={19} />
              </div>

              <div>
                <span className="eyebrow">{text.personal}</span>
                <h2>{profile.name || "User"}</h2>
              </div>
            </div>

            <div className="profile-details">
              <div>
                <span>{text.name}</span>
                <strong>{profile.name || "—"}</strong>
              </div>

              <div>
                <span>{text.age}</span>
                <strong>{profile.age || "—"}</strong>
              </div>

              <div>
                <span>{text.mobile}</span>
                <strong>{maskedMobile}</strong>
              </div>

              <div>
                <span>{text.language}</span>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>English</option>
                  <option>Tamil</option>
                  <option>Hindi</option>
                  <option>Telugu</option>
                  <option>Malayalam</option>
                  <option>Kannada</option>
                </select>
              </div>
            </div>
          </section>

          <section className="card profile-card">
            <div className="profile-card-heading">
              <div className="profile-section-icon">
                <Volume2 size={19} />
              </div>

              <div>
                <span className="eyebrow">ACCESSIBILITY</span>
                <h2>{text.voice}</h2>
              </div>
            </div>

            <div className="profile-setting-row">
              <div>
                <strong>{text.voice}</strong>
                <span>{text.voiceDescription}</span>
              </div>

              <button
                type="button"
                className={`toggle-button ${
                  voiceEnabled ? "active" : ""
                }`}
                onClick={() => setVoiceEnabled((value) => !value)}
                aria-pressed={voiceEnabled}
              >
                <span />
              </button>
            </div>

            <div className="profile-setting-row">
              <div>
                <strong>{text.simpleMode}</strong>
                <span>{text.simpleDescription}</span>
              </div>

              <button
                type="button"
                className={`toggle-button ${
                  simpleMode ? "active" : ""
                }`}
                onClick={() => setSimpleMode((value) => !value)}
                aria-pressed={simpleMode}
              >
                <span />
              </button>
            </div>
          </section>

          <section className="card profile-card">
            <div className="profile-card-heading">
              <div className="profile-section-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <span className="eyebrow">{text.privacy}</span>
                <h2>{text.privacy}</h2>
              </div>
            </div>

            <div className="profile-security-note">
              <ShieldCheck size={20} />

              <div>
                <strong>{text.privacy}</strong>
                <span>{text.privacyDescription}</span>
              </div>
            </div>
          </section>

          <section className="card profile-card">
            <div className="profile-card-heading">
              <div className="profile-section-icon">
                <LockKeyhole size={19} />
              </div>

              <div>
                <span className="eyebrow">{text.pin}</span>
                <h2>{text.pin}</h2>
              </div>
            </div>

            <div className="profile-security-note">
              <LockKeyhole size={20} />

              <div>
                <strong>••••</strong>
                <span>{text.pinDescription}</span>
              </div>
            </div>
          </section>
        </div>

        <div className="profile-bottom-note">
          <Sparkles size={17} />
          <span>{text.save}</span>
        </div>

        <button
          className="logout-button"
          onClick={handleLogout}
          type="button"
        >
          <LogOut size={18} />
          {text.logout}
        </button>
      </div>
    </div>
  );
}