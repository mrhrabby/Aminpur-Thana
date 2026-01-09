
import React, { useState } from 'react';
import { Menu, X, Home, User, Hash, ChevronRight, MapPin } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  onNavigate: (view: 'home' | 'author') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, title, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = (view: 'home' | 'author') => {
    onNavigate(view);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-white shadow-xl relative overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-emerald-600 text-white p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleMenuClick('home')}>
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">{title}</h1>
            <p className="text-[10px] text-emerald-100 opacity-90 uppercase tracking-widest font-semibold">পাবনা জেলা</p>
          </div>
        </div>

        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-emerald-700 rounded-full transition-colors active:scale-95"
          aria-label="Open Sidebar"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Drawer) */}
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="bg-emerald-600 p-6 text-white relative">
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-emerald-500 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
            <div className="mt-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3">
                <MapPin size={24} />
              </div>
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="text-xs text-emerald-100">ডিজিটাল তথ্যকোষ</p>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 py-4">
            <div className="px-4 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">মেনু</div>
            <button 
              onClick={() => handleMenuClick('home')}
              className="w-full flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-emerald-50 transition-colors group"
            >
              <div className="flex items-center">
                <Home className="mr-4 text-emerald-600" size={20} />
                <span className="font-medium">হোম স্ক্রিন</span>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-emerald-500" size={16} />
            </button>
            <button 
              onClick={() => handleMenuClick('author')}
              className="w-full flex items-center justify-between px-6 py-4 text-gray-700 hover:bg-emerald-50 transition-colors group"
            >
              <div className="flex items-center">
                <User className="mr-4 text-emerald-600" size={20} />
                <span className="font-medium">লেখক পরিচিতি (About Author)</span>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-emerald-500" size={16} />
            </button>

            <div className="h-px bg-gray-100 my-2 mx-6"></div>
            
            <div className="px-4 mt-4 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">অ্যাপ তথ্য</div>
            <div className="px-6 py-4 flex items-center text-gray-600">
              <Hash className="mr-4 text-emerald-600" size={20} />
              <div>
                <p className="font-medium text-sm">ভার্সন (Apps Version)</p>
                <p className="text-xs text-gray-400">১.০.০ (স্টেবল)</p>
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t bg-gray-50 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">ডেভেলপ করেছেন</p>
            <p className="text-sm font-bold text-emerald-700">মীর রাব্বি হোসেন</p>
          </div>
        </div>
      </div>
      
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      <footer className="p-4 text-center text-gray-400 text-[10px] border-t bg-gray-50 flex justify-between items-center">
        <span>&copy; ২০২৪ আমিনপুর থানা</span>
        <span className="font-medium text-emerald-600/50">মীর রাব্বি হোসেন</span>
      </footer>
    </div>
  );
};

export default Layout;
