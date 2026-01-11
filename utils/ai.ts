import { GoogleGenerativeAI } from "@google/generative-ai";

export const getAIModel = (modelName: string = "gemini-1.5-flash") => {
  // Lấy key từ localStorage (người dùng dán ở App.tsx)
  const savedKey = localStorage.getItem('GEMINI_API_KEY');
  
  // Nếu không có, thử lấy từ biến môi trường (Vite/AI Studio)
  const apiKey = savedKey || import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === "PLACEHOLDER_API_KEY") {
    throw new Error("Vui lòng cấu hình API Key trong mục Cấu hình AI ở phía trên.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: modelName });
};
