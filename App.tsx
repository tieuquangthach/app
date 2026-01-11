import React, { useState, useRef, useEffect } from 'react';
import MatrixWorkflow from './components/MatrixWorkflow';
import SimilarExercisesWorkflow from './components/SimilarExercisesWorkflow';

const App: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("TẠO ĐỀ KIỂM TRA BẰNG AI");
  const dropdownRef = useRef<HTMLLIElement>(null);

  const allTabs = [
    "TẠO ĐỀ KIỂM TRA BẰNG AI", "TẠO BÀI TẬP TƯƠNG TỰ", "KIỂM TRA TRỰC TUYẾN",
    "BÀI TRÌNH CHIẾU", "HOẠT ĐỘNG KHỞI ĐỘNG", "HOẠT ĐỘNG NHÓM",
    "TRẮC NGHIỆM NHANH", "BÀI TẬP VẬN DỤNG", "INFOGRAPHIC", "SƠ ĐỒ TƯ DUY"
  ];

  const visibleTabs = allTabs.slice(0, 3);
  const hiddenTabs = allTabs.slice(3);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <header className="bg-primary text-white sticky top-0 z-50 shadow-md h-16 flex items-center px-4">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab(allTabs[0])}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-primary text-xs">TQT</div>
            <span className="text-[8px] font-black uppercase tracking-widest">Tiêu Quang Thạch</span>
          </div>
          <div className="hidden md:block bg-white/10 px-6 py-1 rounded-full text-sm font-bold italic">
            Hệ thống dạy học và kiểm tra tạo bởi AI
          </div>
          <button className="bg-secondary px-6 py-2 rounded-xl font-bold text-sm shadow-lg shadow-orange-900/20">Đăng ký</button>
        </div>
      </header>

      <nav className="bg-secondary border-b border-orange-600 text-white py-3">
        <div className="max-w-7xl mx-auto flex justify-center gap-8 text-[13px] font-black uppercase">
          {visibleTabs.map((tab) => (
            <div key={tab} onClick={() => setActiveTab(tab)} className={`${activeTab === tab ? 'text-blue-900 border-b-2 border-blue-900' : 'hover:text-blue-900'} cursor-pointer transition`}>
              {tab}
            </div>
          ))}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-white/10 px-4 py-1 rounded-full border border-white/20 flex items-center gap-2">
              <span className="text-[11px]">{hiddenTabs.includes(activeTab) ? activeTab : 'XEM THÊM'}</span>
              <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl py-3 z-50 overflow-hidden text-gray-600">
                {hiddenTabs.map((tab) => (
                  <div key={tab} onClick={() => {setActiveTab(tab); setIsDropdownOpen(false);}} className={`px-6 py-3 font-bold hover:bg-secondary hover:text-white cursor-pointer`}>
                    {tab}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-2xl p-6 md:p-10 min-h-[600px]">
          {activeTab === "TẠO ĐỀ KIỂM TRA BẰNG AI" ? <MatrixWorkflow /> : <SimilarExercisesWorkflow />}
        </div>
      </main>

      <footer className="py-10 text-center text-gray-400 text-sm font-medium border-t">
        © 2026 Hệ thống dạy học và kiểm tra tạo bởi AI.
      </footer>
    </div>
  );
};

export default App;
