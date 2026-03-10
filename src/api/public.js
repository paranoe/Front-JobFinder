import { apiRequest } from "./client";

export function getPublicVacancies(params) {
  return apiRequest("/api/v1/public/vacancies", { params });
}

export function getPublicVacancyById(vacancyId) {
  return apiRequest(`/api/v1/public/vacancies/${vacancyId}`);
}
