import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    setSubmitting(true);
    try {
      await login({ username, password });
      toast.success("Logged in successfully");
      navigate(location.state?.from || "/", { replace: true });
    } catch (error) {
      toast.error(error.message || "Invalid credentials. Please try again.");
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
          Welcome back
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
              {...register("username", { required: "Enter your username" })}
              className="mt-2 w-full border-b border-[#C5A059]/40 bg-transparent py-2 text-sm text-ink outline-none transition-colors focus:border-[#C5A059]"
            />
            {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="text-xs uppercase tracking-widest text-gold-deep">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password", { required: "Enter your password" })}
              className="mt-2 w-full border-b border-[#C5A059]/40 bg-transparent py-2 text-sm text-ink outline-none transition-colors focus:border-[#C5A059]"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#C5A059] py-3.5 text-xs font-semibold uppercase tracking-widest text-[#2C2523] transition-all duration-300 hover:bg-[#b89450] disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-ink/60">
          New here?{" "}
          <NavLink to="/register" className="text-[#C5A059] hover:underline">
            Create an account
          </NavLink>
        </p>
      </div>
    </main>
  );
};

export default Login;
