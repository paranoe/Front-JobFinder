import { useEffect, useState } from "react";
import {
  addVacancySkill,
  createCompanyVacancy,
  deleteCompanyVacancy,
  getCompanyProfile,
  getCompanyVacancies,
  getVacancyApplications,
  removeVacancySkill,
  updateCompanyProfile,
  updateCompanyVacancy,
  updateVacancyApplication,
} from "../api/company";
import { formatDateTime, stringifyError } from "../utils/format";

const companyDefaults = {
  name: "",
  description: "",
  website: "",
  logo: "",
  founded_year: "",
  employee_count: "",
};

const vacancyDefaults = {
  title: "",
  description: "",
  profession_id: "",
  city_id: "",
  employment_type_id: "",
  work_schedule_id: "",
  salary_min: "",
  salary_max: "",
  currency_id: "",
  experience_id: "",
};

const companyLabels = {
  name: "Название",
  description: "Описание",
  website: "Сайт",
  logo: "Лого (URL)",
  founded_year: "Год основания",
  employee_count: "Количество сотрудников",
};

const vacancyLabels = {
  title: "Название вакансии",
  description: "Описание",
  profession_id: "ID профессии",
  city_id: "ID города",
  employment_type_id: "ID типа занятости",
  work_schedule_id: "ID графика",
  salary_min: "Зарплата от",
  salary_max: "Зарплата до",
  currency_id: "ID валюты",
  experience_id: "ID опыта",
};

