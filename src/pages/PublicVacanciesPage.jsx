import { useEffect, useState } from "react";
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

const quickSearches = ["Frontend", "Python", "QA", "Product Manager", "DevOps"];

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
        <p className="eyebrow">Поиск вакансий</p>
        <h1>Найдите работу, которая подходит именно вам</h1>
        <p className="hh-home-subtitle">
          Лента вакансий подключена к вашему FastAPI backend. Ищите по ключевым словам,
          компании и параметрам, чтобы быстро найти релевантные предложения.
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

      <form className="card hh-search-form" onSubmit={handleSearchSubmit}>
        <div className="hh-search-row">
          <input
            className="hh-search-input"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Профессия, навык или компания"
          />
          <button className="button hh-search-button" type="submit">
            Найти
          </button>
        </div>
      </form>

      <div className="hh-home-layout">
        <form className="card hh-filters-card stack-md" onSubmit={handleFiltersSubmit}>
          <h2>Фильтры</h2>

          <label>
            <span>Город (ID)</span>
            <input name="city_id" value={filters.city_id} onChange={handleChange} />
          </label>

          <label>
            <span>Профессия (ID)</span>
            <input
              name="profession_id"
              value={filters.profession_id}
              onChange={handleChange}
            />
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
              Применить
            </button>
            <button
              className="button button-ghost"
              type="button"
              onClick={handleResetFilters}
            >
              Сбросить
            </button>
          </div>
        </form>

        <div className="hh-results">
          <div className="card hh-results-head">
            <h2>Вакансии</h2>
            {!loading && !error && (
              <span className="muted">Найдено: {vacancies.length}</span>
            )}
          </div>

          {loading && <p>Загрузка вакансий...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && vacancies.length === 0 && (
            <div className="card empty-state">По текущим фильтрам вакансии не найдены.</div>
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
