import { useState } from "react";
import { generateSpeech } from "./services/ttsApi";

function App() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US");
  const [voice, setVoice] = useState("default");

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const [audioUrl, setAudioUrl] = useState("");

  const MAX_CHARACTERS = 5000;

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleGenerateSpeech = async () => {
    setError("");

    if (!text.trim()) {
      setError("Please enter some text before generating speech.");
      return;
    }

    try {
      setIsGenerating(true);

      const audioData = await generateSpeech(
        text,
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



  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500">
              <span className="text-xl">🎙️</span>
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                TTS Studio
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                Text to Speech
              </p>
            </div>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
            AI Voice Studio
          </div>

        </div>
      </header>


      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-16">

        {/* Hero */}
        <section className="mb-12 text-center">

          <div className="mb-4 inline-flex rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            ✨ AI-Powered Text to Speech
          </div>

          <h2 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Turn your text into
            <span className="text-indigo-400"> natural speech.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            Generate high-quality speech from text using multilingual
            voices and listen to your audio instantly.
          </p>

        </section>


        {/* TTS Workspace */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl sm:p-8">

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
              className="min-h-[220px] w-full resize-none rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-400/10"
            />

          </div>


          {/* Controls */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Language */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Language
              </label>

              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/50"
              >
                <option value="en-US">English (US)</option>
                <option value="hi-IN">Hindi (India)</option>
                <option value="es-ES">Spanish</option>
                <option value="fr-FR">French</option>
                <option value="de-DE">German</option>
                <option value="it-IT">Italian</option>
                <option value="pt-BR">Portuguese</option>
                <option value="ja-JP">Japanese</option>
                <option value="zh-CN">Chinese</option>
                <option value="ko-KR">Korean</option>
              </select>
            </div>


            {/* Voice */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Voice
              </label>

              <select
                value={voice}
                onChange={(event) => setVoice(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-indigo-400/50"
              >
                <option value="default">Default Voice</option>
                <option value="JBFqnCBsd6RMkjVDRZzb">
                  ElevenLabs Voice
                </option>
              </select>
            </div>

          </div>


          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerateSpeech}
            disabled={isGenerating}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-4 text-sm font-semibold text-white transition hover:bg-indigo-400 active:scale-[0.99]"
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

          {error && (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              ⚠️ {error}
            </div>
          )}


          {/* Audio Area */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/40 p-6">

            {audioUrl ? (
              <div>

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10">
                    <span className="text-lg">🎵</span>
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

                {/* Download Button */}
                <a
                  href={audioUrl}
                  download="tts-generated-audio.mp3"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <span>⬇️</span>
                  Download Audio
                </a>

              </div>
            ) : (
              <div className="py-4 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/5">
                  <span className="text-2xl">🎵</span>
                </div>

                <h3 className="mt-4 text-sm font-semibold">
                  Your generated audio will appear here
                </h3>

                <p className="mt-2 text-xs text-slate-500">
                  Enter some text and generate speech to get started.
                </p>

              </div>
            )}

          </div>

        </section>

      </main>


      {/* Footer */}
      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        Built with React, Tailwind CSS & ElevenLabs
      </footer>

    </div>
  );
}

export default App;