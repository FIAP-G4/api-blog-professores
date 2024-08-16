import { teachers } from '@prisma/client';
import { subjects } from '@prisma/client';

export interface TeacherSubject {
    id: number;
    teacher_id: number;
    subject_id: number;
    status: number;
    created_at: Date;
    updated_at?: Date;
  
    teacher: teachers;
    subject: subjects;
  }
  