import { apiRequest } from "./client";

export function getAdminUsers(params) {
  return apiRequest("/api/v1/admin/users", { params, auth: true });
}

export function updateAdminUserStatus(userId, body) {
  return apiRequest(`/api/v1/admin/users/${userId}/status`, {
    method: "PATCH",
    body,
    auth: true,
  });
}

export function getAdminCompanies(params) {
  return apiRequest("/api/v1/admin/companies", { params, auth: true });
}

export function deleteAdminCompany(companyId) {
  return apiRequest(`/api/v1/admin/companies/${companyId}`, {
    method: "DELETE",
    auth: true,
  });
}

export function getAdminApplicants(params) {
  return apiRequest("/api/v1/admin/applicants", { params, auth: true });
}

export function deleteAdminApplicant(applicantId) {
  return apiRequest(`/api/v1/admin/applicants/${applicantId}`, {
    method: "DELETE",
    auth: true,
  });
}

export function getAdminVacancies(params) {
  return apiRequest("/api/v1/admin/vacancies", { params, auth: true });
}

export function getAdminVacancy(vacancyId) {
  return apiRequest(`/api/v1/admin/vacancies/${vacancyId}`, { auth: true });
}

export function updateAdminVacancyStatus(vacancyId, body) {
  return apiRequest(`/api/v1/admin/vacancies/${vacancyId}/status`, {
    method: "PATCH",
    body,
    auth: true,
  });
}

export function deleteAdminVacancy(vacancyId) {
  return apiRequest(`/api/v1/admin/vacancies/${vacancyId}`, {
    method: "DELETE",
    auth: true,
  });
}

export function getAdminApplications(params) {
  return apiRequest("/api/v1/admin/applications", { params, auth: true });
}

export function getCatalogItems(catalogName, params) {
  return apiRequest(`/api/v1/admin/catalogs/${catalogName}`, {
    params,
    auth: true,
  });
}

export function createCatalogItem(catalogName, body) {
  return apiRequest(`/api/v1/admin/catalogs/${catalogName}`, {
    method: "POST",
    body,
    auth: true,
  });
}

export function updateCatalogItem(catalogName, itemId, body) {
  return apiRequest(`/api/v1/admin/catalogs/${catalogName}/${itemId}`, {
    method: "PUT",
    body,
    auth: true,
  });
}

export function deleteCatalogItem(catalogName, itemId) {
  return apiRequest(`/api/v1/admin/catalogs/${catalogName}/${itemId}`, {
    method: "DELETE",
    auth: true,
  });
}
