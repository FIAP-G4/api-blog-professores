import { students } from '@prisma/client';
import { posts } from '@prisma/client';

export interface PostViewed {
    id: number;
    student_id: number;
    post_id: number;
    created_at: Date;
  
    student: students;
    post: posts;
  }
  