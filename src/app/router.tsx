import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '../shared/layout/PublicLayout';
import { VacanciesPage } from '../modules/public/pages/VacanciesPage';
import { VacancyDetailsPage } from '../modules/public/pages/VacancyDetailsPage';
import { StaticPage } from '../modules/public/pages/StaticPage';
import { LoginPage } from '../modules/auth/pages/LoginPage';
import { RegisterPage } from '../modules/auth/pages/RegisterPage';
import { AccountLayout } from '../shared/layout/AccountLayout';
import { ResumePage } from '../modules/account/pages/ResumePage';
import { ResponsesPage } from '../modules/account/pages/ResponsesPage';
import { FavoritesPage } from '../modules/account/pages/FavoritesPage';
import { PlaceholderPage } from '../modules/account/pages/PlaceholderPage';
import { AdminLayout } from '../shared/layout/AdminLayout';
import { RoleGuard } from '../shared/components/RoleGuard';
import { AdminDashboardPage } from '../modules/admin/pages/AdminDashboardPage';
import { AdminUsersPage } from '../modules/admin/pages/AdminUsersPage';
import { AdminVacanciesPage } from '../modules/admin/pages/AdminVacanciesPage';
import { AdminDictionariesPage } from '../modules/admin/pages/AdminDictionariesPage';
import { AdminPlaceholderPage } from '../modules/admin/pages/AdminPlaceholderPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <VacanciesPage /> },
      { path: 'vacancies/:id', element: <VacancyDetailsPage /> },
      { path: 'about', element: <StaticPage title="О платформе" text="JobFinder соединяет соискателей и работодателей." /> },
      { path: 'help', element: <StaticPage title="Помощь" text="FAQ, поддержка и рекомендации по поиску вакансий." /> },
      { path: 'terms', element: <StaticPage title="Условия" text="Пользовательское соглашение и политика обработки данных." /> },
      { path: 'auth/login', element: <LoginPage /> },
      { path: 'auth/register', element: <RegisterPage /> },
    ],
  },
  {
    path: '/account',
    element: <AccountLayout />,
    children: [
      { path: 'resume', element: <ResumePage /> },
      { path: 'responses', element: <ResponsesPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'profile', element: <PlaceholderPage title="Настройки профиля" /> },
      { path: 'notifications', element: <PlaceholderPage title="Настройки уведомлений" /> },
    ],
  },
  {
    element: <RoleGuard role="admin" />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: 'users', element: <AdminUsersPage /> },
          { path: 'companies', element: <AdminPlaceholderPage title="Компании" /> },
          { path: 'applicants', element: <AdminPlaceholderPage title="Соискатели" /> },
          { path: 'vacancies', element: <AdminVacanciesPage /> },
          { path: 'responses', element: <AdminPlaceholderPage title="Отклики" /> },
          { path: 'dictionaries/:entity', element: <AdminDictionariesPage /> },
        ],
      },
    ],
  },
]);
