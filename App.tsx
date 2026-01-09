
import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import Layout from './components/Layout';
import { aminpurData } from './data/aminpur_content';
import { ContentSection } from './types';

const App: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<ContentSection | null>(null);
  const [showAuthor, setShowAuthor] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const sections = Object.values(aminpurData).filter(val => 'id' in (val as any)) as ContentSection[];
  const author = aminpurData.author;
  
  const filteredSections = sections.filter(section => 
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.summary?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigation = (view: 'home' | 'author') => {
    if (view === 'home') {
      setShowAuthor(false);
      setSelectedSection(null);
    } else if (view === 'author') {
      setShowAuthor(true);
      setSelectedSection(null);
    }
  };

  // Dynamic Icon Component
  const Icon = ({ name, className, size = 24 }: { name: string; className?: string; size?: number }) => {
    const LucideIcon = (Icons as any)[name];
    return LucideIcon ? <LucideIcon className={className} size={size} /> : null;
  };

  const renderAuthorPage = () => (
    <div className="p-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center mb-8 pt-4">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl">
          <Icons.User size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{author.name}</h2>
        <p className="text-emerald-600 font-medium">{author.role}</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
          <Icons.UserCheck className="mr-2 text-emerald-600" size={20} />
          আমার সম্পর্কে
        </h3>
        <div className="bengali-text text-gray-700 leading-relaxed text-base">
          {author.bio}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {author.links.map((link, idx) => (
          <a 
            key={idx}
            href={link.url}
            className="flex items-center p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors group border border-transparent hover:border-emerald-100"
          >
            <div className="p-2 bg-white rounded-xl text-gray-400 group-hover:text-emerald-600 mr-3 shadow-sm transition-colors border border-gray-100">
              <Icon name={link.icon} size={20} />
            </div>
            <span className="text-gray-700 font-medium group-hover:text-emerald-700 transition-colors">{link.label}</span>
          </a>
        ))}
      </div>

      <button 
        onClick={() => handleNavigation('home')}
        className="mt-8 w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 active:scale-95 transition-all flex items-center justify-center"
      >
        <Icons.Home className="mr-2" size={18} />
        মূল পাতায় ফিরে যান
      </button>
    </div>
  );

  return (
    <Layout title="আমিনপুর থানা" onNavigate={handleNavigation}>
      {showAuthor ? (
        renderAuthorPage()
      ) : selectedSection ? (
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

          <div className="mt-12 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
            <h3 className="font-bold text-emerald-800 mb-2 text-sm uppercase tracking-wider">তথ্যসূত্র ও নোট</h3>
            <p className="text-xs text-emerald-700 leading-relaxed">
              এই অ্যাপে ব্যবহৃত তথ্যসমূহ স্থানীয় ইতিহাস এবং নির্ভরযোগ্য উৎস থেকে সংগ্রহ করে পরিমার্জন করা হয়েছে। এটি সম্পূর্ণ একটি অফলাইন গাইড।
            </p>
          </div>
        </div>
      ) : (
        <div className="p-4 space-y-4 pt-6">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="যেকোনো তথ্য এখানে খুঁজুন..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-sm shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setSelectedSection(section)}
                className="flex items-start p-4 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md hover:border-emerald-100 transition-all text-left active:scale-[0.98] group"
              >
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl mr-4 shrink-0 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon name={section.icon} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{section.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{section.summary}</p>
                </div>
                <Icons.ChevronRight className="text-gray-300 self-center group-hover:text-emerald-500 transition-colors" size={20} />
              </button>
            ))}
            
            {filteredSections.length === 0 && (
              <div className="text-center py-20">
                <Icons.FileSearch className="mx-auto text-gray-200 mb-4" size={64} />
                <p className="text-gray-400 italic">দুঃখিত, কোনো তথ্য খুঁজে পাওয়া যায়নি!</p>
              </div>
            )}
          </div>

          {/* Banner Card */}
          <div className="mt-8 p-8 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2.5rem] text-white shadow-2xl overflow-hidden relative group">
            <Icons.Waves className="absolute -right-6 -top-6 text-white/10 w-40 h-40" />
            <Icons.MapPin className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10">
              <h4 className="text-xl font-black mb-3 tracking-wide">আমিনপুর ডিজিটাল তথ্যকোষ</h4>
              <p className="text-sm text-emerald-50/90 mb-6 leading-relaxed max-w-[85%]">
                পাবনার অন্যতম গৌরবময় জনপদ আমিনপুর সম্পর্কে বিস্তারিত ও নির্ভুল তথ্যের সমাহার।
              </p>
              <div className="flex flex-wrap gap-2">
                 <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">ইতিহাস</span>
                 <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">প্রশাসন</span>
                 <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">সংস্কৃতি</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
