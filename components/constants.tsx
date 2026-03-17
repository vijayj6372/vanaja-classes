export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Scholarship', href: '/#scholarship' },
  { label: 'Testimonials', href: '/#testimonials' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Brochure', href: '/brochure' },
  { label: 'Contact', href: '/#contact' },
];

export const COURSES = [
  {
    id: 1,
    title: 'IIT-JEE Main & Advanced Coaching',
    description: 'Expert coaching in Bharuch for engineering entrance exams with a focus on core concepts and rigorous problem-solving.',
    icon: 'Target',
    href: '/courses',
  },
  {
    id: 2,
    title: 'NEET Medical Coaching Bharuch',
    description: 'Specialized coaching for medical aspirants in Bharuch, covering Biology, Physics, and Chemistry for top NEET scores.',
    icon: 'Award',
    href: '/courses',
  },
  {
    id: 3,
    title: 'GUJCET Preparation',
    description: 'Targeted preparation for the Gujarat Common Entrance Test to secure admission in top state engineering colleges.',
    icon: 'Zap',
    href: '/courses',
  },
  {
    id: 4,
    title: '8th to 10th Foundation (CBSE/GSEB)',
    description: 'Building strong fundamentals for students of class 8, 9, and 10 in Bharuch to prepare for future competitive exams.',
    icon: 'BookOpen',
    href: '/courses',
  },
  {
    id: 5,
    title: '11th & 12th Science Board Exams',
    description: 'Dedicated batches for 11th and 12th Science (CBSE & GSEB) ensuring top scores in board examinations with personal attention.',
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
