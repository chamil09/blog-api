import { Controller, ValidationPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { PostEntity } from 'src/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { CreatePostDto } from 'src/dtos/create-post.dto';
import { Body, Post, Get, UsePipes, Param } from '@nestjs/common/decorators';

@Controller('post')
export class PostController {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ){}

    @Post()
    @UsePipes(new ValidationPipe({transform: true}))
    async createPost(@Body() input: CreatePostDto) {
        try {
            const post = new PostEntity();
            post.title = input.title;
            post.content = input.content;

            const savedPost = await this.postRepository.save(post);
            return savedPost;
        } catch (error) {
            throw new BadRequestException('Failed to create post');
        }
    }

    @Get()
    async getAllPosts() {
        try {
            const posts = await this.postRepository.find();
            return posts;
        } catch (error) {
            throw new NotFoundException('Failed to fetch posts');
        }
    }


    @Get(':id')
    async getPostById(@Param('id') id: number) {
        try {
            const post = await this.postRepository.findOne({ where: { id } });
            if (!post) {
                throw new NotFoundException('Post not found');
            }
            return post;
        } catch (error) {
            throw new NotFoundException('Failed to fetch post');
        }
    }
}
