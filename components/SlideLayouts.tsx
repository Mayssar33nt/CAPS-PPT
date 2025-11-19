
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion';
import { SlideData, SlideItem } from '../types';
import { 
  CheckCircle2, ArrowLeft, XCircle, HelpCircle, BarChart3, 
  RotateCw, Scale, MessageCircle, User, MousePointerClick,
  Cloud as CloudIcon, Search, FileText, Building2, FolderOpen
} from 'lucide-react';

interface LayoutProps {
  data: SlideData;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const cardVariants3D = {
  hidden: { 
    opacity: 0, 
    rotateX: 45, 
    y: 50, 
    z: -100 
  },
  visible: { 
    opacity: 1, 
    rotateX: 0, 
    y: 0, 
    z: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20 
    } 
  }
};

// --- Helper Components ---

const MovingParticle = ({ x1, y1, x2, y2 }: { x1: number, y1: number, x2: number, y2: number }) => {
    return (
        <motion.circle
            r="3"
            fill="#facc15"
            initial={{ cx: `${x1}%`, cy: `${y1}%`, opacity: 0 }}
            animate={{ 
                cx: [`${x1}%`, `${x2}%`], 
                cy: [`${y1}%`, `${y2}%`],
                opacity: [0, 1, 0]
            }}
            transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                repeatDelay: 0.2
            }}
        />
    );
};

const AnimatedCounter = ({ value, suffix }: { value: number, suffix?: string }) => {
  const spring = useSpring(0, { duration: 3000, bounce: 0 });
  const display = useTransform(spring, (current) => Math.round(current));

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <div className="flex items-baseline justify-center">
      <motion.span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 font-mono">
        {display}
      </motion.span>
      {suffix && <span className="text-2xl md:text-3xl font-bold text-primary ml-1">{suffix}</span>}
    </div>
  );
};

const CloudItem = ({ text, size, delay, x, y, cloudColor, textColor }: any) => {
    const scaleBase = size === 'xl' ? 2 : size === 'lg' ? 1.6 : size === 'md' ? 1.3 : 1;
    
    // Dynamic font size for longer text (e.g., "الإدمان الرقمي")
    const isLongText = text.length > 10;
    const fontSizeClass = isLongText ? "text-[0.5rem] md:text-[0.65rem]" : "text-xs md:text-sm";

    return (
        <motion.div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 hover:z-50"
            style={{ top: y, left: x }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
                opacity: 1, 
                scale: scaleBase,
                y: [0, -15, 5, 0],
                x: [0, 10, -5, 0]
            }}
            transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
                y: { duration: 5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: delay },
                x: { duration: 7 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: delay + 1 }
            }}
            whileHover={{ scale: scaleBase * 1.1, rotate: [0, -5, 5, 0], transition: { duration: 0.3 } }}
        >
            <div className="relative flex items-center justify-center w-32 h-20 md:w-40 md:h-24">
                 <CloudIcon 
                    className={`absolute inset-0 w-full h-full ${cloudColor} drop-shadow-2xl filter`} 
                    fill="currentColor" 
                    strokeWidth={0} 
                 />
                 <span className={`relative z-10 font-black ${textColor} text-center ${fontSizeClass} leading-none pt-3 px-2 drop-shadow-sm`}>
                    {text}
                 </span>
            </div>
        </motion.div>
    );
};

// --- Layouts ---

