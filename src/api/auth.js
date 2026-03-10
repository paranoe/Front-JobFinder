import { apiRequest } from "./client";

export function registerUser(payload) {
  return apiRequest("/api/v1/auth/register", {
    method: "POST",
    body: payload,
  });
}

export function loginUser(payload) {
  return apiRequest("/api/v1/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function logoutUser() {
  return apiRequest("/api/v1/auth/logout", {
    method: "POST",
    auth: true,
  });
}

export function logoutAllUserSessions() {
  return apiRequest("/api/v1/auth/logout-all", {
    method: "POST",
    auth: true,
  });
}
