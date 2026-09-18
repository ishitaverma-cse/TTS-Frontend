function Home({ onNavigate }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

            {/* Background Glows */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">

                <div className="absolute left-1/3 top-[-180px] h-[600px] w-[700px] rounded-full bg-indigo-600/10 blur-[140px]" />

                <div className="absolute right-[-180px] top-[700px] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[130px]" />

                <div className="absolute left-[-180px] top-[1100px] h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[130px]" />

            </div>

            {/* Navbar */}
            <nav className="border-b border-white/[0.06] bg-slate-950/90 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-[1350px] items-center justify-between px-6 lg:px-8">

                    {/* Brand */}
                    <button
                        type="button"
                        onClick={() => onNavigate("home")}
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/20">
                            <span className="text-lg">🎙️</span>
                        </div>

                        <div className="text-left">
                            <p className="text-sm font-bold text-white">
                                TTS Studio
                            </p>

                            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                                AI Voice Studio
                            </p>
                        </div>
                    </button>


                    {/* Navigation */}
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">

                        <button
                            type="button"
                            onClick={() =>
                                document.getElementById("features")?.scrollIntoView({
                                    behavior: "smooth",
                                })
                            }
                            className="text-sm font-medium text-slate-400 transition hover:text-white"
                        >
                            Features
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                document.getElementById("create")?.scrollIntoView({
                                    behavior: "smooth",
                                })
                            }
                            className="text-sm font-medium text-slate-400 transition hover:text-white"
                        >
                            Create
                        </button>

                    </div>


                    {/* Actions */}
                    <div className="flex items-center gap-3">

                        <button
                            type="button"
                            onClick={() => onNavigate("login")}
                            className="rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-indigo-400/40 hover:bg-slate-800"
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            onClick={() => onNavigate("signup")}
                            className="hidden rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-400 hover:shadow-indigo-500/30 sm:block"
                        >
                            Get Started
                        </button>

                    </div>

                </div>
            </nav>

            {/* ========================================================= */}
            {/* HERO                                                      */}
            {/* ========================================================= */}

            <main className="relative z-10">

                <section className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-[1200px] items-center overflow-visible px-6 py-20 lg:px-8">

                    {/* Decorative Voice Visual — right side */}
                    <div className="pointer-events-none absolute right-[-40px] top-1/2 hidden -translate-y-1/2 lg:block">

                        {/* Soft glow */}
                        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

                        {/* Concentric sound rings */}
                        <div className="relative flex h-[520px] w-[520px] items-center justify-center">

                            <div className="absolute h-[420px] w-[420px] rounded-full border border-indigo-400/[0.12]" />

                            <div className="absolute h-[330px] w-[330px] rounded-full border border-indigo-400/[0.14]" />

                            <div className="absolute h-[240px] w-[240px] rounded-full border border-indigo-400/[0.16]" />

                            <div className="absolute h-[150px] w-[150px] rounded-full border border-indigo-400/[0.18]" />

                            {/* Center glow */}
                            <div className="absolute h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl" />

                            {/* Microphone */}
                            <div className="relative flex h-24 w-16 items-center justify-center rounded-[2rem] border border-indigo-300/20 bg-indigo-400/[0.06]">
                                <div className="flex h-16 w-9 flex-col items-center justify-center gap-1.5 rounded-2xl border border-indigo-300/20 bg-slate-950/70">
                                    <span className="h-1 w-5 rounded-full bg-indigo-300/50" />
                                    <span className="h-1 w-5 rounded-full bg-indigo-300/50" />
                                    <span className="h-1 w-5 rounded-full bg-indigo-300/50" />
                                </div>
                            </div>

                            {/* Mic stand */}
                            <div className="absolute bottom-[170px] h-8 w-px bg-indigo-300/20" />

                            <div className="absolute bottom-[165px] h-px w-12 bg-indigo-300/20" />

                            {/* Waveform */}
                            <div className="absolute bottom-20 left-1/2 flex h-16 -translate-x-1/2 items-center gap-1">

                                {[
                                    18, 28, 40, 25, 55, 35, 68, 48, 82, 58,
                                    72, 46, 88, 60, 75, 42, 64, 34, 50, 25,
                                    38, 20
                                ].map((height, index) => (
                                    <span
                                        key={index}
                                        className="w-1 rounded-full bg-indigo-400/30"
                                        style={{ height: `${height}%` }}
                                    />
                                ))}

                            </div>

                        </div>
                    </div>


                    {/* Hero Content */}
                    <div className="relative z-10 max-w-3xl lg:max-w-[720px]">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/5 px-4 py-2">

                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />

                            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-indigo-300">
                                AI-Powered Voice Studio
                            </span>

                        </div>


                        {/* Heading */}
                        <h2 className="mt-8 text-6xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-7xl lg:text-[76px]">

                            Turn your words

                            <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">
                                into a voice.
                            </span>

                        </h2>


                        {/* Description */}
                        <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                            Transform written content into natural-sounding speech.
                            Enhance your text with AI, upload documents, customize
                            your voice, and generate audio from one powerful workspace.
                        </p>


                        {/* Buttons */}
                        <div className="mt-9 flex flex-wrap gap-4">

                            <button
                                type="button"
                                onClick={() => onNavigate("signup")}
                                className="rounded-xl bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-500/20 transition hover:bg-indigo-400 hover:shadow-indigo-500/30"
                            >
                                Start Creating
                                <span className="ml-2">→</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => onNavigate("login")}
                                className="rounded-xl border border-slate-700 bg-slate-900/60 px-7 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-indigo-400/40 hover:bg-slate-800"
                            >
                                Sign In
                            </button>

                        </div>


                        {/* Feature Checks */}
                        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span className="text-emerald-400">✓</span>
                                AI Enhancement
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span className="text-emerald-400">✓</span>
                                Document Extraction
                            </div>

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <span className="text-emerald-400">✓</span>
                                Audio Generation
                            </div>

                        </div>

                    </div>

                </section>


                {/* ========================================================= */}
                {/* FEATURES — ORIGINAL SCROLLABLE PART                      */}
                {/* ========================================================= */}

                <section
                    id="features"
                    className="border-y border-white/5 bg-slate-900/20"
                >
                    <div className="mx-auto max-w-[1200px] px-6 py-24 lg:px-8">

                        <div className="max-w-2xl">

                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                                Built for creators
                            </p>

                            <h3 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                                Everything you need to create better speech.
                            </h3>

                            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
                                From writing and enhancement to document extraction and
                                audio generation, TTS Studio brings the complete workflow
                                together in one place.
                            </p>

                        </div>


                        {/* Feature Cards */}
                        <div className="mt-12 grid gap-5 md:grid-cols-3">

                            {/* Natural AI Voices */}
                            <div className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-[1.02] hover:border-indigo-400/30 hover:bg-slate-900 hover:shadow-2xl hover:shadow-indigo-500/10">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
                                    🔊
                                </div>

                                <h4 className="mt-5 text-lg font-semibold">
                                    Natural AI Voices
                                </h4>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    Convert written content into clear, natural-sounding
                                    speech with AI-powered voice generation.
                                </p>

                            </div>


                            {/* AI Text Enhancement */}
                            <div
                                id="ai-enhancement"
                                className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-[1.02] hover:border-indigo-400/30 hover:bg-slate-900 hover:shadow-2xl hover:shadow-indigo-500/10"
                            >

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
                                    ✨
                                </div>

                                <h4 className="mt-5 text-lg font-semibold">
                                    AI Text Enhancement
                                </h4>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    Improve grammar, punctuation, readability, and speech
                                    flow before turning your text into audio.
                                </p>

                            </div>


                            {/* Document Support */}
                            <div
                                id="documents"
                                className="group rounded-2xl border border-white/10 bg-slate-900/60 p-6 transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-[1.02] hover:border-indigo-400/30 hover:bg-slate-900 hover:shadow-2xl hover:shadow-indigo-500/10"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
                                    📄
                                </div>

                                <h4 className="mt-5 text-lg font-semibold">
                                    Document Support
                                </h4>

                                <p className="mt-3 text-sm leading-6 text-slate-500">
                                    Upload TXT, PDF, and DOCX files and extract their
                                    content directly into your speech workflow.
                                </p>

                            </div>

                        </div>

                    </div>

                </section>

                {/* ========================================================= */}
                {/* HOW IT WORKS                                             */}
                {/* ========================================================= */}




                {/* ========================================================= */}
                {/* CTA — ORIGINAL SCROLLABLE PART                            */}
                {/* ========================================================= */}

                <section
                    id="create"
                    className="relative mx-auto max-w-[1200px] px-6 py-28 lg:px-8"
                >

                    <div className="relative overflow-hidden rounded-[2rem] border border-indigo-400/15 bg-slate-900/60 px-8 py-20 text-center shadow-2xl shadow-indigo-950/20 sm:px-12">

                        {/* Background glow */}
                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

                        {/* Decorative left glow */}
                        <div className="pointer-events-none absolute -left-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[100px]" />

                        {/* Decorative right glow */}
                        <div className="pointer-events-none absolute -right-32 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />


                        {/* Subtle waveform decoration */}
                        <div className="pointer-events-none absolute left-1/2 top-8 flex h-10 -translate-x-1/2 items-center gap-1 opacity-40">

                            {[
                                10, 18, 28, 16, 36, 22, 44, 30, 52, 38,
                                58, 42, 30, 48, 34, 22, 40, 26, 16, 10
                            ].map((height, index) => (
                                <span
                                    key={index}
                                    className="w-1 rounded-full bg-indigo-400"
                                    style={{ height: `${height}px` }}
                                />
                            ))}

                        </div>


                        {/* Content */}
                        <div className="relative z-10 mx-auto max-w-3xl">

                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300">
                                Ready to create?
                            </p>

                            <h3 className="mt-5 text-4xl font-bold tracking-[-0.03em] text-white sm:text-5xl">
                                Give your words
                                <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-purple-300 bg-clip-text text-transparent">
                                    a voice.
                                </span>
                            </h3>

                            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
                                Turn your ideas into natural-sounding speech with AI-powered
                                enhancement, document extraction, and intelligent voice generation.
                            </p>


                            {/* CTA */}
                            <button
                                type="button"
                                onClick={() => onNavigate("signup")}
                                className="mt-9 rounded-xl bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-indigo-500/25 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/30"
                            >
                                Start Creating
                                <span className="ml-2">→</span>
                            </button>


                            {/* Small supporting text */}
                            <div className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-3 text-xs text-slate-600">

                                <span className="flex items-center gap-2">
                                    <span className="text-emerald-400">✓</span>
                                    AI Enhancement
                                </span>

                                <span className="flex items-center gap-2">
                                    <span className="text-emerald-400">✓</span>
                                    TXT / PDF / DOCX
                                </span>

                                <span className="flex items-center gap-2">
                                    <span className="text-emerald-400">✓</span>
                                    Natural Voice Generation
                                </span>

                            </div>

                        </div>

                    </div>

                </section>

            </main>


            {/* ========================================================= */}
            {/* FOOTER                                                    */}
            {/* ========================================================= */}

            <footer className="border-t border-white/[0.06] bg-slate-950">
    <div className="mx-auto max-w-[1350px] px-6 py-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            {/* Brand */}
            <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/20">
                    <span className="text-base">🎙️</span>
                </div>

                <div>
                    <p className="text-sm font-bold text-white">
                        TTS Studio
                    </p>

                    <p className="mt-0.5 text-[10px] tracking-wide text-slate-500">
                        AI Voice Studio
                    </p>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-xs text-slate-600 sm:text-right">
                © 2026 TTS Studio · Built by{" "}
                <span className="font-medium text-slate-400">
                    Ishita Verma
                </span>
            </div>

        </div>
    </div>
</footer>
        </div>
    );
}

export default Home;