export const TitleOnlyLayout: React.FC<LayoutProps> = ({ data }) => (
  <div className="flex flex-col items-center justify-center min-h-full text-center space-y-6 p-8 preserve-3d pt-10 relative z-10">
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotateZ: -10 }}
      animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="relative z-10 max-w-5xl mx-auto"
    >
      <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
      <h1 className={`relative text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-6 drop-shadow-2xl ${data.themeColor.replace('text-', 'shadow-')}/50 text-glow leading-tight py-6`}>
        {data.title}
      </h1>
    </motion.div>
    
    {data.content[0]?.id === 'author' && (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-panel px-8 py-4 rounded-xl border border-primary/30 shadow-lg shadow-primary/10 mt-4 backdrop-blur-xl bg-slate-900/80"
      >
        <p className="text-lg text-slate-300 mb-1">{data.content[0].text}</p>
        <p className="text-2xl font-bold text-primary">{data.content[0].subtext}</p>
      </motion.div>
    )}

    {data.subtitle && !data.content.find(c => c.id === 'author') && (
      <motion.p 
        initial={{ z: -50, opacity: 0 }}
        animate={{ z: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xl md:text-2xl text-slate-300 font-light max-w-4xl leading-relaxed px-4"
      >
        {data.subtitle}
      </motion.p>
    )}
  </div>
);

export const Diagram3DLayout: React.FC<LayoutProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const centerNode = data.content.find(item => item.id === 'specialist');
  const otherNodes = data.content.filter(item => item.id !== 'specialist');

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col h-full relative px-4 pt-4 items-center justify-start overflow-y-auto scrollbar-hide">
        <div className="text-center z-20 mb-4 shrink-0 max-w-4xl pointer-events-none mt-4">
             <h2 className={`text-3xl md:text-4xl font-bold ${data.themeColor} mb-2 text-glow leading-relaxed py-2`}>{data.title}</h2>
             <motion.p 
               animate={{ opacity: expanded ? 0 : 1 }}
               className="text-lg text-slate-400 leading-normal transition-opacity duration-500"
             >
               {data.subtitle}
             </motion.p>
        </div>

        <div className="relative w-full min-h-[600px] max-w-5xl mx-auto perspective-1000 flex items-center justify-center pb-12">
            <div className="relative w-full h-full">
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                    <defs>
                        <linearGradient id="lineGradientDynamic" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="#facc15" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                    
                    <AnimatePresence>
                    {expanded && centerNode && otherNodes.map(target => {
                        if (!centerNode.position || !target.position) return null;
                        return (
                            <g key={`conn-${target.id}`}>
                                <motion.line
                                    x1={`${centerNode.position.x}%`}
                                    y1={`${centerNode.position.y}%`}
                                    x2={`${target.position.x}%`}
                                    y2={`${target.position.y}%`}
                                    stroke="url(#lineGradientDynamic)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray="0"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.6 }}
                                    exit={{ pathLength: 0, opacity: 0 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                                <MovingParticle 
                                    x1={centerNode.position.x} 
                                    y1={centerNode.position.y} 
                                    x2={target.position.x} 
                                    y2={target.position.y} 
                                />
                                <MovingParticle 
                                    x1={target.position.x} 
                                    y1={target.position.y} 
                                    x2={centerNode.position.x} 
                                    y2={centerNode.position.y} 
                                />
                            </g>
                        );
                    })}
                    </AnimatePresence>
                </svg>

                {centerNode && (
                    <motion.div
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer"
                        style={{ left: `${centerNode.position?.x}%`, top: `${centerNode.position?.y}%` }}
                        onClick={toggleExpand}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="relative flex flex-col items-center justify-center">
                            <div className={`absolute inset-0 bg-primary/30 rounded-full ${expanded ? 'animate-ping' : 'animate-pulse'} duration-1000`}></div>
                            <div className="absolute -inset-4 border-2 border-dashed border-primary/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className={`absolute -inset-12 border border-primary/10 rounded-full transition-all duration-700 ${expanded ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}></div>
                            
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-primary shadow-[0_0_50px_rgba(45,212,191,0.4)] flex flex-col items-center justify-center z-10 backdrop-blur-xl px-4 text-center">
                                <div className="mb-2 text-primary transform scale-110">{centerNode.icon}</div>
                                <h3 className="font-bold text-white text-sm md:text-base leading-tight">{centerNode.text}</h3>
                                {!expanded && <span className="text-[10px] text-primary/70 mt-1 animate-bounce">اضغط هنا</span>}
                            </div>
                        </div>
                    </motion.div>
                )}

                {otherNodes.map((item, idx) => {
                    return (
                        <motion.div
                            key={item.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-40"
                            initial={{ left: '50%', top: '50%', scale: 0, opacity: 0 }}
                            animate={{ 
                                left: expanded ? `${item.position?.x}%` : '50%', 
                                top: expanded ? `${item.position?.y}%` : '50%',
                                scale: expanded ? 1 : 0,
                                opacity: expanded ? 1 : 0
                            }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 60, 
                                damping: 12, 
                                delay: expanded ? idx * 0.1 : 0 
                            }}
                        >
                            <motion.div 
                                animate={expanded ? { 
                                    y: [0, -10, 0],
                                    transition: { duration: 4, repeat: Infinity, repeatType: "reverse", delay: idx * 0.5 }
                                } : {}}
                                className="relative flex flex-col items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-slate-800/90 backdrop-blur-md border border-slate-600 hover:border-yellow-400 hover:bg-slate-700 transition-colors shadow-xl p-2 text-center"
                            >
                                <div className="mb-1 text-yellow-400 scale-90">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-slate-200 text-xs md:text-sm leading-tight mb-1 w-full truncate">
                                    {item.text}
                                </h3>
                                <span className="text-[9px] text-slate-400 leading-tight w-full overflow-hidden line-clamp-2">
                                    {item.subtext}
                                </span>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};

export const BulletPointsLayout: React.FC<LayoutProps> = ({ data }) => (
  <div className="flex flex-col h-full justify-center px-6 md:px-20 py-8">
    <div className="mb-6 md:mb-10 border-r-8 border-primary pr-6 md:pr-8 preserve-3d shrink-0 mt-8">
      <motion.h2 
        initial={{ x: 50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }} 
        className={`text-3xl md:text-4xl font-black ${data.themeColor} text-glow mb-3 leading-snug py-2`}
      >
        {data.title}
      </motion.h2>
      <motion.p 
        initial={{ x: 50, opacity: 0 }} 
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-lg md:text-xl text-slate-400 leading-relaxed"
      >
        {data.subtitle}
      </motion.p>
    </div>
    
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 md:gap-5 perspective-1000 pb-4"
    >
      {data.content.map((item, i) => (
        <motion.div 
          key={item.id}
          variants={cardVariants3D}
          whileHover={{ scale: 1.01, translateX: -5 }}
          className="flex items-start p-4 md:p-5 glass-panel rounded-2xl border-l-4 md:border-l-8 border-l-primary hover:bg-slate-800/80 transition-all cursor-default group"
        >
          <div className="p-3 bg-slate-900/80 rounded-xl ml-4 md:ml-5 shrink-0 shadow-inner ring-1 ring-slate-700 group-hover:ring-primary/50 transition-all mt-1">
            {item.icon || <CheckCircle2 className="text-primary w-6 h-6 md:w-8 md:h-8" />}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{item.text}</h3>
            {item.subtext && <p className="text-base md:text-lg text-slate-400 leading-relaxed">{item.subtext}</p>}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

export const GridCardsLayout: React.FC<LayoutProps> = ({ data }) => (
  <div className="flex flex-col h-full justify-center px-4 md:px-16 py-8">
    <div className="text-center mb-8 md:mb-10 perspective-1000 shrink-0 mt-4">
       <motion.div
         initial={{ rotateX: 90, opacity: 0 }}
         animate={{ rotateX: 0, opacity: 1 }}
         transition={{ type: "spring" }}
       >
           <h2 className={`text-3xl md:text-4xl font-bold ${data.themeColor} inline-block border-b-4 border-slate-700/50 pb-4 px-8 text-glow leading-relaxed py-2`}>
             {data.title}
           </h2>
           <p className="text-lg md:text-xl text-slate-400 mt-4 max-w-4xl mx-auto leading-relaxed">{data.subtitle}</p>
       </motion.div>
    </div>

    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 perspective-1000 pb-4"
    >
      {data.content.map((item, idx) => (
        <motion.div 
          key={item.id}
          variants={cardVariants3D}
          whileHover={{ y: -10, rotateX: 5, scale: 1.02 }}
          className={`relative flex flex-col items-center text-center p-5 md:p-6 rounded-[1.5rem] glass-panel border border-slate-700/50 overflow-hidden group transition-all duration-300 hover:shadow-xl h-full`}
        >
          <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-${idx === 0 ? 'emerald' : idx === 1 ? 'blue' : 'purple'}-500 to-transparent opacity-70 group-hover:opacity-100 transition-opacity`}></div>
          
          <div className="mb-4 p-4 bg-slate-900 rounded-2xl shadow-[0_0_25px_rgba(0,0,0,0.3)] ring-1 ring-slate-700 group-hover:ring-primary/50 transition-all">
            <div className="scale-110 transform group-hover:scale-105 transition-transform">
                {item.icon}
            </div>
          </div>
          <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2 group-hover:text-primary transition-colors leading-tight">{item.text}</h3>
          <p className="text-sm md:text-base text-slate-400 leading-loose">{item.subtext}</p>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

export const ProcessStepsLayout: React.FC<LayoutProps> = ({ data }) => (
    <div className="flex flex-col h-full justify-center px-4 md:px-12 py-8">
      <div className="text-center mb-8 shrink-0 mt-6">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-3xl md:text-4xl font-bold ${data.themeColor} mb-3 text-glow py-2`}
        >
          {data.title}
        </motion.h2>
        <p className="text-lg md:text-xl text-slate-400">{data.subtitle}</p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row items-start md:items-center justify-center gap-4 w-full pb-4"
      >
        {data.content.map((item, index) => (
          <React.Fragment key={item.id}>
            <motion.div 
              variants={cardVariants3D}
              className="relative group flex-1 w-full md:w-auto min-w-[150px]"
            >
               <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-500"></div>
               <div className="relative p-5 bg-slate-900 rounded-2xl border border-slate-700 h-full flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center mb-3 border border-slate-600 text-primary font-bold text-lg shadow-lg">
                    {index + 1}
                  </div>
                  <div className="mb-3 text-primary/80 scale-90">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.text}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.subtext}</p>
               </div>
            </motion.div>

            {index < data.content.length - 1 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + (index * 0.2) }}
                className="hidden md:flex items-center justify-center text-slate-600 shrink-0 rotate-180" // Rotated for RTL
              >
                <ArrowLeft className="w-6 h-6 animate-pulse" />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
);

export const SplitImageLayout: React.FC<LayoutProps> = ({ data }) => (
  <div className="flex flex-col md:flex-row h-full items-center justify-between px-6 md:px-20 gap-8 md:gap-16 py-8 md:py-10 overflow-hidden">
    <div className="flex-1 space-y-6 md:space-y-8 z-10 max-w-2xl w-full overflow-y-auto max-h-full pr-2 pl-2 scrollbar-hide text-right">
      <div className="shrink-0">
        <motion.h2 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`text-3xl md:text-5xl font-black ${data.themeColor} mb-4 text-glow leading-tight py-2`}
        >
          {data.title}
        </motion.h2>
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed">{data.subtitle}</p>
      </div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-5"
      >
        {data.content.map((item) => (
          <motion.div 
            key={item.id} 
            variants={cardVariants3D}
            className="flex items-center gap-5 p-4 rounded-2xl hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-700/80 group"
          >
             <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center shadow-xl border border-slate-700 group-hover:scale-110 transition-transform duration-300 shrink-0">
               <div className="text-slate-200 group-hover:text-primary transition-colors scale-90">
                 {item.icon}
               </div>
             </div>
             <div>
               <h4 className="font-bold text-xl text-slate-100 mb-1">{item.text}</h4>
               <p className="text-base text-slate-500 leading-relaxed group-hover:text-slate-400">{item.subtext}</p>
             </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
    
    <motion.div 
      initial={{ scale: 0.8, rotateY: -30, opacity: 0 }}
      animate={{ scale: 1, rotateY: -15, opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex-1 relative hidden md:block h-[55vh] preserve-3d shrink-0"
    >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-[3rem] border border-slate-700 shadow-2xl flex items-center justify-center transform translate-z-10 overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
             
             <motion.div 
               animate={{ y: [-25, 25, -25], rotate: [0, 5, 0] }}
               transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
               className="text-center p-8 relative z-20 bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl"
             >
                <div className="text-[5rem] mb-4 drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]">✨</div>
                <p className="text-2xl font-bold text-slate-200">الرعاية النفسية</p>
             </motion.div>

             <div className="absolute w-[300px] h-[300px] border-2 border-primary/20 rounded-full animate-[spin_12s_linear_infinite]"></div>
             <div className="absolute w-[400px] h-[400px] border border-accent/20 rounded-full animate-[spin_18s_linear_infinite_reverse]"></div>
        </div>
    </motion.div>
  </div>
);

export const CenteredQuoteLayout: React.FC<LayoutProps> = ({ data }) => (
  <div className="flex flex-col h-full items-center justify-center px-6 md:px-12 text-center relative overflow-hidden py-10">
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/15 rounded-full blur-3xl -z-10"></div>

     {data.content.map((item) => (
       <motion.div 
         key={item.id}
         initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
         animate={{ opacity: 1, scale: 1, rotateX: 0 }}
         transition={{ duration: 1, type: "spring" }}
         className="relative z-10 glass-panel p-10 md:p-16 rounded-[3rem] border border-indigo-500/30 shadow-[0_0_60px_rgba(79,70,229,0.15)] max-w-5xl w-full mx-auto flex flex-col items-center"
       >
         <div className="absolute -top-10 md:-top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 p-5 rounded-full border border-indigo-500/50 shadow-2xl shadow-indigo-500/20 z-20">
            <div className="scale-110 text-indigo-400">
                {item.icon}
            </div>
         </div>
         <div className="relative w-full mt-6">
             <span className="text-indigo-500 text-[6rem] md:text-[8rem] absolute -top-16 -right-4 md:-right-8 opacity-10 font-serif pointer-events-none">"</span>
             <h2 className="text-2xl md:text-4xl font-bold text-slate-100 leading-loose md:leading-loose relative z-10 px-4">
               {item.text}
             </h2>
             <span className="text-indigo-500 text-[6rem] md:text-[8rem] absolute -bottom-20 -left-4 md:-left-8 opacity-10 font-serif pointer-events-none">"</span>
         </div>
         
         <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent mx-auto my-8 rounded-full opacity-70"></div>
         <p className="text-lg md:text-xl text-indigo-300 font-medium leading-relaxed max-w-3xl">{item.subtext}</p>
       </motion.div>
     ))}
  </div>
);

export const InteractiveQuizLayout: React.FC<LayoutProps> = ({ data }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const currentQuestion = data.content[questionIndex];
  const isLastQuestion = questionIndex === data.content.length - 1;

  useEffect(() => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  }, [data.id]);

  const handleAnswer = (answer: string) => {
    if (showExplanation) return;
    setSelectedAnswer(answer);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (!isLastQuestion) {
      setQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center px-4 md:px-12 py-8 relative">
       <div className="text-center mb-8 shrink-0 z-10 mt-4">
         <h2 className={`text-3xl md:text-4xl font-black ${data.themeColor} mb-2 text-glow`}>{data.title}</h2>
         <p className="text-lg text-slate-400">{data.subtitle}</p>
       </div>

       <AnimatePresence mode="wait">
         <motion.div
            key={currentQuestion.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="w-full max-w-3xl z-10"
         >
            <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-600 relative overflow-hidden">
               <div className="absolute top-4 right-6 text-sm font-bold text-slate-500 tracking-widest">
                 سؤال {questionIndex + 1} / {data.content.length}
               </div>
               <div className="flex justify-center mb-6 text-primary">
                 <HelpCircle className="w-12 h-12 animate-bounce" />
               </div>
               <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-10 leading-relaxed">
                 {currentQuestion.text}
               </h3>

               {!showExplanation ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <button 
                     onClick={() => handleAnswer('true')}
                     className="p-6 rounded-xl bg-slate-800 border border-slate-600 hover:bg-emerald-500/20 hover:border-emerald-500 transition-all group flex flex-col items-center gap-3"
                   >
                     <CheckCircle2 className="w-8 h-8 text-emerald-500 group-hover:scale-110 transition-transform" />
                     <span className="text-xl font-bold text-slate-200">حقيقة</span>
                   </button>
                   <button 
                     onClick={() => handleAnswer('false')}
                     className="p-6 rounded-xl bg-slate-800 border border-slate-600 hover:bg-red-500/20 hover:border-red-500 transition-all group flex flex-col items-center gap-3"
                   >
                     <XCircle className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform" />
                     <span className="text-xl font-bold text-slate-200">خرافة</span>
                   </button>
                 </div>
               ) : (
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="bg-slate-900/50 rounded-xl p-6 border border-slate-700 text-center"
                 >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
                      (selectedAnswer === 'true' && currentQuestion.isCorrect) || (selectedAnswer === 'false' && !currentQuestion.isCorrect)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/50'
                    }`}>
                      <span className="font-bold">
                         {(selectedAnswer === 'true' && currentQuestion.isCorrect) || (selectedAnswer === 'false' && !currentQuestion.isCorrect) 
                           ? "إجابة صحيحة!" 
                           : "إجابة خاطئة!"
                         }
                      </span>
                    </div>
                    <p className="text-lg text-slate-300 leading-relaxed mb-6 px-4">{currentQuestion.explanation}</p>
                    {!isLastQuestion && (
                      <button onClick={nextQuestion} className="px-8 py-3 bg-primary text-slate-900 font-bold rounded-full hover:bg-teal-300 transition-colors shadow-lg shadow-primary/20">
                        السؤال التالي
                      </button>
                    )}
                 </motion.div>
               )}
            </div>
         </motion.div>
       </AnimatePresence>
    </div>
  );
};

export const StatsDashboardLayout: React.FC<LayoutProps> = ({ data }) => {
  return (
    <div className="flex flex-col h-full justify-center px-6 md:px-20 py-8">
       <div className="text-center mb-12 shrink-0 mt-4">
         <motion.h2 
           initial={{ y: -30, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className={`text-4xl md:text-5xl font-black ${data.themeColor} mb-4 text-glow`}
         >
           {data.title}
         </motion.h2>
         <p className="text-xl text-slate-400 max-w-3xl mx-auto">{data.subtitle}</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {data.content.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ rotateX: 30, opacity: 0, y: 50 }}
              animate={{ rotateX: 0, opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, type: "spring" }}
              whileHover={{ translateY: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
              className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 flex flex-col items-center text-center relative overflow-hidden group"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="mb-6 p-4 bg-slate-900 rounded-full shadow-xl border border-slate-700 group-hover:border-primary/50 transition-colors">
                 <div className="text-primary scale-125">{item.icon || <BarChart3 />}</div>
               </div>
               <AnimatedCounter value={item.value || 0} suffix={item.suffix} />
               <h3 className="text-xl font-bold text-white mt-4 mb-2">{item.text}</h3>
               <p className="text-sm text-slate-400">{item.subtext}</p>
            </motion.div>
          ))}
       </div>
    </div>
  );
};

// --- NEW INTERACTIVE LAYOUTS ---

export const ExpectationRealityLayout: React.FC<LayoutProps> = ({ data }) => {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col h-full justify-center px-6 md:px-20 py-8">
      <div className="text-center mb-10 shrink-0 mt-4">
         <h2 className={`text-3xl md:text-4xl font-bold ${data.themeColor} mb-2`}>{data.title}</h2>
         <p className="text-lg text-slate-400">{data.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 perspective-1000 pb-4">
        {data.content.map((item) => (
          <div key={item.id} className="relative h-[320px] w-full cursor-pointer group" onClick={() => toggleFlip(item.id)}>
            <motion.div 
              className="w-full h-full transition-all duration-500 preserve-3d"
              animate={{ rotateY: flipped[item.id] ? 180 : 0 }}
            >
              {/* Front */}
              <div className="absolute inset-0 backface-hidden bg-slate-800 rounded-2xl border border-slate-600 flex flex-col items-center justify-center p-6 text-center shadow-xl z-20">
                <div className="mb-6 text-red-400 scale-125">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">ما يعتقده الناس</h3>
                <p className="text-lg text-slate-300 mb-4">"{item.text}"</p>
                <p className="mt-auto text-xs text-slate-500 flex items-center gap-2 bg-slate-900/50 px-3 py-1 rounded-full"><RotateCw className="w-3 h-3" /> اضغط للقلب</p>
              </div>
              {/* Back */}
              <div 
                className="absolute inset-0 backface-hidden bg-slate-900 rounded-2xl border-2 border-primary shadow-[0_0_30px_rgba(45,212,191,0.15)] flex flex-col items-center justify-center p-6 text-center z-10" 
                style={{ transform: 'rotateY(180deg)' }}
              >
                <div className="mb-6 text-primary scale-125"><CheckCircle2 /></div>
                <h3 className="text-xl font-bold text-white mb-2">الواقع</h3>
                <p className="text-xl text-primary font-bold mb-2">{item.reality}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{item.subtext}</p>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const IcebergModelLayout: React.FC<LayoutProps> = ({ data }) => {
  const [revealed, setRevealed] = useState(false);
  const visiblePart = data.content.find(i => i.id === 'visible');
  const hiddenParts = data.content.filter(i => i.id !== 'visible');

  return (
    <div className="flex flex-col min-h-full justify-center items-center relative select-none py-12">
        {/* Sky */}
        <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-slate-900 to-slate-800 z-0"></div>
        {/* Water Surface */}
        <div className="absolute top-1/3 w-full h-2 bg-blue-400/50 blur-sm z-20"></div>
        
        {/* Deep Ocean */}
        <div 
            className="absolute bottom-0 w-full h-2/3 bg-gradient-to-b from-blue-900/80 to-slate-900 z-0 transition-all duration-1000 cursor-pointer"
            onClick={() => setRevealed(!revealed)}
        >
             <div className={`absolute inset-0 bg-black/60 z-30 flex items-center justify-center transition-opacity duration-500 ${revealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <p className="text-blue-200 animate-pulse flex flex-col items-center text-lg font-bold bg-slate-900/80 px-6 py-3 rounded-full border border-blue-400/30 backdrop-blur">
                        <MousePointerClick className="w-8 h-8 mb-2" />
                        اضغط هنا لاكتشاف العمق
                  </p>
             </div>

             {/* Floating bubbles for effect */}
             <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute bottom-0 left-[10%] w-4 h-4 bg-white rounded-full animate-float"></div>
                <div className="absolute bottom-10 left-[20%] w-2 h-2 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-5 left-[60%] w-6 h-6 bg-white rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
             </div>
        </div>

        {/* Iceberg Visual */}
        <div className="relative z-10 w-full max-w-4xl min-h-[600px] flex flex-col items-center pointer-events-none">
            {/* Tip of Iceberg */}
            <motion.div 
                initial={{ y: -20 }} animate={{ y: 0 }} 
                transition={{ repeat: Infinity, duration: 3, repeatType: "reverse" }}
                className="mb-8 p-6 bg-white/10 backdrop-blur-md rounded-t-3xl border border-white/20 text-center w-72 shadow-[0_0_30px_rgba(255,255,255,0.1)] mt-12"
            >
                <div className="text-white font-bold text-xl mb-1">{visiblePart?.text}</div>
                <div className="text-xs text-slate-300">{visiblePart?.subtext}</div>
            </motion.div>

            {/* Hidden Parts */}
            <motion.div 
                className="grid grid-cols-2 gap-6 w-full max-w-3xl px-4"
                animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 50 }}
                transition={{ duration: 0.5 }}
            >
                {hiddenParts.map((part) => (
                    <div key={part.id} className="p-4 bg-blue-950/80 backdrop-blur-md rounded-xl border border-blue-500/30 text-center hover:bg-blue-900/80 transition-colors shadow-lg z-40 pointer-events-auto">
                        <h4 className="text-blue-200 font-bold text-lg mb-1">{part.text}</h4>
                        <p className="text-xs text-blue-400">{part.subtext}</p>
                    </div>
                ))}
            </motion.div>
        </div>
    </div>
  );
};

// Improved positions to avoid overlap
const CLOUD_POSITIONS = [
  { top: '20%', left: '20%' }, { top: '15%', left: '50%' }, { top: '20%', left: '80%' },
  { top: '40%', left: '10%' }, { top: '40%', left: '90%' },
  { top: '50%', left: '30%' }, { top: '50%', left: '50%' }, { top: '50%', left: '70%' },
  { top: '70%', left: '20%' }, { top: '85%', left: '50%' }, { top: '70%', left: '80%' },
  { top: '30%', left: '70%' }, { top: '65%', left: '40%' }
];

export const WordCloudLayout: React.FC<LayoutProps> = ({ data }) => (
    <div className="h-full flex flex-col justify-center items-center px-4 relative">
        <h2 className="text-3xl font-bold text-slate-200 mb-4 relative z-20 text-glow mt-8">{data.title}</h2>
        
        {/* Atmospheric Fog */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-0 pointer-events-none"></div>
        
        <div className="relative w-full max-w-6xl h-[600px]">
            {data.content.map((item, i) => {
                const pos = CLOUD_POSITIONS[i % CLOUD_POSITIONS.length];
                // Determine color/mood based on size
                let cloudColor = "text-slate-300"; // Default
                let textColor = "text-slate-800";
                
                if (item.size === 'xl') {
                    cloudColor = "text-red-200";
                    textColor = "text-red-900";
                } else if (item.size === 'lg') {
                    cloudColor = "text-orange-100";
                    textColor = "text-orange-900";
                }

                return (
                    <CloudItem 
                        key={item.id}
                        text={item.text}
                        size={item.size}
                        delay={i * 0.5}
                        x={pos.left}
                        y={pos.top}
                        cloudColor={cloudColor}
                        textColor={textColor}
                    />
                )
            })}
        </div>
    </div>
);

export const BalanceScaleLayout: React.FC<LayoutProps> = ({ data }) => {
    const [balanced, setBalanced] = useState(false);

    return (
        <div className="h-full flex flex-col items-center justify-center p-8">
             <h2 className="text-3xl font-bold text-emerald-400 mb-2">{data.title}</h2>
             <p className="text-slate-400 mb-12">{data.subtitle}</p>

             <div className="relative w-full max-w-[600px] h-[300px] flex justify-center items-end cursor-pointer" onClick={() => setBalanced(!balanced)}>
                 {/* Stand */}
                 <div className="absolute bottom-0 w-4 h-48 bg-slate-600 rounded-t-lg mx-auto z-0"></div>
                 <div className="absolute bottom-0 w-40 h-4 bg-slate-600 rounded-full z-0"></div>

                 {/* Beam */}
                 <motion.div 
                    className="absolute top-6 w-[90%] h-2 bg-slate-500 rounded z-10"
                    animate={{ rotate: balanced ? 0 : -12 }}
                    transition={{ type: "spring", stiffness: 50 }}
                 >
                     {/* Left Pan (Law) */}
                     <div className="absolute left-0 top-0 flex flex-col items-center transform -translate-x-1/2">
                         <div className="h-24 w-0.5 bg-slate-400 origin-top" style={{ transform: `rotate(${balanced ? 0 : 12}deg)` }}></div>
                         <div className="w-28 h-28 rounded-full border-b-4 border-l-2 border-r-2 border-slate-500 bg-slate-800/90 flex items-center justify-center shadow-lg mt-24 text-center p-2 transform origin-top" style={{ transform: `rotate(${balanced ? 0 : 12}deg)` }}>
                             <span className="text-sm font-bold text-white">القانون</span>
                         </div>
                     </div>
                     
                     {/* Right Pan (Student) */}
                     <div className="absolute right-0 top-0 flex flex-col items-center transform translate-x-1/2">
                         <div className="h-24 w-0.5 bg-slate-400 origin-top" style={{ transform: `rotate(${balanced ? 0 : 12}deg)` }}></div>
                         <div className="w-28 h-28 rounded-full border-b-4 border-l-2 border-r-2 border-slate-500 bg-slate-800/90 flex items-center justify-center shadow-lg mt-24 text-center p-2 transform origin-top" style={{ transform: `rotate(${balanced ? 0 : 12}deg)` }}>
                             <span className="text-sm font-bold text-white">المتعلم(ة)</span>
                         </div>
                     </div>
                 </motion.div>

                 {/* Intervention Weight */}
                 <motion.div
                    className="absolute z-20"
                    initial={{ top: -80, opacity: 0 }}
                    animate={{ 
                        top: balanced ? 25 : -80, 
                        opacity: balanced ? 1 : 0 
                    }}
                    transition={{ duration: 0.5 }}
                 >
                     <div className="w-16 h-16 bg-emerald-500 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center border-2 border-emerald-300">
                        <Scale className="text-slate-900 w-8 h-8" />
                     </div>
                     <div className="text-center text-emerald-400 font-bold text-sm mt-2 bg-slate-900/80 px-2 py-1 rounded-full">التدخل المهني</div>
                 </motion.div>
             </div>

             {!balanced && <div className="mt-10 animate-bounce text-emerald-400 font-bold text-lg">اضغط لتحقيق التوازن</div>}
        </div>
    );
}

export const ToolboxLayout: React.FC<LayoutProps> = ({ data }) => {
    const [activeTool, setActiveTool] = useState<string | null>(null);

    return (
        <div className="h-full flex flex-col items-center justify-center p-4">
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] flex items-center justify-center">
                {/* Center Box */}
                <div className="z-20 w-32 h-32 md:w-40 md:h-40 bg-orange-500/10 border border-orange-500 rounded-3xl flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(249,115,22,0.2)] backdrop-blur-xl px-2">
                    <div className="text-orange-400 font-bold text-lg md:text-xl mb-2">حقيبة المختص</div>
                    <div className="text-xs text-orange-200">مرر على الأدوات</div>
                </div>

                {/* Orbiting Tools */}
                {data.content.map((item, i) => {
                    const angle = (i / data.content.length) * 2 * Math.PI;
                    const desktopX = Math.cos(angle) * 220;
                    const desktopY = Math.sin(angle) * 220;

                    return (
                        <motion.div
                            key={item.id}
                            className="absolute z-30 hidden md:block" // Hidden on small mobile, visible on md
                            style={{ x: desktopX, y: desktopY }}
                            onMouseEnter={() => setActiveTool(item.id)}
                            onMouseLeave={() => setActiveTool(null)}
                            whileHover={{ scale: 1.2 }}
                        >
                           <div className="w-16 h-16 bg-slate-800 border border-slate-600 rounded-full flex items-center justify-center hover:bg-slate-700 hover:border-orange-400 transition-colors cursor-pointer shadow-xl">
                                <div className="text-slate-200">{item.icon}</div>
                            </div>
                            <AnimatePresence>
                                {activeTool === item.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 bg-slate-900/95 border border-orange-500/50 p-4 rounded-xl text-center z-50 shadow-2xl pointer-events-none"
                                    >
                                        <h4 className="text-orange-400 font-bold text-sm mb-1">{item.text}</h4>
                                        <p className="text-xs text-slate-300 leading-relaxed">{item.subtext}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )
                })}
                
                {/* Mobile fallback: Grid layout instead of orbit */}
                <div className="absolute inset-0 grid grid-cols-2 gap-2 md:hidden pointer-events-none opacity-100">
                    {data.content.map((item, i) => (
                        <div key={item.id} className="pointer-events-auto flex flex-col items-center justify-center p-2 bg-slate-800/80 rounded-xl border border-slate-700">
                           <div className="text-orange-400 mb-1 scale-75">{item.icon}</div>
                           <div className="text-[10px] text-white text-center">{item.text}</div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export const CaseStudyLayout: React.FC<LayoutProps> = ({ data }) => {
    const [step, setStep] = useState<'intro' | 'options' | 'result'>('intro');
    const [selectedOption, setSelectedOption] = useState<any>(null);

    return (
        <div className="h-full flex flex-col items-center justify-center px-6 max-w-4xl mx-auto text-center py-8">
             <h2 className="text-3xl font-bold text-purple-400 mb-4">{data.title}</h2>
             
             <AnimatePresence mode="wait">
                 {step === 'intro' && (
                     <motion.div 
                        key="intro"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="bg-slate-800/50 p-8 md:p-10 rounded-3xl border border-slate-700 shadow-2xl max-w-2xl"
                     >
                         <User className="w-20 h-20 mx-auto text-purple-300 mb-6 bg-purple-900/30 rounded-full p-4 border border-purple-500/30" />
                         <p className="text-xl text-slate-200 mb-8 leading-relaxed font-medium">{data.subtitle}</p>
                         <button 
                            onClick={() => setStep('options')}
                            className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg shadow-purple-600/20"
                         >
                             ابدأ التدخل المهني
                         </button>
                     </motion.div>
                 )}

                 {step === 'options' && (
                     <motion.div 
                        key="options"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full flex flex-col gap-4 max-w-2xl"
                     >
                         <p className="text-xl text-slate-300 mb-4 font-bold">ما هو الإجراء الأول الذي ستتخذه؟</p>
                         {data.content[0].options?.map((opt) => (
                             <button
                                key={opt.id}
                                onClick={() => { setSelectedOption(opt); setStep('result'); }}
                                className="w-full text-right p-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-purple-500 rounded-xl transition-all group"
                             >
                                 <span className="text-slate-100 font-bold group-hover:text-purple-300 transition-colors">{opt.text}</span>
                             </button>
                         ))}
                     </motion.div>
                 )}

                 {step === 'result' && selectedOption && (
                     <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-8 md:p-12 rounded-3xl border max-w-2xl ${selectedOption.isCorrect ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-red-900/20 border-red-500/50'}`}
                     >
                         <div className={`text-5xl mb-6 flex justify-center ${selectedOption.isCorrect ? 'text-emerald-500' : 'text-red-500'}`}>
                             {selectedOption.isCorrect ? <CheckCircle2 className="w-20 h-20" /> : <XCircle className="w-20 h-20" />}
                         </div>
                         <h3 className="text-2xl font-bold text-white mb-4">{selectedOption.isCorrect ? 'أحسنت! تصرف مهني' : 'انتبه! تصرف غير سليم'}</h3>
                         <p className="text-lg text-slate-300 mb-10 leading-loose">{selectedOption.result}</p>
                         <button 
                            onClick={() => setStep('options')}
                            className="text-slate-400 underline hover:text-white transition-colors"
                         >
                             حاول مرة أخرى
                         </button>
                     </motion.div>
                 )}
             </AnimatePresence>
        </div>
    )
}

export const TimelineLayout: React.FC<LayoutProps> = ({ data }) => {
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <div className="h-full flex flex-col justify-center px-6 md:px-20">
            <h2 className="text-3xl font-bold text-lime-400 mb-2 text-center">{data.title}</h2>
            <p className="text-center text-slate-400 mb-12">{data.subtitle}</p>

            {/* Main Content Display */}
            <div className="bg-slate-800/60 backdrop-blur rounded-2xl p-8 mb-12 border border-slate-700 h-48 flex flex-col justify-center items-center text-center relative overflow-hidden shadow-xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIdx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <h3 className="text-2xl font-bold text-white mb-3">{data.content[activeIdx].text}</h3>
                        <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">{data.content[activeIdx].subtext}</p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Timeline Control */}
            <div className="relative flex justify-between items-center">
                {/* Line Base */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-700 -z-10"></div>
                
                {/* Active Line (Grow from Right for RTL) */}
                <motion.div 
                    className="absolute top-1/2 right-0 h-1 bg-lime-500 -z-10 origin-right"
                    animate={{ width: `${(activeIdx / (data.content.length - 1)) * 100}%` }}
                ></motion.div>

                {/* Dots */}
                {data.content.map((item, i) => (
                    <div key={item.id} className="flex flex-col items-center gap-3 cursor-pointer group w-20" onClick={() => setActiveIdx(i)}>
                        <motion.div 
                            className={`w-6 h-6 rounded-full border-4 transition-colors ${i <= activeIdx ? 'border-lime-500 bg-slate-900 shadow-[0_0_15px_rgba(132,204,22,0.6)]' : 'border-slate-600 bg-slate-800 group-hover:border-lime-500/50'}`}
                            animate={{ scale: i === activeIdx ? 1.4 : 1 }}
                        ></motion.div>
                        <span className={`text-[10px] md:text-xs font-bold text-center transition-colors ${i === activeIdx ? 'text-lime-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                            {item.timelineDate}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const ChatBubblesLayout: React.FC<LayoutProps> = ({ data }) => (
    <div className="h-full flex flex-col justify-center px-6 md:px-20 max-w-4xl mx-auto w-full py-8">
        <h2 className="text-3xl font-bold text-pink-400 mb-10 text-center">{data.title}</h2>
        
        <div className="space-y-6">
            {data.content.map((item, i) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: i * 0.8, type: "spring", stiffness: 100 }}
                    className="flex items-end gap-4"
                >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg border-2 border-slate-700 ${item.avatarColor || 'bg-slate-600'}`}>
                        {item.sender?.[0]}
                    </div>
                    <div className="relative bg-slate-800 p-5 rounded-3xl rounded-br-none border border-slate-700 max-w-[85%] shadow-md hover:shadow-lg transition-shadow">
                        <p className="text-slate-200 text-lg leading-relaxed">"{item.text}"</p>
                        <span className="text-xs text-pink-400/80 block mt-2 text-left font-bold">{item.sender}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
);
