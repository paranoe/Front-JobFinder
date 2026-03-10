# Frontend (React + Vite)

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment variables

Create `.env` in project root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Routes

- `/vacancies` - list of vacancies
- `/vacancies/:id` - vacancy details page

## Expected API shape

`GET /vacancies`:

```json
[
  {
    "id": 1,
    "title": "Frontend Developer",
    "company": "Acme",
    "location": "Minsk",
    "salary": "$2500",
    "description": "Optional",
    "requirements": "Optional"
  }
]
```

`GET /vacancies/:id`:

```json
{
  "id": 1,
  "title": "Frontend Developer",
  "company": "Acme",
  "location": "Minsk",
  "salary": "$2500",
  "description": "Full description",
  "requirements": "Required skills"
}
```
