import React from 'react';

const MatrixWorkflow: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-blue-900 uppercase italic">Tạo đề ma trận</h2>
        <p className="text-gray-500 text-sm">Chức năng tạo đề thi dựa trên ma trận kiến thức (Demo).</p>
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột trái demo */}
        <div className="md:col-span-1 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
          <div className="h-12 bg-white rounded-xl border border-gray-200 w-full animate-pulse"></div>
          <div className="h-12 bg-white rounded-xl border border-gray-200 w-full animate-pulse delay-75"></div>
          <div className="h-12 bg-white rounded-xl border border-gray-200 w-full animate-pulse delay-150"></div>
          <div className="mt-auto h-12 bg-blue-100 rounded-xl w-full"></div>
        </div>

        {/* Cột phải demo */}
        <div className="md:col-span-2 bg-blue-50/50 rounded-2xl border border-blue-100 p-8 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 text-blue-500">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-blue-900">Tính năng Ma trận</h3>
          <p className="text-gray-500 max-w-xs mt-2 text-sm">Đây là thành phần giữ chỗ. Vui lòng phát triển logic tạo đề ma trận tại đây.</p>
        </div>
      </div>
    </div>
  );
};

export default MatrixWorkflow;
