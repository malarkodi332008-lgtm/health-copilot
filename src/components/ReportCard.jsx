import {
  FileText,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const translations = {
  English: {
    open: "Open report",
  },

  Tamil: {
    open: "அறிக்கையைத் திறக்கவும்",
  },

  Hindi: {
    open: "रिपोर्ट खोलें",
  },

  Telugu: {
    open: "నివేదికను తెరవండి",
  },

  Malayalam: {
    open: "റിപ്പോർട്ട് തുറക്കുക",
  },

  Kannada: {
    open: "ವರದಿಯನ್ನು ತೆರೆಯಿರಿ",
  },
};

export default function ReportCard({
  name,
  date,
  type,
  onClick,
}) {
  const { language } = useApp();

  const text = translations[language] || translations.English;

  return (
    <div className="card report-card">
      <div className="report-icon">
        <FileText size={22} />
      </div>

      <div className="report-info">
        <h3>{name}</h3>

        <div className="report-meta">
          <span>
            <CalendarDays size={15} />
            {date}
          </span>

          <span>{type}</span>
        </div>
      </div>

      <button
        className="icon-button"
        onClick={onClick}
        title={text.open}
        aria-label={text.open}
        type="button"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}