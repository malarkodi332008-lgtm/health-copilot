import { CheckCircle2, FileText, Sparkles } from "lucide-react";

const icons = {
  report: FileText,
  ai: Sparkles,
  default: CheckCircle2,
};

export default function Timeline({ events = [] }) {
  return (
    <div className="timeline">
      {events.map((event, index) => {
        const Icon = icons[event.type] || icons.default;

        return (
          <div className="timeline-item" key={index}>
            <div className="timeline-line" />

            <div className="timeline-icon">
              <Icon size={18} />
            </div>

            <div className="timeline-content">
              <span>{event.date}</span>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}