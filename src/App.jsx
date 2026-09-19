import { useEffect, useState } from "react";
import {
  generateSpeech,
  getHistory,
  getFavorites,
  getTrash,
  toggleFavorite,
  deleteHistory,
  restoreHistory,
  permanentlyDeleteHistory,
} from "./services/ttsApi";
import FileUploader from "./components/FileUploader";
import VoiceControls from "./components/VoiceControls";
import Sidebar from "./components/Sidebar";
import AIEnhancer from "./components/AIEnhancer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

const supportedLanguages = [
  { code: "en-US", name: "English (US)" },
  { code: "hi-IN", name: "Hindi" },
  { code: "es-ES", name: "Spanish" },
  { code: "fr-FR", name: "French" },
  { code: "de-DE", name: "German" },
  { code: "it-IT", name: "Italian" },
  { code: "pt-BR", name: "Portuguese" },
  { code: "ja-JP", name: "Japanese" },
  { code: "zh-CN", name: "Chinese" },
  { code: "ko-KR", name: "Korean" },
];

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [authPage, setAuthPage] = useState("home");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [text, setText] = useState("");
  const [enhancedText, setEnhancedText] = useState("");
  const [activeSection, setActiveSection] = useState("studio");

  const [language, setLanguage] = useState(
    () => localStorage.getItem("ttsDefaultLanguage") || "en-US"
  );

  const [voice, setVoice] = useState(
    () => localStorage.getItem("ttsDefaultVoice") || "default"
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const [audioUrl, setAudioUrl] = useState("");

  const [history, setHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");

  const [historyPage, setHistoryPage] = useState(1);
  const [historyPagination, setHistoryPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  });

  const [favorites, setFavorites] = useState([]);
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(false);
  const [favoritesError, setFavoritesError] = useState("");

  const [favoritesPage, setFavoritesPage] = useState(1);
  const [favoritesPagination, setFavoritesPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  });

  const [trash, setTrash] = useState([]);
  const [isTrashLoading, setIsTrashLoading] = useState(false);
  const [trashError, setTrashError] = useState("");

  const [trashPage, setTrashPage] = useState(1);
  const [trashPagination, setTrashPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [permanentDeleteTarget, setPermanentDeleteTarget] =
    useState(null);

  const [openTrashMenu, setOpenTrashMenu] = useState(null);

  const MAX_CHARACTERS = 5000;

  useEffect(() => {
    if (isAuthenticated && activeSection === "history") {
      loadHistory(historyPage);
    }
  }, [isAuthenticated, activeSection, historyPage]);

  useEffect(() => {
    if (isAuthenticated && activeSection === "favorites") {
      loadFavorites(favoritesPage);
    }
  }, [isAuthenticated, activeSection, favoritesPage]);

  useEffect(() => {
    if (isAuthenticated && activeSection === "trash") {
      loadTrash(trashPage);
    }
  }, [isAuthenticated, activeSection, trashPage]);

  useEffect(() => {
    localStorage.setItem("ttsDefaultLanguage", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("ttsDefaultVoice", voice);
  }, [voice]);


  const loadHistory = async (page = 1) => {
    try {
      setIsHistoryLoading(true);
      setHistoryError("");

      const response = await getHistory(page, 8);

      setHistory(response.data || []);
      setHistoryPagination(
        response.pagination || {
          page: 1,
          limit: 8,
          total: 0,
          totalPages: 0,
        }
      );
      setHistoryPage(page);
    } catch (error) {
      console.error("❌ History Loading Error:", error);

      setHistoryError(
        error.response?.data?.message ||
        "Failed to load speech history."
      );
    } finally {
      setIsHistoryLoading(false);
    }
  };

  const loadFavorites = async (page = 1) => {
    try {
      setIsFavoritesLoading(true);
      setFavoritesError("");

      const response = await getFavorites(page, 8);

      setFavorites(response.data || []);

      setFavoritesPagination(
        response.pagination || {
          page: 1,
          limit: 8,
          total: 0,
          totalPages: 0,
        }
      );

      setFavoritesPage(page);
    } catch (error) {
      console.error("❌ Favorites Loading Error:", error);

      setFavoritesError(
        error.response?.data?.message ||
        "Failed to load favorites."
      );
    } finally {
      setIsFavoritesLoading(false);
    }
  };

  const loadTrash = async (page = 1) => {
    try {
      setIsTrashLoading(true);
      setTrashError("");

      const response = await getTrash(page, 8);

      setTrash(response.data || []);

      setTrashPagination(
        response.pagination || {
          page: 1,
          limit: 8,
          total: 0,
          totalPages: 0,
        }
      );

      setTrashPage(page);
    } catch (error) {
      console.error("❌ Trash Loading Error:", error);

      setTrashError(
        error.response?.data?.message ||
        "Failed to load trash."
      );
    } finally {
      setIsTrashLoading(false);
    }
  };

  const handleToggleFavorite = async (historyId) => {
    try {
      await toggleFavorite(historyId);

      loadHistory(historyPage);
    } catch (error) {
      console.error("❌ Favorite Update Error:", error);

      setHistoryError(
        error.response?.data?.message ||
        "Failed to update favorite."
      );
    }
  };

  const handleDeleteHistory = async (historyId) => {
    try {
      await deleteHistory(historyId);

      loadHistory(historyPage);
    } catch (error) {
      console.error("❌ Delete History Error:", error);

      setHistoryError(
        error.response?.data?.message ||
        "Failed to move speech to trash."
      );
    }
  };

  const handleRestoreHistory = async (historyId) => {
    try {
      await restoreHistory(historyId);

      loadTrash(trashPage);
    } catch (error) {
      console.error("❌ Restore History Error:", error);

      setTrashError(
        error.response?.data?.message ||
        "Failed to restore speech."
      );
    }
  };

  const handlePermanentDelete = async (historyId) => {
    try {
      await permanentlyDeleteHistory(historyId);

      loadTrash(trashPage);
    } catch (error) {
      console.error(
        "❌ Permanent Delete Error:",
        error
      );

      setTrashError(
        error.response?.data?.message ||
        "Failed to permanently delete speech."
      );
    }
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleTextExtracted = (extractedText) => {
    setText(extractedText);
    setError("");
  };

  const handleGenerateSpeech = async () => {
    setError("");

    if (!text.trim()) {
      setError("Please enter some text before generating speech.");
      return;
    }

    try {
      setIsGenerating(true);

      const speechText = enhancedText.trim() || text.trim();

      const audioData = await generateSpeech(
        speechText,
        language,
        voice
      );

      console.log("✅ Audio received from backend:", audioData);
      const url = URL.createObjectURL(audioData);
      setAudioUrl(url);
    } catch (error) {
      console.error("❌ TTS Generation Error:", error);

      setError(
        error.response?.data?.message ||
        "Failed to generate speech. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setIsAuthenticated(true);
    setAuthPage("home");
    setActiveSection("studio");
  };

  const handleSignup = () => {
    setAuthPage("login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear temporary Studio state
    setText("");
    setEnhancedText("");
    setAudioUrl(null);
    setError("");

    setUser(null);
    setIsAuthenticated(false);
    setAuthPage("home");
    setActiveSection("studio");
    setIsProfileOpen(false);
  };

  if (!isAuthenticated) {
    if (authPage === "login") {
      return (
        <Login
          onLogin={handleLogin}
          onNavigate={setAuthPage}
        />
      );
    }

    if (authPage === "signup") {
      return (
        <Signup
          onSignup={handleSignup}
          onNavigate={setAuthPage}
        />
      );
    }

    return <Home onNavigate={setAuthPage} />;
  }


  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={setActiveSection}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:pl-64">

        {/* Top Bar */}
        <header className="border-b border-white/10 bg-slate-950/90">
          <div className="flex items-center justify-between px-6 py-5">

            {/* Page Heading */}
            <div className="flex items-center gap-3">

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsSidebarOpen(true)}
                className="rounded-xl border border-white/10 bg-slate-900 p-2.5 text-slate-300 transition hover:border-indigo-400/30 hover:bg-slate-800 lg:hidden"
              >
                ☰
              </button>

              {/* Page Context */}
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-xl font-semibold text-white">
                    {activeSection === "studio" && "Create Speech"}
                    {activeSection === "history" && "Speech History"}
                    {activeSection === "favorites" && "Favorites"}
                    {activeSection === "trash" && "Trash"}
                    {activeSection === "settings" && "Settings"}
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    {activeSection === "studio" && "Turn your text into natural-sounding speech."}
                    {activeSection === "history" && "View and manage your generated speeches."}
                    {activeSection === "favorites" && "Access your saved favorite speeches."}
                    {activeSection === "trash" && "View and manage your deleted speeches."}
                    {activeSection === "settings" && "Manage your AI Voice Studio preferences."}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="relative flex items-center gap-3">

              {/* Studio Badge */}
              <div className="hidden rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-medium text-indigo-300 sm:block">
                AI Voice Studio
              </div>

              {/* Profile */}
              <button
                type="button"
                onClick={() => setIsProfileOpen((previous) => !previous)}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 transition hover:border-indigo-400/30 hover:bg-slate-800"
              >

                {/* Avatar */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-white">
                    {user?.name || "User"}
                  </p>

                  <p className="text-[11px] text-slate-500">
                    Profile
                  </p>
                </div>

                <span className="text-xs text-slate-500">
                  {isProfileOpen ? "▲" : "▼"}
                </span>

              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">

                  {/* Profile Header */}
                  <div className="border-b border-white/10 px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {user?.name || "User"}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          {user?.email || "AI Voice Studio Account"}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Logout */}
                  <div className="p-2">

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M10 17l5-5-5-5" />
                        <path d="M15 12H3" />
                        <path d="M21 4v16" />
                      </svg>

                      Logout
                    </button>

                  </div>

                </div>
              )}

            </div>

          </div>
        </header>


        {/* Workspace */}
        <main className="mx-auto max-w-5xl px-6 py-8">
          {activeSection === "studio" && (
            <>

              {/* Workspace Header */}
              <div className="mb-6">
                <div className="mb-2 inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                  ✨ AI-Powered Workspace
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white">
                  Create your speech
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Upload a document or enter your text manually.
                </p>
              </div>


              {/* Main Workspace */}
              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl sm:p-6">

                {/* File Upload */}
                <div className="mb-6">
                  <FileUploader
                    onTextExtracted={handleTextExtracted}
                  />

                  <VoiceControls
                    language={language}
                    setLanguage={setLanguage}
                    voice={voice}
                    setVoice={setVoice}
                  />
                </div>


                {/* Text Input */}
                <div>

                  <div className="mb-3 flex items-center justify-between">

                    <label className="text-sm font-medium text-slate-200">
                      Enter your text
                    </label>

                    <span
                      className={`text-xs ${text.length >= 4500
                        ? "text-amber-400"
                        : "text-slate-500"
                        }`}
                    >
                      {text.length} / {MAX_CHARACTERS} characters
                    </span>

                  </div>

                  <textarea
                    value={text}
                    onChange={handleTextChange}
                    maxLength={MAX_CHARACTERS}
                    placeholder="Type or paste your text here..."
                    className="min-h-[170px] w-full resize-none rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/10"
                  />

                </div>

                <AIEnhancer
                  text={text}
                  onEnhancedText={setEnhancedText}
                />

                {enhancedText && (
                  <div className="mt-5 rounded-xl border border-indigo-400/20 bg-indigo-500/[0.05] p-5">

                    <div className="mb-3 flex items-center justify-between">

                      <div>
                        <h3 className="text-sm font-semibold text-indigo-300">
                          ✨ AI Enhanced Text
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Optimized for natural speech.
                        </p>
                      </div>

                      <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300">
                        Gemini AI
                      </span>

                    </div>

                    <textarea
                      value={enhancedText}
                      onChange={(event) => setEnhancedText(event.target.value)}
                      className="min-h-[140px] w-full resize-none rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm leading-6 text-slate-200 outline-none focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/10"
                    />

                  </div>
                )}

                {/* Generate Button */}
                <button
                  type="button"
                  onClick={handleGenerateSpeech}
                  disabled={isGenerating}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isGenerating ? (
                    <>
                      <span>⏳</span>
                      Generating Speech...
                    </>
                  ) : (
                    <>
                      <span>🔊</span>
                      Generate Speech
                    </>
                  )}
                </button>

                {/* Error */}
                {error && (
                  <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    ⚠️ {error}
                  </div>
                )}


                {/* Audio Area */}
                <div className="mt-6 rounded-xl border border-white/10 bg-slate-900/40 p-5">

                  {audioUrl ? (
                    <div>

                      <div className="mb-4 flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/10">
                          <span>🎵</span>
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-white">
                            Generated Audio
                          </h3>

                          <p className="text-xs text-slate-500">
                            Your speech is ready to play.
                          </p>
                        </div>

                      </div>

                      <audio
                        controls
                        src={audioUrl}
                        className="w-full"
                      />

                      <a
                        href={audioUrl}
                        download="tts-generated-audio.mp3"
                        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                      >
                        <span>⬇️</span>
                        Download Audio
                      </a>

                    </div>
                  ) : (
                    <div className="py-3 text-center">

                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
                        <span className="text-xl">🎵</span>
                      </div>

                      <h3 className="mt-3 text-sm font-semibold text-slate-300">
                        Your generated audio will appear here
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Generate speech to preview your audio.
                      </p>

                    </div>
                  )}

                </div>

              </section>

            </>
          )}

          {activeSection === "history" && (
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">

              {/* Header */}
              <div className="mb-6">
                <div className="mb-2 inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                  📜 Speech History
                </div>

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Your History
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      View your previously generated speeches.
                    </p>
                  </div>

                  {history.length > 0 && (
                    <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
                      {history.length} {history.length === 1 ? "speech" : "speeches"}
                    </span>
                  )}
                </div>
              </div>

              {/* Loading */}
              {isHistoryLoading && (
                <div className="rounded-xl border border-white/10 bg-slate-900/40 p-10 text-center">
                  <div className="text-2xl">⏳</div>

                  <h3 className="mt-3 text-sm font-semibold text-slate-300">
                    Loading your history...
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Fetching your generated speeches.
                  </p>
                </div>
              )}

              {/* Error */}
              {!isHistoryLoading && historyError && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  ⚠️ {historyError}
                </div>
              )}

              {/* Empty State */}
              {!isHistoryLoading && !historyError && history.length === 0 && (
                <div className="rounded-xl border border-white/10 bg-slate-900/40 p-10 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-2xl">
                    📜
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-slate-300">
                    No speech history yet
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Generate your first speech from the Studio and it will appear here.
                  </p>
                </div>
              )}

              {/* History List */}
              {!isHistoryLoading && !historyError && history.length > 0 && (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-xl border border-white/10 bg-slate-900/50 p-5 transition hover:border-indigo-400/20 hover:bg-slate-900/70"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                        {/* Speech Information */}
                        <div className="min-w-0 flex-1">

                          <div className="mb-3 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                              {item.language || "Unknown Language"}
                            </span>

                            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">
                              🎙️ {item.voice || "Default Voice"}
                            </span>

                            {item.isFavorite && (
                              <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300">
                                ⭐ Favorite
                              </span>
                            )}
                          </div>

                          <p className="line-clamp-3 text-sm leading-6 text-slate-300">
                            {item.text}
                          </p>

                          {item.createdAt && (
                            <p className="mt-3 text-xs text-slate-600">
                              {new Date(item.createdAt).toLocaleString()}
                            </p>
                          )}

                        </div>

                        {/* Actions */}
                        <div className="flex shrink-0 gap-2">

                          <button
                            type="button"
                            onClick={() => handleToggleFavorite(item._id)}
                            className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${item.isFavorite
                              ? "border-yellow-400/20 bg-yellow-500/10 text-yellow-300"
                              : "border-white/10 bg-white/5 text-slate-400 hover:border-yellow-400/20 hover:bg-yellow-500/10 hover:text-yellow-300"
                              }`}
                          >
                            ⭐
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteTarget(item)}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-300"
                          >
                            🗑️
                          </button>

                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Pagination */}
              {historyPagination.totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      setHistoryPage((currentPage) => currentPage - 1)
                    }
                    disabled={historyPage === 1}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 transition hover:border-indigo-400/20 hover:bg-indigo-500/10 hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Previous
                  </button>

                  <span className="text-xs text-slate-500">
                    Page {historyPage} of {historyPagination.totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setHistoryPage((currentPage) => currentPage + 1)
                    }
                    disabled={historyPage === historyPagination.totalPages}
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 transition hover:border-indigo-400/20 hover:bg-indigo-500/10 hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>

              )}

            </section>
          )}

          {activeSection === "trash" && (
            <section className="mx-auto max-w-6xl px-6 py-8">
              {/* Trash Container */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 shadow-xl shadow-black/10">

                {/* Header */}
                <div className="mb-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300">
                    🗑️ Trash
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Your Trash
                      </h2>

                      <p className="mt-2 text-sm text-slate-500">
                        Manage your deleted speeches.
                      </p>
                    </div>

                    {trash.length > 0 && (
                      <div className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
                        {trashPagination.total}{" "}
                        {trashPagination.total === 1
                          ? "speech"
                          : "speeches"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Loading */}
                {isTrashLoading && (
                  <div className="rounded-xl border border-white/10 bg-slate-950/40 p-8 text-center">
                    <p className="text-sm text-slate-500">
                      Loading trash...
                    </p>
                  </div>
                )}

                {/* Error */}
                {!isTrashLoading && trashError && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-4">
                    <p className="text-sm text-red-300">
                      ⚠️ {trashError}
                    </p>
                  </div>
                )}

                {/* Empty State */}
                {!isTrashLoading &&
                  !trashError &&
                  trash.length === 0 && (
                    <div className="rounded-xl border border-white/10 bg-slate-950/40 px-6 py-14 text-center">
                      <div className="mb-4 text-4xl">
                        🗑️
                      </div>

                      <h3 className="text-lg font-semibold text-white">
                        Trash is empty
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Deleted speeches will appear here.
                      </p>
                    </div>
                  )}

                {/* Trash List */}
                {!isTrashLoading &&
                  !trashError &&
                  trash.length > 0 && (
                    <>
                      <div className="space-y-4">
                        {trash.map((item) => (
                          <div
                            key={item._id}
                            className="rounded-xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-white/15 hover:bg-slate-950/60"
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                              {/* Speech Information */}
                              <div className="min-w-0 flex-1">

                                {/* Metadata */}
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                  <span className="rounded-lg bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                                    {item.language}
                                  </span>

                                  <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400">
                                    🎙️ {item.voice}
                                  </span>

                                  <span className="rounded-lg bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300">
                                    🗑️ Deleted
                                  </span>
                                </div>

                                {/* Text */}
                                <p className="text-sm leading-6 text-slate-300">
                                  {item.text}
                                </p>

                                {/* Date */}
                                <p className="mt-3 text-xs text-slate-600">
                                  Deleted on{" "}
                                  {item.deletedAt
                                    ? new Date(
                                      item.deletedAt
                                    ).toLocaleString()
                                    : "Unknown date"}
                                </p>
                              </div>

                              {/* Actions Menu */}
                              <div className="relative shrink-0">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setOpenTrashMenu(
                                      openTrashMenu === item._id
                                        ? null
                                        : item._id
                                    )
                                  }
                                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-lg text-slate-400 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                                  aria-label="Trash actions"
                                >
                                  ⋮
                                </button>

                                {openTrashMenu === item._id && (
                                  <div className="absolute bottom-full right-0 z-50 mb-2 w-48 overflow-hidden rounded-xl border border-white/10 bg-slate-900 py-1 shadow-xl shadow-black/30">

                                    {/* Restore */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setOpenTrashMenu(null);
                                        handleRestoreHistory(item._id);
                                      }}
                                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-white/5 hover:text-emerald-300"
                                    >
                                      <span>↩️</span>
                                      <span>Restore</span>
                                    </button>

                                    {/* Permanent Delete */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setOpenTrashMenu(null);
                                        setPermanentDeleteTarget(item);
                                      }}
                                      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-300 transition hover:bg-red-500/10 hover:text-red-300"
                                    >
                                      <span>🗑️</span>
                                      <span>Delete permanently</span>
                                    </button>

                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      {trashPagination.totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                          <button
                            type="button"
                            onClick={() =>
                              setTrashPage(
                                (currentPage) => currentPage - 1
                              )
                            }
                            disabled={trashPage === 1}
                            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 transition hover:border-indigo-400/20 hover:bg-indigo-500/10 hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            ← Previous
                          </button>

                          <span className="text-xs text-slate-500">
                            Page {trashPage} of{" "}
                            {trashPagination.totalPages}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setTrashPage(
                                (currentPage) => currentPage + 1
                              )
                            }
                            disabled={
                              trashPage ===
                              trashPagination.totalPages
                            }
                            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 transition hover:border-indigo-400/20 hover:bg-indigo-500/10 hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Next →
                          </button>
                        </div>
                      )}
                    </>
                  )}
              </div>
            </section>
          )}

          {activeSection === "favorites" && (
            <section className="mx-auto max-w-6xl px-6 py-8">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 shadow-xl shadow-black/10">

                {/* Header */}
                <div className="mb-8">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-300">
                    ⭐ Favorites
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Your Favorites
                      </h2>

                      <p className="mt-2 text-sm text-slate-500">
                        View your saved favorite speeches.
                      </p>
                    </div>

                    {favorites.length > 0 && (
                      <div className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
                        {favoritesPagination.total}{" "}
                        {favoritesPagination.total === 1
                          ? "speech"
                          : "speeches"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Loading */}
                {isFavoritesLoading && (
                  <div className="rounded-xl border border-white/10 bg-slate-950/40 p-8 text-center">
                    <p className="text-sm text-slate-500">
                      Loading favorites...
                    </p>
                  </div>
                )}

                {/* Error */}
                {!isFavoritesLoading && favoritesError && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-4">
                    <p className="text-sm text-red-300">
                      ⚠️ {favoritesError}
                    </p>
                  </div>
                )}

                {/* Empty State */}
                {!isFavoritesLoading &&
                  !favoritesError &&
                  favorites.length === 0 && (
                    <div className="rounded-xl border border-white/10 bg-slate-950/40 px-6 py-14 text-center">
                      <div className="mb-4 text-4xl">
                        ⭐
                      </div>

                      <h3 className="text-lg font-semibold text-white">
                        No favorite speeches
                      </h3>

                      <p className="mt-2 text-sm text-slate-500">
                        Star a speech from your History to save it here.
                      </p>
                    </div>
                  )}

                {/* Favorites List */}
                {!isFavoritesLoading &&
                  !favoritesError &&
                  favorites.length > 0 && (
                    <>
                      <div className="space-y-4">
                        {favorites.map((item) => (
                          <div
                            key={item._id}
                            className="rounded-xl border border-white/10 bg-slate-950/40 p-5 transition hover:border-white/15 hover:bg-slate-950/60"
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                              {/* Speech Information */}
                              <div className="min-w-0 flex-1">

                                {/* Metadata */}
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                  <span className="rounded-lg bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                                    {item.language}
                                  </span>

                                  <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-slate-400">
                                    🎙️ {item.voice}
                                  </span>

                                  <span className="rounded-lg bg-yellow-500/10 px-3 py-1.5 text-xs font-medium text-yellow-300">
                                    ⭐ Favorite
                                  </span>
                                </div>

                                {/* Text */}
                                <p className="text-sm leading-6 text-slate-300">
                                  {item.text}
                                </p>

                                {/* Date */}
                                <p className="mt-3 text-xs text-slate-600">
                                  {new Date(
                                    item.createdAt
                                  ).toLocaleString()}
                                </p>
                              </div>

                              {/* Actions */}
                              <div className="flex shrink-0 gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleToggleFavorite(item._id)
                                  }
                                  className="rounded-lg border border-yellow-400/20 bg-yellow-500/10 px-3 py-2 text-xs font-medium text-yellow-300 transition hover:bg-yellow-500/20"
                                >
                                  ⭐
                                </button>

                                <button
                                  type="button"
                                  onClick={() => setDeleteTarget(item)}
                                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-300"
                                >
                                  🗑️
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination */}
                      {favoritesPagination.totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                          <button
                            type="button"
                            onClick={() =>
                              setFavoritesPage(
                                (currentPage) => currentPage - 1
                              )
                            }
                            disabled={favoritesPage === 1}
                            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 transition hover:border-indigo-400/20 hover:bg-indigo-500/10 hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            ← Previous
                          </button>

                          <span className="text-xs text-slate-500">
                            Page {favoritesPage} of{" "}
                            {favoritesPagination.totalPages}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setFavoritesPage(
                                (currentPage) => currentPage + 1
                              )
                            }
                            disabled={
                              favoritesPage ===
                              favoritesPagination.totalPages
                            }
                            className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-400 transition hover:border-indigo-400/20 hover:bg-indigo-500/10 hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Next →
                          </button>
                        </div>
                      )}
                    </>
                  )}
              </div>
            </section>
          )}

          {activeSection === "settings" && (
            <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">

              {/* Header */}
              <div className="mb-8">
                <div className="mb-2 inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                  ⚙️ Application Settings
                </div>

                <h2 className="text-2xl font-bold text-white">
                  Settings
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage your AI Voice Studio preferences.
                </p>
              </div>

              {/* Preferences */}
              <div className="rounded-xl border border-white/10 bg-slate-900/40">

                {/* Default Language */}
                <div className="flex flex-col gap-4 border-b border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      Default Language
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Language used when creating new speech.
                    </p>
                  </div>

                  <select
                    value={language}
                    onChange={(event) =>
                      setLanguage(event.target.value)
                    }
                    className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-300 outline-none transition focus:border-indigo-400/40"
                  >
                    {supportedLanguages.map((item) => (
                      <option
                        key={item.code}
                        value={item.code}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Default Voice */}
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      Default Voice
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Voice used for speech generation.
                    </p>
                  </div>

                  <select
                    value={voice}
                    onChange={(event) =>
                      setVoice(event.target.value)
                    }
                    className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-xs text-slate-300 outline-none transition focus:border-indigo-400/40"
                  >
                    <option value="default">
                      Default Voice
                    </option>
                  </select>
                </div>

              </div>

              {/* Info */}
              <div className="mt-5 rounded-xl border border-indigo-400/10 bg-indigo-500/5 px-5 py-4">
                <p className="text-xs leading-5 text-slate-500">
                  These preferences are automatically saved and will
                  be used the next time you open AI Voice Studio.
                </p>
              </div>

            </section>
          )}

          {/* Delete Confirmation Modal */}
          {deleteTarget && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/40">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-xl">
                    🗑️
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Move to Trash?
                    </h3>
                    <p className="text-xs text-slate-500">
                      Confirm this action
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-6 text-slate-400">
                  This speech will be moved to Trash. You can restore it later
                  or permanently delete it from the Trash section.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(null)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteHistory(deleteTarget._id);
                      setDeleteTarget(null);
                    }}
                    className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
                  >
                    Move to Trash
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Permanent Delete Confirmation Modal */}
          {permanentDeleteTarget && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/40">

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-xl">
                    ⚠️
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Delete Permanently?
                    </h3>

                    <p className="text-xs text-slate-500">
                      This action cannot be undone
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-6 text-slate-400">
                  This speech will be permanently deleted from your
                  account. You will not be able to restore it afterward.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setPermanentDeleteTarget(null)
                    }
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      handlePermanentDelete(
                        permanentDeleteTarget._id
                      );

                      setPermanentDeleteTarget(null);
                    }}
                    className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
                  >
                    Delete Permanently
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}

export default App;