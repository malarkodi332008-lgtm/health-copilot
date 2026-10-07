import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  X,
  Camera,
  ClipboardList,
  Stethoscope,
  Activity,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const content = {
  English: {
    title: "Upload your health document",
    description: "First choose the type of document you want to upload.",
    medicalRecords: "Medical Records",
    prescriptions: "Prescriptions",
    diagnosticReports: "Diagnostic Reports",
    wellnessData: "Wellness Data",
    formats: "JPG, PNG or PDF",
    chooseFile: "Choose File",
    camera: "Camera",
    documentType: "Document type",
    continue: "Continue with this document",
    invalid: "Please upload a JPG, PNG or PDF file.",
    selectType: "Please select a document type first.",
  },

  Tamil: {
    title: "உங்கள் சுகாதார ஆவணத்தை பதிவேற்றுங்கள்",
    description: "முதலில் பதிவேற்ற வேண்டிய ஆவண வகையைத் தேர்ந்தெடுக்கவும்.",
    medicalRecords: "மருத்துவ பதிவுகள்",
    prescriptions: "மருந்துச் சீட்டுகள்",
    diagnosticReports: "பரிசோதனை அறிக்கைகள்",
    wellnessData: "நலவாழ்வு தகவல்கள்",
    formats: "JPG, PNG அல்லது PDF",
    chooseFile: "கோப்பை தேர்வு செய்க",
    camera: "கேமரா",
    documentType: "ஆவண வகை",
    continue: "இந்த ஆவணத்துடன் தொடரவும்",
    invalid: "JPG, PNG அல்லது PDF கோப்பை பதிவேற்றவும்.",
    selectType: "முதலில் ஆவண வகையைத் தேர்ந்தெடுக்கவும்.",
  },

  Hindi: {
    title: "अपना स्वास्थ्य दस्तावेज़ अपलोड करें",
    description: "पहले उस दस्तावेज़ का प्रकार चुनें जिसे आप अपलोड करना चाहते हैं।",
    medicalRecords: "चिकित्सा रिकॉर्ड",
    prescriptions: "प्रिस्क्रिप्शन",
    diagnosticReports: "नैदानिक रिपोर्ट",
    wellnessData: "स्वास्थ्य जानकारी",
    formats: "JPG, PNG या PDF",
    chooseFile: "फ़ाइल चुनें",
    camera: "कैमरा",
    documentType: "दस्तावेज़ प्रकार",
    continue: "इस दस्तावेज़ के साथ जारी रखें",
    invalid: "कृपया JPG, PNG या PDF फ़ाइल अपलोड करें।",
    selectType: "पहले दस्तावेज़ प्रकार चुनें।",
  },

  Telugu: {
    title: "మీ ఆరోగ్య పత్రాన్ని అప్‌లోడ్ చేయండి",
    description: "ముందుగా మీరు అప్‌లోడ్ చేయాలనుకునే పత్ర రకాన్ని ఎంచుకోండి.",
    medicalRecords: "వైద్య రికార్డులు",
    prescriptions: "ప్రిస్క్రిప్షన్లు",
    diagnosticReports: "నిర్ధారణ నివేదికలు",
    wellnessData: "ఆరోగ్య సమాచారం",
    formats: "JPG, PNG లేదా PDF",
    chooseFile: "ఫైల్ ఎంచుకోండి",
    camera: "కెమెరా",
    documentType: "పత్ర రకం",
    continue: "ఈ పత్రంతో కొనసాగండి",
    invalid: "దయచేసి JPG, PNG లేదా PDF ఫైల్‌ను అప్‌లోడ్ చేయండి.",
    selectType: "ముందుగా పత్ర రకాన్ని ఎంచుకోండి.",
  },

  Malayalam: {
    title: "നിങ്ങളുടെ ആരോഗ്യ ഡോക്യുമെന്റ് അപ്‌ലോഡ് ചെയ്യുക",
    description: "ആദ്യം അപ്‌ലോഡ് ചെയ്യേണ്ട ഡോക്യുമെന്റ് തരം തിരഞ്ഞെടുക്കുക.",
    medicalRecords: "മെഡിക്കൽ രേഖകൾ",
    prescriptions: "പ്രിസ്ക്രിപ്ഷനുകൾ",
    diagnosticReports: "ഡയഗ്നോസ്റ്റിക് റിപ്പോർട്ടുകൾ",
    wellnessData: "ആരോഗ്യ വിവരങ്ങൾ",
    formats: "JPG, PNG അല്ലെങ്കിൽ PDF",
    chooseFile: "ഫയൽ തിരഞ്ഞെടുക്കുക",
    camera: "ക്യാമറ",
    documentType: "ഡോക്യുമെന്റ് തരം",
    continue: "ഈ ഡോക്യുമെന്റുമായി തുടരുക",
    invalid: "ദയവായി JPG, PNG അല്ലെങ്കിൽ PDF ഫയൽ അപ്‌ലോഡ് ചെയ്യുക.",
    selectType: "ആദ്യം ഡോക്യുമെന്റ് തരം തിരഞ്ഞെടുക്കുക.",
  },

  Kannada: {
    title: "ನಿಮ್ಮ ಆರೋಗ್ಯ ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    description: "ಮೊದಲು ನೀವು ಅಪ್‌ಲೋಡ್ ಮಾಡಲು ಬಯಸುವ ದಾಖಲೆ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    medicalRecords: "ವೈದ್ಯಕೀಯ ದಾಖಲೆಗಳು",
    prescriptions: "ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ಗಳು",
    diagnosticReports: "ರೋಗನಿರ್ಣಯ ವರದಿಗಳು",
    wellnessData: "ಆರೋಗ್ಯ ಮಾಹಿತಿ",
    formats: "JPG, PNG ಅಥವಾ PDF",
    chooseFile: "ಫೈಲ್ ಆಯ್ಕೆಮಾಡಿ",
    camera: "ಕ್ಯಾಮೆರಾ",
    documentType: "ದಾಖಲೆ ಪ್ರಕಾರ",
    continue: "ಈ ದಾಖಲೆಯೊಂದಿಗೆ ಮುಂದುವರಿಸಿ",
    invalid: "ದಯವಿಟ್ಟು JPG, PNG ಅಥವಾ PDF ಫೈಲ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
    selectType: "ಮೊದಲು ದಾಖಲೆ ಪ್ರಕಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
  },
};

