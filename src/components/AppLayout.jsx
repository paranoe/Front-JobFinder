import { NavLink, Outlet } from "react-router-dom";
import { logoutAllUserSessions, logoutUser } from "../api/auth";
import { useAuth } from "../state/AuthContext";

function linkClass({ isActive }) {
  return isActive ? "nav-link active" : "nav-link";
}

const roleLabel = {
  applicant: "Соискатель",
  company: "Работодатель",
  admin: "Администратор",
};

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
      // Локальный выход важен даже при невалидном токене.
    } finally {
      clearAuthSession();
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand-wrap">
            <NavLink to="/" className="brand">
              <span className="brand-mark">JF</span>
              <span className="brand-text">JobFinder</span>
            </NavLink>
            <p className="topbar-subtitle">Умный поиск работы и сотрудников в одном месте</p>
          </div>

          <nav className="nav">
            <NavLink to="/" className={linkClass} end>
              Главная
            </NavLink>
            <NavLink to="/vacancies" className={linkClass}>
              Вакансии
            </NavLink>
            <NavLink to="/home" className={linkClass}>
              О платформе
            </NavLink>
            {role === "applicant" && (
              <NavLink to="/applicant" className={linkClass}>
                Кабинет соискателя
              </NavLink>
            )}
            {role === "company" && (
              <NavLink to="/company" className={linkClass}>
                Кабинет работодателя
              </NavLink>
            )}
            {role === "admin" && (
              <NavLink to="/admin" className={linkClass}>
                Админ-панель
              </NavLink>
            )}
          </nav>

          {isAuthenticated ? (
            <div className="auth-actions">
              <span className="role-badge">{roleLabel[role] || role}</span>
              <button className="button button-secondary" type="button" onClick={() => handleLogout("one")}>
                Выйти
              </button>
              <button className="button button-ghost" type="button" onClick={() => handleLogout("all")}>
                Выйти везде
              </button>
            </div>
          ) : (
            <div className="auth-actions">
              <NavLink
                to="/account/login?role=applicant&backurl=%2F&hhtmFrom=main"
                className="button"
              >
                Войти
              </NavLink>
              <NavLink to="/auth/register" className="button button-secondary">
                Регистрация
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
            <p className="muted">Сервис найма нового поколения для кандидатов и компаний.</p>
          </div>
          <div className="site-footer-links">
            <a href="#">Вакансии</a>
            <a href="#">Помощь</a>
            <a href="#">API</a>
            <a href="#">Контакты</a>
          </div>
          <p className="muted">© {new Date().getFullYear()} JobFinder</p>
        </div>
      </footer>
    </div>
  );
}
