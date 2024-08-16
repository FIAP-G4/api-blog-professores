import { PrismaClient } from '@prisma/client';
import { Teacher } from '../models/Teacher';

export class TeacherService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async getAllTeachers(): Promise<Teacher[]> {
    return this.prisma.teachers.findMany({
      include: {
        posts: true,
        teacher_subjects: true,
        comments: true,
      },
    });
  }

  public async getTeacherById(id: number): Promise<Teacher | null> {
    return this.prisma.teachers.findUnique({
      where: { id },
      include: {
        posts: true,
        teacher_subjects: true,
        comments: true,
      },
    });
  }
}
