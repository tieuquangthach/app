import React, { useState, useRef, useEffect } from 'react';
import MatrixWorkflow from './components/MatrixWorkflow';
import SimilarExercisesWorkflow from './components/SimilarExercisesWorkflow';

const App: React.FC = () => {
  // --- TRẠNG THÁI GIAO DIỆN ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("TẠO ĐỀ KIỂM TRA BẰNG AI");
  const dropdownRef = useRef<HTMLLIElement>(null);

  // --- QUẢN LÝ API KEY MODAL ---
  const [showApiModal, setShowApiModal] = useState(false);
  const [tempKey, setTempKey] = useState(localStorage.getItem('GEMINI_API_KEY') || '');

  const allTabs = [
    "TẠO ĐỀ KIỂM TRA BẰNG AI", "TẠO BÀI TẬP TƯƠNG TỰ", "KIỂM TRA TRỰC TUYẾN",
    "BÀI TRÌNH CHIẾU", "HOẠT ĐỘNG KHỞI ĐỘNG", "HOẠT ĐỘNG NHÓM",
    "TRẮC NGHIỆM NHANH", "BÀI TẬP VẬN DỤNG", "INFOGRAPHIC", "SƠ ĐỒ TƯ DUY"
  ];

  const visibleTabs = allTabs.slice(0, 3);
  const hiddenTabs = allTabs.slice(3);

  // Tự động hiện Modal sau 2 giây nếu chưa có Key
  useEffect(() => {
    if (!localStorage.getItem('GEMINI_API_KEY')) {
      const timer = setTimeout(() => setShowApiModal(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Đóng dropdown khi click ra ngoài
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

  const handleSaveKey = () => {
    if (tempKey.trim()) {
      localStorage.setItem('GEMINI_API_KEY', tempKey.trim());
      setShowApiModal(false);
      window.location.reload();
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('GEMINI_API_KEY');
    setTempKey('');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* HEADER */}
      <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab(allTabs[0])}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-primary shadow-lg text-xs group-hover:scale-110 transition-transform">TQT</div>
            <span className="text-[7px] font-black uppercase tracking-[0.1em] opacity-90">Tiêu Quang Thạch</span>
          </div>

          <div className="hidden md:block flex-grow overflow-hidden h-7 bg-white/10 rounded-full flex items-center">
            <div className="animate-marquee whitespace-nowrap w-full text-center">
              <span className="text-sm font-bold uppercase italic px-4">Hệ thống dạy học và kiểm tra tạo bởi AI</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="text-sm font-bold hover:text-white/80 px-3 py-2">Đăng nhập</button>
            <button className="bg-secondary hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-lg shadow-sm transition">Đăng ký</button>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="bg-secondary nav-shadow border-b border-orange-600 relative z-40">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center items-center gap-4 md:gap-8 py-3 text-[13px] font-black text-white uppercase tracking-tight">
            {visibleTabs.map((tab) => (
              <li key={tab} onClick={() => handleTabClick(tab)} className={`${activeTab === tab ? 'text-blue-900 border-b-2 border-blue-900' : 'hover:text-blue-900'} pb-1 cursor-pointer transition whitespace-nowrap`}>
                {tab}
              </li>
            ))}
            
            <li className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20">
                <span className="text-[11px] font-black">{hiddenTabs.includes(activeTab) ? activeTab : 'XEM THÊM'}</span>
                <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 md:left-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 overflow-hidden animate-fade-in">
                  {hiddenTabs.map((tab) => (
                    <div key={tab} onClick={() => handleTabClick(tab)} className={`px-6 py-3 font-bold text-[12px] cursor-pointer border-b border-gray-50 last:border-0 ${activeTab === tab ? 'bg-secondary text-white' : 'text-gray-600 hover:bg-secondary hover:text-white'}`}>
                      {tab}
                    </div>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl min-h-[600px] overflow-hidden p-4 md:p-8">
          {activeTab === "TẠO ĐỀ KIỂM TRA BẰNG AI" ? <MatrixWorkflow /> : activeTab === "TẠO BÀI TẬP TƯƠNG TỰ" ? <SimilarExercisesWorkflow /> : (
            <div className="flex flex-col items-center justify-center h-[500px] text-gray-400 text-center">
               <p className="text-xl font-bold uppercase italic tracking-widest">Tính năng {activeTab} đang phát triển</p>
               <button onClick={() => setActiveTab(allTabs[0])} className="mt-6 px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg hover:brightness-110">Quay lại</button>
            </div>
          )}
        </div>
      </main>

      {/* MODAL API KEY */}
      {showApiModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-md w-full shadow-2xl border border-gray-100">
            <h3 className="text-2xl font-black text-primary mb-2 uppercase italic">Cấu hình API Key</h3>
            <p className="text-gray-400 text-sm mb-6">Lưu khóa cá nhân để sử dụng AI.</p>
            <input type="password" value={tempKey} onChange={(e) => setTempKey(e.target.value)} placeholder="Dán Gemini API Key tại đây..." className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none mb-4 font-mono text-sm bg-gray-50" />
            <div className="flex gap-3">
              <button onClick={handleClearKey} className="px-3 py-2 text-xs font-bold text-red-500">XÓA</button>
              <button onClick={() => setShowApiModal(false)} className="flex-1 py-4 font-bold text-gray-400">HỦY</button>
              <button onClick={handleSaveKey} className="flex-1 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg hover:brightness-110">LƯU KEY</button>
            </div>
            <p className="mt-6 text-center text-[10px] text-gray-300 uppercase font-black">Lấy mã tại <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-secondary underline">AI Studio</a></p>
          </div>
        </div>
      )}

      {/* NÚT CÀI ĐẶT GÓC DƯỚI */}
      <button onClick={() => setShowApiModal(true)} className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-2xl z-50 border-4 border-white hover:scale-110 transition-transform shadow-primary/20">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
      </button>

      <footer className="bg-white border-t py-10 text-center text-gray-400 text-sm font-medium">
        © 2026 Hệ thống dạy học và kiểm tra tạo bởi AI.
      </footer>
    </div>
  );
};

export default App;
