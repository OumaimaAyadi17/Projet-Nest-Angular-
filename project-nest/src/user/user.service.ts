import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
    private readonly UserRepository: Repository<User>
    ) {
    }

    async  all(): Promise<User[]> {
        return await this. UserRepository.find();
    }
    
    async  create(data): Promise<User> {
        return this. UserRepository.save( data);
    }

    async findOne(condition): Promise<User> {
        return await this. UserRepository.findOne(condition);
    }

    async update(id:number , data): Promise<any> {
        return  this. UserRepository.update(id,data);
    }

    async delete(id:number): Promise<any> {
        return  this. UserRepository.delete(id);
    }



}
