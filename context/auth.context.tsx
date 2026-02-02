import * as authService from "@/api/authService";
import * as authStore from "@/storage/token.storage";
import { User } from "@/types/user.type";
import React, { createContext, useEffect, useMemo, useState } from "react";

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isLoggedIn: boolean;
};

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = !!user;

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.loginRequest(email, password);

      if (!response.success) throw new Error("Login failed");

      const token = response.token;
      await authStore.saveTokens(token);

      const me = await authService.getMe();
      setUser(me.user);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await authStore.clearTokens();
    setUser(null);
  };

  useEffect(() => {
    const bootstrap = async () => {
      try {
        setIsLoading(true);

        const token = await authStore.getAccessToken();
        if (!token) return;

        const profile = await authService.getMe();
        setUser(profile.user);
      } catch {
        await authStore.clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    bootstrap();
  }, []);

  const value = useMemo(
    () => ({ user, login, logout, isLoading, error, isLoggedIn }),
    [user, isLoading, error, isLoggedIn],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
