import { apiRequest } from "./client";

export function getApplicantProfile() {
  return apiRequest("/api/v1/applicants/me", { auth: true });
}

export function updateApplicantProfile(body) {
  return apiRequest("/api/v1/applicants/me", {
    method: "PUT",
    body,
    auth: true,
  });
}

export function getApplicantResumes(params) {
  return apiRequest("/api/v1/applicants/me/resumes", { params, auth: true });
}

export function createResume(body) {
  return apiRequest("/api/v1/applicants/me/resumes", {
    method: "POST",
    body,
    auth: true,
  });
}

export function updateResume(resumeId, body) {
  return apiRequest(`/api/v1/applicants/me/resumes/${resumeId}`, {
    method: "PUT",
    body,
    auth: true,
  });
}

export function deleteResume(resumeId) {
  return apiRequest(`/api/v1/applicants/me/resumes/${resumeId}`, {
    method: "DELETE",
    auth: true,
  });
}

export function addResumeSkill(resumeId, body) {
  return apiRequest(`/api/v1/applicants/me/resumes/${resumeId}/skills`, {
    method: "POST",
    body,
    auth: true,
  });
}

export function addResumeSkillsBatch(resumeId, body) {
  return apiRequest(`/api/v1/applicants/me/resumes/${resumeId}/skills/batch`, {
    method: "POST",
    body,
    auth: true,
  });
}

export function removeResumeSkill(resumeId, skillId) {
  return apiRequest(
    `/api/v1/applicants/me/resumes/${resumeId}/skills/${skillId}`,
    {
      method: "DELETE",
      auth: true,
    },
  );
}

export function addWorkExperience(resumeId, body) {
  return apiRequest(
    `/api/v1/applicants/me/resumes/${resumeId}/work-experiences`,
    {
      method: "POST",
      body,
      auth: true,
    },
  );
}

export function updateWorkExperience(resumeId, expId, body) {
  return apiRequest(
    `/api/v1/applicants/me/resumes/${resumeId}/work-experiences/${expId}`,
    {
      method: "PUT",
      body,
      auth: true,
    },
  );
}

export function deleteWorkExperience(resumeId, expId) {
  return apiRequest(
    `/api/v1/applicants/me/resumes/${resumeId}/work-experiences/${expId}`,
    {
      method: "DELETE",
      auth: true,
    },
  );
}

export function addEducation(body) {
  return apiRequest("/api/v1/applicants/me/education", {
    method: "POST",
    body,
    auth: true,
  });
}

export function updateEducation(eduId, body) {
  return apiRequest(`/api/v1/applicants/me/education/${eduId}`, {
    method: "PUT",
    body,
    auth: true,
  });
}

export function deleteEducation(eduId) {
  return apiRequest(`/api/v1/applicants/me/education/${eduId}`, {
    method: "DELETE",
    auth: true,
  });
}

export function getMyApplications(params) {
  return apiRequest("/api/v1/applicants/me/applications", {
    params,
    auth: true,
  });
}

export function applyToVacancy(body) {
  return apiRequest("/api/v1/applicants/me/applications", {
    method: "POST",
    body,
    auth: true,
  });
}
