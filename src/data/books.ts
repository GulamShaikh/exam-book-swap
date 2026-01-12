export type ExamType = 'B.Ed' | 'M.Ed' | 'NEET' | 'JEE';
export type Condition = 'Like New' | 'Good' | 'Marked';
export type ListingStatus = 'Active' | 'Sold' | 'Exchanged';

export interface Book {
  id: string;
  title: string;
  author: string;
  publication: string;
  examType: ExamType;
  condition: Condition;
  price: number;
  originalPrice: number;
  usedDuration: string;
  image: string;
  sellerId: string;
  sellerName: string;
  sellerCity: string;
  description: string;
  status: ListingStatus;
  listedDate: string;
  forExchange: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
}

export const dummyBooks: Book[] = [
  {
    id: '1',
    title: 'NCERT Physics Class 11 & 12',
    author: 'NCERT',
    publication: 'NCERT',
    examType: 'JEE',
    condition: 'Like New',
    price: 350,
    originalPrice: 600,
    usedDuration: '6 months',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop',
    sellerId: 'user1',
    sellerName: 'Rahul Sharma',
    sellerCity: 'Delhi',
    description: 'Complete set of Physics NCERT for JEE preparation. All chapters intact with minimal highlights.',
    status: 'Active',
    listedDate: '2024-01-10',
    forExchange: true,
  },
  {
    id: '2',
    title: 'Arihant B.Ed Entrance Guide',
    author: 'Dr. Vijay Kumar',
    publication: 'Arihant Publications',
    examType: 'B.Ed',
    condition: 'Good',
    price: 280,
    originalPrice: 450,
    usedDuration: '4 months',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=500&fit=crop',
    sellerId: 'user2',
    sellerName: 'Priya Patel',
    sellerCity: 'Mumbai',
    description: 'Comprehensive guide for B.Ed entrance exams. Includes practice sets and previous year papers.',
    status: 'Active',
    listedDate: '2024-01-08',
    forExchange: true,
  },
  {
    id: '3',
    title: 'MTG NEET Biology',
    author: 'MTG Editorial Board',
    publication: 'MTG Learning',
    examType: 'NEET',
    condition: 'Marked',
    price: 420,
    originalPrice: 750,
    usedDuration: '8 months',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop',
    sellerId: 'user3',
    sellerName: 'Amit Kumar',
    sellerCity: 'Bangalore',
    description: 'Detailed biology book for NEET. Some important points are highlighted.',
    status: 'Active',
    listedDate: '2024-01-05',
    forExchange: false,
  },
  {
    id: '4',
    title: 'M.Ed Advanced Pedagogy',
    author: 'Prof. S.K. Mangal',
    publication: 'PHI Learning',
    examType: 'M.Ed',
    condition: 'Like New',
    price: 520,
    originalPrice: 800,
    usedDuration: '3 months',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=500&fit=crop',
    sellerId: 'user4',
    sellerName: 'Sneha Reddy',
    sellerCity: 'Hyderabad',
    description: 'Essential book for M.Ed entrance. Covers all major topics in advanced pedagogy.',
    status: 'Active',
    listedDate: '2024-01-12',
    forExchange: true,
  },
  {
    id: '5',
    title: 'HC Verma - Concepts of Physics',
    author: 'H.C. Verma',
    publication: 'Bharati Bhawan',
    examType: 'JEE',
    condition: 'Good',
    price: 380,
    originalPrice: 550,
    usedDuration: '10 months',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=500&fit=crop',
    sellerId: 'user5',
    sellerName: 'Vikram Singh',
    sellerCity: 'Jaipur',
    description: 'The legendary physics book for JEE. Both volumes included.',
    status: 'Active',
    listedDate: '2024-01-03',
    forExchange: true,
  },
  {
    id: '6',
    title: 'Objective NCERT for NEET - Chemistry',
    author: 'MTG',
    publication: 'MTG Learning',
    examType: 'NEET',
    condition: 'Like New',
    price: 290,
    originalPrice: 400,
    usedDuration: '5 months',
    image: 'https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=400&h=500&fit=crop',
    sellerId: 'user6',
    sellerName: 'Ananya Gupta',
    sellerCity: 'Kolkata',
    description: 'MCQ-based chemistry prep book. Excellent for quick revision.',
    status: 'Active',
    listedDate: '2024-01-11',
    forExchange: false,
  },
  {
    id: '7',
    title: 'B.Ed Teaching Methodology',
    author: 'J.C. Aggarwal',
    publication: 'Vikas Publishing',
    examType: 'B.Ed',
    condition: 'Good',
    price: 320,
    originalPrice: 500,
    usedDuration: '6 months',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop',
    sellerId: 'user7',
    sellerName: 'Meera Nair',
    sellerCity: 'Chennai',
    description: 'Comprehensive teaching methodology guide for B.Ed aspirants.',
    status: 'Active',
    listedDate: '2024-01-07',
    forExchange: true,
  },
  {
    id: '8',
    title: 'RD Sharma Mathematics',
    author: 'R.D. Sharma',
    publication: 'Dhanpat Rai',
    examType: 'JEE',
    condition: 'Marked',
    price: 400,
    originalPrice: 650,
    usedDuration: '12 months',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop',
    sellerId: 'user8',
    sellerName: 'Arjun Mehta',
    sellerCity: 'Pune',
    description: 'Complete mathematics preparation for JEE. Well-used but all pages intact.',
    status: 'Active',
    listedDate: '2024-01-02',
    forExchange: false,
  },
];

export const examTypes: ExamType[] = ['B.Ed', 'M.Ed', 'NEET', 'JEE'];
export const conditions: Condition[] = ['Like New', 'Good', 'Marked'];
