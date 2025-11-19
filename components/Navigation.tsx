import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
  onPrev: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSlide, totalSlides, onNext, onPrev }) => {
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center z-50 pointer-events-none">
      <div className="pointer-events-auto flex flex-col items-center w-full max-w-2xl glass-panel rounded-2xl p-4 border border-slate-700/50 shadow-2xl mb-4">
        {/* Controls */}
        <div className="flex items-center justify-between w-full px-8 mb-4">
          <button 
            onClick={onPrev} 
            disabled={currentSlide === 0}
            className="p-3 rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all transform active:scale-95 border border-slate-700"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="flex flex-col items-center">
            <span className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-1">الشريحة</span>
            <span className="text-slate-200 font-mono text-xl font-bold">
              <span className="text-primary">{currentSlide + 1}</span> <span className="text-slate-600 mx-2">/</span> {totalSlides}
            </span>
          </div>
          
          <button 
            onClick={onNext} 
            disabled={currentSlide === totalSlides - 1}
            className="p-3 rounded-xl bg-primary text-slate-900 hover:bg-teal-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-[0_0_15px_rgba(45,212,191,0.4)]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out shadow-[0_0_10px_rgba(45,212,191,0.8)]"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;