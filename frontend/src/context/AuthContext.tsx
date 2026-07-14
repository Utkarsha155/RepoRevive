"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/services/api";

type AuthContextType = {
  user: any;
  token: string | null;
  register: (formData: any) => Promise<any>;
  login: (formData: any) => Promise<any>;
  getProfile: () => Promise<any>;

  updateProfile: (formData: any) => Promise<any>;

  changePassword: (formData: any) => Promise<any>;

  deleteAccount: (password: string) => Promise<any>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  // Register User
  const register = async (formData: any) => {

    const { confirmPassword, ...data } = formData;

    const res = await api.post("/auth/register", data);

    const { user, token } = res.data;

    setUser(user);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    return res.data;

  };

  // Login User
  const login = async (formData: any) => {

    const res = await api.post("/auth/login", formData);

    const { user, token } = res.data;

    setUser(user);
    setToken(token);

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    return res.data;

  };

  // Logout
  const logout = () => {

    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");

  };

  const getProfile = async () => {

    const res = await api.get("/user/getuser");

    setUser(res.data.user);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    return res.data;

  }

  const updateProfile = async (formData: any) => {

    const res = await api.put("/user/updateuser", formData);

    setUser(res.data.user);

    localStorage.setItem("user", JSON.stringify(res.data.user));

    return res.data;

  }

  const changePassword = async (passwordData: any) => {

    const res = await api.put("/auth/change-password", passwordData);

    return res.data;

  }

  const deleteAccount = async (password: string) => {

    const res = await api.delete("/user/delete", {
      data: {
        password
      }
    });

    logout();

    return res.data;

  }

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        register,
        login,
        logout,
        getProfile,
        updateProfile,
        changePassword,
        deleteAccount
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

export const useAuth = () => {

  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;

};