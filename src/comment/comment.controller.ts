import { Controller, Get, Param, Post, Delete, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async addComment(@Body() request: CreateCommentDto) {
      
        return this.commentService.addComment(request);
    }

    @Get()
    async getAllComments() {
        return this.commentService.getAllComments();
    }

    @Get(':id')
    async getCommentById(@Param('id') id: number) {
        return this.commentService.getCommentById(id);
    }

    @Delete(':id')
    async deleteComment(@Param('id') id: number) {
        return this.commentService.deleteComment(id);
    }
}
