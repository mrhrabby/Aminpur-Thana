
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex flex-col max-w-2xl mx-auto bg-white shadow-xl">
      <header className="sticky top-0 z-50 bg-emerald-600 text-white p-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="text-xs text-emerald-100 opacity-90">পাবনা জেলা, বাংলাদেশ</p>
          </div>
        </div>
      </header>
      <main className="flex-1 pb-20">
        {children}
      </main>
      <footer className="p-4 text-center text-gray-400 text-xs border-t bg-gray-50">
        &copy; ২০২৪ আমিনপুর তথ্যকোষ | সকল তথ্য সংরক্ষিত
      </footer>
    </div>
  );
};

export default Layout;
