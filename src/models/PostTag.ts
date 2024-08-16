import { posts } from '@prisma/client';
import { tags } from '@prisma/client';

export interface PostTag {
    id: number;
    post_id: number;
    tag_id: number;
    status: number;
    created_at: Date;
    updated_at?: Date;
  
    post: posts;
    tag: tags;
  }
  