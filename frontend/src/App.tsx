import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { ClassesPage } from "./pages/ClassesPage";
import { AssessmentsPage } from "./pages/AssessmentsPage";
import { AssessmentDetailPage } from "./pages/AssessmentDetailPage";
import { ClassDetailPage } from "./pages/ClassDetailPage";
import { MarkingWorkspacePage } from "./pages/MarkingWorkspacePage";
import { ResultsPage } from "./pages/ResultsPage";
import { SettingsPage } from "./pages/SettingsPage";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/classes/:classId" element={<ClassDetailPage />} />
        <Route path="/assessments" element={<AssessmentsPage />} />
        <Route path="/assessments/:assessmentId" element={<AssessmentDetailPage />} />
        <Route path="/assessments/:assessmentId/marking" element={<MarkingWorkspacePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
