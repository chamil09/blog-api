import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'User created successfully',
    type: UserEntity,
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'User found successfully',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'User updated successfully',
    type: UserEntity,
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async updateUser(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'User deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
