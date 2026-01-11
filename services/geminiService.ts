// 1. Hàm lấy API Key an toàn
export const getApiKey = (): string => {
  // Ưu tiên lấy từ biến môi trường Vercel (bắt đầu bằng VITE_)
  // Nếu không có, mới tìm trong localStorage
  const key = (import.meta.env.VITE_GEMINI_API_KEY as string) || localStorage.getItem("GEMINI_API_KEY");
  return key || "";
};

// 2. Hàm dọn dẹp và phân tích JSON từ AI
export const Ja = (text: string): any => {
  try {
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Lỗi phân tích JSON từ Gemini:", text, e);
    throw new Error("Dữ liệu phản hồi từ AI không đúng định dạng JSON.");
  }
};

/**
 * LƯU Ý: Đảm bảo class Pa (Google AI SDK) và các hàm khác 
 * đã được import hoặc định nghĩa đúng phía trên/dưới file này 
 * dựa theo mã nguồn gốc của bạn.
 */
