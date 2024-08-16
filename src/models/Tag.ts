import { post_tags } from '@prisma/client';

export interface Tag {
    id: number;
    name?: string;
    status: number;
    created_at: Date;
    updated_at?: Date;
  
    post_tags: post_tags[];
  }
  