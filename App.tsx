import React, { useState } from 'react';
import { SLIDES, SlideType } from './types';
import { SlideContent } from './components/SlideContent';
import { ChevronRight, ChevronLeft, Menu, X, MonitorPlay } from 'lucide-react';

const App = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentSlide = SLIDES[currentSlideIndex];

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <div 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}
      >
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-indigo-400">
            <MonitorPlay size={20} />
            <span>组会汇报</span>
          </div>
          <button className="md:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => {
                setCurrentSlideIndex(index);
                if (window.innerWidth < 768) setIsSidebarOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                index === currentSlideIndex 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <div className="font-semibold">{slide.title}</div>
              {slide.subtitle && <div className="text-xs opacity-70 mt-0.5 truncate">{slide.subtitle}</div>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
           <div className="bg-slate-800/50 p-3 rounded text-xs text-slate-500 border border-slate-700">
             <strong>项目:</strong> Rewriter 训练<br/>
             <strong>目标:</strong> Human-like Style<br/>
             <strong>模型:</strong> Llama-3-8B
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative w-full">
        
        {/* Header (Mobile toggle) */}
        <div className="md:hidden p-4 flex items-center bg-slate-900 border-b border-slate-800">
          <button onClick={() => setIsSidebarOpen(true)} className="mr-4">
            <Menu size={24} />
          </button>
          <span className="font-bold truncate">{currentSlide.title}</span>
        </div>

        {/* Slide Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-12 relative bg-gradient-to-br from-slate-950 to-slate-900">
          
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800">
            <div 
              className="h-full bg-indigo-500 transition-all duration-300" 
              style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
            ></div>
          </div>

          <div className="max-w-6xl mx-auto h-full flex flex-col">
            <header className="mb-8 border-b border-slate-800 pb-4">
              <h2 className="text-3xl font-bold text-white tracking-tight">{currentSlide.title}</h2>
              {currentSlide.subtitle && <p className="text-slate-400 mt-2 text-lg">{currentSlide.subtitle}</p>}
            </header>
            
            <div className="flex-1 min-h-0">
               <SlideContent type={currentSlide.id} />
            </div>
          </div>
        </main>

        {/* Footer Navigation */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex justify-between items-center z-10">
          <button 
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              currentSlideIndex === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <ChevronLeft size={20} /> 上一页
          </button>

          <span className="text-slate-500 font-mono text-sm">
            {currentSlideIndex + 1} / {SLIDES.length}
          </span>

          <button 
            onClick={nextSlide}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
              currentSlideIndex === SLIDES.length - 1 ? 'text-slate-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'
            }`}
          >
            下一页 <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;