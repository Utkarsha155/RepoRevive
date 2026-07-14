import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create Your Account 🚀"
      subtitle="Join RepoRevive to discover, collaborate on, and adopt innovative software projects."
    >
      <SignupForm />
    </AuthLayout>
  );
}