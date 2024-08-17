import { posts } from '@prisma/client';
import { teacher_subjects } from '@prisma/client';
import { comments } from '@prisma/client';

export interface Teacher {
  id: number;
  name: string | null;
  email: string | null;
  password: string | null;
  status: number;
  created_at: Date;
  updated_at: Date | null;
}
