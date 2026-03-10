import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./state/AuthContext";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import ApplicantDashboardPage from "./pages/ApplicantDashboardPage";
import AuthPage from "./pages/AuthPage";
import CompanyDashboardPage from "./pages/CompanyDashboardPage";
import HomePage from "./pages/HomePage";
import PublicVacanciesPage from "./pages/PublicVacanciesPage";
import VacancyDetailsPage from "./pages/VacancyDetailsPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="vacancies" element={<PublicVacanciesPage />} />
          <Route path="vacancies/:id" element={<VacancyDetailsPage />} />
          <Route path="auth/login" element={<AuthPage mode="login" />} />
          <Route path="auth/register" element={<AuthPage mode="register" />} />
          <Route
            path="applicant"
            element={
              <ProtectedRoute role="applicant">
                <ApplicantDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="company"
            element={
              <ProtectedRoute role="company">
                <CompanyDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/vacancies" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
