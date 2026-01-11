import { GoogleGenAI } from "@google/genai";

// Dán API Key thật của bạn vào đây
const API_KEY = "AIzaSyDxDMgExTEalrV4b30thDEvJxsAnUnuzmM"; 

const ai = new GoogleGenAI(API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

// Các hàm khác của bạn...

// PHẢI CÓ HÀM NÀY ĐỂ HẾT LỖI BUILD
export const regenerateSingleQuestion = async (oldQuestion: any, selectedClass: string, selectedSubject: string) => {
  const prompt = `Tạo lại câu hỏi mới tương tự cho môn ${selectedSubject} lớp ${selectedClass}...`;
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
};
