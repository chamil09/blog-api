import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { CreatePostDto } from 'src/dtos/create-post.dto';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>
    ) {}

    async createPost(input: CreatePostDto) {
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

    async getAllPosts() {
        try {
            const posts = await this.postRepository.find();
            return posts;
        } catch (error) {
            throw new NotFoundException('Failed to fetch posts');
        }
    }

    async getPostById(id: number) {
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
    async updatePost(id: number, input: CreatePostDto) {
        try {
            const post = await this.postRepository.findOne({ where: { id } });
            if (!post) {
                throw new NotFoundException('Post not found');
            }

            post.title = input.title;
            post.content = input.content;

            const updatedPost = await this.postRepository.save(post);
            return updatedPost;
        } catch (error) {
            throw new BadRequestException('Failed to update post');
        }
    }

    async deletePost(id: number) {
        try {
            const post = await this.postRepository.findOne({ where: { id } });
            if (!post) {
                throw new NotFoundException('Post not found');
            }

            await this.postRepository.remove(post);
        } catch (error) {
            throw new BadRequestException('Failed to delete post');
        }
    }
}
