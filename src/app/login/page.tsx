
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

import { authClient } from "@/lib/auth-client";

const inputClasses =
  "h-10 w-full rounded-sm border border-zinc-200 bg-zinc-50 px-9 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-cyan-500";

const labelClasses =
  "mb-2 block text-[13px] font-medium text-zinc-900";

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4"
      aria-hidden="true"
    >
      <path
        fill="#4285F4"
        d="M23.25 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.68 2.85c2.15-1.99 3.5-4.92 3.5-8.67z"
      />
      <path
        fill="#34A853"
        d="M12 23.25c2.96 0 5.46-.98 7.28-2.66l-3.68-2.85c-1.02.68-2.32 1.09-3.6 1.09-2.98 0-5.46-2.1-6.3-4.61l-3.66 2.84c1.8 3.67 5.58 6.19 9.96 6.19z"
      />
      <path
        fill="#FBBC05"
        d="M5.7 14.22A7.24 7.24 0 0 1 5.31 12c0-.77.14-1.52.39-2.22L2.04 6.94A11.24 11.24 0 0 0 .75 12c0 1.82.44 3.54 1.29 5.06l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.04c1.62 0 3.06.56 4.2 1.64l3.12-3.12C17.46 1.8 14.96.75 12 .75 7.62.75 3.84 3.27 2.04 6.94l3.66 2.84C6.54 7.14 9.02 5.04 12 5.04z"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const rememberMe = formData.get("rememberMe") === "on";

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (error) {
        setError(error.message || "Invalid email or password.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError(
        "Unable to connect to the authentication server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || "Google sign-in failed.");
      }
    } catch {
      setError("Unable to start Google sign-in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-100 px-4 py-16">
      <section className="w-full max-w-md bg-white px-8 py-10 shadow-md sm:px-10">
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Resume your adventure with Wanderlust
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid grid-cols-1 gap-y-4"
        >
          <div>
            <label htmlFor="login-email" className={labelClasses}>
              Email Address
            </label>

            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                aria-hidden="true"
              />

              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="Enter your email"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className={labelClasses}>
              Password
            </label>

            <div className="relative">
              <Lock
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400"
                aria-hidden="true"
              />

              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="remember-me"
              className="flex cursor-pointer items-center gap-2 text-sm text-zinc-700"
            >
              <input
                id="remember-me"
                name="rememberMe"
                type="checkbox"
                className="size-3.5 accent-cyan-500"
              />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-cyan-500 transition-colors hover:text-cyan-600"
            >
              Forgot password?
            </Link>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-sm bg-red-50 p-3 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-11 w-full rounded-sm bg-cyan-500 text-sm font-medium text-white transition-colors hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="mt-2 flex items-center gap-4" aria-hidden="true">
            <span className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs text-zinc-500">
              Or continue with
            </span>
            <span className="h-px flex-1 bg-zinc-200" />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-sm border border-zinc-200 bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <p className="mt-2 text-center text-sm text-zinc-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-cyan-500 transition-colors hover:text-cyan-600"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
