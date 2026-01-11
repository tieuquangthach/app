import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, QuizMatrix, QuizSpecification, SpecificationItem } from '../types';

// DÁN TRỰC TIẾP API KEY THẬT CỦA BẠN VÀO ĐÂY
const API_KEY = "AIzaSyDxDMgExTEalrV4b30thDEvJxsAnUnuzmM"; 

const ai = new GoogleGenAI(API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

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
  const prompt = `Bạn là chuyên gia khảo thí. Chuyển ma trận môn ${selectedSubject} lớp ${selectedClass} thành bảng đặc tả JSON: ${JSON.stringify(matrix)}`;
  const result = await model.generateContent(prompt);
  return parseJsonResponse<SpecificationItem[]>(result.response.text());
};

export const generateQuizFromSpec = async (specification: QuizSpecification, selectedClass: string, selectedSubject: string): Promise<QuizQuestion[]> => {
  const prompt = `Soạn đề kiểm tra theo đặc tả: ${JSON.stringify(specification)}`;
  const result = await model.generateContent(prompt);
  const qs = parseJsonResponse<QuizQuestion[]>(result.response.text());
  return qs.map(q => ({ ...q, id: q.id || Math.random().toString(36).substr(2, 9) }));
};

// HÀM QUAN TRỌNG ĐỂ SỬA LỖI BUILD
export const regenerateSingleQuestion = async (oldQuestion: QuizQuestion, selectedClass: string, selectedSubject: string): Promise<QuizQuestion> => {
  const prompt = `Tạo lại câu hỏi mới tương tự cho môn ${selectedSubject} lớp ${selectedClass} thay thế cho: ${oldQuestion.cauHoi}`;
  const result = await model.generateContent(prompt);
  return parseJsonResponse<QuizQuestion>(result.response.text());
};
