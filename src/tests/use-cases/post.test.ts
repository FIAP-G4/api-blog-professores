import { IPost } from '@/entities/models/post.interface'
import { IPostRepository } from '@/repositories/post.repository.interface'
import { CreatePostUseCase } from '@/use-cases/post/create-post'
import { DeletePostUseCase } from '@/use-cases/post/delete-post'
import { FindAllPostUseCase } from '@/use-cases/post/find-all-post'
import { FindPostByTeacherUseCase } from '@/use-cases/post/find-post-by-teacher'
import { UpdatePostUseCase } from '@/use-cases/post/update-post'
import { FindPostByTermUseCase } from '@/use-cases/post/find-post-by-term'
import { FindPostUseCase } from '@/use-cases/post/find-post'

const mockPostRepository: jest.Mocked<IPostRepository> = {
  create: jest.fn(),
  findAll: jest.fn(),
  findPostByIdTeacher: jest.fn(),
  findPostById: jest.fn(),
  findPostByTextSearch: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
}

const mockPosts: IPost[] = [
  {
    id: '4e106c23-98cd-456a-955d-adc35295d5d4',
    title: 'Post 1',
    content: 'Content 1',
    teacher_id: 1,
    status: 1,
    created_at: new Date(),
    updated_at: null,
    tags: [],
  },
  {
    id: '591d008b-95e1-47a0-a1e8-33a84b8a02f2',
    title: 'Post  2',
    content: 'Content 2',
    teacher_id: 1,
    status: 1,
    created_at: new Date(),
    updated_at: null,
    tags: [],
  },
]

describe('Use Cases for the Post', () => {
  let createPostUseCase: CreatePostUseCase
  let deletePostUseCase: DeletePostUseCase
  let findAllPostUseCase: FindAllPostUseCase
  let findPostByTeacherUseCase: FindPostByTeacherUseCase
  let findPostByTermUseCase: FindPostByTermUseCase
  let findPostUseCase: FindPostUseCase
  let updatePostUseCase: UpdatePostUseCase

  beforeEach(() => {
    createPostUseCase = new CreatePostUseCase(mockPostRepository)
    deletePostUseCase = new DeletePostUseCase(mockPostRepository)
    findAllPostUseCase = new FindAllPostUseCase(mockPostRepository)
    findPostByTeacherUseCase = new FindPostByTeacherUseCase(mockPostRepository)
    findPostByTermUseCase = new FindPostByTermUseCase(mockPostRepository)
    findPostUseCase = new FindPostUseCase(mockPostRepository)
    updatePostUseCase = new UpdatePostUseCase(mockPostRepository)
  })

  it('It should create a new post using the repository', async () => {
    const newPost: IPost = {
      id: 'c520d812-c1e1-479d-a2cd-818a6d5f18da',
      title: 'Post 3',
      content: 'Content 3',
      teacher_id: 3,
    }
    mockPostRepository.create.mockResolvedValue(newPost)

    const result = await createPostUseCase.handler(newPost)

    expect(mockPostRepository.create).toHaveBeenCalledWith(newPost)
    expect(result).toBe(newPost)
  })

  it('It should delete a post by its ID', async () => {
    const postId = '4e106c23-98cd-456a-955d-adc35295d5d4'
    mockPostRepository.deletePost.mockResolvedValue(undefined)

    await deletePostUseCase.handler(postId)

    expect(mockPostRepository.deletePost).toHaveBeenCalledWith(postId)
  })

  it('It should find all posts with pagination', async () => {
    const page = 1
    const limit = 10
    mockPostRepository.findAll.mockResolvedValue(mockPosts)

    const result = await findAllPostUseCase.handler(page, limit)

    expect(mockPostRepository.findAll).toHaveBeenCalledWith(page, limit)
    expect(result).toEqual(mockPosts)
  })

  it('It should find a post by its teacher ID.', async () => {
    const teacherId = 1
    const page = 1
    const limit = 10
    mockPostRepository.findPostByIdTeacher.mockResolvedValue(mockPosts)

    const result = await findPostByTeacherUseCase.handler(
      teacherId,
      page,
      limit,
    )

    expect(mockPostRepository.findPostByIdTeacher).toHaveBeenCalledWith(
      teacherId,
      page,
      limit,
    )
    expect(result).toEqual(mockPosts)
  })

  it('It should find a post by its Term.', async () => {
    const term = 'Post'
    const page = 1
    const limit = 10
    mockPostRepository.findPostByTextSearch.mockResolvedValue(mockPosts)

    const result = await findPostByTermUseCase.handler(term, page, limit)
    expect(mockPostRepository.findPostByTextSearch).toHaveBeenCalledWith(
      term,
      page,
      limit,
    )
    expect(result).toEqual(mockPosts)
  })

  it('It should find a post by its ID.', async () => {
    const postId = '591d008b-95e1-47a0-a1e8-33a84b8a02f2'
    mockPostRepository.findPostById.mockResolvedValue(mockPosts[0])

    const result = await findPostUseCase.handler(postId)

    expect(mockPostRepository.findPostById).toHaveBeenCalledWith(postId)
    expect(result).toEqual(mockPosts[0])
  })

  it('It should update a post by its ID', async () => {
    const postId = '591d008b-95e1-47a0-a1e8-33a84b8a02f2'
    const updatedPost: IPost = {
      id: postId,
      title: 'Post 2 Updated',
      content: 'Content 2 Updated',
      teacher_id: 1,
    }
    mockPostRepository.updatePost.mockResolvedValue(updatedPost)

    const result = await updatePostUseCase.handler(updatedPost)

    expect(mockPostRepository.updatePost).toHaveBeenCalledWith(updatedPost)
    expect(result).toBe(updatedPost)
  })
})