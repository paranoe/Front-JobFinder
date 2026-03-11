import { Link } from "react-router-dom";
import { formatDate, formatSalary } from "../utils/format";

export default function VacancyCard({ vacancy }) {
  return (
    <article className="card vacancy-card">
      <div className="vacancy-card-top">
        <div className="stack-sm">
          <p className="eyebrow">{vacancy.profession_name || "Вакансия"}</p>
          <h3 className="vacancy-title">{vacancy.title}</h3>
          <p className="vacancy-company muted">{vacancy.company_name}</p>
        </div>
        <span className="chip">{vacancy.city_name}</span>
      </div>

      <p className="vacancy-salary">{formatSalary(vacancy.salary_min, vacancy.salary_max)}</p>
      <p className="clamp-3 vacancy-description">{vacancy.description}</p>

      <div className="card-footer">
        <span className="muted">Опубликовано: {formatDate(vacancy.created_at)}</span>
        <Link to={`/vacancies/${vacancy.id}`} className="button button-secondary">
          Смотреть
        </Link>
      </div>
    </article>
  );
}