export default function UploadCard({ onContinue }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState("");

  const { language } = useApp();
  const text = content[language] || content.English;

  const documentTypes = [
    {
      id: "medical-record",
      label: text.medicalRecords,
      icon: ClipboardList,
    },
    {
      id: "prescription",
      label: text.prescriptions,
      icon: FileText,
    },
    {
      id: "diagnostic-report",
      label: text.diagnosticReports,
      icon: Stethoscope,
    },
    {
      id: "wellness-data",
      label: text.wellnessData,
      icon: Activity,
    },
  ];

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const allowed = ["image/jpeg", "image/png", "application/pdf"];

    if (!allowed.includes(selectedFile.type)) {
      alert(text.invalid);
      return;
    }

    setFile(selectedFile);
  };

  const handleContinue = () => {
    if (!documentType) {
      alert(text.selectType);
      return;
    }

    onContinue?.({
      file,
      documentType,
    });
  };

  const removeFile = () => {
    setFile(null);
    setDocumentType("");

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="upload-card">
      {!file ? (
        <>
          <div className="upload-icon">
            <Upload size={30} />
          </div>

          <h2>{text.title}</h2>

          <p>{text.description}</p>

          <div className="document-type-grid">
            {documentTypes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className={`document-type-card ${
                  documentType === id ? "selected" : ""
                }`}
                onClick={() => setDocumentType(id)}
              >
                <div className="document-type-icon">
                  <Icon size={22} />
                </div>

                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="upload-format-note">
            {text.formats}
          </div>

          <div className="upload-actions">
            <button
              className="primary-button"
              type="button"
              onClick={() => {
                if (!documentType) {
                  alert(text.selectType);
                  return;
                }

                inputRef.current?.click();
              }}
            >
              <FileText size={18} />
              {text.chooseFile}
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                if (!documentType) {
                  alert(text.selectType);
                  return;
                }

                inputRef.current?.click();
              }}
            >
              <Camera size={18} />
              {text.camera}
            </button>
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            hidden
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
        </>
      ) : (
        <>
          <div className="selected-document-type">
            <span>{text.documentType}</span>

            <strong>
              {
                documentTypes.find(
                  (item) => item.id === documentType
                )?.label
              }
            </strong>
          </div>

          <div className="selected-file">
            <FileText size={28} />

            <div>
              <strong>{file.name}</strong>
              <span>
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>

            <button
              className="icon-button"
              onClick={removeFile}
              aria-label="Remove file"
              type="button"
            >
              <X size={18} />
            </button>
          </div>

          <button
            className="primary-button full-width"
            onClick={handleContinue}
            type="button"
          >
            {text.continue}
          </button>
        </>
      )}
    </div>
  );
}