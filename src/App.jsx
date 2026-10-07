import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import CreateProfile from "./pages/CreateProfile";
import Welcome from "./pages/Welcome";
import UploadReports from "./pages/UploadReports";
import Analysis from "./pages/Analysis";
import VerifyExtraction from "./pages/VerifyExtraction";
import Dashboard from "./pages/Dashboard";
import HealthSummary from "./pages/HealthSummary";
import Recommendations from "./pages/Recommendations";
import Medicines from "./pages/Medicines";
import LabResults from "./pages/LabResults";
import Reports from "./pages/Reports";
import TimelinePage from "./pages/TimelinePage";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateProfile />} />

        <Route path="/welcome" element={<Welcome />} />

        <Route path="/upload" element={<UploadReports />} />

        <Route path="/analysis" element={<Analysis />} />

        <Route path="/verify" element={<VerifyExtraction />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/summary" element={<HealthSummary />} />

        <Route
          path="/recommendations"
          element={<Recommendations />}
        />

        <Route path="/medicines" element={<Medicines />} />

        <Route path="/labs" element={<LabResults />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/timeline" element={<TimelinePage />} />

        <Route path="/profile" element={<Profile />} />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}