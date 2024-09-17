import { ITeacher } from '@/entities/models/teacher.interface'
import { IUser } from '@/entities/models/user.interface'
import { Repository } from 'typeorm'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { User } from '@/entities/user.entity'
import { IUserRepository } from '@/repositories/user.repository.interface'

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = appDataSource.getRepository(User)
  }

  async findByUsername(username: string): Promise<IUser | undefined> {
    const user = await this.repository.findOne({
      where: { username },
    })
    return user ?? undefined
  }

  async create(user: IUser): Promise<IUser> {
    return this.repository.save(user)
  }

  async findWithTeacher(
    userId: number,
  ): Promise<(IUser & ITeacher) | undefined> {
    const user = await this.repository.findOne({
      where: { id: userId },
      relations: ['teachers'],
    })

    if (!user) {
      return undefined
    }

    const combinedResult: IUser & ITeacher = {
      ...user,
      name: user.teachers?.[0]?.name || '',
    } as IUser & ITeacher

    return combinedResult
  }
}