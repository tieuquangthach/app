import React, { useState } from 'react';

// --- 1. DÁN KEY CỦA BẠN VÀO GIỮA 2 DẤU NGOẶC KÉP DƯỚI ĐÂY ---
const HARDCODED_API_KEY = "AIzaSyDxDMgExTEalrV4b30thDEvJxsAnUnuzmM"; 

const SimilarExercisesWorkflow: React.FC = () => {
  const [originalQuestion, setOriginalQuestion] = useState('');
  const [numVariants, setNumVariants] = useState(3);
  const [difficulty, setDifficulty] = useState('similar');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    // Sử dụng trực tiếp Key cứng
    const apiKey = HARDCODED_API_KEY;

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
      Đóng vai giáo viên. Tạo ${numVariants} bài tập tương tự.
      Yêu cầu: Giữ nguyên dạng bài, thay số liệu. Độ khó: ${difficultyText}.
      Bài tập gốc: "${originalQuestion}"
    `;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message || 'Lỗi Google AI');
      
      const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
      setGeneratedContent(textResult || 'Không có dữ liệu.');

    } catch (err: any) {
      setError(err.message || 'Lỗi kết nối.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      <div className="lg:w-1/3 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-blue-900">Tạo bài tập tương tự</h2>
        <textarea
          value={originalQuestion}
          onChange={(e) => setOriginalQuestion(e.target.value)}
          placeholder="Nhập đề bài gốc vào đây..."
          className="w-full h-40 p-3 border rounded-xl"
        />
        <button onClick={handleGenerate} disabled={isLoading} className="w-full py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition">
          {isLoading ? 'Đang xử lý...' : 'Tạo Bài Tập Ngay'}
        </button>
      </div>

      <div className="lg:w-2/3 bg-gray-50 p-6 rounded-xl border h-full overflow-y-auto min-h-[400px]">
        {error && <p className="text-red-500">{error}</p>}
        {generatedContent ? (
          <pre className="whitespace-pre-wrap font-sans text-gray-800">{generatedContent}</pre>
        ) : (
          <p className="text-gray-400 text-center mt-20">Kết quả sẽ hiện ở đây...</p>
        )}
      </div>
    </div>
  );
};

export default SimilarExercisesWorkflow;
