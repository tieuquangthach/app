import React, { useState } from 'react';
import { QuizQuestion } from '../types';

interface QuizDisplayProps {
  questions: QuizQuestion[];
  onStartOver?: () => void;
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({ questions, onStartOver }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [copyButtonText, setCopyButtonText] = useState('Sao chép Markdown');

  if (questions.length === 0) {
    return null;
  }

  const toggleAnswers = () => setShowAnswers(prev => !prev);

  const handleCopyMarkdown = () => {
    const markdownText = questions.map((q, index) => {
      // Replace newlines with markdown newlines for better compatibility
      const formattedQuestion = q.cauHoi.replace(/\n/g, '  \n');
      return `**Câu ${index + 1}:** ${formattedQuestion}\n\n**Đáp án:** ${q.dapAn}`;
    }).join('\n\n---\n\n');

    navigator.clipboard.writeText(markdownText).then(() => {
      setCopyButtonText('Đã sao chép!');
      setTimeout(() => setCopyButtonText('Sao chép Markdown'), 2000);
    }).catch(err => {
      console.error('Không thể sao chép:', err);
      setCopyButtonText('Lỗi!');
      setTimeout(() => setCopyButtonText('Sao chép Markdown'), 2000);
    });
  };

  const handleDownloadQuizWord = () => {
    let htmlContent = `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <title>Đề Kiểm Tra</title>
            <style>
                body { font-family: 'Times New Roman', serif; font-size: 12pt; }
                .question { margin-bottom: 20px; }
                p { margin: 5px 0; white-space: pre-wrap; line-height: 1.5; }
                b { font-weight: bold; }
                .answers-section { margin-top: 40px; page-break-before: always; }
                h1 { text-align: center; }
            </style>
        </head>
        <body>
            <h1>ĐỀ KIỂM TRA</h1>
    `;

    // Questions part
    questions.forEach((q, index) => {
        const formattedQuestion = q.cauHoi.replace(/\n/g, '<br>');
        htmlContent += `
            <div class="question">
                <p><b>Câu ${index + 1}:</b> ${formattedQuestion}</p>
            </div>
        `;
    });

    // Answers part on a new page
    htmlContent += `<div class="answers-section">`;
    htmlContent += `<h1>ĐÁP ÁN</h1>`;
    questions.forEach((q, index) => {
        const formattedAnswer = q.dapAn.replace(/\n/g, '<br>');
        htmlContent += `
            <div class="question">
                <p><b>Câu ${index + 1}:</b> ${formattedAnswer}</p>
            </div>
        `;
    });
    htmlContent += `</div>`;
    
    htmlContent += `</body></html>`;

    const blob = new Blob(['\ufeff', htmlContent], {
        type: 'application/msword;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'de-kiem-tra-va-dap-an.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6 border-b pb-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-text-main">Đề kiểm tra</h2>
        <div className="flex items-center gap-3 flex-wrap">
          {onStartOver && (
             <button
              onClick={onStartOver}
              className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
              aria-label="Tạo lại từ đầu"
            >
              Tạo Lại Từ Đầu
            </button>
          )}
           <button
            onClick={handleCopyMarkdown}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            {copyButtonText}
          </button>
          <button
            onClick={handleDownloadQuizWord}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
            aria-label="Tải về dưới dạng Word"
          >
            Tải Đề (Word)
          </button>
          <button
            onClick={toggleAnswers}
            className="px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:brightness-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all"
          >
            {showAnswers ? 'Ẩn Đáp Án' : 'Hiện Đáp Án'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {questions.map((q, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
            <p className="font-semibold text-text-main mb-2 whitespace-pre-wrap">
              <span className="text-text-accent font-bold">Câu {index + 1}:</span> {q.cauHoi}
            </p>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showAnswers ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-secondary font-medium mt-2 pt-2 border-t border-dashed whitespace-pre-wrap">
                <span className="font-bold">Đáp án:</span> {q.dapAn}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDisplay;