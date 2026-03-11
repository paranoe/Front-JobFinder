import { Link } from "react-router-dom";

const categories = [
  "IT и разработка",
  "Продажи",
  "Маркетинг",
  "Финансы",
  "Дизайн",
  "Логистика",
];

const advantages = [
  {
    title: "Прозрачный поиск",
    text: "Удобная лента вакансий и фильтрация по параметрам прямо из вашего backend API.",
  },
  {
    title: "Современный интерфейс",
    text: "Чистый UI в стиле топовых job-платформ, адаптивный под десктоп и мобильные устройства.",
  },
  {
    title: "Сквозные роли",
    text: "Единый дизайн для соискателя, работодателя и администратора без разрыва UX.",
  },
];

export default function HomePage() {
  return (
    <section className="landing stack-lg">
      <div className="landing-hero card">
        <div className="landing-hero-content stack-md">
          <p className="eyebrow">Платформа под ваш FastAPI backend</p>
          <h1>Новый уровень найма и поиска работы</h1>
          <p className="landing-hero-copy">
            JobFinder — современный сервис для кандидатов и компаний. Быстро ищите вакансии,
            откликайтесь и управляйте подбором в едином интерфейсе.
          </p>
          <div className="landing-hero-actions">
            <Link to="/vacancies" className="button">
              К вакансиям
            </Link>
            <Link to="/account/login?role=applicant&backurl=%2F" className="button button-secondary">
              Войти в кабинет
            </Link>
          </div>
        </div>
        <div className="landing-hero-visual" aria-hidden="true">
          <div className="landing-hero-photo" />
        </div>
      </div>

      <div className="landing-stats">
        <div className="card landing-stat">
          <strong>24/7</strong>
          <span>доступ к платформе</span>
        </div>
        <div className="card landing-stat">
          <strong>3 роли</strong>
          <span>в едином UX-подходе</span>
        </div>
        <div className="card landing-stat">
          <strong>FastAPI</strong>
          <span>нативная интеграция backend</span>
        </div>
      </div>

      <div className="card landing-block">
        <div className="landing-block-head">
          <h2>Популярные направления</h2>
          <Link to="/vacancies" className="landing-link">
            Смотреть всё
          </Link>
        </div>
        <div className="landing-categories">
          {categories.map((item) => (
            <Link key={item} to="/vacancies" className="landing-category">
              {item}
            </Link>
          ))}
        </div>
      </div>

      <div className="landing-two-cols">
        <div className="card landing-block">
          <h2>Почему JobFinder</h2>
          <div className="landing-advantages">
            {advantages.map((item) => (
              <article key={item.title} className="landing-adv-item">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="card landing-block stack-md">
          <h2>Запуск в 3 шага</h2>
          <div className="subcard">
            <strong>1.</strong> Зарегистрируйтесь по роли и войдите в кабинет
          </div>
          <div className="subcard">
            <strong>2.</strong> Заполните профиль или создайте вакансию в пару кликов
          </div>
          <div className="subcard">
            <strong>3.</strong> Откликайтесь и управляйте подбором в единой панели
          </div>
        </div>
      </div>
    </section>
  );
}
