import React, { useState, useRef, useEffect } from 'react';
import MatrixWorkflow from './components/MatrixWorkflow';
import SimilarExercisesWorkflow from './components/SimilarExercisesWorkflow';

const App: React.FC = () => {
  // --- QUẢN LÝ TRẠNG THÁI GIAO DIỆN ---
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

  // Tự động nhắc nhở nhập Key sau 1.5 giây nếu chưa có dữ liệu
  useEffect(() => {
    const savedKey = localStorage.getItem('GEMINI_API_KEY');
    if (!savedKey) {
      const timer = setTimeout(() => setShowApiModal(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Đóng dropdown khi nhấn ra ngoài vùng menu
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
      window.location.reload(); // Làm mới trang để các dịch vụ nhận Key mới
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* HEADER: THANH ĐIỀU HƯỚNG CHÍNH */}
      <header className="bg-primary text-white sticky top-0 z-50 shadow-md px-4">
        <div className="max-w-7xl mx-auto h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab(allTabs[0])}>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-primary text-xs shadow-lg group-hover:scale-110 transition-transform">TQT</div>
            <span className="text-[8px] font-black uppercase tracking-widest leading-tight opacity-90">Tiêu Quang Thạch</span>
          </div>
          <div className="hidden md:block flex-grow h-7 bg-white/10 rounded-full flex items-center overflow-hidden">
            <div className="animate-marquee whitespace-nowrap w-full text-center text-sm font-bold uppercase italic px-4">
              Hệ thống dạy học và kiểm tra tạo bởi AI
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-secondary px-5 py-2 rounded-lg text-sm font-bold shadow-sm hover:brightness-110 transition shadow-primary/20">Đăng ký</button>
          </div>
        </div>
      </header>

      {/* SUB-NAV: MENU CHỨC NĂNG */}
      <nav className="bg-secondary border-b border-orange-600 relative z-40 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center items-center gap-6 py-3 text-[13px] font-black uppercase tracking-tight">
            {visibleTabs.map((tab) => (
              <li 
                key={tab} 
                onClick={() => handleTabClick(tab)} 
                className={`${activeTab === tab ? 'text-blue-900 border-b-2 border-blue-900' : 'hover:text-blue-900'} cursor-pointer transition pb-1 whitespace-nowrap`}
              >
                {tab}
              </li>
            ))}
            <li className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition"
              >
                <span className="text-[11px] font-black">{hiddenTabs.includes(activeTab) ? activeTab : 'XEM THÊM'}</span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border py-3 z-50 overflow-hidden animate-fade-in">
                  {hiddenTabs.map((tab) => (
                    <div 
                      key={tab} 
                      onClick={() => handleTabClick(tab)} 
                      className={`px-6 py-3 font-bold text-[12px] border-b border-gray-50 last:border-0 ${activeTab === tab ? 'bg-secondary text-white' : 'text-gray-600 hover:bg-secondary hover:text-white transition-colors'}`}
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

      {/* NỘI DUNG CHÍNH CỦA TỪNG TAB */}
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] shadow-2xl min-h-[600px] overflow-hidden p-6 md:p-10 border border-gray-50">
          {activeTab === "TẠO ĐỀ KIỂM TRA BẰNG AI" ? (
            <MatrixWorkflow />
          ) : activeTab === "TẠO BÀI TẬP TƯƠNG TỰ" ? (
            <SimilarExercisesWorkflow />
          ) : (
            <div className="flex flex-col items-center justify-center h-[500px] text-gray-400 text-center animate-fade-in">
               <svg className="w-20 h-20 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
               </svg>
               <p className="text-xl font-bold uppercase tracking-widest italic">Tính năng {activeTab} đang được phát triển</p>
               <button 
                 onClick={() => setActiveTab(allTabs[0])} 
                 className="mt-6 px-8 py-2.5 bg-primary text-white font-black rounded-xl hover:brightness-110 transition shadow-xl shadow-primary/20 uppercase text-xs tracking-wider"
               >
                 Quay lại trang chủ
               </button>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-4">
          <p className="text-gray-400 text-sm font-medium">© 2026 Hệ thống dạy học và kiểm tra tạo bởi AI.</p>
          <p className="text-[10px] text-gray-300 uppercase font-black tracking-widest">Sáng tạo bởi Tiêu Quang Thạch</p>
        </div>
      </footer>

      {/* MODAL CẤU HÌNH API KEY: GIẢI QUYẾT LỖI THIẾU KEY */}
      {showApiModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>
            <h3 className="text-2xl font-black text-primary mb-2 italic uppercase tracking-tight">Cấu hình Gemini API</h3>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium">Vui lòng nhập mã API Key của bạn để bắt đầu sử dụng các tính năng trí tuệ nhân tạo.</p>
            
            <input 
              type="password" 
              value={tempKey} 
              onChange={(e) => setTempKey(e.target.value)} 
              placeholder="Dán mã API Key tại đây..." 
              className="w-full px-6 py-4 rounded-2xl border-2 border-gray-100 focus:border-primary outline-none mb-6 font-mono text-sm bg-gray-50 focus:bg-white transition-all shadow-inner" 
            />
            
            <div className="flex gap-4">
              <button 
                onClick={() => setShowApiModal(false)} 
                className="flex-1 py-4 font-black text-gray-400 hover:text-gray-600 transition uppercase text-xs tracking-widest"
              >
                Bỏ qua
              </button>
              <button 
                onClick={handleSaveKey} 
                className="flex-1 py-4 bg-primary text-white font-black rounded-2xl shadow-xl hover:brightness-110 transition transform active:scale-95 uppercase text-xs tracking-widest shadow-primary/20"
              >
                Lưu & Kích hoạt
              </button>
            </div>
            
            <p className="mt-8 text-center text-[11px] font-bold text-gray-300 tracking-tighter uppercase">
              Lấy mã miễn phí tại <a href="https://aistudio.google.com/app/apikey" target="_blank" className="text-secondary underline hover:text-orange-600 transition">Google AI Studio →</a>
            </p>
          </div>
        </div>
      )}

      {/* NÚT CÀI ĐẶT GÓC DƯỚI DÙNG ĐỂ MỞ LẠI MODAL NHẬP KEY */}
      <button 
        onClick={() => setShowApiModal(true)} 
        className="fixed bottom-8 right-8 bg-primary text-white p-5 rounded-full shadow-2xl z-50 hover:scale-110 active:scale-90 transition-all border-4 border-white shadow-primary/40 group"
        title="Cấu hình API Key"
      >
        <svg className="w-6 h-6 group-hover:rotate-45 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      </button>
    </div>
  );
};

export default App;
