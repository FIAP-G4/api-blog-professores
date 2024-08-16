import { posts } from '@prisma/client';
import { students } from '@prisma/client';
import { teachers } from '@prisma/client';

export interface Comment {
    id: number;
    post_id: number;
    student_id?: number;
    teacher_id?: number;
    content: string;
    status: number;
    created_at: Date;
    updated_at: Date;
  
    post: posts;
    student?: students;
    teacher?: teachers;
  }
  