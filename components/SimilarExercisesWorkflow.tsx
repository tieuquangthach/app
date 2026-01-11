import React, { useState } from 'react';

// =================================================================
// 🔴 QUAN TRỌNG: DÁN KEY CỦA BẠN VÀO GIỮA 2 DẤU NGOẶC KÉP DƯỚI ĐÂY
const MY_DIRECT_API_KEY = "AIzaSyDxDMgExTEalrV4b30thDEvJxsAnUnuzmM";
// =================================================================

const SimilarExercisesWorkflow: React.FC = () => {
  const [originalQuestion, setOriginalQuestion] = useState('');
  const [numVariants, setNumVariants] = useState(3);
  const [difficulty, setDifficulty] = useState('similar');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    // 1. Lấy Key trực tiếp từ biến bên trên
    const apiKey = MY_DIRECT_API_KEY;

    // 2. Kiểm tra xem người dùng đã điền Key vào code chưa
    if (!apiKey || apiKey.includes("Dán_Key")) {
      setError("Lỗi! API Key chưa được cấu hình. Vui lòng mở file code SimilarExercisesWorkflow.tsx và dán Key vào dòng số 5.");
      return;
    }

    if (!originalQuestion.trim()) {
      alert('Vui lòng nhập nội dung câu hỏi gốc!');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent('');

    const difficultyText = 
      difficulty === 'harder' ? 'cao hơn một chút (nâng cao)' : 
      difficulty === 'easier' ? 'cơ bản hơn' : 'tương đương';

    const prompt = `
      Đóng vai một giáo viên giỏi. Hãy tạo ra ${numVariants} bài tập tương tự dựa trên bài tập gốc dưới đây.
      Yêu cầu:
      1. Giữ nguyên dạng bài và cấu trúc logic.
      2. Thay đổi số liệu hoặc ngữ cảnh sao cho hợp lý.
      3. Độ khó: ${difficultyText} so với bài gốc.
      4. Trình bày rõ ràng, đánh số câu (Câu 1, Câu 2,...).
      5. Cung cấp đáp án hoặc hướng dẫn giải ngắn gọn ở cuối mỗi câu.
      
      Bài tập gốc:
      "${originalQuestion}"
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'Lỗi từ phía Google AI');
      }

      const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (textResult) {
        setGeneratedContent(textResult);
      } else {
        throw new Error('Không nhận được phản hồi từ AI.');
      }

    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra khi tạo bài tập.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* CỘT TRÁI: NHẬP LIỆU */}
      <div className="lg:w-1/3 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-black text-blue-900 mb-2 uppercase italic">Đề bài gốc</h2>
          <p className="text-gray-500 text-sm mb-4">Dán nội dung bài tập bạn muốn tạo biến thể vào đây.</p>
          
          <textarea
            value={originalQuestion}
            onChange={(e) => setOriginalQuestion(e.target.value)}
            placeholder="Ví dụ: Giải phương trình x^2 - 4x + 3 = 0..."
            className="w-full h-48 p-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 outline-none transition-all resize-none text-sm shadow-inner bg-gray-50 font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Số lượng câu</label>
            <select 
              value={numVariants}
              onChange={(e) => setNumVariants(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-gray-200 font-bold text-gray-700 focus:border-orange-500 outline-none"
            >
              {[1, 2, 3, 4, 5, 10].map(n => <option key={n} value={n}>{n} câu</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Độ khó</label>
            <select 
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-200 font-bold text-gray-700 focus:border-orange-500 outline-none"
            >
              <option value="easier">Dễ hơn</option>
              <option value="similar">Tương đương</option>
              <option value="harder">Nâng cao</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={`w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:brightness-110 shadow-orange-500/30'}
          `}
        >
          {isLoading ? 'ĐANG TẠO...' : 'TẠO BÀI TẬP'}
        </button>
      </div>

      {/* CỘT PHẢI: KẾT QUẢ */}
      <div className="lg:w-2/3 flex flex-col h-full min-h-[500px]">
        <div className="flex justify-between items-end mb-4">
           <div>
             <h2 className="text-2xl font-black text-blue-900 uppercase italic">Kết quả từ AI</h2>
             <p className="text-gray-400 text-xs font-bold mt-1">SỬ DỤNG MÔ HÌNH GEMINI 1.5 FLASH</p>
           </div>
        </div>

        <div className="flex-grow bg-gray-50 rounded-[2rem] border border-gray-100 p-8 shadow-inner overflow-y-auto relative">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium flex items-center gap-3">
              <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          )}

          {!generatedContent && !isLoading && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 opacity-60">
               <p className="font-bold uppercase tracking-widest text-sm">Chưa có dữ liệu</p>
            </div>
          )}

          {generatedContent && (
            <div className="whitespace-pre-wrap leading-relaxed font-serif text-base text-gray-800">
              {generatedContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimilarExercisesWorkflow;
