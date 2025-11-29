"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // Fix import

// Define what a User looks like in your app
interface User {
  id: string;
  email: string;
  fullName?: string;  
  avatarUrl?: string;
  role: "SUPER_ADMIN" | "EDITOR" | "USER";
  exp: number; // Expiration time
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // 1. Check for existing session on load
  useEffect(() => {
    const storedToken = Cookies.get("access_token");
    if (storedToken) {
      try {
        const decoded = jwtDecode<User>(storedToken);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setToken(storedToken);
          setUser(decoded);
        }
      } catch (error) {
        logout(); // Invalid token
      }
    }
    setIsLoading(false);
  }, []);

  // 2. Login Action
  const login = (newToken: string) => {
    Cookies.set("access_token", newToken, { expires: 1 }); // Expires in 1 day
    const decoded = jwtDecode<User>(newToken);
    setToken(newToken);
    setUser(decoded);
    router.refresh(); // Refresh server components
  };

  // 3. Logout Action
  const logout = () => {
    Cookies.remove("access_token");
    setToken(null);
    setUser(null);
    router.push("/login"); // Redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook for easy usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};