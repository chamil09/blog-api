import { Controller, Get, Param, Query, Post, Delete, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from 'src/dtos/create-comment.dto';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'Created comment as response'
    })
    @ApiBadRequestResponse({
        description: 'Failed to create comment'
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    async addComment(@Body() request: CreateCommentDto) {
      
        return this.commentService.addComment(request);
    }

    @Get()
    @ApiOkResponse({
        description: 'Found comments successfully'
    })
    @ApiNotFoundResponse({
        description: 'Failed to find comments'
    })
    async getAllComments(@Query('page') page: number, @Query('limit') limit: number) {
    page = page || 1;
    limit = limit || 3;

    return this.commentService.getPaginatedComments(page, limit);
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'Found comment successfully'
    })
    @ApiNotFoundResponse({
        description: 'Failed to find comment'
    })
    async getCommentById(@Param('id') id: number) {
        return this.commentService.getCommentById(id);
    }

    @ApiOkResponse({
        description: 'Post deleted successfully',
    })
    @ApiBadRequestResponse({
        description: 'Failed to delete post'
    })
    @Delete(':id')
    async deleteComment(@Param('id') id: number) {
        return this.commentService.deleteComment(id);
    }
}
