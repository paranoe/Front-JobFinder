const STORAGE_KEY = "jobfinder.auth";

export function getStoredAuth() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function updateStoredAuth(patch) {
  const next = { ...(getStoredAuth() || {}), ...patch };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("jobfinder:auth-changed", { detail: next }));
  return next;
}

export function clearStoredAuth() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("jobfinder:auth-changed", { detail: null }));
}
