import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostService } from './post.service';
import { PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { BadRequestException } from '@nestjs/common';

describe('PostService', () => {
  let postService: PostService;
  let postRepository: Repository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(PostEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    postRepository = module.get<Repository<PostEntity>>(getRepositoryToken(PostEntity));
  });

  describe('createPost', () => {
    it('should create a post', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Title',
        content: 'Test Content',
      };

      const savedPost = new PostEntity();
      savedPost.id = 1;
      savedPost.title = 'Test Title';
      savedPost.content = 'Test Content';
      jest.spyOn(postRepository, 'save').mockResolvedValue(savedPost);

      const result = await postService.createPost(createPostDto);

      expect(result.message).toEqual('Post successfully created');
      expect(result.statusCode).toEqual(201);
      expect(result.data).toEqual(savedPost);
    });

    it('should throw BadRequestException if saving fails', async () => {
      const createPostDto: CreatePostDto = {
        title: 'Test Title',
        content: 'Test Content',
      };

      jest.spyOn(postRepository, 'save').mockRejectedValue(new Error());

      await expect(postService.createPost(createPostDto)).rejects.toThrow(BadRequestException);
    });
  });

});
