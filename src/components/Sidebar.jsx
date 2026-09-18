function Sidebar({ activeSection, onNavigate, isOpen, onClose }) {
    const navigationItems = [
        {
            id: "studio",
            label: "Studio",
            icon: "✨",
        },
        {
            id: "history",
            label: "History",
            icon: "📜",
        },
        {
            id: "favorites",
            label: "Favorites",
            icon: "⭐",
        },
        {
            id: "trash",
            label: "Trash",
            icon: "🗑️",
        },
    ];

    return (
        <aside
            className={`fixed left-0 top-0 z-50 h-screen w-64 border-r border-white/10 bg-slate-950 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:flex lg:translate-x-0 lg:flex-col`}
        >

            {/* Mobile Close Button */}
            <div className="flex justify-end px-4 pt-4 lg:hidden">
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-white/5 hover:text-white"
                >
                    ✕
                </button>
            </div>

            {/* Logo */}
            <div className="flex items-center gap-3 border-b border-white/10 px-6 py-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500">
                    <span className="text-xl">🎙️</span>
                </div>

                <div>
                    <h1 className="text-lg font-bold text-white">
                        TTS Studio
                    </h1>

                    <p className="text-xs text-slate-500">
                        AI Voice Studio
                    </p>
                </div>
            </div>


            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">

                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Workspace
                </p>


                {navigationItems.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                            onNavigate(item.id);
                            onClose();
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${activeSection === item.id
                            ? "bg-indigo-500/10 text-indigo-300"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </button>
                ))}


                {/* Settings */}
                <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Settings
                </p>

                <button
                    type="button"
                    onClick={() => {
                        onNavigate("settings");
                        onClose();
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${activeSection === "settings"
                        ? "bg-indigo-500/10 text-indigo-300"
                        : "text-slate-400 hover:bg-white/5 hover:text-white"
                        }`}
                >
                    <span>⚙️</span>
                    Settings
                </button>

            </nav>


            {/* Footer */}
            <div className="border-t border-white/10 px-6 py-5">
                <p className="text-xs text-slate-600">
                    AI-powered text to speech
                </p>

                <p className="mt-1 text-xs text-slate-700">
                    TTS Studio
                </p>
            </div>

        </aside>
    );
}

export default Sidebar;