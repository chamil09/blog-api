import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/entities/comment.entity';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>,
        private readonly postService: PostService
        ){}

        async addComment(input: CreateCommentDto) {
            try {
                const post = await this.postService.getPostById(input.postId);
                if (!post) {
                    throw new NotFoundException('Post not found');
                }

                const comment = new CommentEntity();
                comment.text = input.text;
                comment.post = post.data;
    
                const savedComment = await this.commentRepository.save(comment);
                const response = {
                    message: 'Comment added successfully',
                    statusCode: 200,
                    data: savedComment
                }
                return response;
            } catch (error) {
                throw new BadRequestException('Failed to create comment');
            }
        }

        async getPaginatedComments(page: number, limit: number) {
            try {
                const skip = (page - 1) * limit;
                const [posts, totalCount] = await this.commentRepository.findAndCount({
                    take: limit,
                    skip,
                });
                const totalPages = Math.ceil(totalCount / limit);
                const response = {
                    message: 'Comments fetched successfully',
                    statusCode: 200,
                    data: {
                        posts,
                        currentPage: page,
                        totalPages,
                    }
                }
                return response;
            } catch (error) {
                throw new NotFoundException('Failed to fetch comments');
            }
        }

        async getCommentById(id: number) {
            try {
                const comment = await this.commentRepository.findOne({ where: { id } });
                if (!comment) {
                    throw new NotFoundException('Comment not found');
                }
                const response = {
                    message: 'Comment fetched successfully',
                    statusCode: 200,
                    data: comment
                }
                return response;
            } catch (error) {
                throw new NotFoundException('Failed to fetch comment');
            }
        }

        async deleteComment(id: number) {
            try {
                const comment = await this.commentRepository.findOne({ where: { id } });
                if (!comment) {
                    throw new NotFoundException('Comment not found');
                }
                await this.commentRepository.remove(comment);
                const response = {
                    message: 'Comment deleted successfully',
                    statusCode: 200
                }
                return response;
            } catch (error) {
                throw new BadRequestException('Failed to delete comment');
            }
        }
}
