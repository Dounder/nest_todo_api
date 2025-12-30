import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { User } from 'prisma/client';

import { PrismaService } from 'src/prisma';
import { PaginationDto, PaginationResponse } from '../common';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({ data: createUserDto });
      return newUser;
    } catch (error) {
      this.logger.error('Failed to create user', error.stack);
      throw new InternalServerErrorException({
        status: 500,
        message: 'An error occurred while creating the user.',
      });
    }
  }

  async findAll(pagination: PaginationDto): Promise<PaginationResponse<User>> {
    try {
      const { page, limit } = pagination;

      const [data, total] = await this.prisma.$transaction([
        this.prisma.user.findMany({
          take: limit,
          skip: (page - 1) * limit,
        }),
        this.prisma.user.count(),
      ]);

      const lastPage = Math.ceil(total / limit);

      return { meta: { total, page, lastPage }, data };
    } catch (error) {
      this.logger.error('Failed to find all users', error.stack);
      throw new InternalServerErrorException({
        status: 500,
        message: 'An error occurred while retrieving users.',
      });
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });

      if (!user)
        throw new NotFoundException({
          status: 404,
          message: `User with id ${id} not found.`,
        });

      return user;
    } catch (error) {
      this.logger.error(`Failed to find user with id ${id}`, error.stack);
      throw new InternalServerErrorException({
        status: 500,
        message: 'An error occurred while retrieving the user.',
      });
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.findOne(id);

      const updatedUser = await this.prisma.user.update({
        where: { id: user.id },
        data: updateUserDto,
      });

      return updatedUser;
    } catch (error) {
      this.logger.error(`Failed to update user with id ${id}`, error.stack);
      throw new InternalServerErrorException({
        status: 500,
        message: 'An error occurred while updating the user.',
      });
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const user = await this.findOne(id);

      await this.prisma.user.update({ where: { id: user.id }, data: { deletedAt: new Date() } });

      return { message: `User ${user.username} with id ${id} has been removed.` };
    } catch (error) {
      this.logger.error(`Failed to remove user with id ${id}`, error.stack);
      throw new InternalServerErrorException({
        status: 500,
        message: 'An error occurred while removing the user.',
      });
    }
  }

  async restore(id: string): Promise<{ message: string }> {
    try {
      const user = await this.findOne(id);

      await this.prisma.user.update({ where: { id: user.id }, data: { deletedAt: null } });

      return { message: `User ${user.username} with id ${id} has been restored.` };
    } catch (error) {
      this.logger.error(`Failed to restore user with id ${id}`, error.stack);
      throw new InternalServerErrorException({
        status: 500,
        message: 'An error occurred while restoring the user.',
      });
    }
  }
}
