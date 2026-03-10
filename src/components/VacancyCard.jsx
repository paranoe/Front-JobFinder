import { Link } from "react-router-dom";
import { formatDate, formatSalary } from "../utils/format";

export default function VacancyCard({ vacancy }) {
  return (
    <article className="card vacancy-card">
      <div className="card-header">
        <div>
          <p className="eyebrow">{vacancy.profession_name || "Вакансия"}</p>
          <h3>{vacancy.title}</h3>
        </div>
        <span className="chip">{vacancy.city_name}</span>
      </div>

      <p className="muted">{vacancy.company_name}</p>
      <p>{formatSalary(vacancy.salary_min, vacancy.salary_max)}</p>
      <p className="clamp-3">{vacancy.description}</p>

      <div className="card-footer">
        <span className="muted">Опубликовано: {formatDate(vacancy.created_at)}</span>
        <Link to={`/vacancies/${vacancy.id}`} className="button button-secondary">
          Подробнее
        </Link>
      </div>
    </article>
  );
}
