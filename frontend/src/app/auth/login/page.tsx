import Link from "next/link";

import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to continue your RepoRevive journey."
    >
      <LoginForm />

      <p className="mt-8 text-center text-sm text-gray-400">
        Don't have an account?

        <Link
          href="/auth/signup"
          className="ml-2 font-semibold text-violet-400 transition hover:text-violet-300"        >
          Sign Up
        </Link>

      </p>

    </AuthLayout>
  );
}