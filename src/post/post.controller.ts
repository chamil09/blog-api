import { Controller, Get, Put, Delete, Param, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from 'src/dtos/create-post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async createPost(@Body() input: CreatePostDto) {
        return this.postService.createPost(input);
    }

    @Get()
    async getAllPosts() {
        return this.postService.getAllPosts();
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
