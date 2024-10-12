import { appDataSource } from '@/lib/typeorm/typeorm'
import { Repository } from 'typeorm'
import { IPostViewedRepository } from '../post-viewed.repository.interface'
import { PostViewed } from '@/entities/post-viewed.entity'
import { IPostViewed } from '@/entities/models/post-viewed.interface'

export class PostViewedRepository implements IPostViewedRepository {
  private repository: Repository<PostViewed>

  constructor() {
    this.repository = appDataSource.getRepository(PostViewed)
  }

  async create(postViewedData: IPostViewed): Promise<IPostViewed> {
    const postViewed = this.repository.create(postViewedData)
    return this.repository.save(postViewed)
  }
}