import { useState } from "react";
import { enhanceText } from "../services/ttsApi";

function AIEnhancer({ text, onEnhancedText }) {
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState("");

  const handleEnhance = async () => {
    setError("");

    if (!text.trim()) {
      setError("Please enter some text before using AI enhancement.");
      return;
    }

    try {
      setIsEnhancing(true);

      const response = await enhanceText(text);

      onEnhancedText(response.data.enhancedText);
    } catch (error) {
      console.error("❌ AI Enhancement Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to enhance text. Please try again."
      );
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="mt-5">

      {/* Enhance Button */}
      <button
        type="button"
        onClick={handleEnhance}
        disabled={isEnhancing || !text.trim()}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-5 py-3.5 text-sm font-semibold text-indigo-300 transition hover:border-indigo-400/40 hover:bg-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isEnhancing ? (
          <>
            <span>⏳</span>
            Enhancing with AI...
          </>
        ) : (
          <>
            <span>✨</span>
            Enhance with AI
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className="mt-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          ⚠️ {error}
        </div>
      )}

    </div>
  );
}

export default AIEnhancer;