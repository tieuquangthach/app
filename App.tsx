import React from 'react';
import MatrixWorkflow from './components/MatrixWorkflow';

const App: React.FC = () => {
  return (
    <div 
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-500 bg-primary"
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Trình Tạo Đề Kiểm Tra Toán Học
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-xl font-medium text-indigo-200">
            Sử dụng trí tuệ nhân tạo để tạo ra các đề kiểm tra toán học một cách nhanh chóng và dễ dàng.
          </p>
        </header>

        <main>
          <MatrixWorkflow />
        </main>
        
        <footer className="text-center mt-12 text-indigo-200 font-medium">
          <p>&copy; {new Date().getFullYear()} - Tạo bởi AI. Giao diện thiết kế cho mục đích trình diễn.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;