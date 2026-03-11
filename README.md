# Front JobFinder

React + TypeScript frontend для backend проекта JobFinder FastAPI.

## Что уже реализовано
- Vite + React + TypeScript (strict)
- React Router (public/account/admin/auth)
- MUI + кастомная тема
- React Query + Zustand
- axios c interceptors
- Базовые страницы: лента вакансий, карточка вакансии, auth, account, admin
- Error Boundary, skeleton/error состояния
- ESLint + Prettier + Husky

## Запуск
```bash
npm install
npm run dev
```

Приложение запускается на `http://localhost:3000`.

## Переменные окружения
Создайте `.env`:
```bash
VITE_API_BASE_URL=http://localhost:8000/api/v1
```
