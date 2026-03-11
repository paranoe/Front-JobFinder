import { useEffect, useMemo, useState } from "react";
import VacancyCard from "../components/VacancyCard";
import { getPublicVacancies } from "../api/public";
import { stringifyError } from "../utils/format";

const initialFilters = {
  search: "",
  city_id: "",
  profession_id: "",
  company_id: "",
  limit: 20,
  skip: 0,
};

const quickSearches = ["Frontend", "Backend", "Python", "QA", "Product", "DevOps"];

export default function PublicVacanciesPage() {
  const [filters, setFilters] = useState(initialFilters);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadVacancies(nextFilters = filters) {
    try {
      setLoading(true);
      setError("");
      const data = await getPublicVacancies(nextFilters);
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

  const citiesCount = useMemo(() => new Set(vacancies.map((item) => item.city_name)).size, [vacancies]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  }

  async function handleSearchSubmit(event) {
    event.preventDefault();
    await loadVacancies();
  }

  async function handleFiltersSubmit(event) {
    event.preventDefault();
    await loadVacancies();
  }

  async function handleResetFilters() {
    setFilters(initialFilters);
    await loadVacancies(initialFilters);
  }

  async function handleQuickSearch(value) {
    const nextFilters = { ...filters, search: value, skip: 0 };
    setFilters(nextFilters);
    await loadVacancies(nextFilters);
  }

  return (
    <section className="hh-home stack-lg">
      <div className="card hh-home-head">
        <div className="hh-hero-grid">
          <div className="stack-md">
            <p className="eyebrow">Актуальные вакансии</p>
            <h1>Работа мечты ближе, чем кажется</h1>
            <p className="hh-home-subtitle">
              Вдохновлено лучшими job-board практиками: быстрый поиск, удобные фильтры и
              понятная выдача. Вся лента подключена к вашему FastAPI backend.
            </p>
            <div className="hh-quick-search">
              {quickSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="hh-quick-tag"
                  onClick={() => handleQuickSearch(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="hh-stats-panel">
            <div>
              <p className="muted">Найдено вакансий</p>
              <strong>{vacancies.length}</strong>
            </div>
            <div>
              <p className="muted">Городов в выдаче</p>
              <strong>{citiesCount}</strong>
            </div>
            <div>
              <p className="muted">Лимит страницы</p>
              <strong>{filters.limit}</strong>
            </div>
          </div>
        </div>
      </div>

      <form className="card hh-search-form" onSubmit={handleSearchSubmit}>
        <div className="hh-search-row">
          <input
            className="hh-search-input"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Должность, навык или компания"
          />
          <button className="button hh-search-button" type="submit">
            Найти вакансии
          </button>
        </div>
      </form>

      <div className="hh-home-layout">
        <form className="card hh-filters-card stack-md" onSubmit={handleFiltersSubmit}>
          <h2>Фильтры поиска</h2>

          <label>
            <span>Город (ID)</span>
            <input name="city_id" value={filters.city_id} onChange={handleChange} />
          </label>

          <label>
            <span>Профессия (ID)</span>
            <input name="profession_id" value={filters.profession_id} onChange={handleChange} />
          </label>

          <label>
            <span>Компания (ID)</span>
            <input name="company_id" value={filters.company_id} onChange={handleChange} />
          </label>

          <label>
            <span>Лимит</span>
            <input name="limit" type="number" value={filters.limit} onChange={handleChange} />
          </label>

          <label>
            <span>Смещение</span>
            <input name="skip" type="number" value={filters.skip} onChange={handleChange} />
          </label>

          <div className="stack-sm">
            <button className="button" type="submit">
              Применить фильтры
            </button>
            <button className="button button-ghost" type="button" onClick={handleResetFilters}>
              Сбросить
            </button>
          </div>
        </form>

        <div className="hh-results">
          <div className="card hh-results-head">
            <h2>Лента вакансий</h2>
            {!loading && !error && <span className="muted">Показано: {vacancies.length}</span>}
          </div>

          {loading && <p>Загрузка вакансий...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && vacancies.length === 0 && (
            <div className="card empty-state">По текущим фильтрам ничего не найдено.</div>
          )}

          <div className="vacancies-grid hh-vacancies-grid">
            {vacancies.map((vacancy) => (
              <VacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
