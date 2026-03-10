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
    title: "1000+ актуальных вакансий",
    text: "Свежие предложения от проверенных компаний ежедневно.",
  },
  {
    title: "Удобный поиск и фильтры",
    text: "Быстро находите предложения по навыкам, городу и зарплате.",
  },
  {
    title: "Прямой отклик",
    text: "Откликайтесь в пару кликов и отслеживайте статус заявок.",
  },
];

const employerCards = [
  {
    name: "TechNova",
    role: "Нанимает Frontend и Backend",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Retail Group",
    role: "Нанимает Product и Analysts",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "LogiX",
    role: "Нанимает Operations и Support",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80",
  },
];

export default function HomePage() {
  return (
    <section className="landing stack-lg">
      <div className="landing-hero card">
        <div className="landing-hero-content">
          <p className="eyebrow">Платформа поиска работы</p>
          <h1>Найдите работу мечты быстрее</h1>
          <p className="landing-hero-copy">
            Современный сервис поиска вакансий: от стажировки до senior-ролей.
            Умные фильтры, удобные отклики и прозрачный процесс найма.
          </p>
          <div className="landing-hero-actions">
            <Link to="/vacancies" className="button">
              Смотреть вакансии
            </Link>
            <Link to="/auth/login" className="button button-secondary">
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
          <strong>25 000+</strong>
          <span>вакансий в базе</span>
        </div>
        <div className="card landing-stat">
          <strong>4 200+</strong>
          <span>компаний нанимают</span>
        </div>
        <div className="card landing-stat">
          <strong>1 300+</strong>
          <span>новых вакансий в день</span>
        </div>
      </div>

      <div className="card landing-block">
        <div className="landing-block-head">
          <h2>Популярные направления</h2>
          <Link to="/vacancies" className="landing-link">
            Все вакансии
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

        <div className="card landing-block">
          <h2>Компании, которые нанимают</h2>
          <div className="landing-employers">
            {employerCards.map((company) => (
              <article key={company.name} className="landing-employer">
                <img src={company.image} alt={company.name} />
                <div>
                  <h3>{company.name}</h3>
                  <p className="muted">{company.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
