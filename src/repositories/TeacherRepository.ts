import { ITeacherRepository } from './ITeacherRepository';
import { Teacher } from '../models/Teacher';
import Database from '../infra/dataBase';

export class TeacherRepository implements ITeacherRepository {
  private db: Database;

  constructor() {
    this.db = new Database();
  }

  public async findAll(): Promise<Teacher[]> {
    const result = await this.db.query(
      `SELECT id, name, email, created_at, updated_at FROM teachers WHERE status = 1`
    );
    return result[0] as Teacher[];
  }

  public async findById(id: number): Promise<Teacher | null> {
    const result = await this.db.query(
      `SELECT id, name, email, created_at, updated_at FROM teachers WHERE id = ?`,
      [id]
    );
    return result[0][0] as Teacher | null;
  }

  public async create(teacher: Teacher): Promise<void> {
    const { name, email } = teacher;
    await this.db.query(
      `INSERT INTO teachers (name, email) VALUES (?, ?)`,
      [name, email]
    );
  }

  public async update(id: number, teacher: Partial<Teacher>): Promise<void> {
    const fields = Object.keys(teacher);
    const values = Object.values(teacher);
    if (!fields.includes('updated_at')) {
      fields.push('updated_at');
      values.push(new Date());
    }
    const setClause = fields.map(field => `${field} = ?`).join(', ');
    values.push(id);
    await this.db.query(
      `UPDATE teachers SET ${setClause} WHERE id = ?`,
      values
    );
  }

  public async remove(id: number): Promise<void> {
    await this.db.query(
      `UPDATE teachers SET status = 0 WHERE id = ?`,
      [id]
    );
  }
}
