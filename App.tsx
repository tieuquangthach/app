
import React, { useState, useRef, useEffect } from 'react';
import MatrixWorkflow from './components/MatrixWorkflow';
import SimilarExercisesWorkflow from './components/SimilarExercisesWorkflow';

const App: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("TẠO ĐỀ KIỂM TRA BẰNG AI");
  const dropdownRef = useRef<HTMLLIElement>(null);

  const allTabs = [
    "TẠO ĐỀ KIỂM TRA BẰNG AI",
    "TẠO BÀI TẬP TƯƠNG TỰ",
    "KIỂM TRA TRỰC TUYẾN",
    "BÀI TRÌNH CHIẾU",
    "HOẠT ĐỘNG KHỞI ĐỘNG",
    "HOẠT ĐỘNG NHÓM",
    "TRẮC NGHIỆM NHANH",
    "BÀI TẬP VẬN DỤNG",
    "INFOGRAPHIC",
    "SƠ ĐỒ TƯ DUY"
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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* TẦNG 1: NAVBAR CHÍNH */}
      <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-shrink-0 cursor-pointer group" onClick={() => setActiveTab(allTabs[0])}>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-primary shadow-lg group-hover:scale-110 transition-transform text-xs mb-0.5">
                  TQT
              </div>
              <span className="text-[7px] font-black text-white uppercase tracking-[0.1em] width-max leading-none opacity-90">Tiêu Quang Thạch</span>
            </div>
          </div>

          <div className="hidden md:block flex-grow overflow-hidden relative h-7 bg-white/10 rounded-full flex items-center">
            <div className="animate-marquee whitespace-nowrap flex items-center w-full">
              <span className="text-sm font-bold text-white/95 tracking-wide uppercase italic px-4 w-full text-center">
                Hệ thống dạy học và kiểm tra tạo bởi AI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button className="text-sm font-bold hover:text-white/80 px-3 py-2">Đăng nhập</button>
            <button className="bg-secondary hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-lg transition shadow-sm">Đăng ký</button>
          </div>
        </div>
      </header>

      {/* TẦNG 2: MENU CHỨC NĂNG */}
      <nav className="bg-secondary nav-shadow border-b border-orange-600 relative z-40">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center items-center gap-4 md:gap-8 py-3 text-[13px] font-black text-white uppercase tracking-tight">
            {visibleTabs.map((tab) => (
              <li 
                key={tab} 
                onClick={() => handleTabClick(tab)}
                className={`${activeTab === tab ? 'text-blue-900 border-b-2 border-blue-900' : 'hover:text-blue-900'} pb-1 cursor-pointer transition whitespace-nowrap`}
              >
                {tab}
              </li>
            ))}
            
            <li className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all border border-white/20 group ${hiddenTabs.includes(activeTab) ? 'bg-white/30 border-white' : 'bg-white/10 hover:bg-white/20'}`}
              >
                <span className={`text-[11px] font-black ${hiddenTabs.includes(activeTab) ? 'text-blue-900' : 'group-hover:text-blue-900'}`}>
                  {hiddenTabs.includes(activeTab) ? activeTab : 'XEM THÊM'}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 md:left-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 animate-fade-in z-50 overflow-hidden">
                  {hiddenTabs.map((tab) => (
                    <div 
                      key={tab}
                      className={`px-6 py-3 font-bold text-[12px] cursor-pointer transition-colors border-b border-gray-50 last:border-0 ${activeTab === tab ? 'bg-secondary text-white' : 'text-gray-600 hover:bg-secondary hover:text-white'}`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* NỘI DUNG CHÍNH */}
      <main className="flex-grow py-8 px-4">
        <div className={`max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl shadow-blue-900/10 min-h-[600px] overflow-hidden ${activeTab === "TẠO BÀI TẬP TƯƠNG TỰ" ? 'p-0 min-h-[800px]' : 'p-4 md:p-8'}`}>
          {activeTab === "TẠO ĐỀ KIỂM TRA BẰNG AI" && (
            <MatrixWorkflow />
          )}

          {activeTab === "TẠO BÀI TẬP TƯƠNG TỰ" && (
            <SimilarExercisesWorkflow />
          )}

          {activeTab !== "TẠO ĐỀ KIỂM TRA BẰNG AI" && activeTab !== "TẠO BÀI TẬP TƯƠNG TỰ" && (
            <div className="flex flex-col items-center justify-center h-[500px] text-gray-400 text-center p-6">
               <svg className="w-20 h-20 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
               <p className="text-xl font-bold uppercase tracking-widest italic">Tính năng {activeTab} đang được phát triển</p>
               <button 
                 onClick={() => setActiveTab(allTabs[0])}
                 className="mt-6 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:brightness-110 transition shadow-lg"
               >
                 Quay lại Tạo đề kiểm tra
               </button>
            </div>
          )}
        </div>
      </main>
      
      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-8">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-black text-white shadow-lg group-hover:scale-110 transition-transform">
                    TQT
                </div>
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Created By</span>
                    <span className="text-sm font-black text-primary">Tiêu Quang Thạch</span>
                </div>
             </div>
          </div>
          <div className="flex justify-center gap-8 text-gray-400">
             <span className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> Facebook</span>
             <span className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> Youtube</span>
             <span className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full"></div> TikTok</span>
          </div>
          <div className="text-gray-400 font-medium text-center max-w-md">
            <p className="text-sm leading-relaxed">
              © 2026 Hệ thống dạy học và kiểm tra tạo bởi AI.
            </p>
            <p className="text-[10px] mt-2 text-gray-300">Sử dụng công nghệ Trí tuệ nhân tạo (AI) để hỗ trợ giáo viên tối ưu hoá công việc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
