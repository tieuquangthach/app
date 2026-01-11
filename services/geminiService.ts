import { GoogleGenAI } from "@google/genai";

// 1. Dán API Key thật của bạn vào đây
const API_KEY = "AIzaSyDxDMgExTEalrV4b30thDEvJxsAnUnuzmM"; 

const ai = new GoogleGenAI(API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

// ... (Các hàm generateSpecification, generateQuizFromSpec của bạn)

// 2. BẮT BUỘC PHẢI CÓ HÀM NÀY ĐỂ HẾT LỖI BUILD
export const regenerateSingleQuestion = async (oldQuestion: any, selectedClass: string, selectedSubject: string) => {
  const prompt = `Tạo lại 01 câu hỏi mới cho môn ${selectedSubject} lớp ${selectedClass} tương tự câu: ${oldQuestion.cauHoi}`;
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};
