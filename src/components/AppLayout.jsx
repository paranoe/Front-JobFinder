import { NavLink, Outlet } from "react-router-dom";
import { logoutAllUserSessions, logoutUser } from "../api/auth";
import { useAuth } from "../state/AuthContext";

function linkClass({ isActive }) {
  return isActive ? "nav-link active" : "nav-link";
}

export default function AppLayout() {
  const { role, isAuthenticated, clearAuthSession } = useAuth();

  async function handleLogout(mode) {
    try {
      if (mode === "all") {
        await logoutAllUserSessions();
      } else {
        await logoutUser();
      }
    } catch {
      // Local cleanup still matters if the backend token is already invalid.
    } finally {
      clearAuthSession();
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div>
            <NavLink to="/vacancies" className="brand">
              JobFinder
            </NavLink>
            <p className="topbar-subtitle">
              Вакансии, отклики, резюме и модерация в одном интерфейсе
            </p>
          </div>

          <nav className="nav">
            <NavLink to="/vacancies" className={linkClass}>
              Вакансии
            </NavLink>
            {!isAuthenticated && (
              <>
                <NavLink to="/auth/login" className={linkClass}>
                  Вход
                </NavLink>
                <NavLink to="/auth/register" className={linkClass}>
                  Регистрация
                </NavLink>
              </>
            )}
            {role === "applicant" && (
              <NavLink to="/applicant" className={linkClass}>
                Соискатель
              </NavLink>
            )}
            {role === "company" && (
              <NavLink to="/company" className={linkClass}>
                Компания
              </NavLink>
            )}
            {role === "admin" && (
              <NavLink to="/admin" className={linkClass}>
                Админ
              </NavLink>
            )}
          </nav>

          {isAuthenticated && (
            <div className="auth-actions">
              <span className="role-badge">{role}</span>
              <button
                className="button button-secondary"
                type="button"
                onClick={() => handleLogout("one")}
              >
                Выйти
              </button>
              <button
                className="button button-ghost"
                type="button"
                onClick={() => handleLogout("all")}
              >
                Выйти везде
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="container page-content">
        <Outlet />
      </main>
    </div>
  );
}
