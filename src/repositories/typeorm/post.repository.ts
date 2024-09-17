import { IPostRepository } from '../post.repository.interface'
import { Repository } from 'typeorm'
import { Post } from '@/entities/post.entity'
// import { Teacher } from '@/entities/teacher.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { IPost } from '@/entities/models/post.interface'
// import { ITeacher } from '@/entities/models/teacher.interface'

export class PostRepository implements IPostRepository {
  private repository: Repository<Post>

  constructor() {
    this.repository = appDataSource.getRepository(Post)
  }

  async create(postData: IPost): Promise<IPost | undefined> {
    const post = this.repository.create(postData)
    return this.repository.save(post)
  }

  async findAll(page: number, limit: number): Promise<IPost[]> {
    return this.repository.find({
      relations: ['tags'],
      where: { status: 1 },
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async findPostById(id: string): Promise<IPost | undefined> {
    const post = await this.repository.findOne({
      relations: ['tags'],
      where: { id },
    })

    if (!post) throw new Error('Post not found')

    return post
  }

  async findPostByIdTeacher(
    teacherId: number,
    page: number,
    limit: number,
  ): Promise<IPost[]> {
    const offset = (page - 1) * limit

    return this.repository.find({
      relations: ['tags'],
      where: { teacher_id: teacherId, status: 1 },
      skip: offset,
      take: limit,
    })
  }

  async updatePost(post: IPost): Promise<IPost> {
    return this.repository.save(post)
  }

  async deletePost(id: string): Promise<void> {
    await this.repository.update(id, { status: 0 })
  }
}