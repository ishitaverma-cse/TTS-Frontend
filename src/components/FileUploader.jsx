import { useRef, useState } from "react";
import { extractFileText } from "../services/ttsApi";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function FileUploader({ onTextExtracted }) {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setSelectedFile(file);

    // Frontend file-size validation
    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be 10 MB or less.");
      setSelectedFile(null);
      return;
    }

    const allowedExtensions = [".txt", ".pdf", ".docx"];
    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      setError("Only TXT, PDF and DOCX files are supported.");
      setSelectedFile(null);
      return;
    }

    try {
      setLoading(true);

      const response = await extractFileText(file);

      onTextExtracted(response.data.text);

    } catch (err) {
      console.error("File Upload Error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to extract text from the file."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">
          📄 Upload Document
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Upload a TXT, PDF, or DOCX file to extract its text.
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.pdf,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleChooseFile}
        disabled={loading}
        className="w-full rounded-xl border border-dashed border-slate-600 px-4 py-8 text-center transition hover:border-indigo-500 hover:bg-slate-800/60 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <div className="text-3xl">📁</div>

        <div className="mt-2 font-medium text-slate-200">
          {loading ? "Extracting text..." : "Choose a file"}
        </div>

        <div className="mt-1 text-xs text-slate-500">
          TXT • PDF • DOCX · Max 10 MB
        </div>
      </button>

      {selectedFile && !loading && !error && (
        <div className="mt-4 rounded-xl bg-slate-800/70 px-4 py-3">
          <p className="text-sm font-medium text-slate-200">
            📄 {selectedFile.name}
          </p>

          <p className="mt-1 text-xs text-emerald-400">
            Text extracted successfully
          </p>
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}

export default FileUploader;