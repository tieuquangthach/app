// Định nghĩa lại interface để tránh lỗi build (nếu file cũ bị mất)
interface HeaderInfo {
  ubnd: string;
  tenTruong: string;
  kyKiemTra: string;
  monHoc: string;
  thoiGian: string;
  maDe: string;
  namHoc: string;
}

// 1. Hàm lấy API Key (Ưu tiên Vercel Env -> LocalStorage)
export const Fa = (): string => {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  return (envKey as string) || localStorage.getItem("GEMINI_API_KEY") || "";
};

// 2. Hàm xử lý JSON
export const Ja = (i: string): any => {
  try {
    const cleanJson = i.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Lỗi phân tích JSON:", i, e);
    throw new Error("Phản hồi từ AI không hợp lệ.");
  }
};

// Lưu ý: Đảm bảo các class như Pa hoặc các hàm EA, _A bên dưới 
// vẫn sử dụng biến apiKey lấy từ hàm Fa() ở trên.
