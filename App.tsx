
import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import Layout from './components/Layout';
import { aminpurData } from './data/aminpur_content';
import { ContentSection } from './types';

const App: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<ContentSection | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const sections = Object.values(aminpurData);
  
  const filteredSections = sections.filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.summary?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dynamic Icon Component
  const Icon = ({ name, className }: { name: string; className?: string }) => {
    const LucideIcon = (Icons as any)[name];
    return LucideIcon ? <LucideIcon className={className} size={24} /> : null;
  };

  return (
    <Layout title="আমিনপুর তথ্যকোষ">
      {selectedSection ? (
        <div className="p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button 
            onClick={() => setSelectedSection(null)}
            className="mb-6 flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            <Icons.ArrowLeft className="mr-2" size={20} />
            পিছনে যান
          </button>
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
              <Icon name={selectedSection.icon} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{selectedSection.title}</h2>
          </div>

          <div className="space-y-4 bengali-text text-gray-700 text-lg">
            {Array.isArray(selectedSection.content) ? (
              selectedSection.content.map((para, idx) => (
                <p key={idx} className="leading-relaxed">
                  {para}
                </p>
              ))
            ) : (
              <p>{selectedSection.content}</p>
            )}
          </div>

          <div className="mt-12 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <h3 className="font-semibold text-emerald-800 mb-2">বিশেষ দ্রষ্টব্য:</h3>
            <p className="text-sm text-emerald-700">এই অ্যাপটি অফলাইন মুডে ব্যবহারের জন্য অপ্টিমাইজড। সকল তথ্য স্থানীয় ও নির্ভরযোগ্য উৎস থেকে সংগ্রহ করা হয়েছে।</p>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-4">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="যেকোনো তথ্য খুঁজুন..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section)}
                className="flex items-start p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-emerald-100 transition-all text-left active:scale-[0.98]"
              >
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl mr-4 shrink-0">
                  <Icon name={section.icon} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{section.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{section.summary}</p>
                </div>
                <Icons.ChevronRight className="text-gray-300 self-center" size={20} />
              </button>
            ))}
            
            {filteredSections.length === 0 && (
              <div className="text-center py-20">
                <Icons.FileSearch className="mx-auto text-gray-300 mb-4" size={48} />
                <p className="text-gray-500 italic">দুঃখিত, কোনো ফলাফল পাওয়া যায়নি।</p>
              </div>
            )}
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl text-white shadow-lg overflow-hidden relative">
            <Icons.MapPin className="absolute -right-4 -bottom-4 text-white/10" size={120} />
            <h4 className="text-lg font-bold mb-2">আমিনপুর থানা</h4>
            <p className="text-sm text-emerald-50 opacity-90 mb-4">
              আপনার এলাকা সম্পর্কে জানুন এবং স্থানীয় ইতিহাসকে বুকে ধারণ করুন। এটি একটি সম্পূর্ণ অফলাইন গাইড।
            </p>
            <div className="flex space-x-2">
               <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-medium uppercase tracking-wider">History</span>
               <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-medium uppercase tracking-wider">Geography</span>
               <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-medium uppercase tracking-wider">Culture</span>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
