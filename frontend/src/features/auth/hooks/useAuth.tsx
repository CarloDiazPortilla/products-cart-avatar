import React, { createContext, useContext, useState, useCallback } from "react";
import type { AuthState, User } from "../../../shared/interfaces/user";
import { login as loginService, logout as logoutService } from "../services/auth.service"

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const loadInitialState = (): AuthState => {
  const token = localStorage.getItem("accessToken");
  const raw = localStorage.getItem("user");
  if (token && raw) {
    try {
      const user: User = JSON.parse(raw);
      return { user, accessToken: token, isAuthenticated: true };
    } catch (error) {
      console.log(error);
    }
  }
  return { user: null, accessToken: null, isAuthenticated: false };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthState>(loadInitialState);

  const login = useCallback(async (email: string, password: string) => {
    const res = await loginService({ email, password });

    if (!res.data) throw new Error(res.message);

    const { accessToken, user } = res.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    setState({ user, accessToken, isAuthenticated: true });
  }, []);

  const logout = useCallback(async () => {
    await logoutService();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setState({ user: null, accessToken: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }
    }>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
