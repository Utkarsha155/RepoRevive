"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "../common/Button";
import Input from "../common/Input";

import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {

  const router = useRouter();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleLogin = async (e: React.FormEvent) => {

    e.preventDefault();

    try {

      const res = await login(formData);

      if (res.success) {

        alert("Login Successful!");

        router.push("/dashboard");

      }

    } catch (error: any) {

      alert(error.response?.data?.message || "Login Failed");

    }

  };

  return (

    <form
      onSubmit={handleLogin}
      className="space-y-6"
    >
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
      />

      <Button>

        Login

      </Button>

    </form>

  );

}