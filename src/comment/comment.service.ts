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
                comment.post = post;
    
                const savedComment = await this.commentRepository.save(comment);
                return savedComment;
            } catch (error) {
                throw new BadRequestException('Failed to create comment');
            }
        }

        async getAllComments() {
            try {
                const comments = await this.commentRepository.find();
                return comments;
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
                return comment;
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
            } catch (error) {
                throw new BadRequestException('Failed to delete comment');
            }
        }
}
