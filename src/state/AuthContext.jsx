import { createContext, useContext, useEffect, useState } from "react";
import { clearStoredAuth, getStoredAuth, updateStoredAuth } from "./authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth());

  useEffect(() => {
    function handleAuthChanged(event) {
      setAuth(event.detail ?? null);
    }

    window.addEventListener("jobfinder:auth-changed", handleAuthChanged);
    return () => {
      window.removeEventListener("jobfinder:auth-changed", handleAuthChanged);
    };
  }, []);

  const value = {
    auth,
    isAuthenticated: Boolean(auth?.accessToken),
    role: auth?.role || null,
    setAuthSession(session) {
      setAuth(updateStoredAuth(session));
    },
    clearAuthSession() {
      clearStoredAuth();
      setAuth(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
