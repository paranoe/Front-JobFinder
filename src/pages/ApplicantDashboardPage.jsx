import { useEffect, useState } from "react";
import {
  addEducation,
  addResumeSkill,
  addResumeSkillsBatch,
  addWorkExperience,
  applyToVacancy,
  createResume,
  deleteEducation,
  deleteResume,
  deleteWorkExperience,
  getApplicantProfile,
  getApplicantResumes,
  getMyApplications,
  removeResumeSkill,
  updateApplicantProfile,
  updateEducation,
  updateResume,
  updateWorkExperience,
} from "../api/applicant";
import { formatDate, formatDateTime, stringifyError } from "../utils/format";

const profileDefaults = {
  photo: "",
  phone: "",
  birth_date: "",
  gender: "",
  first_name: "",
  last_name: "",
  middle_name: "",
  city_name: "",
};

const resumeDefaults = { profession_id: "" };
const educationDefaults = { institution_id: "", start_date: "", end_date: "" };
const workDefaults = {
  resume_id: "",
  company_name: "",
  position: "",
  start_date: "",
  end_date: "",
  description: "",
};
const applicationDefaults = { vacancy_id: "", resume_id: "", status: "pending" };
const workLabels = {
  resume_id: "ID резюме",
  company_name: "Компания",
  position: "Должность",
  start_date: "Дата начала",
  end_date: "Дата окончания",
  description: "Описание обязанностей",
};

const profileLabels = {
  photo: "Фото (URL)",
  phone: "Телефон",
  birth_date: "Дата рождения",
  gender: "Пол",
  first_name: "Имя",
  last_name: "Фамилия",
  middle_name: "Отчество",
  city_name: "Город",
};

