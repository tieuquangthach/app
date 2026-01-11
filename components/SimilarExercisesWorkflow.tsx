import React, { useState } from 'react';

const SimilarExercisesWorkflow: React.FC = () => {
  // --- STATE ---
  const [originalQuestion, setOriginalQuestion] = useState('');
  const [numVariants, setNumVariants] = useState(3);
  const [difficulty, setDifficulty] = useState('similar'); // similar, harder, easier
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // --- HÀM GỌI API GEMINI ---
  const handleGenerate = async () => {
    const apiKey = localStorage.getItem('GEMINI_API_KEY');

    if (!apiKey) {
      alert('Vui lòng nhập API Key ở biểu tượng chìa khóa góc dưới màn hình trước!');
      return;
    }

    if (!originalQuestion.trim()) {
      alert('Vui lòng nhập nội dung câu hỏi gốc!');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent('');

    // Xây dựng prompt (câu lệnh) gửi cho AI
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
      5. Cung cấp đáp án hoặc hướng dẫn giải ngắn gọn ở cuối mỗi câu (ẩn trong thẻ toggle hoặc phía dưới cùng).
      
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

  // --- GIAO DIỆN ---
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
            className="w-full h-48 p-4 rounded-2xl border-2 border-gray-100 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all resize-none text-sm shadow-inner bg-gray-50 font-medium"
          />
        </div>

        {/* Tùy chọn cấu hình */}
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

        {/* Nút hành động */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={`w-full py-4 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2
            ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:brightness-110 shadow-orange-500/30'}
          `}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Đang tạo...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              <span>Tạo Bài Tập</span>
            </>
          )}
        </button>
      </div>

      {/* CỘT PHẢI: KẾT QUẢ */}
      <div className="lg:w-2/3 flex flex-col h-full min-h-[500px]">
        <div className="flex justify-between items-end mb-4">
           <div>
             <h2 className="text-2xl font-black text-blue-900 uppercase italic">Kết quả từ AI</h2>
             <p className="text-gray-400 text-xs font-bold mt-1">SỬ DỤNG MÔ HÌNH GEMINI 1.5 FLASH</p>
           </div>
           
           {generatedContent && (
             <div className="flex gap-2">
                <button 
                  onClick={() => navigator.clipboard.writeText(generatedContent)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg text-xs font-bold transition"
                >
                  COPY TEXT
                </button>
                <button className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-bold transition">
                  XUẤT WORD
                </button>
             </div>
           )}
        </div>

        <div className="flex-grow bg-gray-50 rounded-[2rem] border border-gray-100 p-8 shadow-inner overflow-y-auto relative">
          {!generatedContent && !isLoading && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 opacity-60">
               <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
               <p className="font-bold uppercase tracking-widest text-sm">Chưa có dữ liệu</p>
            </div>
          )}

          {isLoading && (
            <div className="space-y-4 animate-pulse">
               <div className="h-4 bg-gray-200 rounded w-3/4"></div>
               <div className="h-4 bg-gray-200 rounded w-full"></div>
               <div className="h-4 bg-gray-200 rounded w-5/6"></div>
               <div className="h-32 bg-gray-200 rounded-xl w-full mt-6"></div>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 text-sm font-medium flex items-center gap-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          {generatedContent && (
            <div className="prose prose-sm max-w-none prose-headings:text-blue-900 prose-p:text-gray-700">
               {/* Hiển thị text xuống dòng đơn giản. Nếu muốn đẹp hơn có thể dùng thư viện react-markdown */}
               <div className="whitespace-pre-wrap leading-relaxed font-serif text-base text-gray-800">
                 {generatedContent}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimilarExercisesWorkflow;
