import { teacher_subjects } from '@prisma/client';

export interface Subject {
    id: number;
    name?: string;
    status: number;
    created_at: Date;
    updated_at?: Date;
  
    teacher_subjects: teacher_subjects[];
  }
  