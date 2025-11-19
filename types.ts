
import { ReactNode } from 'react';

export enum SlideLayout {
  TITLE_ONLY = 'TITLE_ONLY',
  BULLET_POINTS = 'BULLET_POINTS',
  SPLIT_IMAGE = 'SPLIT_IMAGE',
  GRID_CARDS = 'GRID_CARDS',
  CENTERED_QUOTE = 'CENTERED_QUOTE',
  DIAGRAM_3D = 'DIAGRAM_3D',
  PROCESS_STEPS = 'PROCESS_STEPS',
  INTERACTIVE_QUIZ = 'INTERACTIVE_QUIZ',
  STATS_DASHBOARD = 'STATS_DASHBOARD',
  // New Layouts
  EXPECTATION_REALITY = 'EXPECTATION_REALITY',
  ICEBERG_MODEL = 'ICEBERG_MODEL',
  WORD_CLOUD = 'WORD_CLOUD',
  BALANCE_SCALE = 'BALANCE_SCALE',
  TOOLBOX = 'TOOLBOX',
  CASE_STUDY = 'CASE_STUDY',
  TIMELINE = 'TIMELINE',
  CHAT_BUBBLES = 'CHAT_BUBBLES',
}

export interface SlideItem {
  id: string;
  text: string;
  subtext?: string;
  icon?: ReactNode;
  // For Diagram Layout
  connections?: string[]; 
  position?: { x: number; y: number };
  // For Quiz
  isCorrect?: boolean; 
  explanation?: string;
  // For Stats
  value?: number; 
  suffix?: string;
  // For Flip Cards
  reality?: string;
  // For Case Study
  options?: { id: string; text: string; result: string; isCorrect?: boolean }[];
  // For Timeline
  timelineDate?: string;
  // For Chat
  sender?: string;
  avatarColor?: string;
  // For Word Cloud
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  layout: SlideLayout;
  content: SlideItem[];
  themeColor: string;
}
