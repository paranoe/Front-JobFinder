import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { applyToVacancy, getApplicantResumes } from "../api/applicant";
import { getPublicVacancyById } from "../api/public";
import { useAuth } from "../state/AuthContext";
import { formatDateTime, formatSalary, stringifyError } from "../utils/format";

export default function VacancyDetailsPage() {
  const { id } = useParams();
  const { role, isAuthenticated } = useAuth();
  const [vacancy, setVacancy] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [vacancyData, resumesData] = await Promise.all([
          getPublicVacancyById(id),
          role === "applicant" ? getApplicantResumes({ limit: 100 }) : Promise.resolve([]),
        ]);

        if (!active) return;

        setVacancy(vacancyData);
        setResumes(Array.isArray(resumesData) ? resumesData : []);
        if (Array.isArray(resumesData) && resumesData[0]) {
          setResumeId(String(resumesData[0].id));
        }
      } catch (err) {
        if (active) {
          setError(stringifyError(err));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, [id, role]);

  async function handleApply(event) {
    event.preventDefault();

    try {
      setStatus("");
      await applyToVacancy({
        vacancy_id: Number(id),
        resume_id: Number(resumeId),
      });
      setStatus("Отклик отправлен.");
    } catch (err) {
      setStatus(stringifyError(err));
    }
  }

  if (loading) {
    return <p>Загрузка вакансии...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!vacancy) {
    return <p>Вакансия не найдена.</p>;
  }

  return (
    <section className="stack-lg">
      <Link to="/vacancies" className="button button-ghost">
        Назад к списку
      </Link>

      <article className="card detail-card">
        <div className="card-header">
          <div>
            <p className="eyebrow">{vacancy.profession_name}</p>
            <h1>{vacancy.title}</h1>
          </div>
          <span className="chip">{vacancy.city_name}</span>
        </div>

        <div className="detail-grid">
          <div>
            <p className="muted">Компания</p>
            <p>{vacancy.company_name}</p>
          </div>
          <div>
            <p className="muted">Зарплата</p>
            <p>{formatSalary(vacancy.salary_min, vacancy.salary_max, vacancy.currency)}</p>
          </div>
          <div>
            <p className="muted">Тип занятости</p>
            <p>{vacancy.employment_type}</p>
          </div>
          <div>
            <p className="muted">График</p>
            <p>{vacancy.work_schedule}</p>
          </div>
          <div>
            <p className="muted">Опыт</p>
            <p>{vacancy.experience}</p>
          </div>
          <div>
            <p className="muted">Обновлено</p>
            <p>{formatDateTime(vacancy.updated_at)}</p>
          </div>
        </div>

        <div className="stack-md">
          <div>
            <h2>Описание</h2>
            <p>{vacancy.description}</p>
          </div>

          <div>
            <h2>Навыки</h2>
            <div className="chips">
              {vacancy.skills?.length ? (
                vacancy.skills.map((skill) => (
                  <span className="chip" key={skill}>
                    {skill}
                  </span>
                ))
              ) : (
                <span className="muted">Навыки не указаны</span>
              )}
            </div>
          </div>
        </div>
      </article>

      {isAuthenticated && role === "applicant" && (
        <form className="card grid-form" onSubmit={handleApply}>
          <h2>Откликнуться</h2>
          <label>
            <span>Резюме</span>
            <select value={resumeId} onChange={(e) => setResumeId(e.target.value)}>
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  #{resume.id} {resume.profession?.name || `profession_id=${resume.profession_id}`}
                </option>
              ))}
            </select>
          </label>
          <div className="form-actions">
            <button className="button" type="submit" disabled={!resumeId}>
              Отправить отклик
            </button>
          </div>
          {status && <p className={status.includes("отправлен") ? "success" : "error"}>{status}</p>}
        </form>
      )}
    </section>
  );
}
