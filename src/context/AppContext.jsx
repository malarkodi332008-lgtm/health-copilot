import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const translations = {
  English: {
    dashboard: "Dashboard",
    reports: "Reports",
    medicines: "Medicines",
    labResults: "Lab Results",
    timeline: "Timeline",
    profile: "Profile",
    back: "Back",
    listen: "Listen",
    stop: "Stop",
    continue: "Continue",
    chooseFile: "Choose File",
    camera: "Camera",
    upload: "Upload",
    important: "Important",
    review: "Review",
  },

  Tamil: {
    dashboard: "டாஷ்போர்டு",
    reports: "அறிக்கைகள்",
    medicines: "மருந்துகள்",
    labResults: "ஆய்வக முடிவுகள்",
    timeline: "காலவரிசை",
    profile: "சுயவிவரம்",
    back: "பின்செல்",
    listen: "கேளுங்கள்",
    stop: "நிறுத்து",
    continue: "தொடரவும்",
    chooseFile: "கோப்பை தேர்வு செய்க",
    camera: "கேமரா",
    upload: "பதிவேற்றம்",
    important: "முக்கியம்",
    review: "சரிபார்க்கவும்",
  },

  Hindi: {
    dashboard: "डैशबोर्ड",
    reports: "रिपोर्ट्स",
    medicines: "दवाइयाँ",
    labResults: "लैब परिणाम",
    timeline: "समयरेखा",
    profile: "प्रोफ़ाइल",
    back: "वापस",
    listen: "सुनें",
    stop: "रोकें",
    continue: "जारी रखें",
    chooseFile: "फ़ाइल चुनें",
    camera: "कैमरा",
    upload: "अपलोड",
    important: "महत्वपूर्ण",
    review: "समीक्षा करें",
  },

  Telugu: {
    dashboard: "డాష్‌బోర్డ్",
    reports: "రిపోర్టులు",
    medicines: "మందులు",
    labResults: "ల్యాబ్ ఫలితాలు",
    timeline: "టైమ్‌లైన్",
    profile: "ప్రొఫైల్",
    back: "వెనుకకు",
    listen: "వినండి",
    stop: "ఆపండి",
    continue: "కొనసాగించండి",
    chooseFile: "ఫైల్ ఎంచుకోండి",
    camera: "కెమెరా",
    upload: "అప్‌లోడ్",
    important: "ముఖ్యమైనది",
    review: "సమీక్షించండి",
  },

  Malayalam: {
    dashboard: "ഡാഷ്ബോർഡ്",
    reports: "റിപ്പോർട്ടുകൾ",
    medicines: "മരുന്നുകൾ",
    labResults: "ലാബ് ഫലങ്ങൾ",
    timeline: "ടൈംലൈൻ",
    profile: "പ്രൊഫൈൽ",
    back: "തിരികെ",
    listen: "കേൾക്കുക",
    stop: "നിർത്തുക",
    continue: "തുടരുക",
    chooseFile: "ഫയൽ തിരഞ്ഞെടുക്കുക",
    camera: "ക്യാമറ",
    upload: "അപ്‌ലോഡ്",
    important: "പ്രധാനപ്പെട്ടത്",
    review: "പരിശോധിക്കുക",
  },

  Kannada: {
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    reports: "ವರದಿಗಳು",
    medicines: "ಔಷಧಿಗಳು",
    labResults: "ಲ್ಯಾಬ್ ಫಲಿತಾಂಶಗಳು",
    timeline: "ಟೈಮ್‌ಲೈನ್",
    profile: "ಪ್ರೊಫೈಲ್",
    back: "ಹಿಂದೆ",
    listen: "ಕೇಳಿ",
    stop: "ನಿಲ್ಲಿಸಿ",
    continue: "ಮುಂದುವರಿಸಿ",
    chooseFile: "ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ",
    camera: "ಕ್ಯಾಮೆರಾ",
    upload: "ಅಪ್‌ಲೋಡ್",
    important: "ಪ್ರಮುಖ",
    review: "ಪರಿಶೀಲಿಸಿ",
  },
};

export function AppProvider({ children }) {
  const [language, setLanguage] = useState("English");

  const [profile, setProfile] = useState({
    name: "",
    age: "",
    mobile: "",
  });

  const [extractedData, setExtractedData] = useState({
    patientName: "Arun Kumar",
    reportType: "Blood Test",
    hb: "10.2",
    glucose: "145",
    platelets: "240000",
    wbc: "7200",
  });

  const t = translations[language] || translations.English;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        profile,
        setProfile,
        extractedData,
        setExtractedData,
        t,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}