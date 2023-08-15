import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    const response = {
        message: 'User added successfully',
        statusCode: 201,
        //data: savedUser
    }
    return response;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
  }

  async updateUser(id: number, updateUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    const updatedUser = await this.userRepository.save(user);
    const response = {
        message: 'User updated successfully',
        statusCode: 200,
        //data: updatedUser
    }
    return response;
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }
}

