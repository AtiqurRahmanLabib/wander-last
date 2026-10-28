"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { Instrument_Serif } from "next/font/google";
import { authClient } from "@/lib/auth-client";

const serif = Instrument_Serif({ weight: "400", subsets: ["latin"] });

const inputClasses =
  "h-10 w-full rounded-sm border border-zinc-200 bg-zinc-50 px-9 text-sm text-zinc-900 outline-none transition-colors placeholder:text-zinc-400 focus:border-cyan-500";

const labelClasses = "mb-2 block text-[13px] font-medium text-zinc-900";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path
        fill="#EA4335"
        d="M12 5.04c1.62 0 3.06.56 4.2 1.64l3.12-3.12C17.46 1.8 14.96.75 12 .75 7.62.75 3.84 3.27 2.04 6.94l3.66 2.84C6.54 7.14 9.02 5.04 12 5.04z"
      />
      <path
        fill="#4285F4"
        d="M23.25 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.68 2.85c2.15-1.99 3.5-4.92 3.5-8.67z"
      />
      <path
        fill="#FBBC05"
        d="M5.7 14.22A7.24 7.24 0 0 1 5.31 12c0-.77.14-1.52.39-2.22L2.04 6.94A11.24 11.24 0 0 0 .75 12c0 1.82.44 3.54 1.29 5.06l3.66-2.84z"
      />
      <path
        fill="#34A853"
        d="M12 23.25c2.96 0 5.46-.98 7.28-2.66l-3.68-2.85c-1.02.68-2.32 1.09-3.6 1.09-2.98 0-5.46-2.1-6.3-4.61l-3.66 2.84c1.8 3.67 5.58 6.19 9.96 6.19z"
      />
    </svg>
  );
}

export default function SignUpPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { error: signUpError } = await authClient.signUp.email({
      name,
      email,
      password,
    });
    if (signUpError) {
      setError(signUpError.message ?? "Something went wrong");
      return;
    }

    redirect("/");
  };

  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-100 px-4 py-16">
      <section className="w-full max-w-160.5 bg-white px-8 py-10 shadow-md sm:px-10">
        <header className="text-center">
          <h1
            className={`${serif.className} text-4xl font-normal text-zinc-900`}
          >
            Create Account
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            Start your adventure with Wanderlust
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-y-4">
          <div>
            <label htmlFor="signup-name" className={labelClasses}>
              Full Name
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400"
                aria-hidden
              />
              <input
                id="signup-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Enter your name"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-email" className={labelClasses}>
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400"
                aria-hidden
              />
              <input
                id="signup-email"
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
            <label htmlFor="signup-password" className={labelClasses}>
              Password
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400"
                aria-hidden
              />
              <input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Create a password"
                className={inputClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-confirm-password" className={labelClasses}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400"
                aria-hidden
              />
              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Confirm your password"
                className={inputClasses}
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="text-xs text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-2 h-11 w-full rounded-sm bg-cyan-500 text-sm font-medium text-white transition-colors hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Create Account
          </button>

          <div className="mt-2 flex items-center gap-4" aria-hidden>
            <span className="h-px flex-1 bg-zinc-200" />
            <span className="text-xs text-zinc-500">Or sign up with</span>
            <span className="h-px flex-1 bg-zinc-200" />
          </div>

          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-sm border border-zinc-200 bg-white text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
          >
            <GoogleIcon />
            Sign Up With Google
          </button>

          <p className="mt-2 text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-cyan-500 transition-colors hover:text-cyan-600"
            >
              Sign In
            </Link>
          </p>
        </form>
      </section>
    </div>
  );
}
