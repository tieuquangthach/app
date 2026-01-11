import React, { useState, useRef, useEffect } from 'react';
// Import component Tương tự (đảm bảo bạn đã tạo file này như hướng dẫn trước)
import SimilarExercisesWorkflow from './components/SimilarExercisesWorkflow';
// Import component Ma trận (Nếu bạn đã có file này thì giữ nguyên, nếu chưa tôi có tạo placeholder ở cuối file này)
import MatrixWorkflow from './components/MatrixWorkflow'; 

const App: React.FC = () => {
  // --- STATE QUẢN LÝ GIAO DIỆN ---
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("TẠO ĐỀ KIỂM TRA BẰNG AI");
  const dropdownRef = useRef<HTMLLIElement>(null);

  // --- STATE QUẢN LÝ API KEY ---
  const [showApiModal, setShowApiModal] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('GEMINI_API_KEY') || '');
  const [tempKey, setTempKey] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Ẩn/Hiện key

  const allTabs = [
    "TẠO ĐỀ KIỂM TRA BẰNG AI", "TẠO BÀI TẬP TƯƠNG TỰ", "KIỂM TRA TRỰC TUYẾN",
    "BÀI TRÌNH CHIẾU", "HOẠT ĐỘNG KHỞI ĐỘNG", "HOẠT ĐỘNG NHÓM",
    "TRẮC NGHIỆM NHANH", "BÀI TẬP VẬN DỤNG", "INFOGRAPHIC", "SƠ ĐỒ TƯ DUY"
  ];

  const visibleTabs = allTabs.slice(0, 3);
  const hiddenTabs = allTabs.slice(3);

  // Kiểm tra Key khi khởi động
  useEffect(() => {
    const currentKey = localStorage.getItem('GEMINI_API_KEY');
    if (currentKey) {
      setApiKey(currentKey);
      setTempKey(currentKey);
    } else {
      // Nếu chưa có Key, hiện popup sau 1 giây
      const timer = setTimeout(() => setShowApiModal(true), 1000);
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
      setApiKey(tempKey.trim()); // Cập nhật state để component con nhận biết ngay
      setShowApiModal(false);
      alert("Đã lưu API Key thành công!");
    } else {
      alert("Vui lòng dán mã API Key hợp lệ!");
    }
  };

  const handleRemoveKey = () => {
    if(window.confirm("Bạn có chắc muốn xóa API Key? Các tính năng AI sẽ không hoạt động.")){
        localStorage.removeItem('GEMINI_API_KEY');
        setApiKey('');
        setTempKey('');
        window.location.reload();
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative font-sans text-gray-800">
      
      {/* --- HEADER --- */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white sticky top-0 z-50 shadow-md px-4">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
          {/* Logo / Tên */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab(allTabs[0])}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-blue-900 text-xs shadow-lg ring-2 ring-blue-300/30">TQT</div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest opacity-80 leading-tight">Giáo viên</span>
                <span className="text-sm font-bold leading-tight">Tiêu Quang Thạch</span>
            </div>
          </div>

          {/* Marquee Text (Ẩn trên mobile) */}
          <div className="hidden md:block flex-grow mx-8 h-8 bg-white/10 rounded-full flex items-center overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 via-transparent to-blue-900/50 z-10 pointer-events-none"></div>
             <span className="whitespace-nowrap px-4 text-xs font-semibold uppercase tracking-wide text-blue-100 italic animate-marquee">
               Hệ thống dạy học và kiểm tra &bull; Tạo đề tự động &bull; Phân tích ma trận kiến thức &bull; Hỗ trợ Gemini 1.5 Flash AI
             </span>
          </div>

          {/* Trạng thái API & Nút đăng ký */}
          <div className="flex items-center gap-3">
             {/* Chỉ báo trạng thái API */}
             <div 
                onClick={() => setShowApiModal(true)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer transition active:scale-95 ${apiKey ? 'bg-green-500/20 border-green-400 text-green-100' : 'bg-red-500/20 border-red-400 text-red-100 animate-pulse'}`}
                title="Bấm để cấu hình API Key"
             >
                <div className={`w-2 h-2 rounded-full ${apiKey ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-[10px] font-bold uppercase hidden sm:block">{apiKey ? 'AI Sẵn sàng' : 'Thiếu Key'}</span>
             </div>
             
             <button className="bg-orange-500 px-5 py-2 rounded-lg text-sm font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-400 transition active:scale-95">
                Nâng cấp
             </button>
          </div>
        </div>
      </header>

      {/* --- NAV MENU --- */}
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
            
            {/* Dropdown More */}
            <li className="relative ml-2" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition ${isDropdownOpen || hiddenTabs.includes(activeTab) ? 'bg-blue-50 text-blue-900 border-blue-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}
              >
                <span className="text-[10px] font-bold">{hiddenTabs.includes(activeTab) ? activeTab : 'XEM THÊM'}</span>
                <svg className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in-down">
                  {hiddenTabs.map((tab) => (
                    <div 
                      key={tab} 
                      onClick={() => handleTabClick(tab)} 
                      className={`px-5 py-3 font-bold text-[11px] cursor-pointer ${activeTab === tab ? 'bg-blue-50 text-blue-900' : 'text-gray-600 hover:bg-gray-50'}`}
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

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow py-6 px-4 md:px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-[2rem] shadow-xl min-h-[600px] p-6 md:p-8 border border-gray-100 relative">
          {/* Render component dựa trên Tab đang chọn */}
          {activeTab === "TẠO ĐỀ KIỂM TRA BẰNG AI" && <MatrixWorkflow />}
          {activeTab === "TẠO BÀI TẬP TƯƠNG TỰ" && <SimilarExercisesWorkflow />}
          
          {/* Placeholder cho các tab chưa phát triển */}
          {!["TẠO ĐỀ KIỂM TRA BẰNG AI", "TẠO BÀI TẬP TƯƠNG TỰ"].includes(activeTab) && (
             <div className="flex flex-col items-center justify-center h-[500px] text-gray-300">
                <svg className="w-20 h-20 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <p className="font-bold text-lg uppercase">Tính năng "{activeTab}" đang phát triển</p>
             </div>
          )}
        </div>
      </main>

      {/* --- MODAL CẤU HÌNH API KEY --- */}
      {showApiModal && (
        <div className="fixed inset-0 bg-blue-900/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 transition-all">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden animate-bounce-in">
            {/* Trang trí Modal */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-purple-500 to-orange-500"></div>
            <button onClick={() => setShowApiModal(false)} className="absolute top-4 right-4 text-gray-300 hover:text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                </div>
                <h3 className="text-2xl font-black text-gray-800 uppercase">Cấu hình API Key</h3>
                <p className="text-gray-500 text-sm mt-2">Dán mã Gemini API Key của bạn vào bên dưới để kích hoạt các tính năng AI.</p>
            </div>

            {/* Input API Key */}
            <div className="relative mb-6">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={tempKey} 
                  onChange={(e) => setTempKey(e.target.value)} 
                  placeholder="sk-..." 
                  className="w-full pl-5 pr-12 py-4 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none font-mono text-sm bg-gray-50 text-gray-700" 
                />
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
                >
                   {showPassword ? (
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                   ) : (
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                   )}
                </button>
            </div>

            <div className="flex gap-3">
               {apiKey && (
                  <button onClick={handleRemoveKey} className="px-4 py-3 bg-red-50 text-red-500 font-bold rounded-xl text-xs hover:bg-red-100 transition">XÓA</button>
               )}
              <button onClick={handleSaveKey} className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition active:scale-95 text-xs tracking-widest uppercase">
                {apiKey ? 'Cập nhật Key' : 'Lưu & Kích hoạt'}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-dashed border-gray-200 text-center">
               <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-400 hover:text-blue-600 transition">
                  <span>CHƯA CÓ KEY? LẤY MIỄN PHÍ TẠI ĐÂY</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
               </a>
            </div>
          </div>
        </div>
      )}

      {/* --- NÚT NỔI MỞ MODAL --- */}
      <button 
        onClick={() => setShowApiModal(true)} 
        className="fixed bottom-6 right-6 bg-white text-blue-900 p-4 rounded-full shadow-2xl z-40 hover:scale-110 active:scale-90 transition-all border border-gray-100 group"
        title="Cấu hình API Key"
      >
        <span className="absolute right-0 top-0 -mt-1 -mr-1 flex h-3 w-3">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${apiKey ? 'bg-green-400' : 'bg-red-400'}`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${apiKey ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </span>
        <svg className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      </button>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 text-center text-gray-400 text-xs font-semibold uppercase tracking-wider">
        © 2026 Hệ thống dạy học và kiểm tra tạo bởi AI &bull; Version 2.0
      </footer>
    </div>
  );
};

export default App;
