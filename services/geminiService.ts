// 1. Hàm lấy API Key an toàn cho Vercel (Vite)
export const Fa = (): string => {
  // Ưu tiên lấy từ biến môi trường VITE_GEMINI_API_KEY trên Vercel
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY as string) || localStorage.getItem("GEMINI_API_KEY");
  return apiKey || "";
};

// 2. Hàm dọn dẹp và phân tích dữ liệu JSON từ AI
export const Ja = (text: string): any => {
  try {
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Lỗi phân tích JSON từ Gemini:", text, e);
    throw new Error("Phản hồi từ AI không đúng định dạng JSON.");
  }
};

/**
 * Lưu ý: Nếu bạn có các hàm như EA, _A, Gm trong file này, 
 * hãy đảm bảo chúng sử dụng Fa() để lấy key thay vì biến cứng.
 */
