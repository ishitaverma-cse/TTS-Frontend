import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

function Signup({ onSignup, onNavigate }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (
            !name.trim() ||
            !email.trim() ||
            !password.trim() ||
            !confirmPassword.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        const emailRegex = /^[^\s@]+@gmail\.com$/i;

        if (!emailRegex.test(email.trim())) {
            setError("Please enter a valid Gmail address.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setIsLoading(true);

            const response = await axios.post(`${API_URL}/auth/register`, {
                name: name.trim(),
                email: email.trim(),
                password,
            });

            const signupData = response.data?.data;
            const token = signupData?.token;
            const user = signupData?.user;

            if (!token || !user) {
                throw new Error("Registration data was not received.");
            }
            onSignup();

        } catch (error) {
            console.error("Signup Error:", error);

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-8 lg:px-8">

                <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-2xl shadow-black/40 lg:grid-cols-2">

                    {/* LEFT VISUAL */}
                    <div className="relative hidden min-h-[680px] overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-950 lg:flex">

                        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/15 blur-[110px]" />

                        <div
                            className="absolute inset-0 opacity-[0.08]"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(148,163,184,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.5) 1px, transparent 1px)",
                                backgroundSize: "42px 42px",
                            }}
                        />

                        <div className="relative z-10 flex w-full flex-col items-center justify-center px-12">

                            {/* Microphone Visual */}
                            <div className="relative flex h-72 w-72 items-center justify-center">

                                <div className="absolute inset-0 rounded-full border border-indigo-400/10" />
                                <div className="absolute inset-8 rounded-full border border-indigo-400/10" />
                                <div className="absolute inset-16 rounded-full border border-indigo-400/10" />

                                <div className="absolute h-40 w-40 rounded-full bg-indigo-500/10 blur-2xl" />

                                <div className="relative flex h-32 w-24 items-center justify-center rounded-[3rem] border border-indigo-300/30 bg-gradient-to-b from-indigo-400/20 to-indigo-600/10 shadow-2xl shadow-indigo-500/20">
                                    <div className="flex h-24 w-14 flex-col items-center justify-center gap-2 rounded-3xl border border-indigo-200/20 bg-slate-900/80">
                                        <span className="h-1 w-7 rounded-full bg-indigo-300/70" />
                                        <span className="h-1 w-7 rounded-full bg-indigo-300/70" />
                                        <span className="h-1 w-7 rounded-full bg-indigo-300/70" />
                                        <span className="h-1 w-5 rounded-full bg-indigo-300/40" />
                                    </div>
                                </div>

                                <div className="absolute bottom-5 h-12 w-32 rounded-b-[3rem] border-b-2 border-indigo-300/40" />
                                <div className="absolute bottom-0 h-8 w-1 bg-indigo-300/40" />
                                <div className="absolute bottom-[-2px] h-1 w-16 rounded-full bg-indigo-300/40" />

                            </div>

                            {/* Waveform */}
                            <div className="mt-4 flex h-20 items-center justify-center gap-1.5">
                                {[
                                    22, 35, 52, 32, 68, 45, 82, 55, 92, 63,
                                    75, 48, 88, 57, 72, 40, 60, 34, 50, 25,
                                ].map((height, index) => (
                                    <span
                                        key={index}
                                        className="w-1.5 rounded-full bg-indigo-400/70"
                                        style={{ height: `${height}%` }}
                                    />
                                ))}
                            </div>

                            <div className="mt-8 text-center">

                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                                    AI Voice Studio
                                </p>

                                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                                    Start creating with your voice.
                                </h2>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                                    Create your account and turn your text into
                                    natural-sounding speech from one powerful workspace.
                                </p>

                            </div>

                        </div>
                    </div>

                    {/* RIGHT SIGNUP */}
                    <div className="flex min-h-[680px] items-center justify-center bg-slate-900/80 px-6 py-12 sm:px-12">

                        <div className="w-full max-w-md">

                            {/* Back */}
                            <button
                                type="button"
                                onClick={() => onNavigate("home")}
                                className="mb-8 text-xs font-medium text-slate-600 transition hover:text-slate-400"
                            >
                                ← Back to Home
                            </button>

                            {/* Header */}
                            <div className="mb-7">

                                <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
                                    <span className="text-2xl">✨</span>
                                    Create your account
                                </h1>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    Sign up to start creating speech with TTS Studio.
                                </p>

                            </div>

                            {/* Error */}
                            {error && (
                                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                    ⚠️ {error}
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">

                                {/* Name */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Full name
                                    </label>

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        placeholder="Enter your name"
                                        autoComplete="name"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Email address
                                    </label>

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Password
                                    </label>

                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        placeholder="Create a password"
                                        autoComplete="new-password"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-300">
                                        Confirm password
                                    </label>

                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(event) =>
                                            setConfirmPassword(event.target.value)
                                        }
                                        placeholder="Confirm your password"
                                        autoComplete="new-password"
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                                    />
                                </div>

                                {/* Create Account */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="mt-2 w-full rounded-xl bg-indigo-500 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isLoading ? "Creating account..." : "Create Account"}
                                </button>

                            </form>

                            {/* Login */}
                            <div className="mt-6 text-center">
                                <p className="text-sm text-slate-500">
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => onNavigate("login")}
                                        className="font-semibold text-indigo-400 transition hover:text-indigo-300"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>

                            {/* Security */}
                            <div className="mt-7 border-t border-white/5 pt-5 text-center">
                                <p className="text-[11px] text-slate-700">
                                    Secure token-based authentication
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Signup;