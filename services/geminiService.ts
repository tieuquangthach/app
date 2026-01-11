import { GoogleGenAI } from "@google/generative-ai";

// 1. Khai báo các kiểu dữ liệu để tránh lỗi TypeScript
interface HeaderInfo {
  ubnd: string;
  tenTruong: string;
  kyKiemTra: string;
  monHoc: string;
  thoiGian: string;
  maDe: string;
  namHoc: string;
}

// 2. Hàm lấy API Key an toàn
// Ưu tiên: Biến môi trường Vercel (VITE_) -> LocalStorage
export const getApiKey = (): string => {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  return (envKey as string) || localStorage.getItem("GEMINI_API_KEY") || "";
};

// 3. Hàm xử lý dữ liệu JSON từ AI
export const cleanAndParseJSON = (text: string): any => {
  try {
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Lỗi phân tích JSON từ Gemini:", text, e);
    throw new Error("Phản hồi từ AI không đúng định dạng JSON.");
  }
};

/**
 * Lưu ý quan trọng: 
 * Đảm bảo bạn đã cài đặt thư viện bằng lệnh: npm install @google/generative-ai
 * Nếu file App.tsx gọi hàm Fa hoặc Ja, hãy đổi tên chúng thành getApiKey hoặc cleanAndParseJSON 
 * cho đồng nhất hoặc giữ nguyên tên cũ nếu bạn muốn.
 */
