export interface Student {
  id: string;
  email: string;
  name: string;
  standard: string;
  subjects: string[];
  coins: number;
  streak_days: number;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  standard: string;
  subject: string;
  question: string;
  options: string[];
  correct_answer: string;
  coins_reward: number;
}

export interface QuizAttempt {
  id: string;
  student_id: string;
  question_id: string;
  is_correct: boolean;
  coins_earned: number;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  student_id: string;
  date: string;
  activity_count: number;
}

export const STANDARDS = [
  'Standard 8',
  'Standard 9',
  'Standard 10',
  'Standard 11',
  'Standard 12',
];

export const SUBJECTS = [
  'Mathematics',
  'Science',
  'English',
  'Social Science',
  'Physics',
  'Chemistry',
  'Biology',
  'IIT-JEE',
  'NEET',
];
