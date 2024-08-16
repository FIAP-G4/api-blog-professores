import { posts } from '@prisma/client';

export interface Media {
    id: number;
    post_id: number;
    name: string;
    path: string;
    status: number;
    created_at: Date;
    updated_at?: Date;
  
    post: posts;
  }
  