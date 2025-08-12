import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!user) throw new NotFoundException(`User with id: ${id} not found`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateUserDto },
    );
    if (result.modifiedCount === 0) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return result;
  }

  async remove(id: string) {
    const result = await this.userRepository.deleteOne({
      _id: new ObjectId(id),
    });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with id: ${id} not found`);
    }
    return result;
  }
}
