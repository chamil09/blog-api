import { Controller, Get, Put, Delete, Param, Post, Body, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from 'src/dtos/create-post.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createPost(@Body() input: CreatePostDto) {
        return this.postService.createPost(input);
    }

    @Get()
    async getAllPosts(@Query('page') page: number, @Query('limit') limit: number) {
    page = page || 1;
    limit = limit || 3;

    return this.postService.getPaginatedPosts(page, limit);
    }

    @Get(':id')
    async getPostById(@Param('id') id: number) {
        return this.postService.getPostById(id);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updatePost(@Param('id') id: number, @Body() input: CreatePostDto) {
        return this.postService.updatePost(id, input);
    }

    @Delete(':id')
    async deletePost(@Param('id') id: number) {
        return this.postService.deletePost(id);
    }
}
