import { Teacher } from '../models/Teacher';

export class TeacherService {
  public static async getAllTeachers(): Promise<Teacher[]> {
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'teste@teste.com',
        password: '123456',
        status: 1,
        created_at: new Date(),
        updated_at: null,
      },
    ];
  }
}

