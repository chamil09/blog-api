import { Controller, Get, Put, Delete, Param, Post, Body, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiTags, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @ApiCreatedResponse({
        description: 'Post created successfully ',
    })
    @ApiBadRequestResponse({
        description: 'Failed to create a post',
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    async createPost(@Body() input: CreatePostDto) {
        return this.postService.createPost(input);
    }

    @Get()
    @ApiOkResponse({
        description: 'Found posts successfully'
    })
    @ApiNotFoundResponse({
        description: 'Failed to find posts'
    })
    async getAllPosts(@Query('page') page: number, @Query('limit') limit: number) {
    page = page || 1;
    limit = limit || 3;

    return this.postService.getPaginatedPosts(page, limit);
    }

    @ApiOkResponse({
        description: 'Found post successfully'
    })
    @ApiNotFoundResponse({
        description: 'Failed to find post'
    })
    @Get(':id')
    async getPostById(@Param('id') id: number) {
        return this.postService.getPostById(id);
    }

    @Put(':id')
    @ApiOkResponse({
        description: 'Updated post as response',
    })
    @ApiNotFoundResponse({
        description: 'Failed to find post'
    })
    @ApiBadRequestResponse({
        description: 'Failed to update post'
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    async updatePost(@Param('id') id: number, @Body() input: CreatePostDto) {
        return this.postService.updatePost(id, input);
    }

    @Delete(':id')
    @ApiOkResponse({
        description: 'Post deleted successfully',
    })
    @ApiBadRequestResponse({
        description: 'Failed to delete post'
    })
    async deletePost(@Param('id') id: number) {
        return this.postService.deletePost(id);
    }
}
