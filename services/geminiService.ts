// Hàm lấy API Key: Ưu tiên Biến môi trường Vercel -> LocalStorage
const getApiKey = (): string => {
  // Với Vite, phải dùng import.meta.env và bắt đầu bằng VITE_
  return (import.meta.env.VITE_GEMINI_API_KEY as string) || localStorage.getItem("GEMINI_API_KEY") || "";
};

// Hàm bổ trợ phân tích JSON từ Gemini
const parseGeminiResponse = (text: string) => {
  try {
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Lỗi phân tích JSON:", e);
    throw new Error("Dữ liệu AI trả về không đúng định dạng.");
  }
};
