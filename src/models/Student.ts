import { comments } from '@prisma/client';
import { post_viewed } from '@prisma/client';

export interface Student {
    id: number;
    name?: string;
    email?: string;
    password?: string;
    status: number;
    created_at: Date;
    updated_at?: Date;
  
    comments: comments[];
    post_viewed: post_viewed[];
  }
  