export default function CompanyDashboardPage() {
  const [company, setCompany] = useState(companyDefaults);
  const [vacancies, setVacancies] = useState([]);
  const [vacancyForm, setVacancyForm] = useState(vacancyDefaults);
  const [skillForm, setSkillForm] = useState({ vacancy_id: "", name: "", skill_id: "" });
  const [applicationFilter, setApplicationFilter] = useState({
    vacancy_id: "",
    status: "",
    resume_id: "",
    next_status: "viewed",
  });
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      setLoading(true);
      const [companyData, vacanciesData] = await Promise.all([
        getCompanyProfile(),
        getCompanyVacancies({ limit: 100 }),
      ]);

      setCompany({
        ...companyDefaults,
        ...companyData,
      });
      setVacancies(vacanciesData || []);
      setSkillForm((current) => ({
        ...current,
        vacancy_id: vacanciesData?.[0] ? String(vacanciesData[0].id) : "",
      }));
      setApplicationFilter((current) => ({
        ...current,
        vacancy_id: vacanciesData?.[0] ? String(vacanciesData[0].id) : "",
      }));
    } catch (err) {
      setMessage(stringifyError(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function patchState(setter, key, value) {
    setter((current) => ({ ...current, [key]: value }));
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

  async function loadApplications() {
    try {
      setMessage("");
      const data = await getVacancyApplications(Number(applicationFilter.vacancy_id), {
        limit: 100,
        status: applicationFilter.status || undefined,
      });
      setApplications(data || []);
    } catch (err) {
      setMessage(stringifyError(err));
    }
  }

  if (loading) {
    return <p>Загрузка кабинета компании...</p>;
  }

  return (
    <section className="stack-lg">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Рабочая зона</p>
          <h1>Компания</h1>
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
                updateCompanyProfile({
                  ...company,
                  founded_year: company.founded_year ? Number(company.founded_year) : null,
                  employee_count: company.employee_count ? Number(company.employee_count) : null,
                }),
              "Профиль компании обновлен.",
            );
          }}
        >
          <h2>Профиль компании</h2>
          {Object.keys(companyDefaults).map((key) => (
            <label key={key}>
              <span>{companyLabels[key] || key}</span>
              {key === "description" ? (
                <textarea
                  value={company[key] || ""}
                  onChange={(e) => patchState(setCompany, key, e.target.value)}
                />
              ) : (
                <input
                  type={["founded_year", "employee_count"].includes(key) ? "number" : "text"}
                  value={company[key] || ""}
                  onChange={(e) => patchState(setCompany, key, e.target.value)}
                  required={key === "name"}
                />
              )}
            </label>
          ))}
          <button className="button" type="submit">
            Сохранить
          </button>
        </form>

        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            runAction(
              () =>
                createCompanyVacancy(
                  Object.fromEntries(
                    Object.entries(vacancyForm).map(([key, value]) => [
                      key,
                      ["title", "description"].includes(key) ? value : Number(value),
                    ]),
                  ),
                ),
              "Вакансия создана.",
            );
            setVacancyForm(vacancyDefaults);
          }}
        >
          <h2>Создать вакансию</h2>
          {Object.keys(vacancyDefaults).map((key) => (
            <label key={key}>
              <span>{vacancyLabels[key] || key}</span>
              {key === "description" ? (
                <textarea
                  value={vacancyForm[key]}
                  onChange={(e) => patchState(setVacancyForm, key, e.target.value)}
                  required
                />
              ) : (
                <input
                  type={key === "title" ? "text" : "number"}
                  value={vacancyForm[key]}
                  onChange={(e) => patchState(setVacancyForm, key, e.target.value)}
                  required
                />
              )}
            </label>
          ))}
          <button className="button" type="submit">
            Создать
          </button>
        </form>
      </div>

      <div className="dashboard-grid">
        <div className="card stack-md">
          <h2>Мои вакансии</h2>
          {vacancies.map((vacancy) => (
            <div key={vacancy.id} className="subcard stack-sm">
              <div className="row-between">
                <strong>
                  #{vacancy.id} {vacancy.title}
                </strong>
                <div className="inline-actions">
                  <button
                    className="button button-ghost"
                    type="button"
                    onClick={() =>
                      runAction(
                        () =>
                          updateCompanyVacancy(vacancy.id, {
                            title: vacancy.title,
                            description: vacancy.description,
                            profession_id: vacancy.profession_id,
                            city_id: vacancy.city_id,
                            employment_type_id: vacancy.employment_type_id,
                            work_schedule_id: vacancy.work_schedule_id,
                            salary_min: vacancy.salary_min,
                            salary_max: vacancy.salary_max,
                            currency_id: vacancy.currency_id,
                            experience_id: vacancy.experience_id,
                          }),
                        `Вакансия #${vacancy.id} обновлена.`,
                      )
                    }
                  >
                    PUT sync
                  </button>
                  <button
                    className="button button-danger"
                    type="button"
                    onClick={() =>
                      runAction(
                        () => deleteCompanyVacancy(vacancy.id),
                        `Вакансия #${vacancy.id} удалена.`,
                      )
                    }
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <p className="muted">
                status_id={vacancy.status_id} · city_id={vacancy.city_id} · profession_id=
                {vacancy.profession_id}
              </p>
              <p>
                salary {vacancy.salary_min} - {vacancy.salary_max} · updated {formatDateTime(vacancy.updated_at)}
              </p>
            </div>
          ))}
          {!vacancies.length && <p className="muted">Вакансии еще не созданы.</p>}
        </div>

        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            runAction(
              () => addVacancySkill(Number(skillForm.vacancy_id), { name: skillForm.name }),
              "Навык для вакансии добавлен.",
            );
            setSkillForm((current) => ({ ...current, name: "" }));
          }}
        >
          <h2>Навыки вакансии</h2>
          <label>
            <span>ID вакансии</span>
            <input
              type="number"
              value={skillForm.vacancy_id}
              onChange={(e) => patchState(setSkillForm, "vacancy_id", e.target.value)}
              required
            />
          </label>
          <label>
            <span>Навык</span>
            <input
              value={skillForm.name}
              onChange={(e) => patchState(setSkillForm, "name", e.target.value)}
              required
            />
          </label>
          <label>
            <span>ID навыка</span>
            <input
              type="number"
              value={skillForm.skill_id}
              onChange={(e) => patchState(setSkillForm, "skill_id", e.target.value)}
            />
          </label>
          <button className="button" type="submit">
            Добавить навык
          </button>
          <p className="muted">
            Удаление навыка требует `skill_id`; используйте его из ответа backend, если endpoint
            списка навыков будет расширен.
          </p>
          <button
            className="button button-ghost"
            type="button"
            onClick={() => {
              if (!skillForm.vacancy_id || !skillForm.skill_id) return;
              runAction(
                () => removeVacancySkill(Number(skillForm.vacancy_id), Number(skillForm.skill_id)),
                "Навык вакансии удален.",
              );
            }}
          >
            Удалить навык по ID
          </button>
        </form>

        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            loadApplications();
          }}
        >
          <h2>Отклики на вакансию</h2>
          <label>
            <span>ID вакансии</span>
            <input
              type="number"
              value={applicationFilter.vacancy_id}
              onChange={(e) => patchState(setApplicationFilter, "vacancy_id", e.target.value)}
              required
            />
          </label>
          <label>
            <span>Фильтр статуса</span>
            <select
              value={applicationFilter.status}
              onChange={(e) => patchState(setApplicationFilter, "status", e.target.value)}
            >
              <option value="">all</option>
              <option value="pending">pending</option>
              <option value="viewed">viewed</option>
              <option value="accepted">accepted</option>
              <option value="rejected">rejected</option>
              <option value="cancelled">cancelled</option>
            </select>
          </label>
          <button className="button" type="submit">
            Загрузить отклики
          </button>
          <div className="stack-sm">
            {applications.map((application) => (
              <div key={`${application.resume_id}-${application.vacancy_id}`} className="subcard stack-sm">
                <span>
                  resume #{application.resume_id} · {application.status}
                </span>
                <span className="muted">{formatDateTime(application.created_at)}</span>
              </div>
            ))}
          </div>
        </form>
      </div>

      <form
        className="card grid-form"
        onSubmit={(e) => {
          e.preventDefault();
          runAction(
            () =>
              updateVacancyApplication(
                Number(applicationFilter.vacancy_id),
                Number(applicationFilter.resume_id),
                { status: applicationFilter.next_status },
              ),
            "Статус отклика обновлен.",
          );
        }}
      >
        <h2>Изменить статус отклика</h2>
        <label>
          <span>ID вакансии</span>
          <input
            type="number"
            value={applicationFilter.vacancy_id}
            onChange={(e) => patchState(setApplicationFilter, "vacancy_id", e.target.value)}
            required
          />
        </label>
        <label>
          <span>ID резюме</span>
          <input
            type="number"
            value={applicationFilter.resume_id}
            onChange={(e) => patchState(setApplicationFilter, "resume_id", e.target.value)}
            required
          />
        </label>
        <label>
          <span>Новый статус</span>
          <select
            value={applicationFilter.next_status}
            onChange={(e) => patchState(setApplicationFilter, "next_status", e.target.value)}
          >
            <option value="viewed">viewed</option>
            <option value="accepted">accepted</option>
            <option value="rejected">rejected</option>
            <option value="cancelled">cancelled</option>
          </select>
        </label>
        <div className="form-actions">
          <button className="button" type="submit">
            Обновить статус
          </button>
        </div>
      </form>
    </section>
  );
}
