import { useEffect, useState } from "react";
import VacancyCard from "../components/VacancyCard";
import { getPublicVacancies } from "../api/public";
import { stringifyError } from "../utils/format";

const initialFilters = {
  search: "",
  city_id: "",
  profession_id: "",
  company_id: "",
  limit: 12,
  skip: 0,
};

export default function PublicVacanciesPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadVacancies() {
    try {
      setLoading(true);
      setError("");
      const data = await getPublicVacancies(filters);
      setVacancies(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(stringifyError(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVacancies();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await loadVacancies();
  }

  return (
    <section className="stack-lg">
      <div className="hero">
        <div>
          <p className="eyebrow">Публичная лента</p>
          <h1>Поиск вакансий по реальному API FastAPI</h1>
          <p className="hero-copy">
            Фильтрация работает по `search`, `city_id`, `profession_id`,
            `company_id`, `skip`, `limit`.
          </p>
        </div>
      </div>

      <form className="card grid-form" onSubmit={handleSubmit}>
        <label>
          <span>Поиск</span>
          <input
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Python, frontend, QA..."
          />
        </label>
        <label>
          <span>ID города</span>
          <input name="city_id" value={filters.city_id} onChange={handleChange} />
        </label>
        <label>
          <span>ID профессии</span>
          <input
            name="profession_id"
            value={filters.profession_id}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>ID компании</span>
          <input
            name="company_id"
            value={filters.company_id}
            onChange={handleChange}
          />
        </label>
        <label>
          <span>Лимит</span>
          <input name="limit" type="number" value={filters.limit} onChange={handleChange} />
        </label>
        <label>
          <span>Смещение</span>
          <input name="skip" type="number" value={filters.skip} onChange={handleChange} />
        </label>
        <div className="form-actions">
          <button className="button" type="submit">
            Обновить
          </button>
        </div>
      </form>

      {loading && <p>Загрузка вакансий...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && vacancies.length === 0 && (
        <div className="card empty-state">По текущим фильтрам вакансии не найдены.</div>
      )}

      <div className="vacancies-grid">
        {vacancies.map((vacancy) => (
          <VacancyCard key={vacancy.id} vacancy={vacancy} />
        ))}
      </div>
    </section>
  );
}
