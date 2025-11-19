
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SLIDES, TOTAL_SLIDES } from './constants';
import { SlideLayout } from './types';
import Navigation from './components/Navigation';
import { 
  TitleOnlyLayout, 
  BulletPointsLayout, 
  GridCardsLayout, 
  SplitImageLayout, 
  CenteredQuoteLayout,
  Diagram3DLayout,
  ProcessStepsLayout,
  InteractiveQuizLayout,
  StatsDashboardLayout,
  // New Imports
  ExpectationRealityLayout,
  IcebergModelLayout,
  WordCloudLayout,
  BalanceScaleLayout,
  ToolboxLayout,
  CaseStudyLayout,
  TimelineLayout,
  ChatBubblesLayout
} from './components/SlideLayouts';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const nextSlide = useCallback(() => {
    if (currentSlideIndex < TOTAL_SLIDES - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  }, [currentSlideIndex]);

  const prevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  }, [currentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlideData = SLIDES[currentSlideIndex];

  const renderLayout = () => {
    switch (currentSlideData.layout) {
      case SlideLayout.TITLE_ONLY: return <TitleOnlyLayout data={currentSlideData} />;
      case SlideLayout.BULLET_POINTS: return <BulletPointsLayout data={currentSlideData} />;
      case SlideLayout.GRID_CARDS: return <GridCardsLayout data={currentSlideData} />;
      case SlideLayout.SPLIT_IMAGE: return <SplitImageLayout data={currentSlideData} />;
      case SlideLayout.CENTERED_QUOTE: return <CenteredQuoteLayout data={currentSlideData} />;
      case SlideLayout.DIAGRAM_3D: return <Diagram3DLayout data={currentSlideData} />;
      case SlideLayout.PROCESS_STEPS: return <ProcessStepsLayout data={currentSlideData} />;
      case SlideLayout.INTERACTIVE_QUIZ: return <InteractiveQuizLayout data={currentSlideData} />;
      case SlideLayout.STATS_DASHBOARD: return <StatsDashboardLayout data={currentSlideData} />;
      
      // New Layouts
      case SlideLayout.EXPECTATION_REALITY: return <ExpectationRealityLayout data={currentSlideData} />;
      case SlideLayout.ICEBERG_MODEL: return <IcebergModelLayout data={currentSlideData} />;
      case SlideLayout.WORD_CLOUD: return <WordCloudLayout data={currentSlideData} />;
      case SlideLayout.BALANCE_SCALE: return <BalanceScaleLayout data={currentSlideData} />;
      case SlideLayout.TOOLBOX: return <ToolboxLayout data={currentSlideData} />;
      case SlideLayout.CASE_STUDY: return <CaseStudyLayout data={currentSlideData} />;
      case SlideLayout.TIMELINE: return <TimelineLayout data={currentSlideData} />;
      case SlideLayout.CHAT_BUBBLES: return <ChatBubblesLayout data={currentSlideData} />;
      
      default: return <TitleOnlyLayout data={currentSlideData} />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-slate-900 overflow-hidden flex flex-col">
      {/* Dark Theme Background & Animated Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Grid Floor */}
         <div className="absolute w-[200%] h-[100%] -left-1/2 bottom-0 bg-[linear-gradient(rgba(30,41,59,0)_0%,rgba(45,212,191,0.05)_100%)] transform perspective-[500px] rotate-x-60 origin-bottom"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
         
         {/* Ambient Orbs */}
         <motion.div 
            animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20 mix-blend-screen"
         />
         <motion.div 
            animate={{ x: [0, -100, 0], y: [0, 50, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[150px] opacity-20 mix-blend-screen"
         />
      </div>

      {/* Main Content Area - Increased bottom padding for Navigation, allow vertical scrolling */}
      <main className="flex-grow relative z-10 container mx-auto h-full pt-8 pb-28 overflow-y-auto scrollbar-hide">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, z: -100, scale: 0.9 }}
            animate={{ opacity: 1, z: 0, scale: 1 }}
            exit={{ opacity: 0, z: 100, scale: 1.1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            {renderLayout()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <Navigation
        currentSlide={currentSlideIndex}
        totalSlides={TOTAL_SLIDES}
        onNext={nextSlide}
        onPrev={prevSlide}
      />
    </div>
  );
};

export default App;
