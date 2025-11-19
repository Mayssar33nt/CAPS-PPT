
import React from 'react';
import { SlideData, SlideLayout } from './types';
import { 
  UserCheck, Shield, TrendingUp, HeartHandshake, AlertTriangle, 
  GraduationCap, Users, Puzzle, BrainCircuit, School, Lightbulb, 
  Anchor, Search, FileText, CheckCircle, Activity, Sparkles, 
  Target, Briefcase, BookOpen, Building2, Smile, ThumbsUp,
  Scale, MessageCircle, Clock, FolderOpen, Cloud, HelpCircle
} from 'lucide-react';

export const TOTAL_SLIDES = 20;

export const SLIDES: SlideData[] = [
  {
    id: 0,
    title: "المختص الاجتماعي المدرسي",
    subtitle: "ركيزة الدعم النفسي، الاجتماعي، والتربوي في المؤسسة التعليمية",
    layout: SlideLayout.TITLE_ONLY,
    themeColor: "text-primary",
    content: [
      {
        id: "author",
        text: "من إنجاز المختص الاجتماعي:",
        subtext: "اوعليت محمد"
      }
    ],
  },
  {
    id: 1,
    title: "توقعات vs واقع",
    subtitle: "تصحيح المفاهيم المغلوطة حول مهنة المختص الاجتماعي (اضغط لقلب البطاقة)",
    layout: SlideLayout.EXPECTATION_REALITY,
    themeColor: "text-indigo-400",
    content: [
      {
        id: "myth-1",
        text: "شرطي المدرسة",
        subtext: "يعاقب المتعلمين ويلاحق المتغيبين فقط",
        reality: "داعم ومرشد",
        icon: <Shield className="w-10 h-10" />
      },
      {
        id: "myth-2",
        text: "يمتلك عصا سحرية",
        subtext: "يحل المشاكل فوراً بمجرد جلسة واحدة",
        reality: "عملية مستمرة",
        icon: <Sparkles className="w-10 h-10" />
      },
      {
        id: "myth-3",
        text: "للمتعلمين المشاغبين فقط",
        subtext: "يتعامل حصراً مع ذوي السلوك السيء",
        reality: "للجميع",
        icon: <Users className="w-10 h-10" />
      }
    ]
  },
  {
    id: 2,
    title: "منظومة التدخل المهني",
    subtitle: "المختص الاجتماعي هو الجسر الرابط بين جميع الأطراف (اضغط على المختص)",
    layout: SlideLayout.DIAGRAM_3D,
    themeColor: "text-blue-400",
    content: [
      {
        id: "specialist",
        text: "المختص الاجتماعي",
        subtext: "انقر هنا",
        icon: <Activity className="w-8 h-8" />,
        position: { x: 50, y: 50 }, 
        connections: ["partners", "admin", "school", "learner", "teachers", "family"]
      },
      {
        id: "partners",
        text: "الشركاء",
        subtext: "دعم خارجي",
        icon: <HeartHandshake className="w-8 h-8" />,
        position: { x: 50, y: 15 },
        connections: []
      },
      {
        id: "admin",
        text: "الإدارة التربوية",
        subtext: "سلطة داعمة",
        icon: <Briefcase className="w-8 h-8" />,
        position: { x: 80, y: 32 },
        connections: []
      },
      {
        id: "school",
        text: "المؤسسة",
        subtext: "فضاء الحياة",
        icon: <Building2 className="w-8 h-8" />,
        position: { x: 80, y: 68 },
        connections: []
      },
      {
        id: "learner",
        text: "المتعلم(ة)",
        subtext: "الغاية والهدف",
        icon: <GraduationCap className="w-8 h-8" />,
        position: { x: 50, y: 85 },
        connections: []
      },
      {
        id: "teachers",
        text: "هيئة التدريس",
        subtext: "شريك بيداغوجي",
        icon: <BookOpen className="w-8 h-8" />,
        position: { x: 20, y: 68 },
        connections: []
      },
      {
        id: "family",
        text: "الأسرة",
        subtext: "الحضن الأول",
        icon: <Users className="w-8 h-8" />,
        position: { x: 20, y: 32 },
        connections: []
      }
    ]
  },
  {
    id: 3,
    title: "نموذج جبل الجليد",
    subtitle: "ما نراه هو السلوك الظاهر، ولكن ماذا يختفي تحت السطح؟ (اضغط لاكتشاف العمق)",
    layout: SlideLayout.ICEBERG_MODEL,
    themeColor: "text-cyan-300",
    content: [
      { id: "visible", text: "العنف المدرسي", subtext: "الشغب، الغياب، التخريب" },
      { id: "hidden-1", text: "مشاكل أسرية", subtext: "طلاق، عنف منزلي" },
      { id: "hidden-2", text: "تنمر إلكتروني", subtext: "تهديدات خفية" },
      { id: "hidden-3", text: "صعوبات تعلم", subtext: "إحباط دراسي" },
      { id: "hidden-4", text: "اكتئاب وقلق", subtext: "معاناة نفسية صامتة" },
    ]
  },
  {
    id: 4,
    title: "سحابة المشكلات",
    subtitle: "نواجه يومياً طيفاً واسعاً من التحديات المتشابكة",
    layout: SlideLayout.WORD_CLOUD,
    themeColor: "text-red-400",
    content: [
      { id: "w1", text: "التنمر", size: "xl" },
      { id: "w2", text: "الغياب", size: "lg" },
      { id: "w3", text: "المخدرات", size: "lg" },
      { id: "w4", text: "العنف", size: "xl" },
      { id: "w5", text: "الطلاق", size: "md" },
      { id: "w6", text: "القلق", size: "md" },
      { id: "w7", text: "الخجل", size: "sm" },
      { id: "w8", text: "السرقة", size: "sm" },
      { id: "w9", text: "التدخين", size: "md" },
      { id: "w10", text: "الانطواء", size: "md" },
      { id: "w11", text: "الفقر", size: "lg" },
      { id: "w12", text: "الإدمان الرقمي", size: "xl" },
    ]
  },
  {
    id: 5,
    title: "توازن العدالة",
    subtitle: "دور الوساطة: تحقيق التوازن بين القوانين وظروف المتعلم(ة) (اضغط لوزن الكفة)",
    layout: SlideLayout.BALANCE_SCALE,
    themeColor: "text-emerald-400",
    content: [
      { id: "left", text: "القانون الداخلي", subtext: "العقوبات والضوابط" },
      { id: "right", text: "ظروف المتعلم(ة)", subtext: "النفسية والاجتماعية" },
      { id: "intervention", text: "التدخل المهني", subtext: "تحقيق العدالة والمرونة" }
    ]
  },
  {
    id: 6,
    title: "أهمية المختص الاجتماعي",
    subtitle: "لماذا يعتبر وجوده ضرورة ملحة؟",
    layout: SlideLayout.GRID_CARDS,
    themeColor: "text-amber-400",
    content: [
      {
        id: "imp-1",
        text: "الأمن النفسي",
        subtext: "توفير ملاذ آمن للمتعلم(ة) للتعبير عن مشاعره.",
        icon: <HeartHandshake className="w-12 h-12 text-amber-400" />
      },
      {
        id: "imp-2",
        text: "تعديل السلوك",
        subtext: "استبدال السلوكيات السلبية بقيم إيجابية.",
        icon: <Activity className="w-12 h-12 text-amber-400" />
      },
      {
        id: "imp-3",
        text: "التحصيل الدراسي",
        subtext: "إزالة العوائق التي تحول دون التفوق العلمي.",
        icon: <Target className="w-12 h-12 text-amber-400" />
      }
    ]
  },
  {
    id: 7,
    title: "صندوق الأدوات",
    subtitle: "الأدوات المهنية التي نستخدمها لفهم ودعم المتعلم(ة) (مرر المؤشر)",
    layout: SlideLayout.TOOLBOX,
    themeColor: "text-orange-400",
    content: [
      { id: "t1", text: "المقابلة الفردية", subtext: "جلسة سرية لبناء الثقة وفهم المشكلة بعمق", icon: <Users /> },
      { id: "t2", text: "الملاحظة", subtext: "رصد السلوك في البيئة الطبيعية (الساحة، القسم)", icon: <Search /> },
      { id: "t3", text: "الزيارة المنزلية", subtext: "فهم السياق الأسري والاجتماعي للمتعلم(ة)", icon: <Building2 /> },
      { id: "t4", text: "دراسة الحالة", subtext: "جمع شامل للبيانات لتشخيص دقيق", icon: <FileText /> },
      { id: "t5", text: "السجلات", subtext: "التوثيق المهني لمسار التدخل والتطور", icon: <FolderOpen /> },
    ]
  },
  {
    id: 8,
    title: "الأدوار الأساسية",
    subtitle: "منهجية علمية متكاملة الأبعاد",
    layout: SlideLayout.GRID_CARDS,
    themeColor: "text-emerald-400",
    content: [
      {
        id: "role-1",
        text: "الدور الوقائي",
        subtext: "تحصين المتعلمين ضد الظواهر السلبية واستباق المشكلات.",
        icon: <Shield className="w-12 h-12 text-emerald-400" />
      },
      {
        id: "role-2",
        text: "الدور الإنمائي",
        subtext: "اكتشاف الطاقات وتنمية المهارات القيادية.",
        icon: <TrendingUp className="w-12 h-12 text-emerald-400" />
      },
      {
        id: "role-3",
        text: "الدور العلاجي",
        subtext: "وضع خطط التدخل المهنية للحالات الفردية.",
        icon: <UserCheck className="w-12 h-12 text-emerald-400" />
      }
    ]
  },
  {
    id: 9,
    title: "منهجية التدخل المهني",
    subtitle: "خطوات مدروسة لحل المشكلات",
    layout: SlideLayout.PROCESS_STEPS,
    themeColor: "text-cyan-400",
    content: [
      {
        id: "step-1",
        text: "الملاحظة والرصد",
        subtext: "اكتشاف الحالات.",
        icon: <Search className="w-8 h-8 text-cyan-400" />
      },
      {
        id: "step-2",
        text: "الدراسة والتشخيص",
        subtext: "تحليل الأسباب.",
        icon: <FileText className="w-8 h-8 text-cyan-400" />
      },
      {
        id: "step-3",
        text: "وضع الخطة",
        subtext: "تحديد الأهداف.",
        icon: <BrainCircuit className="w-8 h-8 text-cyan-400" />
      },
      {
        id: "step-4",
        text: "التقويم",
        subtext: "قياس الأثر.",
        icon: <CheckCircle className="w-8 h-8 text-cyan-400" />
      }
    ]
  },
  {
    id: 10,
    title: "دراسة حالة تفاعلية",
    subtitle: "متعلم(ة) متفوق(ة) تراجع مستواه(ا) فجأة وبدأ يظهر سلوكاً عدوانياً. ماذا تفعل؟",
    layout: SlideLayout.CASE_STUDY,
    themeColor: "text-purple-400",
    content: [
      {
        id: "case-1",
        text: "سيناريو التدخل",
        options: [
          {
             id: "opt1", 
             text: "استدعاء ولي الأمر فوراً وتوبيخه", 
             result: "نتيجة سلبية: قد يزيد الضغط الأسري على المتعلم(ة) وتتفاقم المشكلة دون فهم الأسباب.",
             isCorrect: false
          },
          {
             id: "opt2", 
             text: "إحالته لمجلس الانضباط للعقاب", 
             result: "نتيجة سلبية: العقاب دون فهم الأسباب يولد النقمة ويزيد السلوك العدواني.",
             isCorrect: false
          },
          {
             id: "opt3", 
             text: "إجراء مقابلة فردية لاحتواء المتعلم(ة)", 
             result: "نتيجة إيجابية: بناء الثقة هو المفتاح لكشف الأسباب الكامنة (مثل التنمر أو مشاكل أسرية) وبدء العلاج.",
             isCorrect: true
          }
        ]
      }
    ]
  },
  {
    id: 11,
    title: "مسار التغيير",
    subtitle: "النتائج لا تأتي صدفة، بل عبر مسار زمني متدرج",
    layout: SlideLayout.TIMELINE,
    themeColor: "text-lime-400",
    content: [
      { id: "t1", timelineDate: "الأسبوع 1", text: "الاستقبال وبناء الثقة", subtext: "كسر حاجز الخوف وشعور المتعلم(ة) بالأمان" },
      { id: "t2", timelineDate: "الأسبوع 3", text: "فهم المشكلة وتشخيصها", subtext: "تحديد العوامل المؤثرة (ذاتية، أسرية، مدرسية)" },
      { id: "t3", timelineDate: "الأسبوع 6", text: "تطبيق الخطة العلاجية", subtext: "جلسات إرشادية، إشراك الأسرة، دمج في الأنشطة" },
      { id: "t4", timelineDate: "الأسبوع 10", text: "ظهور بوادر التحسن", subtext: "انخفاض السلوك السلبي، عودة الاهتمام بالدراسة" },
      { id: "t5", timelineDate: "نهاية الفصل", text: "الاندماج والنجاح", subtext: "استعادة التوازن النفسي والاجتماعي" },
    ]
  },
  {
    id: 12,
    title: "أصوات من الميدان",
    subtitle: "صدى الأثر في نفوس المستفيدين",
    layout: SlideLayout.CHAT_BUBBLES,
    themeColor: "text-pink-400",
    content: [
      { id: "msg1", text: "أستاذ، شكراً لأنك سمعتني لما كنت ضايع.. رجعت لي الثقة في نفسي.", sender: "متعلم (15 سنة)", avatarColor: "bg-blue-500" },
      { id: "msg2", text: "كنت سأغادر المدرسة، لكن دعمك جعلني أتمسك بفرصتي الأخيرة.", sender: "متعلمة منقطعة سابقاً", avatarColor: "bg-purple-500" },
      { id: "msg3", text: "لاحظنا تغيراً كبيراً في سلوك ابننا، شكراً لتوجيهاتك لنا كأسرة.", sender: "ولي أمر", avatarColor: "bg-green-500" },
      { id: "msg4", text: "وجودك خفف علينا عبء المشاكل داخل الفصل، أصبحنا نركز على التدريس.", sender: "أستاذ الرياضيات", avatarColor: "bg-yellow-500" },
    ]
  },
  {
    id: 13,
    title: "مؤشرات النجاح",
    subtitle: "لغة الأرقام تترجم الأثر الإيجابي",
    layout: SlideLayout.STATS_DASHBOARD,
    themeColor: "text-lime-400",
    content: [
      {
        id: "stat-1",
        text: "تراجع العنف",
        subtext: "بفضل برامج الوساطة",
        icon: <Smile className="w-10 h-10" />,
        value: 45,
        suffix: "%"
      },
      {
        id: "stat-2",
        text: "انخفاض الهدر",
        subtext: "بفضل الدعم الاجتماعي",
        icon: <TrendingUp className="w-10 h-10" />,
        value: 30,
        suffix: "%"
      },
      {
        id: "stat-3",
        text: "رضا الأسر",
        subtext: "عن آليات التواصل",
        icon: <ThumbsUp className="w-10 h-10" />,
        value: 92,
        suffix: "%"
      }
    ]
  },
  {
    id: 14,
    title: "محاربة الظواهر المشينة",
    subtitle: "نحو بيئة مدرسية آمنة",
    layout: SlideLayout.BULLET_POINTS,
    themeColor: "text-red-400",
    content: [
      {
        id: "neg-1",
        text: "التصدّي للتنمر والعنف",
        subtext: "برامج تعديل السلوك وجلسات الإرشاد.",
        icon: <AlertTriangle className="w-8 h-8 text-red-400" />
      },
      {
        id: "neg-2",
        text: "الحد من الهدر المدرسي",
        subtext: "دعم المتعلم(ة) لتجاوز المعيقات الاقتصادية.",
        icon: <Anchor className="w-8 h-8 text-red-400" />
      },
      {
        id: "neg-3",
        text: "مكافحة الآفات",
        subtext: "تحصين المجتمع المدرسي من الإدمان.",
        icon: <Shield className="w-8 h-8 text-red-400" />
      }
    ]
  },
  {
    id: 15,
    title: "تذليل الصعوبات",
    subtitle: "دعم شامل لاحتياجات المتعلم(ة)",
    layout: SlideLayout.SPLIT_IMAGE,
    themeColor: "text-purple-400",
    content: [
      {
        id: "diff-1",
        text: "صعوبات نفسية",
        subtext: "القلق، الاكتئاب، الانطواء.",
        icon: <BrainCircuit className="w-10 h-10 text-purple-400" />
      },
      {
        id: "diff-2",
        text: "صعوبات اجتماعية",
        subtext: "التفكك الأسري والطلاق.",
        icon: <Users className="w-10 h-10 text-purple-400" />
      },
      {
        id: "diff-3",
        text: "صعوبات تربوية",
        subtext: "التأخر الدراسي وصعوبات التعلم.",
        icon: <Lightbulb className="w-10 h-10 text-purple-400" />
      }
    ]
  },
  {
    id: 16,
    title: "الأثر الملموس",
    subtitle: "نتائج العمل الاجتماعي الفعال",
    layout: SlideLayout.BULLET_POINTS,
    themeColor: "text-pink-400",
    content: [
      {
        id: "res-1",
        text: "تحسن المناخ المدرسي",
        subtext: "انتشار روح التعاون والاحترام.",
        icon: <Sparkles className="w-8 h-8 text-pink-400" />
      },
      {
        id: "res-2",
        text: "ارتفاع نسب النجاح",
        subtext: "زيادة الدافعية للتعلم.",
        icon: <TrendingUp className="w-8 h-8 text-pink-400" />
      },
      {
        id: "res-3",
        text: "شراكة مجتمعية",
        subtext: "تواصل فعال مع الأسرة.",
        icon: <HeartHandshake className="w-8 h-8 text-pink-400" />
      }
    ]
  },
  {
    id: 17,
    title: "اختبر معلوماتك",
    subtitle: "حقيقة أم خرافة؟",
    layout: SlideLayout.INTERACTIVE_QUIZ,
    themeColor: "text-teal-400",
    content: [
      {
        id: "q1",
        text: "المختص الاجتماعي يتدخل فقط عند وقوع العقاب؟",
        isCorrect: false,
        explanation: "خطأ! دوره وقائي وإنمائي قبل أن يكون علاجياً."
      },
      {
        id: "q2",
        text: "السرية التامة هي أساس عمل المختص؟",
        isCorrect: true,
        explanation: "صحيح! الثقة هي العمود الفقري للعلاقة المهنية."
      },
      {
        id: "q3",
        text: "دور المختص يقتصر على المتعلم(ة) فقط؟",
        isCorrect: false,
        explanation: "خطأ! الأسرة والمحيط شركاء استراتيجيون."
      }
    ]
  },
  {
    id: 18,
    title: "التكامل المؤسسي",
    subtitle: "العمل بروح الفريق الواحد",
    layout: SlideLayout.CENTERED_QUOTE,
    themeColor: "text-indigo-400",
    content: [
      {
        id: "team-1",
        text: "لا يعمل المختص الاجتماعي في جزيرة منعزلة، بل هو جزء حيوي في آلة تربوية متكاملة.",
        subtext: "إدارة داعمة + معلم واعٍ + أسرة متواصلة = نجاح المتعلم(ة).",
        icon: <Puzzle className="w-16 h-16 text-indigo-400 opacity-80" />
      }
    ]
  },
  {
    id: 19,
    title: "الخاتمة",
    subtitle: "المختص الاجتماعي: صمام الأمان للمجتمع المدرسي",
    layout: SlideLayout.TITLE_ONLY,
    themeColor: "text-primary",
    content: [],
  }
];
