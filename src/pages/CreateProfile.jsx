import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  UserRound,
  HeartPulse,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useApp } from "../context/AppContext";

export default function CreateProfile() {
  const navigate = useNavigate();
  const { profile, setProfile, language, setLanguage } = useApp();

  const [name, setName] = useState(profile.name);
  const [age, setAge] = useState(profile.age);
  const [mobile, setMobile] = useState(profile.mobile);
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !age || !mobile || pin.length !== 4) {
      alert("Please fill all details and enter a 4-digit PIN.");
      return;
    }

    setProfile({ name, age, mobile });
    navigate("/welcome");
  };

  return (
    <div className="auth-page premium-auth">
      <div className="auth-decoration decoration-one" />
      <div className="auth-decoration decoration-two" />

      <div className="auth-layout">
        <div className="auth-intro">
          <div className="premium-brand">
            <div className="premium-brand-icon">
              <HeartPulse size={24} />
            </div>

            <div>
              <strong>Health Copilot</strong>
              <span>AI-powered health companion</span>
            </div>
          </div>

          <div className="intro-badge">
            <Sparkles size={14} />
            SMART • SIMPLE • HUMAN
          </div>

          <h1>
            Understand your health.
            <span> With confidence.</span>
          </h1>

          <p>
            Organize your medical reports, understand important information
            in simple language, and keep your health journey in one place.
          </p>

          <div className="trust-points">
            <div>
              <div className="trust-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Privacy-first</strong>
                <span>Only basic profile details are collected.</span>
              </div>
            </div>

            <div>
              <div className="trust-icon">
                <Sparkles size={18} />
              </div>

              <div>
                <strong>AI-powered insights</strong>
                <span>Medical information explained simply.</span>
              </div>
            </div>

            <div>
              <div className="trust-icon">
                <HeartPulse size={18} />
              </div>

              <div>
                <strong>Designed for everyone</strong>
                <span>Voice support and simple language.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-card premium-auth-card">
          <div className="auth-card-heading">
            <div className="auth-logo">
              <UserRound size={27} />
            </div>

            <div>
              <span className="eyebrow">GET STARTED</span>
              <h2>Create your profile</h2>
            </div>
          </div>

          <p className="page-description">
            Just a few details to personalize your experience.
          </p>

          <form onSubmit={handleSubmit} className="form">
            <label>
              Full name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </label>

            <div className="form-two-column">
              <label>
                Age
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  min="1"
                />
              </label>

              <label>
                Mobile number
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="9876543210"
                  inputMode="numeric"
                />
              </label>
            </div>

            <label>
              Preferred language
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
            </label>

            <label>
              Create a 4-digit PIN
              <input
                type="password"
                value={pin}
                onChange={(e) =>
                  setPin(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="••••"
                inputMode="numeric"
                maxLength={4}
              />
            </label>

            <button className="primary-button premium-submit" type="submit">
              Create my profile
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="privacy-note premium-privacy">
            <ShieldCheck size={18} />
            <span>
              Your privacy matters. This prototype only uses basic details
              needed for personalization.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}