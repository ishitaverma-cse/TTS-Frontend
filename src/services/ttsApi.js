import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const generateSpeech = async (text, language, voice) => {
  const response = await axios.post(
    `${API_URL}/tts`,
    {
      text,
      language,
      voice,
    },
    {
      responseType: "blob",   //cause our backend no longer returns JSON. It returns: audio/mpeg.
    }
  );

  return response.data;
};