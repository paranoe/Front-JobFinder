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
      // Локальный выход важен даже если токен уже невалиден.
    } finally {
      clearAuthSession();
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div>
            <NavLink to="/" className="brand">
              <span className="brand-mark">JF</span>
              <span className="brand-text">JobFinder</span>
            </NavLink>
            <p className="topbar-subtitle">Современный сервис поиска работы и сотрудников</p>
          </div>

          <nav className="nav">
            <NavLink to="/" className={linkClass} end>
              Главная
            </NavLink>
            <NavLink to="/vacancies" className={linkClass}>
              Вакансии
            </NavLink>
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

          {isAuthenticated ? (
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
          ) : (
            <div className="auth-actions">
              <NavLink to="/account/login?role=applicant&backurl=%2F&hhtmFrom=main" className="button">
                Войти
              </NavLink>
            </div>
          )}
        </div>
      </header>

      <main className="container page-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container site-footer-inner">
          <div className="site-footer-brand">
            <strong>JobFinder</strong>
            <p className="muted">Поиск вакансий и кандидатов в одном месте.</p>
          </div>
          <div className="site-footer-links">
            <a href="#">О сервисе</a>
            <a href="#">Помощь</a>
            <a href="#">Контакты</a>
          </div>
          <p className="muted">© {new Date().getFullYear()} JobFinder</p>
        </div>
      </footer>
    </div>
  );
}
