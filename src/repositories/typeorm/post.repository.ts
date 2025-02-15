import { IPostRepository } from '../post.repository.interface'
import {
  FindManyOptions,
  FindOptionsWhere,
  Like,
  Repository,
  In,
} from 'typeorm'
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

  async findAll(
    page: number,
    limit: number,
    tagIds?: Array<number>,
    term?: string,
  ): Promise<IPost[]> {
    const queryOptions: FindManyOptions<Post> = {
      relations: ['tags', 'teacher.user', 'comments', 'vieweds'],
      skip: (page - 1) * limit,
      take: limit,
      order: {
        created_at: 'DESC',
      },
    }

    const whereConditions: FindOptionsWhere<IPost> = { status: 1 }

    if (term) {
      queryOptions.where = [
        { ...whereConditions, content: Like(`%${term}%`) },
        { ...whereConditions, title: Like(`%${term}%`) },
      ]
    } else {
      queryOptions.where = whereConditions
    }

    if (tagIds && tagIds.length > 0) {
      queryOptions.where = {
        ...whereConditions,
        tags: {
          id: In(tagIds),
        },
      }
    }

    const posts = await this.repository.find(queryOptions)
    const mappedPosts: IPost[] = posts.map((post) => {
      return {
        ...post,
        tags: post.tags?.filter((tag) => tag.status === 1),
        teacher: post.teacher
          ? { user: { name: post.teacher.user?.name } }
          : undefined,
        comments: post.comments?.filter((comment) => comment.status === 1),
        commentCount:
          post.comments?.filter((comment) => comment.status === 1).length || 0,
        viewedCount: post.vieweds?.length || 0,
        vieweds: undefined,
      }
    })

    return mappedPosts
  }

  async findPostById(
    id: string,
  ): Promise<
    (IPost & { commentCount?: number; viewedCount?: number }) | undefined
  > {
    const post = await this.repository.findOne({
      relations: ['tags', 'teacher.user', 'comments.user', 'vieweds'],
      where: { id },
    })

    if (!post) throw new Error('Post not found')

    // Filtrar tags com status = 1
    const filteredTags = post.tags?.filter((tag) => tag.status === 1)

    // Filtrar comentários com status = 1 e mapear apenas o nome do usuário
    const filteredComments = post.comments
      ?.filter((comment) => comment.status === 1)
      .map((comment) => ({
        ...comment,
        user: { name: comment.user?.name },
      }))

    return {
      ...post,
      tags: filteredTags,
      teacher: post.teacher
        ? { user: { name: post.teacher.user?.name } }
        : undefined,
      comments: filteredComments, // Apenas comentários com status = 1
      commentCount: filteredComments?.length || 0, // Contagem de comentários filtrados
      viewedCount: post.vieweds?.length || 0,
      vieweds: undefined, // Removido da resposta
    }
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
    delete post.vieweds
    delete post.comments
    delete post.commentCount
    delete post.viewedCount
    delete post.teacher
    return this.repository.save(post)
  }

  async deletePost(id: string): Promise<void> {
    await this.repository.update(id, { status: 0 })
  }
}
