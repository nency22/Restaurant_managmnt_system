import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const [submitting, setSubmitting] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "CUSTOMER", // Pre-select CUSTOMER as default
    },
  });

  const onSubmit = async ({ username, email, role, password }) => {
    setSubmitting(true);
    try {
      await registerUser({ username, email, role, password});
      toast.success("Account created — please sign in.");
      navigate("/login");
    } catch (error) {
      const backendMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        (typeof error.response?.data === "object"
          ? Object.values(error.response.data).flat().join(" ")
          : null);

      toast.error(backendMessage || error.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-5 py-16 sm:px-8">
      <div className="w-full max-w-sm">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.35em] text-[#C5A059] sm:text-xs">
          Whiskey & Wheat
        </p>
        <h1 className="mt-3 text-center font-serif text-3xl font-medium text-ink sm:text-4xl">
          Create an account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5" noValidate>
          <div>
            <label htmlFor="username" className="text-xs uppercase tracking-widest text-gold-deep">
              Username
            </label>
            <input
              id="username"
              type="text"
              autoComplete="username"
              {...register("username", { required: "Choose a username" })}
              className="mt-2 w-full border-b border-[#C5A059]/40 bg-transparent py-2 text-sm text-ink outline-none transition-colors focus:border-[#C5A059]"
            />
            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="text-xs uppercase tracking-widest text-gold-deep">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", {
                required: "Enter your email",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "That email doesn't look right" },
              })}
              className="mt-2 w-full border-b border-[#C5A059]/40 bg-transparent py-2 text-sm text-ink outline-none transition-colors focus:border-[#C5A059]"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="role" className="text-xs uppercase tracking-widest text-gold-deep">
              Role
            </label>
            <select
              id="role"
              {...register("role", { required: "Select a role" })}
              className="mt-2 w-full border-b border-[#C5A059]/40 bg-transparent py-2 text-sm text-ink outline-none transition-colors focus:border-[#C5A059]"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-xs uppercase tracking-widest text-gold-deep">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register("password", {
                required: "Create a password",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
              className="mt-2 w-full border-b border-[#C5A059]/40 bg-transparent py-2 text-sm text-ink outline-none transition-colors focus:border-[#C5A059]"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="text-xs uppercase tracking-widest text-gold-deep">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) => value === getValues("password") || "Passwords don't match",
              })}
              className="mt-2 w-full border-b border-[#C5A059]/40 bg-transparent py-2 text-sm text-ink outline-none transition-colors focus:border-[#C5A059]"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#C5A059] py-3.5 text-xs font-semibold uppercase tracking-widest text-[#2C2523] transition-all duration-300 hover:bg-[#b89450] disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-ink/60">
          Already have an account?{" "}
          <NavLink to="/login" className="text-[#C5A059] hover:underline">
            Sign in
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default Register;
