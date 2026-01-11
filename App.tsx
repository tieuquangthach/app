import React, { useState, useRef, useEffect } from 'react';
import MatrixWorkflow from './components/MatrixWorkflow';
import SimilarExercisesWorkflow from './components/SimilarExercisesWorkflow';

// Khai báo kiểu cho window.aistudio
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

const App: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAiConfigOpen, setIsAiConfigOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("TẠO ĐỀ KIỂM TRA BẰNG AI");
  const [hasApiKey, setHasApiKey] = useState(false);
  const [inputKey, setInputKey] = useState("");
  
  const dropdownRef = useRef<HTMLLIElement>(null);
  const configRef = useRef<HTMLDivElement>(null);

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
    // 1. Kiểm tra Key khi khởi tạo
    const checkKey = () => {
      const savedKey = localStorage.getItem('gemini_api_key');
      if (savedKey && savedKey.length > 10) {
        setHasApiKey(true);
      } else {
        setHasApiKey(false);
      }
    };
    checkKey();

    // 2. Click Outside logic
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (configRef.current && !configRef.current.contains(event.target as Node)) {
        setIsAiConfigOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSaveKey = () => {
    const trimmedKey = inputKey.trim();
    if (trimmedKey.startsWith("AIza")) {
      localStorage.setItem('gemini_api_key', trimmedKey);
      setHasApiKey(true);
      setInputKey("");
      setIsAiConfigOpen(false);
    } else {
      alert("API Key không hợp lệ. Key thường bắt đầu bằng 'AIza'");
    }
  };

  const handleRemoveKey = () => {
    localStorage.removeItem('gemini_api_key');
    setHasApiKey(false);
    alert("Đã xóa API Key.");
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <header className="bg-primary text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-shrink-0 cursor-pointer group" onClick={() => setActiveTab(allTabs[0])}>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-primary shadow-lg group-hover:scale-110 transition-transform text-xs mb-0.5">TQT</div>
              <span className="text-[7px] font-black text-white uppercase tracking-[0.1em] leading-none opacity-90">Tiêu Quang Thạch</span>
            </div>
          </div>

          <div className="hidden md:block flex-grow overflow-hidden relative h-7 bg-white/10 rounded-full flex items-center mx-4">
            <div className="animate-marquee whitespace-nowrap flex items-center w-full">
              <span className="text-sm font-bold text-white/95 tracking-wide uppercase italic px-4 w-full text-center">Hệ thống dạy học và kiểm tra tạo bởi AI</span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* AI CONFIG BUTTON */}
            <div className="relative" ref={configRef}>
              <button 
                onClick={() => setIsAiConfigOpen(!isAiConfigOpen)}
                className={`flex items-center gap-2 p-2 rounded-xl transition-all ${isAiConfigOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                <svg className={`w-6 h-6 transition-transform duration-500 ${isAiConfigOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {hasApiKey && <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#4ade80]"></span>}
              </button>

              {isAiConfigOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-[#f8faff] rounded-2xl shadow-2xl border border-blue-100 overflow-hidden animate-fade-in z-50">
                  <div className="p-6 space-y-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-800 rounded-lg text-white">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/></svg>
                      </div>
                      <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Cấu hình AI</h3>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Google Gemini API Key</label>
                      <div className="relative group">
                        <input 
                          type="password"
                          value={inputKey}
                          onChange={(e) => setInputKey(e.target.value)}
                          placeholder={hasApiKey ? "••••••••••••••••••••" : "Dán API Key vào đây..."}
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3.5 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 font-mono text-sm"
                        />
                        {inputKey.length > 5 && (
                          <button onClick={handleSaveKey} className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg">LƯU</button>
                        )}
                      </div>
                      <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-[11px] font-bold text-blue-500 hover:underline">Lấy API Key tại Google AI Studio</a>
                    </div>

                    {hasApiKey && (
                      <div className="pt-4 border-t flex items-center justify-between">
                         <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div> ĐÃ KẾT NỐI
                         </span>
                         <button onClick={handleRemoveKey} className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase">Xóa Key</button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="w-px h-8 bg-white/20 mx-1"></div>
            <button className="bg-secondary hover:bg-orange-600 text-white text-sm font-black px-5 py-2.5 rounded-xl transition shadow-lg uppercase tracking-wider">Đăng ký</button>
          </div>
        </div>
      </header>

      {/* MENU CHỨC NĂNG */}
      <nav className="bg-secondary nav-shadow border-b border-orange-600 relative z-40">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center items-center gap-4 md:gap-8 py-3 text-[13px] font-black text-white uppercase tracking-tight">
            {visibleTabs.map((tab) => (
              <li 
                key={tab} 
                onClick={() => handleTabClick(tab)}
                className={`${activeTab === tab ? 'text-blue-900 border-b-2 border-blue-900' : 'hover:text-blue-900'} pb-1 cursor-pointer transition whitespace-nowrap`}
              >{tab}</li>
            ))}
            <li className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20">
                <span className="text-[11px] font-black uppercase">Xem thêm</span>
                <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 overflow-hidden animate-fade-in">
                  {hiddenTabs.map((tab) => (
                    <div key={tab} className="px-6 py-3 font-bold text-[12px] text-gray-600 hover:bg-secondary hover:text-white cursor-pointer transition-colors" onClick={() => handleTabClick(tab)}>{tab}</div>
                  ))}
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* NỘI DUNG CHÍNH */}
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-4 md:p-8 min-h-[600px]">
          {activeTab === "TẠO ĐỀ KIỂM TRA BẰNG AI" && <MatrixWorkflow />}
          {activeTab === "TẠO BÀI TẬP TƯƠNG TỰ" && <SimilarExercisesWorkflow />}
          {activeTab !== "TẠO ĐỀ KIỂM TRA BẰNG AI" && activeTab !== "TẠO BÀI TẬP TƯƠNG TỰ" && (
            <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
               <p className="text-xl font-bold uppercase italic">Tính năng {activeTab} đang được phát triển</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
