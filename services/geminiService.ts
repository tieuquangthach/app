import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, QuizMatrix, QuizSpecification, SpecificationItem } from '../types';

// Hàm lấy API Key ưu tiên từ người dùng nhập vào
const getApiKey = (): string => {
  const savedKey = localStorage.getItem('GEMINI_API_KEY');
  if (savedKey) return savedKey;
  return import.meta.env.VITE_GEMINI_API_KEY || "";
};

const parseJsonResponse = <T>(jsonText: string): T => {
  try {
    const data = JSON.parse(jsonText.replace(/```json|```/g, '').trim());
    return data as T;
  } catch (error) {
    console.error("Lỗi phân tích JSON:", error);
    throw new Error("Phản hồi từ AI không hợp lệ.");
  }
};

export const generateSpecification = async (matrix: QuizMatrix, selectedClass: string, selectedSubject: string): Promise<QuizSpecification> => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error("API Key chưa được cấu hình. Vui lòng nhấn biểu tượng chìa khóa để nhập mã.");
  
  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Chuyển ma trận môn ${selectedSubject} lớp ${selectedClass} thành bảng đặc tả chi tiết: ${JSON.stringify(matrix)}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    return parseJsonResponse<SpecificationItem[]>(response.text.trim());
  } catch (error) { throw error; }
};

// ... Các hàm generateQuizFromSpec, generateSimilarQuizFromFile tương tự sử dụng getApiKey()
