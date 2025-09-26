import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, QuizMatrix, QuizSpecification, SpecificationItem } from '../types';

if (!process.env.API_KEY) {
  throw new Error("Biến môi trường API_KEY chưa được đặt");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseJsonResponse = <T>(jsonText: string): T => {
  try {
    const data = JSON.parse(jsonText);
    return data as T;
  } catch (error) {
    console.error("Lỗi khi phân tích JSON:", jsonText, error);
    throw new Error("Phản hồi từ AI không phải là định dạng JSON hợp lệ.");
  }
};

export const generateSpecification = async (matrix: QuizMatrix, selectedClass: string): Promise<QuizSpecification> => {
  const matrixString = JSON.stringify(matrix, null, 2);
  const prompt = `
    Bạn là một chuyên gia về khảo thí giáo dục Việt Nam. Dựa vào ma trận kiến thức cho một bài kiểm tra Toán lớp ${selectedClass} theo định dạng của Công văn 7991 BGDĐT sau đây, hãy tạo ra một bảng đặc tả chi tiết. Ma trận này bao gồm 'topic' (Chủ đề/Chương), 'knowledgeUnit' (Nội dung/đơn vị kiến thức), và 'percentage' (tỉ lệ phần trăm điểm). Hãy sử dụng tất cả thông tin này để tạo ra các "Yêu cầu cần đạt" phù hợp.
    Ma trận:
    ${matrixString}

    Yêu cầu:
    1. Với mỗi ô trong ma trận có số lượng câu hỏi lớn hơn 0, hãy tạo ra một hoặc nhiều "Yêu cầu cần đạt" tương ứng.
    2. Mỗi "Yêu cầu cần đạt" là một mô tả rõ ràng về kiến thức, kỹ năng mà học sinh cần thể hiện, phù hợp với lớp ${selectedClass}.
    3. Mỗi đối tượng trong mảng kết quả phải tương ứng với một "Yêu cầu cần đạt" và phải bao gồm 'chuDe' (lấy từ 'topic'), 'noiDung' (lấy từ 'knowledgeUnit'), 'loaiCauHoi', và 'mucDo'.
    4. Giữ nguyên tên các thuộc tính trong schema.
    5. Trả về kết quả dưới dạng một mảng JSON hợp lệ tuân thủ schema đã cho.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              chuDe: { type: Type.STRING },
              noiDung: { type: Type.STRING },
              yeuCauCanDat: { type: Type.STRING },
              loaiCauHoi: { type: Type.STRING },
              mucDo: { type: Type.STRING },
              soLuong: { type: Type.INTEGER },
            },
            required: ["chuDe", "noiDung", "yeuCauCanDat", "loaiCauHoi", "mucDo", "soLuong"],
          }
        }
      }
    });
    const jsonText = response.text.trim();
    return parseJsonResponse<SpecificationItem[]>(jsonText);
  } catch (error) {
    console.error("Lỗi khi tạo bảng đặc tả:", error);
    throw new Error("Không thể tạo bảng đặc tả. Vui lòng kiểm tra lại ma trận.");
  }
};

export const generateQuizFromSpec = async (specification: QuizSpecification, selectedClass: string): Promise<QuizQuestion[]> => {
  const specString = JSON.stringify(specification, null, 2);
  const prompt = `
    Bạn là một giáo viên toán nhiều kinh nghiệm. Dựa vào bảng đặc tả chi tiết theo định dạng của Bộ GDĐT Việt Nam sau đây, hãy soạn một đề kiểm tra toán học hoàn chỉnh cho học sinh lớp ${selectedClass}. Bảng đặc tả này có 'chuDe' (chủ đề/chương chính), 'noiDung' (nội dung cụ thể), và 'yeuCauCanDat'. Hãy đảm bảo câu hỏi phù hợp với cả ba cấp độ thông tin này.
    Bảng đặc tả:
    ${specString}

    Yêu cầu:
    1. Soạn các câu hỏi tuân thủ nghiêm ngặt theo "Yêu cầu cần đạt", "loại câu hỏi", "mức độ", và "số lượng" đã được chỉ định cho từng mục trong bảng đặc tả.
    2. Mỗi câu hỏi phải có 'cauHoi' (nội dung câu hỏi) và 'dapAn' (đáp án chính xác).
    3. **QUY TẮC ĐỊNH DẠNG cho từng loại câu hỏi:**
       - **"Nhiều lựa chọn":** Mỗi câu hỏi phải có 4 lựa chọn được đánh dấu A, B, C, D. Trong đó chỉ có một đáp án đúng. Nội dung 'cauHoi' phải bao gồm cả câu hỏi và 4 lựa chọn này. 'dapAn' chỉ ghi chữ cái của đáp án đúng (ví dụ: "A" hoặc "C").
       - **"Đúng - Sai":** Mỗi một câu hỏi "Đúng - Sai" phải bao gồm một câu dẫn chung và chính xác 4 phát biểu nhỏ (đánh dấu là a, b, c, d). Mỗi phát biểu nhỏ này tương đương 0.25 điểm. Sau mỗi phát biểu nhỏ, hãy thêm dấu ba chấm "..." để học sinh điền 'Đ' (Đúng) hoặc 'S' (Sai). Ví dụ về định dạng 'cauHoi': "Cho tam giác ABC vuông tại A. Các phát biểu sau đúng hay sai?\\na. Cạnh huyền là cạnh lớn nhất. ...\\nb. Góc B và góc C phụ nhau. ...\\nc. sin(B) = cos(C). ...\\nd. AB^2 + BC^2 = AC^2. ...". 'dapAn' cho câu "Đúng - Sai" phải liệt kê đáp án cho cả 4 phát biểu. Ví dụ: "a - Đ, b - Đ, c - Đ, d - S".
    4. Đảm bảo tổng số câu hỏi được tạo ra khớp với tổng số lượng yêu cầu trong bảng đặc tả.
    5. Trả về kết quả dưới dạng một mảng JSON hợp lệ tuân thủ schema đã cho.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              cauHoi: { type: Type.STRING },
              dapAn: { type: Type.STRING },
            },
            required: ["cauHoi", "dapAn"],
          }
        }
      }
    });
    const jsonText = response.text.trim();
    return parseJsonResponse<QuizQuestion[]>(jsonText);
  } catch (error) {
    console.error("Lỗi khi tạo đề từ bảng đặc tả:", error);
    throw new Error("Không thể tạo đề kiểm tra từ bảng đặc tả.");
  }
};