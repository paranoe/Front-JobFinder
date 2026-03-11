import { useEffect, useState } from "react";
import {
  createCatalogItem,
  deleteAdminApplicant,
  deleteAdminCompany,
  deleteAdminVacancy,
  deleteCatalogItem,
  getAdminApplicants,
  getAdminApplications,
  getAdminCompanies,
  getAdminUsers,
  getAdminVacancies,
  getCatalogItems,
  updateAdminUserStatus,
  updateAdminVacancyStatus,
  updateCatalogItem,
} from "../api/admin";
import { formatDateTime, stringifyError } from "../utils/format";

const catalogOptions = [
  "cities",
  "professions",
  "skills",
  "currencies",
  "employment-types",
  "work-schedules",
  "experiences",
  "statuses",
  "educational-institutions",
];

export default function AdminDashboardPage() {
  const [users, setUsers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);
  const [filters, setFilters] = useState({
    catalogName: "cities",
    catalogItemId: "",
    catalogItemName: "",
    targetUserId: "",
    targetUserActive: "true",
    targetVacancyId: "",
    targetVacancyStatusId: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      setLoading(true);
      const [usersData, companiesData, applicantsData, vacanciesData, applicationsData] =
        await Promise.all([
          getAdminUsers({ limit: 100 }),
          getAdminCompanies({ limit: 100 }),
          getAdminApplicants({ limit: 100 }),
          getAdminVacancies({ limit: 100 }),
          getAdminApplications({ limit: 100 }),
        ]);

      setUsers(usersData || []);
      setCompanies(companiesData || []);
      setApplicants(applicantsData || []);
      setVacancies(vacanciesData || []);
      setApplications(applicationsData || []);
    } catch (err) {
      setMessage(stringifyError(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function patchFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  async function runAction(action, successText) {
    try {
      setMessage("");
      await action();
      await loadDashboard();
      setMessage(successText);
    } catch (err) {
      setMessage(stringifyError(err));
    }
  }

  async function loadCatalog() {
    try {
      setMessage("");
      const data = await getCatalogItems(filters.catalogName, { limit: 100 });
      setCatalogItems(data || []);
    } catch (err) {
      setMessage(stringifyError(err));
    }
  }

  if (loading) {
    return <p>Загрузка админки...</p>;
  }

  return (
    <section className="stack-lg">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Модерация и справочники</p>
          <h1>Админ-панель</h1>
        </div>
        {message && <p className="info">{message}</p>}
      </div>

      <div className="dashboard-grid">
        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            runAction(
              () =>
                updateAdminUserStatus(Number(filters.targetUserId), {
                  is_active: filters.targetUserActive === "true",
                }),
              "Статус пользователя обновлен.",
            );
          }}
        >
          <h2>Пользователи</h2>
          <div className="stack-sm">
            {users.map((user) => (
              <div key={user.id} className="inline-panel">
                <span>
                  #{user.id} {user.email} · {user.role} · active={String(user.is_active)}
                </span>
                <span className="muted">{formatDateTime(user.created_at)}</span>
              </div>
            ))}
          </div>
          <label>
            <span>ID пользователя</span>
            <input
              type="number"
              value={filters.targetUserId}
              onChange={(e) => patchFilter("targetUserId", e.target.value)}
              required
            />
          </label>
          <label>
            <span>Активен</span>
            <select
              value={filters.targetUserActive}
              onChange={(e) => patchFilter("targetUserActive", e.target.value)}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
          <button className="button" type="submit">
            Сохранить статус
          </button>
        </form>

        <div className="card stack-md">
          <h2>Компании</h2>
          {companies.map((company) => (
            <div key={company.id} className="inline-panel">
              <span>
                #{company.id} {company.name}
              </span>
              <button
                className="button button-danger"
                type="button"
                onClick={() =>
                  runAction(() => deleteAdminCompany(company.id), `Компания #${company.id} удалена.`)
                }
              >
                Удалить
              </button>
            </div>
          ))}
        </div>

        <div className="card stack-md">
          <h2>Соискатели</h2>
          {applicants.map((applicant) => (
            <div key={applicant.id} className="inline-panel">
              <span>
                #{applicant.id} {applicant.first_name} {applicant.last_name}
              </span>
              <button
                className="button button-danger"
                type="button"
                onClick={() =>
                  runAction(
                    () => deleteAdminApplicant(applicant.id),
                    `Соискатель #${applicant.id} удален.`,
                  )
                }
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-grid">
        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            runAction(
              () =>
                updateAdminVacancyStatus(Number(filters.targetVacancyId), {
                  status_id: Number(filters.targetVacancyStatusId),
                }),
              "Статус вакансии обновлен.",
            );
          }}
        >
          <h2>Вакансии</h2>
          <div className="stack-sm">
            {vacancies.map((vacancy) => (
              <div key={vacancy.id} className="inline-panel">
                <span>
                  #{vacancy.id} {vacancy.title} · status_id={vacancy.status_id}
                </span>
                <button
                  className="button button-danger"
                  type="button"
                  onClick={() =>
                    runAction(() => deleteAdminVacancy(vacancy.id), `Вакансия #${vacancy.id} удалена.`)
                  }
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <label>
            <span>ID вакансии</span>
            <input
              type="number"
              value={filters.targetVacancyId}
              onChange={(e) => patchFilter("targetVacancyId", e.target.value)}
              required
            />
          </label>
          <label>
            <span>ID статуса</span>
            <input
              type="number"
              value={filters.targetVacancyStatusId}
              onChange={(e) => patchFilter("targetVacancyStatusId", e.target.value)}
              required
            />
          </label>
          <button className="button" type="submit">
            Сохранить статус вакансии
          </button>
        </form>

        <div className="card stack-md">
          <h2>Отклики</h2>
          {applications.map((application) => (
            <div key={`${application.vacancy_id}-${application.resume_id}`} className="inline-panel">
              <span>
                vacancy #{application.vacancy_id} · resume #{application.resume_id}
              </span>
              <span>{application.status}</span>
            </div>
          ))}
        </div>

        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            loadCatalog();
          }}
        >
          <h2>Справочники</h2>
          <label>
            <span>Название справочника</span>
            <select
              value={filters.catalogName}
              onChange={(e) => patchFilter("catalogName", e.target.value)}
            >
              {catalogOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <button className="button" type="submit">
            Загрузить
          </button>
          <div className="stack-sm">
            {catalogItems.map((item) => (
              <div key={item.id} className="inline-panel">
                <span>
                  #{item.id} {item.name}
                </span>
                <button
                  className="button button-danger"
                  type="button"
                  onClick={() =>
                    runAction(
                      () => deleteCatalogItem(filters.catalogName, item.id),
                      `Элемент #${item.id} удален из ${filters.catalogName}.`,
                    )
                  }
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
          <label>
            <span>ID элемента для обновления</span>
            <input
              type="number"
              value={filters.catalogItemId}
              onChange={(e) => patchFilter("catalogItemId", e.target.value)}
            />
          </label>
          <label>
            <span>Название</span>
            <input
              value={filters.catalogItemName}
              onChange={(e) => patchFilter("catalogItemName", e.target.value)}
              required
            />
          </label>
          <div className="inline-actions">
            <button
              className="button"
              type="button"
              onClick={() =>
                runAction(
                  () => createCatalogItem(filters.catalogName, { name: filters.catalogItemName }),
                  `Элемент добавлен в ${filters.catalogName}.`,
                )
              }
            >
              Добавить элемент
            </button>
            <button
              className="button button-secondary"
              type="button"
              onClick={() =>
                runAction(
                  () =>
                    updateCatalogItem(filters.catalogName, Number(filters.catalogItemId), {
                      name: filters.catalogItemName,
                    }),
                  `Элемент #${filters.catalogItemId} обновлен.`,
                )
              }
            >
              Обновить элемент
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
