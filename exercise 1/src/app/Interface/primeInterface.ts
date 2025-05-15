export enum COURSE_LVL {
  BEGINNER = 'BEGINNER',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}


export interface CardInterface {
  heading: string;
  subheading: string;
  description: string;
  courseLevel: COURSE_LVL;
  requiredExperience: number;
  duration: string; // e.g., "4 weeks", "10 hours"
  instructor: string; // Name of the instructor
  rating: number; // Course rating out of 5
  reviewsCount: number; // Number of reviews
  price: number | 'Free'; // Price of the course
  tags: string[]; // Keywords related to the course
  thumbnailUrl: string; // Image URL for course thumbnail
  syllabus: string[]; // List of key topics covered in the course
  isCertified: boolean; // Whether the course offers certification
  enrollmentCount: number; // Number of students enrolled

}