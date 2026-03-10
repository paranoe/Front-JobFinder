import { apiRequest } from "./client";

export function getCompanyProfile() {
  return apiRequest("/api/v1/companies/me", { auth: true });
}

export function updateCompanyProfile(body) {
  return apiRequest("/api/v1/companies/me", {
    method: "PUT",
    body,
    auth: true,
  });
}

export function getCompanyVacancies(params) {
  return apiRequest("/api/v1/companies/me/vacancies", {
    params,
    auth: true,
  });
}

export function createCompanyVacancy(body) {
  return apiRequest("/api/v1/companies/me/vacancies", {
    method: "POST",
    body,
    auth: true,
  });
}

export function updateCompanyVacancy(vacancyId, body) {
  return apiRequest(`/api/v1/companies/me/vacancies/${vacancyId}`, {
    method: "PUT",
    body,
    auth: true,
  });
}

export function deleteCompanyVacancy(vacancyId) {
  return apiRequest(`/api/v1/companies/me/vacancies/${vacancyId}`, {
    method: "DELETE",
    auth: true,
  });
}

export function addVacancySkill(vacancyId, body) {
  return apiRequest(`/api/v1/companies/me/vacancies/${vacancyId}/skills`, {
    method: "POST",
    body,
    auth: true,
  });
}

export function removeVacancySkill(vacancyId, skillId) {
  return apiRequest(
    `/api/v1/companies/me/vacancies/${vacancyId}/skills/${skillId}`,
    {
      method: "DELETE",
      auth: true,
    },
  );
}

export function getVacancyApplications(vacancyId, params) {
  return apiRequest(`/api/v1/companies/me/vacancies/${vacancyId}/applications`, {
    params,
    auth: true,
  });
}

export function updateVacancyApplication(vacancyId, resumeId, body) {
  return apiRequest(
    `/api/v1/companies/me/vacancies/${vacancyId}/applications/${resumeId}`,
    {
      method: "PATCH",
      body,
      auth: true,
    },
  );
}
