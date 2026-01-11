// File: src/services/geminiService.ts

// --- DÁN KEY CỦA BẠN VÀO ĐÂY LUÔN ---
const API_KEY = "Dán_Key_Của_Bạn_Vào_Đây_Nhé_AIzaSy...";

export const generateContent = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi.";
  } catch (error) {
    console.error(error);
    return "Lỗi kết nối API.";
  }
};

// Hàm này để sửa lỗi Build Failed (Missing export)
export const regenerateSingleQuestion = async (
  currentQuestion: string, 
  userPrompt: string, 
  apiKey: string
): Promise<string> => {
  // Gọi hàm generateContent ở trên
  return await generateContent(`Sửa lại câu hỏi sau theo yêu cầu: ${userPrompt}. Câu hỏi cũ: ${currentQuestion}`);
};
