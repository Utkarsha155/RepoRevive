"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupForm() {

  const router = useRouter();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      const res = await register(formData);

      if (res.success) {

        alert("Registration Successful!");

        router.push("/dashboard");

      }

    } catch (error: any) {

      alert(error.response?.data?.error || "Registration Failed");

    }

  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2"
      >
        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-white/10 bg-[#16161D] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            required
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-xl border border-white/10 bg-[#16161D] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            required
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full rounded-xl border border-white/10 bg-[#16161D] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            required
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
            className="w-full rounded-xl border border-white/10 bg-[#16161D] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            required
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Confirm Password
          </label>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="w-full rounded-xl border border-white/10 bg-[#16161D] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            required
          />

        </div>
        <div className="md:col-span-2 pt-2">
          <div className="border-t border-white/10"></div>

          <p className="mt-4 text-sm font-medium text-gray-400">
            Optional Profile Information
          </p>
        </div>
        <div>

          <label className="mb-2 block text-sm text-gray-300 ">
            Address
          </label>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address (Optional)"
            className="md:col-span-2 w-full rounded-xl border border-white/10 bg-[#16161D] px-4 py-3 text-white outline-none"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            GitHub
          </label>

          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="md:col-span-2 w-full rounded-xl border border-white/10 bg-[#16161D] px-4 py-3 text-white outline-none"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            LinkedIn
          </label>

          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="md:col-span-2 w-full rounded-xl border border-white/10 bg-[#16161D] px-4 py-3 text-white outline-none"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-300">
            Portfolio
          </label>

          <input
            type="url"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className="md:col-span-2 w-full rounded-xl border border-white/10 bg-[#16161D] px-4 py-3 text-white outline-none"
          />

        </div>

        <button
          type="submit"
          className="md:col-span-2 w-full rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 py-3.5 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(139,92,246,0.35)]"
        >
          Create Account
        </button>



      </form>

      <div className="mt-8">
        <div className="mb-6 border-t border-white/10"></div>

        <p className="text-center text-sm text-gray-400">
          Already have an account?
          <Link
            href="/auth/login"
            className="ml-2 font-semibold text-violet-400 transition-colors duration-300 hover:text-violet-300"
          >
            Sign In
          </Link>
        </p>
      </div>
    </>
  );

}