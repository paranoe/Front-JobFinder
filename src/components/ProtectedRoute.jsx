import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const location = useLocation();
  const { isAuthenticated, role: currentRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
  }

  if (role && currentRole !== role) {
    return <Navigate to="/vacancies" replace />;
  }

  return children;
}
