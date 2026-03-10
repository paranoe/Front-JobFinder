import { apiRequest } from "./client";
import { getStoredAuth } from "../state/authStorage";

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
  const refreshToken = getStoredAuth()?.refreshToken;
  return apiRequest("/api/v1/auth/logout", {
    method: "POST",
    auth: true,
    body: refreshToken ? { refresh_token: refreshToken } : undefined,
  });
}

export function logoutAllUserSessions() {
  return apiRequest("/api/v1/auth/logout-all", {
    method: "POST",
    auth: true,
  });
}
