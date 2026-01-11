import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. Định nghĩa cấu trúc dữ liệu để tránh lỗi Build
interface HeaderInfo {
  ubnd: string;
  tenTruong: string;
  kyKiemTra: string;
  monHoc: string;
  thoiGian: string;
  maDe: string;
  namHoc: string;
}

// 2. Hàm lấy API Key (Ưu tiên Vercel -> LocalStorage)
export const getApiKey = (): string => {
  // Vite sẽ đọc biến này từ phần Settings > Environment Variables trên Vercel
  return (import.meta.env.VITE_GEMINI_API_KEY as string) || localStorage.getItem("GEMINI_API_KEY") || "";
};

// 3. Hàm xử lý dữ liệu từ AI
export const cleanAndParseJSON = (text: string): any => {
  try {
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Lỗi phân tích JSON:", text, e);
    throw new Error("Phản hồi từ AI không đúng định dạng JSON.");
  }
};

// 4. Khởi tạo AI (Sử dụng hàm lấy key ở trên)
export const getAIModel = (modelName: string = "gemini-1.5-flash") => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("API Key chưa được cấu hình trên Vercel hoặc Trình duyệt.");
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: modelName });
};
