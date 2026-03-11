import { useState } from "react";
import { Link, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { loginUser, registerUser } from "../api/auth";
import { useAuth } from "../state/AuthContext";
import { stringifyError } from "../utils/format";

const initialRegister = {
  email: "",
  password: "",
  role: "applicant",
  company_name: "",
};

const initialLogin = {
  email: "",
  password: "",
  role: "applicant",
};

export default function AuthPage({ mode }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { isAuthenticated, role, setAuthSession } = useAuth();
  const [form, setForm] = useState(() => {
    const nextRole = searchParams.get("role") || "applicant";
    const safeRole = ["applicant", "company", "admin"].includes(nextRole)
      ? nextRole
      : "applicant";

    if (mode === "register") {
      return { ...initialRegister, role: safeRole };
    }

    return { ...initialLogin, role: safeRole };
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const backUrl = searchParams.get("backurl") || location.state?.from || "/vacancies";

  if (isAuthenticated) {
    const redirectMap = {
      applicant: "/applicant",
      company: "/company",
      admin: "/admin",
    };

    const dashboard = redirectMap[role] || "/vacancies";
    const target = backUrl.startsWith("/") ? backUrl : dashboard;

    return <Navigate to={target} replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      if (mode === "register") {
        await registerUser({
          email: form.email,
          password: form.password,
          role: form.role,
          company_name: form.role === "company" ? form.company_name : null,
        });
      }

      const tokens = await loginUser({
        email: form.email,
        password: form.password,
        role: form.role,
      });

      setAuthSession({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        role: form.role,
        email: form.email,
      });
    } catch (err) {
      setStatus(stringifyError(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-shell auth-shell-hh">
      <div className="card auth-card auth-card-hh stack-md">
        <div className="auth-tabs">
          <Link to="/auth/login" className={mode === "login" ? "auth-tab active" : "auth-tab"}>
            Вход
          </Link>
          <Link
            to="/auth/register"
            className={mode === "register" ? "auth-tab active" : "auth-tab"}
          >
            Регистрация
          </Link>
        </div>

        <div className="stack-sm">
          <p className="eyebrow">JobFinder Account</p>
          <h1>{mode === "register" ? "Создать аккаунт" : "Вход в профиль"}</h1>
          <p className="muted">Возврат после входа: {backUrl}</p>
        </div>

        <form className="stack-md" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Пароль</span>
            <input
              name="password"
              type="password"
              minLength="8"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <span>Роль</span>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="applicant">Соискатель</option>
              <option value="company">Компания</option>
              <option value="admin">Администратор</option>
            </select>
          </label>

          {mode === "register" && form.role === "company" && (
            <label>
              <span>Название компании</span>
              <input
                name="company_name"
                value={form.company_name}
                onChange={handleChange}
                required
              />
            </label>
          )}

          <button className="button" type="submit" disabled={loading}>
            {loading ? "Проверяем..." : mode === "register" ? "Создать аккаунт" : "Войти"}
          </button>
        </form>

        {status && <p className="error">{status}</p>}
      </div>
    </section>
  );
}
