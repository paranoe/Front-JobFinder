# JobFinder Frontend (React + Vite)

Frontend для `JobFinder-FastApi` с ролями:
- `applicant`
- `company`
- `admin`

## Быстрый старт

```bash
npm install
cp .env.example .env
npm run dev
```

## Порты

- Frontend (Vite dev): `http://localhost:3000`
- Backend (FastAPI): `http://localhost:8000`

В dev-режиме Vite проксирует запросы `/api/*` на backend, поэтому CORS на FastAPI не требуется.

## Переменные окружения

`.env`:

```env
# Пусто = запросы идут на текущий origin (/api/*), удобно для vite proxy
VITE_API_BASE_URL=

# Цель прокси для npm run dev
VITE_PROXY_TARGET=http://localhost:8000
```

Если нужно обращаться к API напрямую (без proxy), укажи полный адрес:

```env
VITE_API_BASE_URL=http://localhost:8000
```

## Основные маршруты

- `/vacancies` - публичная лента вакансий
- `/vacancies/:id` - карточка вакансии + отклик
- `/auth/login`, `/auth/register` - авторизация
- `/applicant` - кабинет соискателя
- `/company` - кабинет компании
- `/admin` - админ-панель
