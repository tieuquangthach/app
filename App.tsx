import React, { useState, useRef, useEffect } from 'react';
import SimilarExercisesWorkflow from './components/SimilarExercisesWorkflow';
import MatrixWorkflow from './components/MatrixWorkflow';

const App: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("TẠO BÀI TẬP TƯƠNG TỰ"); // Đặt tab mặc định là Bài tập tương tự
  const dropdownRef = useRef<HTMLLIElement>(null);

  const allTabs = [
    "TẠO ĐỀ KIỂM TRA BẰNG AI", "TẠO BÀI TẬP TƯƠNG TỰ", "KIỂM TRA TRỰC TUYẾN",
    "BÀI TRÌNH CHIẾU", "HOẠT ĐỘNG KHỞI ĐỘNG", "HOẠT ĐỘNG NHÓM",
    "TRẮC NGHIỆM NHANH", "BÀI TẬP VẬN DỤNG", "INFOGRAPHIC", "SƠ ĐỒ TƯ DUY"
  ];

  const visibleTabs = allTabs.slice(0, 3);
  const hiddenTabs = allTabs.slice(3);

  // Đóng dropdown khi nhấn ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative font-sans text-gray-800">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white sticky top-0 z-50 shadow-md px-4">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab(allTabs[1])}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-blue-900 text-xs shadow-lg">TQT</div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-tight">Giáo viên</span>
                <span className="text-sm font-bold leading-tight">Tiêu Quang Thạch</span>
            </div>
          </div>

          <div className="hidden md:block flex-grow mx-8 h-8 bg-white/10 rounded-full flex items-center overflow-hidden">
             <span className="whitespace-nowrap px-4 text-xs font-semibold uppercase tracking-wide text-blue-100 italic animate-marquee">
               Hệ thống dạy học và kiểm tra &bull; Tích hợp Gemini 1.5 Flash AI
             </span>
          </div>

          <button className="bg-orange-500 px-5 py-2 rounded-lg text-sm font-bold shadow-lg hover:bg-orange-400 transition active:scale-95">
             Nâng cấp
          </button>
        </div>
      </header>

      {/* NAV MENU */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center items-center gap-1 md:gap-6 py-0 overflow-x-auto no-scrollbar">
            {visibleTabs.map((tab) => (
              <li 
                key={tab} 
                onClick={() => handleTabClick(tab)} 
                className={`cursor-pointer transition py-4 px-2 whitespace-nowrap text-[11px] md:text-[13px] font-black uppercase tracking-tight border-b-4 ${activeTab === tab ? 'text-blue-900 border-blue-900' : 'text-gray-400 border-transparent hover:text-blue-600'}`}
              >
                {tab}
              </li>
            ))}
            <li className="relative ml-2" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition ${isDropdownOpen || hiddenTabs.includes(activeTab) ? 'bg-blue-50 text-blue-900 border-blue-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
              >
                <span className="text-[10px] font-bold">{hiddenTabs.includes(activeTab) ? activeTab : 'XEM THÊM'}</span>
                <svg className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  {hiddenTabs.map((tab) => (
                    <div key={tab} onClick={() => handleTabClick(tab)} className={`px-5 py-3 font-bold text-[11px] cursor-pointer ${activeTab === tab ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-50'}`}>{tab}</div>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow py-6 px-4 md:px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-xl min-h-[600px] p-6 md:p-8 border border-gray-100">
          {activeTab === "TẠO ĐỀ KIỂM TRA BẰNG AI" && <MatrixWorkflow />}
          {activeTab === "TẠO BÀI TẬP TƯƠNG TỰ" && <SimilarExercisesWorkflow />}
          {!["TẠO ĐỀ KIỂM TRA BẰNG AI", "TẠO BÀI TẬP TƯƠNG TỰ"].includes(activeTab) && (
             <div className="flex flex-col items-center justify-center h-[500px] text-gray-300">
                <p className="font-bold text-lg uppercase">Tính năng đang phát triển</p>
             </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-400 text-xs font-semibold uppercase tracking-wider">
        © 2026 Hệ thống dạy học và kiểm tra tạo bởi AI
      </footer>
    </div>
  );
};

export default App;
