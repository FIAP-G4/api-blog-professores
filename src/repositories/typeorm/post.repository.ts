import { IPostRepository } from '../post.repository.interface'
import { FindManyOptions, FindOptionsWhere, Like, Repository } from 'typeorm'
import { Post } from '@/entities/post.entity'
import { Tag } from '@/entities/tag.entity'
import { appDataSource } from '@/lib/typeorm/typeorm'
import { IPost } from '@/entities/models/post.interface'
import { ITag } from '@/entities/models/tags.interface'

export class PostRepository implements IPostRepository {
  private repository: Repository<Post>
  private tagRepository: Repository<Tag>

  constructor() {
    this.repository = appDataSource.getRepository(Post)
    this.tagRepository = appDataSource.getRepository(Tag)
  }

  async create(postData: IPost): Promise<IPost | undefined> {
    let post = this.repository.create(postData)
    if (postData.tags && postData.tags.length > 0) {
      postData.tags = await this.handleTags(postData.tags)
    }

    post = this.repository.create(postData)
    return this.repository.save(post)
  }

  private async handleTags(tags: ITag[]): Promise<Tag[]> {
    const processedTags: Tag[] = []

    for (const tag of tags) {
      let existingTag = await this.tagRepository.findOne({
        where: { name: tag.name, status: 1 },
      })

      if (!existingTag) {
        existingTag = await this.tagRepository.save(tag)
      }

      processedTags.push(existingTag)
    }

    return processedTags
  }

  async findAll(page: number, limit: number, tagId?: number): Promise<IPost[]> {
    const queryOptions: FindManyOptions<IPost> = {
      relations: ['tags'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    }

    const whereConditions: FindOptionsWhere<IPost> = { status: 1 }

    if (tagId) {
      whereConditions.tags = { id: tagId }
    }

    queryOptions.where = whereConditions

    return this.repository.find(queryOptions)
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

  async findPostByTextSearch(
    text: string,
    page: number,
    limit: number,
  ): Promise<IPost[]> {
    return this.repository.find({
      relations: ['tags'],
      where: [
        { content: Like(`%${text}%`), status: 1 },
        { title: Like(`%${text}%`), status: 1 },
      ],
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  async updatePost(post: IPost): Promise<IPost> {
    if (post.tags && post.tags.length > 0) {
      post.tags = await this.handleTags(post.tags)
    }

    post.updated_at = new Date()
    return this.repository.save(post)
  }

  async deletePost(id: string): Promise<void> {
    await this.repository.update(id, { status: 0 })
  }
}
