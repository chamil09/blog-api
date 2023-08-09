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
    ) { }

    async createPost(input: CreatePostDto) {
        try {
            const post = new PostEntity();
            post.title = input.title;
            post.content = input.content;
            const savedPost = await this.postRepository.save(post);
            const response = {
                message: 'Post successfully created',
                statusCode: 201,
                data: savedPost
            }
            return response;
        } catch (error) {
            throw new BadRequestException('Failed to create a post');
        }
    }

    async getPaginatedPosts(page: number, limit: number) {
        try {
            const skip = (page - 1) * limit;
            const [posts, totalCount] = await this.postRepository.findAndCount({
                take: limit,
                skip,
            });
            const totalPages = Math.ceil(totalCount / limit);
            const response = {
                message: 'Found posts successfully',
                statusCode: 200,
                data: {
                    posts,
                    currentPage: page,
                    totalPages,
                }
            }
            return response;
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
            const response = {
                message: 'Post found successfully',
                statusCode: 200,
                data: post
            }
            return response;
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
            const response = {
                message: 'Post updated successfully',
                statusCode: 200,
                data: updatedPost
            }
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deletePost(id: number) {
        try {
            const post = await this.postRepository.findOne({ where: { id } });
            if (!post) {
                throw new NotFoundException('Post not found');
            }
            await this.postRepository.remove(post);
            const response = {
                message: 'Post deleted successfully',
                statusCode: 200,
            }
            return response;
        } catch (error) {
            throw new BadRequestException('Failed to delete post');
        }
    }
}
