import {
  clearStoredAuth,
  getStoredAuth,
  updateStoredAuth,
} from "../state/authStorage";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "")
  .trim()
  .replace(/\/+$/, "");

function buildUrl(path, params) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, value);
      }
    });
  }

  return url.toString();
}

async function refreshTokens() {
  const auth = getStoredAuth();

  if (!auth?.refreshToken) {
    clearStoredAuth();
    return null;
  }

  const response = await fetch(buildUrl("/api/v1/auth/refresh"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: auth.refreshToken }),
  });

  if (!response.ok) {
    clearStoredAuth();
    return null;
  }

  const data = await response.json();
  updateStoredAuth({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  });

  return data;
}

export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    params,
    body,
    headers,
    auth = false,
    retry = true,
  } = options;
  const authState = getStoredAuth();
  const requestHeaders = new Headers(headers || {});

  if (body !== undefined && !(body instanceof FormData)) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (auth && authState?.accessToken) {
    requestHeaders.set("Authorization", `Bearer ${authState.accessToken}`);
  }

  const response = await fetch(buildUrl(path, params), {
    method,
    credentials: "include",
    headers: requestHeaders,
    body:
      body === undefined
        ? undefined
        : body instanceof FormData
          ? body
          : JSON.stringify(body),
  });

  if (response.status === 401 && auth && retry) {
    const refreshed = await refreshTokens();

    if (refreshed?.access_token) {
      return apiRequest(path, { ...options, retry: false, auth: true });
    }
  }

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}`;

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        message = errorData.detail;
      } else if (Array.isArray(errorData?.detail)) {
        message = errorData.detail.map((item) => item.msg).join(", ");
      }
    } catch {
      const text = await response.text();
      if (text) {
        message = text;
      }
    }

    throw new Error(message);
  }

  const contentType = response.headers.get("Content-Type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}