export default function ApplicantDashboardPage() {
  const [profile, setProfile] = useState(profileDefaults);
  const [educations, setEducations] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [applications, setApplications] = useState([]);
  const [resumeForm, setResumeForm] = useState(resumeDefaults);
  const [educationForm, setEducationForm] = useState(educationDefaults);
  const [workForm, setWorkForm] = useState(workDefaults);
  const [skillForm, setSkillForm] = useState({ resume_id: "", name: "", batch: "" });
  const [applicationForm, setApplicationForm] = useState(applicationDefaults);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      setLoading(true);
      const [profileData, resumesData, applicationsData] = await Promise.all([
        getApplicantProfile(),
        getApplicantResumes({ limit: 100 }),
        getMyApplications({ limit: 100 }),
      ]);

      setProfile({
        ...profileDefaults,
        ...profileData,
        city_name: profileData.city?.name || "",
      });
      setEducations(profileData.educations || []);
      setResumes(resumesData || []);
      setApplications(applicationsData || []);
      setApplicationForm((current) => ({
        ...current,
        resume_id: resumesData?.[0] ? String(resumesData[0].id) : "",
      }));
      setWorkForm((current) => ({
        ...current,
        resume_id: resumesData?.[0] ? String(resumesData[0].id) : "",
      }));
      setSkillForm((current) => ({
        ...current,
        resume_id: resumesData?.[0] ? String(resumesData[0].id) : "",
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

  if (loading) {
    return <p>Загрузка кабинета...</p>;
  }

  return (
    <section className="stack-lg">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Личный кабинет</p>
          <h1>Соискатель</h1>
        </div>
        {message && <p className="info">{message}</p>}
      </div>

      <div className="dashboard-grid">
        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            runAction(() => updateApplicantProfile(profile), "Профиль соискателя обновлен.");
          }}
        >
          <h2>Профиль соискателя</h2>
          {Object.entries(profileDefaults).map(([key]) => (
            <label key={key}>
              <span>{profileLabels[key] || key}</span>
              <input
                type={key.includes("date") ? "date" : "text"}
                value={profile[key] || ""}
                onChange={(e) => patchState(setProfile, key, e.target.value)}
              />
            </label>
          ))}
          <button className="button" type="submit">
            Сохранить профиль
          </button>
        </form>

        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            runAction(
              () => createResume({ profession_id: Number(resumeForm.profession_id) }),
              "Резюме создано.",
            );
            setResumeForm(resumeDefaults);
          }}
        >
          <h2>Новое резюме</h2>
          <label>
            <span>ID профессии</span>
            <input
              type="number"
              value={resumeForm.profession_id}
              onChange={(e) => patchState(setResumeForm, "profession_id", e.target.value)}
              required
            />
          </label>
          <button className="button" type="submit">
            Создать резюме
          </button>
        </form>

        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            const payload = {
              institution_id: Number(educationForm.institution_id),
              start_date: educationForm.start_date,
              end_date: educationForm.end_date || null,
            };
            runAction(() => addEducation(payload), "Образование добавлено.");
            setEducationForm(educationDefaults);
          }}
        >
          <h2>Добавить образование</h2>
          <label>
            <span>ID учебного учреждения</span>
            <input
              type="number"
              value={educationForm.institution_id}
              onChange={(e) => patchState(setEducationForm, "institution_id", e.target.value)}
              required
            />
          </label>
          <label>
            <span>Дата начала</span>
            <input
              type="date"
              value={educationForm.start_date}
              onChange={(e) => patchState(setEducationForm, "start_date", e.target.value)}
              required
            />
          </label>
          <label>
            <span>Дата окончания</span>
            <input
              type="date"
              value={educationForm.end_date}
              onChange={(e) => patchState(setEducationForm, "end_date", e.target.value)}
            />
          </label>
          <button className="button" type="submit">
            Добавить
          </button>
        </form>
      </div>

      <div className="dashboard-grid">
        <div className="card stack-md">
          <h2>Резюме</h2>
          {resumes.map((resume) => (
            <div key={resume.id} className="subcard stack-sm">
              <div className="row-between">
                <strong>
                  #{resume.id} {resume.profession?.name || `profession_id=${resume.profession_id}`}
                </strong>
                <div className="inline-actions">
                  <button
                    className="button button-ghost"
                    type="button"
                    onClick={() =>
                      runAction(
                        () => updateResume(resume.id, { profession_id: resume.profession_id }),
                        `Резюме #${resume.id} обновлено.`,
                      )
                    }
                  >
                    PUT sync
                  </button>
                  <button
                    className="button button-danger"
                    type="button"
                    onClick={() => runAction(() => deleteResume(resume.id), `Резюме #${resume.id} удалено.`)}
                  >
                    Удалить
                  </button>
                </div>
              </div>
              <p className="muted">
                Создано {formatDateTime(resume.created_at)} · Обновлено {formatDateTime(resume.updated_at)}
              </p>
              <div className="chips">
                {resume.skills?.map((skill) => (
                  <button
                    key={skill.id}
                    className="chip button-reset"
                    type="button"
                    onClick={() =>
                      runAction(
                        () => removeResumeSkill(resume.id, skill.id),
                        `Навык ${skill.name} удален.`,
                      )
                    }
                  >
                    {skill.name} ×
                  </button>
                ))}
              </div>
              <div className="stack-sm">
                {resume.work_experiences?.map((exp) => (
                  <div key={exp.id} className="inline-panel">
                    <span>
                      {exp.company_name} · {exp.position} · {formatDate(exp.start_date)} -{" "}
                      {formatDate(exp.end_date)}
                    </span>
                    <div className="inline-actions">
                      <button
                        className="button button-ghost"
                        type="button"
                        onClick={() =>
                          runAction(
                            () =>
                              updateWorkExperience(resume.id, exp.id, {
                                company_name: exp.company_name,
                                position: exp.position,
                                start_date: exp.start_date,
                                end_date: exp.end_date,
                                description: exp.description,
                              }),
                            `Опыт #${exp.id} обновлен.`,
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
                            () => deleteWorkExperience(resume.id, exp.id),
                            `Опыт #${exp.id} удален.`,
                          )
                        }
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {!resumes.length && <p className="muted">Резюме пока нет.</p>}
        </div>

        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            const resumeId = Number(skillForm.resume_id);
            if (skillForm.batch.trim()) {
              runAction(
                () =>
                  addResumeSkillsBatch(resumeId, {
                    skills: skillForm.batch.split(",").map((item) => item.trim()).filter(Boolean),
                  }),
                "Пакет навыков добавлен.",
              );
            } else {
              runAction(() => addResumeSkill(resumeId, { name: skillForm.name }), "Навык добавлен.");
            }
            setSkillForm((current) => ({ ...current, name: "", batch: "" }));
          }}
        >
          <h2>Навыки резюме</h2>
          <label>
            <span>ID резюме</span>
            <input
              type="number"
              value={skillForm.resume_id}
              onChange={(e) => patchState(setSkillForm, "resume_id", e.target.value)}
              required
            />
          </label>
          <label>
            <span>Один навык</span>
            <input
              value={skillForm.name}
              onChange={(e) => patchState(setSkillForm, "name", e.target.value)}
            />
          </label>
          <label>
            <span>Или batch через запятую</span>
            <textarea
              value={skillForm.batch}
              onChange={(e) => patchState(setSkillForm, "batch", e.target.value)}
            />
          </label>
          <button className="button" type="submit">
            Добавить навык(и)
          </button>
        </form>

        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            runAction(
              () =>
                addWorkExperience(Number(workForm.resume_id), {
                  resume_id: Number(workForm.resume_id),
                  company_name: workForm.company_name,
                  position: workForm.position,
                  start_date: workForm.start_date,
                  end_date: workForm.end_date || null,
                  description: workForm.description || null,
                }),
              "Опыт работы добавлен.",
            );
            setWorkForm((current) => ({ ...workDefaults, resume_id: current.resume_id }));
          }}
        >
          <h2>Опыт работы</h2>
          {Object.entries(workDefaults).map(([key]) => (
            <label key={key}>
              <span>{workLabels[key] || key}</span>
              {key.includes("date") ? (
                <input
                  type="date"
                  value={workForm[key]}
                  onChange={(e) => patchState(setWorkForm, key, e.target.value)}
                  required={key === "start_date"}
                />
              ) : key === "description" ? (
                <textarea
                  value={workForm[key]}
                  onChange={(e) => patchState(setWorkForm, key, e.target.value)}
                />
              ) : (
                <input
                  type={key === "resume_id" ? "number" : "text"}
                  value={workForm[key]}
                  onChange={(e) => patchState(setWorkForm, key, e.target.value)}
                  required={["resume_id", "company_name", "position"].includes(key)}
                />
              )}
            </label>
          ))}
          <button className="button" type="submit">
            Добавить опыт
          </button>
        </form>
      </div>

      <div className="dashboard-grid">
        <div className="card stack-md">
          <h2>Образование</h2>
          {educations.map((education) => (
            <div key={education.id} className="inline-panel">
              <span>
                #{education.id} institution_id={education.institution_id} · {formatDate(education.start_date)} -{" "}
                {formatDate(education.end_date)}
              </span>
              <div className="inline-actions">
                <button
                  className="button button-ghost"
                  type="button"
                  onClick={() =>
                    runAction(
                      () =>
                        updateEducation(education.id, {
                          institution_id: education.institution_id,
                          start_date: education.start_date,
                          end_date: education.end_date,
                        }),
                      `Образование #${education.id} обновлено.`,
                    )
                  }
                >
                  PUT sync
                </button>
                <button
                  className="button button-danger"
                  type="button"
                  onClick={() =>
                    runAction(() => deleteEducation(education.id), `Образование #${education.id} удалено.`)
                  }
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
          {!educations.length && <p className="muted">Образование еще не добавлено.</p>}
        </div>

        <form
          className="card stack-md"
          onSubmit={(e) => {
            e.preventDefault();
            runAction(
              () =>
                applyToVacancy({
                  vacancy_id: Number(applicationForm.vacancy_id),
                  resume_id: Number(applicationForm.resume_id),
                  status: applicationForm.status,
                }),
              "Отклик отправлен.",
            );
          }}
        >
          <h2>Отклик по ID</h2>
          <label>
            <span>ID вакансии</span>
            <input
              type="number"
              value={applicationForm.vacancy_id}
              onChange={(e) => patchState(setApplicationForm, "vacancy_id", e.target.value)}
              required
            />
          </label>
          <label>
            <span>ID резюме</span>
            <input
              type="number"
              value={applicationForm.resume_id}
              onChange={(e) => patchState(setApplicationForm, "resume_id", e.target.value)}
              required
            />
          </label>
          <label>
            <span>Статус</span>
            <select
              value={applicationForm.status}
              onChange={(e) => patchState(setApplicationForm, "status", e.target.value)}
            >
              <option value="pending">pending</option>
              <option value="viewed">viewed</option>
              <option value="accepted">accepted</option>
              <option value="rejected">rejected</option>
              <option value="cancelled">cancelled</option>
            </select>
          </label>
          <button className="button" type="submit">
            Отправить
          </button>
        </form>

        <div className="card stack-md">
          <h2>Мои отклики</h2>
          {applications.map((application) => (
            <div key={`${application.vacancy_id}-${application.resume_id}`} className="inline-panel">
              <span>
                vacancy #{application.vacancy_id} · resume #{application.resume_id} · {application.status}
              </span>
              <span className="muted">{formatDateTime(application.created_at)}</span>
            </div>
          ))}
          {!applications.length && <p className="muted">Откликов пока нет.</p>}
        </div>
      </div>
    </section>
  );
}
