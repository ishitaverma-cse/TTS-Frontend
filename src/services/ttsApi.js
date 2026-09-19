import axios from "axios";

const API_URL = "https://ai-voice-studio-backend.onrender.com/api";

// Get logged-in user's JWT
const getAuthConfig = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Generate normal speech
export const generateSpeech = async (text, language, voice) => {
  const response = await axios.post(
    `${API_URL}/tts`,
    {
      text,
      language,
      voice,
    },
    {
      ...getAuthConfig(),
      responseType: "blob",
    }
  );

  return response.data;
};

// Enhance text using Gemini
export const enhanceText = async (text) => {
  const response = await axios.post(
    `${API_URL}/ai/enhance`,
    {
      text,
    },
    getAuthConfig()
  );

  return response.data;
};

// Extract text from TXT / PDF / DOCX
export const extractFileText = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(
    `${API_URL}/files/extract`,
    formData,
    getAuthConfig()
  );

  return response.data;
};

// AI Enhanced Text → TTS
export const generateEnhancedSpeech = async (
  text,
  language,
  voice
) => {
  const response = await axios.post(
    `${API_URL}/tts/enhanced`,
    {
      text,
      language,
      voice,
    },
    {
      ...getAuthConfig(),
      responseType: "blob",
    }
  );

  return response.data;
};

// Add History API Functions
export const getHistory = async (page = 1, limit = 8) => {
  const response = await axios.get(
    `${API_URL}/history?page=${page}&limit=${limit}`,
    getAuthConfig()
  );

  return response.data;
};

export const getFavorites = async (page = 1, limit = 8) => {
  const response = await axios.get(
    `${API_URL}/history/favorites?page=${page}&limit=${limit}`,
    getAuthConfig()
  );

  return response.data;
};

export const getTrash = async (page = 1, limit = 8) => {
  const response = await axios.get(
    `${API_URL}/history/trash?page=${page}&limit=${limit}`,
    getAuthConfig()
  );

  return response.data;
};

export const toggleFavorite = async (historyId) => {
  const response = await axios.patch(
    `${API_URL}/history/${historyId}/favorite`,
    {},
    getAuthConfig()
  );

  return response.data;
};

export const deleteHistory = async (historyId) => {
  const response = await axios.delete(
    `${API_URL}/history/${historyId}`,
    getAuthConfig()
  );

  return response.data;
};

export const restoreHistory = async (historyId) => {
  const response = await axios.patch(
    `${API_URL}/history/${historyId}/restore`,
    {},
    getAuthConfig()
  );

  return response.data;
};

export const permanentlyDeleteHistory = async (historyId) => {
  const response = await axios.delete(
    `${API_URL}/history/${historyId}/permanent`,
    getAuthConfig()
  );

  return response.data;
};