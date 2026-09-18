function VoiceControls({
  language,
  setLanguage,
  voice,
  setVoice,
}) {
  const languages = [
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

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Language */}
      <div>
        <label className="mb-2 block text-xs font-medium text-slate-400">
          Language
        </label>

        <select
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400/40"
        >
          {languages.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Voice */}
      <div>
        <label className="mb-2 block text-xs font-medium text-slate-400">
          Voice
        </label>

        <select
          value={voice}
          onChange={(event) => setVoice(event.target.value)}
          className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400/40"
        >
          <option value="default">Default Voice</option>
        </select>
      </div>
    </div>
  );
}

export default VoiceControls;