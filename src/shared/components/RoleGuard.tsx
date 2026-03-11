import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export const RoleGuard = ({ role }: { role: 'admin' | 'applicant' | 'company' }) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== role) return <Navigate to="/" replace />;
  return <Outlet />;
};
