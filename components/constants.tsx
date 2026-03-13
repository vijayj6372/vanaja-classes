export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Scholarship', href: '/#scholarship' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Brochure', href: '/brochure' },
  { label: 'Contact', href: '/#contact' },
];

export const COURSES = [
  {
    id: 1,
    title: 'IIT JEE Main & Advanced',
    description: 'Comprehensive preparation for engineering entrance exams with focus on concepts and problem-solving.',
    icon: 'Target',
    href: '/courses',
  },
  {
    id: 2,
    title: 'NEET (Medical)',
    description: 'Specialized coaching for medical aspirants covering Biology, Physics, and Chemistry in depth.',
    icon: 'Award',
    href: '/courses',
  },
  {
    id: 3,
    title: 'GUJCET',
    description: 'Targeted preparation for Gujarat Common Entrance Test to secure admission in top state colleges.',
    icon: 'Zap',
    href: '/courses',
  },
  {
    id: 4,
    title: 'Foundation Batches',
    description: 'Building strong fundamentals for students of class 8, 9, and 10 to prepare for future competitive exams.',
    icon: 'BookOpen',
    href: '/courses',
  },
  {
    id: 5,
    title: 'Board Excellence',
    description: 'Dedicated batches for 11th and 12th Science stream to ensure top scores in board examinations.',
    icon: 'GraduationCap',
    href: '/courses',
  },
];



export interface VideoItem {
  id: string;
  title: string;
  description: string;
}

export const YOUTUBE_VIDEOS: VideoItem[] = [
  {
    id: 'k_46Kynr-B0',
    title: 'Success Story of our Topper',
    description: 'Hear from our student who cracked JEE Advanced with flying colors.',
  },
  {
    id: '903VLtiC6Yw',
    title: 'Classroom Experience',
    description: 'A glimpse into our interactive and engaging classroom sessions.',
  },
  {
    id: '35DIO2Iqomk',
    title: 'Faculty Interview',
    description: 'Meet our expert faculty members and learn about their teaching methodology.',
  },
];
