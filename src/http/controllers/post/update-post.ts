import { Request, Response, NextFunction } from 'express'
import path from 'path'
import { makeUpdatePostUseCase } from '@/use-cases/factory/post/make-update-post-use-case'

export async function updatePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params
    const { title, content, tags, removerImagem } = req.body
    const filePath = req.file ? req.file.path : null

    const updatePostUseCase = await makeUpdatePostUseCase()
      const parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    let formUpdate: {
      id: string
      title: any
      content: any
      tags: any
      path_img?: string
    } = {
      id,
      title,
      content,
      tags: parsedTags,
    }
    if (filePath) {
      formUpdate = {
        ...formUpdate,
        path_img: path.relative(process.cwd(), filePath),
      }
    } else if (removerImagem) {
      formUpdate = {
        ...formUpdate,
        path_img: '',
      }
    }
    console.log(formUpdate);
    const updatedPost = await updatePostUseCase.handler(formUpdate)

    return res.status(200).json(updatedPost)
  } catch (error) {
    next(error)
  }
}
