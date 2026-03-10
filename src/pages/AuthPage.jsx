import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
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
  const { isAuthenticated, role, setAuthSession } = useAuth();
  const [form, setForm] = useState(mode === "register" ? initialRegister : initialLogin);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) {
    const redirectMap = {
      applicant: "/applicant",
      company: "/company",
      admin: "/admin",
    };

    return <Navigate to={redirectMap[role] || "/vacancies"} replace />;
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
    <section className="auth-shell">
      <div className="card auth-card">
        <p className="eyebrow">{mode === "register" ? "Регистрация" : "Вход"}</p>
        <h1>
          {mode === "register"
            ? "Создать аккаунт под роль API"
            : "Войти в личный кабинет"}
        </h1>
        <p className="muted">
          Исходный путь: {location.state?.from || "/vacancies"}
        </p>

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
              <option value="applicant">applicant</option>
              <option value="company">company</option>
              <option value="admin">admin</option>
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
            {loading ? "Отправка..." : mode === "register" ? "Зарегистрироваться" : "Войти"}
          </button>
        </form>

        {status && <p className="error">{status}</p>}

        <p className="muted">
          {mode === "register" ? "Уже есть аккаунт?" : "Нужен новый аккаунт?"}{" "}
          <Link to={mode === "register" ? "/auth/login" : "/auth/register"}>
            {mode === "register" ? "Войти" : "Зарегистрироваться"}
          </Link>
        </p>
      </div>
    </section>
  );
}
