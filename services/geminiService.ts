// 1. Khai báo các cấu trúc dữ liệu bắt buộc để tránh lỗi Build
export interface HeaderInfo {
  ubnd: string;
  tenTruong: string;
  kyKiemTra: string;
  monHoc: string;
  thoiGian: string;
  maDe: string;
  namHoc: string;
}

// 2. Hàm lấy API Key an toàn
export const Fa = (): string => {
  // Vite sẽ đọc từ biến môi trường VITE_GEMINI_API_KEY bạn cài trên Vercel
  // Nếu không có, nó sẽ tìm trong bộ nhớ trình duyệt (LocalStorage)
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY as string) || localStorage.getItem("GEMINI_API_KEY");
  return apiKey || "";
};

// 3. Hàm xử lý dữ liệu JSON từ AI
export const Ja = (text: string): any => {
  try {
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Lỗi phân tích JSON:", text, e);
    throw new Error("Phản hồi từ AI không đúng định dạng JSON.");
  }
};
