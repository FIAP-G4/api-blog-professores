import { teachers } from '@prisma/client';
import { post_tags } from '@prisma/client';
import { media } from '@prisma/client';
import { post_viewed } from '@prisma/client';
import { comments } from '@prisma/client';

export interface Post {
    id: number;
    teacher_id: number;
    title: string;
    content: string;
    status: number;
    created_at: Date;
    updated_at?: Date;
  
    teacher: teachers;
    post_tags: post_tags[];
    media: media[];
    post_viewed: post_viewed[];
    comments: comments[];
  }
  